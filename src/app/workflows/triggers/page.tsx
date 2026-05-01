import { PageLayout } from "@/components/PageLayout"
import { Callout } from "@/components/Callout"
import { Screenshot } from "@/components/Screenshot"

export default function Triggers() {
  return (
    <PageLayout
      title="Triggers"
      description="What starts a workflow. The entry point for every automation."
      slug="/workflows/triggers"
    >
      <p>
        A trigger is the event that starts a workflow. Nothing happens
        until a trigger fires. When you open a workflow in the builder,
        triggers sit at the very top of the canvas. A workflow can have
        one trigger or several. If it has multiple triggers, any one of
        them firing will start the workflow for that contact.
      </p>

      <Screenshot
        src="/screenshots/grow-workflow-triggers.png"
        alt="The workflow builder for 01. Intro Offer Status Update showing five triggers at the top: two Contact Tag triggers, a Contact Created trigger, another Contact Tag trigger, and a Contact Changed trigger. The Add Trigger panel is open on the right showing available trigger types grouped into Recent Triggers and Contact categories, including Contact Created, Contact Tag, Customer Replied, Facebook Lead Form Submitted, Form Submitted, Birthday Reminder, Contact Changed, Contact DND, Custom Date Reminder, Note Added, Note Changed, Task Added, Task Reminder, Task Completed, and Contact Engagement Score."
        caption="A workflow with five triggers (highlighted) and the Add Trigger panel showing all available trigger types."
      />

      <h2>Trigger types used in STRONG workflows</h2>

      <p>
        The Add Trigger panel shows every trigger type available. In
        practice, STRONG workflows use a handful of them repeatedly. Here
        are the trigger types you will encounter, ordered by how often
        they appear.
      </p>

      <h3>Contact Changed</h3>

      <p>
        The most common trigger by far. It fires when a specific custom
        field on a contact record changes value. Almost half of all
        triggers in the template account are Contact Changed triggers.
      </p>

      <p>
        Each Contact Changed trigger watches a specific field and can be
        set to fire in two ways:
      </p>

      <ul>
        <li>
          <strong>Has changed</strong> (any change): fires whenever the
          field value changes to anything. Used for fields like{" "}
          <strong>Active Package</strong> and{" "}
          <strong>Attendance Total</strong> where you want to react to any
          update.
        </li>
        <li>
          <strong>Equals a specific value</strong>: fires only when the
          field changes to a particular value. Used for fields like{" "}
          <strong>Location Status</strong> (fire only when it
          equals &ldquo;inactive&rdquo;) or{" "}
          <strong>STRONG Intro Offer Visits</strong> (fire only when it
          equals 1 or 5).
        </li>
      </ul>

      <p>
        Examples from published workflows:
      </p>

      <table>
        <thead>
          <tr>
            <th>Workflow</th>
            <th>Trigger field</th>
            <th>Condition</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Active Package Change</td>
            <td>Active Package</td>
            <td>Has changed (any value)</td>
          </tr>
          <tr>
            <td>Attendance Milestones</td>
            <td>Attendance Total</td>
            <td>Has changed (any value)</td>
          </tr>
          <tr>
            <td>Intro Offer First Class Complete</td>
            <td>STRONG Intro Offer Visits</td>
            <td>Equals 1</td>
          </tr>
          <tr>
            <td>Intro Offer 5 Visits</td>
            <td>STRONG Intro Offer Visits</td>
            <td>Equals 5</td>
          </tr>
          <tr>
            <td>Location Status Inactive</td>
            <td>Location Status</td>
            <td>Equals &ldquo;inactive&rdquo;</td>
          </tr>
          <tr>
            <td>Weekly Check-ins</td>
            <td>Attendance Total</td>
            <td>Has changed (any value)</td>
          </tr>
        </tbody>
      </table>

      <Callout type="tip" title="Why Contact Changed is so common">
        <p>
          STRONG uses Hapana Core as the source of truth for membership
          data. When Core syncs data into Grow, it updates contact fields
          like Active Package, Attendance Total, and Location Status. Each
          of those field updates fires any Contact Changed trigger that is
          watching that field. This is how Grow reacts to events that
          happen in Core without needing a direct integration.
        </p>
      </Callout>

      <h3>Contact Created</h3>

      <p>
        Fires when a new contact is created in Grow. This can happen via
        the Core sync (when someone creates an account in Core, the sync
        creates a matching contact in Grow), via a form submission, or
        via manual creation.
      </p>

      <p>
        Contact Created triggers in STRONG workflows almost always include
        a filter. The most common filter is <strong>Has Tag &ldquo;account
        created&rdquo;</strong>, which ensures the workflow only fires for
        contacts that came through the Core sync (Core adds this tag
        automatically). This prevents the workflow from firing when a
        contact is created manually or from a different source.
      </p>

      <h3>Pipeline Stage Updated</h3>

      <p>
        Fires when a contact&apos;s opportunity moves to a specific stage
        in a specific pipeline. The trigger requires both the pipeline and
        the target stage to be configured. Used in STRONG workflows for:
      </p>

      <ul>
        <li>
          <strong>Call No Answer sequences:</strong>{" "} when a lead is
          moved to a &ldquo;Call No Answer&rdquo; stage, the workflow sends
          a follow-up SMS.
        </li>
        <li>
          <strong>Intro Offer progression:</strong>{" "} when a contact
          reaches Day 14 in the Intro Offer Pipeline, the workflow sends
          the completion email and membership upsell.
        </li>
      </ul>

      <h3>Contact Tag</h3>

      <p>
        Fires when a tag is added to or removed from a contact. The
        trigger specifies which tag and whether it should fire on add or
        remove. In STRONG workflows, tag triggers are used for:
      </p>

      <ul>
        <li>
          Detecting when a contact&apos;s active package type changes
          (the sync adds and removes tags like{" "}
          <code>active - intro offer</code> and{" "}
          <code>active - member</code>).
        </li>
        <li>
          Reacting to manual tag changes by team members (e.g. adding a
          tag to enrol someone in a specific workflow).
        </li>
      </ul>

      <h3>Customer Replied</h3>

      <p>
        Fires when a contact sends a reply via SMS or email. The trigger
        can filter by reply channel (SMS only, email only, or any) and by
        the content of the reply. STRONG uses this for:
      </p>

      <ul>
        <li>
          <strong>STOP detection:</strong>{" "} when a contact replies
          &ldquo;STOP&rdquo; via SMS, the workflow marks the conversation
          as read, moves them to &ldquo;Unsubscribed&rdquo; in the
          pipeline, and removes them from active nurture workflows.
        </li>
        <li>
          <strong>Reply-based enrolment:</strong>{" "} some presale
          broadcasts ask contacts to reply &ldquo;YES&rdquo; to register.
          The workflow watches for that reply and creates an opportunity
          when it detects it.
        </li>
      </ul>

      <h3>Form Submitted</h3>

      <p>
        Fires when a contact submits a specific form. Each trigger is
        linked to a particular form by ID. The main example in STRONG is
        the <strong>Website Submission</strong> workflow, which fires when
        a lead fills out the website enquiry form.
      </p>

      <h3>Birthday Reminder</h3>

      <p>
        Fires on a contact&apos;s birthday (based on their Date of Birth
        field). STRONG uses this to send the studio an internal
        notification and create a task to prepare for the member&apos;s
        birthday (e.g. writing a card, having the instructor acknowledge
        them in class).
      </p>

      <h3>Appointment</h3>

      <p>
        Fires when an appointment is booked, cancelled, or marked as a no
        show. Used for call booking workflows that send confirmation SMS,
        reminder SMS, and no-show follow-ups.
      </p>

      <h2>Trigger filters</h2>

      <p>
        Most triggers include filters that narrow down when they fire. A
        Contact Created trigger without a filter would fire for every
        single new contact, regardless of source. Filters let you restrict
        the trigger so it only fires when specific conditions are met.
      </p>

      <p>
        When you click on a trigger in the builder, the configuration
        panel opens on the right. At the bottom you will see a{" "}
        <strong>Filters</strong> section. This is where the trigger is
        scoped to only fire for the right contacts or events.
      </p>

      <Screenshot
        src="/screenshots/grow-trigger-filter-tag.png"
        alt="The Contact Created trigger configuration panel for the Intro Offer Status Update workflow. The trigger name is Contact Created with account created tag. The Filters section is highlighted with a red box showing a single filter: Tag Equals to account created. An Add filters link appears below."
        caption="A Contact Created trigger filtered to only fire when the contact has the &ldquo;account created&rdquo; tag. Without this filter, it would fire for every new contact regardless of source."
      />

      <p>
        Different trigger types offer different filter options. A Facebook
        Lead Form Submitted trigger, for example, lets you filter by both
        the Facebook <strong>Page</strong> and the specific{" "}
        <strong>Form</strong>. This ensures the workflow only fires for
        leads from the correct ad campaign and location.
      </p>

      <Screenshot
        src="/screenshots/grow-trigger-filter-facebook.png"
        alt="The Facebook Lead Form Submitted trigger configuration panel for the STRONG Intro Offer New Lead Workflow. The trigger name is 5 Days For $50 in 14 Days. The Filters section is highlighted with a red box showing two filters: Page Is set to Strong Pilates Coffs Harbour, and Form Is set to 5 Days For $50 in 14 Days 16/02/2026 V2."
        caption="A Facebook Lead Form trigger filtered by Page (Strong Pilates Coffs Harbour) and Form (5 Days For $50 in 14 Days). Each location and campaign gets its own filter combination."
      />

      <p>
        Common filter types you will see on STRONG triggers:
      </p>

      <ul>
        <li>
          <strong>Tag:</strong>{" "} the contact must have (or not have) a
          specific tag. The most common filter on Contact Created triggers.
        </li>
        <li>
          <strong>Field equals:</strong>{" "} a contact field must match a
          specific value.
        </li>
        <li>
          <strong>Page Is / Form Is:</strong>{" "} for Facebook Lead Form
          triggers, restricts to a specific Facebook page and lead form.
        </li>
        <li>
          <strong>In pipeline / Pipeline stage:</strong>{" "} the contact
          must have an opportunity in a specific pipeline or be at a
          specific stage.
        </li>
        <li>
          <strong>Contains phrase:</strong>{" "} for reply triggers, the
          message must contain specific text (e.g. &ldquo;STOP&rdquo;).
        </li>
      </ul>

      <Callout type="tip" title="Filters are part of the trigger, not the workflow">
        <p>
          Trigger filters determine whether the workflow starts at all. If
          a contact does not match the filter, the workflow never fires for
          them. This is different from an If/Else condition inside the
          workflow, which runs after the workflow has already started. Use
          filters to prevent irrelevant contacts from entering the
          workflow in the first place.
        </p>
      </Callout>

      <h2>Multiple triggers on one workflow</h2>

      <p>
        A workflow can have more than one trigger. The Intro Offer Status
        Update workflow (shown in the screenshot above) has five triggers:
        two Contact Tag triggers, a Contact Created trigger, another
        Contact Tag trigger, and a Contact Changed trigger. Any one of
        these firing will start the workflow for that contact.
      </p>

      <p>
        Multiple triggers are used when the same workflow needs to react
        to different events. The Intro Offer Status Update needs to catch
        contacts who arrive via the Core sync (Contact Created with
        &ldquo;account created&rdquo; tag), contacts whose active package
        changes (Contact Changed on Active Package), and contacts whose
        relevant tags are added or removed (Contact Tag triggers).
      </p>

      <Callout type="warning" title="Triggers are OR, not AND">
        <p>
          When a workflow has multiple triggers, they operate as OR logic.
          Any single trigger firing is enough to start the workflow. They
          do not all need to fire. If you need AND logic (multiple
          conditions must all be true), that is handled inside the workflow
          using conditions, not at the trigger level.
        </p>
      </Callout>

      <h2>Workflows without triggers</h2>

      <p>
        Some workflows in the template account have no trigger at all.
        These workflows do not start on their own. Instead, another
        workflow adds the contact to them using an &ldquo;Add to
        Workflow&rdquo; action. This pattern is used when a workflow is
        meant to be a reusable sub-sequence called from multiple places.
        For example, the presale nurture email sequence is a standalone
        workflow that other presale workflows add contacts into.
      </p>

      <p>
        If you open a workflow and see no triggers at the top, that means
        it is started by another workflow, not by an event.
      </p>
    </PageLayout>
  )
}
