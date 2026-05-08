# Key Workflows Improvements | Design Spec

## Overview

Improve the Key Workflows section of the Grow Training Guide with visual diagrams, branch visualization, missing workflow coverage, gotchas, and accuracy fixes. The goal is to make the workflow system fully understandable for Kaizen team members (Chloe, Aaron, Juan) and potentially studio owners.

## Design Decisions

| Decision | Choice | Reasoning |
|---|---|---|
| Diagram technology | Custom React/SVG components | Pixel-perfect design system match, interactive (click-to-navigate), responsive, reusable |
| Diagram orientation | Top-to-bottom | Matches GHL workflow builder, familiar mental model for anyone who uses Grow |
| Diagram placement | Hub page journey map + per-page connection diagrams | Two zoom levels: orient on the hub, drill into each stage |
| Branch visualization | GHL-style column layout | Condition box fans out into side-by-side columns, each with stacked step boxes flowing down. Mirrors the actual builder |
| Missing workflow scope | 10 additions across existing pages | Contact-journey and system-critical workflows only. Campaign-specific, legacy, and temp workflows skipped |
| Gotchas placement | Callout section per page before "What the contact experiences" | Links to matching troubleshooting category |

## New Components

### 1. JourneyMap

**File:** `src/components/JourneyMap.tsx`

Full journey flowchart for the Key Workflows hub page. Top-to-bottom flow:

- Three entry sources at top (Website Form, Facebook/Instagram Ad, Core Account Created)
- Merge into Stage 1: New Leads
- Transition label on connector: "Lead purchases intro offer in Core"
- Stage 2: New Intro Offers
- Transition label: "Enrolled in attendance + daily tracking"
- Stage 3: During Intro Offer
- Fans into three exit boxes: Won (green), Lost (red), Expired (grey)
- Won flows down into Stage 4: Membership Journey
- System Workflows bar at bottom with dashed border (runs at every stage)

