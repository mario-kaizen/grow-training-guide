import { PageLayout } from "@/components/PageLayout"
import { Callout } from "@/components/Callout"
import { Screenshot } from "@/components/Screenshot"

export default function CustomFieldsVsValues() {
  return (
    <PageLayout
      title="Custom Fields vs Custom Values"
      description="They sound similar but work completely differently. Here's the breakdown."
      slug="/custom-fields-vs-values"
    >
      <p>
        These two terms come up constantly in Grow, and almost everyone confuses
        them at first. They both use the same{" "}
        <code>{`{{curly bracket}}`}</code>{" "} syntax when inserted into
        messages, which makes them look identical. But they pull data from
        completely different places and serve completely different purposes.
      </p>

      <p>
        Understanding the difference is essential before you touch contacts,
        workflows, or any kind of communication template.
      </p>

      <h2>Custom Fields</h2>

      <p>
        A custom field is a <strong>piece of data stored on a specific
        contact</strong>. Every contact in Grow has their own set of field
        values, and those values are unique to that person. Think of custom
        fields as columns in a spreadsheet where each row is a different
        contact.
      </p>

      <p>
        Some fields are standard and built into every Grow account (first name,
        last name, email, phone number). Others are{" "}
        <strong>custom fields</strong>{" "} that were created either manually or
        by the Core to Grow integration.
      </p>

      <Screenshot
        src="/screenshots/grow-custom-fields-list.png"
        alt="Settings > Custom Fields showing the Core to Grow Sync folder with fields like First Booking Date (DATE), First Booking Status (SINGLE_OPTIONS), Intro Offer (CHECKBOX), Active Package (TEXT), Active Package Category (TEXT), Past Active Packages (TEXT), Attendance Total (NUMERICAL), and Late Cancel Accrual (NUMERICAL). Each field shows its unique key in curly bracket syntax."
        caption="The Custom Fields list inside the Core to Grow Sync folder, showing field names, types, and their unique keys."
      />

      <h3>Examples of custom fields</h3>

      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>What it stores</th>
            <th>Example value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>contact.first_name</code></td>
            <td>The contact&rsquo;s first name</td>
            <td>Sarah</td>
          </tr>
          <tr>
            <td><code>contact.active_package</code></td>
            <td>Their current membership or package</td>
            <td>Unlimited Monthly</td>
          </tr>
          <tr>
            <td><code>contact.days_absent</code></td>
            <td>Days since their last class</td>
            <td>12</td>
          </tr>
          <tr>
            <td><code>contact.intro_offer</code></td>
            <td>Whether they have claimed an intro offer</td>
            <td>claimed</td>
          </tr>
          <tr>
            <td><code>contact.location_status</code></td>
            <td>Their current status at the location</td>
            <td>activePackage</td>
          </tr>
          <tr>
            <td><code>contact.first_booking_status</code></td>
            <td>Status of their very first booking</td>
            <td>attended</td>
          </tr>
        </tbody>
      </table>

      <p>
        The key thing: these values are <strong>different for every
        contact</strong>. Sarah&rsquo;s <code>days_absent</code>{" "} might be
        12, while James&rsquo;s might be 0 because he has a class booked
        tomorrow.
      </p>

      <h3>Where custom fields come from</h3>

      <p>
        Most of the custom fields you see in Grow were created automatically by
        the <strong>Core to Grow integration</strong>. When the sync runs, it
        pushes data from Core (membership status, attendance, packages) into
        custom fields on each contact record in Grow. The full list of synced
        fields is documented in the{" "}
        <a href="/core-to-grow-integration">Core to Grow Integration</a>
        {" "} section.
      </p>

      <p>
        You can also create your own custom fields in{" "}
        <strong>Settings &gt; Custom Fields</strong>{" "} for any additional data
        you want to track on contacts that the sync does not cover.
      </p>

      <h3>Where custom fields are used</h3>

      <ul>
        <li>
          <strong>Workflow conditions:</strong>{" "} &ldquo;If{" "}
          <code>contact.intro_offer</code>{" "} equals{" "}
          <code>claimed</code>, then send this message&rdquo;
        </li>
        <li>
          <strong>Smart List filters:</strong>{" "} &ldquo;Show me all contacts
          where <code>contact.location_status</code>{" "} equals{" "}
          <code>activePackage</code>&rdquo;
        </li>
        <li>
          <strong>Pipeline automations:</strong>{" "} &ldquo;Move to the next
          stage when <code>contact.first_booking_status</code>{" "} changes
          to <code>attended</code>&rdquo;
        </li>
        <li>
          <strong>Personalized messages:</strong>{" "} &ldquo;Hey{" "}
          <code>{`{{contact.first_name}}`}</code>, you have not visited in{" "}
          <code>{`{{contact.days_absent}}`}</code>{" "} days&rdquo;
        </li>
      </ul>

      <h2>Custom Values</h2>

      <p>
        A custom value is a <strong>piece of data stored at the location
        level</strong>. It is not tied to any individual contact. It is the same
        for every single person at that location. Think of custom values as
        global variables for the studio account.
      </p>

      <p>
        Custom values are set once in{" "}
        <strong>Settings &gt; Custom Values</strong>{" "} and then referenced
        throughout SMS templates, email templates, landing pages, and
        workflows.
      </p>

      <Screenshot
        src="/screenshots/grow-custom-values-list.png"
        alt="Settings > Custom Values showing 71 values with columns for Name, Folder, Key, and Value. Visible entries include Calendar Link, Cancellation Form, Facebook, FromName_Lead, FromName_Member, Grow Location ID, Google Review URL, Instagram, LinkedIn, Location Short, and others. Several values show PLEASE ADD placeholders while others like LinkedIn and PS Drip Delay are filled in."
        caption="The Custom Values list in the template account. Values marked PLEASE ADD need to be filled in by each location."
      />

      <h3>Examples of custom values</h3>

      <table>
        <thead>
          <tr>
            <th>Value</th>
            <th>What it stores</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Website URL</td>
            <td>The studio&rsquo;s website address</td>
            <td>https://strongpilates.com/melbourne-cbd</td>
          </tr>
          <tr>
            <td>App URL</td>
            <td>Link to download the booking app</td>
            <td>https://app.strongpilates.com</td>
          </tr>
          <tr>
            <td>Studio Phone</td>
            <td>The studio&rsquo;s main phone number</td>
            <td>+61 3 9000 1234</td>
          </tr>
          <tr>
            <td>Studio Address</td>
            <td>Physical address for directions</td>
            <td>123 Collins Street, Melbourne VIC 3000</td>
          </tr>
          <tr>
            <td>Intro Offer Price</td>
            <td>Current intro offer pricing</td>
            <td>$49 for 2 weeks</td>
          </tr>
        </tbody>
      </table>

      <p>
        The key thing: these values are <strong>the same for every contact at
        that location</strong>. When an SMS says &ldquo;Book at{" "}
        <code>{`{{custom_values.website_url}}`}</code>&rdquo;, every person who
        receives that message gets the same URL.
      </p>

      <h3>Why custom values matter</h3>

      <p>
        Because STRONG Pilates uses a{" "}
        <strong>template account</strong>{" "} to push workflows and
        communications out to 142+ locations, the actual studio details cannot
        be hardcoded into message templates. Instead, templates use custom value
        placeholders. When a message goes out, Grow replaces the placeholder
        with whatever value that specific location has set.
      </p>

      <p>
        This means one SMS template can say:
      </p>

      <blockquote>
        <p>
          Hey {`{{contact.first_name}}`}, thanks for signing up! Download the
          app at {`{{custom_values.app_url}}`} and book your first class at{" "}
          {`{{custom_values.website_url}}`}.
        </p>
      </blockquote>

      <p>
        And it works for every location, as long as each location has filled in
        their custom values.
      </p>

      <Callout type="warning" title="Empty custom values break messages">
        <p>
          If a custom value is left blank, the placeholder gets replaced with
          nothing. Your message will read &ldquo;Download the app at&rdquo; with
          an empty space where the link should be. This is one of the most common
          issues with communications and it is entirely preventable. Check your
          custom values in{" "}
          <strong>Settings &gt; Custom Values</strong>{" "} and make sure every
          field relevant to your location is filled in.
        </p>
      </Callout>

      <h2>Side by side</h2>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>Custom Fields</th>
            <th>Custom Values</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Stored on</strong></td>
            <td>Individual contact records</td>
            <td>The location account</td>
          </tr>
          <tr>
            <td><strong>Unique per</strong></td>
            <td>Contact</td>
            <td>Location</td>
          </tr>
          <tr>
            <td><strong>Set by</strong></td>
            <td>Core sync, workflows, or manual entry</td>
            <td>Studio manager in Settings</td>
          </tr>
          <tr>
            <td><strong>Example</strong></td>
            <td><code>{`{{contact.days_absent}}`}</code></td>
            <td><code>{`{{custom_values.website_url}}`}</code></td>
          </tr>
          <tr>
            <td><strong>Changes between contacts?</strong></td>
            <td>Yes, every contact has their own value</td>
            <td>No, same for everyone at that location</td>
          </tr>
          <tr>
            <td><strong>Found in</strong></td>
            <td>Settings &gt; Custom Fields</td>
            <td>Settings &gt; Custom Values</td>
          </tr>
        </tbody>
      </table>

      <h2>How they look in a message</h2>

      <p>
        Here is what a typical SMS template looks like with both custom fields
        and custom values in use:
      </p>

      <blockquote>
        <p>
          Hey {`{{contact.first_name}}`}, we noticed it has been{" "}
          {`{{contact.days_absent}}`} days since your last class at STRONG
          Pilates. We miss you! Book your next session at{" "}
          {`{{custom_values.website_url}}`} or call us at{" "}
          {`{{custom_values.studio_phone}}`}.
        </p>
      </blockquote>

      <p>
        When this sends to a contact named Sarah who has not visited in 14 days
        at the Melbourne CBD location, it becomes:
      </p>

      <blockquote>
        <p>
          Hey Sarah, we noticed it has been 14 days since your last class at
          STRONG Pilates. We miss you! Book your next session at
          https://strongpilates.com/melbourne-cbd or call us at +61 3 9000
          1234.
        </p>
      </blockquote>

      <p>
        The <code>{`{{contact.}}`}</code>{" "} placeholders pulled from
        Sarah&rsquo;s individual record. The{" "}
        <code>{`{{custom_values.}}`}</code>{" "} placeholders pulled from the
        Melbourne CBD location settings. Same template, personalized output.
      </p>

      <Callout type="tip" title="Quick rule of thumb">
        <p>
          If the data changes from person to person, it is a{" "}
          <strong>custom field</strong>. If the data is the same for everyone at
          a location, it is a <strong>custom value</strong>.
        </p>
      </Callout>

      <h2>What we set up vs what you need to fill in</h2>

      <p>
        When a new location is set up or a campaign snapshot is deployed, Kaizen
        fills in the majority of custom values for you. However, there are two
        that <strong>only the studio can fill in</strong> because they require
        information we do not have.
      </p>

      <h3>What Kaizen handles</h3>

      <p>
        These are configured by Kaizen during setup or deployment. You do not
        need to touch them.
      </p>

      <table>
        <thead>
          <tr>
            <th>Custom Value</th>
            <th>What it does</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Website</td>
            <td>Your studio&rsquo;s website URL, used in SMS and email links</td>
          </tr>
          <tr>
            <td>Location Short</td>
            <td>Short name for your studio (e.g. &ldquo;Melbourne CBD&rdquo;), used across 36+ SMS templates</td>
          </tr>
          <tr>
            <td>Purchase Link</td>
            <td>Link for members to purchase packages</td>
          </tr>
          <tr>
            <td>Calendar Link</td>
            <td>Booking calendar link for consultations</td>
          </tr>
          <tr>
            <td>Cancellation Form</td>
            <td>Link to the cancellation request form</td>
          </tr>
          <tr>
            <td>Google Review URL</td>
            <td>Direct link for members to leave a Google review</td>
          </tr>
          <tr>
            <td>Facebook / Instagram URLs</td>
            <td>Social media profile links</td>
          </tr>
          <tr>
            <td>Twilio Number</td>
            <td>The phone number used for SMS communications</td>
          </tr>
          <tr>
            <td>Intro Offer Price / Purchase Links</td>
            <td>Pricing and deep links for the current intro offer</td>
          </tr>
          <tr>
            <td>Grow Location ID</td>
            <td>Internal system identifier</td>
          </tr>
        </tbody>
      </table>

      <h3>What the studio needs to fill in</h3>

      <Callout type="important" title="These two are on you">
        <p>
          Kaizen cannot fill these in because they depend on who is managing
          leads and member communications at your studio. Only you know the right
          name to put here.
        </p>
      </Callout>

      <table>
        <thead>
          <tr>
            <th>Custom Value</th>
            <th>What it does</th>
            <th>Where to find it</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>FromName_Lead</strong></td>
            <td>The name that appears in SMS messages sent to new leads</td>
            <td>Settings &gt; Custom Values</td>
          </tr>
          <tr>
            <td><strong>FromName_Member</strong></td>
            <td>The name that appears in SMS messages sent to current members</td>
            <td>Settings &gt; Custom Values</td>
          </tr>
        </tbody>
      </table>

      <h3>Why FromName matters</h3>

      <p>
        These two values appear in some of the most important SMS messages your
        studio sends. <strong>FromName_Lead</strong>{" "} is used in 11 templates
        including the first message a lead receives after enquiring, call booking
        confirmations, and no show follow ups.{" "}
        <strong>FromName_Member</strong>{" "} is used in 4 templates including the
        message a new member receives right after completing their first class.
      </p>

      <p>
        If these are left at the default placeholder, here is what your members
        actually receive after their very first visit:
      </p>

      <blockquote>
        <p>
          Hi Sarah, <strong>(PLEASE ADD) Lead Manager/Staff Name</strong>{" "}
          here from STRONG. Well done on completing your first STRONG Pilates
          class today. How did you go?
        </p>
      </blockquote>

      <p>
        That is the actual message that goes out if the value is never updated.
        Compare that to what it should look like:
      </p>

      <blockquote>
        <p>
          Hi Sarah, <strong>Jess</strong>{" "} here from STRONG. Well done on
          completing your first STRONG Pilates class today. How did you go?
        </p>
      </blockquote>

      <p>
        The difference is significant. The first version immediately tells the
        member that the message is automated and no one is actually paying
        attention. The second feels personal and opens the door for a real
        conversation.
      </p>

      <Callout type="tip" title="What to put in these fields">
        <p>
          Use the first name of the person at your studio who manages leads
          and member communications. If that is one person, use the same name
          for both. If your studio has a dedicated sales lead and a separate
          member experience manager, use each name in the appropriate field.
        </p>
      </Callout>

      <h2>Common mistakes</h2>

      <ul>
        <li>
          <strong>Editing synced custom fields manually.</strong>{" "} Fields
          populated by the Core integration (like{" "}
          <code>contact.active_package</code>{" "} or{" "}
          <code>contact.location_status</code>) will be overwritten on the
          next sync cycle. If you need to correct something, fix it in Core and
          let the sync update Grow.
        </li>
        <li>
          <strong>Leaving custom values empty after a snapshot.</strong>{" "} When
          a new campaign or workflow gets deployed to your location, it may
          reference custom values that you have not filled in yet. Always check
          Settings &gt; Custom Values after receiving a snapshot.
        </li>
        <li>
          <strong>Confusing the two in workflow conditions.</strong>{" "} A
          workflow condition that checks &ldquo;if website URL is not
          empty&rdquo; needs to reference the right source. Checking a custom
          value when you meant a custom field (or the other way around) will
          produce unexpected results.
        </li>
      </ul>
    </PageLayout>
  )
}
