import { PageLayout } from "@/components/PageLayout"
import { Callout } from "@/components/Callout"
import { Screenshot } from "@/components/Screenshot"

export default function NavigatingGrow() {
  return (
    <PageLayout
      title="Navigating Grow"
      description="The main menus, dashboard, and what each section does."
      slug="/navigating-grow"
    >
      <p>
        When you first log in to Grow, you will see the{" "}
        <strong>main navigation menu</strong>{" "} on the left side of the screen.
        This is your primary way of moving between sections. Some pages also have
        a secondary menu at the top (sometimes called the{" "}
        <strong>toolbox</strong> or <strong>sub menu</strong>) with additional
        options specific to that section.
      </p>

      <Screenshot
        src="/screenshots/grow-main-navigation.png"
        alt="The Grow main navigation menu showing the Dashboard, Conversations, Calendars, Contacts, and Opportunities above the dividing line, and Marketing, Automation, Sites, Media Storage, Reputation, and Reporting below it."
        caption="The main navigation menu with the dividing line between daily sections and configuration sections."
      />

      <Callout type="tip" title="Naming convention">
        <p>
          Throughout this guide, we refer to the left sidebar as the{" "}
          <strong>main navigation menu</strong>{" "} and any horizontal menu at the
          top of a page as the <strong>toolbox</strong> or{" "}
          <strong>sub menu</strong>.
        </p>
      </Callout>

      <h2>Above the line vs below the line</h2>

      <p>
        You will notice a dividing line in the main navigation menu. This is a
        useful mental model for how to think about Grow.
      </p>

      <p>
        <strong>Everything above the line</strong>{" "} is what you should be
        looking at and operating in daily, if not multiple times a day. These are
        the sections where active work happens.
      </p>

      <p>
        <strong>Everything below the line</strong>{" "} is what makes the sections
        above the line work. These are the configuration and setup areas that
        power your daily operations.
      </p>

      <h2>Daily sections (above the line)</h2>

      <h3>Conversations</h3>
      <p>
        This is where all of your communications live in one place. SMS, email,
        Instagram DMs, Facebook messages, and Google messages all feed into a
        single conversation pane. Instead of switching between different apps and
        platforms, you can see and respond to everything from here.
      </p>
      <p>
        Beyond just reading messages, you can also see a contact&rsquo;s notes,
        their past behavior, and their history. This gives you context for
        coaching current members and following up with leads effectively.
      </p>

      <h3>Calendars</h3>
      <p>
        The calendar section shows availability for any calendar booking links
        that have been set up. This is where you manage scheduled appointments and
        consultations.
      </p>

      <h3>Contacts</h3>
      <p>
        Most people think of contacts as just a database of names and emails. It
        is much more than that. The contacts section is where you create and
        manage <strong>Smart Lists</strong>, which are dynamic, auto-updating
        segments of your database.
      </p>
      <p>
        Unlike traditional email marketing where you upload a spreadsheet every
        time you want to send something, Smart Lists update automatically based
        on the rules you set and the data flowing in from the Core integration.
        You can see in real time your current members, active promotions, past
        members, suspended members, and contacts at each pipeline stage.
      </p>

      <h3>Opportunities</h3>
      <p>
        This is your <strong>pipeline view</strong>{" "} and it is the section you
        should be checking multiple times a day. Opportunities show you where
        every lead sits in their journey, from first contact through to
        conversion. We will cover how to manage your pipeline correctly in the{" "}
        <a href="/pipelines">Pipelines and Opportunities</a>{" "} section so that
        you always have the right leads at the right stages.
      </p>

      <h2>Configuration sections (below the line)</h2>

      <h3>Marketing</h3>
      <p>
        Contains your social planner, email campaigns, SMS snippets, and email
        templates. This is where the content that powers your communications
        lives.
      </p>

      <h3>Automation</h3>
      <p>
        The engine that makes everything move automatically. Workflows live here,
        handling things like automated pipeline movements and triggered messages.
        This is covered in depth in the{" "}
        <a href="/workflows">Workflows</a>{" "} section.
      </p>

      <h3>Sites</h3>
      <p>
        Landing pages, websites, analytics, blogs, forms, surveys, and the chat
        widget all live here. HQ typically manages the landing pages for you, but
        this is where they are housed if you ever need to reference them.
      </p>

      <h3>Media Storage</h3>
      <p>
        All images used in your emails and landing pages are stored here. You can
        also grab direct links to files like PDFs if you need to send them to
        your audience.
      </p>

      <h3>Reputation</h3>
      <p>
        A centralized view of your Google and Facebook reviews. You can see and
        manage all reviews from this section.
      </p>

      <h3>Reporting</h3>
      <p>
        If you handle calls through Grow, this is where the call reports and core
        analytics live.
      </p>

      <h2>Settings you need to configure</h2>

      <p>
        Before you start using Grow day to day, there are several settings that
        need to be configured correctly. Skipping these steps is one of the most
        common reasons things break or behave unexpectedly.
      </p>

      <h3>Business Profile</h3>
      <p>
        Make sure your business name, address, and details are set up correctly.
        This information gets pulled into communications and forms.
      </p>

      <h3>Time Zone</h3>
      <p>
        Critical for scheduled communications. If your time zone is wrong, your
        automated messages will fire at the wrong time.
      </p>

      <h3>User Profile and Email</h3>
      <p>
        You need to be logged in with your location&rsquo;s email address. This
        ensures outgoing emails come from the right sender. Your Google Calendar
        also needs to be connected through this email for booking integrations to
        work.
      </p>

      <h3>Phone Numbers</h3>
      <p>
        Verify that your phone number is set up correctly, including call
        forwarding settings. If call forwarding does not reach the main number,
        check whether staff members need to be excluded from the forwarding
        chain.
      </p>

      <h3>Integrations</h3>
      <p>
        To get the full power of Grow, you need your integrations configured.
        This is what allows SMS, email, Instagram, Facebook, and Google messages
        to all flow into the single Conversations pane. Without these
        integrations connected, you will not see messages from those channels.
      </p>

      <h3>Facebook Form Fields Mapping</h3>

      <Callout type="warning" title="Do this before using Facebook forms in workflows">
        <p>
          If you are running Facebook lead ads, the forms must be mapped in the{" "}
          <strong>Facebook Form Fields Mapping</strong>{" "} section of your
          settings before you use them as a trigger in any workflow. Many people
          skip this step, set up a Facebook form as a workflow trigger, and then
          wonder why leads are not coming through. The form needs to be mapped
          first.
        </p>
      </Callout>

      <h3>Custom Values</h3>
      <p>
        Custom values are dynamic placeholders that get replaced with real
        information in your SMS and email communications. Things like your
        website URL and app URL are stored as custom values. If these are left
        empty, they will appear as blank spaces in your messages. Make sure every
        custom value relevant to your location is filled in. We cover this in
        detail in the{" "}
        <a href="/custom-fields-vs-values">Custom Fields vs Custom Values</a>
        {" "} section.
      </p>
    </PageLayout>
  )
}