Each stage box is clickable, linking to its sub-page. Uses STRONG Blue (#98C8EB) for stage borders, amber pills for transition labels.

**Props:** None needed. The journey is static and defined inline.

### 2. ConnectionDiagram

**File:** `src/components/ConnectionDiagram.tsx`

Smaller per-page diagram showing how workflows on that page connect. Same box + connector visual language as JourneyMap. Placed after intro text, before first WorkflowCard.

**Props:**
```typescript
interface ConnectionDiagramProps {
  nodes: {
    id: string
    label: string
    type: "source" | "workflow" | "outcome" | "handoff"
    description?: string
  }[]
  connections: {
    from: string
    to: string
    label?: string
  }[]
}
```

**Per-page diagrams:**

- **New Leads:** 3 entry sources → respective workflows → converge into "Lead in Pipeline" → branch to post-booking workflows
- **New Intro Offers:** Core purchase → Intro Offer Status Update (central router) → fans to Purchase Confirmation + pipeline tagging + Leads Pipeline cleanup
- **During Intro Offer:** Two parallel tracks (daily progression chain + attendance track) → both feed into 3 exits (Won/Lost/Expired)
- **Membership Journey:** Converted from intro offer → 60-Day Nurture spine → parallel utility workflows branching off (milestones, birthdays, suspension, inactivity)
- **System Workflows:** No connection diagram (independent utilities, existing summary table is sufficient)

### 3. WorkflowCard v2

**File:** `src/components/WorkflowCard.tsx` (modify existing)

Enhanced step data structure:

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

**Rendering rules:**
- When a condition step has `branches`: render GHL-style column layout (condition box at top, columns fan out below with stacked step boxes, connector lines between everything)
- When a condition step has NO `branches`: render as a simple check step in the linear list (current behavior, for guard checks)
- Branches can nest (a branch can contain another condition with branches)
- Step boxes inside branches use the same type-colored badges (blue ACTION, purple CHECK, grey WAIT, amber WORKFLOW)
- Connector lines between all boxes (2px, #d1d5db for regular, #7c3aed for condition fan-out)

**New status value:**
- `status: "retired"` renders with a grey badge and a one-line explanation that this is a predecessor product kept for reference

## Content Changes

### Accuracy Fixes

1. **STRONG Experience Purchase Confirmation:** Change status from `"published"` to `"retired"`. Add context explaining it's the predecessor to STRONG Intro Offer, permanently retired.

2. **Wait step durations:** Replace vague "Short pause" descriptions with actual durations sourced from `~/Projects/grow-user-guide/workflows-parsed-v2.json` where available.

### Missing Workflow Coverage (10 additions)

**During Intro Offer page:**
- Day 15 (final day cleanup)
- 02. First Class Complete and Halfway SMS (mid-offer contact touchpoint)
- 08. Pipeline Stage Verification: Moved to Expired (safety net)
- 09. Pipeline Stage Verification: Moved to Memberships (safety net)

**Membership Journey page:**
- 08. Weekly Check-in Reset (wait till Sunday, empty field)
- 11. Monthly Check-in Reset (wait till end of month, empty field)

**System Workflows page:**
- X. Email Unsubscribe
- X.1. Email Resubscribe
- X.2. SMS Unsubscribe
- Call Metrics (4 workflows documented as a group: increment on outgoing call, weekly reset, monthly reset, conversion notes)

### Skipped Workflows (not in scope)

Campaign-specific (STRONG Start Challenge, Database Push), retired STRONG Experience variants (3), presale funnels (5 workflows, separate system), legacy handling (Intro to Strong expired), temp/utility (Bulk SMS, Hapana Temp, ClassPass cleanup, Family & Friends tagging). These belong in a future "Campaigns" section or are operational rather than educational.

### Gotchas / Common Issues

Each Key Workflows page gets a "Common Issues" Callout section placed before "What the contact experiences":

| Page | Linked Troubleshooting Category |
|---|---|
| New Leads | Workflow Timing & Tasks (lead not receiving welcome SMS, task assigned to wrong user) |
| New Intro Offers | Core to Grow Sync Gaps (purchase not detected, Active Package not updating) |
| During Intro Offer | Pipeline Inaccuracy (wrong day, inflated visit counter, premature expiry) |
| Membership Journey | Email & Notification Issues (60-day emails not sending, DND contacts still receiving) |
| System Workflows | Contact Duplicates & Merges (date stamps wrong after merge, duplicate pipeline cards) |

Uses the existing `Callout` component with `type="warning"` and links to the matching `/troubleshooting/*` sub-page.

### WorkflowCard Branch Conversions

These existing WorkflowCards get converted from flat step lists to branched structure:

- **01. Intro Offer Status Update** (3 branches: Intro Offer / Membership / Expired)
- **01. Purchase Confirmation + Intro Nurture** (4 branches: new purchase no visits / new purchase attended / re-intro no visits / re-intro attended)
- **02. Intro Offer Visits Update** (2 branches: Pre status / Active status)
- **03. Birthday Studio Notification** (2 branches: lead / member)
- **03. First Visit Complete Check-in** (4 branches by package type)
- **03. Systems | Active Package Change Internal Notification** (3 branches: intro offer / new membership / return from suspension)
- **01. Core_Sale Update** (branches per pipeline check)
- **05. Membership | Suspensions** (2 branches: returned to active / went inactive)

## Design System Compliance

All new components use:
- Cream background (#FAF8F5) for diagram containers
- White (#FFFFFF) for step/stage boxes
- STRONG Blue (#98C8EB) for stage borders and accents
- Purple (#7c3aed) for condition nodes and branch connectors
- Blue (#2563eb) for action badges
- Amber (#b45309) for workflow link badges
- Grey (#6b7280) for wait badges
- Kessel Heavy (900) uppercase for stage labels inside JourneyMap
- Montserrat 400 for step descriptions
- No dashes in any copy
- Top-to-bottom flow orientation everywhere

## Files Changed

| File | Change |
|---|---|
| `src/components/JourneyMap.tsx` | New component |
| `src/components/ConnectionDiagram.tsx` | New component |
| `src/components/WorkflowCard.tsx` | Add branch rendering, add "retired" status |
| `src/app/workflows/key-workflows/page.tsx` | Add JourneyMap above existing table |
| `src/app/workflows/key-workflows/new-leads/page.tsx` | Add ConnectionDiagram, add gotchas callout |
| `src/app/workflows/key-workflows/new-intro-offers/page.tsx` | Add ConnectionDiagram, add gotchas callout, mark Experience as retired |
| `src/app/workflows/key-workflows/during-intro-offer/page.tsx` | Add ConnectionDiagram, add gotchas callout, add 4 missing workflows |
| `src/app/workflows/key-workflows/membership-journey/page.tsx` | Add ConnectionDiagram, add gotchas callout, add 2 missing workflows |
| `src/app/workflows/key-workflows/system-workflows/page.tsx` | Add gotchas callout, add 6 missing workflows (unsub + call metrics) |

## Out of Scope

- Funnel Builder section
- Campaign-specific workflow documentation
- Presale workflow documentation
- Screenshots of live Grow interface
- Loom video embeds
- Deployment changes
