import { PageLayout } from "@/components/PageLayout"
import { Callout } from "@/components/Callout"
import { StepByStep } from "@/components/StepByStep"
import { LoomEmbed } from "@/components/LoomEmbed"

export default function ContactDuplicates() {
  return (
    <PageLayout
      title="Contact Duplicates & Merges"
      description="Why duplicate contacts happen, and how to consolidate a phone number onto the right contact because the Merge button is not available at the studio level."
      slug="/troubleshooting/contact-duplicates"
    >
      <Callout type="important" title="The Merge button is not available at studio level">
        <p>
          Grow does have a merge function, but it is locked at the studio
          level, so you cannot combine two records into one yourself. The
          workaround below moves the important identifier (usually a phone
          number) onto the right contact. If a duplicate is actively
          breaking something (wrong pipeline, an automation firing on the
          wrong record), email{" "}
          <a href="mailto:grow@strongpilates.co">grow@strongpilates.co</a>{" "}
          and the team can help.
        </p>
      </Callout>

      <p>
        Duplicate contacts are a reality in any CRM that receives data
        from multiple sources. In the STRONG system, contacts can be
        created from website forms, Facebook lead ads, Core account
        creation, and manual entry. When the same person enters through
        two different channels with different email addresses or phone
        numbers, Grow creates two separate contact records.
      </p>

      <h2>What it looks like</h2>

      <ul>
        <li>Two contact records for the same person in Grow, each with partial data.</li>
        <li>A member receiving duplicate SMS or email messages because both records are active in workflows.</li>
        <li>The same phone number showing up in Conversations under two different contact names.</li>
        <li>The named contact has the email and the Core sync, while the phone number sits on a separate record that often has no name at all.</li>
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

      <h2>How to consolidate a duplicate without merging</h2>

      <p>
        Since you cannot merge at the studio level, this is how you
        consolidate two contacts when one person has their email on a named
        contact and their phone number sitting on a separate record.
        You move the phone number onto the named contact, then make Core
        match so the sync does not undo your work.
      </p>

      <Callout type="important" title="Only do this when there is one contact in Core">
        <p>
          This workaround assumes the person has a single record in Core.
          You are reconciling Grow&apos;s split records to point at that
          one Core record. If there are two separate Core records, fix
          Core first, because the Core to Grow sync will keep recreating
          the split otherwise.
        </p>
      </Callout>

      <LoomEmbed
        url="https://www.loom.com/share/25514aa3d2464906be365c736ea2e9b3"
        title="Watch: how to consolidate a duplicate without merging"
      />

      <StepByStep
        steps={[
          {
            title: "Find both contacts",
            content: (
              <p>
                In Contacts, search the phone number that is sitting on the
                wrong record. You should see two contacts: the record that
                holds just the phone number (often with no name), and the
                named contact you want to keep (the one with the email and
                the Core sync).
              </p>
            ),
          },
          {
            title: "Give the phone number contact a first name",
            content: (
              <p>
                Open the contact that only has the phone number and add any
                first name, for example David. Save it. Grow will not let
                you remove a phone number from a contact that has no name,
                so this step has to happen before you can move the number.
              </p>
            ),
          },
          {
            title: "Remove the phone number from that contact",
            content: (
              <p>
                Still on that record, copy the phone number first so you
                have it, then delete it from the phone field and save. The
                save only goes through because the contact now has a first
                name.
              </p>
            ),
          },
          {
            title: "Confirm the number is gone",
            content: (
              <p>
                Go back to Contacts and check that the phone number has
                been removed from that record before you carry on.
              </p>
            ),
          },
          {
            title: "Add the phone number to the contact you are keeping",
            content: (
              <p>
                Open the named contact, the one with the email and the
                Core sync, paste the phone number into the phone field, and
                save.
              </p>
            ),
          },
          {
            title: "Match it in Core",
            content: (
              <p>
                Make sure the same person in Core has the exact same phone
                number. If Core does not have the phone number, add it in
                Core too. If Core and Grow do not match, the next time Core
                updates it will delete the phone number you just added.
              </p>
            ),
          },
        ]}
      />

      <Callout type="warning" title="The first name is what lets you save">
        <p>
          A contact with no first name cannot have its phone number
          removed. Grow blocks the save. If the delete will not stick, the
          missing first name is almost always why.
        </p>
      </Callout>

      <Callout type="warning" title="Core wins on the next sync">
        <p>
          The phone number only stays on the contact if Core has the same
          number. Core is the source of truth, so anything that does not
          match Core gets overwritten on the next sync. Always update Core
          as the final step, not Grow alone.
        </p>
      </Callout>

      <p>
        Remember that this does not truly merge the two records. The
        conversation history, notes, and activity on the old record do not
        come across. All you are doing is consolidating the phone number
        onto the correct contact so the person has one usable record going
        forward.
      </p>

      <h2>When not to do this</h2>

      <Callout type="important" title="Leave contacts with an active intro offer alone">
        <p>
          If either record has an active intro offer (check the Active
          Package Category and Intro Offer Pipeline Status fields), do not
          touch the phone number until the offer period is complete.
          Editing identifier fields can trigger field change events that
          cascade into false pipeline activations. See{" "}
          <a href="/troubleshooting/pipeline-inaccuracy">
            Pipeline Inaccuracy, Bug 3
          </a>
          {" "} for the full explanation.
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
