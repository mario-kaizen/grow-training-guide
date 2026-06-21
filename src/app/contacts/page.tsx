import { PageLayout } from "@/components/PageLayout"
import { Callout } from "@/components/Callout"
import { Screenshot } from "@/components/Screenshot"

export default function Contacts() {
  return (
    <PageLayout
      title="Contacts"
      description="Your entire database lives here. Every lead, member, and past member."
      slug="/contacts"
    >
      <p>
        The Contacts page is where your entire database lives. Every person who
        has ever interacted with your studio is stored here: active members,
        leads who enquired but never purchased, past members who cancelled, and
        even people who have unsubscribed from communications.
      </p>

      <Screenshot
        src="/screenshots/grow-contacts-page.png"
        alt="The Contacts page showing the Smart Lists tabs, contact list with columns, and the All list selected with 1131 contacts."
        caption="The Contacts page with smart list tabs across the top and the full contact list below."
      />

      <h2>The &ldquo;All&rdquo; list</h2>

      <p>
        When you first land on the Contacts page, you are looking at the{" "}
        <strong>All</strong> smart list. This is every single contact in your
        database with no filters applied.
      </p>

      <Callout type="warning" title="Do not use All for bulk messages">
        <p>
          A common mistake is selecting &ldquo;All&rdquo; when sending a bulk
          SMS or email. This includes people who have unsubscribed or are marked
          as Do Not Disturb, which creates friction and can lead to compliance
          issues. Always select the appropriate smart list for the audience you
          want to reach. Smart lists are covered in detail in the{" "}
          <a href="/smart-lists">Smart Lists</a>{" "} section.
        </p>
      </Callout>

      <h2>The contacts toolbox</h2>

      <p>
        At the top of the Contacts page you will see a row of action buttons.
        These are the bulk operations you can perform on your contacts. Most of
        them you will rarely use, but a few come up regularly.
      </p>

      <h3>Actions you will use</h3>

      <ul>
        <li>
          <strong>Add to Workflow:</strong>{" "} select contacts and enroll them
          into an automation. This is how you manually add people to a workflow
          that would not otherwise be triggered automatically.
        </li>
        <li>
          <strong>Bulk SMS / Bulk Email:</strong>{" "} send a one-off message to a
          group of contacts. Always make sure you have the right smart list
          selected before sending.
        </li>
      </ul>

      <h3>Actions you probably will not use</h3>

      <ul>
        <li>
          <strong>Add Contact:</strong>{" "} manually create a contact record.
          Most contacts are created automatically through the Core sync or form
          submissions.
        </li>
        <li>
          <strong>Add/Remove Tags:</strong>{" "} apply or remove tags in bulk.
          Tags are typically managed by workflows, not manually.
        </li>
        <li>
          <strong>Import / Export:</strong>{" "} upload contacts from a
          spreadsheet or download your database. Rarely needed since the Core
          sync handles contact creation.
        </li>
        <li>
          <strong>Delete:</strong>{" "} permanently remove contacts. Use with
          caution as this cannot be undone.
        </li>
        <li>
          <strong>Send Review Requests:</strong>{" "} trigger a review request to
          selected contacts.
        </li>
      </ul>

      <Screenshot
        src="/screenshots/grow-contact-record.png"
        alt="A contact record showing the Contact Details panel on the left with tags (account created, pipeline leads strong experience, lead), owner, contact fields (name, email, phone, date of birth, contact type), and the conversation timeline in the middle showing an opportunity created in 01. Leads as New Lead."
        caption="A contact record showing tags, contact fields, and the conversation timeline with pipeline activity."
      />

      <h2>Customizing columns</h2>

      <p>
        The default columns on the contacts list show basic information like
        name, email, and phone. But you can add additional columns to surface
        data that matters more to your daily operations.
      </p>

      <p>Useful columns to add:</p>

      <ul>
        <li>
          <strong>Active Package</strong>{" "} and{" "}
          <strong>Active Package Category:</strong>{" "} see at a glance what each
          contact is on
        </li>
        <li>
          <strong>Attendance Total:</strong>{" "} how many classes they have
          attended
        </li>
        <li>
          <strong>Days Absent:</strong>{" "} how long since their last visit
        </li>
        <li>
          <strong>Location Status:</strong>{" "} whether they are active,
          suspended, on an intro offer, or inactive
        </li>
      </ul>

      <Callout type="tip" title="Save your columns per smart list">
        <p>
          When you add columns to a smart list, make sure you save the smart
          list afterwards. This ensures those columns appear every time you
          visit that list, rather than reverting to the defaults.
        </p>
      </Callout>

      <h2>Other tabs on the Contacts page</h2>

      <h3>Bulk Actions</h3>

      <p>
        This tab shows a historical log of every bulk operation that has been
        performed on your contacts. If you sent a bulk SMS or added contacts to
        a workflow in bulk, the progress and results appear here. Useful for
        confirming that a bulk action completed successfully.
      </p>

      <h3>Tasks</h3>

      <p>
        Tasks in Grow live inside the Contacts page rather than having their own
        section in the main navigation menu. This is where you can create, edit,
        and manage tasks associated with specific contacts. Tasks are often
        created automatically by workflows as reminders to follow up with a lead
        or check in on a member.
      </p>

      <h3>Companies</h3>

      <p>
        The Companies tab is not used in the STRONG Pilates setup. You can
        ignore this section.
      </p>

      <h3>Manage Smart Lists</h3>

      <p>
        When you create a smart list, it is only visible to your account by
        default. If you want other users to see it (HQ, your performance
        manager, or another staff member), you need to go into{" "}
        <strong>Manage Smart Lists</strong>{" "} and share it with them. This is
        covered in detail in the{" "}
        <a href="/smart-lists">Smart Lists</a>{" "} section.
      </p>

      <h2>How contacts get created</h2>

      <p>
        Contacts enter your Grow database through three main paths:
      </p>

      <ul>
        <li>
          <strong>Core to Grow sync:</strong>{" "} when someone purchases a
          membership or package in Core, their contact record is automatically
          created (or updated) in Grow. This is the most common path for
          members.
        </li>
        <li>
          <strong>Form submissions:</strong>{" "} when a lead fills out a form on
          a landing page or through a Facebook lead ad, a contact record is
          created in Grow.
        </li>
        <li>
          <strong>Manual entry:</strong>{" "} you can manually create a contact
          using the Add Contact button, but this is rarely needed.
        </li>
      </ul>

      <Callout type="warning" title="Duplicate contacts">
        <p>
          If a lead fills out a form in Grow and later purchases in Core, the
          sync may create a second record if the email address does not match
          exactly. Email is the primary matching key between the two systems.
          When you spot duplicates, you cannot merge them yourself. Use the
          phone-number workaround in the{" "}
          <a href="/troubleshooting/contact-duplicates">Contact Duplicates</a>{" "}
          guide, and email{" "}
          <a href="mailto:grow@strongpilates.co">grow@strongpilates.co</a>{" "}
          if the duplicate is causing problems.
        </p>
      </Callout>
    </PageLayout>
  )
}
