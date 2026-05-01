import { PageLayout } from "@/components/PageLayout"
import { Callout } from "@/components/Callout"

export default function ContactDuplicates() {
  return (
    <PageLayout
      title="Contact Duplicates & Merges"
      description="Duplicate records, merge side effects, and data collisions."
      slug="/troubleshooting/contact-duplicates"
    >
      <p>
        Duplicate contacts are a reality in any CRM that receives data
        from multiple sources. In the STRONG system, contacts can be
        created from website forms, Facebook lead ads, Core account
        creation, and manual entry. When the same person enters through
        two different channels with different email addresses or phone
        numbers, Grow creates two separate contact records.
      </p>

      <p>
        The duplicates themselves are not the main problem. The bigger
        issue is what happens when you try to fix them by merging.
        Contact merges trigger field change events that can cascade
        through workflows and create false activations, especially in
        the intro offer pipeline.
      </p>

      <h2>What it looks like</h2>

      <ul>
        <li>Two contact records for the same person in Grow, each with partial data.</li>
        <li>A member receiving duplicate SMS or email messages because both records are active in workflows.</li>
        <li>After merging two contacts, the surviving record starts receiving unexpected workflow messages.</li>
        <li>A pipeline card appears for someone who has not purchased or booked anything recently.</li>
        <li>The same phone number showing up in Conversations under two different contact names.</li>
      </ul>

      <h2>How duplicates are created</h2>

      <h3>Different entry points, different identifiers</h3>

      <p>
        The most common scenario: someone fills out a Facebook lead form
        using their personal email, then later creates a Core account at
        the studio using a different email (or no email at all, just a
        phone number). Grow treats each as a new contact because the
        matching identifier (email or phone) does not overlap.
      </p>

      <h3>Apple Private Relay emails</h3>

      <p>
        Members who sign up via Apple services sometimes have an
        Apple Private Relay email (ending in
        @privaterelay.appleid.com) on one record and their real email on
        another. Core stores whichever email was used at account
        creation, and the Facebook lead form captures whichever email
        Facebook has. When these do not match, a duplicate is created.
      </p>

      <h3>Manual entry without checking</h3>

      <p>
        Studio staff sometimes create a new contact in Grow manually
        instead of searching for the existing record. This is most
        common when a walk-in asks about an offer and the staff member
        creates a quick contact instead of looking up whether they are
        already in the system from a prior ad response or website
        enquiry.
      </p>

      <h2>When to merge and when not to</h2>

      <Callout type="important" title="Do not merge contacts with active intro offers">
        <p>
          If either contact record has an active intro offer (check the
          Active Package Category and Intro Offer Pipeline Status
          fields), do not merge until the offer period is complete. The
          merge will trigger field change events that can cascade into
          false pipeline activations. See{" "}
          <a href="/troubleshooting/pipeline-inaccuracy">
            Pipeline Inaccuracy, Bug 3
          </a>
          {" "} for the full explanation.
        </p>
      </Callout>

      <h3>Safe to merge</h3>

      <ul>
        <li>Both records are inactive (no active package, no active workflows).</li>
        <li>One record is a lead that never purchased, and the other is the Core-synced record with all the real data.</li>
        <li>The member has fully completed their intro offer (status is Won, Expired, or Abandoned).</li>
      </ul>

      <h3>Not safe to merge</h3>

      <ul>
        <li>Either record has an active intro offer in progress.</li>
        <li>Either record is currently enrolled in a workflow with active wait steps.</li>
        <li>Both records have different pipeline opportunities in the same pipeline (the merge can create conflicts).</li>
      </ul>

      <h2>How to merge safely</h2>

      <ol>
        <li>
          <strong>Identify the primary record:</strong>{" "} the one with
          the Core sync data (it will have Integration entries in the
          activity timeline). This should be the surviving record.
        </li>
        <li>
          <strong>Check for active workflows:</strong>{" "} on both records,
          scroll the activity timeline and look for recent workflow
          entries. If either contact is mid-workflow (especially in a
          wait step), note which workflows are active.
        </li>
        <li>
          <strong>Remove from active workflows first:</strong>{" "} if
          the secondary record (the one being merged away) is enrolled in
          any workflows, remove them from those workflows before merging.
          This prevents the merge from inheriting mid-stream workflow
          state.
        </li>
        <li>
          <strong>Merge via Bulk Actions:</strong>{" "} select the
          secondary record, use Bulk Actions to merge into the primary
          record. The primary record survives with all data from both.
        </li>
        <li>
          <strong>Check the result:</strong>{" "} after merging, open the
          surviving record and verify that the correct data was retained.
          Check the activity timeline for any unexpected workflow
          triggers that fired as a result of the merge.
        </li>
      </ol>

      <h2>What happens during a merge</h2>

      <p>
        When two contacts are merged in Grow, the platform combines the
        data from both records into the surviving contact. Several
        things happen behind the scenes:
      </p>

      <ul>
        <li>
          <strong>Custom fields:</strong>{" "} the surviving contact gets
          values from both records. If both records had a value for the
          same field, the primary record&apos;s value wins. The field
          &ldquo;change&rdquo; from inheriting the secondary
          record&apos;s data triggers field-change workflow events.
        </li>
        <li>
          <strong>Tags:</strong>{" "} all tags from both records are
          combined onto the surviving contact.
        </li>
        <li>
          <strong>Opportunities:</strong>{" "} pipeline cards from the
          secondary record are transferred to the surviving contact.
        </li>
        <li>
          <strong>Conversations:</strong>{" "} message history from both
          records is combined into one conversation thread.
        </li>
        <li>
          <strong>Audit logs:</strong>{" "} the merge itself is logged as
          &ldquo;Updated (Contact Merge)&rdquo; with source
          &ldquo;BULK_ACTION&rdquo; in the surviving contact&apos;s
          audit log.
        </li>
      </ul>

      <Callout type="tip" title="Audit logs do not record who merged">
        <p>
          Grow&apos;s audit logs do not record which user initiated a
          contact merge. If you need to track who performed a merge, you
          will need to ask the team directly. The audit log only shows
          that a BULK_ACTION merge occurred and the timestamp.
        </p>
      </Callout>

      <h2>Preventing duplicates</h2>

      <p>
        Complete prevention is not possible because contacts arrive from
        multiple systems with potentially different identifiers. But you
        can reduce the volume:
      </p>

      <ul>
        <li>
          <strong>Search before creating:</strong>{" "} always search by
          phone number AND email before creating a new contact manually.
          Some contacts will only match on phone (if they used a
          different email) or only on email (if the phone format
          differs).
        </li>
        <li>
          <strong>Use consistent identifiers on forms:</strong>{" "} where
          possible, ensure that lead forms capture both email and phone.
          The more identifiers Grow has, the better it can match incoming
          data to existing records.
        </li>
        <li>
          <strong>Periodic dedup review:</strong>{" "} Grow does not have
          an automatic deduplication feature. Periodic manual review of
          contacts with matching names or phone numbers helps catch
          duplicates before they cause workflow conflicts.
        </li>
      </ul>
    </PageLayout>
  )
}
