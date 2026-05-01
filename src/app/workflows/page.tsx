import { PageLayout } from "@/components/PageLayout"
import { Callout } from "@/components/Callout"
import { Screenshot } from "@/components/Screenshot"

export default function Workflows() {
  return (
    <PageLayout
      title="What is a Workflow"
      description="The automation engine that powers everything in Grow."
      slug="/workflows"
    >
      <p>
        A workflow is a set of instructions that runs automatically when
        something happens. Every automated SMS, every email sequence, every
        pipeline stage update, every tag that gets added behind the
        scenes: workflows are what make all of it happen. If contacts,
        pipelines, snippets, and email templates are the building blocks,
        workflows are the engine that connects them.
      </p>

      <p>
        When you saw automated messages appearing in a contact&apos;s
        conversation history, a workflow sent them. When a contact moved
        from one pipeline column to the next without anyone dragging them,
        a workflow moved them. When a tag appeared on a contact record that
        nobody manually added, a workflow applied it. Almost everything
        that happens automatically in Grow traces back to a workflow.
      </p>

      <h2>Where to find workflows</h2>

      <p>
        Workflows live in <strong>Automation &gt; Workflows</strong> in the
        sidebar. When you open this page, you see all workflows organized
        into folders. The template account has over 300 workflows across
        more than 60 folders. Most of these are deployed to your location
        via snapshot.
      </p>

      <Screenshot
        src="/screenshots/grow-workflow-list.png"
        alt="The Workflow List page at Automation > Workflows. The sidebar shows Automation highlighted. The main content shows numbered workflow folders: 00. Presale and Relaunch Workflows, 01. Lead Workflows, 02. Intro Offer Pipeline Management, 03. Memberships and Packages, 04. Systems, 05. STRONG Intro Offer, and 202604 April-May Tactical. Columns show Name, Status, Total Enrolled, Active Enrolled, Last Updated, Created On, and Stats. The tabs at the top show All Workflows, Needs Review, Deleted, and New Smart List."
        caption="The Workflow List at Automation > Workflows. Workflows are organized into numbered folders by function."
      />

      <p>
        Each workflow in the list shows its name, the folder it belongs to,
        its status (published or draft), and when it was last updated.
        You can search by name or filter by folder to find a specific one.
      </p>

      <h2>How a workflow works</h2>

      <p>
        Every workflow follows the same structure:
      </p>

      <ol>
        <li>
          <strong>A trigger fires.</strong>{" "} Something happens that
          starts the workflow. A contact&apos;s field changes, a form is
          submitted, a tag is added, a pipeline stage is updated. The
          trigger is the entry point.
        </li>
        <li>
          <strong>Actions execute in order.</strong>{" "} The workflow runs
          through a sequence of steps: send an SMS, send an email, add a
          tag, update a pipeline opportunity, wait a set amount of time,
          then continue to the next step.
        </li>
        <li>
          <strong>Conditions check before proceeding.</strong>{" "} At any
          point in the sequence, the workflow can check a condition before
          deciding what to do next. Does the contact have a specific tag?
          Is their active package category &ldquo;Memberships&rdquo;? Based
          on the answer, the workflow takes a different path.
        </li>
      </ol>

      <p>
        These three components (triggers, actions, and conditions) are
        covered in detail in the next three sections. This page focuses on
        the concepts you need before diving into those details.
      </p>

      <h2>A real example</h2>

      <p>
        Here is what the <strong>Website Submission</strong> workflow does
        when a lead fills out the enquiry form on your studio&apos;s
        website:
      </p>

      <ol>
        <li>
          <strong>Trigger:</strong>{" "} a form submission is detected on
          your website enquiry form.
        </li>
        <li>
          Sets the contact&apos;s <strong>Contact Source</strong> field to
          &ldquo;Website.&rdquo;
        </li>
        <li>
          Sends an <strong>internal notification</strong> to the studio so
          the team knows a new lead came in.
        </li>
        <li>
          Sends the lead a <strong>welcome email</strong> (&ldquo;Welcome
          to STRONG Pilates{" "}
          {`{{custom_values.location_short}}`}&rdquo;).
        </li>
        <li>
          Adds the <strong>lead</strong> tag to the contact.
        </li>
        <li>
          <strong>Checks:</strong>{" "} is the contact&apos;s Active
          Package field empty?
        </li>
        <li>
          If yes, creates an <strong>opportunity</strong> in the Leads
          Pipeline so the contact appears on the pipeline board for
          follow-up.
        </li>
      </ol>

      <p>
        All of that happens within seconds of the form being submitted,
        with no manual work. The lead gets a welcome email, the studio gets
        notified, and the contact shows up in the pipeline ready for
        follow-up. That is what workflows do.
      </p>

      <h2>Published vs draft</h2>

      <p>
        Every workflow has a status: <strong>published</strong> or{" "}
        <strong>draft</strong>.
      </p>

      <ul>
        <li>
          <strong>Published</strong> means the workflow is live and actively
          running. When its trigger fires, the workflow executes. Of the
          300+ workflows in the template account, roughly 90 are published.
          These are the ones doing work every day.
        </li>
        <li>
          <strong>Draft</strong> means the workflow exists but is not
          running. It will not fire even if its trigger conditions are met.
          Draft workflows include archived seasonal campaigns, regional
          variants that are not active, presale workflows for locations
          that have already opened, and templates that exist as starting
          points for future campaigns.
        </li>
      </ul>

      <Callout type="warning" title="Publishing and unpublishing workflows">
        <p>
          Changing a workflow from draft to published (or vice versa) takes
          effect immediately. If you accidentally publish a draft workflow,
          it will start firing on any contact that meets its trigger
          conditions. If you unpublish a published workflow, contacts
          currently inside it will stop progressing. Be deliberate about
          status changes.
        </p>
      </Callout>

      <h2>Folder structure</h2>

      <p>
        Workflows are organized into numbered folders that group them by
        function. The main folders you will see in the template account:
      </p>

      <table>
        <thead>
          <tr>
            <th>Folder</th>
            <th>What it contains</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>00. Presale</strong></td>
            <td>Workflows for locations that have not opened yet (lead nurture, VIP registration, call booking)</td>
          </tr>
          <tr>
            <td><strong>01. Lead Workflows</strong></td>
            <td>Website submission handling, first booking SMS, first visit follow-up, lead pipeline management</td>
          </tr>
          <tr>
            <td><strong>02. Intro Offer</strong></td>
            <td>Everything from intro offer purchase through to expiry or membership conversion, including the day-by-day pipeline progression</td>
          </tr>
          <tr>
            <td><strong>03. Memberships</strong></td>
            <td>60-day member journey, attendance milestones, birthday notifications, days absent alerts, suspension handling</td>
          </tr>
          <tr>
            <td><strong>04. Systems</strong></td>
            <td>Background workflows that keep data in sync (field updates, date stamps, attendance tracking, weekly and monthly check-in counters)</td>
          </tr>
          <tr>
            <td><strong>05. STRONG Intro Offer</strong></td>
            <td>Intro offer SMS and email sequences (first class info, halfway check-in, completion, membership upsell)</td>
          </tr>
          <tr>
            <td><strong>Date-prefixed folders</strong></td>
            <td>Campaign workflows tied to a specific period (e.g. <code>202604 | April-May Tactical</code>)</td>
          </tr>
          <tr>
            <td><strong>[X] ARCHIVE</strong></td>
            <td>Past campaigns and seasonal promotions (BFCM, EOFY, challenges) kept as drafts for reference or reuse</td>
          </tr>
        </tbody>
      </table>

      <p>
        Campaign folders are prefixed with a date (e.g.{" "}
        <code>202511 | BFCM</code>) so they sort chronologically.
        Archived folders start with <code>[X]</code> to push them to the
        bottom of the list.
      </p>

      <h2>How workflows connect to what you already know</h2>

      <p>
        Every section you have read so far feeds into workflows:
      </p>

      <ul>
        <li>
          <strong>Contacts</strong> are what workflows act on. Every
          workflow runs in the context of a specific contact.
        </li>
        <li>
          <strong>Custom fields and custom values</strong> are what
          workflows read and write. A trigger might fire when a custom
          field changes. An action might set a custom field to a new value.
          SMS and email content pulls in custom values as placeholders.
        </li>
        <li>
          <strong>Pipelines</strong> are moved by workflows. When a
          contact&apos;s stage changes in a pipeline, it is usually a
          workflow that made the move. Workflows also create opportunities
          and update opportunity details.
        </li>
        <li>
          <strong>SMS snippets and email templates</strong> are the
          content that workflows deliver. When a workflow sends an SMS, it
          pulls the message from a snippet. When it sends an email, it uses
          an email template.
        </li>
        <li>
          <strong>Tags</strong> are how workflows track state. Workflows
          add tags to record that something happened (e.g.{" "}
          <code>sms_sent_first visit</code>) and check for tags before
          deciding what to do next.
        </li>
      </ul>

      <h2>Key settings on a workflow</h2>

      <p>
        When you open a workflow, there are two settings at the top that
        affect how it behaves:
      </p>

      <table>
        <thead>
          <tr>
            <th>Setting</th>
            <th>What it means</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Allow Re-entry</strong></td>
            <td>
              Whether a contact can enter this workflow more than once. When
              turned on, the same contact can be added to the workflow again
              if the trigger fires a second time. When turned off, a contact
              who has already been through the workflow will not enter it
              again.
            </td>
          </tr>
          <tr>
            <td><strong>Stop on Response</strong></td>
            <td>
              Whether the workflow should pause if the contact replies. When
              turned on, if the contact sends a message back (SMS or email),
              the workflow stops progressing and waits. This prevents
              automated messages from being sent while a real conversation
              is happening.
            </td>
          </tr>
        </tbody>
      </table>

      <h2>What you can and cannot do with workflows</h2>

      <p>
        Most workflows in your location are deployed by HQ via snapshot.
        You should not create, delete, or restructure workflows unless
        instructed to by HQ. What you <em>can</em> do:
      </p>

      <ul>
        <li>
          <strong>View any workflow</strong> to understand what it does and
          what messages it sends.
        </li>
        <li>
          <strong>Check which workflow sent a message</strong> by clicking
          the three dots on a message in Conversations and selecting
          Details.
        </li>
        <li>
          <strong>See active workflows on a contact</strong> in the contact
          details panel (right side of Conversations or the contact record).
        </li>
        <li>
          <strong>Remove a contact from a workflow</strong> if they are
          stuck or should not be receiving those messages.
        </li>
      </ul>

      <Callout type="important" title="Do not edit published workflows">
        <p>
          Changing a published workflow can break automations across your
          location. If something is not working correctly, flag it with HQ
          rather than editing the workflow yourself. The interconnected
          nature of workflows (one workflow adding contacts to another,
          removing them from others, checking conditions set by others)
          means a single change can have cascading effects.
        </p>
      </Callout>

      <p>
        The next three sections break down triggers, actions, and
        conditions in detail so you can read and understand any workflow
        in your account.
      </p>
    </PageLayout>
  )
}
