import { PageLayout } from "@/components/PageLayout"
import { Callout } from "@/components/Callout"

export default function PipelineInaccuracy() {
  return (
    <PageLayout
      title="Pipeline Inaccuracy"
      description="Wrong day, inflated visit count, premature expiry, and stuck pipeline cards."
      slug="/troubleshooting/pipeline-inaccuracy"
    >
      <p>
        Pipeline inaccuracy is the single most common support issue
        across STRONG locations, accounting for roughly 40% of all
        troubleshooting tickets. The Intro Offer Pipeline is designed to
        track a contact&apos;s day-by-day progress through their intro
        offer, but several known bugs can cause it to show the wrong
        day, count more visits than actually attended, or expire the
        offer before the contact has used all their sessions.
      </p>

      <p>
        Four specific bugs cause the majority of pipeline inaccuracy
        issues. Each has a distinct root cause and a specific diagnostic
        path.
      </p>

      <h2>What it looks like</h2>

      <ul>
        <li>A contact&apos;s pipeline card shows &ldquo;Day 8&rdquo; but they purchased 3 days ago.</li>
        <li>Pipeline Visits shows 5 but the contact has only attended 2 classes.</li>
        <li>A contact moved to &ldquo;Expired&rdquo; but still has sessions remaining on their package.</li>
        <li>A contact who has not booked a single class is showing as &ldquo;1st Visit Complete.&rdquo;</li>
        <li>The day counter started from the wrong date.</li>
        <li>A recently merged contact is suddenly receiving the full intro offer nurture sequence despite having zero bookings.</li>
      </ul>

      <h2>Bug 1 | False first visit from free classes</h2>

      <h3>Root cause</h3>

      <p>
        A member attends a free STRONG Starter class before using their
        first intro offer credit. Core syncs the attendance data to Grow
        without distinguishing between free and paid sessions. Grow sees
        &ldquo;attendance happened&rdquo; and triggers the 1st Visit
        Complete stage, which starts the day counter.
      </p>

      <p>
        The day counter is now anchored to the free class date, not the
        first package session date. If the free class was 7 days before
        their first paid visit, the entire pipeline is offset by 7 days.
      </p>

      <h3>How to diagnose</h3>

      <ol>
        <li>
          <strong>In Core:</strong>{" "} open the member&apos;s profile. Go to
          the Payments tab (4th icon). Find the intro offer package and
          note the Begin Date. Click the package to see Visits History,
          which shows every booking with date, class, and status.
        </li>
        <li>
          <strong>In Core:</strong>{" "} go to the Schedule tab (3rd icon).
          Open Past Sessions and filter by the relevant dates. This
          shows ALL attended classes, including free ones.
        </li>
        <li>
          <strong>Compare:</strong>{" "} if there is a class in Past Sessions
          that does NOT appear in the package Visits History, it was a
          free class. If that free class date is earlier than the
          package Begin Date, it triggered a false Day 1.
        </li>
      </ol>

      <h3>Resolution</h3>

      <p>
        Manually update the contact&apos;s pipeline card to the correct
        day stage. Update the &ldquo;Intro Offer First Visit Date&rdquo;
        custom field to the actual first paid visit date.
      </p>

      <Callout type="important" title="No permanent fix available">
        <p>
          The Core to Grow integration does not pass whether a session
          was free or paid. This is a platform limitation. The only
          prevention is to ensure members do not attend free classes on
          a different date before starting their intro offer package.
        </p>
      </Callout>

      <h2>Bug 2 | Inflated visit counter from sync bounces</h2>

      <h3>Root cause</h3>

      <p>
        Core syncs attendance data to Grow multiple times per day. Each
        sync pushes ALL custom fields, including Attendance Total. The
        visit counter workflow (
        <a href="/workflows/key-workflows/during-intro-offer">
          02. Intro Offer Visits Update
        </a>
        ) watches for &ldquo;Attendance Total changed&rdquo; and adds +1
        to Pipeline Visits when it detects a change.
      </p>

      <p>
        The problem: the workflow checks whether the value{" "}
        <em>changed</em>, not whether it <em>increased</em>. If Core
        sends fluctuating values across consecutive syncs (for example,
        bouncing between 1 and 2), each fluctuation triggers another +1.
        The visit counter inflates beyond the actual number of classes
        attended.
      </p>

      <h3>Why it matters</h3>

      <p>
        The tag protection system for 5-session intro offers (
        <a href="/workflows/key-workflows/new-intro-offers">
          06. Add Tag active 5 session
        </a>
        ) removes the protective tag when Pipeline Visits reaches 5. If
        the counter is inflated, the tag gets removed before the member
        has actually attended 5 classes. Without tag protection, the
        status update workflow sees an empty Active Package and moves the
        contact to Expired, even though they still have sessions left.
      </p>

      <h3>How to diagnose</h3>

      <ol>
        <li>
          <strong>In Grow:</strong>{" "} open the contact&apos;s profile.
          Check the &ldquo;Intro Offer Information&rdquo; section. Note
          the Pipeline Visits value.
        </li>
        <li>
          <strong>In Core:</strong>{" "} open the member&apos;s profile. Count
          the actual classes attended via the package Visits History.
        </li>
        <li>
          <strong>Compare:</strong>{" "} if Pipeline Visits in Grow is higher
          than actual classes attended in Core, the counter was inflated.
        </li>
        <li>
          <strong>Confirm via Audit Logs:</strong>{" "} in Grow, go to
          Settings, then Audit Logs. Search by the contact&apos;s ID and
          filter to the intro offer period. Look at Attendance Total
          values across consecutive Integration sync entries. If the
          value fluctuates (for example, 1, then 2, then 1, then 2) with
          Pipeline Visits incrementing each time, the sync bounces caused
          the inflation.
        </li>
      </ol>

      <h3>Resolution</h3>

      <p>
        Manually correct the Pipeline Visits custom field to match the
        actual attendance count. If the protective tag was removed
        prematurely, re-add the tag{" "}
        <code>active - 5 session strong intro offer</code>{" "}
        and move the pipeline card back to the correct day stage.
      </p>

      <Callout type="warning" title="Escalate to HQ">
        <p>
          If you are seeing this pattern across multiple contacts at the
          same location, the Core sync may be misconfigured for that
          studio. Flag it to HQ with the contact IDs and audit log
          screenshots showing the fluctuations.
        </p>
      </Callout>

      <h2>Bug 3 | Contact merge triggers false activation</h2>

      <h3>Root cause</h3>

      <p>
        When two contact records are merged in Grow (via Bulk Actions),
        the merge triggers field change events. If the surviving contact
        inherits an Attendance Total greater than 0 from the old record,
        the visit update workflow fires. It sees: Active Package Category
        is Intro Offers, Attendance Total is greater than 0, and Intro
        Offer Pipeline Status is Pre. So it sets the status to Active,
        sets Visits to 1, which cascades into 1st Visit Complete and the
        full nurture sequence.
      </p>

      <p>
        The result: a member who has not booked or attended a single
        class on their current offer receives the entire 15-day nurture
        sequence as if they had completed their first visit.
      </p>

      <h3>When it happens</h3>

      <p>
        This only occurs when duplicate contacts are merged while the
        member has an active intro offer. The most common scenario:
        a returning member (Re-Starter Pass or similar) has an old
        contact record from a previous visit and a new one from their
        current purchase. A studio team member merges them via Bulk
        Actions, and the historical attendance data from the old record
        triggers the false activation.
      </p>

      <h3>How to diagnose</h3>

      <ol>
        <li>
          <strong>In Grow Audit Logs:</strong>{" "} search by the
          contact&apos;s ID around the time the pipeline issue started.
          Look for entries marked &ldquo;Updated (Contact Merge)&rdquo;
          with the source &ldquo;BULK_ACTION.&rdquo;
        </li>
        <li>
          <strong>Check the cascade:</strong>{" "} the merge entry will be
          followed by a rapid sequence of workflow trigger entries:
          status change, visit update, tag addition, and pipeline card
          movement, all within seconds.
        </li>
        <li>
          <strong>Verify attendance:</strong>{" "} in Core, check the
          member&apos;s actual bookings for the current package. If they
          have zero bookings but Grow shows 1st Visit Complete, the merge
          triggered the false activation.
        </li>
      </ol>

      <h3>Resolution</h3>

      <p>
        Manually reset the pipeline position: move the card back to the
        Purchase stage, set Pipeline Visits to 0, and set Intro Offer
        Pipeline Status back to Pre. Remove any tags that were added
        by the false activation.
      </p>

      <Callout type="tip" title="Prevention">
        <p>
          Advise studio teams to check with HQ before merging contacts
          who are currently on an active intro offer. The merge itself is
          fine for inactive contacts, but the field change events it
          creates can cascade through the intro offer workflows.
        </p>
      </Callout>

      <h2>Bug 4 | False starter trigger misconfiguration</h2>

      <h3>Root cause</h3>

      <p>
        The False Starter workflow (
        <a href="/workflows/key-workflows/during-intro-offer">
          Day 0 False Starter Reset
        </a>
        ) is designed to catch contacts who purchased an intro offer but
        never attended. It checks after a set number of days: if the
        contact is still on Day 0 with zero visits, it moves them to the
        False Starter column and sends a re-engagement nudge.
      </p>

      <p>
        Misconfiguration happens when the wait period in this workflow
        does not match the current intro offer length. If a studio
        switches from a 14-day to a 7-day offer but the False Starter
        wait period is still set to 7 days, contacts get flagged as
        False Starters before their offer has actually expired.
      </p>

      <h3>How to diagnose</h3>

      <ol>
        <li>
          <strong>Check the contact&apos;s offer type:</strong>{" "} in
          the Intro Offer Information custom fields, note the Intro Offer
          Name and the purchase date.
        </li>
        <li>
          <strong>Check the False Starter timing:</strong>{" "} calculate
          how many days between the purchase date and when they were moved
          to the False Starter column. If that is shorter than the offer
          duration, the wait period is misconfigured.
        </li>
      </ol>

      <h3>Resolution</h3>

      <Callout type="warning" title="Escalate to HQ">
        <p>
          This requires a workflow edit. Flag it to HQ with the location
          name, the current intro offer type and duration, and the date
          the contact was incorrectly moved to False Starter. HQ will
          adjust the wait period in the False Starter workflow for that
          location.
        </p>
      </Callout>

      <h2>Investigation process | Quick reference</h2>

      <p>
        When a pipeline inaccuracy ticket comes in, this is the order to
        check:
      </p>

      <div className="my-6 p-5 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-sm font-[family-name:var(--font-kessel)] font-black uppercase tracking-wide text-black mt-0 mb-3">
          Diagnostic flow
        </p>
        <div className="text-sm text-gray-700 space-y-1 font-mono">
          <p className="m-0">1. Core: Payments tab &rarr; package dates + credits</p>
          <p className="m-0">2. Core: Schedule &rarr; Past Sessions &rarr; any free classes?</p>
          <p className="m-0">3. Core: Package &rarr; Visits History &rarr; actual attendance</p>
          <p className="m-0">4. Grow: Contact profile &rarr; Intro Offer Information fields</p>
          <p className="m-0">5. Grow: Activity timeline &rarr; stage transition dates</p>
          <p className="m-0">6. Grow: Audit Logs &rarr; Attendance Total changes + merge events</p>
          <p className="m-0">7. Compare: Grow Pipeline Visits vs Core actual attendance</p>
          <p className="m-0">8. Identify: which bug matches the pattern</p>
        </div>
      </div>

      <h2>Key custom fields to check</h2>

      <p>
        These fields live in the &ldquo;Intro Offer Information&rdquo;
        section on every contact profile:
      </p>

      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>What it shows</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Intro Offer Name</strong></td>
            <td>Which intro offer the contact purchased (STRONG Intro Offer, Starter Pass, etc.).</td>
          </tr>
          <tr>
            <td><strong>Intro Offer Purchase Date</strong></td>
            <td>When the purchase was detected by Grow. Set by the{" "}
              <a href="/workflows/key-workflows/system-workflows">
                Date Stamp workflows
              </a>.
            </td>
          </tr>
          <tr>
            <td><strong>Intro Offer First Visit Date</strong></td>
            <td>When the contact&apos;s first visit was recorded. If this does not match Core, a free class may have triggered it early.</td>
          </tr>
          <tr>
            <td><strong>Pipeline Visits</strong></td>
            <td>How many visits the system has counted. Compare to Core&apos;s actual attendance count to detect inflation.</td>
          </tr>
          <tr>
            <td><strong>Intro Offer Pipeline Status</strong></td>
            <td>Current status: Pre, Active, Expired, Won, Abandoned, Lost, False Starter.</td>
          </tr>
          <tr>
            <td><strong>Intro Offer Pipeline Day</strong></td>
            <td>Which day the contact is on in the pipeline. Driven by the{" "}
              <a href="/workflows/key-workflows/during-intro-offer">
                daily pipeline workflows
              </a>.
            </td>
          </tr>
        </tbody>
      </table>
    </PageLayout>
  )
}
