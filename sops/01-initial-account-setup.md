# SOP 01 | Initial Account Set Up for Brand New Grow Accounts

## When to Use

The moment Hapana sends a "Grow Account Created" email for a new STRONG Pilates location. This happens before presale and before the studio opens. The account exists but is empty and needs to be configured with location-specific data, the correct workflows turned on, and housekeeping done.

## Prerequisites

- Access to grow.hapana.com (Mario's credentials)
- Access to core.hapana.com (to verify category names)
- Access to Zendesk (for push notification request + welcome email)
- The studio's website URL, social media links, and contact details
- The Core Forwarding phone number (from HQ spreadsheet)

## Trigger

Email from Hapana confirming the Grow account has been created for a new location.

---

## Step 1 | Log In and Navigate to Location

1. Go to `grow.hapana.com`
2. Click the location dropdown at the top
3. Select the new location by name
4. Confirm you're inside the correct sub-account (location name visible in header)

---

## Step 2 | Fill Custom Values

Go to **Settings > Custom Values**. Set the page to 100 per page for easier scanning.

Fill each value below. If the value already has content, verify it's correct before moving on.

### Values You Can Fill Yourself

| Custom Value | Where to Find It |
|---|---|
| **Facebook** | Search for the studio's Facebook page, copy the URL |
| **Facebook URL** | Same as above (duplicate field in some accounts) |
| **GHL Location ID** | Copy the location ID from the URL bar at the top of the Grow interface. It's the string after `/location/` |
| **Instagram** | Search for the studio's Instagram page, copy the URL |
| **Instagram URL** | Same as above (duplicate field in some accounts) |
| **Location Schedule** | Studio's website URL with `#timetable` appended. Example: `https://www.strongpilates.co/torquay#timetable` |
| **Location Short** | The suburb name. Example: `Torquay`, `Coogee`, `Pymble` |
| **Purchase Link** | Studio's website URL (the page with class packs and memberships). Usually just the main location URL |
| **Twilio Number** | Go to **Settings > Phone Numbers**. Copy the number. For Australian numbers, format as `0X XXXX XXXX` (drop the +61). For international, keep the full `+XX` format |
| **Unified App Link** | Usually the QR code link `https://qr.d-e.co/...` (pre-filled in most accounts) |
| **Website** | Studio's website URL |

### Values That Require Form Link Verification

These must match the actual form URLs in the account. Hapana often sets the wrong template URL.

**Unsubscribe:**
1. Go to **Sites > Form Builder > HQ Forms Do Not Delete**
2. Find the **Unsubscribe** form
3. Click on the form name to open it
4. Update the form name to include the location (e.g., "STRONG Torquay Unsubscribe")
5. Click **Save**
6. Click **Integrate > Copy Form Link**
7. Paste the URL and verify it ends with `?email={{contact.email}}`
8. Go back to Custom Values and update the Unsubscribe value with this URL
9. The format should be: `https://link.growstrongpilates.com/widget/form/XXXXX?email={{contact.email}}`

**Resubscribe:**
1. Same process as Unsubscribe but for the **Resubscribe** form
2. Go to **Sites > Form Builder > HQ Forms Do Not Delete**
3. Find the **Resubscribe** form
4. Click **Integrate > Copy Form Link**
5. Verify and update the Resubscribe custom value

**STRONG VIP Calendar:**
1. Go to **Calendars > Calendar Settings**
2. Find **StrongVIP** calendar
3. Click the three dots > **Share**
4. Copy the scheduling link
5. Update the VIP Calendar custom value with this link

### Values That Require Studio Input

| Custom Value | Action |
|---|---|
| **FromName_Lead** | Ask the studio: "What name should appear when we send messages to leads?" Usually "STRONG [Location]" or a staff member's name |
| **FromName_Member** | Ask the studio: same question but for existing members |

If these aren't provided yet, flag them and move on. They can be updated later.

### Values to Delete (Obsolete)

These custom values are from retired products and should be removed to keep the account clean:

- STRONG Experience Intro Offer Link
- Long Experience
- Tough Love
- Tough Love Gotcha for Life

To delete: Select each value > Three dots > Bulk Actions > Delete Custom Values > Confirm.

### Values That Hapana Fills

| Custom Value | Action |
|---|---|
| **Push Notification API Key** | Hapana must fill this. See Step 3 below |
| **Push Notification App ID** | Hapana must fill this. See Step 3 below |

### Values to Leave Empty (For Now)

- LinkedIn (not used)
- Presale Status (filled during presale phase)
- VIP Pricing / VIP Server (studio fills these)
- iOS App (pre-filled if applicable)
- Review URL (filled later)

---

## Step 3 | Request Push Notification Values from Hapana

Create a Zendesk ticket to request the Push Notification API Key and App ID:

1. Go to **Zendesk > Add** (top left)
2. Set fields:
   - **Requester:** `stronggrow@hapana.com`
   - **Assignee:** Mario Paguio
   - **Internal Team:** Grow
   - **Vandals:** Platforms
   - **Partner:** Grow
3. **Subject:** `Push Notification | STRONG [Location Name]`
4. **Body:**
   > Hey Team,
   >
   > I'm just reviewing STRONG Pilates [Location] Grow Account and have noticed that the push notification information in the Grow custom values are empty.
   >
   > Could you please fill this out for us.
   >
   > **Push Notification API Key**
   > **Push Notification App ID**
   >
   > [Paste screenshot of the empty custom values]
5. Set status to **Pending** (not Solved). Only mark Solved once Hapana has filled them out.

---

## Step 4 | Turn On Initial Workflows

Go to **Automations**. Navigate to the **Unsubscribe** workflows folder (marked with X).

### Workflows to Publish

| Folder | Workflow | Pre-publish Check |
|---|---|---|
| Unsubscribe (X) | Email Unsubscribe | Verify trigger form is the correct location's Unsubscribe form |
| Unsubscribe (X) | Resubscribe | Verify trigger form is the correct location's Resubscribe form |
| Unsubscribe (X) | SMS Unsubscribe | No trigger check needed. Publish directly |
| STRONG System Flows | Core Sale Update | **Check pipeline stages** (see below) |
| STRONG System Flows | Pipeline Other Promotions | Publish directly |
| STRONG System Flows | Pipeline Pre-sale | Publish directly |
| STRONG System Flows | Pipeline Strong Experience | Publish directly |

### Core Sale Update Pipeline Verification

Before publishing Core Sale Update, check each pipeline node:

1. **Leads Other Promotions:** Pipeline = "Leads Other Promotions", Stage = "Sold"
2. **Leads Strong Experience:** Pipeline = "Leads Strong Experience", correct stage set
3. **Leads Pre-sale Sold:** Pipeline = "Leads Pre-sale", Stage = "Strong VIP"
4. **Tough Love:** Leave pipeline selectors EMPTY (Tough Love is retired). If tough love workflows exist (Pipeline Tough Love Purchase, Registration Fee Part 1/Part 2), DELETE them.

### Workflows to Delete

| Folder | Workflow | Reason |
|---|---|---|
| STRONG System Flows | Pipeline Tough Love Purchase | Retired product |
| STRONG System Flows | Tough Love Registration Fee Part 1 | Retired product |
| STRONG System Flows | Tough Love Registration Fee Part 2 | Retired product |

---

## Step 5 | Email Forwarding Address

1. Go to **Settings > Email Services > Reply and Forward Settings**
2. Copy the email forwarding address shown
3. Paste this into the tracking record for the studio
4. Press Enter to confirm (the UI requires Enter, not just paste)
5. Click **Save**

---

## Step 6 | Update Website Form Name

1. Go to **Sites > Form Builder > HQ Forms Do Not Delete**
2. Find the form that says "Location Name" (or the generic template name)
3. Click on the form name
4. Change it to "STRONG [Location Name]" (e.g., "STRONG Torquay")
5. Click **Save**

---

## Step 7 | Copy Website Form Embed Code

1. After saving the renamed form, click **Integrate**
2. Click **Copy Embed Code**
3. Keep this on your clipboard for the next step

---

## Step 8 | Paste Embed Code to Notion

1. Open the Grow Website Forms database in Notion
2. Check if this location already has an entry. If yes, verify and update. If no, create a new entry
3. Title the entry: "STRONG [Location] #2"
4. In the body, type `/code` to insert a code block
5. Paste the embed code into the code block
6. Also add the form title as a hyperlink: highlight the title text and Cmd+V to paste the Grow form URL. This way Mario can click directly to the form in Grow if edits are needed

---

## Step 9 | Email Nick at Bushy

Send an email to Nick at bushy.com.au to let the web developer know the form embed code is ready:

1. Compose new email
2. To: Nick (bushy.com.au)
3. Subject: "STRONG [Location] Website Form"
4. Body: Let Nick know the website form for [Location] is complete and the embed code is in the Notion database
5. Include the location name
6. Send

---

## Step 10 | Call Forwarding Setup

1. Go to **Settings > Phone Numbers**
2. Find the Call Forwarding number entry (it may show an empty forwarding number field)
3. Click the three dots > **Edit Configuration**
4. Paste the Core Forwarding phone number from the HQ spreadsheet
5. **CRITICAL: Uncheck "Enable Core Connect Feature"**. If this stays checked, callers will hear "please press any key to connect with us" which is not what we want
6. Click **Save**

If the Core Forwarding number column in the HQ spreadsheet is empty, flag it to Mario.

---

## Step 11 | Delete Past Campaign Content

### Workflows
1. Go to **Automations**
2. Look for folders named with year and month (e.g., "202408", "2024 | 06")
3. Any folder from a campaign that has already ended should be cleaned up
4. **Delete the contents FIRST:** Open the folder, delete each workflow individually (Delete Workflow > type "confirm")
5. **Then delete the folder:** Three dots > Delete Folder
6. Do NOT delete the folder first. If you do, all contents spill into the root level and create a mess

### Email Templates
1. Go to **Marketing > Email > Templates**
2. Same logic: any campaign folder from past months can be archived
3. For email templates, you can **Archive the folder** directly (easier than individual deletion)
4. If unsure whether a campaign is still active, ask Mario before archiving

---

## Step 12 | Notify Mario on Slack

Send a message on Slack:

> Hey Mario, just letting you know that I've completed the initial Grow account setup for STRONG Pilates [Location].
> [Hyperlink to the Grow account URL]

---

## Step 13 | Update Studio Open Dates Spreadsheet

1. Open the AU HQ Locations spreadsheet: `https://docs.google.com/spreadsheets/d/1zEJCLbpPQoifliNQjm30bRz3Vm9S4IF3Ll4ScFPdsDs/`
2. Find the location row
3. Update the relevant date/status columns

---

## Step 14 | Provide Location Access

1. Go to **Settings > My Staff**
2. Check if the studio's email already exists in the staff list
3. If already there, skip this step
4. If not:
   - Click **Add Employee**
   - First Name: `Strong Pilates`
   - Last Name: `[Location Name]` (e.g., `Torquay`)
   - Email: the studio's email address
   - User Roles: **Admin** (not User)
   - Leave Advanced Settings, Calendar, User Permissions at defaults
   - Click **Save**
5. After saving, record `yes-Strong Pilates [Location]` in the tracking so it can be looked up

---

## Step 15 | Mark Complete

1. Find the location in the tracking system
2. Type "yes" in the "New Account Setup Completed" field
3. Done

---

## Verification Checklist

Before notifying Mario, confirm all of the following:

- [ ] All required custom values are filled (check the table in Step 2)
- [ ] Obsolete custom values deleted (STRONG Experience, Tough Love, Long Experience)
- [ ] Push notification Zendesk ticket created (Pending status)
- [ ] Unsubscribe form trigger verified and workflow published
- [ ] Resubscribe form trigger verified and workflow published
- [ ] SMS Unsubscribe workflow published
- [ ] Core Sale Update workflow verified (pipeline stages set) and published
- [ ] Pipeline Other Promotions, Pre-sale, Strong Experience workflows published
- [ ] Tough Love workflows deleted
- [ ] Email forwarding address saved
- [ ] Website form renamed to location name
- [ ] Embed code in Notion
- [ ] Email sent to Nick
- [ ] Call forwarding configured (Core Connect UNCHECKED)
- [ ] Past campaign workflows deleted (contents first, then folders)
- [ ] Past campaign email templates archived
- [ ] Slack notification sent to Mario
- [ ] Spreadsheet updated
- [ ] Location access provided (if needed)

---

## Automation Status

Steps marked with a checkmark can be handled by the `grow-location-setup` skill when available.

| Step | Automatable | Notes |
|---|---|---|
| 1. Log in | Yes | Firebase auth, target locationId |
| 2. Custom values | Yes | Full CRUD API. Requires structured input data for location-specific values |
| 3. Push notification Zendesk | Partial | Can draft. Zendesk API available |
| 4. Turn on workflows | Yes | Publish/unpublish API validated at scale |
| 5. Email forwarding | Needs investigation | Location settings API not yet mapped |
| 6. Update form name | Needs investigation | Forms API not fully mapped |
| 7. Copy embed code | Needs investigation | Form embed code retrieval |
| 8. Notion embed | Yes | Notion MCP available |
| 9. Email Nick | Partial | Can draft via Gmail MCP |
| 10. Call forwarding | Needs investigation | Phone settings API not mapped |
| 11. Delete campaigns | Yes | Workflow DELETE + email template archive APIs available |
| 12. Slack notification | Yes | Slack MCP available |
| 13. Spreadsheet | Yes | Google Sheets API available |
| 14. Location access | Needs investigation | User management API not mapped |
| 15. Mark complete | Depends on tracking system |

---

## Loom References

| Video | URL |
|---|---|
| Initial Setup Full Walkthrough | https://www.loom.com/share/327a0027a0e04227b1458308aa160e7f |
| Custom Values Setup | https://www.loom.com/share/7eda88c249784948b15fbdf5a4f21e16 |
| Push Notification via Zendesk | https://www.loom.com/share/64f8bc0a6cdc492ca379df2c750980c6 |
| Providing Location Access | https://www.loom.com/share/17251e84752d48f1a4a2eaa2d425c0f8 |
