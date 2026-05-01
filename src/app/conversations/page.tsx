import { PageLayout } from "@/components/PageLayout"
import { Callout } from "@/components/Callout"
import { Screenshot } from "@/components/Screenshot"

export default function Conversations() {
  return (
    <PageLayout
      title="Conversations"
      description="The unified inbox where SMS, email, and calls come together."
      slug="/conversations"
    >
      <p>
        The Conversations page is your unified inbox. Every SMS, email,
        WhatsApp message, Facebook message, and Instagram DM lands here in
        one place. When you click into Conversations from the sidebar, you
        will see three main columns: the inbox list on the left, the
        conversation history in the middle, and the contact details panel on
        the right.
      </p>

      <p>
        This is the page you should bookmark and keep open throughout the
        day. It gives you everything you need to manage communication with
        leads and members without switching between tools.
      </p>

      <Screenshot
        src="/screenshots/grow-conversations-full-view.png"
        alt="The Conversations page showing the three-column layout: the Team Inbox on the left with Unread, All, Recents, and Starred tabs and a list of contacts with unread message counts; the conversation history in the middle showing a completed call; and the Contact Details panel on the right with owner, tags, DND tab, and contact fields. The sub-menu at the top shows Conversations, Manual Actions, Snippets, Trigger Links, Analytics, and Settings."
        caption="The Conversations page with the inbox list (left), conversation history (middle), and contact details panel (right)."
      />

      <h2>The inbox (left pane)</h2>

      <p>
        The left column is your inbox list. It shows contact names with a
        preview of the most recent message. At the top, you have four
        sections you can switch between:
      </p>

      <ul>
        <li>
          <strong>Unread:</strong>{" "} messages you have not marked as read
          yet. Clicking on a conversation to read it does <em>not</em>{" "}
          automatically mark it as read. You have to click{" "}
          <strong>Mark as Read</strong> for it to be removed from this
          section. This is intentional so you can preview a message without
          losing track of it.
        </li>
        <li>
          <strong>Recents:</strong>{" "} the most recent communications,
          including outgoing automated messages. You will see a lot of
          activity here because your workflows are constantly sending emails
          and SMS in the background. Even if you have not manually sent
          anything, automated outgoing messages will appear.
        </li>
        <li>
          <strong>Starred:</strong>{" "} contacts you have manually starred.
          If someone is a hot lead and you want to keep them front of mind,
          click <strong>Mark as Starred</strong> on their conversation. They
          will stay in this section whether they are read or unread. To
          remove them, click <strong>Unmark</strong>.
        </li>
        <li>
          <strong>All:</strong>{" "} everything in your inbox, with no
          filters applied.
        </li>
      </ul>

      <h3>Search and filtering</h3>

      <p>
        At the top of the inbox list, you can search by name to find a
        specific contact&apos;s conversation. You can also filter by
        communication channel. Because your inbox contains Facebook
        messages, Instagram DMs, SMS, and emails all mixed together, it can
        be overwhelming without filters. Click the filter icon, select the
        channels you want (for example, just SMS), and click{" "}
        <strong>Apply</strong>. The list will update to only show
        conversations from those channels. Clear all filters when you want
        to go back to the full view.
      </p>

      <h2>The conversation history (middle pane)</h2>

      <p>
        When you select a contact from the inbox list, the middle column
        shows the full history of every interaction with that person. This
        includes:
      </p>

      <ul>
        <li>Every email sent and received</li>
        <li>Every SMS sent and received</li>
        <li>Opportunities they have been added to</li>
        <li>Internal notes added by you or your team</li>
        <li>Automated messages sent by workflows</li>
      </ul>

      <p>
        This is one of the most powerful parts of Grow. You get a complete
        timeline of everything that has happened with a contact, all in one
        scrollable view.
      </p>

      <Screenshot
        src="/screenshots/grow-conversations-email-tracking.png"
        alt="A conversation history showing SMS messages and emails. An email titled 'See Y'all Saturday - Full Lineup Dropped' has a green 'Opened' badge indicating the recipient opened it. Below it, more emails show in the timeline alongside SMS messages, giving a full picture of the conversation across channels."
        caption="The conversation timeline showing SMS messages and emails. The green 'Opened' badge on an email confirms the recipient read it."
      />

      <h3>Email open tracking</h3>

      <p>
        For emails, Grow shows delivery and open status with colour
        indicators:
      </p>

      <ul>
        <li>
          <strong>Blue:</strong>{" "} the email has been delivered
          successfully.
        </li>
        <li>
          <strong>Green (with &ldquo;opened&rdquo;):</strong>{" "} the
          recipient has opened the email.
        </li>
      </ul>

      <p>
        This gives you a clear picture of whether your emails are actually
        being read, which is especially useful during follow-up sequences.
      </p>

      <h3>Identifying which workflow sent a message</h3>

      <p>
        If you see an automated SMS or email in the conversation history and
        want to know which workflow it came from, click the{" "}
        <strong>three dots</strong> on that message, then click{" "}
        <strong>Details</strong>. You will see{" "}
        <strong>Automation Workflow</strong> listed, and you can click
        through to open that workflow directly. This is useful when you spot
        a message you want to edit or when you need to trace why a contact
        received a particular communication.
      </p>

      <h2>Sending messages</h2>

      <p>
        At the bottom of the conversation history pane, you will see tabs
        for <strong>SMS</strong>, <strong>WhatsApp</strong>, and{" "}
        <strong>Email</strong>. Before typing your message, make sure you
        have selected the correct channel.
      </p>

      <Screenshot
        src="/screenshots/grow-conversations-channel-tabs.png"
        alt="The compose area at the bottom of the Conversations page with the channel dropdown open showing SMS, WhatsApp, and Email options. Email is currently selected with a checkmark. The From Name field shows Mario Kaizen Collective. The Internal Comment tab is also visible next to the channel selector."
        caption="The channel dropdown in the compose area. Always check which channel is selected before sending your reply."
      />

      <Callout type="warning" title="Check the channel before you send">
        <p>
          A common mistake is typing a reply without checking which channel
          tab is selected. If a contact messaged you via SMS but the email
          tab is active, your reply will go out as an email instead. Always
          glance at which tab is highlighted before composing your message.
        </p>
      </Callout>

      <h3>Enter sends immediately</h3>

      <p>
        The compose area works like a chat box, not like an email client.
        Pressing <strong>Enter</strong> (or <strong>Return</strong>) will
        send the message immediately. If you need to start a new paragraph
        without sending, press <strong>Shift + Enter</strong>{" "}
        (or <strong>Shift + Return</strong> on Mac). Get in the habit of
        using Shift + Enter while composing so you do not accidentally send
        a half-finished message.
      </p>

      <h3>Scheduled sending</h3>

      <p>
        You can schedule messages to send at a later time. This works for
        SMS, WhatsApp, and email. Use the schedule option next to the send
        button to pick your date and time.
      </p>

      <h3>Email from address</h3>

      <p>
        When you compose an email, the &ldquo;from&rdquo; address defaults
        to the email of the user you are logged in as. If you want the email
        to come from a different address (for example, the studio&apos;s
        general email instead of your personal one), you can change it.
        Click on the from address, remove it, and type in the email you want
        to send from. Alternatively, log in as that user and the from
        address will update automatically.
      </p>

      <h2>Contact details (right pane)</h2>

      <p>
        The right column shows key information about the contact you are
        viewing. This is not the full contact record (you can access that
        from the Contacts page), but it gives you enough context to manage
        the conversation without leaving the inbox.
      </p>

      <p>
        What you will see in this panel:
      </p>

      <ul>
        <li>
          <strong>Name and phone number</strong>
        </li>
        <li>
          <strong>Assigned user:</strong>{" "} which team member is
          responsible for this contact.
        </li>
        <li>
          <strong>Tags:</strong>{" "} all tags currently applied to the
          contact.
        </li>
        <li>
          <strong>Active workflows:</strong>{" "} any automations the
          contact is currently enrolled in. This is useful for
          understanding what automated messages they are receiving.
        </li>
        <li>
          <strong>DND status:</strong>{" "} if the contact has opted out of
          a communication channel (for example, they replied STOP to a text
          message), it will show as DND for that channel. You can untick
          this if the opt-out was accidental.
        </li>
        <li>
          <strong>Appointments:</strong>{" "} any current or past bookings
          associated with the contact.
        </li>
        <li>
          <strong>Tasks:</strong>{" "} pending and completed tasks for this
          contact. You can add new tasks directly from here. For example, if
          you are on a call and need to follow up in two weeks, click{" "}
          <strong>Add Task</strong>, write your note, assign it to someone,
          set the due date, and save. You can also delete tasks or mark them
          complete from this panel.
        </li>
        <li>
          <strong>Notes:</strong>{" "} historical notes attached to the
          contact, both automated and manual. Add your own notes to keep a
          record of important context.
        </li>
      </ul>

      <h2>Snippets</h2>

      <p>
        Snippets are pre-written message templates you can insert when
        composing an SMS. Instead of typing the same message repeatedly, you
        can click <strong>Insert Snippet</strong> in the compose area,
        choose the snippet you want, and it will populate the message field
        for you. Send it as is or edit it before sending.
      </p>

      <p>
        Snippets serve two purposes:
      </p>

      <ul>
        <li>
          <strong>Quick manual replies:</strong>{" "} when you are sending
          the same type of message frequently (booking confirmations,
          follow-up messages), snippets save time.
        </li>
        <li>
          <strong>Workflow templates:</strong>{" "} many of your automated
          workflows use snippets as their message content. This means if you
          edit a snippet, the change will also apply wherever that snippet
          is used in your workflows.
        </li>
      </ul>

      <Callout type="tip" title="Editing a snippet">
        <p>
          To update a snippet, go to the snippets section (accessible from
          the Conversations sub-menu), find the snippet you want to
          change, click the <strong>three dots</strong>, and select{" "}
          <strong>Edit SMS</strong>. Your changes will take effect
          immediately and will also update in any workflows that reference
          that snippet.
        </p>
      </Callout>

      <h2>Manual actions and trigger links</h2>

      <p>
        Inside the Conversations sub-menu, you will also see{" "}
        <strong>Manual Actions</strong> and{" "}
        <strong>Trigger Links</strong>. Manual actions allow you to create
        manual message or phone call tasks, but this feature is rarely used
        in day to day operations. Trigger links are not used in the STRONG
        franchise setup, so you can safely ignore that section.
      </p>
    </PageLayout>
  )
}
