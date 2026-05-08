# Key Workflows Improvements | Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add visual diagrams, GHL-style branch visualization, missing workflow coverage, and gotchas callouts to the Key Workflows section of the Grow Training Guide.

**Architecture:** Three new React components (JourneyMap, ConnectionDiagram, WorkflowCard v2 branch rendering) using inline SVG/CSS for diagram rendering. All diagrams flow top-to-bottom to match GHL's workflow builder. Content changes are additive to existing page files.

**Tech Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4, @tailwindcss/typography

**Design Spec:** `docs/superpowers/specs/2026-05-08-key-workflows-improvements-design.md`

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/components/WorkflowCard.tsx` | Modify | Add `branches` to step type, GHL-style column rendering, `retired` status badge |
| `src/components/JourneyMap.tsx` | Create | Full journey flowchart for hub page |
| `src/components/ConnectionDiagram.tsx` | Create | Per-page workflow connection diagrams |
| `src/app/workflows/key-workflows/page.tsx` | Modify | Add JourneyMap above table |
| `src/app/workflows/key-workflows/new-leads/page.tsx` | Modify | Add ConnectionDiagram, gotchas callout |
| `src/app/workflows/key-workflows/new-intro-offers/page.tsx` | Modify | Add ConnectionDiagram, gotchas callout, retire Experience |
| `src/app/workflows/key-workflows/during-intro-offer/page.tsx` | Modify | Add ConnectionDiagram, gotchas callout, 4 new WorkflowCards |
| `src/app/workflows/key-workflows/membership-journey/page.tsx` | Modify | Add ConnectionDiagram, gotchas callout, 2 new WorkflowCards |
| `src/app/workflows/key-workflows/system-workflows/page.tsx` | Modify | Gotchas callout, 6 new WorkflowCards |

---

### Task 1: WorkflowCard v2 — Branch Rendering + Retired Status

**Files:**
- Modify: `src/components/WorkflowCard.tsx`

- [ ] **Step 1: Update the WorkflowStep interface to support branches**

In `src/components/WorkflowCard.tsx`, replace the existing `WorkflowStep` interface:

```typescript
interface WorkflowStep {
  type: "action" | "condition" | "wait" | "link"
  label: string
  detail: string
  linkTo?: string
  branches?: {
    label: string
    steps: WorkflowStep[]
  }[]
}
```

- [ ] **Step 2: Update WorkflowCardProps to accept "retired" status**

```typescript
interface WorkflowCardProps {
  name: string
  purpose: string
  status: "published" | "draft" | "retired"
  trigger?: string
  steps: WorkflowStep[]
  workflowUrl?: string
  settings?: {
    allowReentry?: boolean
    stopOnResponse?: boolean
  }
}
```

- [ ] **Step 3: Add the retired status badge rendering**

In the status badge `<span>`, extend the conditional to handle "retired":

```tsx
<span
  className={`shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full ${
    status === "published"
      ? "bg-green-100 text-green-700"
      : status === "retired"
        ? "bg-gray-100 text-gray-400"
        : "bg-gray-100 text-gray-500"
  }`}
>
  {status === "published" ? "Published" : status === "retired" ? "Retired" : "Draft"}
