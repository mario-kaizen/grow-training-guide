# SOP 02 | Pre-Opening Account Set Up for Grow | Studios Just About to Open

## When to Use

On the day a studio is about to open (or the day before). The Initial Account Set Up (SOP 01) has already been completed. This SOP verifies everything is correct, activates all remaining workflows, runs the detailed step-by-step checks, and sends the studio their welcome email.

## Prerequisites

- SOP 01 completed for this location
- Access to grow.hapana.com
- Access to core.hapana.com (to verify category names)
- Access to Zendesk (for welcome email)
- Template account open in a second screen for side-by-side comparison

## Important

Open the **template account** (`cGie31g8caN2HkP6vN2P`) in a second browser tab or screen. You'll need it for side-by-side workflow step verification. The template account is the source of truth for what each workflow should contain.

---

## Step 1 | Verify Custom Values (100% Completion)

Go to **Settings > Custom Values**. Set to 100 per page.

Every custom value listed in SOP 01 Step 2 must be filled. Scan through the full list and confirm no required values are empty.

Pay special attention to:
- **FromName_Lead** and **FromName_Member** (often missed if the studio hasn't responded)
- **Push Notification API Key** and **App ID** (check if the Zendesk ticket from SOP 01 has been resolved)
- **Unsubscribe** and **Resubscribe** URLs (verify they still point to the correct forms with `?email={{contact.email}}`)
- **Twilio Number** (confirm it's in the correct format)

If any required values are still empty, stop and resolve before proceeding.

---

## Step 2 | Verify Category Names in Core

Before creating smart lists or verifying workflow triggers, you must check what Core uses for the intro offer category name.

1. Go to `core.hapana.com`
2. Navigate to the location
3. Go to **Payments > Retail Configurations**
4. Look at the **Category** column
5. Note the exact string for the intro offer category: is it `Intro Offers` (plural) or `Intro Offer` (singular)?
6. Also note: `Memberships` or `Membership`? `Packages` or `Package`?

These exact strings must match in your smart list filters and workflow trigger conditions. The template default may not match this location.

---

## Step 3 | Create Smart Lists

Go to **Contacts**. You need to create 6 smart lists with specific filters and columns.

### Smart List 1 | All Database w/email minus DND

**Filters:**
- Email: is not empty
- DND: is not enabled for Email

**Columns:** Name, Created, Last Activity, Phone, Tags

**Steps:**
1. Go to Contacts > Filters
2. Add filter: Email is not empty > Apply
3. Add filter: DND is not enabled for Email > Apply
4. Click **Save as Smart List**
5. Name: paste the name exactly as shown above
6. Verify columns: Name, Created, Last Activity, Phone, Tags (remove any extras, add any missing)
7. Click **Save** again (columns don't persist until you save after setting them)

### Smart List 2 | Leads Only

**Filters:**
- Active Package: is empty
- Past Active Package: is empty
- DND: is not enabled
- DND: is not enabled for SMS

**Columns:** Name, Created, Last Activity, Phone, Tags, Active Package, Past Active Packages

### Smart List 3 | Active Intro Offer

**Filters:**
- Active Package Category: contains exactly `[value from Core - Step 2]`

Use the exact string from Core. If Core says "Intro Offers" (plural), use "Intro Offers". If Core says "Intro Offer" (singular), use "Intro Offer".

**Columns:** Name, Created, Last Activity, Phone, Tags, Active Package, Active Package Category

### Smart List 4 | Active Packages

**Filters:**
- Active Package Category: contains exactly `Packages`

**Columns:** Name, Created, Last Activity, Phone, Tags, Active Package, Active Package Category

### Smart List 5 | Active Memberships

**Filters:**
- Active Package Category: contains exactly `[value from Core - Step 2]`

Check Core for the exact string. Usually "Memberships" (plural) but verify.

**Columns:** Name, Created, Last Activity, Phone, Tags, Active Package, Active Package Category

### Smart List 6 | Past Purchases

**Filters:**
- Active Package: is empty
- Past Active Packages: is not empty
- DND: is not enabled for Email

**Columns:** Name, Created, Last Activity, Phone, Tags, Active Package, Past Active Packages

### After All 6 Are Created

1. Go back through each smart list and verify:
   - Filters are correct (click into each one, check)
   - Columns are correct (some may have reverted if you didn't save after setting columns)
2. Go to **Manage Smart List**
3. **Share all smart lists with everyone** so the studio team can access them

---

## Step 4 | Activate Workflows (Folder by Folder)

Go to **Automations**. Work through each folder systematically.

### Folder: Automatic Mode

| Workflow | Action |
|---|---|
| New Lead Account No Sales Schedule | **Publish** |
| First Time Booking | **Publish** |
| First Time Booking SMS | **Publish** |
| First Visit Complete | **Publish** |
| Strong Experience Lead Corner Answer 1 | **Publish** |
| Strong Experience Lead Corner Answer 2 | **Publish** |
| Strong Experience Lead Corner Answer 3 | **Publish** |
| Tough Love (any) | **DELETE** (retired product, remove entirely) |

### Folder: HQ New Lead Sequences

| Workflow | Action |
|---|---|
| New Lead Website | **Publish** (verify trigger form is correct location's Website Form first) |
| New Lead Strong Experience | **Publish** (verify opportunity is correct) |

### Folder: Intro Offer Pipeline

This is the largest folder. Publish everything in the top section:

| Workflow | Action |
|---|---|
| Intro Offer Status Update | **Publish** (after Step 5 verification) |
| False Starter | **Publish** (after Step 5 verification) |
| Intro Offer Visits Update | **Publish** (after Step 5 verification) |
| Day 1 through Day 15 | **Publish all** (15 individual workflows) |
| Intro Offer [status workflows 1-6] | **Publish all** |
| Marked Abandoned and Lost | Leave as-is initially (verify in Step 5 first) |
| Simulates workflows | Do NOT publish |

### Folder: Settings

| Workflow | Action |
|---|---|
| Assign User (x2) | **Publish** |
| Notification workflows | **Do NOT publish**. The studio turns these on themselves when they're ready. Publishing them now will bombard the studio with email notifications they're not expecting |

### Folder: STRONG System Flows

| Workflow | Action |
|---|---|
| Core Sale Update | **Publish** (should already be on from SOP 01, verify) |
| Pipeline Other Promotions | **Publish** (should already be on from SOP 01, verify) |
| Pipeline Strong Experience | **Publish** |
| Tough Love workflows | **DELETE** all (retired) |

### Folder: Appointment Workflows

| Workflow | Action |
|---|---|
| All appointment workflows | **Publish all** |

### Folder: Unsubscribe

| Workflow | Action |
|---|---|
| Email Unsubscribed | **Publish** (should already be on from SOP 01, verify) |
| SMS Unsubscribed | **Publish** (should already be on from SOP 01, verify) |

### Past Campaign Folders

Any folder with a year/month name (e.g., "202408", "2024 | 06") for a campaign that has already ended:
1. Open the folder
2. Delete each workflow inside individually (Delete Workflow > type "confirm")
3. After all contents are deleted, delete the folder itself (Three dots > Delete Folder)
4. **Do not skip the content deletion step.** Deleting a folder without deleting its contents first causes the workflows to spill into the root level

### Folders NOT Listed Above

Any other folders not mentioned here: leave them as they are. If unsure, compare against the template account.

---

## Step 5 | Verify Workflow Steps (The Critical Check)

This is the most time-consuming step. Workflow steps can load EMPTY after template deployment, so you need to verify that key nodes have their pipeline references, stage references, and trigger conditions actually populated.

Open the **template account** in a second screen for side-by-side comparison.

### 5A | Intro Offer Status Update

This is the most important workflow to verify.

**Trigger check:**
1. Open the workflow
2. Click the trigger
3. Verify: `Account Created` + `Active Package Category has changed` + `contains [intro offer category from Core]`
4. If Core says "Intro Offers" (plural) but the trigger says "Intro Offer" (singular), UPDATE the trigger to match Core

**Node checks (look for EMPTY fields):**

| Node | What to Verify |
|---|---|
| Create/Update Opportunity | **In Pipeline** must be set to "Intro Offer". **In Pipeline Stage** must be set to "Purchased". These are frequently EMPTY after template loading |
| Add to Workflow False Starter | Must be connected to the correct False Starter workflow |
| In Pipeline Intro Offer Expired | Pipeline reference must be set (not empty) |
| In Pipeline Intro Offer Membership | Pipeline reference must be set (not empty) |

**Day progression check:**
- Day 1 to Day 2: remove from Day 1, add to Day 2 (verify sequential)
- Continue checking Day 2 to 3, 3 to 4, all the way through Day 14 to 15
- Each transition should reference the correct day numbers

**Save the workflow after any corrections.**

### 5B | False Starter

1. Open the workflow
2. Compare side-by-side with the template account
3. Verify the 4-day check sequence matches
4. Verify all pipeline references are set (not empty)
5. Save if any corrections were made

### 5C | Intro Offer Visits Update

**Trigger check:**
- Verify: `Attendance Total has changed`

**Day progression check:**
- Day 1 = First Visit (verify)
- Day 2 through Day 15: each should match the correct visit count
- Go through every single one: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15

### 5D | Membership, Expired, and Other Status Workflows

| Workflow | Pipeline Should Be Set To |
|---|---|
| Membership column | Pipeline: Membership |
| Expired column | Pipeline: Expired |
| False Starter column | Verify against template |
| Intro to Strong Set Expired column | Pipeline references must be set |

### 5E | Marked Abandoned and Lost

**Known bug: this workflow often has incorrect settings after template loading.**

Check and fix:
1. Open the workflow
2. Verify filters include: **In Pipeline = Intro Offer** (this is often missing)
3. Verify the status change action: should be **Lost** (not "Abandoned")
4. If the filter is missing: Add filters > In Pipeline > Intro Offer
5. If the status says "Abandoned": Change to "Lost"
6. Save and publish

### 5F | Other Folder Workflows (Quick Verification)

For workflows in these folders, you don't need to check every node. Just verify that steps exist and aren't completely empty:

| Folder | What to Check |
|---|---|
| Automatic Mode | Steps exist under each workflow |
| New Lead Sequences | **New Lead Website**: trigger form is the correct location's Website Form. **New Lead Strong Experience**: opportunity node is set correctly |
| Settings | Assign user workflows have content |
| STRONG System Flows | Core Sale Update has correct pipeline stages (already checked in SOP 01) |
| Appointment Workflows | Steps exist |
| HQ Broadcasts | Steps exist |

---

## Step 6 | Verify Pipelines

Go to **Opportunities > Pipelines** (or the pipeline settings area).

### Required Pipelines

Verify these exist with correct stages:

| Pipeline | Must Exist |
|---|---|
| 00. Leads | Yes |
| 01. Intro Offer | Yes (this is the most important one) |
| 02. Leads Other Promotions | Yes |
| Leads Pre-sale | Yes |
| Lead Joint Experience | Yes |

### Pipelines to Delete

| Pipeline | Action |
|---|---|
| 3 for 30 | **Delete** unless there is an active 3 for 30 campaign running right now |
| Tough Love | **Delete** (retired) |

To delete: Go to Bulk Actions (or Pipelines settings) > select the pipeline > Delete.

---

## Step 7 | Final Cleanup

### Delete remaining past campaign content

If any campaign folders from past months were missed in SOP 01 or Step 4:

**Workflows:** Delete contents first, then delete folder.
**Email Templates:** Go to Marketing > Email > Templates. Archive folders for past campaigns.

### Verify no obsolete custom values remain

Quick scan of custom values for any STRONG Experience, Tough Love, or Long Experience entries that should have been deleted in SOP 01.

---

## Step 8 | Send Opening Email via Zendesk

1. Go to **Zendesk > Add** (top left, create new ticket)
2. Set fields:
   - **Requester:** The studio's email address (not Hapana)
   - **Assignee:** Mario Paguio
   - **Internal Team:** Grow
   - **Vandals:** Platforms
   - **Partner:** Grow
3. **Subject:** Copy the subject line from the welcome email template (in the SOP Notion page)
4. **Body:** Copy the body from the welcome email template, paste, format correctly
5. Double-check all formatting is clean
6. This is a one-way email (no response expected), so click the dropdown arrow and submit as **Solved**

---

## Verification Checklist

Before marking complete:

- [ ] All custom values filled (100% completion verified)
- [ ] Category names verified against Core (Intro Offers vs Intro Offer, Memberships vs Membership)
- [ ] 6 smart lists created with correct filters and columns
- [ ] Smart lists shared with everyone
- [ ] Automatic Mode workflows published (Tough Love deleted)
- [ ] New Lead Sequences workflows published with correct triggers
- [ ] Intro Offer Pipeline workflows published (all status + Day 1-15)
- [ ] Settings: only assign user workflows published (notifications OFF)
- [ ] STRONG System Flows published (Tough Love deleted)
- [ ] Appointment workflows published
- [ ] Unsubscribe workflows verified as published
- [ ] Past campaign folders cleaned up (contents deleted, then folders)
- [ ] Intro Offer Status Update: trigger matches Core category name
- [ ] Intro Offer Status Update: Create/Update Opportunity has Pipeline + Stage set (not empty)
- [ ] False Starter: pipeline references set, matches template
- [ ] Visits Update: Day 1-15 progression correct
- [ ] Marked Abandoned/Lost: filter has "In Pipeline: Intro Offer", status = "Lost"
- [ ] Pipelines verified (00, 01, 02, Pre-sale, Joint Experience exist; 3 for 30 and Tough Love deleted)
- [ ] Welcome email sent via Zendesk (Solved status)

---

## Automation Status

| Step | Automatable | Notes |
|---|---|---|
| 1. Custom values audit | Yes | GET all values, check for empties, report gaps |
| 2. Core category check | Partial | Needs Core API access or Chrome scrape of Retail Configurations |
| 3. Smart lists | Yes | Full CRUD API with nested filter schema. Category values need Core verification first |
| 4. Workflow activation | Yes | Publish/unpublish API validated at scale (96 locations). Can list by folder and flip each |
| 5. Workflow step verification | Yes | GET full workflow config + GET triggers. Can check for null/empty pipeline references, compare against template schema, flag mismatches |
| 6. Pipeline verification | Yes | Full CRUD API. Can list pipelines, verify names and stages |
| 7. Cleanup | Yes | Workflow DELETE + email template archive APIs available |
| 8. Zendesk email | Partial | Can draft via Zendesk API, submit on review |

The workflow step verification (Step 5) is the highest-value automation target. It takes the longest manually, is the most error-prone, and is fully API-addressable. The skill can GET every workflow's full node graph, walk each node checking for empty pipeline/stage references, verify trigger conditions match the Core category name, and produce a pass/fail report in seconds instead of 30+ minutes of clicking.

---

## Loom References

| Video | URL |
|---|---|
| Smart List Creation Process | https://www.loom.com/share/3c97981814354085a767188210d79d92 |
| Workflow Activation Tutorial | https://www.loom.com/share/3315bb07990d409abd26dba530a61993 |
| Workflow Step Verification | https://www.loom.com/share/131d49a32259438597effed5ed5f86d0 |
| Account Cleanup | https://www.loom.com/share/fa2623b958d54f78b5b5996b5b523e6d |
| Opening Email via Zendesk | https://www.loom.com/share/f21cbaf8ee4e43db8382d205aae5e88b |
