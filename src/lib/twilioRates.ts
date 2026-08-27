/**
 * Cost per SMS segment by region.
 *
 * Two different sources are in play, and they do not agree, so each rate
 * carries its own provenance and the page says so out loud.
 *
 * Australia is the rate STRONG is actually billed, confirmed against a full
 * month of a studio's Twilio billing report in May 2026.
 *
 * New Zealand, Singapore and the United States come from the GROW Variable
 * Fees schedule that Hapana Account Management supplied in April 2025. That
 * schedule was issued for a different brand, and Hapana stated at the time
 * that regions differ, so treat those three as a starting point and confirm
 * against a real invoice.
 *
 * Canada, the United Kingdom and Ireland have never been supplied. They use
 * the custom option until Hapana provides the schedule.
 */

export interface Rate {
  id: string
  region: string
  currency: string
  /** Cost per segment, null when the rate has never been supplied. */
  perSegment: number | null
  source: string
  confidence: "confirmed" | "indicative" | "unknown"
}

export const RATES: Rate[] = [
  {
    id: "au",
    region: "Australia",
    currency: "AUD",
    perSegment: 0.0812,
    source: "Confirmed against a studio's Twilio billing report, May 2026.",
    confidence: "confirmed",
  },
  {
    id: "nz",
    region: "New Zealand",
    currency: "AUD",
    perSegment: 0.066,
    source: "Hapana GROW Variable Fees schedule, April 2025. Confirm on your invoice.",
    confidence: "indicative",
  },
  {
    id: "sg",
    region: "Singapore",
    currency: "AUD",
    perSegment: 0.066,
    source: "Hapana GROW Variable Fees schedule, April 2025. Confirm on your invoice.",
    confidence: "indicative",
  },
  {
    id: "us",
    region: "United States",
    currency: "USD",
    perSegment: 0.01,
    source: "Hapana GROW Variable Fees schedule, April 2025. Confirm on your invoice.",
    confidence: "indicative",
  },
  {
    id: "ca",
    region: "Canada",
    currency: "CAD",
    perSegment: null,
    source: "Not supplied by Hapana. Take the rate from your invoice.",
    confidence: "unknown",
  },
  {
    id: "uk",
    region: "United Kingdom",
    currency: "GBP",
    perSegment: null,
    source: "Not supplied by Hapana. Take the rate from your invoice.",
    confidence: "unknown",
  },
  {
    id: "ie",
    region: "Ireland",
    currency: "EUR",
    perSegment: null,
    source: "Not supplied by Hapana. Take the rate from your invoice.",
    confidence: "unknown",
  },
]

export const DEFAULT_RATE_ID = "au"

export function getRate(id: string): Rate {
  return RATES.find((r) => r.id === id) ?? RATES[0]
}
