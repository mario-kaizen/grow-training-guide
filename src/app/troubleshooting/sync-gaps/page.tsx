import { PageLayout } from "@/components/PageLayout"
import { Callout } from "@/components/Callout"

export default function SyncGaps() {
  return (
    <PageLayout
      title="Core to Grow Sync Gaps"
      description="Fields not syncing, workflows not triggering, and data stuck on old values."
      slug="/troubleshooting/sync-gaps"
    >
      <p>
        The Core to Grow integration syncs contact data multiple times
        per day. When it works, custom fields like Active Package,
        Attendance Total, and Location Status stay current in Grow, and
        workflows trigger based on those field changes. When it does
        not work, contacts get stuck: membership purchases do not trigger
        welcome sequences, attendance does not update visit counters, and
        pipeline cards stop moving.
      </p>

      <p>
        Sync gaps account for roughly 20% of troubleshooting tickets.
        The tricky part is that the sync can fail partially: some fields
        update while others do not, or some contacts sync while others
        at the same location are missed.
      </p>

      <h2>What it looks like</h2>

      <ul>
        <li>A contact purchased a membership in Core but Grow still shows their Active Package as the old intro offer.</li>
        <li>A contact attended a class but their Attendance Total in Grow has not changed.</li>
        <li>A contact&apos;s Location Status in Grow says &ldquo;Active&rdquo; but they cancelled in Core days ago.</li>
        <li>A workflow that should have triggered on &ldquo;Active Package changed&rdquo; never fired.</li>
        <li>The contact&apos;s timeline shows no Integration sync entries for the past 24+ hours.</li>
        <li>Custom fields are updating for some contacts at a location but not others.</li>
      </ul>

      <h2>How the sync works</h2>

      <p>
        Understanding the sync mechanism helps explain why it breaks.
        The{" "}
        <a href="/core-to-grow-integration">Core to Grow Integration</a>
        {" "} page covers this in full, but the key points for
        troubleshooting:
      </p>

      <ul>
        <li>
          <strong>Sync direction:</strong>{" "} Core pushes data to Grow.
          Grow never writes back to Core. This means if you manually
          edit a synced field in Grow, the next sync will overwrite your
          edit with whatever Core has.
        </li>
        <li>
          <strong>Sync frequency:</strong>{" "} multiple times per day, not
          real-time. There is a natural delay between something happening
          in Core and it appearing in Grow.
        </li>
        <li>
          <strong>Sync scope:</strong>{" "} each sync pushes ALL mapped custom
          fields for the contact, not just the ones that changed. This is
          why sync bounces can inflate visit counters (see{" "}
          <a href="/troubleshooting/pipeline-inaccuracy">
            Pipeline Inaccuracy
          </a>
          ).
        </li>
        <li>
          <strong>Trigger mechanism:</strong>{" "} workflows respond to
          field <em>changes</em> detected during a sync. If a field value
          is the same as the last sync, no workflow triggers.
        </li>
      </ul>

      <h2>Common sync gap scenarios</h2>

      <h3>Active Package not updating after purchase</h3>

      <p>
        The most impactful sync gap. A contact buys a membership or
        intro offer in Core, but Grow&apos;s Active Package field does
        not update. Without the Active Package change, workflows like
        the{" "}
        <a href="/workflows/key-workflows/new-intro-offers">
          Intro Offer Status Update
        </a>
        {" "} never fire, and the contact does not enter the pipeline or
        receive their welcome sequence.
      </p>

      <h4>How to diagnose</h4>

      <ol>
        <li>
          <strong>In Core:</strong>{" "} confirm the purchase exists. Open
          the member&apos;s profile, go to the Payments tab, verify the
          package is active with the correct Begin Date.
        </li>
        <li>
          <strong>In Grow:</strong>{" "} open the contact&apos;s profile.
          Check the Active Package custom field. If it is empty or shows
          an old package, the sync has not pushed the update.
        </li>
        <li>
          <strong>Check sync history:</strong>{" "} in the contact&apos;s
          activity timeline, look for recent Integration sync entries.
          If the most recent sync is more than 24 hours old, the sync
          may be stalled for this contact.
        </li>
        <li>
          <strong>Check other contacts:</strong>{" "} pick 2 or 3 other
          active contacts at the same location and check their sync
          history. If ALL contacts are missing recent syncs, the issue is
          location-wide. If only this contact is affected, the issue is
          contact-specific.
        </li>
      </ol>

      <h4>Resolution</h4>

      <Callout type="warning" title="Escalate to HQ">
        <p>
          Sync gap issues cannot be resolved at the location level. If
          you confirm the purchase exists in Core but the field has not
          updated in Grow after 24 hours, flag it to HQ with: the
          contact name, the Core package details, and the timestamp of
          the last Integration sync in their Grow timeline. HQ can
          investigate whether the integration is stalled for that
          location.
        </p>
      </Callout>

      <p>
        As a temporary workaround while waiting for the sync to catch
        up, you can manually update the Active Package custom field in
        Grow to trigger the downstream workflows. Be aware that the next
        sync from Core will overwrite whatever you entered, so this only
        works if the Core data is correct and just has not synced yet.
      </p>

      <h3>Attendance Total not updating after a class</h3>

      <p>
        A contact attended a class but their Attendance Total in Grow
        has not incremented. This means the visit counter workflow did
        not fire, and if they are on an intro offer, their pipeline card
        did not advance.
      </p>

      <h4>How to diagnose</h4>

      <ol>
        <li>
          <strong>In Core:</strong>{" "} verify the class shows as
          &ldquo;Attended&rdquo; in their Past Sessions. If it shows as
          &ldquo;Booked&rdquo; or &ldquo;Cancelled,&rdquo; the
          attendance was not marked.
        </li>
        <li>
          <strong>In Grow:</strong>{" "} check the Attendance Total field.
          Note the current value.
        </li>
        <li>
          <strong>Wait for sync:</strong>{" "} if the class happened within
          the last few hours, the sync may not have run yet. Check again
          after 6 to 12 hours.
        </li>
        <li>
          <strong>If still not updated after 24 hours:</strong>{" "} check
          the contact&apos;s timeline for recent Integration sync
          entries. If syncs are happening but Attendance Total is not
          changing, the integration may be pushing the field but with the
          old value.
        </li>
      </ol>

      <h4>Resolution</h4>

      <p>
        If the sync is running but the attendance count is wrong, the
        issue is on Core&apos;s side. Verify the class is properly
        marked as Attended in Core (not just Booked). If the class
        shows as Attended in Core but Grow is not reflecting it after
        24+ hours, escalate to HQ.
      </p>

      <h3>Location Status not updating after cancellation</h3>

      <p>
        A member cancels their membership in Core, but Grow still shows
        them as Active. This can cause them to continue receiving
        membership nurture emails and milestone notifications even
        after they have left.
      </p>

      <h4>How to diagnose</h4>

      <ol>
        <li>
          <strong>In Core:</strong>{" "} check the member&apos;s Location
          Status. It should show the cancelled state (Inactive, Frozen,
          or similar).
        </li>
        <li>
          <strong>In Grow:</strong>{" "} check the Location Status custom
          field. If it still says &ldquo;Active,&rdquo; the sync has not
          pushed the status change.
        </li>
        <li>
          <strong>Check tag state:</strong>{" "} check whether the contact
          still has the{" "}
          <code>active - membership</code>{" "} tag. The{" "}
          <a href="/workflows/key-workflows/membership-journey">
            Inactivity Detection workflow
          </a>
          {" "} should strip this tag when the status changes, but if
          the status never synced, the tag stays.
        </li>
      </ol>

      <h4>Resolution</h4>

      <p>
        Manually update the Location Status field in Grow to match Core.
        Then manually remove the{" "}
        <code>active - membership</code>{" "} tag if it is still present.
        The membership nurture workflows check for this tag before
        sending, so removing it will stop further messages.
      </p>

      <h2>How to check if the sync is running</h2>

      <div className="my-6 p-5 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-sm font-[family-name:var(--font-kessel)] font-black uppercase tracking-wide text-black mt-0 mb-3">
          Quick sync health check
        </p>
        <div className="text-sm text-gray-700 space-y-1 font-mono">
          <p className="m-0">1. Open any active contact at the location</p>
          <p className="m-0">2. Scroll their activity timeline</p>
          <p className="m-0">3. Look for &ldquo;Integration&rdquo; entries</p>
          <p className="m-0">4. Check the timestamp of the most recent one</p>
          <p className="m-0">&nbsp;</p>
          <p className="m-0">&bull; Within 24h = sync is running normally</p>
          <p className="m-0">&bull; 24-48h ago = sync may be delayed, monitor</p>
          <p className="m-0">&bull; 48h+ ago = sync likely stalled, escalate to HQ</p>
        </div>
      </div>

      <Callout type="tip" title="Sync overwrites manual edits">
        <p>
          If you manually update a synced field in Grow (like Active
          Package or Location Status), your edit will hold until the next
          Core sync runs. When the sync fires, it pushes whatever Core
          has, overwriting your manual value. This is expected behavior.
          Only manually edit synced fields as a temporary fix while
          waiting for the underlying Core data to be corrected.
        </p>
      </Callout>

      <h2>Fields that sync vs fields that do not</h2>

      <p>
        Not every custom field in Grow is synced from Core. Some are set
        by workflows within Grow itself. Knowing which is which saves
        time: if a non-synced field is wrong, the issue is a workflow
        problem (not a sync problem).
      </p>

      <table>
        <thead>
          <tr>
            <th>Synced from Core</th>
            <th>Set by Grow workflows</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Active Package</td>
            <td>Intro Offer Pipeline Status</td>
          </tr>
          <tr>
            <td>Active Package Category</td>
            <td>Intro Offer Pipeline Day</td>
          </tr>
          <tr>
            <td>Attendance Total</td>
            <td>Pipeline Visits</td>
          </tr>
          <tr>
            <td>Location Status</td>
            <td>Intro Offer Purchase Date</td>
          </tr>
          <tr>
            <td>First Name, Last Name, Email, Phone</td>
            <td>First Visit Date</td>
          </tr>
          <tr>
            <td>Date of Birth</td>
            <td>Tags (all tags)</td>
          </tr>
        </tbody>
      </table>

      <p>
        The full list of field mappings is covered on the{" "}
        <a href="/core-to-grow-integration">Core to Grow Integration</a>
        {" "} page.
      </p>
    </PageLayout>
  )
}
