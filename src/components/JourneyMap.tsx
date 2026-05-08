import Link from "next/link"

function SourceBox({ label }: { label: string }) {
  return (
    <div className="rounded-lg border border-sky-200 bg-sky-50 px-3 py-2.5 text-center">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-sky-700">
        Source
      </span>
      <p className="mt-1 mb-0 text-xs font-medium text-sky-900">{label}</p>
    </div>
  )
}

function StageBox({
  stage,
  title,
  description,
  href,
}: {
  stage: number
  title: string
  description: string
  href: string
}) {
  return (
    <Link href={href} className="block no-underline mx-auto max-w-md w-full">
      <div className="rounded-xl border-2 border-[#98C8EB] bg-white px-5 py-3.5 text-center transition-colors hover:bg-sky-50">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-[#98C8EB]">
          Stage {stage}
        </span>
        <p className="mt-1 mb-0 font-[family-name:var(--font-kessel)] text-base font-black uppercase tracking-wide text-black">
          {title}
        </p>
        <p className="mt-1 mb-0 text-[11px] text-gray-500">{description}</p>
      </div>
    </Link>
  )
}

function Connector() {
  return <div className="mx-auto h-4 w-0.5 bg-gray-300" />
}

function TransitionLabel({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="mx-auto h-2 w-0.5 bg-gray-300" />
      <span className="rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-[10px] font-medium text-amber-800">
        {label}
      </span>
      <div className="mx-auto h-2 w-0.5 bg-gray-300" />
    </div>
  )
}

export function JourneyMap() {
  return (
    <div className="my-8 rounded-xl border border-gray-200 bg-[#FAF8F5] p-6 sm:p-8 not-prose">
      {/* Entry sources */}
      <div className="mx-auto grid max-w-lg grid-cols-3 gap-3">
        <SourceBox label="Website Form" />
        <SourceBox label="Facebook / Instagram Ad" />
        <SourceBox label="Core Account Created" />
      </div>

      {/* Merge lines */}
      <div className="relative mx-auto max-w-lg">
        <div className="flex justify-between px-[16.66%]">
          <div className="h-3 w-0.5 bg-sky-300" />
          <div className="h-3 w-0.5 bg-sky-300" />
          <div className="h-3 w-0.5 bg-sky-300" />
        </div>
        <div className="mx-[16.66%] h-0.5 bg-sky-300" />
        <div className="mx-auto h-3 w-0.5 bg-sky-300" />
      </div>

      {/* Stage 1 */}
      <StageBox
        stage={1}
        title="New Leads"
        description="Welcome SMS + email, studio notification, Leads Pipeline card"
        href="/workflows/key-workflows/new-leads"
      />

      <TransitionLabel label="Lead purchases intro offer in Core" />

      {/* Stage 2 */}
      <StageBox
        stage={2}
        title="New Intro Offers"
        description="Purchase detection, welcome sequence, Intro Offer Pipeline card, day-by-day setup"
        href="/workflows/key-workflows/new-intro-offers"
      />

      <TransitionLabel label="Enrolled in attendance + daily tracking" />

      {/* Stage 3 */}
      <StageBox
        stage={3}
        title="During Intro Offer"
        description="Day 1 to Day 15 progression, visit tracking, nudges, upsell emails"
        href="/workflows/key-workflows/during-intro-offer"
      />

      {/* Three exits */}
      <Connector />
      <div className="mx-auto grid max-w-lg grid-cols-3 gap-3">
        <div className="rounded-lg border border-green-300 bg-green-50 px-2 py-2 text-center">
          <span className="text-[10px] font-bold uppercase text-green-700">Won</span>
          <p className="mt-0.5 mb-0 text-[10px] text-green-600">Purchased membership</p>
        </div>
        <div className="rounded-lg border border-red-300 bg-red-50 px-2 py-2 text-center">
          <span className="text-[10px] font-bold uppercase text-red-700">Lost</span>
          <p className="mt-0.5 mb-0 text-[10px] text-red-600">Disengaged</p>
        </div>
        <div className="rounded-lg border border-gray-300 bg-gray-50 px-2 py-2 text-center">
          <span className="text-[10px] font-bold uppercase text-gray-600">Expired</span>
          <p className="mt-0.5 mb-0 text-[10px] text-gray-500">Offer period ended</p>
        </div>
      </div>

      {/* Won → Membership */}
      <div className="mx-auto max-w-lg pl-[16.66%]">
        <div className="flex justify-start">
          <div className="mx-auto h-4 w-0.5 bg-green-300" style={{ marginLeft: '16.66%' }} />
        </div>
      </div>

      {/* Stage 4 */}
      <StageBox
        stage={4}
        title="Membership Journey"
        description="60-day nurture, milestones, birthdays, suspension handling"
        href="/workflows/key-workflows/membership-journey"
      />

      {/* System workflows bar */}
      <div className="mx-auto mt-6 max-w-lg rounded-lg border border-dashed border-gray-400 bg-gray-50/50 px-5 py-3 text-center">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
          Runs at every stage
        </span>
        <p className="mt-1 mb-0 font-[family-name:var(--font-kessel)] text-sm font-black uppercase tracking-wide text-gray-700">
          <Link href="/workflows/key-workflows/system-workflows" className="text-gray-700 no-underline hover:text-[#4a90b8] transition-colors">
            System Workflows
          </Link>
        </p>
        <p className="mt-0.5 mb-0 text-[11px] text-gray-500">
          User assignment, date stamping, notifications, DND handling, cross-pipeline sale marking
        </p>
      </div>
    </div>
  )
}