</span>
```

- [ ] **Step 4: Add a BranchView sub-component for GHL-style column rendering**

Add this inside `WorkflowCard.tsx`, above the `WorkflowCard` export. This renders a condition step that has `branches` — condition box on top, columns fanning out below, each column with stacked step boxes:

```tsx
function BranchView({ step }: { step: WorkflowStep }) {
  if (!step.branches) return null

  return (
    <div className="my-3">
      {/* Condition box */}
      <div className="mx-auto max-w-sm rounded-lg border-2 border-purple-500 bg-purple-50 px-4 py-3 text-center">
        <span className="inline-block rounded bg-white px-2 py-0.5 text-[10px] font-semibold text-purple-600">
          CHECK
        </span>
        <p className="mt-1 mb-0 text-sm font-semibold text-purple-800">{step.label}</p>
        <p className="mt-0.5 mb-0 text-xs text-purple-600">{step.detail}</p>
      </div>

      {/* Connector: line down from condition */}
      <div className="mx-auto h-3 w-0.5 bg-purple-500" />

      {/* Horizontal bar spanning all branches */}
      <div className="mx-8 h-0.5 bg-purple-500" />

      {/* Branch columns */}
      <div
        className="grid gap-3 mx-4"
        style={{ gridTemplateColumns: `repeat(${step.branches.length}, minmax(0, 1fr))` }}
      >
        {step.branches.map((branch, bi) => (
          <div key={bi} className="flex flex-col items-center">
            {/* Connector down to branch label */}
            <div className="h-3 w-0.5 bg-purple-500" />

            {/* Branch label */}
            <div className="w-full rounded-md border border-purple-300 bg-purple-50 px-2 py-1.5 text-center">
              <span className="text-[11px] font-bold uppercase tracking-wide text-purple-600">
                {branch.label}
              </span>
            </div>

            {/* Steps in this branch */}
            {branch.steps.map((bs, si) => {
              const bStyle = stepTypeStyles[bs.type]
              return (
                <div key={si} className="flex w-full flex-col items-center">
                  <div className="h-1.5 w-0.5 bg-gray-300" />
                  <div className="w-full rounded-md border border-gray-200 bg-white px-2.5 py-2">
                    <span
                      className={`inline-block rounded px-1.5 py-0.5 text-[10px] font-semibold ${bStyle.bg} ${bStyle.text}`}
                    >
                      {bStyle.label.toUpperCase()}
                    </span>
                    <p className="mt-1 mb-0 text-xs text-gray-800">{bs.label}</p>
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Update the step rendering in the expanded card to use BranchView for branched conditions**

In the `open && (...)` block where steps are mapped, replace the step rendering with logic that checks for branches:

```tsx
{open && (
  <div className="border-t border-gray-200 bg-gray-50/50 px-5 py-4">
    <ol className="list-none m-0 p-0 space-y-2">
      {steps.map((step, i) => {
        if (step.type === "condition" && step.branches) {
          return (
            <li key={i}>
              <BranchView step={step} />
            </li>
          )
        }

        const style = stepTypeStyles[step.type]
        return (
          <li key={i} className="flex items-start gap-3 text-sm">
            <span className="shrink-0 w-6 h-6 rounded-full bg-gray-200 text-gray-600 text-xs font-semibold flex items-center justify-center mt-0.5">
              {i + 1}
            </span>
            <div className="min-w-0">
              <span className={`inline-block text-xs font-semibold px-1.5 py-0.5 rounded ${style.bg} ${style.text} mr-2`}>
                {style.label}
              </span>
              <span className="font-medium text-gray-900">{step.label}</span>
              <p className="text-gray-500 text-xs mt-0.5 mb-0">{step.detail}</p>
              {step.linkTo && (
                <a
                  href={step.linkTo}
                  className="text-xs text-[#4a90b8] hover:underline mt-0.5 inline-block"
                >
                  View workflow →
                </a>
              )}
            </div>
          </li>
        )
      })}
    </ol>

    {settings && (
      <div className="mt-4 pt-3 border-t border-gray-200 flex gap-4 text-xs text-gray-500">
        {settings.allowReentry !== undefined && (
          <span>
            Allow re-entry:{" "}
            <span className="font-medium text-gray-700">
              {settings.allowReentry ? "Yes" : "No"}
            </span>
          </span>
        )}
        {settings.stopOnResponse !== undefined && (
          <span>
            Stop on response:{" "}
            <span className="font-medium text-gray-700">
              {settings.stopOnResponse ? "Yes" : "No"}
            </span>
          </span>
        )}
      </div>
    )}
  </div>
)}
```

- [ ] **Step 6: Verify in the browser**

Open http://localhost:3002/workflows/key-workflows/new-leads and confirm:
- Existing WorkflowCards still render correctly (no branches, linear list)
- Status badges still show "Published" in green

- [ ] **Step 7: Commit**

```bash
git add src/components/WorkflowCard.tsx
git commit -m "feat: add GHL-style branch rendering and retired status to WorkflowCard"
```

---

### Task 2: JourneyMap Component

**Files:**
- Create: `src/components/JourneyMap.tsx`

- [ ] **Step 1: Create the JourneyMap component**

Create `src/components/JourneyMap.tsx`. This is a static component with no props — the journey structure is defined inline. Uses CSS flexbox for top-to-bottom layout with centered connector lines.

```tsx
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
```

- [ ] **Step 2: Add JourneyMap to the hub page**

In `src/app/workflows/key-workflows/page.tsx`, add the import at the top:

```tsx
import { JourneyMap } from "@/components/JourneyMap"
```

Then insert `<JourneyMap />` after the second `<p>` tag (the one that says "Instead of listing all 300+ workflows...") and before the `<table>`.

- [ ] **Step 3: Verify in the browser**

Open http://localhost:3002/workflows/key-workflows and confirm:
- Journey map renders above the stage table
- Top-to-bottom flow with 3 sources → 4 stages → system bar
- Stage boxes are clickable and navigate to sub-pages
- Three exit boxes (Won/Lost/Expired) show between Stage 3 and Stage 4

- [ ] **Step 4: Commit**

```bash
git add src/components/JourneyMap.tsx src/app/workflows/key-workflows/page.tsx
git commit -m "feat: add JourneyMap component to Key Workflows hub page"
```

---

### Task 3: ConnectionDiagram Component

**Files:**
- Create: `src/components/ConnectionDiagram.tsx`

- [ ] **Step 1: Create the ConnectionDiagram component**

Create `src/components/ConnectionDiagram.tsx`. This is a data-driven component that takes nodes and connections as props and renders a top-to-bottom flow diagram.

The layout algorithm is simple: nodes are placed in rows. The `connections` array determines vertical ordering. Nodes with no incoming connection are in the first row. Each subsequent row contains nodes that are targets of the previous row's connections.

```tsx
interface ConnectionNode {
  id: string
  label: string
  type: "source" | "workflow" | "outcome" | "handoff"
  description?: string
}

interface ConnectionLine {
  from: string
  to: string
  label?: string
}

interface ConnectionDiagramProps {
  nodes: ConnectionNode[]
  connections: ConnectionLine[]
}

const nodeStyles: Record<ConnectionNode["type"], { border: string; bg: string; text: string; label: string }> = {
  source: { border: "border-sky-200", bg: "bg-sky-50", text: "text-sky-900", label: "text-sky-700" },
  workflow: { border: "border-gray-200", bg: "bg-white", text: "text-gray-900", label: "text-gray-500" },
  outcome: { border: "border-green-200", bg: "bg-green-50", text: "text-green-800", label: "text-green-600" },
  handoff: { border: "border-amber-200", bg: "bg-amber-50", text: "text-amber-800", label: "text-amber-600" },
}

const typeLabels: Record<ConnectionNode["type"], string> = {
  source: "Source",
  workflow: "Workflow",
  outcome: "Outcome",
  handoff: "Hands off to",
}

function buildRows(nodes: ConnectionNode[], connections: ConnectionLine[]): ConnectionNode[][] {
  const targetIds = new Set(connections.map((c) => c.to))
  const placed = new Set<string>()
  const rows: ConnectionNode[][] = []

  // First row: nodes with no incoming connections
  const firstRow = nodes.filter((n) => !targetIds.has(n.id))
  rows.push(firstRow)
  firstRow.forEach((n) => placed.add(n.id))

  // Subsequent rows: nodes whose sources are all placed
  let safety = 0
  while (placed.size < nodes.length && safety < 20) {
    const nextRow = nodes.filter(
      (n) =>
        !placed.has(n.id) &&
        connections
          .filter((c) => c.to === n.id)
          .every((c) => placed.has(c.from))
    )
    if (nextRow.length === 0) {
      // Place remaining nodes
      const remaining = nodes.filter((n) => !placed.has(n.id))
      if (remaining.length > 0) rows.push(remaining)
      break
    }
    rows.push(nextRow)
    nextRow.forEach((n) => placed.add(n.id))
    safety++
  }

  return rows
}

export function ConnectionDiagram({ nodes, connections }: ConnectionDiagramProps) {
  const rows = buildRows(nodes, connections)

  return (
    <div className="my-8 rounded-xl border border-gray-200 bg-[#FAF8F5] p-6 not-prose">
      {rows.map((row, ri) => (
        <div key={ri}>
          {/* Connector from previous row */}
          {ri > 0 && (
            <div className="flex flex-col items-center">
              <div className="h-3 w-0.5 bg-gray-300" />
              {/* Show connection labels if there's exactly one connection into this row */}
              {(() => {
                const labelsForRow = connections
                  .filter((c) => row.some((n) => n.id === c.to) && c.label)
                  .map((c) => c.label!)
                const uniqueLabels = [...new Set(labelsForRow)]
                if (uniqueLabels.length === 1) {
                  return (
                    <>
                      <span className="rounded-full bg-amber-50 border border-amber-200 px-3 py-0.5 text-[10px] font-medium text-amber-800">
                        {uniqueLabels[0]}
                      </span>
                      <div className="h-3 w-0.5 bg-gray-300" />
                    </>
                  )
                }
                return null
              })()}
            </div>
          )}

          {/* Row of nodes */}
          <div
            className="grid gap-3 mx-auto"
            style={{
              gridTemplateColumns: `repeat(${row.length}, minmax(0, 1fr))`,
              maxWidth: row.length === 1 ? "24rem" : row.length === 2 ? "32rem" : "42rem",
            }}
          >
            {row.map((node) => {
              const ns = nodeStyles[node.type]
              return (
                <div
                  key={node.id}
                  className={`rounded-lg border ${ns.border} ${ns.bg} px-3 py-2.5 text-center`}
                >
                  <span className={`text-[10px] font-semibold uppercase tracking-wider ${ns.label}`}>
                    {typeLabels[node.type]}
                  </span>
                  <p className={`mt-1 mb-0 text-xs font-medium ${ns.text}`}>{node.label}</p>
                  {node.description && (
                    <p className="mt-0.5 mb-0 text-[10px] text-gray-500">{node.description}</p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Verify the component compiles**

Run: `npx tsc --noEmit 2>&1 | head -20`
Expected: No errors related to ConnectionDiagram.tsx

- [ ] **Step 3: Commit**

```bash
git add src/components/ConnectionDiagram.tsx
git commit -m "feat: add ConnectionDiagram component for per-page workflow maps"
```

---

### Task 4: Add ConnectionDiagram to New Leads Page

**Files:**
- Modify: `src/app/workflows/key-workflows/new-leads/page.tsx`

- [ ] **Step 1: Add the import**

Add at the top of the file:

```tsx
import { ConnectionDiagram } from "@/components/ConnectionDiagram"
```

- [ ] **Step 2: Replace the existing "Workflow flow" div with a ConnectionDiagram**

Find the `<div className="my-6 p-5 bg-gray-50 rounded-lg border border-gray-200">` block (the monospace flow box around line 55) and replace it entirely with:

```tsx
<ConnectionDiagram
  nodes={[
    { id: "website", label: "Website Enquiry Form", type: "source" },
    { id: "facebook", label: "Facebook / Instagram Lead Ad", type: "source" },
    { id: "core", label: "Core Account Created", type: "source" },
    { id: "wf-website", label: "01. Website Submission", type: "workflow", description: "Send notifications, add to Lead Pipeline" },
    { id: "wf-newlead", label: "01. STRONG Intro Offer | New Lead Workflow", type: "workflow", description: "Multi-day nurture sequence" },
    { id: "wf-status", label: "01. Intro Offer Status Update", type: "workflow", description: "Routes by account created tag" },
    { id: "pipeline", label: "Lead in Pipeline", type: "outcome", description: "Contact appears on Leads board for follow-up" },
    { id: "wf-booking", label: "02. First Time Booking SMS", type: "handoff", description: "Sends when lead books first class" },
    { id: "wf-visit", label: "03. First Visit Complete Check-in", type: "handoff", description: "Sends after first class attended" },
  ]}
  connections={[
    { from: "website", to: "wf-website" },
    { from: "facebook", to: "wf-newlead" },
    { from: "core", to: "wf-status" },
    { from: "wf-website", to: "pipeline" },
    { from: "wf-newlead", to: "pipeline" },
    { from: "wf-status", to: "pipeline" },
    { from: "pipeline", to: "wf-booking", label: "Lead books a class" },
    { from: "pipeline", to: "wf-visit", label: "Lead completes a class" },
  ]}
/>
```

- [ ] **Step 3: Add the gotchas callout before "What the lead experiences"**

Find the `<h2>What the lead experiences</h2>` heading and insert this before it:

```tsx
<Callout type="warning" title="Common issues at this stage">
  <p>
    If a lead is not receiving their welcome SMS or the studio is not
    getting notified, check the{" "}
    <a href="/troubleshooting/workflow-timing">
      Workflow Timing & Tasks
    </a>{" "}
    troubleshooting page. Common causes: the form trigger is not
    mapped to the correct form, the assigned user is not set up for
    the location, or the workflow fired but the SMS failed due to
    an invalid phone number.
  </p>
</Callout>
```

- [ ] **Step 4: Verify in the browser**

Open http://localhost:3002/workflows/key-workflows/new-leads and confirm:
- ConnectionDiagram renders where the old monospace flow box was
- Three source boxes at top, workflow boxes in middle, outcome + handoff at bottom
- Gotchas callout appears before the "What the lead experiences" section

- [ ] **Step 5: Commit**

```bash
git add src/app/workflows/key-workflows/new-leads/page.tsx
git commit -m "feat: add connection diagram and gotchas callout to New Leads page"
```

---

### Task 5: Add ConnectionDiagram to New Intro Offers Page + Retire Experience

**Files:**
- Modify: `src/app/workflows/key-workflows/new-intro-offers/page.tsx`

- [ ] **Step 1: Add the import**

```tsx
import { ConnectionDiagram } from "@/components/ConnectionDiagram"
```

- [ ] **Step 2: Replace the "Purchase flow" monospace div with a ConnectionDiagram**

Find the `<div className="my-6 p-5 bg-gray-50 rounded-lg border border-gray-200">` block (around line 34) and replace it with:

```tsx
<ConnectionDiagram
  nodes={[
    { id: "core", label: "Core Purchase", type: "source", description: "Active Package syncs to Grow" },
    { id: "wf-status", label: "01. Intro Offer Status Update", type: "workflow", description: "Central router: detects purchase, upgrade, or expiry" },
    { id: "wf-purchase", label: "01. Purchase Confirmation + Intro Nurture", type: "workflow", description: "Welcome email, call task, brand story" },
    { id: "wf-tag", label: "01. Add tag: pipeline - intro offer", type: "workflow", description: "Pipeline identification" },
    { id: "wf-leads", label: "04. Move to Purchased in Leads", type: "workflow", description: "Cleans up Leads Pipeline if they came from an ad" },
    { id: "pipeline", label: "Intro Offer Pipeline card created", type: "outcome", description: "Custom fields set, day-by-day tracking begins" },
    { id: "handoff", label: "During Intro Offer workflows", type: "handoff", description: "Attendance check, daily progression" },
  ]}
  connections={[
    { from: "core", to: "wf-status", label: "Active Package field changes" },
    { from: "wf-status", to: "wf-purchase" },
    { from: "wf-status", to: "wf-tag" },
    { from: "wf-status", to: "wf-leads" },
    { from: "wf-purchase", to: "pipeline" },
    { from: "pipeline", to: "handoff" },
  ]}
/>
```

- [ ] **Step 3: Change STRONG Experience status to "retired"**

Find the WorkflowCard for `"01. STRONG Experience | Purchase Confirmation + Intro Nurture"` and change:

```tsx
status="retired"
```

Also update the `purpose` prop to prepend: `"[Retired: predecessor to STRONG Intro Offer, kept for reference.] "` before the existing purpose text.

- [ ] **Step 4: Add the gotchas callout before "What the contact experiences"**

Find `<h2>What the contact experiences</h2>` and insert before it:

```tsx
<Callout type="warning" title="Common issues at this stage">
  <p>
    If a purchase is not being detected or the welcome email is not
    sending, check the{" "}
    <a href="/troubleshooting/sync-gaps">
      Core to Grow Sync Gaps
    </a>{" "}
    troubleshooting page. The most common cause is a delay in the
    Core to Grow sync updating the Active Package field. The Status
    Update workflow cannot fire until that field changes.
  </p>
</Callout>
```

- [ ] **Step 5: Verify in the browser**

Open http://localhost:3002/workflows/key-workflows/new-intro-offers and confirm:
- ConnectionDiagram replaces the old monospace flow
- STRONG Experience card shows grey "Retired" badge
- Gotchas callout appears before "What the contact experiences"

- [ ] **Step 6: Commit**

```bash
git add src/app/workflows/key-workflows/new-intro-offers/page.tsx
git commit -m "feat: add connection diagram to New Intro Offers, retire Experience workflow"
```

---

### Task 6: Add ConnectionDiagram + Missing Workflows to During Intro Offer Page

**Files:**
- Modify: `src/app/workflows/key-workflows/during-intro-offer/page.tsx`

- [ ] **Step 1: Add the import**

```tsx
import { ConnectionDiagram } from "@/components/ConnectionDiagram"
```

- [ ] **Step 2: Add a ConnectionDiagram after the first paragraph**

Insert after the first `<p>` tag (the one that ends with "Won (converted to membership), Abandoned/Lost, or Expired."):

```tsx
<ConnectionDiagram
  nodes={[
    { id: "setup", label: "Contact set up by purchase workflows", type: "source" },
    { id: "daily", label: "Day 1 → Day 15 progression", type: "workflow", description: "15 workflows, one per day" },
    { id: "visits", label: "02. Visits Update", type: "workflow", description: "Tracks attendance, updates pipeline" },
    { id: "false", label: "03. False Starter Check", type: "workflow", description: "Flags contacts with no visits" },
    { id: "attend", label: "03. Attendance Check", type: "workflow", description: "3-day SMS, 7-day call task" },
    { id: "upsell1", label: "04. 3 visits OR Day 8", type: "workflow", description: "Membership options email" },
    { id: "upsell2", label: "05. 5 visits OR Day 14", type: "workflow", description: "Intro offer complete email" },
    { id: "won", label: "Won", type: "outcome", description: "Purchased membership" },
    { id: "lost", label: "Lost / Abandoned", type: "outcome", description: "Disengaged" },
    { id: "expired", label: "Expired", type: "outcome", description: "Offer period ended" },
  ]}
  connections={[
    { from: "setup", to: "daily" },
    { from: "setup", to: "visits" },
    { from: "setup", to: "false" },
    { from: "setup", to: "attend" },
    { from: "daily", to: "upsell1", label: "Reaches Day 8 or 3 visits" },
    { from: "upsell1", to: "upsell2", label: "Reaches Day 14 or 5 visits" },
    { from: "upsell2", to: "won" },
    { from: "upsell2", to: "lost" },
    { from: "upsell2", to: "expired" },
  ]}
/>
```

- [ ] **Step 3: Add Day 15 WorkflowCard**

Insert after the daily workflows table (the `</div>` closing the `my-4 overflow-x-auto` div) and before the `<h2>Visit tracking</h2>` heading:

```tsx
<WorkflowCard
  name="Day 15"
  purpose="The final day of the intro offer pipeline progression. Performs the end-of-journey check: if the contact has a membership, marks the pipeline as won. If their intro offer expired, updates the pipeline status to reflect expiry and creates a follow-up task."
  status="published"
  workflowUrl="https://grow.hapana.com/location/cGie31g8caN2HkP6vN2P/workflow/day15-placeholder"
  steps={[
    {
      type: "action",
      label: "Update field: Intro Offer Pipeline Day = 15",
      detail: "Stamps the final day number on the contact record.",
    },
    {
      type: "action",
      label: "Remove from all other daily workflows",
      detail: "Final cleanup of all Day X workflow enrollments.",
    },
    {
      type: "condition",
      label: "Do they have Memberships or Packages?",
      detail: "Checks whether the contact converted during their intro offer period.",
    },
    {
      type: "action",
      label: "Update pipeline status based on outcome",
      detail: "If they have a membership: mark as Won. If their intro offer expired: update pipeline to reflect expiry and create a follow-up task for the studio.",
    },
  ]}
  settings={{ allowReentry: true, stopOnResponse: false }}
/>
```

- [ ] **Step 4: Add First Class Complete and Halfway SMS WorkflowCard**

Insert after the Visit tracking section's WorkflowCard (after the `02. Intro Offer Visits Update` card) and before the `<h2>No-show handling</h2>` heading:

```tsx
<WorkflowCard
  name="02. STRONG Intro Offer | First Class Complete and Halfway SMS"
  purpose="Sends timed check-in messages during the intro offer. After the contact completes their first class, sends a congratulations SMS. At the halfway point of their package, sends a progress check-in SMS encouraging them to keep booking."
  status="published"
  workflowUrl="https://grow.hapana.com/location/cGie31g8caN2HkP6vN2P/workflow/halfway-placeholder"
  steps={[
    {
      type: "wait",
      label: "Wait (failsafe)",
      detail: "Short pause for sync.",
    },
    {
      type: "condition",
      label: "What is their Intro Offer Pipeline Visits count?",
      detail: "Routes based on visit count to determine which message to send: first class complete or halfway check-in.",
    },
    {
      type: "action",
      label: "Send SMS: First class or halfway check-in",
      detail: "Sends the appropriate message based on where they are in their intro offer journey.",
    },
  ]}
  settings={{ allowReentry: true, stopOnResponse: false }}
/>
```

- [ ] **Step 5: Add Pipeline Stage Verification WorkflowCards**

Insert after the `<h3>Abandoned/Lost: contact disengaged</h3>` WorkflowCard (after `06. Intro Offer Marked Abandoned/Lost`) and before the final `<Callout>` about removing from all daily workflows:

```tsx
<h3>Pipeline stage verification</h3>

<p>
  Two safety-net workflows fire when a pipeline card is manually
  moved to the Expired or Memberships columns. They verify the
  move is correct by checking the contact&apos;s actual data
  before confirming the status change.
</p>

<WorkflowCard
  name="08. Intro Offer Pipeline | When Moved to Expired"
  purpose="Safety check when a contact is moved to the Expired column (manually or by another workflow). Verifies they genuinely do not have an active intro offer or membership before confirming the pipeline status."
  status="published"
  workflowUrl="https://grow.hapana.com/location/cGie31g8caN2HkP6vN2P/workflow/expired-verify-placeholder"
  steps={[
    {
      type: "wait",
      label: "Wait (failsafe)",
      detail: "Short pause for sync.",
    },
    {
      type: "condition",
      label: "Do they actually have an empty Active Package?",
      detail: "Confirms the expiry is real. If they still have an active package, the move was incorrect.",
    },
    {
      type: "action",
      label: "Update pipeline status or revert",
      detail: "If confirmed expired: updates the pipeline card status. If they still have an active package: flags for review.",
    },
  ]}
  settings={{ allowReentry: true, stopOnResponse: false }}
/>

<WorkflowCard
  name="09. Intro Offer Pipeline | When Moved to Memberships"
  purpose="Safety check when a contact is moved to the Memberships column. Verifies they actually have an active membership or package before confirming the pipeline status change."
  status="published"
  workflowUrl="https://grow.hapana.com/location/cGie31g8caN2HkP6vN2P/workflow/membership-verify-placeholder"
  steps={[
    {
      type: "wait",
      label: "Wait (failsafe)",
      detail: "Short pause for sync.",
    },
    {
      type: "condition",
      label: "Do they have Memberships or Packages in their Active Package Category?",
      detail: "Confirms they actually upgraded. If not, the move was premature or incorrect.",
    },
    {
      type: "action",
      label: "Confirm or revert pipeline status",
      detail: "If they have a membership: confirms the Won status. If not: reverts and flags for the studio to investigate.",
    },
  ]}
  settings={{ allowReentry: true, stopOnResponse: false }}
/>
```

- [ ] **Step 6: Add the gotchas callout before "What the contact experiences"**

Find `<h2>What the contact experiences</h2>` and insert before it:

```tsx
<Callout type="warning" title="Common issues at this stage">
  <p>
    Pipeline showing the wrong day, visit counter higher than actual
    attendance, or a contact stuck in the wrong column? Check the{" "}
    <a href="/troubleshooting/pipeline-inaccuracy">
      Pipeline Inaccuracy
    </a>{" "}
    troubleshooting page. This is the most common category of
    support tickets (~40%), usually caused by sync timing between
    Core attendance data and Grow custom fields.
  </p>
</Callout>
```

- [ ] **Step 7: Verify in the browser**

Open http://localhost:3002/workflows/key-workflows/during-intro-offer and confirm:
- ConnectionDiagram renders at the top showing two tracks
- Day 15 WorkflowCard appears after the daily workflows table
- Halfway SMS WorkflowCard appears after Visits Update
- Two pipeline verification cards appear after Abandoned/Lost
- Gotchas callout appears before "What the contact experiences"

- [ ] **Step 8: Commit**

```bash
git add src/app/workflows/key-workflows/during-intro-offer/page.tsx
git commit -m "feat: add connection diagram, 4 missing workflows, and gotchas to During Intro Offer"
```

---

### Task 7: Add ConnectionDiagram + Missing Workflows to Membership Journey Page

**Files:**
- Modify: `src/app/workflows/key-workflows/membership-journey/page.tsx`

- [ ] **Step 1: Add the import**

```tsx
import { ConnectionDiagram } from "@/components/ConnectionDiagram"
```

- [ ] **Step 2: Add a ConnectionDiagram after the first paragraph**

Insert after the first `<p>` tag:

```tsx
<ConnectionDiagram
  nodes={[
    { id: "converted", label: "Converted from intro offer", type: "source" },
    { id: "nurture", label: "01. 60 Day Member Journey", type: "workflow", description: "8 emails + 2 SMS over 60 days" },
    { id: "milestones", label: "02. Attendance Milestones", type: "workflow", description: "Notifications at 47, 97, 197, 497, 997" },
    { id: "birthday", label: "03. Birthday Notification", type: "workflow", description: "Studio notified on member birthdays" },
    { id: "suspend", label: "05. Suspensions", type: "workflow", description: "Tracks suspension and return" },
    { id: "inactive", label: "06. Location Status = inactive", type: "workflow", description: "Removes all active tags on cancellation" },
    { id: "checkins", label: "07/10. Weekly + Monthly Check-ins", type: "workflow", description: "Attendance counters for reporting" },
  ]}
  connections={[
    { from: "converted", to: "nurture", label: "Membership purchase detected" },
    { from: "converted", to: "milestones" },
    { from: "converted", to: "birthday" },
    { from: "converted", to: "suspend" },
    { from: "converted", to: "inactive" },
    { from: "converted", to: "checkins" },
  ]}
/>
```

- [ ] **Step 3: Add Weekly and Monthly Check-in Reset WorkflowCards**

Insert after the existing `10. Monthly Check-ins` WorkflowCard and before the `<h2>What the member experiences</h2>` heading:

```tsx
<WorkflowCard
  name="08. Weekly Check-ins | When Weekly Check-ins changes, wait till Sunday and empty field"
  purpose="Resets the weekly check-in counter to zero every Sunday. Watches the weekly check-in field for changes, waits until the end of the week, then clears the field so it starts fresh on Monday."
  status="published"
  workflowUrl="https://grow.hapana.com/location/cGie31g8caN2HkP6vN2P/workflow/dd59ae50-weekly-reset"
  steps={[
    {
      type: "condition",
      label: "Has the weekly check-in field changed?",
      detail: "Triggered when the counter is updated by the attendance workflow.",
    },
    {
      type: "wait",
      label: "Wait until Sunday",
      detail: "Pauses until the end of the current week.",
    },
    {
      type: "action",
      label: "Clear weekly check-in field",
      detail: "Sets the field to empty so the counter starts at 0 for the new week.",
    },
  ]}
  settings={{ allowReentry: true, stopOnResponse: false }}
/>

<WorkflowCard
  name="11. Monthly Check-ins | When Monthly Check-ins changes, wait till end of month and empty field"
  purpose="Resets the monthly check-in counter to zero at the end of each month. Same pattern as the weekly reset but on a monthly cycle."
  status="published"
  workflowUrl="https://grow.hapana.com/location/cGie31g8caN2HkP6vN2P/workflow/monthly-reset"
  steps={[
    {
      type: "condition",
      label: "Has the monthly check-in field changed?",
      detail: "Triggered when the counter is updated by the attendance workflow.",
    },
    {
      type: "wait",
      label: "Wait until end of month",
      detail: "Pauses until the last day of the current month.",
    },
    {
      type: "action",
      label: "Clear monthly check-in field",
      detail: "Sets the field to empty so the counter starts at 0 for the new month.",
    },
  ]}
  settings={{ allowReentry: true, stopOnResponse: false }}
/>
```

- [ ] **Step 4: Add the gotchas callout before "What the member experiences"**

Find `<h2>What the member experiences</h2>` and insert before it:

```tsx
<Callout type="warning" title="Common issues at this stage">
  <p>
    If the 60-day emails are not sending or a member who replied
    STOP is still receiving messages, check the{" "}
    <a href="/troubleshooting/email-notifications">
      Email & Notification Issues
    </a>{" "}
    troubleshooting page. Common causes: the member already has the
    &ldquo;60 day member nurture&rdquo; tag from a previous
    membership, or DND was enabled but the workflow had already
    queued the next message before DND took effect.
  </p>
</Callout>
```

- [ ] **Step 5: Verify in the browser**

Open http://localhost:3002/workflows/key-workflows/membership-journey and confirm:
- ConnectionDiagram shows at the top with the nurture spine and parallel utilities
- Two reset WorkflowCards appear after the existing counter workflows
- Gotchas callout appears before "What the member experiences"

- [ ] **Step 6: Commit**

```bash
git add src/app/workflows/key-workflows/membership-journey/page.tsx
git commit -m "feat: add connection diagram, check-in resets, and gotchas to Membership Journey"
```

---

### Task 8: Add Missing Workflows + Gotchas to System Workflows Page

**Files:**
- Modify: `src/app/workflows/key-workflows/system-workflows/page.tsx`

- [ ] **Step 1: Add unsubscribe/resubscribe WorkflowCards**

Insert before the `<h2>Summary</h2>` heading, add a new section:

```tsx
<h2>Email and SMS unsubscribe handling</h2>

<p>
  Three workflows handle contacts who unsubscribe from email or
  SMS. These are separate from the campaign-specific STOP handlers
  (covered above) because they handle global unsubscribe requests
  that apply across all messaging.
</p>

<WorkflowCard
  name="X Email Unsubscribe"
  purpose="When a contact clicks the unsubscribe link in any email, enables email DND so no further marketing emails are sent. Marks the conversation as read."
  status="published"
  workflowUrl="https://grow.hapana.com/location/cGie31g8caN2HkP6vN2P/workflow/email-unsub"
  steps={[
    {
      type: "action",
      label: "Enable Email DND",
      detail: "Sets the contact to Do Not Disturb for email. All future marketing emails are suppressed.",
    },
    {
      type: "action",
      label: "Mark conversation as read",
      detail: "Prevents the unsubscribe notification from cluttering the inbox.",
    },
  ]}
  settings={{ allowReentry: true, stopOnResponse: false }}
/>

<WorkflowCard
  name="X.1 Email Resubscribe"
  purpose="When a contact re-subscribes to emails (via a resubscribe form or manual action), removes the email DND flag so they can receive marketing emails again."
  status="published"
  workflowUrl="https://grow.hapana.com/location/cGie31g8caN2HkP6vN2P/workflow/email-resub"
  steps={[
    {
      type: "action",
      label: "Remove Email DND",
      detail: "Clears the Do Not Disturb flag for email, re-enabling marketing email delivery.",
    },
  ]}
  settings={{ allowReentry: true, stopOnResponse: false }}
/>

<WorkflowCard
  name="X.2 SMS Unsubscribe"
  purpose="Handles global SMS opt-outs that are not caught by the campaign-specific STOP handlers. Enables SMS DND across the board."
  status="published"
  workflowUrl="https://grow.hapana.com/location/cGie31g8caN2HkP6vN2P/workflow/sms-unsub"
  steps={[
    {
      type: "action",
      label: "Enable SMS DND",
      detail: "Sets the contact to Do Not Disturb for SMS. All future SMS messages are suppressed.",
    },
    {
      type: "action",
      label: "Mark conversation as read",
      detail: "Prevents the unsubscribe reply from cluttering the inbox.",
    },
  ]}
  settings={{ allowReentry: true, stopOnResponse: false }}
/>
```

- [ ] **Step 2: Add Call Metrics WorkflowCards**

Insert after the unsubscribe section and before `<h2>Summary</h2>`:

```tsx
<h2>Call metrics tracking</h2>

<p>
  Four workflows track outgoing call activity for studio
  reporting. They increment counters when calls are made, reset
  the counters on weekly and monthly schedules, and add notes when
  a called contact converts.
</p>

<WorkflowCard
  name="01. Call Metrics | Add 1 to all fields when an outgoing call is made"
  purpose="When the studio makes an outgoing call, increments the daily, weekly, and monthly call counters by 1. Used for call activity reporting and team performance tracking."
  status="published"
  workflowUrl="https://grow.hapana.com/location/cGie31g8caN2HkP6vN2P/workflow/call-metrics-add"
  steps={[
    {
      type: "action",
      label: "Math operation: add 1 to daily calls",
      detail: "Increments the daily call counter.",
    },
    {
      type: "action",
      label: "Math operation: add 1 to weekly calls",
      detail: "Increments the weekly call counter.",
    },
    {
      type: "action",
      label: "Math operation: add 1 to monthly calls",
      detail: "Increments the monthly call counter.",
    },
  ]}
  settings={{ allowReentry: true, stopOnResponse: false }}
/>

<WorkflowCard
  name="02. Call Metrics | Monthly Reset"
  purpose="At the end of each month, resets the monthly call counter to zero."
  status="published"
  workflowUrl="https://grow.hapana.com/location/cGie31g8caN2HkP6vN2P/workflow/call-monthly-reset"
  steps={[
    {
      type: "wait",
      label: "Wait until end of month",
      detail: "Pauses until the last day of the current month.",
    },
    {
      type: "action",
      label: "Clear monthly call counter",
      detail: "Sets the monthly call field to empty for the new month.",
    },
  ]}
  settings={{ allowReentry: true, stopOnResponse: false }}
/>

<WorkflowCard
  name="03. Call Metrics | Weekly Reset"
  purpose="At the end of each week, resets the weekly call counter to zero."
  status="published"
  workflowUrl="https://grow.hapana.com/location/cGie31g8caN2HkP6vN2P/workflow/call-weekly-reset"
  steps={[
    {
      type: "wait",
      label: "Wait until Sunday",
      detail: "Pauses until end of the current week.",
    },
    {
      type: "action",
      label: "Clear weekly call counter",
      detail: "Sets the weekly call field to empty for the new week.",
    },
  ]}
  settings={{ allowReentry: true, stopOnResponse: false }}
/>

<WorkflowCard
  name="04. Call Metrics | Add Notes when they convert"
  purpose="When a contact who was called subsequently purchases, adds a note to the contact record linking the call activity to the conversion."
  status="published"
  workflowUrl="https://grow.hapana.com/location/cGie31g8caN2HkP6vN2P/workflow/call-conversion-note"
  steps={[
    {
      type: "condition",
      label: "Did their Active Package change?",
      detail: "Detects that a purchase happened.",
    },
    {
      type: "action",
      label: "Add note: Call converted to purchase",
      detail: "Records the conversion for call performance reporting.",
    },
  ]}
  settings={{ allowReentry: true, stopOnResponse: false }}
/>
```

- [ ] **Step 3: Update the Summary table**

In the existing `<table>` inside the Summary section, add three new rows before the closing `</tbody>`:

```tsx
<tr>
  <td><strong>Email/SMS unsubscribe</strong></td>
  <td>Enables DND when contacts unsubscribe from email or SMS globally</td>
  <td>If a contact who unsubscribed is still receiving marketing messages</td>
</tr>
<tr>
  <td><strong>Call metrics</strong></td>
  <td>Tracks outgoing calls, resets weekly and monthly counters, notes conversions</td>
  <td>If call activity reports show zero or the counters are not resetting</td>
</tr>
```

- [ ] **Step 4: Add the gotchas callout before the Summary section**

Find `<h2>Summary</h2>` and insert before it:

```tsx
<Callout type="warning" title="Common issues at this stage">
  <p>
    Date stamps showing the wrong date after a contact merge, or
    duplicate pipeline cards appearing after a manual data cleanup?
    Check the{" "}
    <a href="/troubleshooting/contact-duplicates">
      Contact Duplicates & Merges
    </a>{" "}
    troubleshooting page. System workflows fire on field changes,
    and merging two contacts can trigger multiple field updates at
    once.
  </p>
</Callout>
```

- [ ] **Step 5: Verify in the browser**

Open http://localhost:3002/workflows/key-workflows/system-workflows and confirm:
- Unsubscribe section appears with 3 WorkflowCards
- Call Metrics section appears with 4 WorkflowCards
- Summary table has 2 new rows
- Gotchas callout appears before the Summary section

- [ ] **Step 6: Commit**

```bash
git add src/app/workflows/key-workflows/system-workflows/page.tsx
git commit -m "feat: add unsubscribe, call metrics, and gotchas to System Workflows"
```

---

### Task 9: Convert Existing WorkflowCards to Use Branch Structure

**Files:**
- Modify: `src/app/workflows/key-workflows/new-intro-offers/page.tsx`
- Modify: `src/app/workflows/key-workflows/new-leads/page.tsx`
- Modify: `src/app/workflows/key-workflows/during-intro-offer/page.tsx`
- Modify: `src/app/workflows/key-workflows/membership-journey/page.tsx`
- Modify: `src/app/workflows/key-workflows/system-workflows/page.tsx`

This task converts the 8 complex WorkflowCards from flat step lists to use the new `branches` field. Do them one at a time and verify each in the browser.

- [ ] **Step 1: Convert Intro Offer Status Update (new-intro-offers page)**

Find the `01. Intro Offer Status Update` WorkflowCard. Replace its `steps` array with a version that uses the `branches` field on the routing condition. The main condition ("What is their Active Package Category?") becomes a branched step:

```tsx
steps={[
  {
    type: "wait",
    label: "Wait (failsafe)",
    detail: "Short pause to let the Core to Grow sync complete before checking fields.",
  },
  {
    type: "condition",
    label: "What triggered this? Contact Created with Account Created tag, or something else?",
    detail: "Determines whether this contact just arrived from Core (new account) or an existing contact had their package updated.",
  },
  {
    type: "condition",
    label: "What is their Active Package Category?",
    detail: "The main routing check. Three branches based on what the contact currently has.",
    branches: [
      {
        label: "Intro Offer",
        steps: [
          {
            type: "action",
            label: "Update custom fields",
            detail: "Sets Intro Offer Name, Purchase Date, Pipeline Status = Pre, Pipeline Day = 0.",
          },
          {
            type: "action",
            label: "Add note: Intro Offer Purchase Information",
            detail: "Writes a note with Active Package, Purchase Date, and tracking fields.",
          },
          {
            type: "action",
            label: "Update opportunity in Intro Offer Pipeline",
            detail: "Creates or updates their pipeline card in the correct stage.",
          },
          {
            type: "action",
            label: "Add tag: pipeline - intro offer",
            detail: "Tags the contact for pipeline identification.",
          },
          {
            type: "link",
            label: "Add to False Starter workflow",
            detail: "Enrolls them in the False Starter Check.",
            linkTo: "/workflows/key-workflows/during-intro-offer",
          },
        ],
      },
      {
        label: "Membership / Package",
        steps: [
          {
            type: "action",
            label: "Find opportunity, mark as Won",
            detail: "Locates their Intro Offer Pipeline card and marks it as won.",
          },
          {
            type: "action",
            label: "Remove from daily workflows + cleanup",
            detail: "Removes from all Day X workflows, waits 14 days, then removes the opportunity and pipeline tag.",
          },
        ],
      },
      {
        label: "Empty (Expired)",
        steps: [
          {
            type: "action",
            label: "Create follow-up task",
            detail: "Creates a task for the studio to follow up with the expired contact.",
          },
          {
            type: "action",
            label: "Clean up pipeline card and tags",
            detail: "Removes from daily workflows, updates pipeline status, removes opportunity after delay.",
          },
        ],
      },
    ],
  },
]}
```

- [ ] **Step 2: Convert Birthday Studio Notification (membership-journey page)**

Find the `03. Birthday Studio Notification` WorkflowCard. Replace its steps to use branches on the "Is their Active Package empty?" condition:

```tsx
steps={[
  {
    type: "condition",
    label: "Is their Active Package empty?",
    detail: "Routes to different notifications for leads vs active members.",
    branches: [
      {
        label: "Lead (no package)",
        steps: [
          {
            type: "action",
            label: "Internal notification: Email to Studio",
            detail: "Sends a simpler birthday notification. The studio may choose to send a birthday offer.",
          },
        ],
      },
      {
        label: "Member / Package holder",
        steps: [
          {
            type: "action",
            label: "Add task: Birthday Preparation",
            detail: "Creates a task for the studio to prepare a birthday acknowledgment.",
          },
          {
            type: "action",
            label: "Internal notification: Email to Studio",
            detail: "Sends the full birthday notification with member details and status.",
          },
        ],
      },
    ],
  },
]}
```

- [ ] **Step 3: Convert Membership Suspensions (membership-journey page)**

Find the `05. Membership | Suspensions` WorkflowCard. Replace its steps to use branches on the "What did their Location Status change to?" condition:

```tsx
steps={[
  {
    type: "condition",
    label: "Do they actually have 'suspendedMembership' in their Location Status?",
    detail: "Confirms the suspension is real before proceeding.",
  },
  {
    type: "action",
    label: "Add tag: suspended membership",
    detail: "Tags the contact for filtering and workflow routing.",
  },
  {
    type: "action",
    label: "Update field: Date Membership Suspended",
    detail: "Stamps when the suspension started for reporting.",
  },
  {
    type: "wait",
    label: "Wait for status change",
    detail: "Waits for their Location Status to change again.",
  },
  {
    type: "condition",
    label: "What did their Location Status change to?",
    detail: "Routes based on outcome after suspension ends.",
    branches: [
      {
        label: "Returned to Active",
        steps: [
          {
            type: "action",
            label: "Remove tag: suspended membership",
            detail: "Cleans up the suspension tag.",
          },
          {
            type: "action",
            label: "Add tag: recently suspended",
            detail: "Prevents the purchase date workflow from re-stamping.",
          },
          {
            type: "wait",
            label: "Wait",
            detail: "Short pause for the temporary tag window.",
          },
          {
            type: "action",
            label: "Remove tag: recently suspended",
            detail: "Removes the temporary tag after the window has passed.",
          },
        ],
      },
      {
        label: "Went Inactive",
        steps: [
          {
            type: "action",
            label: "Remove tag: suspended membership",
            detail: "Cleans up the suspension tag.",
          },
        ],
      },
    ],
  },
]}
```

- [ ] **Step 4: Convert Active Package Change Internal Notification (system-workflows page)**

Find the `03. Systems | Active Package Change Internal Notification` WorkflowCard. Replace its steps:

```tsx
steps={[
  {
    type: "wait",
    label: "Wait (failsafe)",
    detail: "Short pause for sync.",
  },
  {
    type: "condition",
    label: "What is their Active Package Category?",
    detail: "Routes to different notification emails based on what was purchased.",
    branches: [
      {
        label: "Intro Offer",
        steps: [
          {
            type: "action",
            label: "Internal notification: Intro Offer purchase",
            detail: "Sends an email to the studio when someone purchases an intro offer.",
          },
        ],
      },
      {
        label: "Membership / Package (new)",
        steps: [
          {
            type: "condition",
            label: "Do they have the 'recently suspended' tag?",
            detail: "Checks whether this is a new purchase or a return from suspension.",
          },
          {
            type: "action",
            label: "Internal notification: New purchase",
            detail: "Sends a new purchase notification (excluding returns from suspension).",
          },
        ],
      },
      {
        label: "Return from suspension",
        steps: [
          {
            type: "action",
            label: "Internal notification: Return from suspension",
            detail: "Sends a different notification noting they returned from suspension.",
          },
        ],
      },
    ],
  },
]}
```

- [ ] **Step 5: Verify all converted cards in the browser**

Open each page and expand the converted WorkflowCards:
- http://localhost:3002/workflows/key-workflows/new-intro-offers — Intro Offer Status Update shows 3-column branch
- http://localhost:3002/workflows/key-workflows/membership-journey — Birthday shows 2-column, Suspensions shows 2-column
- http://localhost:3002/workflows/key-workflows/system-workflows — Active Package Notification shows 3-column

Confirm the GHL-style layout renders: condition box on top, columns below, step boxes stacked in each column.

- [ ] **Step 6: Commit**

```bash
git add src/app/workflows/key-workflows/new-intro-offers/page.tsx \
        src/app/workflows/key-workflows/membership-journey/page.tsx \
        src/app/workflows/key-workflows/system-workflows/page.tsx
git commit -m "feat: convert 4 WorkflowCards to GHL-style branch visualization"
```

---

### Task 10: Final Verification Pass

- [ ] **Step 1: Full page-by-page browser check**

Visit every Key Workflows page and verify:

1. http://localhost:3002/workflows/key-workflows — JourneyMap renders, all stage boxes link correctly
2. http://localhost:3002/workflows/key-workflows/new-leads — ConnectionDiagram, gotchas callout, all existing cards still render
3. http://localhost:3002/workflows/key-workflows/new-intro-offers — ConnectionDiagram, retired Experience badge, branched Status Update card, gotchas callout
4. http://localhost:3002/workflows/key-workflows/during-intro-offer — ConnectionDiagram, Day 15 card, Halfway SMS card, 2 pipeline verification cards, gotchas callout
5. http://localhost:3002/workflows/key-workflows/membership-journey — ConnectionDiagram, 2 reset cards, branched Birthday + Suspensions cards, gotchas callout
6. http://localhost:3002/workflows/key-workflows/system-workflows — 3 unsub cards, 4 call metrics cards, branched notification card, updated summary table, gotchas callout

- [ ] **Step 2: Run type check**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit any final fixes**

If any issues were found and fixed:

```bash
git add -A
git commit -m "fix: address issues found in final verification pass"
```
