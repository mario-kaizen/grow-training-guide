import { PageLayout } from "@/components/PageLayout"
import { Callout } from "@/components/Callout"
import { Screenshot } from "@/components/Screenshot"

export default function Conditions() {
  return (
    <PageLayout
      title="Conditions & Branching"
      description="If/else logic that makes workflows smart."
      slug="/workflows/conditions"
    >
      <p>
        Conditions are the decision points inside a workflow. While
        triggers determine <em>whether</em> a workflow starts and actions
        determine <em>what</em> happens, conditions determine{" "}
        <em>which path</em> the contact takes. They ask a question about
        the contact, and based on the answer, route them down a different
        branch.
      </p>

      <p>
        In the workflow builder, conditions appear as the{" "}
        <strong>If/Else</strong> action. When you see a purple node with
        curly braces and a question like &ldquo;What&apos;s their Active
        Package Category?&rdquo;, that is a condition. Below it, multiple
        branches fan out, each handling a different answer.
      </p>

      <Screenshot
        src="/screenshots/grow-workflow-conditions.png"
        alt="The workflow builder for 01. Intro Offer Status Update showing a condition node asking What is their Active Package Category with four branches below it: Intro Offers with Attendance Total equals 1, Intro Offers with Attendance Total less than 1, EMPTY (when none of the conditions are met), and Intro Offers. The Condition panel is open on the right showing the branch configuration with OR and AND logic: Active Package Category Is Intro Offer OR Active Package Category Is Intro Offers, AND Attendance Total Equal to 1. A second branch for Attendance Total less than 1 is visible below."
        caption="A condition with four branches. The panel on the right shows how a single branch combines OR and AND logic to check both the package category and attendance count."
      />

      <h2>How conditions work</h2>

      <p>
        Every condition has a <strong>question</strong> (the action name)
        and one or more <strong>branches</strong>. Each branch defines a
        set of rules. When the workflow reaches the condition, it
        evaluates each branch from top to bottom. The contact goes down
        the first branch whose rules match.
      </p>

      <p>
        If no branch matches, the contact goes down the{" "}
        <strong>default branch</strong>, typically labeled
        &ldquo;EMPTY&rdquo; or &ldquo;None&rdquo; (shown as &ldquo;When
        none of the conditions are met&rdquo;). This is the fallback path
        that catches everything else.
      </p>

      <h2>Branch logic: OR and AND</h2>

      <p>
        A single branch can check multiple things. The rules inside a
        branch are combined with <strong>OR</strong> and{" "}
        <strong>AND</strong> operators:
      </p>

      <ul>
        <li>
          <strong>OR</strong> means the branch matches if{" "}
          <em>any</em> of the conditions are true. In the screenshot, the
          first branch checks &ldquo;Active Package Category Is Intro
          Offer <strong>OR</strong> Active Package Category Is Intro
          Offers.&rdquo; This catches both the singular and plural
          spelling variants.
        </li>
        <li>
          <strong>AND</strong> means the branch requires{" "}
          <em>all</em> conditions to be true. The same branch also
          requires &ldquo;Attendance Total Equal to 1.&rdquo; So the full
          logic is: (Active Package Category is &ldquo;Intro Offer&rdquo;
          OR &ldquo;Intro Offers&rdquo;) AND (Attendance Total equals 1).
        </li>
      </ul>

      <p>
        This lets a single branch express complex logic. The branch in the
        screenshot is asking: &ldquo;Does this contact have an intro offer
        package AND have they attended exactly one class?&rdquo;
      </p>

      <h2>What conditions check</h2>

      <p>
        Conditions can check any contact field, tag, or pipeline state.
        The most common checks in STRONG workflows:
      </p>

      <table>
        <thead>
          <tr>
            <th>What it checks</th>
            <th>Example question</th>
            <th>Used for</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Active Package Category</strong></td>
            <td>&ldquo;Do they have Memberships or Packages?&rdquo;</td>
            <td>Routing contacts differently based on whether they are on an intro offer, a membership, or have no active package</td>
          </tr>
          <tr>
            <td><strong>Active Package</strong></td>
            <td>&ldquo;Does their Active Package contain STRONG Intro?&rdquo;</td>
            <td>Identifying the specific package type to send the right messaging</td>
          </tr>
          <tr>
            <td><strong>Attendance Total</strong></td>
            <td>&ldquo;What&apos;s their Attendance Total?&rdquo;</td>
            <td>Milestone notifications (47, 97, 197, 497, 997 classes) or checking if they have attended at all</td>
          </tr>
          <tr>
            <td><strong>Location Status</strong></td>
            <td>&ldquo;Is their Location Status inactive?&rdquo;</td>
            <td>Removing contacts from nurture workflows when they become inactive</td>
          </tr>
          <tr>
            <td><strong>Tags</strong></td>
            <td>&ldquo;Do they have the 60 day member nurture tag?&rdquo;</td>
            <td>Preventing contacts from going through a sequence twice</td>
          </tr>
          <tr>
            <td><strong>DND status</strong></td>
            <td>&ldquo;Do they have DND on?&rdquo;</td>
            <td>Skipping SMS actions for contacts who have opted out</td>
          </tr>
          <tr>
            <td><strong>Pipeline status fields</strong></td>
            <td>&ldquo;Is the Pipeline Status still Pre?&rdquo;</td>
            <td>Checking whether a contact has progressed in the intro offer pipeline before taking action</td>
          </tr>
        </tbody>
      </table>

      <h2>Common branching patterns</h2>

      <h3>Yes/No check</h3>

      <p>
        The simplest pattern. The condition asks a yes/no question and has
        two branches: one for yes and one for no (or a default fallback).
        Examples:
      </p>

      <ul>
        <li>
          &ldquo;Is their Active Package empty?&rdquo; → Yes branch
          creates a pipeline opportunity. No branch (default) does nothing.
        </li>
        <li>
          &ldquo;Is their Location Status inactive?&rdquo; → Yes branch
          removes them from the 60 Day Member Journey workflow. Default
          does nothing.
        </li>
      </ul>

      <h3>Multi-way routing</h3>

      <p>
        The condition has three or more branches, each handling a different
        scenario. The screenshot above shows four branches based on Active
        Package Category and Attendance Total. Another common example is
        the Attendance Milestones workflow, which branches on Attendance
        Total with five paths (47, 97, 197, 497, 997) to send different
        milestone notifications.
      </p>

      <h3>Guard check</h3>

      <p>
        A condition placed early in the workflow to verify that the
        contact still qualifies before proceeding. The workflow checks
        &ldquo;Do they still have Intro Offer in their Active Package
        Category?&rdquo; and only continues down the Yes branch. If the
        answer is no (they converted or went inactive since the workflow
        started), the default branch ends the workflow. This prevents
        stale contacts from receiving messages that no longer apply.
      </p>

      <Callout type="tip" title="Guard checks after Wait steps">
        <p>
          You will often see a Wait step followed immediately by a
          condition that re-checks the contact&apos;s status. This is
          intentional. A contact might sit in a Wait for days. By the time
          the Wait ends, their situation may have changed. The guard check
          ensures the workflow only continues if the contact&apos;s current
          state still warrants the next action.
        </p>
      </Callout>

      <h3>Duplicate safety check</h3>

      <p>
        A condition that checks whether a specific action has already been
        performed for this contact, preventing it from happening twice.
        For example: &ldquo;Has the first SMS been sent before? (has been
        tagged with sms_sent_first visit)&rdquo;. If the tag exists, the
        contact already received that SMS and the workflow skips it.
      </p>

      <h2>Nested conditions</h2>

      <p>
        Conditions can be nested. A branch from one condition can lead to
        another condition further down the workflow. STRONG workflows use
        this extensively. A common pattern:
      </p>

      <ol>
        <li>
          <strong>First condition:</strong>{" "} &ldquo;What&apos;s their
          Active Package Category?&rdquo; (routes to Intro Offer branch)
        </li>
        <li>
          <strong>Second condition (inside the Intro Offer branch):</strong>
          {" "} &ldquo;What&apos;s their Intro Offer Pipeline Status?&rdquo;
          (routes to Active, Pre, or Expired)
        </li>
        <li>
          <strong>Third condition (inside the Active branch):</strong>
          {" "} &ldquo;How many visits do they have?&rdquo;
        </li>
      </ol>

      <p>
        Each level narrows down the contact&apos;s situation until the
        workflow reaches the right action for their exact state.
      </p>

      <h2>The default branch matters</h2>

      <p>
        Every condition has a default branch for contacts that do not
        match any of the defined branches. In well-built workflows, the
        default branch is intentional. Sometimes it leads to an END step
        (the contact exits the workflow). Sometimes it leads to a
        different set of actions. Sometimes it does nothing and lets the
        contact fall through to the next step below the condition block.
      </p>

      <Callout type="warning" title="Do not ignore the default branch">
        <p>
          If you are reviewing a workflow and trying to understand why a
          contact received (or did not receive) a specific message, always
          check the default branch. Contacts who do not match any named
          branch end up here. A common troubleshooting scenario is a
          contact falling into the default branch because their data did
          not match any of the expected conditions (e.g. a field was blank
          or had an unexpected value).
        </p>
      </Callout>
    </PageLayout>
  )
}
