import { PageLayout } from "@/components/PageLayout"
import { Callout } from "@/components/Callout"
import { ConnectionDiagram } from "@/components/ConnectionDiagram"
import { WorkflowCard } from "@/components/WorkflowCard"

export default function NewIntroOffers() {
  return (
    <PageLayout
      title="New Intro Offers"
      description="Purchase detection, welcome sequence, pipeline setup, and seasonal campaign handling."
      slug="/workflows/key-workflows/new-intro-offers"
    >
      <p>
        When a contact purchases an intro offer, a chain of workflows
        detects the purchase, sets up their Intro Offer Pipeline card,
        sends a welcome sequence, and prepares the day-by-day tracking
        that the next page covers. These workflows split into two
        categories: permanent infrastructure that runs regardless of
        which intro offer is active, and seasonal welcome sequences that
        change when the campaign changes.
      </p>

      <h2>What happens when someone purchases</h2>

      <p>
        The purchase itself happens in Hapana Core. When the Core to Grow
        sync updates the contact&apos;s Active Package field, that change
        triggers the Intro Offer Status Update workflow, which is the
        central router for the entire intro offer system. From there,
        the contact is routed to the correct Purchase Confirmation
        workflow, tagged, added to the pipeline, and enrolled in the
        day-by-day tracking.
      </p>

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

      <h2>Section 1: Permanent infrastructure</h2>

      <p>
        These workflows run continuously regardless of which intro offer
        campaign is active. They handle the routing, pipeline setup,
        tagging, and Leads Pipeline cleanup that every intro offer
        purchase needs.
      </p>

      <WorkflowCard
        name="01. Intro Offer Status Update | adds to Purchase, or move to Membership or Expired"
        purpose="The central router for all intro offer activity. Detects whether the contact has purchased an intro offer, upgraded to a membership, or let their offer expire, and routes them to the correct pipeline stage and workflows."
        status="published"
        workflowUrl="https://grow.hapana.com/location/cGie31g8caN2HkP6vN2P/workflow/db19caa1-e1ef-41f4-b71d-0c7a24655242"
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
        settings={{ allowReentry: true, stopOnResponse: false }}
      />

      <Callout type="tip" title="This workflow handles three life events">
        <p>
          Despite its name, the Intro Offer Status Update does not just
          handle purchases. It also handles membership upgrades and
          expired offers. Each branch leads to different actions:
          purchases set up the pipeline, upgrades mark the opportunity
          as won, and expirations create follow-up tasks.
        </p>
      </Callout>

      <WorkflowCard
        name="04. STRONG Intro Offer | Purchased the STRONG Intro Offer [move to purchased in Leads]"
        purpose="When a lead who came through a Facebook ad or lead pipeline purchases an intro offer, this workflow finds their Leads Pipeline opportunity, moves it to the 'Purchased' stage, removes lead nurture tags, and cleans up the Leads Pipeline card after a delay."
        status="published"
        workflowUrl="https://grow.hapana.com/location/cGie31g8caN2HkP6vN2P/workflow/6ef5857c-82e3-441e-95c1-231be70d22c5"
        steps={[
          {
            type: "wait",
            label: "Wait (failsafe)",
            detail: "Short pause to let all data sync.",
          },
          {
            type: "condition",
            label: "Does their Active Package contain 'STRONG Intro' or 'STRONG Re-Intro'?",
            detail: "Confirms they actually purchased an intro offer before modifying the Leads Pipeline.",
          },
          {
            type: "action",
            label: "Find opportunity in Leads Pipeline",
            detail: "Searches for their existing Leads Pipeline card. If they came from a lead workflow, they will have one.",
          },
          {
            type: "action",
            label: "Update opportunity to 'Purchased' stage",
            detail: "Moves the Leads Pipeline card to the Purchased column so the studio can see at a glance that this lead converted.",
          },
          {
            type: "action",
            label: "Remove tag: active - strong intro offer nurture",
            detail: "Stops the lead nurture sequence from sending further messages.",
          },
          {
            type: "link",
            label: "Remove from Lead Nurture Workflows",
            detail: "Removes the contact from all active lead nurture workflows so they stop receiving lead-stage messaging.",
          },
          {
            type: "wait",
            label: "Wait",
            detail: "Pauses before removing the Leads Pipeline card. This gives the studio time to see the 'Purchased' status.",
          },
          {
            type: "action",
            label: "Remove opportunity from Leads Pipeline",
            detail: "Cleans up the Leads Pipeline card. The contact now lives in the Intro Offer Pipeline instead.",
          },
          {
            type: "action",
            label: "Remove tag: pipeline - leads pipeline",
            detail: "Final cleanup of the leads pipeline tag.",
          },
        ]}
        settings={{ allowReentry: true, stopOnResponse: false }}
      />

      <WorkflowCard
        name="01. Add tag 'pipeline - intro offer' if they're added into the pipeline"
        purpose="A utility workflow that adds the 'pipeline - intro offer' tag when a contact enters the Intro Offer Pipeline. This tag lets other workflows identify contacts who are in the pipeline system."
        status="published"
        workflowUrl="https://grow.hapana.com/location/cGie31g8caN2HkP6vN2P/workflow/f4fa0374-af89-4d56-9472-eabb903feb61"
        steps={[
          {
            type: "action",
            label: "Add tag: pipeline - intro offer",
            detail: "Tags the contact for pipeline identification.",
          },
          {
            type: "wait",
            label: "Wait",
            detail: "Short pause before verifying the opportunity exists.",
          },
          {
            type: "action",
            label: "Find opportunity in Intro Offer Pipeline",
            detail: "Looks for their pipeline card to confirm they are properly set up.",
          },
          {
            type: "condition",
            label: "Opportunity found?",
            detail: "If found, the tag stays. If not found (they were removed from the pipeline), the tag is removed to keep data clean.",
          },
          {
            type: "action",
            label: "Remove tag if no opportunity found",
            detail: "If they do not have an Intro Offer Pipeline opportunity, removes the tag so they are not falsely identified as being in the pipeline.",
          },
        ]}
        settings={{ allowReentry: true, stopOnResponse: false }}
      />

      <WorkflowCard
        name="06. STRONG Intro Offer | Add Tag 'active - 5 session strong intro offer' and remove after 14 days from first visit"
        purpose="Manages the time-sensitive 'active' tag that identifies contacts currently on the 5-session STRONG Intro Offer. The tag is added when they purchase and automatically removed 14 days after their first visit, regardless of how many sessions they have left."
        status="published"
        workflowUrl="https://grow.hapana.com/location/cGie31g8caN2HkP6vN2P/workflow/d3abda6b-62cc-4790-b6dc-c1204e3bbca0"
        steps={[
          {
            type: "wait",
            label: "Wait (failsafe)",
            detail: "Short pause for sync.",
          },
          {
            type: "condition",
            label: "Does their Active Package contain 'STRONG Intro Offer'?",
            detail: "Checks for STRONG Intro Offer, STRONG Re-Intro Offer, or if they already have attendance (meaning they started before being tagged).",
          },
          {
            type: "action",
            label: "Add tag: active - 5 session strong intro offer",
            detail: "Marks the contact as actively on the intro offer.",
          },
          {
            type: "wait",
            label: "Wait 14 days",
            detail: "Waits 14 days from first visit. This is the intro offer validity window.",
          },
          {
            type: "action",
            label: "Remove tag: active - 5 session strong intro offer",
            detail: "After 14 days, the tag is removed regardless of remaining sessions. The intro offer period is over.",
          },
        ]}
        settings={{ allowReentry: true, stopOnResponse: false }}
      />

      <Callout type="warning" title="The 14-day window is hard-coded">
        <p>
          The intro offer validity period (14 days from first visit) is
          built into this workflow&apos;s Wait step. If the intro offer
          terms change to a different validity window, this workflow
          needs to be updated.
        </p>
      </Callout>

      <h2>Section 2: Seasonal welcome sequences</h2>

      <p>
        Each intro offer campaign has its own Purchase Confirmation
        workflow that sends the welcome email, creates the call task,
        and starts the nurture sequence. When the campaign changes (for
        example, from STRONG Intro Offer to STRONG Experience), the old
        workflow is set to draft and a new one is published. The
        permanent infrastructure workflows above do not change.
      </p>

      <p>
        All Purchase Confirmation workflows follow the same pattern,
        but with different email content and field values tailored to
        the specific offer. There are also regional variants (USA/CA,
        UK/IE) that use different pricing and terminology.
      </p>

      <h3>The current published workflows</h3>

      <WorkflowCard
        name="01. STRONG Intro Offer | Purchase Confirmation + Intro Nurture"
        purpose="The currently active welcome sequence for the STRONG Intro Offer (5 sessions). Sends the welcome email, creates a call task for the studio, enrolls the contact in attendance tracking, and follows up with the brand story email."
        status="published"
        workflowUrl="https://grow.hapana.com/location/cGie31g8caN2HkP6vN2P/workflow/1f3392f3-a00f-477b-aa71-193aa2336db5"
        steps={[
          {
            type: "wait",
            label: "Wait (failsafe)",
            detail: "Short pause to let all data sync before checking fields.",
          },
          {
            type: "condition",
            label: "Does their Active Package Category contain Memberships or Packages?",
            detail: "Safety check. If they already have a membership, they do not need a welcome sequence for an intro offer.",
          },
          {
            type: "condition",
            label: "Does their Active Package contain 'STRONG Intro Offer'?",
            detail: "Routes into four branches: new purchase (no visits), new purchase (already attended 1 class), re-intro offer (no visits), and re-intro offer (already attended). Each branch has slightly different field values.",
          },
          {
            type: "action",
            label: "Update fields: Intro Offer Name and other tracking fields",
            detail: "Sets the Intro Offer Name to the specific package name and updates any other fields needed for this offer type.",
          },
          {
            type: "action",
            label: "Update opportunity in Intro Offer Pipeline",
            detail: "Updates the pipeline card with the correct stage based on attendance status.",
          },
          {
            type: "action",
            label: "Add tag: pipeline - intro offer",
            detail: "Ensures the pipeline tag is present.",
          },
          {
            type: "action",
            label: "Send email: 'You're in. Let's Get STRONG.'",
            detail: "The welcome email confirming their purchase. Includes what to expect, how to book, and studio details.",
          },
          {
            type: "action",
            label: "Add task: Welcome Call",
            detail: "Creates a task for the studio team to call the new purchaser and welcome them personally.",
          },
          {
            type: "link",
            label: "Add to Attendance Check and Tasking workflow",
            detail: "Enrolls the contact in the booking reminder and no-show follow-up workflow.",
            linkTo: "/workflows/key-workflows/during-intro-offer",
          },
          {
            type: "wait",
            label: "Wait",
            detail: "Pauses before sending the brand story email.",
          },
          {
            type: "action",
            label: "Send email: 'From one studio to a global movement'",
            detail: "Brand story email that builds connection with the STRONG Pilates brand and community.",
          },
        ]}
        settings={{ allowReentry: true, stopOnResponse: false }}
      />

      <WorkflowCard
        name="01. STRONG Experience | Purchase Confirmation + Intro Nurture"
        purpose="[Retired: predecessor to STRONG Intro Offer, kept for reference.] Welcome sequence for the STRONG Experience offer (a different campaign variant). Follows the same pattern as the STRONG Intro Offer workflow but with STRONG Experience specific content and field values."
        status="retired"
        workflowUrl="https://grow.hapana.com/location/cGie31g8caN2HkP6vN2P/workflow/9c0d9c09-2c0a-4cdd-8a71-d38e80d24798"
        steps={[
          {
            type: "wait",
            label: "Wait (failsafe)",
            detail: "Short pause for sync.",
          },
          {
            type: "condition",
            label: "Do they have Memberships or Packages in their Active Package Category?",
            detail: "Safety check to skip contacts who already upgraded.",
          },
          {
            type: "condition",
            label: "Does their Active Package contain 'STRONG Experience'?",
            detail: "Routes into branches for STRONG Experience, STRONG Re-Experience, and variants with existing attendance.",
          },
          {
            type: "action",
            label: "Update fields: Intro Offer Name and tracking fields",
            detail: "Sets fields to STRONG Experience values.",
          },
          {
            type: "action",
            label: "Update opportunity in Intro Offer Pipeline",
            detail: "Pipeline card setup with correct stage.",
          },
          {
            type: "action",
            label: "Add tag: pipeline - intro offer",
            detail: "Pipeline identification tag.",
          },
          {
            type: "action",
            label: "Send email: 'You're in. Let's Get STRONG.'",
            detail: "Same welcome email template, personalised with the STRONG Experience offer name.",
          },
          {
            type: "action",
            label: "Add task: Welcome Call",
            detail: "Studio call task.",
          },
          {
            type: "link",
            label: "Add to Attendance Check and Tasking workflow",
            detail: "Enrolls in booking reminder and follow-up.",
            linkTo: "/workflows/key-workflows/during-intro-offer",
          },
          {
            type: "wait",
            label: "Wait",
            detail: "Pause before brand email.",
          },
          {
            type: "action",
            label: "Send email: 'From one studio to a global movement'",
            detail: "Brand story email.",
          },
        ]}
        settings={{ allowReentry: true, stopOnResponse: false }}
      />

      <h3>Draft variants (not currently active)</h3>

      <p>
        Several Purchase Confirmation workflows exist as drafts, ready
        to be published when their campaign is active. These include:
      </p>

      <ul>
        <li>
          <strong>STRONG Starter:</strong>{" "} a different intro offer
          package name and pricing.
        </li>
        <li>
          <strong>LONG Experience:</strong>{" "} a longer intro offer
          variant with additional follow-up emails and a completion
          email specific to the longer package.
        </li>
        <li>
          <strong>STRONGer Experience:</strong>{" "} another package
          variant with its own completion email and cleanup.
        </li>
        <li>
          <strong>Studio Relaunch (5 for $50):</strong>{" "} a
          promotional campaign variant with different pricing in the
          templates.
        </li>
        <li>
          <strong>UK variants:</strong>{" "} separate workflows for
          UK/IE locations that use different pricing and currency in
          their email content.
        </li>
        <li>
          <strong>5 for $50 variants:</strong>{" "} promotional
          pricing variants of the STRONG Experience workflow.
        </li>
      </ul>

      <Callout type="tip" title="How seasonal campaigns work">
        <p>
          When a new intro offer campaign launches, HQ publishes the
          matching Purchase Confirmation workflow and sets the old one
          to draft. The permanent infrastructure workflows (Status
          Update, pipeline tagging, Leads Pipeline cleanup) do not
          change. This means only one or two workflows need to be
          swapped per campaign change, not the entire system.
        </p>
      </Callout>

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

      <h2>What the contact experiences</h2>

      <p>
        From the contact&apos;s perspective, here is what happens after
        they purchase an intro offer:
      </p>

      <ol>
        <li>
          <strong>Immediately:</strong>{" "} they receive the
          &ldquo;You&apos;re in. Let&apos;s Get STRONG.&rdquo; welcome
          email confirming their purchase.
        </li>
        <li>
          <strong>Within 24 hours:</strong>{" "} the studio team calls
          them to welcome them and help them book their first class.
        </li>
        <li>
          <strong>After a few days:</strong>{" "} they receive the
          &ldquo;From one studio to a global movement&rdquo; brand
          story email.
        </li>
        <li>
          <strong>If they came from a Facebook ad:</strong>{" "} their
          lead nurture messages stop and their Leads Pipeline card
          moves to &ldquo;Purchased&rdquo; before being cleaned up.
        </li>
        <li>
          <strong>Behind the scenes:</strong>{" "} their Intro Offer
          Pipeline card is created, their custom fields are set up, and
          the day-by-day tracking begins (covered on the{" "}
          <a href="/workflows/key-workflows/during-intro-offer">
            During Intro Offer
          </a>{" "}
          page).
        </li>
      </ol>

      <h2>How this connects to the next stage</h2>

      <p>
        The Purchase Confirmation workflow does two things that hand
        off to the During Intro Offer workflows:
      </p>

      <ul>
        <li>
          <strong>Adds to the Attendance Check workflow:</strong>{" "}
          this starts the booking reminder and no-show follow-up
          sequence, so contacts who do not book their first class get
          nudged.
        </li>
        <li>
          <strong>Sets Pipeline Status to &ldquo;Pre&rdquo;:</strong>
          {" "} this puts them in the pre-first-visit state. Once they
          attend their first class, the Visits Update workflow changes
          this to &ldquo;Active&rdquo; and the Day 1 through Day 15
          progression begins.
        </li>
      </ul>

      <p>
        Continue to the{" "}
        <a href="/workflows/key-workflows/during-intro-offer">
          During Intro Offer
        </a>{" "}
        page to see how the day-by-day tracking, visit counting,
        check-ins, and conversion workflows work.
      </p>
    </PageLayout>
  )
}
