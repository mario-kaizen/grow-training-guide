import { PageLayout } from "@/components/PageLayout"
import { Callout } from "@/components/Callout"
import { ConnectionDiagram } from "@/components/ConnectionDiagram"
import { WorkflowCard } from "@/components/WorkflowCard"

export default function DuringIntroOffer() {
  return (
    <PageLayout
      title="During Intro Offer"
      description="Day-by-day progression, visit tracking, nudges, and conversion."
      slug="/workflows/key-workflows/during-intro-offer"
    >
      <p>
        Once a contact has purchased an intro offer and been set up by
        the workflows on the{" "}
        <a href="/workflows/key-workflows/new-intro-offers">
          New Intro Offers
        </a>{" "}
        page, a second layer of workflows takes over. These handle the
        day-by-day pipeline progression, visit counting, booking
        nudges, membership upsell, and the three possible exits: Won
        (converted to membership), Abandoned/Lost, or Expired.
      </p>

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

      <h2>The day-by-day pipeline progression</h2>

      <p>
        The Intro Offer Pipeline has 15 columns: Day 1 through Day 15,
        plus a &ldquo;False Starter&rdquo; column for contacts who
        purchased but have not attended. A set of 15 published
        workflows moves each contact from one column to the next,
        one day at a time.
      </p>

      <h3>How the daily workflows work</h3>

      <p>
        Each daily workflow (for example, &ldquo;Day 05 &gt; Day
        6&rdquo;) follows the same pattern:
      </p>

      <ol>
        <li>
          <strong>Update Pipeline Day</strong> {" "} sets the
          contact&apos;s &ldquo;Intro Offer Pipeline Day&rdquo; custom
          field to the current day number.
        </li>
        <li>
          <strong>Update Intro Offer Days Remaining</strong> {" "}
          recalculates how many days are left in their intro offer
          period.
        </li>
        <li>
          <strong>Remove from all other daily workflows</strong>{" "}
          removes the contact from every other Day X workflow to prevent
          double-processing. This is the &ldquo;cleanup before
          processing&rdquo; pattern.
        </li>
        <li>
          <strong>Wait 24 hours</strong> {" "} pauses for one day.
        </li>
        <li>
          <strong>Check: do they have a membership now?</strong> {" "}
          if they upgraded during the wait, marks the pipeline as won
          and stops.
        </li>
        <li>
          <strong>Move the pipeline card</strong> {" "} updates the
          opportunity to the next day&apos;s column.
        </li>
        <li>
          <strong>Check: do they still have an intro offer?</strong>
          {" "} if their intro offer expired during the wait, updates
          the pipeline status accordingly.
        </li>
      </ol>

      <Callout type="tip" title="Why remove from all other daily workflows first?">
        <p>
          Each daily workflow removes the contact from all 14 other
          daily workflows before doing anything else. This prevents a
          situation where a contact could be in two daily workflows at
          once if something re-triggers or delays. By the time the Wait
          step finishes, the contact is guaranteed to only be in one
          daily workflow.
        </p>
      </Callout>

      <WorkflowCard
        name="Day 01 > Day 2 (representative example)"
        purpose="Moves a contact from Day 1 to Day 2 of their intro offer journey. All 15 daily workflows follow this same structure. Only the day number and pipeline column change between them."
        status="published"
        workflowUrl="https://grow.hapana.com/location/cGie31g8caN2HkP6vN2P/workflow/338d6fd7-914a-42e0-b087-49498e65889d"
        steps={[
          {
            type: "action",
            label: "Update field: Intro Offer Pipeline Day = 1",
            detail: "Stamps the current day number on the contact record.",
          },
          {
            type: "action",
            label: "Update field: Intro Offer Days Remaining",
            detail: "Calculates and stores how many days are left in the intro offer period.",
          },
          {
            type: "action",
            label: "Remove from all other daily workflows (13 Remove from Workflow actions)",
            detail: "Removes the contact from Day 2 > Day 3 through Day 14 > Day 15. This is the cleanup pattern that prevents double-processing.",
          },
          {
            type: "wait",
            label: "Wait 24 hours",
            detail: "Pauses for one day before moving to the next column.",
          },
          {
            type: "condition",
            label: "Do they have Memberships or Packages in their Active Package Category?",
            detail: "Guard check after the wait. If they converted to a membership during the 24-hour wait, the workflow marks the pipeline as won and stops.",
          },
          {
            type: "action",
            label: "Update opportunity to next day's column",
            detail: "Moves the pipeline card from Day 1 to Day 2.",
          },
          {
            type: "action",
            label: "Update field: Intro Offer Pipeline Day = 2",
            detail: "Updates the day counter to the new day.",
          },
          {
            type: "condition",
            label: "Do they still have Intro Offer in their Active Package Category?",
            detail: "Checks if the intro offer is still active. If it expired or was removed, the workflow updates the pipeline status to reflect that.",
          },
          {
            type: "action",
            label: "Update opportunity and pipeline status if still active",
            detail: "If they still have an active intro offer, moves them to the next day's column. The next daily workflow then picks them up.",
          },
        ]}
        settings={{ allowReentry: true, stopOnResponse: false }}
      />

      <p>
        The 15 daily workflows are:
      </p>

      <div className="my-4 overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Workflow</th>
              <th>Status</th>
              <th>What it does</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Day 01 &gt; Day 2</td>
              <td>Published</td>
              <td>Moves from Day 1 to Day 2 after 24 hours</td>
            </tr>
            <tr>
              <td>Day 02 &gt; Day 3</td>
              <td>Published</td>
              <td>Moves from Day 2 to Day 3</td>
            </tr>
            <tr>
              <td>Day 03 &gt; Day 4</td>
              <td>Published</td>
              <td>Moves from Day 3 to Day 4</td>
            </tr>
            <tr>
              <td>Day 04 &gt; Day 5</td>
              <td>Published</td>
              <td>Moves from Day 4 to Day 5</td>
            </tr>
            <tr>
              <td>Day 05 &gt; Day 6</td>
              <td>Published</td>
              <td>Moves from Day 5 to Day 6</td>
            </tr>
            <tr>
              <td>Day 06 &gt; Day 7</td>
              <td>Published</td>
              <td>Moves from Day 6 to Day 7</td>
            </tr>
            <tr>
              <td>Day 07 &gt; Day 8</td>
              <td>Published</td>
              <td>Moves from Day 7 to Day 8</td>
            </tr>
            <tr>
              <td>Day 08 &gt; Day 9</td>
              <td>Published</td>
              <td>Moves from Day 8 to Day 9</td>
            </tr>
            <tr>
              <td>Day 09 &gt; Day 10</td>
              <td>Published</td>
              <td>Moves from Day 9 to Day 10</td>
            </tr>
            <tr>
              <td>Day 10 &gt; Day 11</td>
              <td>Published</td>
              <td>Moves from Day 10 to Day 11</td>
            </tr>
            <tr>
              <td>Day 11 &gt; Day 12</td>
              <td>Published</td>
              <td>Moves from Day 11 to Day 12</td>
            </tr>
            <tr>
              <td>Day 12 &gt; Day 13</td>
              <td>Published</td>
              <td>Moves from Day 12 to Day 13</td>
            </tr>
            <tr>
              <td>Day 13 &gt; Day 14</td>
              <td>Published</td>
              <td>Moves from Day 13 to Day 14</td>
            </tr>
            <tr>
              <td>Day 14 &gt; Day 15</td>
              <td>Published</td>
              <td>Moves from Day 14 to Day 15 (final day)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <WorkflowCard
        name="Day 15"
        purpose="The final day of the intro offer pipeline progression. Performs the end-of-journey check: if the contact has a membership, marks the pipeline as won. If their intro offer expired, updates the pipeline status to reflect expiry and creates a follow-up task."
        status="published"
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

      <h2>Visit tracking</h2>

      <p>
        While the daily workflows handle the time-based progression,
        the Visits Update workflow handles the attendance-based
        progression. Every time a contact attends a class, this
        workflow fires and updates their visit count on the pipeline.
      </p>

      <WorkflowCard
        name="02. Intro Offer Visits Update | add to 1st Day Complete + adds 1 to Intro Offer Pipeline Visits"
        purpose="Fires when a contact's attendance total changes. Updates their visit count on the pipeline, transitions their status from 'Pre' (pre-first-visit) to 'Active', and recalculates remaining visits."
        status="published"
        workflowUrl="https://grow.hapana.com/location/cGie31g8caN2HkP6vN2P/workflow/3777a941-d68a-4fb0-8184-79019cc43a89"
        steps={[
          {
            type: "wait",
            label: "Wait (failsafe)",
            detail: "Short pause for the sync to complete.",
          },
          {
            type: "condition",
            label: "Is their Active Package Category 'Intro Offer(s)' or do they have the 'active - package based offer' tag?",
            detail: "Only processes contacts who are currently on an intro offer. Ignores membership holders.",
          },
          {
            type: "condition",
            label: "What is their Attendance Total?",
            detail: "Checks that they have at least one visit recorded.",
          },
          {
            type: "condition",
            label: "What is their Intro Offer Pipeline Status?",
            detail: "Routes based on whether this is their first visit or a subsequent visit.",
            branches: [
              {
                label: "Pre (first visit)",
                steps: [
                  {
                    type: "action",
                    label: "Update Pipeline Status to Active",
                    detail: "Transitions from Pre to Active, marking that they have now attended their first class.",
                  },
                  {
                    type: "action",
                    label: "Update fields: Pipeline Visits = 1, recalculate Days Remaining",
                    detail: "Sets the initial visit count and calculates remaining visits in the package.",
                  },
                  {
                    type: "action",
                    label: "Update opportunity in Intro Offer Pipeline",
                    detail: "Updates the pipeline card to reflect the Active status and first visit.",
                  },
                ],
              },
              {
                label: "Active (subsequent visit)",
                steps: [
                  {
                    type: "action",
                    label: "Math operation: increment Pipeline Visits by 1",
                    detail: "Adds 1 to the running visit counter.",
                  },
                  {
                    type: "action",
                    label: "Math operation: recalculate Visits Remaining",
                    detail: "Updates the remaining visits calculation.",
                  },
                  {
                    type: "action",
                    label: "Update opportunity in Intro Offer Pipeline",
                    detail: "Updates the pipeline card with the new visit count.",
                  },
                ],
              },
            ],
          },
        ]}
        settings={{ allowReentry: true, stopOnResponse: false }}
      />

      <WorkflowCard
        name="02. STRONG Intro Offer | First Class Complete and Halfway SMS"
        purpose="Sends timed check-in messages during the intro offer. After the contact completes their first class, sends a congratulations SMS. At the halfway point of their package, sends a progress check-in SMS encouraging them to keep booking."
        status="published"
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

      <h2>No-show handling</h2>

      <p>
        Two workflows handle contacts who are not attending. The False
        Starter Check catches people who purchase but never book
        their first class. The Attendance Check workflow catches
        people who attended once but then stopped.
      </p>

      <WorkflowCard
        name="03. Intro Offer Pipeline False Starter Check"
        purpose="Detects contacts who purchased an intro offer but have not attended any classes. Flags them to the studio and moves their pipeline card to the False Starter column for manual follow-up."
        status="published"
        workflowUrl="https://grow.hapana.com/location/cGie31g8caN2HkP6vN2P/workflow/afcffa7d-ecc2-42b9-93e4-18d64cab6ccd"
        steps={[
          {
            type: "wait",
            label: "Wait",
            detail: "Gives the contact time to book and attend before flagging them.",
          },
          {
            type: "condition",
            label: "Is their Pipeline Status still 'Pre'?",
            detail: "'Pre' means they have not attended any classes yet. If still Pre, they are a false starter.",
          },
          {
            type: "action",
            label: "Update opportunity to False Starter column",
            detail: "Moves the pipeline card to the False Starter column so the studio can see who needs outreach.",
          },
          {
            type: "action",
            label: "Add task: False Starter follow-up",
            detail: "Creates a task for the studio team to contact this person and help them book.",
          },
          {
            type: "wait",
            label: "Wait",
            detail: "Additional waiting period to see if they respond to outreach.",
          },
          {
            type: "condition",
            label: "Is their Pipeline Status still 'Pre'?",
            detail: "Second check. If they still have not attended, the pipeline card stays in False Starter for ongoing studio follow-up.",
          },
          {
            type: "action",
            label: "Update opportunity",
            detail: "Updates the pipeline card with the latest status.",
          },
        ]}
        settings={{ allowReentry: true, stopOnResponse: false }}
      />

      <WorkflowCard
        name="03. STRONG Intro Offer | Attendance Check, Booking Reminder after 3 days, Tasking after 7 Days of No Attendance"
        purpose="Monitors whether a contact who purchased an intro offer is actually attending. If they have not visited after 3 days, sends a booking reminder SMS. If they still have not visited after 7 days, creates a task for the studio to call them."
        status="published"
        workflowUrl="https://grow.hapana.com/location/cGie31g8caN2HkP6vN2P/workflow/11e9c47d-e86d-4404-967b-a95e8e7b5586"
        steps={[
          {
            type: "wait",
            label: "Wait 3 days",
            detail: "Gives the contact 3 days after purchase to book and attend.",
          },
          {
            type: "condition",
            label: "Is their Intro Offer Pipeline Visits still at 0?",
            detail: "If they have not attended any classes after 3 days, the booking reminder fires.",
          },
          {
            type: "action",
            label: "Send SMS: Booking reminder",
            detail: "Sends a friendly SMS reminding them to book their first class. Includes a link to the booking system.",
          },
          {
            type: "wait",
            label: "Wait 4 more days (7 days total)",
            detail: "Waits an additional 4 days to see if the SMS prompted action.",
          },
          {
            type: "condition",
            label: "Is their Intro Offer Pipeline Visits still at 0?",
            detail: "If they still have not attended after 7 days, escalates to a personal call.",
          },
          {
            type: "action",
            label: "Add task: Phone Call",
            detail: "Creates a task for the studio team to call this contact personally. At this point, automated messages have not worked, so human outreach is the next step.",
          },
        ]}
        settings={{ allowReentry: true, stopOnResponse: false }}
      />

      <Callout type="tip" title="Attendance Check has offer-specific variants">
        <p>
          There are separate Attendance Check workflows for STRONG
          Intro Offer, STRONG Experience, STRONG Starter, and UK/IE
          locations. They all follow the same pattern (3-day SMS, 7-day
          call task) but are separated so each can be published or
          drafted along with its matching Purchase Confirmation
          workflow.
        </p>
      </Callout>

      <h2>Day 0 False Starter reset</h2>

      <p>
        If a contact is moved to the False Starter column in the
        pipeline (either manually by the studio or by the False Starter
        Check workflow) and then later books and attends, they need to
        re-enter the day-by-day progression. The Day 0 workflow handles
        this reset.
      </p>

      <WorkflowCard
        name="Day 0 | False Starter Column | When they're moved to 'False Starter' Column"
        purpose="Resets a contact's daily progression when they are moved to the False Starter column. Sets their pipeline day back to 0 and status to 'Pre', and removes them from all daily workflows so they can start fresh when they eventually attend."
        status="published"
        workflowUrl="https://grow.hapana.com/location/cGie31g8caN2HkP6vN2P/workflow/e78b5370-73ac-4869-9ca9-fc4d47f93b17"
        steps={[
          {
            type: "action",
            label: "Update field: Intro Offer Pipeline Day = 0",
            detail: "Resets the day counter to 0.",
          },
          {
            type: "action",
            label: "Update field: Pipeline Status = Pre",
            detail: "Sets status back to 'Pre' (pre-first-visit) so the Visits Update workflow knows to treat their next visit as their first.",
          },
          {
            type: "action",
            label: "Remove from all daily workflows (13 Remove from Workflow actions)",
            detail: "Removes them from every Day X > Day Y workflow so they are not being progressed while in the False Starter column.",
          },
        ]}
        settings={{ allowReentry: true, stopOnResponse: false }}
      />

      <h2>Membership upsell</h2>

      <p>
        The upsell workflows trigger at two points during the intro
        offer: once the contact has either attended 3 classes or
        reached Day 8, and again when they complete 5 classes or reach
        Day 14. These are the conversion touchpoints that encourage the
        contact to upgrade to a full membership.
      </p>

      <WorkflowCard
        name="04. STRONG Intro Offer | 3 visits OR Day 8, add task and send Membership Options"
        purpose="When a contact reaches either 3 visits or Day 8 of their intro offer (whichever comes first), sends the membership options email and creates a follow-up task for the studio. Only fires if they have not already purchased a membership."
        status="published"
        workflowUrl="https://grow.hapana.com/location/cGie31g8caN2HkP6vN2P/workflow/c91dc361-a488-451b-8efe-bb074f58dabe"
        steps={[
          {
            type: "wait",
            label: "Wait (failsafe)",
            detail: "Short pause for sync.",
          },
          {
            type: "condition",
            label: "Does their Active Package Category contain Memberships?",
            detail: "Guard check. If they already have a membership, skip everything.",
          },
          {
            type: "condition",
            label: "Do they have Intro or Re-Intro in their Active Package?",
            detail: "Confirms they are still on an intro offer before sending the upsell.",
          },
          {
            type: "action",
            label: "Send email: 'Lock your STRONG membership in now.'",
            detail: "The membership options email showing available membership plans, pricing, and how to sign up.",
          },
          {
            type: "action",
            label: "Add task: Membership Follow Up",
            detail: "Creates a task for the studio to follow up on the membership conversation.",
          },
          {
            type: "wait",
            label: "Wait",
            detail: "Pause after the initial upsell touchpoint.",
          },
        ]}
        settings={{ allowReentry: true, stopOnResponse: false }}
      />

      <Callout type="tip" title="Regional variants exist">
        <p>
          The 3-visit/Day 8 upsell has separate published workflows for
          USA/CA and UK/IE locations. These use different membership
          pricing and currency in the email content. There is also a
          STRONG Experience variant. All follow the same trigger logic
          and step pattern.
        </p>
      </Callout>

      <WorkflowCard
        name="05. STRONG Intro Offer | 5 visits OR Day 14, send Intro Offer Complete email"
        purpose="When a contact completes 5 visits or reaches Day 14 of their intro offer, sends the completion email summarising their experience and presenting the membership upgrade as the next step."
        status="published"
        workflowUrl="https://grow.hapana.com/location/cGie31g8caN2HkP6vN2P/workflow/73b43932-9440-4cbd-976a-b2917706f812"
        steps={[
          {
            type: "condition",
            label: "Do they have the 'active - 5 session strong intro offer' tag?",
            detail: "Confirms they are still within the active intro offer window. This tag is managed by the 14-day tagging workflow.",
          },
          {
            type: "wait",
            label: "Wait",
            detail: "Short pause before sending the completion email.",
          },
          {
            type: "action",
            label: "Send email: '{{contact.intro_offer_name}} Complete: What's Next?'",
            detail: "The completion email, personalised with their specific intro offer name. Summarises their journey and presents membership as the natural next step.",
          },
          {
            type: "wait",
            label: "Wait",
            detail: "Final pause. After this, the contact either converts to a membership (handled by the exit workflows) or their offer expires.",
          },
        ]}
        settings={{ allowReentry: true, stopOnResponse: false }}
      />

      <h2>Exit handling</h2>

      <p>
        Every contact on an intro offer eventually reaches one of three
        exits. Each exit has its own workflow that handles the cleanup:
        removing the contact from all daily workflows, updating the
        pipeline, and cleaning up tags.
      </p>

      <div className="my-6 p-5 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-sm font-[family-name:var(--font-kessel)] font-black uppercase tracking-wide text-black mt-0 mb-3">
          The three exits
        </p>
        <div className="text-sm text-gray-700 space-y-1 font-mono">
          <p className="m-0">
            <strong>Won</strong>{" "} contact purchases a membership or
            package. Pipeline marked as won, daily workflows stopped.
          </p>
          <p className="m-0">
            <strong>Abandoned/Lost</strong>{" "} contact disengages. Studio
            marks them manually, or system detects no activity. Pipeline
            marked as lost, daily workflows stopped.
          </p>
          <p className="m-0">
            <strong>Expired</strong>{" "} intro offer period ends without
            purchase or manual intervention. Handled by the Status Update
            workflow on the{" "}
            <a href="/workflows/key-workflows/new-intro-offers">
              New Intro Offers
            </a>{" "}
            page.
          </p>
        </div>
      </div>

      <h3>Won: converted to membership</h3>

      <WorkflowCard
        name="05. Intro Offer | Mark as sold if they've purchased a Membership or Packages in the Intro Offer Pipeline"
        purpose="Detects when a contact on an intro offer purchases a membership or package. Finds their Intro Offer Pipeline opportunity, removes them from all daily workflows, marks the opportunity as won, waits 14 days for reporting, then cleans up the pipeline card and tags."
        status="published"
        workflowUrl="https://grow.hapana.com/location/cGie31g8caN2HkP6vN2P/workflow/1fbe6010-b6ba-42be-9752-e5f6ea5dcca2"
        steps={[
          {
            type: "wait",
            label: "Wait (failsafe)",
            detail: "Short pause for sync.",
          },
          {
            type: "condition",
            label: "Do they have Memberships or Packages in their Active Package Category?",
            detail: "Confirms a membership or package was actually purchased.",
          },
          {
            type: "action",
            label: "Find opportunity in Intro Offer Pipeline",
            detail: "Locates their pipeline card.",
          },
          {
            type: "action",
            label: "Remove from all daily workflows",
            detail: "Stops the day-by-day progression since they no longer need to be tracked.",
          },
          {
            type: "action",
            label: "Update opportunity: mark as Won",
            detail: "Moves the pipeline card to the Won stage.",
          },
          {
            type: "action",
            label: "Update field: Pipeline Status = Sold",
            detail: "Updates the custom field to reflect the conversion.",
          },
          {
            type: "wait",
            label: "Wait 14 days",
            detail: "Keeps the Won pipeline card visible for 14 days so the studio can see recent conversions in their pipeline view.",
          },
          {
            type: "action",
            label: "Remove tag: pipeline - intro offer",
            detail: "Removes the pipeline identification tag.",
          },
          {
            type: "action",
            label: "Remove opportunity from Intro Offer Pipeline",
            detail: "Cleans up the pipeline card after the 14-day reporting window.",
          },
          {
            type: "action",
            label: "Add note: Removed from pipeline",
            detail: "Adds a note to the contact record documenting when they were removed from the Intro Offer Pipeline after converting to a membership.",
          },
        ]}
        settings={{ allowReentry: true, stopOnResponse: false }}
      />

      <WorkflowCard
        name="07. Intro Offer Marked Won"
        purpose="Triggered when a pipeline opportunity is manually or automatically moved to the 'Won' stage. Performs the full cleanup: removes from all 14 daily workflows, checks for membership purchase, updates the pipeline, and cleans up after a delay."
        status="published"
        workflowUrl="https://grow.hapana.com/location/cGie31g8caN2HkP6vN2P/workflow/3f21ed95-e4e0-41d3-8fd3-4929ac5eec2e"
        steps={[
          {
            type: "wait",
            label: "Wait (failsafe)",
            detail: "Short pause for sync.",
          },
          {
            type: "action",
            label: "Remove from all daily workflows (13 Remove from Workflow actions)",
            detail: "Removes the contact from Day 1 > Day 2 through Day 14 > Day 15. This is the same cleanup pattern used by the Abandoned/Lost workflow.",
          },
          {
            type: "condition",
            label: "Do they have Memberships or Packages in their Active Package Category?",
            detail: "Confirms the Won status is backed by an actual purchase. If they do have a membership, the pipeline card is updated to Won.",
          },
          {
            type: "action",
            label: "Update opportunity: Won",
            detail: "Sets the pipeline card to the Won stage.",
          },
          {
            type: "wait",
            label: "Wait 14 days",
            detail: "Keeps the Won card visible for reporting.",
          },
          {
            type: "action",
            label: "Remove opportunity from Intro Offer Pipeline",
            detail: "Cleans up after the reporting window.",
          },
          {
            type: "action",
            label: "Remove tag: pipeline - intro offer",
            detail: "Final tag cleanup.",
          },
        ]}
        settings={{ allowReentry: true, stopOnResponse: false }}
      />

      <h3>Abandoned/Lost: contact disengaged</h3>

      <WorkflowCard
        name="06. Intro Offer Marked Abandoned/Lost"
        purpose="Triggered when a pipeline opportunity is moved to the Abandoned or Lost stage. Performs the full cleanup: sets pipeline status, removes from all 14 daily workflows, waits for a delay, then removes the pipeline card and tags."
        status="published"
        workflowUrl="https://grow.hapana.com/location/cGie31g8caN2HkP6vN2P/workflow/1a007f54-8795-4ee3-863c-dbee000f6c34"
        steps={[
          {
            type: "wait",
            label: "Wait (failsafe)",
            detail: "Short pause for sync.",
          },
          {
            type: "action",
            label: "Update field: Pipeline Status = Lost",
            detail: "Stamps the Lost status on the contact record.",
          },
          {
            type: "action",
            label: "Remove from all daily workflows (13 Remove from Workflow actions)",
            detail: "Removes the contact from Day 1 > Day 2 through Day 14 > Day 15.",
          },
          {
            type: "wait",
            label: "Wait",
            detail: "Delay before final cleanup, keeping the Lost card visible for the studio.",
          },
          {
            type: "action",
            label: "Remove opportunity from Intro Offer Pipeline",
            detail: "Cleans up the pipeline card.",
          },
          {
            type: "action",
            label: "Remove tag: pipeline - intro offer",
            detail: "Final tag cleanup.",
          },
        ]}
        settings={{ allowReentry: true, stopOnResponse: false }}
      />

      <Callout type="warning" title="Abandoned/Lost removes from ALL daily workflows">
        <p>
          When a contact is marked as abandoned or lost, the workflow
          removes them from all 14 daily workflows, not just the one
          they are currently in. This is intentional. Because the
          system cannot know which daily workflow the contact is
          currently active in, it removes from all of them to guarantee
          a clean exit. The same pattern is used by the Won workflow.
        </p>
      </Callout>

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

      <h2>How all the pieces connect</h2>

      <div className="my-6 p-5 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-sm font-[family-name:var(--font-kessel)] font-black uppercase tracking-wide text-black mt-0 mb-3">
          Full intro offer timeline
        </p>
        <div className="text-sm text-gray-700 space-y-1 font-mono">
          <p className="m-0">
            <strong>Day 0</strong>{" "}
            Purchase detected. Pipeline card created. Status: Pre.
          </p>
          <p className="m-0">
            <strong>Day 1</strong>{" "}
            Daily progression begins. Day 1 &gt; Day 2 workflow starts.
          </p>
          <p className="m-0">
            <strong>Day 3</strong>{" "}
            If no visits: booking reminder SMS sent.
          </p>
          <p className="m-0">
            <strong>Day 7</strong>{" "}
            If still no visits: call task created.
          </p>
          <p className="m-0">
            <strong>First visit</strong>{" "}
            Status changes from Pre to Active. Visit counter starts.
          </p>
          <p className="m-0">
            <strong>3 visits OR Day 8</strong>{" "}
            Membership options email sent. Follow-up task created.
          </p>
          <p className="m-0">
            <strong>5 visits OR Day 14</strong>{" "}
            Intro offer complete email sent.
          </p>
          <p className="m-0">
            <strong>Day 15</strong>{" "}
            Daily progression ends. Contact exits via Won, Lost, or Expired.
          </p>
        </div>
      </div>

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

      <h2>What the contact experiences</h2>

      <p>
        From the contact&apos;s perspective during their intro offer:
      </p>

      <ol>
        <li>
          <strong>If they do not book:</strong>{" "} after 3 days they
          receive a friendly booking reminder SMS. After 7 days, the
          studio calls them personally.
        </li>
        <li>
          <strong>After their first class:</strong>{" "} they receive a
          check-in SMS (covered on the{" "}
          <a href="/workflows/key-workflows/new-leads">New Leads</a>
          {" "} page under First Visit Complete Check-in).
        </li>
        <li>
          <strong>Around their third class or Day 8:</strong>{" "} they
          receive the membership options email showing them how to
          upgrade. The studio follows up to discuss membership.
        </li>
        <li>
          <strong>Around their fifth class or Day 14:</strong>{" "} they
          receive the intro offer completion email celebrating their
          journey and presenting membership as the next step.
        </li>
        <li>
          <strong>If they convert:</strong>{" "} the nurture messaging
          stops and they enter the membership workflows (covered on
          the{" "}
          <a href="/workflows/key-workflows/membership-journey">
            Membership Journey
          </a>{" "}
          page).
        </li>
        <li>
          <strong>If they do not convert:</strong>{" "} their intro offer
          expires, the pipeline card is cleaned up, and they sit in the
          system until a future campaign re-engages them.
        </li>
      </ol>

      <Callout type="tip" title="The pipeline is a visual dashboard for the studio">
        <p>
          The day-by-day pipeline progression is not just for
          automation. Studios use the Intro Offer Pipeline as a visual
          dashboard: they can see at a glance how many people are on
          Day 1 vs Day 10, who is in the False Starter column, and who
          has been marked as Won. The daily workflows keep this board
          accurate without any manual work from the studio.
        </p>
      </Callout>
    </PageLayout>
  )
}
