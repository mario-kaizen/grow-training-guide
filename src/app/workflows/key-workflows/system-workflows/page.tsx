import { PageLayout } from "@/components/PageLayout"
import { Callout } from "@/components/Callout"
import { WorkflowCard } from "@/components/WorkflowCard"

export default function SystemWorkflows() {
  return (
    <PageLayout
      title="System Workflows"
      description="Assignments, notifications, date stamps, DND handling, and cross-pipeline cleanup."
      slug="/workflows/key-workflows/system-workflows"
    >
      <p>
        The previous pages covered workflows that map to a contact&apos;s
        journey: lead, intro offer, membership. This page covers the
        behind-the-scenes workflows that support all of those stages.
        These are the utilities: they assign contacts to team members,
        stamp important dates, send internal notifications when
        purchases happen, handle DND opt-outs, and mark sales across
        multiple pipelines at once.
      </p>

      <p>
        You will rarely need to edit these workflows. But understanding
        what they do helps when troubleshooting: if a contact is
        missing a date stamp, not assigned to a user, or their sale
        was not reflected in a pipeline, the answer is usually in one
        of these.
      </p>

      <h2>User assignment</h2>

      <p>
        When a new contact enters the system, they need to be assigned
        to a team member so they have an owner. Two workflows handle
        this: one for new leads and one for new sales.
      </p>

      <WorkflowCard
        name="01. Systems | Assign User | New Lead"
        purpose="Automatically assigns a team member to new lead contacts so they have an owner in the system for tasks, notifications, and pipeline visibility."
        status="published"
        steps={[
          {
            type: "action",
            label: "Assign to user",
            detail: "Assigns the contact to the configured team member for this location. The specific user is set in the workflow action, not dynamically.",
          },
        ]}
        settings={{ allowReentry: true, stopOnResponse: false }}
      />

      <WorkflowCard
        name="02. Systems | Assign User | Sale"
        purpose="Assigns a team member to contacts when a sale is made. Ensures that purchased contacts have an owner for follow-up tasks and pipeline management."
        status="published"
        steps={[
          {
            type: "action",
            label: "Assign to user",
            detail: "Assigns the contact to the configured team member. May be the same or different user as the lead assignment, depending on studio setup.",
          },
        ]}
        settings={{ allowReentry: true, stopOnResponse: false }}
      />

      <Callout type="tip" title="Why two separate assignment workflows?">
        <p>
          Leads and sales are assigned separately because some studios
          want different team members handling leads (sales/front desk)
          vs managing active members (studio manager). Splitting the
          assignment also means the sale assignment can re-assign the
          contact if needed, without conflicting with the lead
          assignment.
        </p>
      </Callout>

      <h2>Date stamping</h2>

      <p>
        Several workflows exist to stamp important dates on the
        contact record when events happen. These dates are used for
        reporting, filtering, and time-based logic in other workflows.
      </p>

      <WorkflowCard
        name="00. Update 'Date Contact Created' when new contact is made"
        purpose="Sets the 'Date Contact Created' field to the current date when a new contact enters the system. Used for reporting and time-based filtering."
        status="published"
        steps={[
          {
            type: "action",
            label: "Set Date Contact Created to current date",
            detail: "Stamps the contact with today's date.",
          },
        ]}
        settings={{ allowReentry: true, stopOnResponse: false }}
      />

      <WorkflowCard
        name="02. Intro Offers | Update Date Intro Offer Purchased"
        purpose="When a contact's Active Package changes to an intro offer, stamps the purchase date, adds the 'active - intro offer' tag, and watches for when they leave intro offer status (either upgrading to membership or going inactive)."
        status="published"
        steps={[
          {
            type: "wait",
            label: "Wait (failsafe)",
            detail: "Short pause for sync.",
          },
          {
            type: "condition",
            label: "Does their Active Package Category actually contain Intro Offers?",
            detail: "Confirms the change was to an intro offer before stamping.",
          },
          {
            type: "action",
            label: "Update field: Date Intro Offer Purchased = current date",
            detail: "Stamps when the intro offer was purchased.",
          },
          {
            type: "action",
            label: "Add tag: active - intro offer",
            detail: "Tags them as actively on an intro offer for workflow routing.",
          },
          {
            type: "wait",
            label: "Wait for status change",
            detail: "Watches for when their package category changes (to membership, package, or empty).",
          },
          {
            type: "condition",
            label: "What did it change to?",
            detail: "Routes based on outcome: Location Status = inactive (expired/cancelled), or Active Package Category now contains Memberships or Packages (upgraded).",
          },
          {
            type: "action",
            label: "Remove tag: active - packages",
            detail: "Cleans up the active status tags based on the transition.",
          },
          {
            type: "action",
            label: "Update field: clear intro offer date if needed",
            detail: "Handles date field cleanup based on the transition type.",
          },
        ]}
        settings={{ allowReentry: true, stopOnResponse: false }}
      />

      <WorkflowCard
        name="03. Memberships | Update Date Membership Purchased"
        purpose="When a contact's Active Package changes to a membership, stamps the purchase date, adds the 'active - memberships' tag, and watches for when they leave membership status. Includes a guard for recently suspended members to avoid re-stamping."
        status="published"
        steps={[
          {
            type: "wait",
            label: "Wait (failsafe)",
            detail: "Short pause for sync.",
          },
          {
            type: "condition",
            label: "Does their Active Package Category actually contain Memberships?",
            detail: "Confirms this is a real membership purchase.",
          },
          {
            type: "condition",
            label: "Do they already have the tag 'active - memberships'?",
            detail: "Prevents double-processing if the workflow fires twice.",
          },
          {
            type: "condition",
            label: "Do they have the 'recently suspended' tag?",
            detail: "If they just came back from suspension, their Active Package updates but this is not a new purchase. The 'recently suspended' tag prevents the date from being re-stamped.",
          },
          {
            type: "action",
            label: "Update field: Date Membership Purchased = current date",
            detail: "Stamps the membership purchase date.",
          },
          {
            type: "action",
            label: "Add tag: active - memberships",
            detail: "Tags them as an active member.",
          },
          {
            type: "wait",
            label: "Wait for status change",
            detail: "Watches for when their package category changes.",
          },
          {
            type: "action",
            label: "Remove tag: active - memberships",
            detail: "Cleans up when they leave membership status.",
          },
          {
            type: "action",
            label: "Clear membership date field",
            detail: "Removes the date stamp so it does not show stale data.",
          },
        ]}
        settings={{ allowReentry: true, stopOnResponse: false }}
      />

      <WorkflowCard
        name="04. Packages | Update Date Packages Purchased"
        purpose="When a contact's Active Package changes to a package (class packs, etc.), stamps the purchase date, adds the 'active - packages' tag, and watches for when they leave package status."
        status="published"
        steps={[
          {
            type: "wait",
            label: "Wait (failsafe)",
            detail: "Short pause for sync.",
          },
          {
            type: "condition",
            label: "Does their Active Package Category actually contain Packages?",
            detail: "Confirms this is a package purchase.",
          },
          {
            type: "action",
            label: "Update field: Date Packages Purchased = current date",
            detail: "Stamps the package purchase date.",
          },
          {
            type: "action",
            label: "Add tag: active - packages",
            detail: "Tags them as having an active package.",
          },
          {
            type: "wait",
            label: "Wait for status change",
            detail: "Watches for when their package expires or they upgrade.",
          },
          {
            type: "action",
            label: "Remove tag: active - packages",
            detail: "Cleans up the tag.",
          },
          {
            type: "action",
            label: "Clear package date field",
            detail: "Removes the date stamp.",
          },
        ]}
        settings={{ allowReentry: true, stopOnResponse: false }}
      />

      <WorkflowCard
        name="10. Intro Offer First Visit Date Field"
        purpose="When a contact's Intro Offer Pipeline Visits reaches 1 (their first class), stamps the 'Intro Offer First Visit Date' field. Used for calculating the 14-day intro offer window."
        status="published"
        steps={[
          {
            type: "wait",
            label: "Wait (failsafe)",
            detail: "Short pause for sync.",
          },
          {
            type: "condition",
            label: "Do they actually have 'Intro Offer(s)' in their Active Package Category?",
            detail: "Confirms they are on an intro offer before stamping.",
          },
          {
            type: "action",
            label: "Update field: Intro Offer First Visit Date = current date",
            detail: "Stamps when they attended their first class. This date is used by the 14-day tagging workflow to calculate when the intro offer expires.",
          },
        ]}
        settings={{ allowReentry: true, stopOnResponse: false }}
      />

      <h2>Internal notifications</h2>

      <WorkflowCard
        name="03. Systems | Active Package Change Internal Notification"
        purpose="Sends an internal email to the studio when a contact's Active Package changes. Different notification templates for intro offer purchases vs membership/package purchases. Can be turned on or off per location."
        status="published"
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
        settings={{ allowReentry: true, stopOnResponse: false }}
      />

      <Callout type="tip" title="This workflow is optional per location">
        <p>
          The name includes &ldquo;Please turn this on if you&apos;d
          like to receive emails for new purchases.&rdquo; Some studios
          want real-time purchase notifications, others find them noisy.
          It can be enabled or disabled per location without affecting
          any other workflow.
        </p>
      </Callout>

      <h2>Cross-pipeline sale marking</h2>

      <WorkflowCard
        name="01. Core_Sale Update | mark as SOLD in all pipelines"
        purpose="When a sale happens in Core, this workflow checks every pipeline the contact might be in and marks the opportunity as the correct status. Handles Leads, STRONG Experience, and Presale pipelines in a single workflow."
        status="published"
        steps={[
          {
            type: "action",
            label: "Update appointment status",
            detail: "Updates any pending appointment statuses.",
          },
          {
            type: "condition",
            label: "What is their Active Package?",
            detail: "Checks if they have an active package. If empty, the workflow stops (nothing to mark as sold).",
          },
          {
            type: "action",
            label: "Add tag: sold",
            detail: "Tags the contact as having made a purchase.",
          },
          {
            type: "action",
            label: "Add note: Active Package Updated",
            detail: "Records what their active package changed to for audit trail.",
          },
          {
            type: "condition",
            label: "Which pipelines have an opportunity for this contact?",
            detail: "Checks each pipeline sequentially and updates the opportunity status in each one found.",
            branches: [
              {
                label: "Leads Pipeline",
                steps: [
                  {
                    type: "action",
                    label: "Update opportunity to Purchased",
                    detail: "Marks the Leads Pipeline opportunity as purchased/sold.",
                  },
                ],
              },
              {
                label: "STRONG Experience Pipeline",
                steps: [
                  {
                    type: "action",
                    label: "Update opportunity to Purchased",
                    detail: "Marks the STRONG Experience Pipeline opportunity as purchased/sold.",
                  },
                ],
              },
              {
                label: "Presale Pipeline",
                steps: [
                  {
                    type: "condition",
                    label: "What is their Active Package Category?",
                    detail: "Routes to different statuses based on what they purchased.",
                  },
                  {
                    type: "action",
                    label: "Update opportunity to Intro Offer / Membership / Package",
                    detail: "Sets the Presale opportunity to the correct status matching what was purchased.",
                  },
                ],
              },
            ],
          },
        ]}
        settings={{ allowReentry: true, stopOnResponse: false }}
      />

      <h2>DND and STOP reply handling</h2>

      <p>
        When a contact replies &ldquo;STOP&rdquo; to an SMS, they need
        to be set to DND (Do Not Disturb), removed from all active
        nurture workflows, and their pipeline opportunities cleaned up.
        There is a separate STOP handler for each campaign because
        each one needs to know which workflows and tags to clean up.
      </p>

      <WorkflowCard
        name="04. STRONG Starter | Replied STOP"
        purpose="When a contact replies STOP during the STRONG Starter lead nurture, enables SMS DND, removes them from all active nurture workflows, cleans up their Leads Pipeline opportunity, and removes nurture tags. This is one example; each campaign has its own variant."
        status="published"
        steps={[
          {
            type: "action",
            label: "Mark conversation as read",
            detail: "Marks the STOP reply conversation as read so it does not clutter the inbox.",
          },
          {
            type: "condition",
            label: "Are they in the Leads Pipeline?",
            detail: "Checks whether they have a Leads Pipeline opportunity to clean up.",
          },
          {
            type: "action",
            label: "Remove from all active nurture workflows",
            detail: "Stops all in-progress nurture sequences.",
          },
          {
            type: "action",
            label: "Remove tag: active strong starter nurture",
            detail: "Removes the campaign-specific nurture tag.",
          },
          {
            type: "action",
            label: "Enable SMS DND",
            detail: "Sets the contact to Do Not Disturb for SMS. No further SMS messages will be sent by any workflow.",
          },
          {
            type: "action",
            label: "Update opportunity to unsubscribed",
            detail: "Moves their Leads Pipeline card to the unsubscribed status.",
          },
          {
            type: "wait",
            label: "Wait",
            detail: "Pauses before removing the pipeline opportunity.",
          },
          {
            type: "action",
            label: "Remove opportunity from Leads Pipeline",
            detail: "Cleans up the pipeline card.",
          },
          {
            type: "action",
            label: "Remove tag: pipeline - leads pipeline",
            detail: "Final tag cleanup.",
          },
        ]}
        settings={{ allowReentry: true, stopOnResponse: false }}
      />

      <p>
        Similar STOP handling workflows exist (some as drafts) for:
      </p>

      <ul>
        <li>
          <strong>STRONG Experience</strong>{" "} (plus variants for
          5-for-$50 and UK locations)
        </li>
        <li>
          <strong>LONG Experience</strong>
        </li>
        <li>
          <strong>STRONGer Experience</strong>
        </li>
        <li>
          <strong>Studio Relaunch</strong>
        </li>
      </ul>

      <Callout type="warning" title="STOP handling must match the active campaign">
        <p>
          When a new campaign launches, the matching STOP handler must
          be published alongside the lead nurture workflow. If the STOP
          handler is still set to draft while the nurture is live,
          contacts who reply STOP will have DND enabled (Grow handles
          that automatically) but will not be properly cleaned up from
          nurture workflows and pipelines.
        </p>
      </Callout>

      <h2>Pipeline utility: Last Call Date</h2>

      <WorkflowCard
        name="Update Last Call Date Field | Intro Offer Contact Card"
        purpose="When the studio logs a call with an intro offer contact, this workflow stamps the date on both the contact record and the pipeline opportunity. Keeps the pipeline card showing when the last outreach happened."
        status="published"
        steps={[
          {
            type: "action",
            label: "Add note: Call made on [date]",
            detail: "Records the call date in the contact's notes.",
          },
          {
            type: "action",
            label: "Find opportunity in Intro Offer Pipeline",
            detail: "Locates their pipeline card.",
          },
          {
            type: "action",
            label: "Update Last Call Date on opportunity",
            detail: "Stamps the call date on the pipeline card so the studio can see at a glance when this contact was last contacted.",
          },
        ]}
        settings={{ allowReentry: true, stopOnResponse: false }}
      />

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

      <h2>Summary</h2>

      <p>
        These system workflows are the plumbing that keeps everything
        running. Here is a quick reference of what each category does:
      </p>

      <div className="my-4 overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>What it does</th>
              <th>When it matters</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>User assignment</strong></td>
              <td>Assigns a team member to new leads and sales</td>
              <td>If a contact has no assigned user and tasks are not appearing</td>
            </tr>
            <tr>
              <td><strong>Date stamping</strong></td>
              <td>Stamps purchase dates for intro offers, memberships, packages, and first visit</td>
              <td>If date fields are empty or showing the wrong date</td>
            </tr>
            <tr>
              <td><strong>Internal notifications</strong></td>
              <td>Emails the studio when purchases happen</td>
              <td>If the studio is not receiving purchase alerts</td>
            </tr>
            <tr>
              <td><strong>Cross-pipeline sale marking</strong></td>
              <td>Marks the contact as sold in every pipeline they appear in</td>
              <td>If a sale is not reflected in a pipeline</td>
            </tr>
            <tr>
              <td><strong>DND/STOP handling</strong></td>
              <td>Enables DND, removes from nurture, cleans up pipelines</td>
              <td>If a contact who replied STOP is still receiving messages</td>
            </tr>
            <tr>
              <td><strong>Last Call Date</strong></td>
              <td>Stamps when the studio last called an intro offer contact</td>
              <td>If the pipeline card shows an outdated or missing last call date</td>
            </tr>
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
          </tbody>
        </table>
      </div>
    </PageLayout>
  )
}
