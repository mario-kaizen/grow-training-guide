import { PageLayout } from "@/components/PageLayout"
import { Callout } from "@/components/Callout"
import { Screenshot } from "@/components/Screenshot"

export default function WhatIsGrow() {
  return (
    <PageLayout
      title="What is Grow?"
      description="The CRM platform behind every STRONG Pilates location."
      slug="/what-is-grow"
    >
      <p>
        <strong>Grow</strong>{" "} is a CRM (Customer Relationship Management)
        platform built specifically for STRONG Pilates studios. Every STRONG
        Pilates location has its own Grow account where leads, communications,
        and automations are managed.
      </p>

      <p>
        If Core is where the studio <em>operates</em>{" "} (bookings, check-ins,
        memberships), Grow is where the studio <em>communicates</em>{" "}
        (SMS, email, lead follow-up, nurture sequences, campaigns).
      </p>

      <Screenshot
        src="/screenshots/grow-dashboard.png"
        alt="The Grow dashboard showing the left sidebar navigation with Dashboard, Conversations, Calendars, Contacts, and Opportunities above the dividing line, and Marketing, Automation, Sites, Media Storage, Reputation, and Reporting below it. The main content area shows pipeline and conversion widgets."
        caption="The Grow dashboard with the main navigation sidebar and reporting widgets."
      />

      <h2>What Grow handles</h2>

      <ul>
        <li>
          <strong>Lead management:</strong>{" "} capturing and tracking every
          person who shows interest in a studio
        </li>
        <li>
          <strong>Pipelines:</strong>{" "} visual boards that show where each
          contact sits in their journey (lead, trial, member)
        </li>
        <li>
          <strong>Automated communication:</strong>{" "} SMS and email
          sequences that fire based on what a contact does (or doesn&rsquo;t do)
        </li>
        <li>
          <strong>Workflows:</strong>{" "} the automation engine that moves
          contacts through pipelines, sends messages, and triggers actions
        </li>
        <li>
          <strong>Campaign rollouts:</strong>{" "} promotional offers that get
          deployed across multiple studios at once
        </li>
      </ul>

      <h2>The template account</h2>

      <p>
        STRONG Pilates doesn&rsquo;t build workflows from scratch for each of
        its 142+ locations. Instead, everything is built inside a
        single <strong>template account</strong>. This is the master blueprint
        that contains all the workflows, email templates, SMS snippets,
        pipelines, and automation logic.
      </p>

      <p>
        When a new studio opens or a campaign launches, the relevant pieces from
        the template get deployed (via a &ldquo;snapshot&rdquo;) to each
        individual studio account. This means every location runs the same
        system, with minor adjustments for things like currency, region, and
        WhatsApp availability.
      </p>

      <Callout type="tip" title="Why this matters">
        <p>
          When you&rsquo;re troubleshooting or building something new, the
          template account is always the starting point. Changes are made there
          first, then pushed out to locations. You rarely build directly inside a
          studio&rsquo;s account.
        </p>
      </Callout>

      <h2>Who manages Grow?</h2>

      <p>
        Kaizen Collective is the agency partner responsible for the entire Grow
        ecosystem across all STRONG Pilates locations. This includes maintaining
        workflows, deploying campaigns, handling Zendesk support tickets, and
        coordinating with Hapana&rsquo;s development team when system-level
        changes are needed.
      </p>
    </PageLayout>
  )
}
