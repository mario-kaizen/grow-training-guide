import { PageLayout } from "@/components/PageLayout"
import { Callout } from "@/components/Callout"
import { Screenshot } from "@/components/Screenshot"
import { StepByStep } from "@/components/StepByStep"

export default function Pipelines() {
  return (
    <PageLayout
      title="Pipelines & Opportunities"
      description="The visual boards that track where every contact sits in their journey."
      slug="/pipelines"
    >
      <p>
        Pipelines are visual boards that let you track where a contact is in a
        specific journey. Each pipeline is made up of stages (columns), and each
        contact inside a pipeline is represented by a card called an{" "}
        <strong>opportunity</strong>. As a contact progresses, their card moves
        from one stage to the next, either automatically through workflows or
        manually by you.
      </p>

      <p>
        Think of it like a kanban board. New leads start on the left, and as you
        make contact, book them in, and convert them, their card moves to the
        right. At a glance you can see exactly how many people are sitting in
        each stage and who needs attention.
      </p>

      <Screenshot
        src="/screenshots/grow-opportunities-page.png"
        alt="The Opportunities page showing the 01. Leads pipeline in board view with stage columns for New Lead, Call No Answer 1, and Call No Answer 2."
        caption="The Opportunities page with the Leads pipeline selected, showing the board view with stage columns."
      />

      <h2>Your pipelines</h2>

      <p>
        Every STRONG location comes with a set of default pipelines that are
        configured during account setup. Each one serves a different purpose.
      </p>

      <table>
        <thead>
          <tr>
            <th>Pipeline</th>
            <th>What it tracks</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>00. Leads &ndash; Presale</strong></td>
            <td>Leads for locations that have not opened yet. Tracks presale interest from initial signup through to opening day conversion. Only relevant during a presale period.</td>
          </tr>
          <tr>
            <td><strong>01. Leads</strong></td>
            <td>New enquiries from forms, Facebook lead ads, walk-ins, and other sources. This is where you manage your sales follow-up process.</td>
          </tr>
          <tr>
            <td><strong>02. Intro Offer</strong></td>
            <td>Members who have purchased an intro offer. Tracks their journey from purchase through to first booking, first visit, and conversion to a full membership.</td>
          </tr>
        </tbody>
      </table>

      <Callout type="warning" title="Do not modify the default pipeline stages">
        <p>
          The default stages in each pipeline are referenced by workflows and
          automations. Renaming, reordering, or deleting stages can break
          automated processes. If you need additional stages for your own
          tracking, you can add new ones, but leave the existing stages as they
          are.
        </p>
      </Callout>

      <h2>Opportunities vs contacts</h2>

      <p>
        An opportunity is not the same thing as a contact. A contact is the
        person and their data. An opportunity is a specific instance of that
        person inside a pipeline. One contact can have multiple opportunities
        across different pipelines, or even multiple opportunities in the same
        pipeline over time.
      </p>

      <p>
        For example, Sarah might have a lead opportunity in the Leads pipeline
        when she first enquires, and then an intro offer opportunity in the
        Intro Offer pipeline when she purchases. Both are linked to the same
        contact record.
      </p>

      <h2>Opportunity statuses</h2>

      <p>
        Every opportunity has a status that determines whether it shows up on
        your board:
      </p>

      <ul>
        <li>
          <strong>Open:</strong>{" "} the opportunity is active and visible on
          the board. This is the default.
        </li>
        <li>
          <strong>Won:</strong>{" "} the contact converted successfully. The card
          is hidden from the board by default to keep it clean.
        </li>
        <li>
          <strong>Lost:</strong>{" "} the contact did not convert. Also hidden
          from the board by default.
        </li>
        <li>
          <strong>Abandoned:</strong>{" "} the opportunity was left without a
          clear outcome. Hidden from the board.
        </li>
      </ul>

      <p>
        By default, your pipeline only shows <strong>open</strong>{" "}
        opportunities. If you want to see everything including won and lost
        cards, use the Advanced Filters and remove the status filter. This is
        useful when you need to review historical data, but keeping the filter
        on during daily use prevents the board from getting cluttered.
      </p>

      <h2>The board view vs the table view</h2>

      <p>
        Pipelines can be displayed in two ways:
      </p>

      <ul>
        <li>
          <strong>Board view (cards):</strong>{" "} the default view. Each stage
          is a column and each opportunity is a card you can drag between
          stages. Best for daily pipeline management where you want a visual
          sense of where everyone sits.
        </li>
        <li>
          <strong>Table view:</strong>{" "} looks like a spreadsheet. Shows all
          opportunities in rows with sortable columns. Better for reviewing
          large volumes of data or when you need to see specific fields across
          all opportunities at once.
        </li>
      </ul>

      <h2>Working the pipeline</h2>

      <p>
        When you click on a contact card in the pipeline, you have two options
        depending on where you click:
      </p>

      <ul>
        <li>
          <strong>Click the opportunity name</strong>{" "} (the blue text) to
          open their full contact record. This shows their conversation history,
          all their contact details, and custom field data.
        </li>
        <li>
          <strong>Click the white space</strong>{" "} on the card to open the
          opportunity detail panel. This shows information specific to that
          opportunity, like notes, tags, and the stage selector.
        </li>
      </ul>

      <Callout type="tip" title="Open contacts in a new tab">
        <p>
          Hold <strong>Cmd</strong> (Mac) or <strong>Ctrl</strong> (PC) and
          click the contact name to open their full record in a new tab. This
          way you can review their conversation history while keeping the
          pipeline view open.
        </p>
      </Callout>

      <Screenshot
        src="/screenshots/grow-opportunity-detail-panel.png"
        alt="The opportunity detail panel showing Contact Details (name, email, phone), Opportunity Details (Opportunity Name, Pipeline set to 01. Leads, Stage set to New Lead, Status set to Open, Opportunity Value of $50, Owner, Business Name, Opportunity Source), and sidebar tabs for Opportunity Details, Book/Update Appointment, Tasks, Notes, and Associated Objects. The footer shows Created By: Workflow."
        caption="The opportunity detail panel. This opens when you click the white space on a pipeline card, showing the stage selector, status, value, and tabs for tasks and notes."
      />

      <h3>Moving contacts between stages</h3>

      <p>
        There are two ways to move a contact to a different stage:
      </p>

      <ul>
        <li>
          <strong>Drag and drop:</strong>{" "} click and drag the card from one
          column to another.
        </li>
        <li>
          <strong>Stage selector:</strong>{" "} click the white space on the
          card to open the detail panel, then change the stage from the
          dropdown.
        </li>
      </ul>

      <p>
        Many stage changes happen automatically through workflows, but
        sometimes you will need to move cards manually. For example, after a
        phone call with a lead, you might move them from &ldquo;New
        Lead&rdquo; to &ldquo;Call No Answer&rdquo; or &ldquo;Call
        Connected&rdquo; depending on the outcome.
      </p>

      <h3>The calling process</h3>

      <p>
        Each opportunity card has quick action buttons: call, notes,
        conversations, and tags. When you are working through your pipeline,
        the call and notes buttons work together. Here is the process to
        follow for every call.
      </p>

      <StepByStep
        steps={[
          {
            title: "Click the call button on the card",
            content: (
              <p>
                Put your headset on first. Click the call icon on the
                opportunity card and it will start ringing immediately.
              </p>
            ),
          },
          {
            title: "Click the notes button while it is ringing",
            content: (
              <p>
                While the phone is ringing, click the notes button on the same
                card. This opens the notes panel so you are ready to type the
                moment the call connects.
              </p>
            ),
          },
          {
            title: "Write your notes based on the outcome",
            content: (
              <p>
                If they pick up, take notes during the conversation. If they
                do not pick up, type &ldquo;Called, no answer&rdquo; and save
                the note. Either way, you have a record of the attempt.
              </p>
            ),
          },
          {
            title: "Move the card to the correct stage",
            content: (
              <p>
                If they did not answer, manually drag the card to{" "}
                <strong>Call No Answer 1</strong>, then{" "}
                <strong>Call No Answer 2</strong>, then{" "}
                <strong>Call No Answer 3</strong>{" "} on subsequent attempts.
                This has to be done manually because Grow cannot distinguish
                between a voicemail and an actual pickup.
              </p>
            ),
          },
        ]}
      />

      <Screenshot
        src="/screenshots/pipeline-call-notes-buttons.png"
        alt="The 01. Leads pipeline showing two opportunity cards with action buttons at the bottom of each card. On the left card, the call button (phone icon) and notes button (document icon) are highlighted with red squares, showing the two buttons you click during the calling process."
        caption="The call button and notes button on a pipeline card. Click call first, then notes while it rings."
      />

      <Callout type="warning" title="Voicemail counts as a pickup">
        <p>
          When a call connects to voicemail, Grow treats it the same as
          someone answering the phone. It starts counting the call duration
          from the moment the voicemail greeting plays. This means there is no
          way to automate the &ldquo;no answer&rdquo; stage movement. You need
          to move the card manually every time someone does not pick up.
        </p>
      </Callout>

      <p>
        The other quick action buttons on each card:
      </p>

      <ul>
        <li>
          <strong>Conversations button:</strong>{" "} opens the SMS and email
          history with that contact.
        </li>
        <li>
          <strong>Tags:</strong>{" "} shows which tags are applied to the
          contact.
        </li>
      </ul>

      <h2>Adding opportunities manually</h2>

      <p>
        Most opportunities are created automatically by workflows when a lead
        submits a form, when the Core sync registers a new purchase, or when a
        contact meets certain criteria. But sometimes you need to add someone
        manually.
      </p>

      <h3>When to use the Add Opportunity button</h3>

      <ul>
        <li>
          <strong>Walk-ins:</strong>{" "} someone walks through the door and
          wants to learn more. They are not in your database yet, so you create
          a new contact and add them as an opportunity at the same time.
        </li>
        <li>
          <strong>Missed captures:</strong>{" "} a lead came through a channel
          that does not automatically create a pipeline opportunity (for
          example, a general contact form or a direct message on social media).
        </li>
        <li>
          <strong>Manual re-entry:</strong>{" "} you want to add an existing
          contact back into a pipeline for follow-up, and no workflow trigger
          covers that scenario.
        </li>
      </ul>

      <p>
        To add someone who is already in your database, click{" "}
        <strong>Add Opportunity</strong>, search for their name, and select
        them. To add someone entirely new, type their name and create a new
        contact record at the same time.
      </p>

      <h2>Managing your pipeline view</h2>

      <h3>Card layout</h3>

      <p>
        You can customize what information appears on each card using{" "}
        <strong>Manage Fields</strong>. By default, cards show fields like
        opportunity source, opportunity value, and business name. If you prefer
        a cleaner look, you can remove fields and switch to a compact card
        layout.
      </p>

      <h3>Sorting</h3>

      <p>
        Opportunities within each stage can be sorted by{" "}
        <strong>Created On</strong>{" "} (when the opportunity was created) or{" "}
        <strong>Last Updated</strong>{" "} (most recent activity). Choose the
        sort order that matches how you work. Created On puts the oldest leads
        at the top, which can be helpful for making sure no one falls through
        the cracks.
      </p>

      <h3>If your pipeline suddenly shows hundreds of contacts</h3>

      <p>
        Sometimes filters get accidentally cleared. When that happens, the
        pipeline will show every opportunity ever created, including won, lost,
        and abandoned cards. It can look overwhelming, but it is easy to fix.
      </p>

      <p>
        Click <strong>Advanced Filters</strong> at the top of the pipeline.
        Set the <strong>Status</strong> filter to <strong>Open</strong> and
        click <strong>Apply</strong>. This hides all the closed opportunities
        and returns the board to showing only the contacts you are actively
        working.
      </p>

      <Screenshot
        src="/screenshots/pipeline-advanced-filters-status.png"
        alt="The Opportunities page with the Advanced Filters panel open on the right. The Advanced Filters button is highlighted in the toolbar. Inside the panel, the Status filter is set to 'Is any of' with 'Open' selected. The Apply button is visible at the bottom right."
        caption="Click Advanced Filters, set Status to Open, and click Apply to restore your pipeline to showing only active contacts."
      />

      <h2>The Pipelines tab</h2>

      <p>
        In the top navigation of the Opportunities page, you will see a{" "}
        <strong>Pipelines</strong>{" "} tab alongside the main Opportunities
        tab. This is where you can view and edit the pipeline structure itself,
        including adding new stages. The Bulk Actions tab shows historical data
        for any bulk operations performed on opportunities.
      </p>

      <Callout type="important" title="Pipeline stages are tied to workflows">
        <p>
          Before adding, renaming, or removing any pipeline stage, check
          whether any workflows reference that stage. Workflow actions like
          &ldquo;Move to stage&rdquo; and workflow triggers like &ldquo;Stage
          changed to&rdquo; rely on exact stage names. Breaking that connection
          means contacts stop moving through the pipeline automatically.
        </p>
      </Callout>

      <h2>Visit count timing</h2>

      <p>
        In the Intro Offer pipeline, each card shows a visit count that tells
        you how many sessions a contact has attended. There are actually two
        places this number appears, and they update at different times.
      </p>

      <table>
        <thead>
          <tr>
            <th>Where</th>
            <th>What it shows</th>
            <th>When it updates</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Pipeline card</strong></td>
            <td>Visit count displayed on the card in the board view</td>
            <td>Once per day at 12:15 AM (your local time zone)</td>
          </tr>
          <tr>
            <td><strong>Intro Offer Pipeline Visits</strong>{" "} (contact profile)</td>
            <td>The custom field under Intro Offer Information on the contact record</td>
            <td>In real time</td>
          </tr>
        </tbody>
      </table>

      <p>
        If a member attends a class at 9 AM, the pipeline card will still show
        yesterday&apos;s visit count until the overnight update runs. But if
        you Cmd+click the card to open the full contact profile and scroll to
        the <strong>Intro Offer Pipeline Visits</strong>{" "} field, you will
        see the updated number immediately.
      </p>

      <Callout type="tip" title="When the numbers do not match">
        <p>
          If a member says they attended today but the pipeline card still
          shows the old count, check the contact profile field instead. The
          card will catch up after midnight. This is not a bug, it is how the
          system processes the overnight sync from Core.
        </p>
      </Callout>

      <h2>How contacts leave the pipeline</h2>

      <p>
        Contacts do not stay in the pipeline forever. There are a few ways a
        card gets removed from the board.
      </p>

      <ul>
        <li>
          <strong>Workflow conversion:</strong>{" "} when a lead purchases an
          intro offer, the workflow marks their leads pipeline opportunity as
          Won and creates a new opportunity in the Intro Offer pipeline.
        </li>
        <li>
          <strong>Manual removal:</strong>{" "} you can change the opportunity
          status to Won, Lost, or Abandoned to remove a card from the active
          board view.
        </li>
        <li>
          <strong>28-day auto-cleanup:</strong>{" "} if a lead sits in the
          Leads pipeline for 28 days without purchasing an intro offer, the
          system automatically removes their card from the pipeline. The
          contact stays in the database and will still receive any mass
          marketing campaigns you send. They just no longer appear on the
          pipeline board.
        </li>
      </ul>

      <Callout type="tip" title="Removed does not mean deleted">
        <p>
          When a contact is removed from the pipeline, either automatically
          or manually, their contact record stays in the database. You can
          still find them in Contacts, they still appear in Smart Lists if
          they match the criteria, and they will still receive any bulk
          emails or SMS campaigns you send. The pipeline is a working view,
          not the database itself.
        </p>
      </Callout>
    </PageLayout>
  )
}
