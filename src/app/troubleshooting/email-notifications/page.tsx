import { PageLayout } from "@/components/PageLayout"
import { Callout } from "@/components/Callout"

export default function EmailNotifications() {
  return (
    <PageLayout
      title="Email & Notification Issues"
      description="Phantom notifications, delivery failures, and DND contacts receiving messages."
      slug="/troubleshooting/email-notifications"
    >
      <p>
        Email and notification issues account for roughly 12% of
        troubleshooting tickets. They range from internal team members
        receiving excessive notification emails to contacts getting
        messages after opting out, to emails silently failing to
        deliver. These are often the most frustrating issues because
        they are visible to the contact and affect their experience
        directly.
      </p>

      <h2>What it looks like</h2>

      <ul>
        <li>A team member&apos;s inbox is flooded with internal notification emails (purchase alerts, task reminders) that keep arriving repeatedly.</li>
        <li>A contact who replied &ldquo;STOP&rdquo; is still receiving SMS messages.</li>
        <li>An email was sent by a workflow but the contact never received it (no bounce, no spam folder, just missing).</li>
        <li>A contact marked as DND (Do Not Disturb) received an automated message.</li>
        <li>SMS delivery shows as &ldquo;failed&rdquo; in the Conversations tab.</li>
        <li>The same notification email arrives multiple times for the same event.</li>
      </ul>

      <h2>Phantom internal notifications</h2>

      <h3>Root cause</h3>

      <p>
        The{" "}
        <a href="/workflows/key-workflows/system-workflows">
          Internal Notification workflows
        </a>
        {" "} send email alerts to the studio team when purchases happen
        (intro offers, memberships, packages). These workflows trigger on
        field changes, and because Core syncs push ALL fields on every
        sync cycle, a field value that fluctuates across syncs can
        re-trigger the notification workflow.
      </p>

      <p>
        Example: a contact purchases an intro offer. The purchase
        notification fires correctly on the first sync. But if a
        subsequent sync pushes the same Active Package value again (or a
        slightly different string formatting of the same package), the
        &ldquo;Active Package changed&rdquo; trigger fires again, and
        the team receives a second notification for the same purchase.
      </p>

      <h3>How to diagnose</h3>

      <ol>
        <li>
          <strong>Check the email content:</strong>{" "} are the
          notifications for the same contact and the same event, or for
          different contacts? If the same contact appears multiple times,
          the trigger is re-firing.
        </li>
        <li>
          <strong>Check the contact&apos;s Audit Logs:</strong>{" "} look
          for multiple Integration sync entries that pushed the Active
          Package or Active Package Category field. If the value appears
          in multiple sync entries, each one triggered the workflow.
        </li>
        <li>
          <strong>Check the notification workflow:</strong>{" "} some
          notification workflows have a &ldquo;recently notified&rdquo;
          check that prevents re-firing within a time window. If this
          check is missing, the workflow will fire on every qualifying
          trigger.
        </li>
      </ol>

      <h3>Resolution</h3>

      <p>
        The individual notifications cannot be recalled. For the
        underlying issue, check whether the notification workflow has a
        de-duplication condition (like checking for a &ldquo;recently
        notified&rdquo; tag or a time-based gate). If it does not,
        escalate to HQ to add one.
      </p>

      <h2>DND contacts still receiving messages</h2>

      <h3>Root cause</h3>

      <p>
        When a contact replies &ldquo;STOP&rdquo; to an SMS, Grow marks
        them as DND (Do Not Disturb) for SMS. The{" "}
        <a href="/workflows/key-workflows/system-workflows">
          DND/STOP Reply workflows
        </a>
        {" "} also add specific tags like{" "}
        <code>dnd</code>{" "} and{" "}
        <code>sms - opted out</code>{" "} to the contact.
      </p>

      <p>
        Most workflows in the STRONG system check for DND status before
        sending messages. But not all of them. If a workflow was created
        before the DND check pattern was standardized, or if it was
        copied from a template that did not include DND checks, it may
        send messages to opted-out contacts.
      </p>

      <p>
        A second cause: the DND status in Grow is channel-specific. A
        contact can be DND for SMS but not for email. If a workflow sends
        both SMS and email, the SMS will be blocked but the email will
        still go through. This is correct behavior, but can be confusing
        if the studio expected all communication to stop.
      </p>

      <h3>How to diagnose</h3>

      <ol>
        <li>
          <strong>Check DND status:</strong>{" "} on the contact&apos;s
          profile, check the DND indicator. Note which channels are
          marked as DND (SMS, Email, or both).
        </li>
        <li>
          <strong>Check tags:</strong>{" "} look for the{" "}
          <code>dnd</code>{" "} and{" "}
          <code>sms - opted out</code>{" "} tags. If these are present
          but messages were still sent, the sending workflow likely does
          not have a DND check.
        </li>
        <li>
          <strong>Check the sending workflow:</strong>{" "} identify which
          workflow sent the message (visible in the contact&apos;s
          timeline). Open that workflow and look for a condition step
          before the send action that checks DND status or the{" "}
          <code>dnd</code>{" "} tag.
        </li>
      </ol>

      <h3>Resolution</h3>

      <Callout type="warning" title="Escalate to HQ">
        <p>
          If a workflow is sending to DND contacts, it needs a condition
          step added before the send action. This is a workflow edit.
          Flag it to HQ with: the workflow name, the contact who received
          the message while on DND, and the message they received.
        </p>
      </Callout>

      <h2>SMS delivery failures</h2>

      <h3>Root cause</h3>

      <p>
        SMS delivery can fail for several reasons, most of which are
        outside Grow&apos;s control:
      </p>

      <ul>
        <li>
          <strong>Invalid phone number:</strong>{" "} the number is
          formatted incorrectly, is a landline, or has been
          disconnected.
        </li>
        <li>
          <strong>Carrier filtering:</strong>{" "} the carrier blocked the
          message as suspected spam, usually because it contains a URL
          or the sending number has sent too many messages in a short
          period.
        </li>
        <li>
          <strong>Twilio number not configured:</strong>{" "} the
          location&apos;s Twilio sending number is not set up correctly
          or has expired.
        </li>
        <li>
          <strong>Country restrictions:</strong>{" "} some international
          numbers cannot receive SMS from Australian or US Twilio
          numbers.
        </li>
      </ul>

      <h3>How to diagnose</h3>

      <ol>
        <li>
          <strong>In Conversations:</strong>{" "} open the contact&apos;s
          conversation and look for the failed message. Hover over or
          click the message to see the delivery status and error details.
        </li>
        <li>
          <strong>Check the phone number:</strong>{" "} verify the number
          includes the correct country code and is a mobile number (not
          a landline).
        </li>
        <li>
          <strong>Check recent send volume:</strong>{" "} if the location
          sent a bulk SMS campaign recently, carrier filtering may have
          been triggered. Check if other contacts at the same location
          also had failures around the same time.
        </li>
      </ol>

      <h3>Resolution</h3>

      <p>
        For invalid numbers: update the phone number in the contact
        profile if you have the correct one. For carrier filtering:
        this usually resolves itself within 24 hours. If it persists
        across multiple contacts, the sending number may need to be
        registered or the message content adjusted. For Twilio
        configuration issues: escalate to HQ.
      </p>

      <h2>Emails going to spam</h2>

      <h3>Root cause</h3>

      <p>
        Emails sent from Grow go through the Mailgun infrastructure.
        Email deliverability depends on several factors: the sending
        domain&apos;s reputation, DKIM/SPF/DMARC alignment, the email
        content, and the receiving email provider&apos;s spam filtering.
      </p>

      <p>
        The most common cause of Grow emails hitting spam is the
        email content itself. Emails with excessive links, large images,
        or promotional language trigger spam filters, especially at
        providers like Gmail and Outlook that use machine learning for
        spam classification.
      </p>

      <h3>How to diagnose</h3>

      <ol>
        <li>
          <strong>Check delivery status:</strong>{" "} in the
          contact&apos;s conversation, check if the email shows as
          &ldquo;Delivered&rdquo; or &ldquo;Bounced.&rdquo; If it says
          Delivered but the contact cannot find it, ask them to check
          their spam/junk folder.
        </li>
        <li>
          <strong>Check if it is one contact or many:</strong>{" "} if
          multiple contacts at different email providers report missing
          emails, the issue may be domain reputation. If it is only
          contacts at one provider (for example, all Gmail users), the
          issue is likely provider-specific filtering.
        </li>
      </ol>

      <h3>Resolution</h3>

      <p>
        For individual contacts: ask them to check spam/junk, mark the
        email as &ldquo;not spam,&rdquo; and add the sending address to
        their contacts. This trains their email provider to deliver
        future messages to the inbox.
      </p>

      <p>
        For widespread delivery issues: escalate to HQ. Domain
        reputation and authentication configuration (DKIM, SPF, DMARC)
        are managed at the platform level, not per location.
      </p>

      <Callout type="tip" title="Email vs SMS for time-sensitive messages">
        <p>
          If a contact is not receiving emails reliably, consider whether
          the message should be sent via SMS instead. SMS has
          significantly higher open rates and does not have spam filter
          issues. The{" "}
          <a href="/workflows/key-workflows/membership-journey">
            Membership Journey
          </a>
          {" "} workflows use a mix of both channels for this reason.
        </p>
      </Callout>

      <h2>Quick reference | Where to look</h2>

      <table>
        <thead>
          <tr>
            <th>Issue</th>
            <th>Where to check</th>
            <th>Escalate?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Repeated internal notifications</td>
            <td>Contact Audit Logs (check for repeated sync triggers)</td>
            <td>Yes, if no de-duplication condition exists</td>
          </tr>
          <tr>
            <td>DND contact received SMS</td>
            <td>Contact profile (DND status) + sending workflow (DND check step)</td>
            <td>Yes, workflow needs a DND condition</td>
          </tr>
          <tr>
            <td>SMS delivery failed</td>
            <td>Conversations tab (delivery status + error details)</td>
            <td>Only if Twilio config or widespread carrier filtering</td>
          </tr>
          <tr>
            <td>Email in spam</td>
            <td>Conversations tab (delivery status) + ask contact to check spam</td>
            <td>Only if widespread across multiple contacts/providers</td>
          </tr>
          <tr>
            <td>DND contact received email</td>
            <td>Contact DND status (check if DND is SMS-only)</td>
            <td>No, this is expected if DND is SMS-only</td>
          </tr>
        </tbody>
      </table>
    </PageLayout>
  )
}
