import { PageLayout } from "@/components/PageLayout"
import { Callout } from "@/components/Callout"

export default function WorkflowTiming() {
  return (
    <PageLayout
      title="Workflow Timing & Tasks"
      description="Tasks at wrong time, wrong owner, workflow firing multiple times."
      slug="/troubleshooting/workflow-timing"
    >
      <p>
        Workflow timing issues account for roughly 15% of
        troubleshooting tickets. They show up as internal tasks arriving
        at unexpected times, tasks assigned to the wrong team member,
        workflows firing more than once for the same contact, or
        contacts stuck in a workflow stage that should have moved on.
      </p>

      <p>
        Most of these trace back to how workflows interact with each
        other. In a system with 300+ workflows, actions in one workflow
        can trigger conditions in another, creating cascades that are
        hard to predict without understanding the full chain.
      </p>

      <h2>What it looks like</h2>

      <ul>
        <li>An internal task notification arrives at 2am instead of during business hours.</li>
        <li>A task is assigned to the wrong team member (or to nobody).</li>
        <li>A contact receives the same SMS or email twice within minutes.</li>
        <li>A workflow fired for a contact who should not have qualified (wrong pipeline stage, wrong tag, wrong package type).</li>
        <li>A contact&apos;s pipeline card is stuck and has not moved for days, even though they are attending classes.</li>
        <li>Multiple task notifications fire for the same contact on the same day.</li>
      </ul>

      <h2>Tasks arriving at wrong times</h2>

      <h3>Root cause</h3>

      <p>
        Internal task actions in workflows use the location&apos;s
        timezone setting. If the timezone is misconfigured (for example,
        set to UTC instead of the studio&apos;s local timezone), tasks
        scheduled for &ldquo;9am&rdquo; will fire at 9am UTC, which
        could be 2am or 7pm at the actual studio location.
      </p>

      <p>
        A second cause: some workflows use &ldquo;Wait X hours&rdquo;
        actions that do not account for timezone. If a contact enters a
        workflow at 11pm and the workflow has a &ldquo;Wait 8 hours&rdquo;
        step followed by a task creation, the task fires at 7am. This is
        technically correct, but if the workflow design intended
        &ldquo;next business morning,&rdquo; the wait step does not
        enforce that.
      </p>

      <h3>How to diagnose</h3>

      <ol>
        <li>
          <strong>Check the task timestamp:</strong>{" "} in the
          contact&apos;s activity timeline, find the task creation
          entry. Note the exact time.
        </li>
        <li>
          <strong>Check the location timezone:</strong>{" "} in Grow, go
          to Settings, then Business Profile. The timezone is listed
          there. Compare it to the studio&apos;s actual timezone.
        </li>
        <li>
          <strong>Check the workflow wait steps:</strong>{" "} if the task
          is created after a wait step, calculate when the contact
          entered the workflow and add the wait duration. If the result
          matches the unexpected time, the wait step is the cause.
        </li>
      </ol>

      <h3>Resolution</h3>

      <Callout type="warning" title="Timezone changes: escalate to HQ">
        <p>
          Changing a location&apos;s timezone setting affects all
          scheduled actions across all workflows. This should only be
          done by HQ after confirming the correct timezone for the
          studio. Flag it with: the current timezone setting, the
          expected timezone, and an example of a task that fired at the
          wrong time.
        </p>
      </Callout>

      <h2>Tasks assigned to the wrong person</h2>

      <h3>Root cause</h3>

      <p>
        The{" "}
        <a href="/workflows/key-workflows/system-workflows">
          User Assignment workflows
        </a>
        {" "} assign contacts to team members when they first enter the
        system. The assignment is configured per location: each studio
        has its own user assignment workflow with a specific team member
        set in the action.
      </p>

      <p>
        When a studio&apos;s team changes (a manager leaves, a new hire
        starts), the workflow still points to the old team member until
        it is manually updated. Contacts continue to be assigned to
        someone who may no longer be at the studio.
      </p>

      <p>
        A second cause: some workflows use &ldquo;Assign to specific
        user&rdquo; while others use &ldquo;Assign to contact
        owner.&rdquo; If the contact has no owner (because the
        assignment workflow did not fire), the &ldquo;assign to
        owner&rdquo; action fails silently and the task has no assignee.
      </p>

      <h3>How to diagnose</h3>

      <ol>
        <li>
          <strong>Check the contact&apos;s assigned user:</strong>{" "} on
          the contact profile, look at the &ldquo;Assigned To&rdquo;
          field. If it is empty, the assignment workflow did not fire. If
          it shows a former team member, the workflow has not been
          updated.
        </li>
        <li>
          <strong>Check the assignment workflow:</strong>{" "} find the
          location&apos;s &ldquo;01. Systems | Assign User&rdquo;
          workflow and look at the &ldquo;Assign to user&rdquo; action
          to see who it is currently assigning to.
        </li>
      </ol>

      <h3>Resolution</h3>

      <p>
        For the specific contact: manually update the Assigned To field
        to the correct team member.
      </p>

      <Callout type="warning" title="Workflow edit needed for ongoing fix">
        <p>
          If the wrong person is being assigned to all new contacts at a
          location, the assignment workflow needs to be updated with the
          correct team member. This is a workflow edit and should be done
          by HQ. Flag it with: the location name, the person currently
          being assigned, and the person who should be assigned.
        </p>
      </Callout>

      <h2>Workflows firing multiple times</h2>

      <h3>Root cause</h3>

      <p>
        Most workflows in the STRONG system have &ldquo;Allow
        Re-entry&rdquo; enabled. This is by design: when a contact&apos;s
        field values change (via Core sync, manual edit, or another
        workflow), the contact can re-enter a workflow they have already
        been through. In most cases, the workflow&apos;s internal
        conditions prevent duplicate processing (for example, checking
        the pipeline status before acting).
      </p>

      <p>
        Double-firing happens when a workflow&apos;s trigger condition is
        met twice in quick succession, faster than the workflow can
        process the first entry. The most common trigger: two consecutive
        Core syncs that both push field changes within minutes of each
        other.
      </p>

      <h3>How to diagnose</h3>

      <ol>
        <li>
          <strong>Check the contact&apos;s timeline:</strong>{" "} look
          for two instances of the same workflow entry within minutes of
          each other. Each workflow entry shows as a distinct event with
          a timestamp.
        </li>
        <li>
          <strong>Check for duplicate messages:</strong>{" "} in the
          Conversations tab, look for the same SMS or email sent twice
          with nearly identical timestamps.
        </li>
        <li>
          <strong>Check Audit Logs:</strong>{" "} look for two Integration
          sync entries close together. If both syncs pushed changes to
          the same field (for example, Attendance Total), each would
          have triggered the watching workflow independently.
        </li>
      </ol>

      <h3>Resolution</h3>

      <p>
        For the specific contact: no action needed if the duplicate
        was just a duplicate notification or SMS. If the duplicate firing
        caused incorrect data (for example, Pipeline Visits incremented
        twice instead of once), manually correct the affected field.
      </p>

      <p>
        For recurring double-fires at a specific location, escalate to
        HQ. The fix may involve adding a debounce condition to the
        workflow (for example, checking the last execution time before
        acting).
      </p>

      <h2>Contacts stuck in a workflow</h2>

      <h3>Root cause</h3>

      <p>
        A contact enters a workflow and reaches a &ldquo;Wait&rdquo;
        step, but the condition to proceed past the wait is never met.
        Common scenarios:
      </p>

      <ul>
        <li>
          A wait step says &ldquo;Wait until Active Package
          contains X&rdquo; but the contact&apos;s package name
          changed and no longer matches the expected value.
        </li>
        <li>
          A wait step says &ldquo;Wait 24 hours&rdquo; followed by
          a condition check. The condition fails, and the workflow
          has no fallback path, so the contact sits in limbo.
        </li>
        <li>
          A contact entered a workflow before it was fully configured.
          They are waiting at a step that was later modified, but the
          modification only applies to new entries, not contacts already
          in the queue.
        </li>
      </ul>

      <h3>How to diagnose</h3>

      <ol>
        <li>
          <strong>Check the workflow enrollment:</strong>{" "} in the
          contact&apos;s timeline, find the workflow entry and note when
          they entered.
        </li>
        <li>
          <strong>Check for completion:</strong>{" "} if there is an entry
          event but no corresponding completion or exit event, the
          contact is still enrolled.
        </li>
        <li>
          <strong>Check the workflow steps:</strong>{" "} open the workflow
          in the builder and identify which step the contact would be on
          based on their entry time and the wait durations before that
          step.
        </li>
      </ol>

      <h3>Resolution</h3>

      <p>
        Remove the contact from the workflow manually. In the
        workflow builder, you can search for enrolled contacts and
        remove them individually. After removal, verify that the
        contact&apos;s custom fields and tags are in the correct state.
        If the stuck workflow was supposed to update a field or tag, you
        may need to set it manually.
      </p>

      <Callout type="tip" title="Checking enrolled contacts">
        <p>
          Each workflow in Grow shows the number of currently enrolled
          contacts. If a workflow that should have finished processing
          still shows enrolled contacts from days or weeks ago, those
          contacts are likely stuck at a wait step. Click into the
          enrollment list to see who is stuck and at which step.
        </p>
      </Callout>
    </PageLayout>
  )
}
