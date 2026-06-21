import { PageLayout } from "@/components/PageLayout"
import { Callout } from "@/components/Callout"
import { Screenshot } from "@/components/Screenshot"

export default function NewIntroOffers() {
  return (
    <PageLayout
      title="New Intro Offers"
      description="How a member gets onto the Intro Offer board, and the welcome sequence that follows."
      slug="/workflows/key-workflows/new-intro-offers"
    >
      <p>
        You have never opened Grow before. By the end of this page and the
        next, you will understand the Intro Offer pipeline the way you
        understand a whiteboard: what each column means, which cards move on
        their own, which cards you move by hand, and why the numbers
        sometimes look off.
      </p>

      <Callout type="warning" title="The pipeline ships switched off">
        <p>
          On a brand-new studio the Intro Offer pipeline sits dormant until
          opening day, when it is switched on as part of your studio's setup.
          If you are reading this before you open, the automation described
          here is not running yet. That is by design.
        </p>
      </Callout>

      <h2>What the Intro Offer pipeline is</h2>

      <p>
        The Intro Offer pipeline is the board in Grow that tracks every
        member on the 5-session intro offer, from the moment they buy to the
        moment they either join as a member or let the offer lapse.
      </p>

      <p>
        It is a visual dashboard and an automation engine at the same time.
        You read it like a board. Behind the scenes, a set of workflows moves
        most of the cards for you.
      </p>

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
          The Intro Offer board in Grow. Scroll sideways to see every column, or click to open it full size. The During Intro Offer page breaks down what each column means and which ones move on their own.
        </figcaption>
      </figure>

      <h2>How a member lands on the board</h2>

      <p>
        Nobody adds a member to the board by hand. A purchase in Core does
        it, by updating two fields that then do two different jobs. Getting
        these two fields straight is the most important thing on this page.
      </p>

      <div className="my-8 rounded-xl border border-gray-200 bg-[#FAF8F5] p-6 not-prose">
        <div className="mb-5 text-center">
          <span className="inline-block rounded-lg border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-medium text-sky-900">
            Member buys in Core, the sync updates two fields
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <p className="mt-0 mb-1 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
              Active Package
            </p>
            <p className="m-0 text-sm font-medium text-gray-900">the exact offer name</p>
            <div className="my-2 text-center text-gray-300">&darr;</div>
            <p className="m-0 text-sm text-gray-700">
              <strong>Drives the messages.</strong> Purchase Confirmation
              sends the welcome email and the offer-specific comms.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <p className="mt-0 mb-1 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
              Active Package Category
            </p>
            <p className="m-0 text-sm font-medium text-gray-900">the bucket: Intro Offer</p>
            <div className="my-2 text-center text-gray-300">&darr;</div>
            <p className="m-0 text-sm text-gray-700">
              <strong>Drives the board.</strong> Status Update adds the card
              and handles every move.
            </p>
          </div>
        </div>
      </div>

      <p>Here is the chain in plain words:</p>

      <ol>
        <li>The member buys the intro offer in Core.</li>
        <li>
          The Core-to-Grow sync updates two fields on their contact:{" "}
          <strong>Active Package</strong> (the exact offer they bought, such
          as "STRONG Intro Offer") and <strong>Active Package Category</strong>{" "}
          (the bucket it sits in, "Intro Offer").
        </li>
        <li>
          Those two fields drive two different things, and this is the part
          to remember:
          <ul>
            <li>
              <strong>Active Package drives the communications.</strong> The
              01. STRONG Intro Offer Purchase Confirmation workflow watches
              this field and sends the welcome email and the messages
              specific to that offer.
            </li>
            <li>
              <strong>Active Package Category drives the pipeline.</strong>{" "}
              The 01. Intro Offer Status Update workflow watches this field,
              uses it to add the card to the board, and later uses it again to
              move the member to Expired (when the category empties) or to
              Membership/Package (when the category changes to one of those).
            </li>
          </ul>
        </li>
        <li>
          The result on a fresh purchase: a first card in the{" "}
          <strong>Purchase</strong> column, status <strong>Pre</strong>{" "}
          (bought, not yet attended), visit count <strong>0</strong>, tagged
          into the pipeline.
        </li>
      </ol>

      <p>
        If the member has somehow already attended a class by the time this
        runs, they skip straight to the <strong>1st Visit Complete</strong>{" "}
        column instead.
      </p>

      <Callout type="important" title="The two fields to keep straight">
        <p>
          <strong>Active Package</strong> is the exact offer name, and it
          decides <strong>what messages go out</strong>.{" "}
          <strong>Active Package Category</strong> is the bucket, and it
          decides <strong>where the card goes on the board</strong>. Every
          pipeline move (added in, sent to Expired, sent to Memberships or
          Packages) keys off the <strong>Category</strong>, never the package
          name.
        </p>
      </Callout>

      <Screenshot
        src="/screenshots/core-grow-package-fields.png"
        alt="Core Retail Configuration package list. The Package Name column maps to the Grow Active Package field, and the Category column maps to Active Package Category."
        caption="Where the two fields come from. In Core, a package's Name fills the Grow Active Package field and its Category fills Active Package Category. The board routes on the Category; the messages key off the name."
      />

      <h3>A Core quirk: a package can empty before a member attends</h3>

      <p>This one trips studios up, so it is worth understanding properly.</p>

      <p>
        The 5-session intro offer is credit-based, and Core uses up a credit
        the moment a class is <strong>booked</strong>, not when it is
        attended. So a member who books all five classes up front uses all
        five credits straight away. Core then syncs their Active Package and
        Active Package Category to <strong>empty</strong>, even though they
        have not set foot in the studio yet.
      </p>

      <p>
        Left alone, that empty Category would tell the Status Update workflow
        to move them to <strong>Expired</strong> far too early. That is
        exactly why the 06. STRONG Intro Offer workflow exists.
      </p>

      <Callout type="important" title="The protection tag">
        <p>
          On purchase, workflow 06 adds the tag{" "}
          <code>active - 5 session strong intro offer</code>. While that tag
          is on the contact, the empty Category cannot expire them. The tag is
          only removed once <strong>14 days have passed from their first
          visit</strong> or <strong>they have completed 5 classes</strong>,
          whichever comes first. So a member who books ahead stays protected
          for the full intro window instead of being expired the day they
          finish booking.
        </p>
      </Callout>

      <h2>The welcome beat</h2>

      <p>As the card is created, the member gets the human touch:</p>

      <ul>
        <li>
          An email, "You're in. Let's Get STRONG.", confirming the purchase
          and pointing them to booking.
        </li>
        <li>
          A task lands for your team, the Welcome Call, prompting someone to
          call and help them book their first class.
        </li>
      </ul>

      <p>
        That welcome call is the first thing on the board that you drive. More
        on that on the next page.
      </p>

      <h2>Then the journey begins</h2>

      <p>
        Once the card exists and the welcome sequence has sent, the member
        starts moving through the board one step at a time. That day-by-day
        journey, and the columns you move by hand, is the{" "}
        <a href="/workflows/key-workflows/during-intro-offer">During Intro Offer</a>{" "}
        page.
      </p>
    </PageLayout>
  )
}
