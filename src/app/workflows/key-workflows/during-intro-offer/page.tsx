import { PageLayout } from "@/components/PageLayout"
import { Callout } from "@/components/Callout"
import { ConnectionDiagram } from "@/components/ConnectionDiagram"

function Col({ kind, children }: { kind: "auto" | "manual"; children: React.ReactNode }) {
  const c =
    kind === "auto"
      ? "bg-green-50 border-green-300 text-green-900"
      : "bg-red-50 border-red-300 text-red-900"
  return (
    <span className={`inline-block rounded-md border px-3 py-1.5 text-xs font-medium ${c}`}>
      {children}
    </span>
  )
}

export default function DuringIntroOffer() {
  return (
    <PageLayout
      title="During Intro Offer"
      description="The board, the day-by-day journey, how to read the visit count, and what to do when it looks wrong."
      slug="/workflows/key-workflows/during-intro-offer"
    >
      <p>
        Once a member has bought an intro offer and been set up by the{" "}
        <a href="/workflows/key-workflows/new-intro-offers">New Intro Offers</a>{" "}
        workflows, a second layer takes over: the day-by-day journey across
        the board, the visit count, and the three ways it can end. This page
        is the board, how to read it, and what to do when it looks wrong.
      </p>

      <h2>The board at a glance</h2>

      <p>
        The Intro Offer board has 25 columns. That sounds like a lot, but they
        fall into four simple groups, and most of them move on their own.
      </p>

      <div className="my-8 not-prose space-y-3 rounded-xl border border-gray-200 bg-[#FAF8F5] p-6">
        <div className="flex flex-wrap gap-4 text-[11px] font-medium text-gray-600">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded-sm border border-green-400 bg-green-100" />
            moves on its own
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded-sm border border-red-400 bg-red-100" />
            you move it by hand
          </span>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="mt-0 mb-2 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
            1 &middot; Entry
          </p>
          <div className="flex flex-wrap gap-2">
            <Col kind="auto">Purchase</Col>
            <Col kind="manual">Welcome Call Complete</Col>
          </div>
        </div>
        <div className="text-center text-gray-300">&darr;</div>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="mt-0 mb-2 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
            2 &middot; No-show (hasn&apos;t attended yet)
          </p>
          <div className="flex flex-wrap gap-2">
            <Col kind="auto">No Attendance [4-13 Days]</Col>
            <Col kind="auto">No Attendance [over 14 Days]</Col>
          </div>
        </div>
        <div className="text-center text-gray-300">&darr;</div>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="mt-0 mb-2 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
            3 &middot; Daily run (attending)
          </p>
          <div className="flex flex-wrap gap-2">
            <Col kind="auto">1st Visit Complete (day 1)</Col>
            <Col kind="auto">Day 2 &rarr; Day 3 &rarr; ... &rarr; Day 15</Col>
          </div>
        </div>
        <div className="text-center text-gray-300">&darr;</div>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="mt-0 mb-2 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
            4 &middot; Exits
          </p>
          <div className="flex flex-wrap gap-2">
            <Col kind="auto">Expired</Col>
            <Col kind="manual">Expired Call No Answer 1</Col>
            <Col kind="manual">Expired Call No Answer 2</Col>
            <Col kind="manual">Expired Call No Answer 3</Col>
            <Col kind="manual">Future Follow Up</Col>
            <Col kind="auto">Membership/Package</Col>
          </div>
        </div>
      </div>

      <figure className="my-8 not-prose">
        <div className="overflow-x-auto rounded border border-gray-200">
          <a href="/screenshots/intro-offer-pipeline-board.png" target="_blank" rel="noopener noreferrer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/screenshots/intro-offer-pipeline-board.png"
              alt="The Intro Offer pipeline board in Grow, every column from Purchase through the Day stages to the exits."
              className="h-[340px] max-w-none w-auto"
            />
          </a>
        </div>
        <figcaption className="mt-2.5 text-center text-sm text-gray-500">
          The same board in Grow. Scroll sideways to see every column, or click to open it full size. The colour-coding above is our teaching aid, not something Grow shows, so use this page to tell which columns move on their own and which you move by hand.
        </figcaption>
      </figure>

      <p>
        Most members go Purchase, then 1st Visit Complete, then the daily run.
        A member who has not attended yet waits in the No Attendance columns
        and joins the daily run the moment they come in. The columns sit on
        the board in this same order, left to right, so 1st Visit Complete is
        the start of the daily run, not an entry column.
      </p>

      <table>
        <thead>
          <tr>
            <th>Group</th>
            <th>Columns</th>
            <th>Who moves the card</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Entry</td>
            <td>Purchase, <strong>Welcome Call Complete</strong></td>
            <td>Automatic, except <strong>Welcome Call Complete</strong></td>
          </tr>
          <tr>
            <td>No-show</td>
            <td>No Attendance [4-13 Days], No Attendance [over 14 Days]</td>
            <td>Automatic</td>
          </tr>
          <tr>
            <td>Daily run</td>
            <td>1st Visit Complete (day 1), Day 2 through Day 15</td>
            <td>Automatic</td>
          </tr>
          <tr>
            <td>Exits</td>
            <td>Expired, <strong>Expired Call No Answer 1/2/3</strong>, <strong>Future Follow Up</strong>, Membership/Package</td>
            <td>Automatic, except the <strong>Call No Answer</strong> and <strong>Future Follow Up</strong> columns</td>
          </tr>
        </tbody>
      </table>

      <h2>The member&apos;s journey across the board</h2>

      <p>A member&apos;s path through the board is simple once you see it:</p>

      <ConnectionDiagram
        nodes={[
          { id: "pre", label: "Bought, not yet attended", type: "source", description: "Status: Pre (Purchase column)" },
          { id: "active", label: "Attends first class", type: "workflow", description: "Status: Active (1st Visit Complete)" },
          { id: "run", label: "One column per day", type: "workflow", description: "Day 2 to Day 15" },
          { id: "won", label: "Membership / Package", type: "outcome", description: "joins as a member" },
          { id: "expired", label: "Expired", type: "outcome", description: "offer runs out" },
        ]}
        connections={[
          { from: "pre", to: "active", label: "attends first class" },
          { from: "active", to: "run" },
          { from: "run", to: "won" },
          { from: "run", to: "expired" },
        ]}
      />

      <ul>
        <li>A new buyer sits in <strong>Purchase</strong> with the status <strong>Pre</strong>.</li>
        <li>
          The moment they attend their first class, they flip to{" "}
          <strong>Active</strong> and the card moves to <strong>1st Visit
          Complete</strong>. There is no &ldquo;Day 1&rdquo; column. 1st Visit
          Complete is day one.
        </li>
        <li>From there the card moves one column per day: Day 2, Day 3, and so on to Day 15.</li>
        <li>It ends one of three ways: they join (Membership/Package), the offer runs out (Expired), or your team parks them for later.</li>
      </ul>

      <h2>What moves itself, and what you move</h2>

      <p>This is the part studios get wrong most often, so it is worth being precise.</p>

      <p>
        <strong>Automatic.</strong> Each daily move has its own workflow that
        fires the moment a card lands in a column. It waits about a day,
        checks whether the member has joined or let the offer lapse, then
        pushes the card to the next column. You do not touch these. The
        day-by-day march from 1st Visit Complete down to Day 15 runs itself.
      </p>

      <p>
        <strong>You move these by hand.</strong> Four columns track something
        the system simply cannot see, so a human has to move the card:
      </p>

      <table>
        <thead>
          <tr>
            <th>Column you move</th>
            <th>When you move it</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Welcome Call Complete</strong></td>
            <td>After you have actually completed the welcome call. Grow has no way to know the call happened.</td>
          </tr>
          <tr>
            <td><strong>Expired Call No Answer 1, 2, 3</strong></td>
            <td>As you work through your expired-member call attempts and nobody picks up. Each no-answer is a manual step.</td>
          </tr>
          <tr>
            <td><strong>Future Follow Up</strong></td>
            <td>When you decide to park a member to follow up later. That is a judgement call, so it is a manual move.</td>
          </tr>
        </tbody>
      </table>

      <Callout type="tip" title="The rule of thumb">
        <p>
          If the card depends on a human action (a call made, a call answered,
          a decision to wait), you move it. Everything else moves itself.
        </p>
      </Callout>

      <h2>Where the visit number on the card comes from</h2>

      <p>
        Every card shows the member&apos;s name and a visit count, like
        &ldquo;Sarah (3 visits) - STRONG Intro Offer.&rdquo; Here is exactly
        where that number comes from, because it is the source of the most
        common confusion.
      </p>

      <ConnectionDiagram
        nodes={[
          { id: "class", label: "Member attends a class", type: "source" },
          { id: "at", label: "Core updates Attendance Total", type: "workflow" },
          { id: "vu", label: "02. Intro Offer Visits Update adds +1", type: "workflow", description: "to Intro Offer Pipeline Visits" },
          { id: "field", label: "The field updates instantly", type: "workflow", description: "Intro Offer Pipeline Visits" },
          { id: "card", label: "Card name shows (N visits)", type: "outcome", description: "re-printed on the next daily move" },
        ]}
        connections={[
          { from: "class", to: "at" },
          { from: "at", to: "vu", label: "change detected" },
          { from: "vu", to: "field" },
          { from: "field", to: "card" },
        ]}
      />

      <p>
        The workflow that drives this is <strong>02. Intro Offer Visits
        Update</strong>. Every time the member&apos;s attendance changes, it
        adds 1 to their <strong>Intro Offer Pipeline Visits</strong> count.
      </p>

      <p>
        But notice the gap between the last two steps. The <strong>field</strong>{" "}
        updates the instant a class is attended. The <strong>card name</strong>{" "}
        only re-prints that number when a workflow next re-writes the card,
        which after the first visit happens on the next daily move. So the
        field is always current, and the card name catches up roughly once a
        day.
      </p>

      <h2>Core vs Grow: read this before you trust a number</h2>

      <p>
        Two numbers look similar and get mixed up constantly. They come from
        different places.
      </p>

      <table>
        <thead>
          <tr>
            <th>Number</th>
            <th>Where it comes from</th>
            <th>What it means</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Attendance Total</strong></td>
            <td><strong>Core</strong> (Hapana)</td>
            <td>The real count of classes attended. This is the source of truth.</td>
          </tr>
          <tr>
            <td><strong>Intro Offer Pipeline Visits</strong></td>
            <td><strong>Grow</strong>, not Core</td>
            <td>A tally that Grow adds 1 to every time Attendance Total changes. A count kept by counting, not the real number.</td>
          </tr>
        </tbody>
      </table>

      <p>
        Because Pipeline Visits is counted by Grow rather than read from Core,
        it can drift. The workflow adds 1 whenever Attendance Total{" "}
        <em>changes</em>, not only when it goes up. So if Core re-syncs and
        nudges the value, Grow can add an extra visit.{" "}
        <strong>When the two disagree, Attendance Total from Core is the one to
        believe.</strong>
      </p>

      <h2>When a card looks wrong: the Pipeline Fix</h2>

      <p>
        There is a repair workflow built for exactly this:{" "}
        <strong>202510 Intro Offer Pipeline Fix</strong>. It recalculates
        which column a member should be in from their real{" "}
        <strong>Intro Offer Purchase Date</strong> and{" "}
        <strong>Intro Offer First Visit Date</strong>, then puts the card where
        it belongs.
      </p>

      <p>
        To run it on a member whose card has gone wrong, add the tag{" "}
        <code>intro offer fix</code> to their contact. The workflow does the
        rest. (It only works when those two dates are correct. If the dates
        themselves are wrong, fix them first, then run it.)
      </p>

      <h2>When a member&apos;s intro offer gets extended</h2>

      <p>
        Sometimes a studio extends a member&apos;s intro in Core to give them
        more time. Core does not tell Grow, and the Grow automation is built
        around the member&apos;s <strong>original</strong> purchase and
        first-visit dates plus a fixed 14-day tag timer. So an extension has
        to be handled by hand, or the member gets wrongly expired.
      </p>

      <Callout type="warning" title="Two things go wrong if it is left alone">
        <p className="mt-0">
          <strong>1.</strong> The card runs out the original timeline and lands
          in Expired.
        </p>
        <p className="mb-0">
          <strong>2.</strong> Even if you move the card back, the 06 workflow
          still removes the protection tag on the old 14-day timer, so Status
          Update expires them again.
        </p>
      </Callout>

      <p>
        <strong>What to do when an intro gets extended.</strong> Three steps,
        all manual:
      </p>

      <ol>
        <li>
          <strong>Move the card to the right day.</strong> Work out how many
          days are left on the extended offer, and move the card to the Day
          column that lines up with that, so the daily run carries them to Day
          15 right as the extended offer actually ends.
        </li>
        <li>
          <strong>Take them out of the tag workflow.</strong> Remove the
          contact from the <strong>06. STRONG Intro Offer</strong> workflow
          (the one that adds, and later removes, the{" "}
          <code>active - 5 session strong intro offer</code> tag). This stops
          the tag being removed early on the original 14-day timer, which is
          what would otherwise re-expire them.
        </li>
        <li>
          <strong>Set a task to remove the tag yourself.</strong> Create a task
          dated to the new, extended expiry. On that day, remove the{" "}
          <code>active - 5 session strong intro offer</code> tag by hand. That
          is what tells the pipeline they have genuinely reached the end, and
          lets the normal expiry run.
        </li>
      </ol>

      <Callout type="important" title="Why all three">
        <p>
          Step 1 keeps the board accurate. Step 2 stops the automation expiring
          them early. Step 3 makes sure they still expire at the right time
          once the extension is genuinely over. Skip step 2 and the tag removal
          re-expires them. Skip step 3 and they never expire at all.
        </p>
      </Callout>

      <h2>FAQ</h2>

      <p>Questions about how the pipeline is meant to work.</p>

      <h3>How long does it take for a purchase in Core to show up in Grow?</h3>
      <p>
        Usually 15 to 30 minutes. The Core-to-Grow sync is not instant, so when
        a member buys you will not see them on the board straight away. If Core
        has not validated the member&apos;s phone number yet, it can take a
        little longer, but it should never be more than an hour. If it has been
        over an hour, treat it as a fault and see Troubleshooting below.
      </p>

      <h3>Why is the visit number in the member&apos;s profile different from the number on their card?</h3>
      <p>
        They are two separate stores. The profile field (Intro Offer Pipeline
        Visits) updates the moment a class is attended. The card name is a text
        label that only re-prints the number when a workflow re-writes the
        card, which after the first visit happens about once a day. Attend a
        class this morning and the field jumps straight away, but the card
        still shows the earlier number until that day&apos;s move runs. (The
        card carries only one true field of its own, Last Call Date. Everything
        else you see on it, the visits and the offer name, is baked into the
        card&apos;s name when it was last written.)
      </p>

      <h3>Why are there two visit fields, Intro Offer Pipeline Visits and STRONG Intro Offer Visits?</h3>
      <p>
        Both count the same thing and move together. The card name uses Intro
        Offer Pipeline Visits.
      </p>

      <h3>A member has used up all their classes, or their package shows empty, but they are still active in the pipeline. Why?</h3>
      <p>
        Because the 5-session offer uses a credit when a class is{" "}
        <strong>booked</strong>, not when it is attended. A member who books
        all five classes ahead empties their package straight away, even before
        attending. The <code>active - 5 session strong intro offer</code> tag
        (added on purchase by the 06. STRONG Intro Offer workflow) keeps them
        protected in the pipeline until 14 days from their first visit or 5
        completed classes, so they are not expired early just for booking
        ahead.
      </p>

      <h3>A card is sitting in a column and nothing is moving it. Is it stuck?</h3>
      <p>
        Probably not. Check whether it is one of the four hand-moved columns:
        Welcome Call Complete, the three Expired Call No Answer columns, or
        Future Follow Up. Those never move on their own. They are waiting for
        you.
      </p>

      <h2>Troubleshooting</h2>

      <p>
        When something looks wrong, start here. Each one is a real cause we
        have seen, written out in full so you can fix it from this page.
      </p>

      <h3>A member purchased, but they are not showing in Grow at all</h3>
      <p>
        <strong>What&apos;s happening.</strong> Two common causes, in order of
        likelihood:
      </p>
      <ol>
        <li>
          <strong>The sync has not run yet.</strong> Core to Grow takes 15 to
          30 minutes, and up to an hour if the member&apos;s phone number is
          not validated in Core. Most &ldquo;missing&rdquo; members are just
          early.
        </li>
        <li>
          <strong>The package was set up in Core with the wrong Package
          Category.</strong> A member only enters the Intro Offer pipeline when
          their Active Package Category reads <strong>Intro Offer</strong> or{" "}
          <strong>Intro Offers</strong>. If the package was created under a
          different category by mistake, the sync still brings the contact
          across, but the Status Update workflow never adds them to the board.
          This has happened in the US by accident.
        </li>
      </ol>
      <p>
        <strong>How to fix.</strong> If it has been under an hour, wait. If it
        has been longer, open the member in Core and check the package&apos;s
        Category. Correct it to Intro Offer (or Intro Offers), and the next
        sync will place them on the board.
      </p>

      <h3>A member is on the board, but they never got the welcome email or any nurture</h3>
      <p>
        <strong>What&apos;s happening.</strong> The board and the messages run
        off two different fields, the same split from the{" "}
        <a href="/workflows/key-workflows/new-intro-offers">New Intro Offers</a>{" "}
        page. A card lands on the board whenever the <strong>Active Package
        Category</strong> is Intro Offer or Intro Offers, whatever the package
        is called. But the post-purchase automations (the welcome email, the
        nurture sequence, the check-in SMS, and the upsells) only fire when the{" "}
        <strong>Active Package name</strong> matches what those workflows look
        for, such as &ldquo;STRONG Intro Offer&rdquo; or &ldquo;7 Classes
        for&rdquo;. So a studio running an intro offer under its own custom name
        will see those members appear on the board correctly, but get none of
        the messaging.
      </p>
      <p>
        <strong>Watch out.</strong> The protection tag keys off the package
        name too, so a custom-named offer also misses it. That means the
        booking-ahead safeguard does not apply, and the member can be expired
        early once they book all their classes.
      </p>
      <p>
        <strong>How to fix.</strong> The automations have to be custom-built
        for that package name: the welcome, nurture, milestone, and tag
        workflows cloned and pointed at the new name. That is an HQ build, so
        flag it to HQ with the studio and the exact package name. The simpler
        option, if the studio is willing, is to use one of the standard intro
        offer names in Core so the existing automations match. Until either is
        done, the studio handles the welcome and follow-up for those members by
        hand.
      </p>

      <h3>The day counter started on the wrong day, or a free class already moved them to 1st Visit Complete</h3>
      <p>
        <strong>What&apos;s happening.</strong> Grow cannot tell a free class
        apart from a paid intro class. Any attended class moves the
        member&apos;s Attendance Total, which fires the Visits Update workflow,
        flips them from Pre to Active, and anchors the day counter to that
        class&apos;s date. So a member who did a free STRONG Starter class, or
        an old casual drop-in from months ago, can be moved to 1st Visit
        Complete with the counter on the wrong date, before they have used a
        single intro credit.
      </p>
      <p>
        <strong>How to check.</strong> In Core, open the member&apos;s profile.
      </p>
      <ul>
        <li>Payments tab (the 4th icon): find the intro offer package, note its Begin Date, and open Visits History to see every booked class.</li>
        <li>Schedule tab (the 3rd icon): open Past Sessions and filter the dates to see every attended class, including free ones.</li>
        <li>If a class shows in Past Sessions but not in the package&apos;s Visits History, it was a free class. If its date is before the package Begin Date, it started the counter early.</li>
      </ul>
      <p>
        <strong>How to fix.</strong> Move the card back to where the member
        actually is: back to Purchase if they have not started their paid
        offer, or the correct Day column if they have. Set Intro Offer Pipeline
        Visits to the real number, and correct the <strong>Intro Offer First
        Visit Date</strong> field to their actual first paid visit. Once those
        dates are right, you can add the <code>intro offer fix</code> tag to
        let the Pipeline Fix re-place the card from the corrected dates. There
        is no permanent prevention: the Core-to-Grow sync does not say whether
        a class was free or paid, so this has to be caught by hand.
      </p>

      <h3>Pipeline Visits is higher than the classes the member actually attended</h3>
      <p>
        <strong>What&apos;s happening.</strong> Pipeline Visits is a Grow
        tally, not a copy of Core. The Visits Update workflow adds 1 every time
        Attendance Total <strong>changes</strong>, not only when it goes up.
        Core syncs many times a day and can push a value that bounces (for
        example 1, then 2, then 1, then 2), and each change adds another visit,
        so the count inflates past the real attendance.
      </p>
      <p>
        <strong>Why it matters.</strong> When Pipeline Visits reaches 5, the
        protection tag <code>active - 5 session strong intro offer</code> is
        removed. If the count is inflated, the tag comes off before the member
        has truly done 5 classes, and with the tag gone the Status Update
        workflow sees the empty package and moves them to Expired with sessions
        still left.
      </p>
      <p>
        <strong>How to check.</strong> Compare Grow&apos;s Pipeline Visits (in
        the Intro Offer Information section on the contact) against the real
        attendance count in Core&apos;s Visits History. To confirm the cause,
        open Grow Settings, then Audit Logs, search the contact, and look at
        Attendance Total across the Integration syncs. Fluctuating values with
        Pipeline Visits ticking up each time is the inflation.
      </p>
      <p>
        <strong>How to fix.</strong> Correct the Pipeline Visits field to the
        real attendance count. If the protection tag was already removed, re-add{" "}
        <code>active - 5 session strong intro offer</code> and move the card
        back to the correct day. If you see this across several members at one
        location, the studio&apos;s Core sync may be misconfigured, so flag it
        to HQ with the contact IDs and audit-log screenshots.
      </p>

      <h3>A member who never attended is suddenly running the full nurture sequence</h3>
      <p>
        <strong>What&apos;s happening.</strong> This is almost always a
        duplicate-contact fix gone wrong. Grow no longer has a merge button, so
        consolidating two records for one person means editing identifier
        fields (moving a phone number, adding a name) by hand. If you do that on
        a record that already carries attendance history, the field change can
        fire the Visits Update workflow, which sees status Pre with attendance
        above 0 and flips them to Active with 1 visit. That cascades into 1st
        Visit Complete and the whole 15-day nurture, even though they have zero
        bookings on their current offer.
      </p>
      <p>
        <strong>How to check.</strong> In Grow Audit Logs, search the contact
        around when it went wrong and look for identifier-field edits, followed
        within seconds by a cascade of status change, visit update, tag, and
        card-move entries. Confirm in Core that they have zero bookings on the
        current package.
      </p>
      <p>
        <strong>How to fix.</strong> Reset the pipeline position by hand: move
        the card back to Purchase, set Pipeline Visits to 0, set Intro Offer
        Pipeline Status to Pre, and remove any tags the false activation added.
        Going forward, never consolidate duplicate contacts while a record has
        an active intro offer. The full duplicate-contact workaround, and the
        rule to leave active intro offers alone, is on the{" "}
        <a href="/troubleshooting/contact-duplicates">Contact Duplicates</a>{" "}
        page.
      </p>

      <h3>A member bought, but they are still getting lead nurture and never showed as Sold in the Leads Pipeline</h3>
      <p>
        <strong>What&apos;s happening.</strong> This is two contacts for one
        person. If they opted in with one email and purchased with a different
        email, Core creates a second contact for the purchase. Grow now holds
        two records with the same name and different email addresses: the
        opt-in record stays in the Leads Pipeline being nurtured, while the
        purchase record runs the Intro Offer pipeline on its own.
      </p>
      <p>
        <strong>How to fix.</strong> Grow has no merge button, so you
        consolidate the two records by hand: move the shared phone number onto
        the record you are keeping and match it in Core so the sync does not
        undo it. The full step-by-step is on the{" "}
        <a href="/troubleshooting/contact-duplicates">Contact Duplicates</a>{" "}
        page. One hard rule: if either record has an active intro offer, leave
        the identifier fields alone until the offer period is over, because
        editing them is exactly what triggers the false activation in the entry
        above.
      </p>

      <h2>Reference: which workflow moves a card into each column</h2>

      <p>
        This is the precise map for tracing what put a member where they are.
        You do not need it day to day. (Verified from the live template
        workflows. Every workflow here is a draft on the template and runs live
        once the studio is switched on, except the Pipeline Fix, which is
        always on.)
      </p>

      <table>
        <thead>
          <tr>
            <th>Column</th>
            <th>What moves a card into it</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Purchase</td>
            <td><strong>01. Status Update</strong> and <strong>01. Purchase Confirmation</strong>, on the Core purchase</td>
          </tr>
          <tr>
            <td>1st Visit Complete</td>
            <td><strong>02. Visits Update</strong>, on the first attended class (or Status Update / Purchase Confirmation if they had already attended)</td>
          </tr>
          <tr>
            <td>Day 2</td>
            <td><strong>Day 01 &gt; Day 2</strong></td>
          </tr>
          <tr>
            <td>Day 3</td>
            <td><strong>Day 02 &gt; Day 3</strong></td>
          </tr>
          <tr>
            <td>Day 4 through Day 14</td>
            <td>the matching workflow: <strong>Day 03 &gt; Day 4</strong> writes Day 4, on up to <strong>Day 13 &gt; Day 14</strong> writes Day 14</td>
          </tr>
          <tr>
            <td>Day 15</td>
            <td><strong>Day 14 &gt; Day 15</strong></td>
          </tr>
          <tr>
            <td>No Attendance [4-13 Days] and [over 14 Days]</td>
            <td><strong>03. False Starter Check</strong></td>
          </tr>
          <tr>
            <td>Expired</td>
            <td>whichever step detects the offer has ended: <strong>01. Status Update</strong>, or the active <strong>Day</strong> workflow&apos;s expiry branch</td>
          </tr>
          <tr>
            <td>Membership/Package</td>
            <td>whichever step detects they converted: <strong>01. Status Update</strong>, <strong>05. Mark as Sold</strong>, or <strong>07. Marked Won</strong></td>
          </tr>
          <tr>
            <td>Welcome Call Complete</td>
            <td>nobody. You move it by hand.</td>
          </tr>
          <tr>
            <td>Expired Call No Answer 1, 2, 3</td>
            <td>nobody. You move it by hand.</td>
          </tr>
          <tr>
            <td>Future Follow Up</td>
            <td>nobody. You move it by hand.</td>
          </tr>
        </tbody>
      </table>

      <Callout type="tip" title="Two things to read alongside the table">
        <p className="mt-0">
          <strong>Each &ldquo;Day A &gt; Day B&rdquo; workflow is named for
          exactly what it does.</strong> It is triggered when the card arrives
          in column A, waits about a day, then writes the card into column B. So
          &ldquo;Day 01 &gt; Day 2&rdquo; fires when the card reaches its
          day-one spot (1st Visit Complete) and moves it into Day 2. That is how
          the run advances itself, one column a day.
        </p>
        <p className="mb-0">
          <strong>The 202510 Pipeline Fix can write a card into almost any
          column.</strong> It is the reconciler. When you add the{" "}
          <code>intro offer fix</code> tag, it recomputes the right column from
          the real dates and places the card there.
        </p>
      </Callout>

      <h3>What starts each of these workflows</h3>

      <table>
        <thead>
          <tr>
            <th>What changes or happens</th>
            <th>Workflow it starts</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Active Package Category changes</td>
            <td>01. Intro Offer Status Update</td>
          </tr>
          <tr>
            <td>Active Package changes</td>
            <td>01. Purchase Confirmation, and 06. the protection-tag workflow</td>
          </tr>
          <tr>
            <td>Attendance Total changes</td>
            <td>02. Intro Offer Visits Update</td>
          </tr>
          <tr>
            <td>A card arrives in a Day column</td>
            <td>the next Day workflow</td>
          </tr>
          <tr>
            <td><code>intro offer fix</code> tag added</td>
            <td>202510 Pipeline Fix</td>
          </tr>
          <tr>
            <td><code>active - 5 session strong intro offer</code> tag removed</td>
            <td>01. Status Update (re-checks, and can expire them)</td>
          </tr>
        </tbody>
      </table>
    </PageLayout>
  )
}
