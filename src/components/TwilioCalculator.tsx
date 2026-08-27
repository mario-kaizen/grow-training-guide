"use client"

import { useMemo, useState } from "react"
import { analyse, stripToGsm } from "@/lib/smsSegments"
import { RATES, DEFAULT_RATE_ID, getRate } from "@/lib/twilioRates"

const BLUE = "#98C8EB"

function money(value: number, currency: string, dp = 2) {
  return `${currency} $${value.toLocaleString("en-AU", {
    minimumFractionDigits: dp,
    maximumFractionDigits: dp,
  })}`
}

function Stat({
  label,
  value,
  hint,
  emphasis = false,
}: {
  label: string
  value: string
  hint?: string
  emphasis?: boolean
}) {
  return (
    <div
      className={`rounded border p-4 ${
        emphasis ? "border-black bg-black" : "border-gray-200 bg-white"
      }`}
    >
      <p
        className={`text-[10px] font-semibold uppercase tracking-wider ${
          emphasis ? "text-[#98C8EB]" : "text-gray-400"
        }`}
      >
        {label}
      </p>
      <p
        className={`mt-1 font-[var(--font-heading)] text-2xl font-black tabular-nums ${
          emphasis ? "text-white" : "text-black"
        }`}
      >
        {value}
      </p>
      {hint && (
        <p
          className={`mt-1 text-[11px] leading-snug ${
            emphasis ? "text-zinc-400" : "text-gray-500"
          }`}
        >
          {hint}
        </p>
      )}
    </div>
  )
}

