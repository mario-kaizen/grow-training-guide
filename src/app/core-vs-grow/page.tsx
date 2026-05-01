import { PageLayout } from "@/components/PageLayout"
import { Callout } from "@/components/Callout"
import { Screenshot } from "@/components/Screenshot"

export default function CoreVsGrow() {
  return (
    <PageLayout
      title="Core vs Grow"
      description="Two systems, two jobs. Here's what lives where."
      slug="/core-vs-grow"
    >
      <p>
        STRONG Pilates runs on two platforms that work together:{" "}
        <strong>Hapana Core</strong>{" "} and{" "}
        <strong>Hapana Grow</strong>. They serve completely different purposes,
        and understanding the split is essential before touching anything in
        either system.
      </p>

      <h2>Hapana Core</h2>

      <p>
        Core is the <strong>member management platform</strong>. It is the
        operational backbone of every studio, and the system that studio staff
        interact with daily to run their business.
      </p>

      <p>Core handles:</p>

      <ul>
        <li>Memberships and packages (creating, modifying, suspending, cancelling)</li>
        <li>Class scheduling and timetables</li>
        <li>Member check-ins and attendance tracking</li>
        <li>Billing and payment processing</li>
        <li>Retail and point-of-sale</li>
        <li>Staff and trainer management</li>
      </ul>

      <h2>Hapana Grow</h2>

      <p>
        Grow is the <strong>CRM and marketing platform</strong>. It is the
        communication and automation layer. This is where leads get nurtured,
        campaigns run, and the customer journey gets tracked.
      </p>

      <p>Grow handles:</p>

      <ul>
        <li>Lead capture and contact records</li>
        <li>SMS and email communication</li>
        <li>Pipelines (visual journey tracking)</li>
        <li>Workflows (automated sequences and actions)</li>
        <li>Campaign management and promotional rollouts</li>
        <li>Conversations inbox (unified view of all comms)</li>
      </ul>

      <h2>The simple rule</h2>

      <Callout type="tip" title="Quick mental model">
        <p>
          If it involves a{" "}
          <strong>membership, booking, class, or payment</strong>, that&rsquo;s{" "}
          <strong>Core</strong>.
        </p>
        <p className="mt-2">
          If it involves a{" "}
          <strong>message, pipeline stage, workflow, or campaign</strong>,
          that&rsquo;s <strong>Grow</strong>.
        </p>
      </Callout>

      <Screenshot
        src="/screenshots/core-vs-grow-side-by-side.png"
        alt="Grow (left) showing the CRM dashboard with pipeline widgets and sidebar navigation, and Core (right) showing the member management dashboard with Active Clients, Active Intro Offers, Booked Utilization, Revenue cards, and a Credits Snapshot chart."
        caption="Grow (left) handles CRM and communications. Core (right) handles memberships, scheduling, and billing."
      />

      <h2>Where it gets tricky</h2>

      <p>
        The two systems sync data between each other. When someone purchases an
        intro offer in Core, that information flows into Grow and triggers
        workflows. When a lead fills out a form in Grow, their contact record
        exists in both places.
      </p>

      <p>
        This sync is powerful but also where most issues come from. A contact
        might show one status in Core and a different one in Grow if the sync
        hasn&rsquo;t caught up, or if a field didn&rsquo;t map correctly.
      </p>

      <p>
        The next section covers exactly how this integration works, what fields
        sync, and what to watch out for.
      </p>

      <Callout type="warning" title="Common mistake">
        <p>
          When someone says &ldquo;Hapana&rdquo; without specifying which one,
          always clarify. &ldquo;Check Hapana&rdquo; could mean either system,
          and looking in the wrong one wastes time.
        </p>
      </Callout>

      <h2>Side by side</h2>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>Core</th>
            <th>Grow</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Purpose</strong></td>
            <td>Studio operations</td>
            <td>CRM and marketing</td>
          </tr>
          <tr>
            <td><strong>Used by</strong></td>
            <td>Studio staff daily</td>
            <td>Kaizen team + studio managers</td>
          </tr>
          <tr>
            <td><strong>Manages</strong></td>
            <td>Memberships, classes, billing</td>
            <td>Leads, comms, automations</td>
          </tr>
          <tr>
            <td><strong>Built on</strong></td>
            <td>Hapana&rsquo;s platform</td>
            <td>Hapana Grow</td>
          </tr>
          <tr>
            <td><strong>Contact source</strong></td>
            <td>Members with active packages</td>
            <td>All contacts (leads + members)</td>
          </tr>
        </tbody>
      </table>
    </PageLayout>
  )
}
