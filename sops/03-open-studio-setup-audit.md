# SOP 03 | Open-Studio Setup Audit

**What this is for:** confirming a studio that should already be open is (1) genuinely operating, (2) actually set up correctly per SOP 01 + 02, and (3) running the current versions of HQ's workflows. Use it for any open or recently-opened studio, and any time we suspect setup steps were missed.

**The principle:** do not trust the onboarding tracker as proof. The "Open Set Up Completed" column is not reliably kept up to date, so a blank does not mean it is undone, and a "Yes" is not proof it is done. We verify against Core and Grow directly.

---

## Step 1 | Is the studio actually open?

We read this from the studio's live class schedule in Core, not from the tracker.

- **No Core site** for the studio → it is not operating at all.
- **Core site exists but no classes scheduled** → it has been set up but is not actually running yet.
- **A real weekly timetable with classes and instructors** → it is genuinely open.

A studio with a future open date and no schedule is fine (it is presale). The ones that matter are studios that are supposed to be open but show no schedule, or claim to be open in the tracker but have no Core site.

---

## Step 2 | Is the setup actually complete?

These are the things that must be true on the live Grow account for the studio's intro journey to work. This is the evidence that SOP 02 was genuinely done.

1. **The Day journey is fully live (Day 0 through Day 15).** Every day-step workflow that moves a person through the intro pipeline, Day 0 to Day 15, must be turned on. If even one is off, people get stuck on that day and never move forward. Day 16 to Day 21 are leftovers from the old 21-day offer and are not needed, so ignore those.
2. **The pipeline engine workflows are live.** The behind-the-scenes workflows that mark people as purchased, won, lost, update their visits, and check first visits. The Status Update workflow now also handles moving people to Membership or Expired, so the old separate "Moved to Expired" and "Moved to Memberships" workflows are no longer needed.
3. **Their lead-capture workflow is on AND has a trigger.** A new-lead workflow that is switched on but has no trigger captures nobody. Both have to be true.
4. **The 6 standard smart lists exist** (All Database, Leads Only, Active Intro Offer, Active Packages, Active Memberships, Past Purchases) and are shared with everyone.
5. **The core custom values are filled in** (the sign-off names, unsubscribe and resubscribe links, the Twilio number, and the push-notification credentials).
6. **The system workflows are on** (unsubscribe, resubscribe, Core Sale Update, and the pipeline workflows).

**If the Day journey or the pipeline engine is incomplete:** people have already been purchasing the intro offer while it was broken, so those contacts are stranded mid-journey. Those studios need the **Core backfill** (manually pushing the affected people through the steps they missed), on top of fixing the workflows.

A note on products: studios run different intro offers (7 Classes, STRONG Intro Offer, STRONG Experience, Starter) depending on region and stage. Check what the studio actually runs before deciding a workflow being off is a problem, rather than assuming every studio should look identical.

---

## Step 3 | Are the studio's workflows the current version?

This is the easy one to miss. When a studio is created, Hapana takes a **snapshot** of HQ's workflows at that moment and copies them in. That snapshot is frozen. If HQ later improves a workflow, the studio keeps the old version. So a workflow can be switched on and look complete, but actually be running outdated steps.

To check, we compare the **steps inside** each workflow at the studio against the same workflow in the HQ template, and flag any where the studio is missing steps HQ has since added. We compare the steps themselves, not whether they are on or off, because the template is deliberately kept switched off (it is the source we snapshot from).

The clearest example: the Status Update workflow. After HQ added the move-to-Membership and move-to-Expired logic into it, any studio snapshotted before that change is missing those steps even though their workflow is switched on. Those studios need the updated workflow re-snapshotted or fixed by hand.

---

## When you find gaps

- **Workflow off or missing** → turn it on, or copy it in from the template if it is not there.
- **Outdated workflow steps** → re-snapshot that workflow from HQ, or update the steps by hand.
- **Stranded contacts** (incomplete Day journey or engine) → these people need the **Core backfill**. The build side runs the existing `strong-intro-pipeline-fix` process: it reads each active intro member's actual class attendance from Core and rebuilds their position in the pipeline (sets their visit count and first-visit date, then moves them to the correct day/stage). This is the same process used for Mockingbird, Morristown and others — it is not new work.
- **Studio runs a different product than expected** → confirm with the regional lead before changing anything.

**How this fits the bigger picture:** this audit is the *triage* — it tells us which open studios are incompletely set up or running outdated workflows. The actual *fix* for a flagged studio (checking its workflows step-by-step against HQ, then backfilling the stranded members from Core) is the existing `strong-intro-pipeline-fix` process. So: this audit finds them, that process fixes them.

The technical version of this audit (exact workflow names, API calls, and the automated checker) is documented for the build side under `reference_strong-open-studio-setup-audit`.