export function TwilioCalculator() {
  const [mode, setMode] = useState<"message" | "manual">("message")
  const [message, setMessage] = useState(
    "Hi Sarah, welcome to STRONG Pilates Pymble. Your 10 day intro starts today. Book your first class in the app and reply here if you need a hand."
  )
  const [manualSegments, setManualSegments] = useState(2)
  const [rateId, setRateId] = useState(DEFAULT_RATE_ID)
  const [customRate, setCustomRate] = useState("")
  const [contacts, setContacts] = useState(1400)

  const rate = getRate(rateId)
  const useCustom = rate.perSegment === null || customRate !== ""
  const perSegment = useCustom
    ? Number.parseFloat(customRate) || 0
    : (rate.perSegment ?? 0)

  const info = useMemo(() => analyse(message), [message])
  const gsmVersion = useMemo(() => stripToGsm(message), [message])
  const gsmInfo = useMemo(() => analyse(gsmVersion), [gsmVersion])

  const segments = mode === "message" ? info.segments : Math.max(0, manualSegments)
  const costPerMessage = segments * perSegment
  const total = costPerMessage * Math.max(0, contacts)

  const unicodePenalty =
    info.encoding === "UCS-2" && gsmInfo.segments > 0
      ? (info.segments - gsmInfo.segments) * perSegment * Math.max(0, contacts)
      : 0

  return (
    <div className="not-prose my-8 space-y-6">
      {/* Inputs */}
      <div className="rounded border border-gray-200 bg-white p-6">
        <div className="mb-5 flex flex-wrap gap-2">
          {(
            [
              ["message", "Paste the message"],
              ["manual", "I already know the segments"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              onClick={() => setMode(value)}
              className={`rounded px-3 py-1.5 text-[12px] font-medium transition-colors ${
                mode === value
                  ? "bg-black text-[#98C8EB]"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {mode === "message" ? (
          <>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-gray-500">
              The SMS, exactly as a member will receive it
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              className="w-full resize-y rounded border border-gray-300 p-3 font-mono text-[13px] leading-relaxed text-gray-800 focus:border-[#4a90b8] focus:outline-none"
              placeholder="Paste your SMS here"
            />
            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-[12px] text-gray-500">
              <span>
                <strong className="text-black">{info.units}</strong> character
                slots used
              </span>
              <span>
                Encoding:{" "}
                <strong
                  className={
                    info.encoding === "UCS-2" ? "text-amber-700" : "text-black"
                  }
                >
                  {info.encoding}
                </strong>
              </span>
              <span>
                <strong className="text-black">{info.remaining}</strong> left
                before the next segment
              </span>
            </div>
          </>
        ) : (
          <>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-gray-500">
              How many segments are in the SMS template
            </label>
            <input
              type="number"
              min={0}
              value={manualSegments}
              onChange={(e) => setManualSegments(Number(e.target.value))}
              className="w-40 rounded border border-gray-300 p-2.5 text-[14px] tabular-nums focus:border-[#4a90b8] focus:outline-none"
            />
          </>
        )}

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-gray-500">
              Region
            </label>
            <select
              value={rateId}
              onChange={(e) => {
                setRateId(e.target.value)
                setCustomRate("")
              }}
              className="w-full rounded border border-gray-300 bg-white p-2.5 text-[14px] focus:border-[#4a90b8] focus:outline-none"
            >
              {RATES.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.region}
                  {r.perSegment === null
                    ? " (rate not supplied)"
                    : ` (${r.currency} $${r.perSegment})`}
                </option>
              ))}
            </select>
            <p className="mt-2 text-[11px] leading-snug text-gray-500">
              {rate.source}
            </p>
          </div>

          <div>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-gray-500">
              Cost per segment{" "}
              <span className="normal-case tracking-normal text-gray-400">
                (override with your invoice)
              </span>
            </label>
            <div className="flex items-center gap-2">
              <span className="text-[13px] text-gray-500">{rate.currency} $</span>
              <input
                type="number"
                step="0.0001"
                min={0}
                value={customRate !== "" ? customRate : (rate.perSegment ?? "")}
                onChange={(e) => setCustomRate(e.target.value)}
                placeholder="0.0000"
                className="w-full rounded border border-gray-300 p-2.5 text-[14px] tabular-nums focus:border-[#4a90b8] focus:outline-none"
              />
            </div>
            {rate.confidence === "unknown" && customRate === "" && (
              <p className="mt-2 text-[11px] leading-snug text-amber-700">
                Hapana has never supplied this region. Enter the rate from your
                invoice to get a real number.
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-gray-500">
              Number of contacts
            </label>
            <input
              type="number"
              min={0}
              value={contacts}
              onChange={(e) => setContacts(Number(e.target.value))}
              className="w-full rounded border border-gray-300 p-2.5 text-[14px] tabular-nums focus:border-[#4a90b8] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid gap-3 sm:grid-cols-3">
        <Stat
          label="Segments per message"
          value={String(segments)}
          hint={
            mode === "message"
              ? `${info.perSegment} characters per segment on ${info.encoding}`
              : "Entered manually"
          }
        />
        <Stat
          label="Cost per message"
          value={money(costPerMessage, rate.currency, 4)}
          hint={`${segments} x $${perSegment}`}
        />
        <Stat
          label="Total to send"
          value={money(total, rate.currency)}
          hint={`To ${Math.max(0, contacts).toLocaleString("en-AU")} contacts`}
          emphasis
        />
      </div>

      {/* Emoji impact */}
      {mode === "message" && (
        <div
          className={`rounded border p-5 ${
            info.encoding === "UCS-2"
              ? "border-amber-200 bg-amber-50"
              : "border-gray-200 bg-white"
          }`}
        >
          <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
            Emoji and special character check
          </p>
          {info.encoding === "UCS-2" ? (
            <div className="mt-2 text-[13px] leading-relaxed text-amber-900">
              <p>
                This message contains {info.offenders.length}{" "}
                {info.offenders.length === 1 ? "character" : "characters"} that
                sit outside the standard SMS alphabet:{" "}
                <span className="font-mono text-base">
                  {info.offenders.slice(0, 12).join(" ")}
                </span>
                {info.offenders.length > 12 && " and more"}. That drops every
                segment from 160 characters to 70, so the whole message costs
                more even though the words did not change.
              </p>
              <p className="mt-3">
                Same message without them:{" "}
                <strong>
                  {gsmInfo.segments}{" "}
                  {gsmInfo.segments === 1 ? "segment" : "segments"}
                </strong>{" "}
                instead of <strong>{info.segments}</strong>.
                {unicodePenalty > 0 && (
                  <>
                    {" "}
                    Across {Math.max(0, contacts).toLocaleString("en-AU")}{" "}
                    contacts those characters are costing{" "}
                    <strong>{money(unicodePenalty, rate.currency)}</strong>.
                  </>
                )}
              </p>
            </div>
          ) : (
            <p className="mt-2 text-[13px] leading-relaxed text-gray-600">
              Clean. Every character in this message is in the standard SMS
              alphabet, so you get the full 160 characters per segment. Add a
              single emoji and the limit drops to 70.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
