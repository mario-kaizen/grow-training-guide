import { PageLayout } from "@/components/PageLayout"
import { Callout } from "@/components/Callout"
import { Screenshot } from "@/components/Screenshot"

export default function EmailTemplates() {
  return (
    <PageLayout
      title="Email Templates"
      description="Pre-built email designs used across workflows and campaigns."
      slug="/email-templates"
    >
      <p>
        Email templates are the designed, branded emails that your workflows
        and campaigns send to contacts. Unlike SMS snippets which are plain
        text, email templates use a drag-and-drop visual builder with
        images, buttons, layout blocks, and styled text. The template
        account currently has over 300 email templates covering lead
        nurture, intro offer journeys, membership communications, brand
        storytelling, appointment confirmations, and campaign promotions.
      </p>

      <h2>Where to find them</h2>

      <p>
        Email templates live in <strong>Marketing &gt; Emails</strong>.
        From there you can browse all templates, search by name, and open
        the visual builder to preview or edit any template. Each template
        shows its name, subject line, and when it was last modified.
      </p>

      <Screenshot
        src="/screenshots/grow-email-templates-page.png"
        alt="The Email Marketing page at Marketing > Emails > Templates. The sidebar shows Marketing highlighted, the top nav shows the Emails tab selected, and the Templates sub-tab is active. The template list shows folders including 00. 2026 STRONG Intro Offer workflow emails, 00. 60 Day Member Journey, and 2026 1000 Rep Challenge, with columns for Title, Type, Updated On, and Updated By. Create Folder and New buttons are in the top right."
        caption="Email templates at Marketing > Emails > Templates. Templates are organized into folders by campaign or journey type."
      />

      <h2>How email templates connect to workflows</h2>

      <p>
        Just like SMS snippets, email templates are referenced by workflows.
        When a workflow includes a &ldquo;Send Email&rdquo; action, it
        points to a specific email template. The workflow handles the
        timing, conditions, and audience. The template handles the content
        and design.
      </p>

      <Callout type="warning" title="Editing a template affects every workflow that uses it">
        <p>
          Changes to an email template apply everywhere it is referenced.
          If a template is used across multiple workflows, updating it once
          updates it in all of them. Check which workflows reference a
          template before making changes.
        </p>
      </Callout>

      <h2>From address and from name</h2>

      <p>
        Every email template has a <strong>From Name</strong> and{" "}
        <strong>From Email</strong> configured. These determine who the
        email appears to come from when it lands in the contact&apos;s
        inbox. Most templates use the location&apos;s general email address
        and studio name, but some use custom values or the logged-in
        user&apos;s details. If a contact replies to an automated email,
        the reply comes back into the Conversations inbox.
      </p>

      <h2>Template categories</h2>

      <p>
        The email templates in the template account fall into functional
        groups. Understanding these helps you know what automated emails
        your contacts are receiving and where to look when you need to
        review or update one.
      </p>

      <h3>Appointment confirmations</h3>

      <p>
        Sent when a contact books, cancels, or is about to attend a
        scheduled appointment or consultation.
      </p>

      <table>
        <thead>
          <tr>
            <th>Template</th>
            <th>When it sends</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Immediate Confirmation Email</td>
            <td>Right after booking an appointment</td>
          </tr>
          <tr>
            <td>24 Hour Confirmation Email</td>
            <td>Reminder sent 24 hours before the appointment</td>
          </tr>
          <tr>
            <td>Cancelled Confirmation Email</td>
            <td>When an appointment is cancelled</td>
          </tr>
        </tbody>
      </table>

      <h3>Intro offer and STRONG Experience nurture</h3>

      <p>
        A sequence of emails that guides contacts through their trial
        period. Each email is timed to a specific point in the journey and
        builds on the last.
      </p>

      <table>
        <thead>
          <tr>
            <th>Template</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>STRONG Intro Offer Email 1</td>
            <td>Welcome email after purchasing the intro offer</td>
          </tr>
          <tr>
            <td>STRONG Intro Offer Email 2 &ndash; Meet the Rowformer</td>
            <td>Introduces the equipment and builds excitement before first class</td>
          </tr>
          <tr>
            <td>Email &ndash; Intro Offer Complete</td>
            <td>Sent when the intro offer period ends</td>
          </tr>
          <tr>
            <td>Email &ndash; Membership Upsell</td>
            <td>Nudges conversion from intro offer to full membership</td>
          </tr>
          <tr>
            <td>Want more STRONG?</td>
            <td>Follow-up for contacts who completed a trial but have not converted</td>
          </tr>
        </tbody>
      </table>

      <Callout type="tip" title="Regional variants">
        <p>
          Many intro offer and experience templates have regional variants
          with different pricing, currency, and links. When reviewing
          these, make sure you are looking at the variant that matches your
          location&apos;s region.
        </p>
      </Callout>

      <h3>Brand and content emails</h3>

      <p>
        These are not tied to a specific action. They tell the STRONG story
        and build connection with the brand. Workflows drip these to new
        contacts over time.
      </p>

      <table>
        <thead>
          <tr>
            <th>Template</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>STRONG Brand Story</td>
            <td>The origin and philosophy behind STRONG Pilates</td>
          </tr>
          <tr>
            <td>Class Types</td>
            <td>Overview of the different class formats available</td>
          </tr>
          <tr>
            <td>Behind the Programming</td>
            <td>How STRONG designs its workout programming</td>
          </tr>
          <tr>
            <td>More Than Pilates</td>
            <td>Positioning STRONG as a full training system</td>
          </tr>
          <tr>
            <td>Training for Longevity</td>
            <td>Long-term fitness and health benefits</td>
          </tr>
        </tbody>
      </table>

      <h3>Membership communications</h3>

      <table>
        <thead>
          <tr>
            <th>Template</th>
            <th>When it sends</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Welcome to the STRONG Family</td>
            <td>After converting to a full membership</td>
          </tr>
          <tr>
            <td>Your STRONG Membership</td>
            <td>Onboarding information for new members</td>
          </tr>
          <tr>
            <td>Milestones</td>
            <td>Celebrating attendance milestones</td>
          </tr>
          <tr>
            <td>Feedback Survey</td>
            <td>Requesting feedback after a set period of membership</td>
          </tr>
          <tr>
            <td>Free Class Credit</td>
            <td>Rewarding members for leaving a Google review</td>
          </tr>
        </tbody>
      </table>

      <h3>Presale emails</h3>

      <p>
        Used for locations that have not opened yet. These build anticipation
        and drive early registrations.
      </p>

      <table>
        <thead>
          <tr>
            <th>Template</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>PS1 &ndash; New Lead Coming Soon</td>
            <td>First email to presale leads</td>
          </tr>
          <tr>
            <td>PS3 &ndash; New Lead STRONG VIP</td>
            <td>VIP registration confirmation</td>
          </tr>
          <tr>
            <td>PSB &ndash; What to Expect</td>
            <td>Pre-opening broadcast about what the studio will offer</td>
          </tr>
          <tr>
            <td>PSB &ndash; Meet Your Workout Partner</td>
            <td>Introduces the Rowformer and Bikeformer equipment</td>
          </tr>
        </tbody>
      </table>

      <h3>Campaign and promotional emails</h3>

      <p>
        The largest group by volume. These are created for specific
        campaigns and deployed via snapshot. Common campaign types include:
      </p>

      <ul>
        <li>
          <strong>BFCM (Black Friday/Cyber Monday):</strong>{" "} multi-email
          sequence with regional pricing variants
        </li>
        <li>
          <strong>EOFY (End of Financial Year):</strong>{" "} discount
          campaigns for Australian locations
        </li>
        <li>
          <strong>STRONG Week:</strong>{" "} an 8-day email sequence with
          daily content and promotions
        </li>
        <li>
          <strong>Starter/Re-Starter:</strong>{" "} 7-email sequence for
          new lead acquisition and lapsed member re-engagement
        </li>
      </ul>

      <p>
        Campaign emails follow the same naming pattern as SMS snippets:
        date prefix, region, sequence number, and audience. For example,{" "}
        <code>Email 2 | AUS | Lapsed | 5 SESSIONS 50% OFF</code>{" "} is
        the second email in the sequence, for Australian locations,
        targeting lapsed members, promoting the 50% off 5-session offer.
      </p>

      <h2>The email builder</h2>

      <p>
        When you open a template for editing, you see the drag-and-drop
        visual builder. This is where you can update text, swap images,
        change button links, and adjust the layout. The builder works with
        blocks that you can rearrange, duplicate, or delete.
      </p>

      <p>
        Key things to know about the builder:
      </p>

      <ul>
        <li>
          <strong>Custom values work in email templates too.</strong>{" "}
          Placeholders like{" "}
          <code>{`{{custom_values.location_short}}`}</code>{" "} and{" "}
          <code>{`{{contact.first_name}}`}</code>{" "} can be inserted into
          any text block. They render with the real values when the email
          sends.
        </li>
        <li>
          <strong>Images are stored in Media Storage.</strong>{" "} Any
          images used in email templates are pulled from your Media Storage
          section. If an image appears broken, check whether the file
          still exists in Media Storage.
        </li>
        <li>
          <strong>Subject lines support custom values.</strong>{" "} You can
          personalize subject lines with contact fields (e.g. &ldquo;Hey{" "}
          {`{{contact.first_name}}`}, your STRONG journey starts
          now&rdquo;).
        </li>
      </ul>

      <h3>Template Settings: subject line and preview text</h3>

      <p>
        Every email template has settings that control what the recipient
        sees <em>before</em> they open the email. To access these, click the{" "}
        <strong>three dots</strong> in the top right of the builder, then
        click <strong>Settings</strong>.
      </p>

      <Screenshot
        src="/screenshots/grow-email-builder-settings-menu.png"
        alt="The email builder for PS1 Nurture 2 What to Expect, with the three-dot menu open in the top right. The dropdown shows four options: Test Email, See Version History, Settings (highlighted with a red box), and Sync changes. The Preview and Save Template buttons are visible next to the menu."
        caption="Click the three dots in the top right of the builder, then select Settings to access the template&apos;s subject line and preview text."
      />

      <p>
        The Template Settings panel has four fields you should always check:
      </p>

      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>What it controls</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>From Name</strong></td>
            <td>Who the email appears to come from (e.g. &ldquo;Strong Pilates{" "}
            {`{{custom_values.location_short}}`}&rdquo;)</td>
          </tr>
          <tr>
            <td><strong>From Email</strong></td>
            <td>The reply-to address (e.g. {`{{location.email}}`})</td>
          </tr>
          <tr>
            <td><strong>Email Subject</strong></td>
            <td>The subject line the recipient sees in their inbox</td>
          </tr>
          <tr>
            <td><strong>Preview Text</strong></td>
            <td>The short text shown after the subject line in most email clients</td>
          </tr>
        </tbody>
      </table>

      <Screenshot
        src="/screenshots/grow-email-builder-template-settings.png"
        alt="The Template Settings panel open on the right side of the email builder. Four fields are shown: From Name set to Strong Pilates with a custom value placeholder, From Email set to a location email placeholder, Email Subject reading What the first 45 minutes actually feel like, and Preview Text reading It is not what you would expect from a Pilates studio. The Email Subject and Preview Text fields are highlighted with a red box."
        caption="Template Settings showing the subject line and preview text. These are what recipients see in their inbox before opening the email."
      />

      <Callout type="important" title="Always set the subject line and preview text">
        <p>
          When editing or reviewing any email template, open the Template
          Settings and confirm the subject line and preview text are filled
          in and match the email content. A missing or outdated subject line
          makes the email look unprofessional and reduces open rates. The
          preview text is the short line that appears after the subject in
          most inbox apps. If left blank, email clients will pull the first
          line of body text instead, which is often a placeholder or
          &ldquo;View in browser&rdquo; link.
        </p>
      </Callout>

      <h2>Common mistakes</h2>

      <ul>
        <li>
          <strong>Editing the wrong regional variant.</strong>{" "} Many
          templates have multiple versions for different regions. If you
          edit the AUS version thinking it applies to all locations, the
          UK, US, and EU versions will be unchanged. Check the template
          name carefully.
        </li>
        <li>
          <strong>Broken images after a snapshot.</strong>{" "} When a
          snapshot is deployed to your location, email templates come
          with the images from the template account. If the image URLs
          reference the template account&apos;s media storage, they should
          still work. But if you delete images from your own Media Storage
          that a template references, the images will break.
        </li>
        <li>
          <strong>Forgetting to update the subject line and preview text.</strong>
          {" "} When editing email content, people often update the body but
          forget that the subject line and preview text also need to match
          the new content. Open Template Settings every time you edit a
          template.
        </li>
        <li>
          <strong>Creating a new template instead of editing.</strong>
          {" "} Just like with SMS snippets, workflows reference templates
          by ID. If you create a new template and delete the old one, the
          workflow will break. Always edit the existing template.
        </li>
      </ul>
    </PageLayout>
  )
}
