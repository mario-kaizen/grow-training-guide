import { PageLayout } from "@/components/PageLayout"
import { Callout } from "@/components/Callout"

export default function Troubleshooting() {
  return (
    <PageLayout
      title="Troubleshooting"
      description="The most common issues across Grow, why they happen, and how to resolve them."
      slug="/troubleshooting"
    >
      <p>
        After working through hundreds of support tickets across 142
        STRONG locations, the same issues come up again and again. They
        look different on the surface (a contact stuck on the wrong day,
        a missing tag, a notification that will not stop) but they trace
        back to a small number of root causes.
      </p>

      <p>
        This section groups those recurring issues by pattern. Each page
        covers one category: what the symptoms look like, why it happens,
        how to diagnose it, and how to fix it. The goal is not to list
        every possible thing that can go wrong. It is to give you the
        tools to resolve the issues you will actually encounter.
      </p>

      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>What it covers</th>
            <th>Frequency</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>
                <a href="/troubleshooting/pipeline-inaccuracy">
                  Pipeline Inaccuracy
                </a>
              </strong>
            </td>
            <td>
              Contact on the wrong day, visit counter showing more visits
              than actually attended, premature expiry, pipeline card
              stuck in the wrong stage. Four documented bugs with
              specific root causes.
            </td>
            <td>~40% of tickets</td>
          </tr>
          <tr>
            <td>
              <strong>
                <a href="/troubleshooting/sync-gaps">
                  Core to Grow Sync Gaps
                </a>
              </strong>
            </td>
            <td>
              Active Package not updating, membership purchase not
              triggering workflows, attendance data delayed or missing,
              custom fields stuck on old values.
            </td>
            <td>~20% of tickets</td>
          </tr>
          <tr>
            <td>
              <strong>
                <a href="/troubleshooting/contact-duplicates">
                  Contact Duplicates & Merges
                </a>
              </strong>
            </td>
            <td>
              Same person appears twice, merging contacts triggers false
              workflow activations, historical data conflicts after
              merge, contacts created from different email addresses.
            </td>
            <td>~15% of tickets</td>
          </tr>
          <tr>
            <td>
              <strong>
                <a href="/troubleshooting/workflow-timing">
                  Workflow Timing & Tasks
                </a>
              </strong>
            </td>
            <td>
              Internal tasks arriving at the wrong time, tasks assigned
              to the wrong team member, workflow firing more than once,
              contacts stuck in a workflow that should have moved on.
            </td>
            <td>~15% of tickets</td>
          </tr>
          <tr>
            <td>
              <strong>
                <a href="/troubleshooting/email-notifications">
                  Email & Notification Issues
                </a>
              </strong>
            </td>
            <td>
              Internal notification emails that keep arriving, SMS
              delivery failures, emails going to spam, DND contacts
              still receiving messages.
            </td>
            <td>~12% of tickets</td>
          </tr>
        </tbody>
      </table>

      <h2>How to use these pages</h2>

      <p>
        Start with the symptoms you are seeing. Each page opens with a
        list of &ldquo;What it looks like&rdquo; descriptions so you can
        match your situation to the right category. If you are not sure
        which category fits, Pipeline Inaccuracy is the most common
        starting point.
      </p>

      <p>
        Each diagnosis section tells you exactly where to look:
        which Grow screens to check, which Core fields to compare,
        and which audit log entries to search for. The resolution
        sections explain what to fix and, just as importantly, what
        <em>cannot</em> be fixed because it is a platform limitation.
      </p>

      <Callout type="tip" title="Cross-references to workflows">
        <p>
          Many troubleshooting scenarios trace back to a specific
          workflow covered in the{" "}
          <a href="/workflows/key-workflows">Key Workflows</a>{" "}
          section. Each troubleshooting page links directly to the
          relevant workflow page so you can see the full step breakdown
          and understand why the system behaves the way it does.
        </p>
      </Callout>

      <h2>When to escalate to HQ</h2>

      <p>
        Most issues on these pages can be diagnosed and resolved at the
        location level. But some require HQ intervention because they
        involve workflow edits, Core sync configuration, or template
        account changes. Each page flags which resolutions you can
        handle yourself and which need to be raised to HQ.
      </p>

      <p>
        The general rule: if the fix involves changing a contact&apos;s
        data (moving a pipeline card, updating a custom field, removing
        a tag), you can do it. If the fix involves changing how a
        workflow or integration behaves, flag it to HQ.
      </p>
    </PageLayout>
  )
}
