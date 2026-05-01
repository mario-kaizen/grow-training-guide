import { PageLayout } from "@/components/PageLayout"
import { Callout } from "@/components/Callout"
import { Screenshot } from "@/components/Screenshot"

export default function SmsSnippets() {
  return (
    <PageLayout
      title="SMS Snippets"
      description="Pre-written SMS templates that workflows and team members use to communicate."
      slug="/sms-snippets"
    >
      <p>
        SMS snippets are pre-written message templates stored in your Grow
        account. They serve two purposes: workflows reference them to send
        automated messages, and you can insert them manually when replying to
        contacts in the Conversations inbox. The template account currently
        has over 240 snippets covering lead follow-up, intro offer nurture,
        call booking, membership communications, and campaign promotions.
      </p>

      <h2>Where to find them</h2>

      <p>
        Snippets live in two places:
      </p>

      <ul>
        <li>
          <strong>Conversations &gt; Snippets tab:</strong>{" "} the sub-menu
          at the top of the Conversations page has a Snippets link. This is
          where you browse, edit, and manage all snippets.
        </li>
        <li>
          <strong>Insert Snippet button:</strong>{" "} when composing a
          message in the Conversations inbox, click{" "}
          <strong>Insert Snippet</strong> to search and select a snippet.
          The message body populates the compose area and you can send it
          as is or edit before sending.
        </li>
      </ul>

      <Screenshot
        src="/screenshots/grow-snippets-page.png"
        alt="The Snippets page inside Conversations showing the All Snippets tab with a table listing snippet names, body previews, folder, type, and date updated. Visible entries include STRONG Re-Starter SMS, Account No Purchase, First Time Booking SMS, Lead Website Submission, and campaign snippets. The Snippets tab is highlighted in the sub-menu alongside Conversations, Manual Actions, Trigger Links, Analytics, and Settings."
        caption="The Snippets page at Conversations > Snippets. Browse, search, and manage all your SMS templates from here."
      />

      <h2>How snippets connect to workflows</h2>

      <p>
        Most snippets are not just for manual use. Workflows reference
        snippets by name as the content for their SMS actions. When a
        workflow fires and sends an SMS, it pulls the message body from the
        linked snippet.
      </p>

      <Callout type="warning" title="Editing a snippet affects workflows">
        <p>
          If you change the text of a snippet, that change applies
          everywhere the snippet is used, including automated workflows.
          Before editing, consider whether the snippet is referenced by a
          workflow. If unsure, check the workflow first.
        </p>
      </Callout>

      <h2>Custom values inside snippets</h2>

      <p>
        Snippets use custom values and contact fields to personalize each
        message. The most common placeholders you will see:
      </p>

      <table>
        <thead>
          <tr>
            <th>Placeholder</th>
            <th>What it becomes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>{`{{contact.first_name}}`}</code></td>
            <td>The contact&apos;s first name</td>
          </tr>
          <tr>
            <td><code>{`{{custom_values.fromname_lead}}`}</code></td>
            <td>The staff name used in lead messages</td>
          </tr>
          <tr>
            <td><code>{`{{custom_values.fromname_member}}`}</code></td>
            <td>The staff name used in member messages</td>
          </tr>
          <tr>
            <td><code>{`{{custom_values.location_short}}`}</code></td>
            <td>The studio&apos;s short name (e.g. &ldquo;Melbourne CBD&rdquo;)</td>
          </tr>
          <tr>
            <td><code>{`{{custom_values.strong_intro_offer_price}}`}</code></td>
            <td>The current intro offer price for that location</td>
          </tr>
          <tr>
            <td><code>{`{{custom_values.google_review_url}}`}</code></td>
            <td>Direct link for Google reviews</td>
          </tr>
        </tbody>
      </table>

      <p>
        If any of these custom values are empty in your location&apos;s
        settings, the placeholder will render as blank in the message. See
        the{" "}
        <a href="/custom-fields-vs-values">Custom Fields vs Custom Values</a>
        {" "} page for how to check and fill these in.
      </p>

      <h2>Snippet categories</h2>

      <p>
        The snippets in the template account fall into several functional
        groups. You do not need to memorize all of them, but understanding
        the categories helps you find the right snippet when you need it and
        understand what automated messages your contacts are receiving.
      </p>

      <h3>Lead follow-up</h3>

      <p>
        These fire when a new lead enters the system, whether from a website
        form, Facebook ad, or account creation in Core. They introduce the
        studio and open a conversation.
      </p>

      <table>
        <thead>
          <tr>
            <th>Snippet</th>
            <th>When it sends</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>04. Lead &ndash; Website Submission SMS</td>
            <td>Immediately after a lead fills out a website enquiry form</td>
          </tr>
          <tr>
            <td>01. Account No Purchase</td>
            <td>When someone creates an account in Core but has not purchased anything</td>
          </tr>
          <tr>
            <td>Lead &ndash; SE &ndash; Call No Answer 1/2/3</td>
            <td>After each failed call attempt to a lead</td>
          </tr>
        </tbody>
      </table>

      <p>
        Example message (04. Lead &ndash; Website Submission):
      </p>

      <blockquote>
        <p>
          Hi {`{{contact.first_name}}`}, thanks for enquiring with STRONG
          Pilates {`{{custom_values.location_short}}`}.{" "}
          {`{{custom_values.fromname_lead}}`} here. I&apos;ll touch base with
          you shortly to help answer any questions you might have.
        </p>
      </blockquote>

      <h3>Call booking</h3>

      <p>
        Sent when a lead books, cancels, or misses a phone call consultation.
      </p>

      <table>
        <thead>
          <tr>
            <th>Snippet</th>
            <th>When it sends</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Call Booked &ndash; Confirmation</td>
            <td>Immediately after booking a call</td>
          </tr>
          <tr>
            <td>Call Booked &ndash; 1 hr reminder</td>
            <td>One hour before the scheduled call</td>
          </tr>
          <tr>
            <td>Call Booked &ndash; Cancelled</td>
            <td>When the appointment is cancelled</td>
          </tr>
          <tr>
            <td>Call Booked &ndash; No Show</td>
            <td>When the lead misses the call</td>
          </tr>
        </tbody>
      </table>

      <h3>Intro offer journey</h3>

      <p>
        These guide a contact through their intro offer experience, from
        purchase to completion. Each message is timed to a specific stage in
        the journey.
      </p>

      <table>
        <thead>
          <tr>
            <th>Snippet</th>
            <th>When it sends</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>STRONG Intro Offer</td>
            <td>After purchasing the intro offer</td>
          </tr>
          <tr>
            <td>STRONG Intro Offer not booked</td>
            <td>If they have not booked their first class yet</td>
          </tr>
          <tr>
            <td>STRONG Intro Offer first class info</td>
            <td>Before their first class (arrival instructions)</td>
          </tr>
          <tr>
            <td>STRONG Intro Offer first class complete</td>
            <td>After completing their first class</td>
          </tr>
          <tr>
            <td>STRONG Intro Offer halfway</td>
            <td>Midway through the intro offer period</td>
          </tr>
          <tr>
            <td>STRONG Intro Offer want more STRONG</td>
            <td>Near the end of the offer, nudging membership conversion</td>
          </tr>
        </tbody>
      </table>

      <p>
        Example message (first class info):
      </p>

      <blockquote>
        <p>
          Hi {`{{contact.first_name}}`}. Welcome to STRONG{" "}
          {`{{custom_values.location_short}}`}. Please arrive 15 minutes
          before your class so your instructor can introduce you to the
          Rowformer/Bikeformer and get you set up. Bring a water bottle and
          a towel. See you there!
        </p>
      </blockquote>

      <h3>First visit and membership</h3>

      <p>
        Messages that fire after a contact completes their first class or
        joins as a member.
      </p>

      <table>
        <thead>
          <tr>
            <th>Snippet</th>
            <th>When it sends</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1st Visit &ndash; Completed (Intro To Strong)</td>
            <td>After first class on the intro offer</td>
          </tr>
          <tr>
            <td>1st Visit &ndash; Completed (Any other package)</td>
            <td>After first class on any non-intro package</td>
          </tr>
          <tr>
            <td>Welcome to membership</td>
            <td>When a contact converts to a full membership</td>
          </tr>
        </tbody>
      </table>

      <p>
        Example message (1st Visit &ndash; Completed):
      </p>

      <blockquote>
        <p>
          Hi {`{{contact.first_name}}`},{" "}
          {`{{custom_values.fromname_member}}`} here from STRONG. Well done
          on completing your first STRONG Pilates class today. How did you
          go?
        </p>
      </blockquote>

      <Callout type="tip" title="This is the message that uses FromName_Member">
        <p>
          If{" "} <code>FromName_Member</code>{" "} is not filled in for your
          location, this message will read &ldquo;(PLEASE ADD) Lead
          Manager/Staff Name here from STRONG&rdquo; instead of an actual
          name. See the{" "}
          <a href="/custom-fields-vs-values">Custom Fields vs Custom Values</a>
          {" "} page for how to fix this.
        </p>
      </Callout>

      <h3>Retention and engagement</h3>

      <table>
        <thead>
          <tr>
            <th>Snippet</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Survey / Survey reminder</td>
            <td>Sent a few weeks into membership asking for feedback</td>
          </tr>
          <tr>
            <td>Refer a Friend SMS</td>
            <td>Encourages members to refer friends for credit</td>
          </tr>
          <tr>
            <td>Free credit</td>
            <td>Offers a free class in exchange for a Google review</td>
          </tr>
        </tbody>
      </table>

      <h3>Campaign and promotional snippets</h3>

      <p>
        The largest group by volume. These are created for specific
        campaigns (BFCM, EOFY, STRONG Week, seasonal offers) and often have
        regional variants for different pricing and currency. You will see
        naming patterns like:
      </p>

      <ul>
        <li>
          <strong>Date prefix:</strong>{" "}
          <code>202511 | BFCM | SMS 1</code> tells you it is from
          November 2025 for Black Friday/Cyber Monday
        </li>
        <li>
          <strong>Region prefix:</strong>{" "}
          <code>AUS | SMS 1 | Lapsed | September Half Price</code> tells
          you the region, sequence number, audience, and campaign
        </li>
        <li>
          <strong>Sequence number:</strong>{" "} SMS 1, SMS 2, SMS 3
          indicate the order in the campaign drip sequence
        </li>
      </ul>

      <p>
        Campaign snippets are deployed via snapshot alongside the workflows
        that reference them. You typically do not need to create these
        yourself.
      </p>

      <h2>Editing snippets</h2>

      <p>
        To edit a snippet:
      </p>

      <ol>
        <li>Go to <strong>Conversations &gt; Snippets</strong></li>
        <li>Find the snippet you want to change</li>
        <li>Click the <strong>three dots</strong> and select{" "}
          <strong>Edit SMS</strong></li>
        <li>Make your changes and save</li>
      </ol>

      <Screenshot
        src="/screenshots/grow-snippet-editor.png"
        alt="The Edit Text Snippet modal showing the 03. First Time Booking SMS snippet. The body field contains the message text with custom value placeholders like {{contact.first_name}} and {{custom_values.location_short}} highlighted. A phone preview on the right shows how the message will appear to the recipient. The bottom shows approximate cost ($0.0415), character count (621 characters, 102 words, 5 segments), and options to add attachments or test the snippet."
        caption="The snippet editor with a phone preview. Custom value placeholders like {{custom_values.location_short}} (highlighted) render with real values when the message sends."
      />

      <p>
        Your changes take effect immediately. If the snippet is used in a
        workflow, the next time that workflow fires, it will use the updated
        text.
      </p>

      <Callout type="important" title="Do not rename snippets">
        <p>
          Workflows reference snippets by their internal ID, not by name.
          Renaming a snippet will not break anything, but creating a new
          snippet and deleting the old one will. If you need to update
          content, edit the existing snippet rather than replacing it.
        </p>
      </Callout>

      <h2>Common mistakes</h2>

      <ul>
        <li>
          <strong>Empty custom values in snippets.</strong>{" "} If a snippet
          uses{" "} <code>{`{{custom_values.location_short}}`}</code>{" "} and
          that value is blank for your location, the message will have a
          gap where the studio name should be. Check your custom values
          after every snapshot deployment.
        </li>
        <li>
          <strong>Hardcoded links in older snippets.</strong>{" "} Some older
          snippets use direct URLs like{" "}
          <code>link.strongpilates.co/strong-classes</code>{" "} instead of
          custom value placeholders. These work but are not
          location-specific. If you see one, leave it as is unless
          instructed otherwise by HQ.
        </li>
        <li>
          <strong>Regional variants sent to the wrong audience.</strong>
          {" "} Campaign snippets often have region-specific pricing baked
          into the text ($50, £49, 349,500 Rp). These are matched to
          specific workflows. If you are looking at a snippet and the
          pricing looks wrong, check whether it is the correct regional
          variant for your location.
        </li>
      </ul>
    </PageLayout>
  )
}
