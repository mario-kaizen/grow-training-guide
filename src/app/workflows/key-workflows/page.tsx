import { PageLayout } from "@/components/PageLayout"
import { JourneyMap } from "@/components/JourneyMap"

export default function KeyWorkflows() {
  return (
    <PageLayout
      title="Key Workflows"
      description="The workflows that matter most, grouped by where a contact is in their journey."
      slug="/workflows/key-workflows"
    >
      <p>
        The previous three sections covered the building blocks of
        workflows: triggers start them, actions execute steps, and
        conditions route contacts down the right path. This section puts
        it all together by walking through the actual workflows that run
        your location every day.
      </p>

      <p>
        Instead of listing all 300+ workflows, these pages focus on the
        ones that directly affect your contacts. They are organized by
        where a contact is in their journey with STRONG:
      </p>

      <JourneyMap />

      <table>
        <thead>
          <tr>
            <th>Stage</th>
            <th>What happens</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong><a href="/workflows/key-workflows/new-leads">New Leads</a></strong></td>
            <td>A lead arrives from the website, a Facebook ad, or Core. Workflows send the first SMS, notify the studio, create a pipeline opportunity, and start the follow-up sequence.</td>
          </tr>
          <tr>
            <td><strong><a href="/workflows/key-workflows/new-intro-offers">New Intro Offers</a></strong></td>
            <td>A contact purchases an intro offer. Workflows detect the purchase, set up their pipeline card, send the welcome email and SMS, and prepare the day-by-day tracking.</td>
          </tr>
          <tr>
            <td><strong><a href="/workflows/key-workflows/during-intro-offer">During Intro Offer</a></strong></td>
            <td>The contact is in their intro offer period. Workflows track each visit, send timed check-ins, nudge booking if they have not attended, and trigger the membership upsell near the end.</td>
          </tr>
          <tr>
            <td><strong><a href="/workflows/key-workflows/membership-journey">Membership Journey</a></strong></td>
            <td>The contact has converted to a membership. Workflows run the 60-day onboarding nurture, celebrate attendance milestones, handle birthdays, detect absences, and manage status changes.</td>
          </tr>
          <tr>
            <td><strong><a href="/workflows/key-workflows/system-workflows">System Workflows</a></strong></td>
            <td>Behind-the-scenes utilities that run at every stage: assigning users, stamping dates, sending internal notifications, handling DND opt-outs, and marking sales across pipelines.</td>
          </tr>
        </tbody>
      </table>

      <p>
        Each page explains which workflows are involved, what they do step
        by step, and how they connect to each other. You do not need to
        memorize these. The goal is to give you enough understanding to
        know what automated messages your contacts are receiving, where to
        look when something seems off, and what to flag to HQ when
        something needs adjusting.
      </p>
    </PageLayout>
  )
}
