import { PageLayout } from "@/components/PageLayout"
import { Callout } from "@/components/Callout"
import { WorkflowCard } from "@/components/WorkflowCard"

export default function NewLeads() {
  return (
    <PageLayout
      title="New Leads"
      description="Website submissions, Facebook leads, and first contact workflows."
      slug="/workflows/key-workflows/new-leads"
    >
      <p>
        When a new lead enters Grow, multiple workflows fire within
        seconds to handle the first contact. Where the lead came from
        determines which workflows run, but the outcome is the same: the
        lead gets a welcome message, the studio gets notified, and the
        contact appears in the Leads Pipeline ready for follow-up.
      </p>

      <h2>How leads enter Grow</h2>

      <p>
        Leads arrive from three main sources, each handled by a different
        workflow:
      </p>

      <ul>
        <li>
          <strong>Website enquiry form:</strong>{" "} handled by the
          Website Submission workflow (trigger: Form Submitted).
        </li>
        <li>
          <strong>Facebook/Instagram lead ad:</strong>{" "} handled by the
          STRONG Intro Offer New Lead Workflow (trigger: Facebook Lead
          Form Submitted, filtered by Page and Form).
        </li>
        <li>
          <strong>Core account creation:</strong>{" "} when someone creates
          an account directly in Hapana Core without purchasing, the sync
          creates a contact in Grow. The Intro Offer Status Update
          workflow detects this via the &ldquo;account created&rdquo; tag
          and routes them accordingly.
        </li>
      </ul>

      <h2>How these workflows connect</h2>

      <p>
        The lead workflows are not a single chain. They are a set of
        independent workflows that each handle a piece of the process.
        Some are triggered directly by events, others are started by
        another workflow using an &ldquo;Add to Workflow&rdquo; action.
      </p>

      <div className="my-6 p-5 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-sm font-[family-name:var(--font-kessel)] font-black uppercase tracking-wide text-black mt-0 mb-3">
          Workflow flow
        </p>
        <div className="text-sm text-gray-700 space-y-1 font-mono">
          <p className="m-0">
            <strong>Website Form</strong> → Website Submission workflow
          </p>
          <p className="m-0">
            <strong>Facebook Ad</strong> → STRONG Intro Offer | New Lead Workflow
          </p>
          <p className="m-0 mt-2 pt-2 border-t border-gray-300">
            Both add to Leads Pipeline → lead follow-up begins
          </p>
          <p className="m-0">
            If the lead books a class → First Time Booking SMS
          </p>
          <p className="m-0">
            If the lead completes a class → First Visit Complete Check-in
          </p>
        </div>
      </div>

      <h2>The workflows</h2>

      <WorkflowCard
        name="01. Website Submission | send notifications and add to Lead Pipeline if Active Package is empty"
        purpose="Handles every lead that fills out the website enquiry form. Sets their source, notifies the studio, sends a welcome email, tags them as a lead, and creates a pipeline opportunity."
        status="published"
        workflowUrl="https://grow.hapana.com/location/cGie31g8caN2HkP6vN2P/workflow/07caa788-5dca-4bf9-8a0a-b4c8d9e6b339"
        trigger="Form Submitted (website enquiry form)"
        steps={[
          {
            type: "action",
            label: "Set Contact Source to Website",
            detail: "Records where this lead came from so reporting can track website leads separately.",
          },
          {
            type: "action",
            label: "Send internal notification to the studio",
            detail: "The studio receives an email notification that a new lead has come in, so they can follow up quickly.",
          },
          {
            type: "action",
            label: "Send welcome email",
            detail: "Sends the \"Welcome to STRONG Pilates {{custom_values.location_short}}\" email to the lead.",
          },
          {
            type: "action",
            label: "Add tag: lead",
            detail: "Tags the contact as a lead for filtering and workflow routing.",
          },
          {
            type: "condition",
            label: "Is their Active Package empty?",
            detail: "Checks whether the contact already has an active package. If they do, they are already a customer and do not need a pipeline opportunity.",
          },
          {
            type: "action",
            label: "Create opportunity in Leads Pipeline",
            detail: "If Active Package is empty, creates a pipeline card so the lead appears on the Leads board for follow-up.",
          },
          {
            type: "action",
            label: "Send SMS",
            detail: "Sends the initial follow-up SMS introducing the studio and letting the lead know someone will be in touch.",
          },
        ]}
        settings={{ allowReentry: true, stopOnResponse: false }}
      />

      <WorkflowCard
        name="01. STRONG Intro Offer | New Lead Workflow"
        purpose="Handles leads from Facebook and Instagram ads. Runs a multi-day nurture sequence with emails, SMS, and a task to call the lead, checking at each step whether they have purchased."
        status="published"
        workflowUrl="https://grow.hapana.com/location/cGie31g8caN2HkP6vN2P/workflow/7307f139-52e6-4c27-8756-4bbf495e871c"
        trigger="Facebook Lead Form Submitted (filtered by Page and Form)"
        steps={[
          {
            type: "condition",
            label: "Do they have the 'active strong intro offer nurture' tag?",
            detail: "Prevents the contact from entering this sequence if they are already in it.",
          },
          {
            type: "action",
            label: "Add tag: active - strong intro offer nurture",
            detail: "Marks the contact as actively in this nurture sequence.",
          },
          {
            type: "condition",
            label: "Is their Active Package empty?",
            detail: "Only creates a pipeline opportunity if they have not already purchased.",
          },
          {
            type: "action",
            label: "Create opportunity in Leads Pipeline",
            detail: "Adds the lead to the pipeline board for follow-up.",
          },
          {
            type: "action",
            label: "Send intro offer email",
            detail: "Sends the \"STRONG Intro Offer: 5 classes for {{custom_values.strong_intro_offer_price}}\" email.",
          },
          {
            type: "wait",
            label: "Wait",
            detail: "Pauses before the next touchpoint.",
          },
          {
            type: "condition",
            label: "Is their Active Package still empty?",
            detail: "Re-checks before each message. If they purchased, the sequence stops sending.",
          },
          {
            type: "action",
            label: "Send SMS",
            detail: "Follow-up SMS to the lead.",
          },
          {
            type: "wait",
            label: "Wait",
            detail: "Pauses before the call task.",
          },
          {
            type: "condition",
            label: "Is their Active Package still empty?",
            detail: "Guard check before creating a call task.",
          },
          {
            type: "action",
            label: "Add task: Call within 24 hours",
            detail: "Creates a task for the studio team to call this lead personally.",
          },
          {
            type: "wait",
            label: "Wait",
            detail: "Pauses before the next email.",
          },
          {
            type: "condition",
            label: "Is their Active Package still empty?",
            detail: "Guard check before sending more content.",
          },
          {
            type: "action",
            label: "Send email: Introducing the Rowformer",
            detail: "Sends the \"Introducing the Rowformer: Not Reformer\" email to build excitement about the equipment.",
          },
          {
            type: "wait",
            label: "Wait",
            detail: "Pauses before the next SMS.",
          },
          {
            type: "condition",
            label: "Is their Active Package still empty?",
            detail: "Guard check.",
          },
          {
            type: "action",
            label: "Send SMS",
            detail: "Another follow-up SMS.",
          },
          {
            type: "wait",
            label: "Wait",
            detail: "Pauses before final SMS.",
          },
          {
            type: "condition",
            label: "Is their Active Package still empty?",
            detail: "Final guard check.",
          },
          {
            type: "action",
            label: "Send SMS",
            detail: "Final SMS in the nurture sequence.",
          },
          {
            type: "wait",
            label: "Wait",
            detail: "Pauses before cleanup.",
          },
          {
            type: "action",
            label: "Remove opportunity from Leads Pipeline",
            detail: "Cleans up the pipeline card since the nurture sequence is over.",
          },
          {
            type: "action",
            label: "Remove tag: active - strong intro offer nurture",
            detail: "Removes the nurture tag so the contact can potentially re-enter in the future.",
          },
        ]}
        settings={{ allowReentry: true, stopOnResponse: false }}
      />

      <Callout type="tip" title="Guard checks at every step">
        <p>
          Notice how the New Lead Workflow checks &ldquo;Is their Active
          Package still empty?&rdquo; before every message. This is the
          guard check pattern. If the lead purchases at any point during
          the sequence, the remaining messages stop. The contact gets
          picked up by the intro offer purchase workflows instead.
        </p>
      </Callout>

      <WorkflowCard
        name="00. Update 'Date Contact Created' when new contact is made"
        purpose="Sets the Date Contact Created field to the current date. A simple utility workflow used by other workflows to timestamp when a contact first entered the system."
        status="published"
        workflowUrl="https://grow.hapana.com/location/cGie31g8caN2HkP6vN2P/workflow/f60b4791-64d1-40d2-8823-ecf9a4e00ab9"
        steps={[
          {
            type: "action",
            label: "Set Date Contact Created to current date",
            detail: "Stamps the contact with today's date for reporting and time-based filtering.",
          },
        ]}
        settings={{ allowReentry: true, stopOnResponse: false }}
      />

      <WorkflowCard
        name="01. Systems | Assign User | New Lead"
        purpose="Automatically assigns a team member to the new lead contact so they have an owner in the system."
        status="published"
        workflowUrl="https://grow.hapana.com/location/cGie31g8caN2HkP6vN2P/workflow/4e886d32-fabf-447d-95b5-ef74666fe331"
        steps={[
          {
            type: "action",
            label: "Assign to user",
            detail: "Assigns the contact to the configured team member for this location.",
          },
        ]}
        settings={{ allowReentry: true, stopOnResponse: false }}
      />

      <h2>Post-booking workflows</h2>

      <p>
        Once a lead books and attends their first class, two additional
        workflows handle the follow-up. These are not triggered directly.
        They are started by the intro offer purchase workflows (covered
        in the next section) when a booking or visit is detected.
      </p>

      <WorkflowCard
        name="02. First time booking SMS confirmation"
        purpose="Sends a confirmation SMS when a lead books their first class. Checks whether this SMS has already been sent to avoid duplicates, and routes to the correct message based on whether they have attended before."
        status="published"
        workflowUrl="https://grow.hapana.com/location/cGie31g8caN2HkP6vN2P/workflow/bfef5888-e460-4eb4-88a7-aee7f6425255"
        steps={[
          {
            type: "wait",
            label: "Wait (failsafe)",
            detail: "Short pause to let all data sync before checking conditions.",
          },
          {
            type: "wait",
            label: "Wait",
            detail: "Additional pause.",
          },
          {
            type: "condition",
            label: "Has the first SMS been sent before?",
            detail: "Checks for the 'sms_sent_first visit' tag. If they already got this SMS, the workflow exits.",
          },
          {
            type: "condition",
            label: "What is their attendance total?",
            detail: "Routes to different messaging based on whether they have attended a class (≥1) or not yet (0 or empty).",
          },
          {
            type: "action",
            label: "Add tag: sms_sent_first visit",
            detail: "Marks that this SMS has been sent so it does not send again.",
          },
          {
            type: "action",
            label: "Send SMS",
            detail: "Sends the first-time booking confirmation message with arrival instructions.",
          },
        ]}
        settings={{ allowReentry: false, stopOnResponse: false }}
      />

      <WorkflowCard
        name="03. First Visit Complete Check-in Message"
        purpose="Sends a check-in SMS after a contact completes their first class. Routes to the correct message variant based on which intro offer package they are on."
        status="published"
        workflowUrl="https://grow.hapana.com/location/cGie31g8caN2HkP6vN2P/workflow/596eb026-4dd2-4b56-87f0-c41813b5abb6"
        steps={[
          {
            type: "wait",
            label: "Wait",
            detail: "Short pause after first visit is recorded.",
          },
          {
            type: "condition",
            label: "Have they been sent the first visit SMS before?",
            detail: "Checks for the 'sms_sent_post first visit' tag to prevent duplicates.",
          },
          {
            type: "condition",
            label: "What is their Intro Offer Active Package?",
            detail: "Routes to different SMS wording based on the package type: Intro to STRONG, STRONG Experience, STRONG Starter, or STRONG Intro Offer.",
          },
          {
            type: "action",
            label: "Add tag: sms_sent_post first visit",
            detail: "Marks that this SMS has been sent.",
          },
          {
            type: "action",
            label: "Send SMS",
            detail: "Sends the post-first-class check-in: \"Well done on completing your first STRONG Pilates class today. How did you go?\"",
          },
        ]}
        settings={{ allowReentry: false, stopOnResponse: false }}
      />

      <h2>What the lead experiences</h2>

      <p>
        From the lead&apos;s perspective, here is what happens when they
        fill out a website form or click a Facebook ad:
      </p>

      <ol>
        <li>
          <strong>Immediately:</strong>{" "} they receive a welcome email
          and an SMS introducing the studio.
        </li>
        <li>
          <strong>Over the next few days:</strong>{" "} they receive
          additional emails and SMS messages about the intro offer, the
          equipment, and what to expect. Each message only sends if they
          have not yet purchased.
        </li>
        <li>
          <strong>Within 24 hours of enquiry:</strong>{" "} the studio
          team gets a task to call the lead personally.
        </li>
        <li>
          <strong>When they book:</strong>{" "} they receive a booking
          confirmation SMS with arrival instructions (bring a towel,
          arrive 15 minutes early).
        </li>
        <li>
          <strong>After their first class:</strong>{" "} they receive a
          check-in SMS asking how it went.
        </li>
        <li>
          <strong>If they purchase:</strong>{" "} the nurture sequence
          stops and the intro offer workflows take over (covered in the
          next section).
        </li>
        <li>
          <strong>If they do not purchase:</strong>{" "} the nurture
          sequence completes, the pipeline opportunity is removed, and the
          lead sits in the system until a future campaign re-engages them.
        </li>
      </ol>

      <Callout type="warning" title="Facebook lead forms must be mapped">
        <p>
          For the Facebook Lead Form trigger to work, your Facebook page
          and lead forms must be connected to Grow via the integrations
          settings. If a new campaign launches with a new form, the
          trigger filter on the New Lead Workflow needs to be updated to
          include that form. This is typically handled by HQ during
          campaign deployment.
        </p>
      </Callout>
    </PageLayout>
  )
}
