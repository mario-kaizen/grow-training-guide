import { PageLayout } from "@/components/PageLayout"
import { Callout } from "@/components/Callout"
import { Screenshot } from "@/components/Screenshot"

export default function CoreToGrowIntegration() {
  return (
    <PageLayout
      title="Core to Grow Integration"
      description="How data flows between the two systems, what syncs, and what to watch for."
      slug="/core-to-grow-integration"
    >
      <p>
        Core and Grow are connected through an integration that syncs contact
        data between the two platforms. This is what allows a purchase in Core
        to trigger a workflow in Grow, or a member&rsquo;s attendance history to
        appear on their Grow contact record.
      </p>

      <h2>How the sync works</h2>

      <p>
        The integration is primarily{" "}
        <strong>one-directional: Core to Grow</strong>. When something changes
        in Core (a new purchase, an attendance record, a membership status
        change), that data gets pushed into the matching contact record in Grow.
      </p>

      <p>
        Grow does not push data back to Core in most cases. If you update a
        phone number in Grow, it will <em>not</em>{" "} automatically update in
        Core. The contact needs to be updated in both places, or the next Core
        sync will overwrite the Grow value.
      </p>

      <Callout type="important" title="Direction matters">
        <p>
          Core is the source of truth for member data. If there&rsquo;s a
          conflict between what Core says and what Grow says, Core wins on the
          next sync.
        </p>
      </Callout>

      <h2>What syncs</h2>

      <p>
        The integration maps over 50 fields from Core into Grow. The table below
        shows each field, its name in Grow, and what it represents. Fields
        marked <strong>N/A</strong>{" "} map to standard built-in Grow contact
        fields. Everything else is a custom field created by the sync service.
      </p>

      <Screenshot
        src="/screenshots/grow-contact-custom-fields.png"
        alt="A contact record in Grow showing custom fields populated by the Core sync: First Attendance Date, First Booking Date, Late Cancel Accrual, Intro Offer (pending), Days Absent (120), Corporate Attendance (117), Anniversary (1), Active Package (STRONG Foundation VIP UNLIMITED), Past Active Packages, Days Inactive (90), Corporate Status (activePackage), Attendance Total (117), and Active Package Category (Memberships)."
        caption="A contact record showing custom fields populated by the Core to Grow sync."
      />

      <h3>Contact basics</h3>
      <table>
        <thead>
          <tr><th>Field</th><th>Grow field name</th><th>Notes</th></tr>
        </thead>
        <tbody>
          <tr><td>First Name</td><td>N/A (standard)</td><td></td></tr>
          <tr><td>Last Name</td><td>N/A (standard)</td><td></td></tr>
          <tr><td>Email</td><td>N/A (standard)</td><td>Unique per location</td></tr>
          <tr><td>Phone</td><td>N/A (standard)</td><td>Only syncs validated numbers. Unique per location.</td></tr>
          <tr><td>Date of Birth</td><td>N/A (standard)</td><td></td></tr>
          <tr><td>Street Address</td><td>N/A (standard)</td><td>May hold the full address depending on location</td></tr>
          <tr><td>City / State / Country / Postal Code</td><td>N/A (standard)</td><td></td></tr>
          <tr><td>Contact Type</td><td>N/A (standard)</td><td>Always syncs as &ldquo;customer&rdquo; (overrides &ldquo;lead&rdquo; if set)</td></tr>
        </tbody>
      </table>

      <h3>DND preferences</h3>
      <table>
        <thead>
          <tr><th>Field</th><th>Grow field name</th><th>Notes</th></tr>
        </thead>
        <tbody>
          <tr><td>DND Text Messages</td><td>N/A (standard)</td><td>Respects permanent DND settings in Grow</td></tr>
          <tr><td>DND Emails</td><td>N/A (standard)</td><td>Respects permanent DND settings in Grow</td></tr>
          <tr><td>DND All Channels</td><td>N/A (standard)</td><td>Set when both SMS and Email DND are marked</td></tr>
          <tr><td>Email Opt In</td><td>contact.email_opt_in</td><td>Values: Opt In, Opt Out</td></tr>
          <tr><td>SMS Opt In</td><td>contact.sms_opt_in</td><td>Values: Opt In, Opt Out</td></tr>
        </tbody>
      </table>

      <h3>Status and categorization</h3>
      <table>
        <thead>
          <tr><th>Field</th><th>Grow field name</th><th>Notes</th></tr>
        </thead>
        <tbody>
          <tr><td>Core Status</td><td>contact.core_status</td><td>Values: Client, Alumni, Removed</td></tr>
          <tr><td>Location Status</td><td>contact.location_status</td><td>Values: introOffer, suspendedMembership, activePackage, inactive, accountCreated</td></tr>
          <tr><td>Corporate Status</td><td>contact.corporate_status</td><td>Same values as Location Status. Updated by HQ Flow (may be delayed).</td></tr>
          <tr><td>Core Source</td><td>contact.core_source</td><td>How the contact originally found the brand</td></tr>
        </tbody>
      </table>

      <h3>Packages and membership</h3>
      <table>
        <thead>
          <tr><th>Field</th><th>Grow field name</th><th>Notes</th></tr>
        </thead>
        <tbody>
          <tr><td>Active Package</td><td>contact.active_package</td><td>Currently active package(s) for the location</td></tr>
          <tr><td>Active Package Category</td><td>contact.active_package_category</td><td>Category of the active package(s)</td></tr>
          <tr><td>Past Active Packages</td><td>contact.past_active_packages</td><td>Every previously held package that is no longer active</td></tr>
          <tr><td>Intro Offer</td><td>contact.intro_offer</td><td>Values: claimed, pending. Once claimed, never reverts.</td></tr>
          <tr><td>Join Date</td><td>contact.join_date</td><td>Date the contact joined the location</td></tr>
          <tr><td>Anniversary</td><td>contact.anniversary</td><td>Complete years since Join Date</td></tr>
          <tr><td>Promo Codes Used</td><td>contact.promo_codes_used</td><td>Every coupon code ever used at the location</td></tr>
          <tr><td>Home Location</td><td>contact.home_location</td><td>Location(s) where the contact has active packages. Can be multiple.</td></tr>
        </tbody>
      </table>

      <h3>Attendance and engagement</h3>
      <table>
        <thead>
          <tr><th>Field</th><th>Grow field name</th><th>Notes</th></tr>
        </thead>
        <tbody>
          <tr><td>First Attendance Date</td><td>contact.first_attendance_date</td><td>First visit to the location</td></tr>
          <tr><td>Attendance Total</td><td>contact.attendance_total</td><td>Total check-ins at the location</td></tr>
          <tr><td>Corporate Attendance</td><td>contact.corporate_attendance</td><td>Check-ins across all locations. Updated by HQ Flow.</td></tr>
          <tr><td>Days Absent</td><td>contact.days_absent</td><td>Days since last session. 0 if future booking exists.</td></tr>
          <tr><td>Days Inactive</td><td>contact.days_inactive</td><td>Days since last credit use, or purchase, or Join Date. 0 if future booking.</td></tr>
          <tr><td>Referrals</td><td>contact.referrals</td><td>Times referred by other clients at the same location</td></tr>
        </tbody>
      </table>

      <h3>Booking and first session</h3>
      <table>
        <thead>
          <tr><th>Field</th><th>Grow field name</th><th>Notes</th></tr>
        </thead>
        <tbody>
          <tr><td>First Booking</td><td>contact.first_booking</td><td>Values: booked, pending. Once booked, never reverts.</td></tr>
          <tr><td>First Booking Date</td><td>contact.first_booking_date</td><td>Date of first booking (regardless of whether it was attended or cancelled)</td></tr>
          <tr><td>First Booking Status</td><td>contact.first_booking_status</td><td>Values: pending, booked, rebooked, attended, late cancel no show, cancelled</td></tr>
          <tr><td>Late Cancel Accrual</td><td>contact.late_cancel</td><td>Late cancels since last attendance. Resets to 0 if future booking exists.</td></tr>
          <tr><td>No Show Accrual</td><td>contact.no_show</td><td>No shows since last attendance</td></tr>
          <tr><td>Late Cancel + No Show</td><td>contact.late_cancel_no_show</td><td>Sum of the two fields above</td></tr>
        </tbody>
      </table>

      <h3>Tags managed by the sync</h3>
      <p>
        The sync service also manages specific tags on contacts. Tags not
        managed by the sync service are left untouched.
      </p>
      <ul>
        <li><code>classpass</code></li>
        <li><code>account created</code></li>
        <li><code>migrated</code></li>
      </ul>

      <Callout type="warning" title="Manual edits get overwritten">
        <p>
          Any information manually entered in Grow on the fields listed above
          will be overwritten by the sync on the next cycle. The only exception
          is tags that are not managed by the sync service.
        </p>
      </Callout>

      <h2>Sync timing</h2>

      <p>
        The sync is <strong>not instant</strong>. There can be a delay between
        when something happens in Core and when it appears in Grow. This delay
        varies, but it&rsquo;s usually within a few hours. During high-traffic
        periods (campaign launches, new studio openings), syncs can take longer.
      </p>

      <Callout type="warning" title="Sync delays cause confusion">
        <p>
          If a studio reports that a new member isn&rsquo;t showing in the right
          pipeline, the first question is always: has the sync caught up yet?
          Check the contact&rsquo;s custom field values in Grow. If key fields
          (like intro offer purchase date) are empty, the sync hasn&rsquo;t run
          yet.
        </p>
      </Callout>

      <h2>Custom values in Grow</h2>

      <p>
        Many of the synced fields appear in Grow as{" "}
        <strong>custom values</strong>. These are dynamic placeholders that pull
        live data from the contact record. When a workflow sends an SMS that
        says &ldquo;Hey {`{{contact.first_name}}`}&rdquo;, it&rsquo;s using a
        custom value that was populated by the Core sync.
      </p>

      <p>
        We&rsquo;ll cover the difference between custom fields and custom values
        in detail in the{" "}
        <a href="/custom-fields-vs-values">Custom Fields vs Custom Values</a>{" "}
        section.
      </p>

      <h2>Common sync issues</h2>

      <ul>
        <li>
          <strong>Phone numbers not syncing.</strong>{" "} Core validates
          phone formats differently. If the phone number doesn&rsquo;t pass
          validation, it won&rsquo;t sync.
        </li>
        <li>
          <strong>Missing intro offer dates.</strong>{" "} The sync only
          writes the <code>intro_offer_purchase_date</code>{" "} field. Other
          related fields (like first attendance date) may need manual checking.
        </li>
        <li>
          <strong>Stale membership status.</strong>{" "} If a member cancels
          or suspends in Core, there can be a window where Grow still shows them
          as active.
        </li>
        <li>
          <strong>Duplicate contacts.</strong>{" "} If a contact exists in
          Grow before the Core sync creates them, you can end up with
          duplicates. The email address is the primary matching key.
        </li>
      </ul>
    </PageLayout>
  )
}
