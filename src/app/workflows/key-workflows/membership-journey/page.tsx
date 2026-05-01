import { PageLayout } from "@/components/PageLayout"
import { Callout } from "@/components/Callout"
import { WorkflowCard } from "@/components/WorkflowCard"

export default function MembershipJourney() {
  return (
    <PageLayout
      title="Membership Journey"
      description="60-day nurture, milestones, retention, and birthdays."
      slug="/workflows/key-workflows/membership-journey"
    >
      <p>
        When a contact converts from an intro offer to a full
        membership, a new set of workflows takes over. These handle
        the long-term relationship: welcoming them as a member,
        building connection through a 60-day email nurture, celebrating
        attendance milestones, notifying the studio on birthdays, and
        managing lifecycle changes like suspensions and inactivity.
      </p>

      <h2>The 60-day member nurture</h2>

      <p>
        The centrepiece of the membership journey is a 60-day email
        sequence that runs automatically after someone becomes a
        member. It builds the relationship gradually: welcome, then
        tips on getting the most from their membership, then community
        (bring a friend), then brand depth, then feedback, and finally
        milestone and longevity content.
      </p>

      <WorkflowCard
        name="01. 60 Day Member Journey"
        purpose="A multi-week email and SMS nurture sequence for new members. Sends 8 emails and 2 SMS messages over approximately 60 days, spaced out with wait periods. Each message checks for DND status before sending."
        status="published"
        workflowUrl="https://grow.hapana.com/location/cGie31g8caN2HkP6vN2P/workflow/0244bf4c-857c-4511-842f-78585b19c1c5"
        steps={[
          {
            type: "wait",
            label: "Wait (failsafe)",
            detail: "Short pause for sync before checking fields.",
          },
          {
            type: "condition",
            label: "What is their Active Package Category?",
            detail: "Confirms they have a Membership (excluding recently suspended members). If they do not have an active membership, the workflow stops.",
          },
          {
            type: "condition",
            label: "Have they already gone through the 60 Day Member Nurture?",
            detail: "Checks for the '60 day member nurture' tag. If they already have it, the workflow exits to prevent duplicate sends.",
          },
          {
            type: "action",
            label: "Add tag: 60 day member nurture",
            detail: "Marks the contact so they only go through this sequence once.",
          },
          {
            type: "condition",
            label: "DND check",
            detail: "Checks if DND (Do Not Disturb) is enabled. If it is, the email is skipped. This check runs before every message in the sequence.",
          },
          {
            type: "action",
            label: "Send email: 'Welcome to the STRONG family'",
            detail: "The first email after becoming a member. Welcomes them to the community and sets expectations for what membership includes.",
          },
          {
            type: "wait",
            label: "Wait",
            detail: "Pauses before the next email.",
          },
          {
            type: "action",
            label: "Send email: 'Make the most of your STRONG membership'",
            detail: "Tips and guidance on getting the most value from their membership: booking ahead, trying different class types, using the app.",
          },
          {
            type: "wait",
            label: "Wait",
            detail: "Pauses before the next email.",
          },
          {
            type: "action",
            label: "Send email: 'Bring a friend for free'",
            detail: "Community building email encouraging them to bring a friend to class. Includes the referral mechanics.",
          },
          {
            type: "wait",
            label: "Wait",
            detail: "Pauses before the next email.",
          },
          {
            type: "action",
            label: "Send email: 'How STRONG makes you stronger'",
            detail: "Brand and science content about the methodology behind STRONG Pilates and the Rowformer.",
          },
          {
            type: "wait",
            label: "Wait",
            detail: "Pauses before the next email.",
          },
          {
            type: "action",
            label: "Send email: 'Share your feedback'",
            detail: "Requests a review or feedback from the member. Timed to land after they have had enough classes to form an opinion.",
          },
          {
            type: "wait",
            label: "Wait",
            detail: "Pauses before the SMS.",
          },
          {
            type: "action",
            label: "Send SMS",
            detail: "A personal-feeling SMS check-in during the nurture period.",
          },
          {
            type: "wait",
            label: "Wait",
            detail: "Pauses before the next email.",
          },
          {
            type: "action",
            label: "Send email: 'Celebrating your STRONG Milestones'",
            detail: "Introduces the milestone system and lets them know their attendance is being tracked and celebrated.",
          },
          {
            type: "wait",
            label: "Wait",
            detail: "Pauses before the next email.",
          },
          {
            type: "action",
            label: "Send email: 'Longevity: train for life at STRONG'",
            detail: "Long-term value content about the health and longevity benefits of consistent Pilates practice.",
          },
          {
            type: "wait",
            label: "Wait",
            detail: "Pauses before the final email.",
          },
          {
            type: "action",
            label: "Send email: 'More results. More community. More than Pilates.'",
            detail: "The final email in the 60-day sequence. Reinforces the value of their membership and the community they are part of.",
          },
        ]}
        settings={{ allowReentry: false, stopOnResponse: false }}
      />

      <Callout type="tip" title="DND checks before every message">
        <p>
          The 60 Day Member Journey checks DND status before each
          email. If a member has Do Not Disturb enabled (because they
          replied STOP, for example), the email is skipped but the
          sequence continues. This means they may receive later emails
          if DND is later removed, but no messages are sent while DND
          is active.
        </p>
      </Callout>

      <p>
        Two supporting workflows keep the 60-day nurture clean:
      </p>

      <WorkflowCard
        name="00. 60 Day Journey | Tagging Current Members so they don't pass through the new 60 Day Journey"
        purpose="A one-time utility workflow that tags existing members with the '60 day member nurture' tag. This prevents current members from receiving the nurture sequence, which is designed only for new members."
        status="published"
        workflowUrl="https://grow.hapana.com/location/cGie31g8caN2HkP6vN2P/workflow/baaad190-0c33-4c75-b799-8ded9b05f2ab"
        steps={[
          {
            type: "condition",
            label: "Do they have Memberships in their Active Package Category OR Location Status = suspendedMembership?",
            detail: "Identifies current members (active or suspended) who should be excluded from the new nurture sequence.",
          },
          {
            type: "action",
            label: "Add tag: 60 day member nurture",
            detail: "Tags them so the 60 Day Member Journey workflow skips them.",
          },
        ]}
        settings={{ allowReentry: true, stopOnResponse: false }}
      />

      <WorkflowCard
        name="02. 60 Day Member Journey | Remove from workflow when Location Status = inactive"
        purpose="If a member's location status changes to inactive during the 60-day nurture (they cancelled or their membership lapsed), this workflow removes them from the nurture sequence."
        status="published"
        workflowUrl="https://grow.hapana.com/location/cGie31g8caN2HkP6vN2P/workflow/efafd8df-1329-4ca2-89fc-b1a403bc5074"
        steps={[
          {
            type: "wait",
            label: "Wait (failsafe)",
            detail: "Short pause for sync.",
          },
          {
            type: "condition",
            label: "Is their Location Status still 'inactive'?",
            detail: "Confirms the status change was real and not a temporary sync issue.",
          },
          {
            type: "condition",
            label: "Do they have the tag '60 day member nurture'?",
            detail: "Only attempts to remove them from the nurture if they are actually in it.",
          },
          {
            type: "action",
            label: "Remove from 60 Day Member Journey workflow",
            detail: "Pulls them out of the nurture sequence. They will not receive any remaining emails.",
          },
        ]}
        settings={{ allowReentry: true, stopOnResponse: false }}
      />

      <h2>Attendance milestones</h2>

      <p>
        STRONG celebrates attendance milestones at 50, 100, 200, 500,
        and 1,000 classes. Rather than detecting the exact milestone
        number, the workflow fires 3 classes early (at 47, 97, 197,
        497, and 997) to give the studio team time to prepare a
        celebration.
      </p>

      <WorkflowCard
        name="02. Attendance Milestones Notification"
        purpose="When a member reaches 3 classes before a milestone (47, 97, 197, 497, 997), creates a task for the studio to prepare the celebration and sends an internal notification to the assigned user."
        status="published"
        workflowUrl="https://grow.hapana.com/location/cGie31g8caN2HkP6vN2P/workflow/6bb7730d-2739-4329-9456-6f74588b7115"
        steps={[
          {
            type: "condition",
            label: "Is their Active Package Category Memberships?",
            detail: "Only fires for members, not intro offer contacts or leads.",
          },
          {
            type: "condition",
            label: "What is their Attendance Total?",
            detail: "Routes to the correct milestone branch: 47 (approaching 50), 97 (approaching 100), 197 (approaching 200), 497 (approaching 500), or 997 (approaching 1,000).",
          },
          {
            type: "action",
            label: "Add task: Prepare for Member Milestone",
            detail: "Creates a task for the studio team to prepare whatever the location does for that milestone (certificate, photo, social post, gift, etc.).",
          },
          {
            type: "action",
            label: "Internal notification: Email to assigned user",
            detail: "Sends an email to the team member assigned to this contact so they know the milestone is coming.",
          },
        ]}
        settings={{ allowReentry: true, stopOnResponse: false }}
      />

      <Callout type="tip" title="3 classes early, not at the milestone">
        <p>
          The workflow fires at 47, 97, 197, 497, and 997 attendance,
          not at the milestone number itself. This gives the studio 2
          to 3 classes to prepare. By the time the member hits 50 (or
          100, 200, etc.), the team is ready with whatever celebration
          they have planned.
        </p>
      </Callout>

      <h2>Birthdays</h2>

      <p>
        The birthday workflow sends an internal notification to the
        studio on a contact&apos;s birthday so the team can prepare a
        personal touch. It handles both members and leads differently.
      </p>

      <WorkflowCard
        name="03. Birthday Studio Notification"
        purpose="On a contact's birthday, notifies the studio with an internal email. Creates a preparation task for active members and package holders. Sends a different notification for leads (contacts with no active package)."
        status="published"
        workflowUrl="https://grow.hapana.com/location/cGie31g8caN2HkP6vN2P/workflow/273133bf-face-41c3-a014-3658ce41c26b"
        trigger="Birthday Reminder"
        steps={[
          {
            type: "condition",
            label: "Is their Active Package empty?",
            detail: "Routes to different notifications for leads vs active members/package holders.",
          },
          {
            type: "action",
            label: "Internal notification: Email to Studio (for leads)",
            detail: "If they are a lead with no package, sends a simpler notification. The studio may choose to send a birthday offer.",
          },
          {
            type: "action",
            label: "Add task: Birthday Preparation",
            detail: "For active members and package holders, creates a task for the studio to prepare a birthday acknowledgment.",
          },
          {
            type: "action",
            label: "Internal notification: Email to Studio (for members)",
            detail: "Sends the full birthday notification for members, including their details and membership status.",
          },
        ]}
        settings={{ allowReentry: true, stopOnResponse: false }}
      />

      <h2>Suspension handling</h2>

      <p>
        When a member suspends their membership in Core, the sync
        updates their Location Status to &ldquo;suspendedMembership&rdquo;
        in Grow. Two workflows handle this:
      </p>

      <WorkflowCard
        name="05. Membership | Suspensions"
        purpose="Detects when a member's Location Status changes to 'suspendedMembership'. Tags them as suspended, stamps the suspension date, then watches for when they return to active or go inactive."
        status="published"
        workflowUrl="https://grow.hapana.com/location/cGie31g8caN2HkP6vN2P/workflow/ade1af58-e4d1-420d-bb42-4c072ba00945"
        steps={[
          {
            type: "condition",
            label: "Do they actually have 'suspendedMembership' in their Location Status?",
            detail: "Confirms the suspension is real before proceeding.",
          },
          {
            type: "action",
            label: "Add tag: suspended membership",
            detail: "Tags the contact for filtering and workflow routing.",
          },
          {
            type: "action",
            label: "Update field: Date Membership Suspended",
            detail: "Stamps when the suspension started for reporting.",
          },
          {
            type: "wait",
            label: "Wait for status change",
            detail: "Waits for their Location Status to change again (either back to active or to inactive).",
          },
          {
            type: "condition",
            label: "What did their Location Status change to?",
            detail: "Routes based on outcome: 'activePackage' means they returned from suspension, 'inactive' means they cancelled during suspension.",
          },
          {
            type: "action",
            label: "Remove tag: suspended membership",
            detail: "Cleans up the suspension tag.",
          },
          {
            type: "action",
            label: "Add tag: recently suspended",
            detail: "Temporarily tags them as recently suspended. This prevents the 'Date Membership Purchased' workflow from re-stamping the purchase date when they come back from suspension.",
          },
          {
            type: "wait",
            label: "Wait",
            detail: "Short pause.",
          },
          {
            type: "action",
            label: "Remove tag: recently suspended",
            detail: "Removes the temporary tag after the window has passed.",
          },
        ]}
        settings={{ allowReentry: true, stopOnResponse: false }}
      />

      <WorkflowCard
        name="99. Current Member Suspensions (batch tagging)"
        purpose="A utility workflow for batch-tagging currently suspended members. Used when setting up a new location or after a data cleanup to ensure all suspended contacts have the correct tag."
        status="published"
        workflowUrl="https://grow.hapana.com/location/cGie31g8caN2HkP6vN2P/workflow/4e47133e-e6b5-4ef4-a553-4bb0e098c2a3"
        steps={[
          {
            type: "condition",
            label: "Is their Location Status 'suspendedMembership'?",
            detail: "Confirms they are currently suspended.",
          },
          {
            type: "action",
            label: "Add tag: suspended membership",
            detail: "Tags them for consistency.",
          },
          {
            type: "wait",
            label: "Wait for status change",
            detail: "Watches for when they return to active or go inactive.",
          },
          {
            type: "condition",
            label: "What did their Location Status change to?",
            detail: "Routes based on outcome.",
          },
          {
            type: "action",
            label: "Remove tag: suspended membership, add 'recently suspended'",
            detail: "Same cleanup pattern as the main Suspensions workflow.",
          },
          {
            type: "wait",
            label: "Wait",
            detail: "Short pause before removing the temporary tag.",
          },
          {
            type: "action",
            label: "Remove tag: recently suspended",
            detail: "Final cleanup.",
          },
        ]}
        settings={{ allowReentry: true, stopOnResponse: false }}
      />

      <Callout type="warning" title="Why 'recently suspended' matters">
        <p>
          When a member comes back from suspension, their Active
          Package updates. This would normally trigger the
          &ldquo;Update Date Membership Purchased&rdquo; workflow and
          re-stamp their purchase date as today. The &ldquo;recently
          suspended&rdquo; tag prevents this: the purchase date
          workflow checks for this tag and skips the update if it is
          present.
        </p>
      </Callout>

      <h2>Inactivity detection</h2>

      <WorkflowCard
        name="06. Location Status = inactive"
        purpose="When a contact's Location Status changes to 'inactive' (cancelled membership, expired package, or account deactivated), removes all active status tags to keep the data clean."
        status="published"
        workflowUrl="https://grow.hapana.com/location/cGie31g8caN2HkP6vN2P/workflow/a421409d-32ab-4522-93d3-4d55aec8b0bb"
        steps={[
          {
            type: "wait",
            label: "Wait (failsafe)",
            detail: "Short pause for sync.",
          },
          {
            type: "condition",
            label: "Is their Location Status actually inactive?",
            detail: "Confirms the status change before removing tags.",
          },
          {
            type: "action",
            label: "Remove tags: active - intro offer, active - memberships, active - packages, suspended membership",
            detail: "Strips all active status tags. This prevents other workflows from treating them as an active contact.",
          },
        ]}
        settings={{ allowReentry: true, stopOnResponse: false }}
      />

      <h2>Days absent (draft)</h2>

      <p>
        A Days Absent workflow exists as a draft but is not currently
        published. When enabled, it would send SMS reminders and
        create studio tasks at 7, 14, and 21 days of no attendance
        for members.
      </p>

      <WorkflowCard
        name="01. Days Absent SMS | 7, 14 and 21 Days | Memberships Only"
        purpose="When a member has not attended for 7, 14, or 21 days, creates a task for the studio and sends an internal notification. Checks that they are still an active member and not recently suspended before acting."
        status="draft"
        workflowUrl="https://grow.hapana.com/location/cGie31g8caN2HkP6vN2P/workflow/acacc3d8-0ad6-4d3d-ba54-90bcda74e22e"
        steps={[
          {
            type: "wait",
            label: "Wait (failsafe)",
            detail: "Short pause for sync.",
          },
          {
            type: "condition",
            label: "Does their Active Package Category still contain Memberships?",
            detail: "Only fires for active members.",
          },
          {
            type: "condition",
            label: "Do they have the 'recently suspended' tag?",
            detail: "Skips contacts who just came back from suspension, since their days absent counter would be high but they are not truly absent.",
          },
          {
            type: "condition",
            label: "How many days absent?",
            detail: "Routes to different actions for 7 days, 14 days, and 21 days absent.",
          },
          {
            type: "action",
            label: "Add task + internal notification",
            detail: "Creates a follow-up task and emails the studio. The task and notification wording differ based on the absence length: 7 days is a gentle check-in, 14 days is more urgent, 21 days is a retention risk.",
          },
          {
            type: "action",
            label: "Add note",
            detail: "Records the absence notification in the contact's notes for audit trail.",
          },
        ]}
        settings={{ allowReentry: true, stopOnResponse: false }}
      />

      <h2>Attendance tracking utilities</h2>

      <p>
        Two published workflows maintain weekly and monthly attendance
        counters. These are simple math operations that increment a
        counter field each time a contact&apos;s attendance total
        changes. Studios use these for check-in dashboards and
        reporting.
      </p>

      <WorkflowCard
        name="07. Weekly Check-ins | When Attendance Total changes, add 1 to weekly check-in field"
        purpose="Increments the weekly check-in counter by 1 each time a contact attends a class. The counter resets on a schedule (managed outside of workflows)."
        status="published"
        workflowUrl="https://grow.hapana.com/location/cGie31g8caN2HkP6vN2P/workflow/dd59ae50-6714-4bb1-bd20-15ccb6faeff6"
        steps={[
          {
            type: "condition",
            label: "Is Attendance Total > 0?",
            detail: "Confirms an actual attendance event occurred.",
          },
          {
            type: "action",
            label: "Math operation: add 1 to weekly check-in field",
            detail: "Increments the counter.",
          },
        ]}
        settings={{ allowReentry: true, stopOnResponse: false }}
      />

      <WorkflowCard
        name="10. Monthly Check-ins | When Attendance Total changes, add 1 to monthly check-in field"
        purpose="Same as the weekly check-in but for the monthly counter. Used for monthly attendance reporting."
        status="published"
        workflowUrl="https://grow.hapana.com/location/cGie31g8caN2HkP6vN2P/workflow/80ab0d2d-f9b8-4fcc-90dc-dc3a36b4e7e6"
        steps={[
          {
            type: "condition",
            label: "Is Attendance Total > 0?",
            detail: "Confirms an actual attendance event.",
          },
          {
            type: "action",
            label: "Math operation: add 1 to monthly check-in field",
            detail: "Increments the monthly counter.",
          },
        ]}
        settings={{ allowReentry: true, stopOnResponse: false }}
      />

      <h2>What the member experiences</h2>

      <p>
        From a member&apos;s perspective, the membership journey feels
        personal and well-timed:
      </p>

      <ol>
        <li>
          <strong>Week 1:</strong>{" "} they receive a welcome email
          celebrating their membership.
        </li>
        <li>
          <strong>Weeks 2 to 8:</strong>{" "} they receive emails about
          getting the most from their membership, bringing a friend,
          the science behind STRONG, and a feedback request. Spaced
          out so it feels natural, not like a blast.
        </li>
        <li>
          <strong>Around their birthday:</strong>{" "} the studio
          acknowledges it personally (how depends on the location).
        </li>
        <li>
          <strong>Approaching 50, 100, 200, 500, or 1,000 classes:
          </strong>{" "} the studio prepares a celebration 3 classes in
          advance.
        </li>
        <li>
          <strong>If they suspend:</strong>{" "} the system tracks the
          suspension and handles their return cleanly.
        </li>
        <li>
          <strong>If they go inactive:</strong>{" "} all active tags
          are removed and they exit the automated messaging.
        </li>
      </ol>
    </PageLayout>
  )
}
