import { PageLayout } from "@/components/PageLayout"
import { Callout } from "@/components/Callout"
import { Screenshot } from "@/components/Screenshot"

export default function SmartLists() {
  return (
    <PageLayout
      title="Smart Lists"
      description="Dynamic segments that update automatically based on the rules you set."
      slug="/smart-lists"
    >
      <p>
        Smart lists are saved filters on your contacts database. Instead of
        manually selecting people every time you want to see a specific group,
        you define the rules once and the list updates itself as contact data
        changes. When a new member joins, their record automatically appears in
        the smart lists that match their data. When someone cancels, they move
        out of the active members list and into the past members list without
        anyone touching anything.
      </p>

      <p>
        This is what makes smart lists different from a static spreadsheet
        export. You never need to re-upload or refresh. The data is always
        current because smart lists read directly from the contact fields that
        the Core sync keeps up to date.
      </p>

      <h2>Why smart lists matter</h2>

      <p>
        Smart lists are the foundation for almost everything you do with
        contacts in Grow. When you send a bulk SMS, you select a smart list.
        When you want to see how many active members you have, you check a smart
        list. When you need to follow up with leads who enquired but never
        booked, you have a smart list for that.
      </p>

      <p>
        Without properly configured smart lists, you are either guessing at your
        numbers or manually scrolling through your entire database trying to
        find the right people.
      </p>

      <Screenshot
        src="/screenshots/grow-smart-list-tabs.png"
        alt="The Contacts page showing the smart list tabs across the top: All, All Database w/email minus DND, Leads Only (No Active or Past Purchases), Active Intro Offer, Active Memberships, Active Packages, and a More dropdown. Below, the Smart Lists management view shows all five lists marked as Global Lists with options to duplicate, view filters, edit, and delete."
        caption="The smart list tabs across the top of the Contacts page, with the Manage Smart Lists view showing all core lists set as Global Lists."
      />

      <h2>Smart lists every location should have</h2>

      <p>
        These are the six core smart lists that get created during the initial
        account setup. Each one is built using filters on the custom fields that
        the Core integration populates.
      </p>

      <p>
        If your studio was set up before these names were standardised, you may
        have similar lists under different names. Check the filters rather than
        the name.
      </p>

      <h3>1. All Database w/email minus DND</h3>

      <p>
        Your primary contactable database. This list shows everyone who has an
        email address and has not been marked as Do Not Disturb. Use this list
        instead of &ldquo;All&rdquo; whenever you need to send a bulk message
        to your entire reachable audience.
      </p>

      <table>
        <thead>
          <tr>
            <th>Filter</th>
            <th>Operator</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>Email</code></td>
            <td>Is not empty</td>
            <td></td>
          </tr>
          <tr>
            <td><code>DND</code></td>
            <td>Is not</td>
            <td>Enabled for Email</td>
          </tr>
        </tbody>
      </table>

      <p>
        <strong>Columns:</strong>{" "} Name, Created, Email, Last Activity,
        Phone, Tags
      </p>

      <h3>2. Leads Only (No Active or Past Purchases)</h3>

      <p>
        People in your database who have never purchased anything. They may have
        filled out a form, enquired through a landing page, or been created by a
        Facebook lead ad. This is the list you work from when following up on
        unconverted leads.
      </p>

      <table>
        <thead>
          <tr>
            <th>Filter</th>
            <th>Operator</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>Active Package</code></td>
            <td>Is empty</td>
            <td></td>
          </tr>
          <tr>
            <td><code>Past Active Packages</code></td>
            <td>Is empty</td>
            <td></td>
          </tr>
          <tr>
            <td><code>DND</code></td>
            <td>Is not</td>
            <td>Enabled for Email</td>
          </tr>
          <tr>
            <td><code>Email</code></td>
            <td>Is not empty</td>
            <td></td>
          </tr>
          <tr>
            <td><code>Location Status</code></td>
            <td>Is not</td>
            <td>suspendedMembership</td>
          </tr>
        </tbody>
      </table>

      <p>
        <strong>Columns:</strong>{" "} Name, Created, Last Activity, Past
        Active Packages, Phone, Tags
      </p>

      <Callout type="tip" title="Why both Active Package and Past Active Packages?">
        <p>
          Checking that both fields are empty ensures this list only shows true
          leads. If someone had a package in the past but does not have one now,
          they belong in the Past Purchases list, not here.
        </p>
      </Callout>

      <h3>3. Past Purchases</h3>

      <p>
        People who previously had a package or membership but no longer have
        anything active. These are former members, expired intro offer holders,
        and lapsed package users. Members who have paused their membership are
        left out. This list is useful for win-back campaigns and re-engagement
        outreach.
      </p>

      <table>
        <thead>
          <tr>
            <th>Filter</th>
            <th>Operator</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>Active Package</code></td>
            <td>Is empty</td>
            <td></td>
          </tr>
          <tr>
            <td><code>Past Active Packages</code></td>
            <td>Is not empty</td>
            <td></td>
          </tr>
          <tr>
            <td><code>DND</code></td>
            <td>Is not</td>
            <td>Enabled for Email</td>
          </tr>
          <tr>
            <td><code>Email</code></td>
            <td>Is not empty</td>
            <td></td>
          </tr>
          <tr>
            <td><code>Location Status</code></td>
            <td>Is not</td>
            <td>suspendedMembership</td>
          </tr>
        </tbody>
      </table>

      <p>
        <strong>Columns:</strong>{" "} Name, Active Package, Created, Email, Last
        Activity, Past Active Packages, Phone, Tags
      </p>

      <Callout type="important" title="Why paused members need their own filter">
        <p>
          When a membership is paused in Core, the Active Package field goes
          blank in Grow until the membership resumes. Without the Location Status
          filter, paused members look exactly like former members and land in
          this list, so they would receive your win back messages. The same
          filter keeps them out of Leads Only.
        </p>
      </Callout>

      <h3>4. Active Intro Offer</h3>

      <p>
        Members currently on an intro offer. These are people in the earliest
        stage of their membership journey, and they need the most attention.
        This list helps you track who is on trial so you can ensure they have
        a positive experience and convert to a full membership.
      </p>

      <table>
        <thead>
          <tr>
            <th>Filter</th>
            <th>Operator</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>Active Package Category</code></td>
            <td>Contains</td>
            <td>Intro</td>
          </tr>
        </tbody>
      </table>

      <p>
        Core names this category &ldquo;Intro Offers&rdquo; at most studios and
        &ldquo;Intro Offer&rdquo; at some. Filtering on just the word
        &ldquo;Intro&rdquo; catches both.
      </p>

      <p>
        <strong>Columns:</strong>{" "} Name, Active Package, Active Package
        Category, Attendance Total, Created, Days Absent, Intro Offer Purchase
        Date, Last Activity, Opportunities, Phone, Promo Codes Used, Tags
      </p>

      <h3>5. Active Memberships</h3>

      <p>
        Everyone on a recurring membership. This is your core member base. Use
        this list to see your total membership count, identify members who may
        need attention, and send communications specifically to paying members.
      </p>

      <table>
        <thead>
          <tr>
            <th>Filter</th>
            <th>Operator</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>Active Package Category</code></td>
            <td>Contains</td>
            <td>Memberships</td>
          </tr>
        </tbody>
      </table>

      <p>
        <strong>Columns:</strong>{" "} Name, Active Package, Active Package
        Category, Attendance Total, Created, Date Membership Purchased, Days
        Absent, Email, Last Activity, Phone, Tags, Weekly Check In
      </p>

      <h3>6. Active Packages</h3>

      <p>
        Everyone on a non-membership package, such as class packs, punch cards,
        or other session-based products. These contacts are active but not on a
        recurring plan. Useful for understanding how many people are using
        pay-per-session options versus memberships.
      </p>

      <table>
        <thead>
          <tr>
            <th>Filter</th>
            <th>Operator</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>Active Package Category</code></td>
            <td>Contains</td>
            <td>Packages</td>
          </tr>
        </tbody>
      </table>

      <p>
        <strong>Columns:</strong>{" "} Name, Active Package, Active Package
        Category, Attendance Total, Created, Date Packages Purchased, Days
        Absent, Email, Last Activity, Phone, Tags, Weekly Check In
      </p>

      <Callout type="important" title="Save your columns after adding them">
        <p>
          When you add columns to a smart list, make sure you save the smart
          list afterwards. If you skip this step, the columns reset to defaults
          the next time you visit that list.
        </p>
      </Callout>

      <Screenshot
        src="/screenshots/grow-smart-list-filter-builder.png"
        alt="The Advanced Filters panel open on a Leads Never Purchased smart list showing five AND conditions: Active Package is empty, Past Active Packages is empty, Email is not empty, Email DND is Disabled, and Location Status is not suspendedMembership. The contact list behind shows the filtered results."
        caption="The filter builder panel showing AND conditions on a leads smart list. Each row is a filter rule that contacts must match to appear in the list."
      />

      <h2>How filters work</h2>

      <p>
        Every smart list is built from one or more filters. Each filter targets
        a specific contact field and checks it against a condition. You can
        combine multiple filters to narrow down the list.
      </p>

      <ul>
        <li>
          <strong>AND filters:</strong>{" "} all conditions must be true. For
          example, the Leads Only list requires that Active Package is empty AND
          Past Active Packages is empty AND the contact has an email AND they
          are not DND AND their membership is not paused. All five conditions
          must match for a contact to appear.
        </li>
        <li>
          <strong>OR filters:</strong>{" "} any condition can be true. For
          example, if you wanted a list of everyone on either an intro offer or
          a membership, you could create an OR group where Active Package
          Category contains &ldquo;Intro&rdquo; OR Active Package Category
          contains &ldquo;Memberships&rdquo;.
        </li>
      </ul>

      <p>
        The fields available for filtering are the same custom fields populated
        by the Core sync. If you are unsure what a field contains or what values
        it uses, refer to the{" "}
        <a href="/core-to-grow-integration">Core to Grow Integration</a>{" "}
        section for the full list.
      </p>

      <h2>Key fields used in smart list filters</h2>

      <p>
        These are the contact fields that appear most often across the core
        smart lists:
      </p>

      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>What it contains</th>
            <th>Example values</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>Active Package</code></td>
            <td>The name of the contact&rsquo;s current package or membership</td>
            <td>Unlimited Monthly, STRONG Intro Offer 7 Classes</td>
          </tr>
          <tr>
            <td><code>Active Package Category</code></td>
            <td>
              The category of each active package. A contact with more than one
              active package shows more than one category, separated by commas.
            </td>
            <td>Intro Offers (Intro Offer at some studios), Memberships, Packages</td>
          </tr>
          <tr>
            <td><code>Past Active Packages</code></td>
            <td>Packages the contact previously had but are no longer active</td>
            <td>10 Class Pack, Unlimited Monthly</td>
          </tr>
          <tr>
            <td><code>Email</code></td>
            <td>The contact&rsquo;s email address</td>
            <td>sarah@example.com</td>
          </tr>
          <tr>
            <td><code>DND</code></td>
            <td>Do Not Disturb status</td>
            <td>Enabled for Email, Enabled for SMS</td>
          </tr>
          <tr>
            <td><code>Location Status</code></td>
            <td>The contact&rsquo;s overall status, worked out by Core</td>
            <td>introOffer, activePackage, suspendedMembership, inactive, accountCreated</td>
          </tr>
        </tbody>
      </table>

      <h2>Building your own smart lists</h2>

      <p>
        Beyond the six core lists, you can create additional smart lists for
        specific needs. Some useful examples:
      </p>

      <ul>
        <li>
          <strong>At Risk (14+ Days Absent):</strong>{" "} Active Package
          Category contains &ldquo;Memberships&rdquo; AND Days Absent is greater
          than 14. Shows members who have not visited in over two weeks.
        </li>
        <li>
          <strong>New Accounts (Month to Date):</strong>{" "} Join Date within
          the current month. Join Date is the day the person&rsquo;s Core
          account was created, so this list shows everyone who signed up this
          month, leads included, not only new members.
        </li>
        <li>
          <strong>Suspended Members:</strong>{" "} Location Status equals
          &ldquo;suspendedMembership&rdquo;. Shows members who have paused.
        </li>
      </ul>

      <p>
        The pattern is the same every time: pick the contact field, set the
        condition, and save the list. If you need to combine multiple
        conditions, add AND or OR groups as needed.
      </p>

      <h2>Sharing smart lists</h2>

      <p>
        When you create a smart list, it is <strong>only visible to your
        account</strong> by default. Other users logged into the same location
        will not see it unless you explicitly share it.
      </p>

      <p>
        There are two ways to share a list:
      </p>

      <ul>
        <li>
          <strong>With everyone in your location.</strong>{" "} The list becomes
          a Global List that every user with access to your location can see.
          The six core lists are shared this way, and it is the right choice
          for any list your whole team uses.
        </li>
        <li>
          <strong>With selected users.</strong>{" "} Only the people you pick
          can see it. This can include HQ users, performance managers, and any
          other staff member with access to your location.
        </li>
      </ul>

      <p>
        To share a smart list:
      </p>

      <ol>
        <li>Go to the Contacts page</li>
        <li>Click <strong>Manage Smart Lists</strong>{" "} in the toolbox</li>
        <li>Find the smart list you want to share</li>
        <li>Open its sharing options and choose everyone in the location, or pick the users you want</li>
        <li>Save</li>
      </ol>

      <Callout type="important" title="Share your lists with HQ">
        <p>
          If HQ or your performance manager needs visibility into your studio
          numbers, share the list with everyone in the location or add them as
          a shared user. Without this, they cannot see the lists you have
          created, even though they have access to your location.
        </p>
      </Callout>

      <h2>Common mistakes</h2>

      <ul>
        <li>
          <strong>Sending bulk messages from &ldquo;All&rdquo;.</strong>{" "}
          The All list includes unsubscribed contacts and people marked Do Not
          Disturb. Always select a filtered smart list that excludes these
          people. The &ldquo;All Database w/email minus DND&rdquo; list exists
          specifically for this reason.
        </li>
        <li>
          <strong>Not saving columns.</strong>{" "} If you add columns to a smart
          list but do not save, they will reset next time you visit. Always save
          the list after customizing columns.
        </li>
        <li>
          <strong>Creating lists only you can see.</strong>{" "} If you set up
          useful smart lists but never share them, your team and HQ are
          operating blind. Share lists with anyone who needs them.
        </li>
        <li>
          <strong>Using &ldquo;Is&rdquo; instead of &ldquo;Contains&rdquo; on
          Active Package Category.</strong>{" "} A contact with a membership and
          a class pack at the same time shows as &ldquo;Memberships,
          Packages&rdquo;. A filter of Active Package Category is
          &ldquo;Memberships&rdquo; misses them, while Contains
          &ldquo;Memberships&rdquo; catches everyone whose categories include
          that word. All three category lists use Contains for this reason.
        </li>
        <li>
          <strong>Filtering on the wrong field.</strong>{" "} Make sure you are
          using the correct custom field for your filter. For example,{" "}
          <code>Active Package</code>{" "} gives you the specific package name,
          while <code>Active Package Category</code>{" "} gives you the grouping
          (Intro Offers, Memberships, Packages). Check the{" "}
          <a href="/core-to-grow-integration">Integration</a>{" "} page if you
          are unsure which field to use.
        </li>
      </ul>
    </PageLayout>
  )
}
