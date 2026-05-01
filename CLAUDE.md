# Grow Training Guide | Project CLAUDE.md

## What this is

A custom Next.js website that serves as the training guide for the Grow (Hapana Grow) platform used by STRONG Pilates. Audience: Kaizen team members (Chloe, Aaron, Juan) and potentially studio owners/managers.

**No references to GoHighLevel or GHL anywhere.** The white-label is the point.

## Tech stack

- Next.js 16 (App Router), TypeScript, Tailwind CSS v4
- @tailwindcss/typography v0.5.x (NOT v4, which doesn't exist)
- No database, no MDX. Content lives directly in React components.
- Fonts: Kessel 105 (5 weights via @font-face in globals.css), Montserrat 400 (Google Fonts via `<link>` in layout.tsx, NOT CSS `@import`)

## Design system

- **Sidebar:** dark `bg-[#0a0a0a]`, active item `bg-[#98C8EB]/15 text-[#98C8EB]`
- **Content area:** cream `bg-[#FAF8F5]`, body text `#374151`, headings `#000000`
- **H2 treatment:** black band (`background: #000000`) with STRONG Blue text (`#98C8EB`), asymmetric padding `1rem 1.25rem 0.75rem` for Kessel baseline
- **Links:** darkened STRONG Blue `#4a90b8` for contrast on light backgrounds
- **Body font:** Montserrat 400 at 16px (`prose-base`)
- **All headings:** Kessel Heavy (font-weight 900), uppercase
- **No em dashes or dashes** in any copy. Restructure sentences instead.
- **JSX whitespace:** use `{" "}` after inline elements to prevent collapsing

## Content structure (6 layers, 16 sections)

### Layer 1 | Context
1. What is Grow ✅
2. Core vs Grow ✅
3. Core to Grow Integration ✅

### Layer 2 | The Interface
4. Navigating Grow ✅ (sourced from Loom transcript, Fitstop refs stripped)
5. Custom Fields vs Custom Values ✅

### Layer 3 | Building Blocks
6. Contacts ✅
7. Smart Lists ✅ (authoritative filter specs from Notion SOP Step 13)
8. Pipelines & Opportunities ✅ (sourced from Loom transcript, only 3 pipelines: 00/01/02)
9. Conversations ✅ (sourced from Loom transcript, Fitstop refs stripped)

### Layer 4 | Content
9. SMS Snippets ✅ (243 templates categorized: lead follow-up, call booking, intro offer journey, membership, campaigns)
10. Email Templates ✅ (339 templates categorized: appointment, intro offer nurture, brand content, membership, presale, campaigns)

### Layer 5 | Workflows
11. What is a Workflow (placeholder)
12. Triggers (placeholder)
13. Actions (placeholder)
14. Conditions & Branching (placeholder)
15. Key Workflows (placeholder)

### Layer 6 | Reference
16. Troubleshooting (placeholder)

### Future
- Funnel Builder (not in this build)

## Reusable components

| Component | File | Purpose |
|---|---|---|
| Sidebar | `src/components/Sidebar.tsx` | Left nav with collapsible layer groups |
| PageLayout | `src/components/PageLayout.tsx` | Content wrapper with title, prev/next nav |
| LoomEmbed | `src/components/LoomEmbed.tsx` | Responsive Loom video embed |
| Screenshot | `src/components/Screenshot.tsx` | Image with optional caption |
| Callout | `src/components/Callout.tsx` | Tip (sky), warning (amber), important (red) |
| StepByStep | `src/components/StepByStep.tsx` | Numbered instruction blocks |

## Key data sources

| What | Where |
|---|---|
| Custom values (template account) | `~/Projects/grow-user-guide/custom-values.json` (71 values) |
| Custom fields | `~/Projects/grow-user-guide/custom-fields.json` (104 fields) |
| Core-to-Grow field mapping | `~/Projects/grow-user-guide/core-grow-sync-v2.csv` (42 specs) |
| Workflow definitions | `~/Projects/grow-user-guide/workflows-parsed-v2.json` (305 workflows) |
| SMS templates | `~/Projects/grow-user-guide/sms-templates.json` (243 templates) |
| Email templates | `~/Projects/grow-user-guide/email-templates.json` (122 templates) |
| Locations | `~/Projects/grow-user-guide/locations.json` |
| Loom transcript (Navigating Grow) | `~/Downloads/FITSTOP _ Grow Platform Overview.srt` |

## Relevant skills

When working on this project, these skills are available and should be used:

- **`ghl-auth`** — mint API tokens for the Grow backend. Required before any `backend.leadconnectorhq.com` call. Template account location ID: `cGie31g8caN2HkP6vN2P`.
- **`grow-support`** — Zendesk ticket handling. Contains references to all data source paths for workflows, templates, custom fields, and the Notion KB.
- **`ghl-workflow-triggers`** — workflow trigger research.
- **`ghl-login-as-user`** — impersonate a sub-account user via Chrome for live platform inspection.
- **`core-reports`** — pull reports from Hapana Core via Chrome AppleScript. Useful when verifying sync data.
- **`chrome-takeover`** — drive Chrome tabs via AppleScript. Used by other skills but also useful for capturing screenshots of the live Grow interface.

## Current state (last updated 2026-05-01)

### Completed
- Project scaffolded with all 16 routes
- Design system applied (dark sidebar, cream content, Kessel headings, Montserrat body)
- Layer 1 content written (What is Grow, Core vs Grow, Core to Grow Integration)
- Layer 2 content written (Navigating Grow with screenshot, Custom Fields vs Custom Values)
- Screenshot added: `public/screenshots/grow-main-navigation.png`

### In progress
- Custom Values page may be extended with the full categorized list from the template account (71 values across 5 categories: location-specific, brand-level, pricing, seasonal/campaign, presale)

### Custom values categorization (from template account analysis)
- **25 location-specific** values each studio must fill in (website, socials, calendar links, staff names, Twilio number, etc.)
- **8 brand-level** values same for all locations (app store links, LinkedIn, unsubscribe form, push notification keys)
- **13 pricing fields** all empty in template, need per-location entry
- **21 seasonal/campaign** values that can be removed when campaigns end (gift cards, challenges, lapsed offers, SE offers, etc.)
- **4 presale-specific** values only relevant during presale launches
- Notable: duplicate fields exist (Facebook vs Facebook URL, Instagram vs Instagram URL, reviewurl vs Google Review URL)

### Not started
- Layer 5: Workflows (all 5 sub-pages)
- Layer 6: Troubleshooting
- Screenshots for most sections (Mario to provide or capture from template account)
- Loom video embeds
- Deployment (Cloudflare Pages, Vercel, or Coolify TBD)

### Screenshots in place
- `public/screenshots/grow-main-navigation.png` — Navigating Grow page
- `public/screenshots/grow-contacts-page.png` — Contacts page
- `public/screenshots/grow-opportunities-page.png` — Pipelines & Opportunities page

## Dev server

```bash
cd "~/00. Claude Projects/05. STRONG Pilates/02. STRONG HQ - Grow Management/grow-training-guide"
npm run dev
```

Port may vary. Check the terminal output. Currently runs on 3456.
