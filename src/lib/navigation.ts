export interface NavItem {
  title: string
  slug: string
  description: string
}

export interface NavLayer {
  label: string
  items: NavItem[]
}

export const navigation: NavLayer[] = [
  {
    label: "Context",
    items: [
      { title: "What is Grow", slug: "/what-is-grow", description: "The platform, why it exists, its role in the STRONG ecosystem" },
      { title: "Core vs Grow", slug: "/core-vs-grow", description: "What lives where, which system does what" },
      { title: "Core to Grow Integration", slug: "/core-to-grow-integration", description: "How data syncs between the two systems" },
    ],
  },
  {
    label: "The Interface",
    items: [
      { title: "Navigating Grow", slug: "/navigating-grow", description: "Menus, dashboard, what each section does" },
      { title: "Custom Fields vs Custom Values", slug: "/custom-fields-vs-values", description: "The difference and where each is used" },
    ],
  },
  {
    label: "Building Blocks",
    items: [
      { title: "Contacts", slug: "/contacts", description: "Records, tags, how contacts get created" },
      { title: "Smart Lists", slug: "/smart-lists", description: "Dynamic segments that auto-update" },
      { title: "Pipelines & Opportunities", slug: "/pipelines", description: "Visual boards, stages, how contacts move" },
      { title: "Conversations", slug: "/conversations", description: "Unified inbox: SMS, email, calls" },
    ],
  },
  {
    label: "Content",
    items: [
      { title: "SMS Snippets", slug: "/sms-snippets", description: "What they are, where they live, how they're used" },
      { title: "Email Templates", slug: "/email-templates", description: "Creating and managing email templates" },
    ],
  },
  {
    label: "Workflows",
    items: [
      { title: "What is a Workflow", slug: "/workflows", description: "The concept and visual overview" },
      { title: "Triggers", slug: "/workflows/triggers", description: "What starts a workflow" },
      { title: "Actions", slug: "/workflows/actions", description: "What a workflow does" },
      { title: "Conditions & Branching", slug: "/workflows/conditions", description: "If/else logic in workflows" },
    ],
  },
  {
    label: "Key Workflows",
    items: [
      { title: "Overview", slug: "/workflows/key-workflows", description: "How workflow groups connect to the member journey" },
      { title: "New Leads", slug: "/workflows/key-workflows/new-leads", description: "Website submissions, Facebook leads, first contact" },
      { title: "New Intro Offers", slug: "/workflows/key-workflows/new-intro-offers", description: "Purchase detection, welcome sequence, pipeline setup" },
      { title: "During Intro Offer", slug: "/workflows/key-workflows/during-intro-offer", description: "Day-by-day progression, visits, nudges, conversion" },
      { title: "Membership Journey", slug: "/workflows/key-workflows/membership-journey", description: "60-day nurture, milestones, retention, birthdays" },
      { title: "System Workflows", slug: "/workflows/key-workflows/system-workflows", description: "Assignments, notifications, date stamps, DND, cleanup" },
    ],
  },
  {
    label: "Troubleshooting",
    items: [
      { title: "Overview", slug: "/troubleshooting", description: "Common issues across Grow, grouped by pattern" },
      { title: "Pipeline Inaccuracy", slug: "/troubleshooting/pipeline-inaccuracy", description: "Wrong day, wrong visit count, premature expiry" },
      { title: "Core to Grow Sync Gaps", slug: "/troubleshooting/sync-gaps", description: "Fields not syncing, workflows not triggering" },
      { title: "Contact Duplicates & Merges", slug: "/troubleshooting/contact-duplicates", description: "Duplicate records, merge side effects, data collisions" },
      { title: "Workflow Timing & Tasks", slug: "/troubleshooting/workflow-timing", description: "Tasks at wrong time, wrong owner, multiple fires" },
      { title: "Email & Notification Issues", slug: "/troubleshooting/email-notifications", description: "Phantom notifications, delivery failures, spam triggers" },
    ],
  },
]

export function getAllPages(): { title: string; slug: string; layer: string }[] {
  return navigation.flatMap((layer) =>
    layer.items.map((item) => ({
      title: item.title,
      slug: item.slug,
      layer: layer.label,
    }))
  )
}

export function getAdjacentPages(currentSlug: string) {
  const pages = getAllPages()
  const index = pages.findIndex((p) => p.slug === currentSlug)
  return {
    prev: index > 0 ? pages[index - 1] : null,
    next: index < pages.length - 1 ? pages[index + 1] : null,
  }
}
