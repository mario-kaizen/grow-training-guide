/**
 * SMS encoding and segment counting, following the GSM 03.38 specification
 * and Twilio's segment rules.
 *
 * GSM-7:  160 characters in a single message, 153 per segment once a message
 *         splits, because 7 bytes of each segment are used to reassemble it.
 * UCS-2:  70 characters in a single message, 67 per segment once it splits.
 *
 * A message uses UCS-2 the moment it contains any character outside the GSM-7
 * tables. Emoji are the usual cause. Curly quotes pasted from Word or Canva
 * are the sneaky one.
 */

// GSM 03.38 basic character set. Every character here costs one slot.
const GSM_BASIC = new Set(
  (
    "@£$¥èéùìòÇ\nØø\rÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ !\"#¤%&'()*+,-./0123456789:;<=>?" +
    "¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà"
  ).split("")
)

// GSM 03.38 extension table. Each of these costs two slots, because it is sent
// as an escape character followed by the character itself.
const GSM_EXTENDED = new Set("^{}\\[~]|€\f".split(""))

export type Encoding = "GSM-7" | "UCS-2"

export interface SegmentInfo {
  encoding: Encoding
  /** Billable character slots, not the raw string length. */
  units: number
  segments: number
  /** Characters left before another segment is added. */
  remaining: number
  perSegment: number
  /** Characters that forced the message onto UCS-2, de-duplicated. */
  offenders: string[]
}

const LIMITS = {
  "GSM-7": { single: 160, multi: 153 },
  "UCS-2": { single: 70, multi: 67 },
} as const

export function analyse(text: string): SegmentInfo {
  const offenders: string[] = []
  let gsmUnits = 0
  let isGsm = true

  for (const char of text) {
    if (GSM_BASIC.has(char)) {
      gsmUnits += 1
    } else if (GSM_EXTENDED.has(char)) {
      gsmUnits += 2
    } else {
      isGsm = false
      if (!offenders.includes(char)) offenders.push(char)
    }
  }

  const encoding: Encoding = isGsm ? "GSM-7" : "UCS-2"

  // UCS-2 is billed in 16 bit units, so an emoji outside the basic plane
  // counts as two, and a compound emoji such as a family counts as more.
  const units = isGsm ? gsmUnits : text.length

  const limit = LIMITS[encoding]
  const segments =
    units === 0 ? 0 : units <= limit.single ? 1 : Math.ceil(units / limit.multi)
  const perSegment = segments <= 1 ? limit.single : limit.multi
  const capacity = segments <= 1 ? limit.single : segments * limit.multi

  return {
    encoding,
    units,
    segments,
    remaining: Math.max(0, capacity - units),
    perSegment,
    offenders,
  }
}

/**
 * The same message with every non GSM-7 character removed, used to show what
 * the emoji are actually costing.
 */
export function stripToGsm(text: string): string {
  return Array.from(text)
    .filter((char) => GSM_BASIC.has(char) || GSM_EXTENDED.has(char))
    .join("")
    .replace(/ {2,}/g, " ")
    .trim()
}
