import { PageLayout } from "@/components/PageLayout"
import { Callout } from "@/components/Callout"
import { Screenshot } from "@/components/Screenshot"

export default function Actions() {
  return (
    <PageLayout
      title="Actions"
      description="What a workflow does once it's triggered."
      slug="/workflows/actions"
    >
      <p>
        Actions are the steps a workflow performs after a trigger fires.
        They execute in order from top to bottom. A workflow can have
        dozens of actions chained together: send an SMS, wait three days,
        check a condition, send an email, add a tag, move a pipeline
        stage. Each step runs automatically, one after the other, for
        every contact that enters the workflow.
      </p>

      <Screenshot
        src="/screenshots/grow-workflow-actions.png"
        alt="The workflow builder showing the Actions panel on the right side. The panel is divided into Recent Actions (Add To Workflow, Wait, Send Email, Find Opportunity, If/Else) and Contact actions (Create Contact, Find Contact, Update Contact Field, Add Contact Tag, Remove Contact Tag, Assign To User, Remove Assigned User, Enable/Disable DND, Add To Notes, Copy Contact, Edit Conversation, Add Task, Delete Contact). The workflow canvas in the background shows the flow of actions below the triggers."
        caption="The Actions panel showing all available action types. Recent Actions at the top reflect the ones most used in this account."
      />

      <h2>Action types used in STRONG workflows</h2>

      <p>
        The Actions panel organizes actions into categories. Here are the
        ones you will see inside STRONG workflows, grouped by what they
        do.
      </p>

      <h3>Communication actions</h3>

      <p>
        These send messages to the contact.
      </p>

      <table>
        <thead>
          <tr>
            <th>Action</th>
            <th>What it does</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Send SMS</strong></td>
            <td>Sends an SMS to the contact. The message content comes from a snippet or is written directly in the action. Custom value placeholders render with real values when the message sends.</td>
          </tr>
          <tr>
            <td><strong>Send Email</strong></td>
            <td>Sends an email using a specific email template. The action points to a template by ID, so the email&apos;s design, subject line, and content are all controlled by the template.</td>
          </tr>
          <tr>
            <td><strong>Internal Notification</strong></td>
            <td>Sends a notification to the studio team (not the contact). Used to alert staff when something important happens, like a new lead coming in or a member hitting an attendance milestone.</td>
          </tr>
        </tbody>
      </table>

      <Callout type="tip" title="Send Email is the most common communication action">
        <p>
          Across the published workflows in the template account, Send
          Email appears roughly twice as often as Send SMS. This is because
          email sequences (nurture drips, brand content, campaign
          promotions) tend to have more steps than SMS sequences, which are
          usually one or two messages.
        </p>
      </Callout>

      <h3>Contact management actions</h3>

      <p>
        These update information on the contact record.
      </p>

      <table>
        <thead>
          <tr>
            <th>Action</th>
            <th>What it does</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Update Contact Field</strong></td>
            <td>Sets a custom field on the contact to a specific value. The most heavily used action type. Workflows use it to set dates (Date Contact Created, Intro Offer First Visit Date), update statuses (Intro Offer Pipeline Status), and clear fields.</td>
          </tr>
          <tr>
            <td><strong>Add Contact Tag</strong></td>
            <td>Adds a tag to the contact. Tags act as flags that other workflows can check. Common tags include <code>lead</code>, <code>active - intro offer</code>, <code>active - member</code>, <code>sms_sent_first visit</code>, and <code>60 day member nurture</code>.</td>
          </tr>
          <tr>
            <td><strong>Remove Contact Tag</strong></td>
            <td>Removes a tag from the contact. Used when a contact&apos;s status changes (e.g. removing <code>active - intro offer</code> when they convert to a membership or become inactive).</td>
          </tr>
          <tr>
            <td><strong>Add to Notes</strong></td>
            <td>Adds a note to the contact record. Used for logging important events like &ldquo;Active Package has changed to: {`{{contact.active_package}}`}&rdquo; so the team has a timestamped history of what happened.</td>
          </tr>
          <tr>
            <td><strong>Assign to User</strong></td>
            <td>Assigns the contact to a specific team member. Less common in STRONG workflows but available when needed.</td>
          </tr>
          <tr>
            <td><strong>Enable/Disable DND</strong></td>
            <td>Toggles Do Not Disturb on a specific channel for the contact. Used when a contact opts out of SMS (replies STOP) to prevent further automated messages on that channel.</td>
          </tr>
        </tbody>
      </table>

      <h3>Pipeline actions</h3>

      <p>
        These manage the contact&apos;s position in pipelines.
      </p>

      <table>
        <thead>
          <tr>
            <th>Action</th>
            <th>What it does</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Find Opportunity</strong></td>
            <td>Searches for the contact&apos;s existing opportunity in a specific pipeline. This is always followed by a &ldquo;transition&rdquo; step that routes to different paths depending on whether an opportunity was found or not.</td>
          </tr>
          <tr>
            <td><strong>Update Opportunity</strong></td>
            <td>Moves an opportunity to a different stage, updates its status (open, won, lost, abandoned), or changes its details. This is what makes contacts move between columns on the pipeline board automatically.</td>
          </tr>
          <tr>
            <td><strong>Remove Opportunity</strong></td>
            <td>Deletes an opportunity from a pipeline entirely. Used for cleanup when a contact should no longer appear on a pipeline board.</td>
          </tr>
        </tbody>
      </table>

      <h3>Flow control actions</h3>

      <p>
        These control the timing and routing of the workflow itself.
      </p>

      <table>
        <thead>
          <tr>
            <th>Action</th>
            <th>What it does</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Wait</strong></td>
            <td>Pauses the workflow for a set period before continuing to the next step. Wait times range from minutes to days. A 5-minute &ldquo;failsafe&rdquo; wait at the top of many workflows gives the system time to process all trigger data before the first condition check runs.</td>
          </tr>
          <tr>
            <td><strong>If/Else</strong></td>
            <td>Checks a condition and branches the workflow into different paths. Covered in detail in the <a href="/workflows/conditions">Conditions &amp; Branching</a> section.</td>
          </tr>
          <tr>
            <td><strong>Add to Workflow</strong></td>
            <td>Enrols the contact into a different workflow. This is how workflows chain together. One workflow handles the trigger and initial logic, then hands the contact off to a specialist workflow for the next sequence.</td>
          </tr>
          <tr>
            <td><strong>Remove from Workflow</strong></td>
            <td>Removes the contact from a different workflow. The single most used action in the template account. When a contact&apos;s status changes, they often need to be pulled out of multiple active workflows at once. A single status change workflow might remove the contact from 5 to 10 other workflows.</td>
          </tr>
          <tr>
            <td><strong>Go to Step</strong></td>
            <td>Jumps to a specific step in the current workflow, skipping everything in between. Used to loop back to a previous point or skip ahead based on a condition result.</td>
          </tr>
          <tr>
            <td><strong>Add Task</strong></td>
            <td>Creates a task assigned to a team member. Used for actions that require human follow-up, like calling a lead who has not booked, or preparing for a member&apos;s birthday.</td>
          </tr>
        </tbody>
      </table>

      <h3>Other actions</h3>

      <table>
        <thead>
          <tr>
            <th>Action</th>
            <th>What it does</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Math Operation</strong></td>
            <td>Performs arithmetic on a contact field (add, subtract, multiply, divide). Used in the attendance check-in system to increment the Weekly Check-in and Monthly Check-in counters each time a contact&apos;s Attendance Total changes.</td>
          </tr>
          <tr>
            <td><strong>Edit Conversation</strong></td>
            <td>Marks a conversation as read or unread. Used in the STOP detection workflow to automatically mark the conversation as read after processing the opt-out.</td>
          </tr>
        </tbody>
      </table>

      <h2>How actions chain together</h2>

      <p>
        Actions execute top to bottom, one at a time. When a Wait action
        is reached, the workflow pauses for the specified duration, then
        picks up at the next action. A contact can be sitting inside a
        workflow for days or weeks, progressing through wait steps and
        receiving messages at timed intervals.
      </p>

      <p>
        Here is a simplified view of how the intro offer nurture
        sequence chains actions together:
      </p>

      <ol>
        <li><strong>Wait 5 minutes</strong> (failsafe)</li>
        <li><strong>If/Else:</strong>{" "} does their Active Package contain an intro offer?</li>
        <li><strong>Update Opportunity:</strong>{" "} move to &ldquo;Purchased&rdquo; column</li>
        <li><strong>Update Contact Field:</strong>{" "} set Intro Offer Name</li>
        <li><strong>Send Email:</strong>{" "} welcome email</li>
        <li><strong>Send SMS:</strong>{" "} welcome SMS</li>
        <li><strong>Wait 1 day</strong></li>
        <li><strong>If/Else:</strong>{" "} have they booked their first class?</li>
        <li><strong>Send SMS:</strong>{" "} &ldquo;not booked yet&rdquo; reminder</li>
        <li><strong>Wait until first class completes</strong></li>
        <li><strong>Send SMS:</strong>{" "} post-first-class follow-up</li>
        <li><strong>Wait until halfway through offer</strong></li>
        <li><strong>Send SMS:</strong>{" "} halfway check-in</li>
        <li><strong>Wait until offer expires</strong></li>
        <li><strong>Send Email:</strong>{" "} membership upsell</li>
      </ol>

      <p>
        Each step builds on the last. The contact receives the right
        message at the right time without anyone needing to send it
        manually.
      </p>

      <h2>Remove from Workflow: the cleanup pattern</h2>

      <p>
        The most common action in STRONG workflows is{" "}
        <strong>Remove from Workflow</strong>. This might seem surprising,
        but it makes sense when you understand how workflows interact.
      </p>

      <p>
        A contact can be enrolled in multiple workflows at the same time.
        When their status changes (e.g. they go from intro offer to
        member, or they become inactive), they need to be removed from
        workflows that no longer apply. A single workflow might contain
        5 to 10 &ldquo;Remove from Workflow&rdquo; actions to pull the
        contact out of all the sequences they should no longer be in.
      </p>

      <p>
        For example, when a contact&apos;s intro offer is marked as
        &ldquo;Won&rdquo; (they converted to a membership), the workflow
        removes them from every daily pipeline progression workflow
        (Day 1 &gt; Day 2, Day 2 &gt; Day 3, and so on) because those
        are no longer relevant.
      </p>

      <Callout type="warning" title="Removing a contact does not undo past actions">
        <p>
          When a contact is removed from a workflow, it stops them from
          progressing to future steps. It does not undo actions that
          already happened. Messages already sent are still sent, tags
          already added are still there, and fields already updated keep
          their values. Removal only prevents what has not happened yet.
        </p>
      </Callout>
    </PageLayout>
  )
}
