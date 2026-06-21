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
          Because every studio runs from one central template, the workflows,
          emails, and automations are built and maintained centrally, not inside
          your individual account. If something is not behaving the way you
          expect, that is why changes go through support rather than being edited
          studio by studio.
        </p>
      </Callout>

      <h2>Need more help?</h2>

      <p>
        This guide covers the day to day of Grow. If you are still stuck, or
        something is not behaving the way it should, support is one email away.
        Email{" "}
        <a href="mailto:grow@strongpilates.co">grow@strongpilates.co</a>{" "}
        and the team will help you sort it out.
      </p>

      <Callout type="tip" title="How to send a support request that gets solved fast">
        <p>The clearer your email, the quicker it gets fixed. Try to include:</p>
        <ul>
          <li>
            <strong>Your studio name.</strong>{" "} So the team knows exactly
            which account to open.
          </li>
          <li>
            <strong>What is happening.</strong>{" "} A plain description of the
            problem, and what you expected to happen instead.
          </li>
          <li>
            <strong>Where it is happening.</strong>{" "} The contact, workflow,
            pipeline, or page involved. Copy the link straight from Grow and
            paste it in wherever you can, so the team lands on the exact spot.
          </li>
          <li>
            <strong>A screenshot.</strong>{" "} If something looks wrong on
            screen, a picture saves a lot of back and forth.
          </li>
          <li>
            <strong>When it started.</strong>{" "} If it used to work, roughly
            when it changed.
          </li>
        </ul>
        <p>
          A request like &ldquo;STRONG Coffs Harbour: this contact (link) is
          stuck in the Day 2 column and should have moved after their second
          visit&rdquo; gets actioned far faster than &ldquo;a member
          isn&rsquo;t showing up right.&rdquo;
        </p>
      </Callout>
    </PageLayout>
  )
}
