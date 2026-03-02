# Website Management Guide
## Cafe Red & Sapsuckers

**Prepared for:** Kelley Danek and the Red & Co team
**Prepared by:** Brooklyn Strategic
**Last updated:** March 2026

---

## Table of Contents

1. [Overview](#overview)
2. [What You Can Update Yourself](#what-you-can-update-yourself)
3. [Getting Started -- First-Time Login](#getting-started----first-time-login)
4. [Using Sanity Studio (Your CMS)](#using-sanity-studio)
4. [Managing Online Ordering (Menufy)](#managing-online-ordering)
5. [Managing Reservations (OpenTable)](#managing-reservations)
6. [Photo Gallery](#photo-gallery)
7. [Hours, Contact Info, and Location Details](#hours-contact-info-and-location-details)
8. [Common Tasks Step-by-Step](#common-tasks)
9. [What Requires Developer Help](#what-requires-developer-help)
10. [Support and Contacts](#support-and-contacts)

---

## Overview

Your websites are built on two platforms that work together:

- **Astro** -- the framework that generates your website pages (fast, lightweight, secure)
- **Sanity CMS** -- the content management system where you edit menus, events, and other content through a visual dashboard (no code required)

The sites are hosted on a dedicated server with SSL encryption. Your existing integrations are preserved:

| Feature | Service | How It Connects |
|---------|---------|-----------------|
| Online ordering | **Menufy** | "Order Online" buttons link to ordercafered.com / ordersapsuckers.com |
| Reservations | **OpenTable** | "Make a Reservation" buttons link to your OpenTable pages |
| Menu prices/items (ordering) | **Menufy** | You update menus in Menufy as you always have |
| Website menu display | **Sanity CMS** | Editable through your Sanity dashboard |

**Key point:** Menufy and OpenTable are *not* affected by the new website. They work exactly as before. The website buttons simply link to them.

---

## What You Can Update Yourself

Through Sanity Studio (no technical skills needed):

- About section text and headings
- Restaurant hours
- Contact information and addresses
- Events and specials announcements
- Announcement banners (e.g., holiday closures, special events)

Through Menufy (as you do now -- unchanged):

- Menu items, prices, and availability (for both online ordering AND website display)
- Delivery/pickup settings

Through OpenTable (as you do now -- unchanged):

- Reservation availability and settings

---

## Getting Started -- First-Time Login

### Step 1: Accept Your Invitation

You will receive an email from **Sanity** (no-reply@sanity.io) inviting you to the "Cafe Red Sapsuckers" project. Click the link in that email to create your free Sanity account.

- You can sign up with **Google** (recommended -- use your existing email) or create a username/password
- This is a one-time setup. After this, you just go to the Studio URL and you are logged in

### Step 2: Open Sanity Studio

Bookmark this link -- it is your content dashboard:

**http://104.236.69.208:3333/**

(This URL will move to a cleaner address once the domains are pointed to the new server.)

### Step 3: Log In

1. Go to the Studio URL above
2. Click **Log in** (or **Sign in with Google** if you used Google to create your account)
3. You will see the content dashboard with categories on the left sidebar

If you are already logged in from accepting the invitation, the dashboard will load automatically.

### Troubleshooting Login

- **"You are not authorized"** -- Make sure you are using the same email address that received the Sanity invitation. If the problem persists, email andrew@brooklynstrategic.com.
- **Forgot password** -- Click "Forgot password" on the Sanity login page, or sign in with Google instead.
- **The page is blank or not loading** -- Try a different browser (Chrome recommended) or clear your cache.

---

## Using Sanity Studio

### The Dashboard

### The Dashboard Layout

The left sidebar shows your content types:

- **Locations** -- Restaurant details (address, phone, hours, ordering/reservation URLs)
- **Site Content** -- About section text, hero taglines, announcement banners
- **Events** -- Upcoming events and specials

### Editing Hours

1. Click **Locations** in the sidebar
2. Select the restaurant (Sapsuckers or Cafe Red)
3. Edit the **Hours** entries -- each row has "Days" and "Hours" fields
4. Click **Publish** in the bottom-right corner

Changes appear on the website after the next rebuild (typically within minutes).

### Editing About Section Text

1. Click **Site Content** in the sidebar
2. Select the restaurant
3. Edit the **About Section Heading** or **About Section Body**
4. The body is rich text -- you can bold, italicize, and create paragraphs
5. Click **Publish**

### Adding an Announcement Banner

1. Click **Site Content** in the sidebar
2. Select the restaurant
3. Fill in the **Announcement Banner** field (e.g., "Closed Dec 25 for Christmas")
4. Click **Publish**
5. To remove the banner, clear the field and publish again

### Adding an Event

1. Click **Events** in the sidebar
2. Click **+ Create**
3. Fill in:
   - **Title** -- e.g., "Live Music: Jazz Night"
   - **Date** -- select date and time
   - **Description** -- details about the event
   - **Image** -- optional promotional image
4. Click **Publish**

Past events will need to be manually removed or unpublished when they are over.

---

## Managing Menus

Your website menus are now editable in Sanity Studio, giving you full control.

### Editing Menu Items in Sanity

1. Click **Dishes** in the sidebar to see all menu items
2. Click any dish to edit its name, price, or description
3. Click **Publish** to save

### Adding a New Dish

1. Click **Dishes** in the sidebar
2. Click **+ Create**
3. Fill in: **Name**, **Restaurant** (Sapsuckers or Cafe Red), **Price**, and optionally a **Description**
4. Click **Publish**
5. Then go to **Menu Sections**, find the section it belongs to (e.g., "Appetizers"), and add the new dish to the list

### Removing a Dish

1. Find the dish in **Dishes**
2. Click the **...** menu in the top-right corner and choose **Unpublish** (hides it) or **Delete** (removes it permanently)
3. If deleting, also remove it from the Menu Section it was in

### Reordering Sections or Dishes

- **Sections** have a **Sort Order** number -- lower numbers appear first on the menu page
- **Dishes within a section** can be reordered by dragging them in the Menu Section editor

### Syncing from Menufy (Optional)

There is a "Sync from Menufy" tool that can automatically pull your current Menufy menu into Sanity. When run, it:
- Compares Menufy prices/items against what is in Sanity
- Creates **draft** entries for anything new or changed
- You review the drafts and publish what you want

This is a convenience feature -- you never have to use it. You can always edit menus directly in Sanity.

## Online Ordering (Menufy)

Your Menufy accounts handle online ordering. This is completely unchanged:

- **Cafe Red:** ordercafered.com
- **Sapsuckers:** ordersapsuckers.com

When a customer clicks "Order Online" on your website, they go directly to your Menufy page. Any changes you make in Menufy (prices, items, delivery settings) take effect immediately on the ordering side.

**Note:** Menufy and the website menu are separate. If you update a price in Menufy, you should also update it in Sanity so the website matches. Or ask us to run the Menufy sync tool.

---

## Managing Reservations

OpenTable links are built into every page:

- **Cafe Red:** opentable.com/r/cafe-red-of-kings-park
- **Sapsuckers:** opentable.com/r/sapsuckers-hops-and-grub-huntington

Manage your reservations, availability, and settings through OpenTable as you normally do. No changes needed on the website side.

---

## Photo Gallery

### Replacing or Adding Photos

Photos can be updated in two ways:

**Option 1: Through Sanity (for menu items and events)**
- Edit the dish or event in Sanity Studio
- Click the image field
- Upload a new photo
- Click Publish

**Option 2: For gallery page photos**
- Gallery page photos require a developer update (see [What Requires Developer Help](#what-requires-developer-help))
- Send new photos to Brooklyn Strategic and we will add them

### Photo Tips

- **Landscape orientation** works best for most placements
- **Minimum 1200px wide** for sharp display on all devices
- **JPEG format** is preferred (smaller file size, faster loading)
- **Natural lighting** photographs best -- avoid heavy filters

---

## Hours, Contact Info, and Location Details

### Updating Hours

1. Go to Sanity Studio
2. Click **Locations** in the sidebar
3. Select the restaurant
4. Edit the **Hours** field
5. Click **Publish**

**Current hours on file:**

**Sapsuckers**
Open 7 Days: 12pm - 10pm
Friday & Saturday Late Night Happy Hour: 10pm - 11pm

**Cafe Red**
Mon - Thu: 11am - 9pm
Friday: 11am - 10pm
Saturday: 10am - 10pm
Sunday: 10am - 8pm

If hours change seasonally or for holidays, update both:
1. The Sanity CMS (website display)
2. Your Google Business Profile
3. OpenTable availability

---

## Common Tasks

### "I need to change a menu item or price"

1. Sanity Studio > Dishes > Find the item > Edit name, price, or description > Publish
2. If you also use Menufy for online ordering, update it there too so both match

### "I need to update our hours"

1. Sanity Studio > Locations > Select restaurant > Edit hours > Publish
2. Also update Google Business Profile and OpenTable

### "I need to post about an upcoming event"

1. Sanity Studio > Events > Create new event with details and date
2. Publish -- it will appear on the website

### "I need to announce a holiday closure or special"

1. Sanity Studio > Site Content > Select restaurant
2. Fill in the Announcement Banner field
3. Publish
4. Clear and republish when the announcement is over

### "I want to update the about section text"

1. Sanity Studio > Site Content > Select restaurant
2. Edit the About Section Heading or Body
3. Publish

### "I want to add new photos from a recent photoshoot"

Send photos to Brooklyn Strategic -- we will optimize and add them to the gallery.

---

## What Requires Developer Help

These changes need Brooklyn Strategic to implement:

- **Page structure changes** -- adding new pages, changing navigation
- **Design changes** -- colors, fonts, layout modifications
- **New integrations** -- adding Instagram feeds, email signup forms, etc.
- **Domain/hosting changes** -- DNS, SSL certificates, server configuration

Contact Brooklyn Strategic for any of these (see below).

---

## Support and Contacts

**Brooklyn Strategic (website developer)**
Andrew MacDowell
andrew@brooklynstrategic.com
347-581-5272

**Post-launch support:** 30 days of support included from launch date. This covers bug fixes, minor content adjustments, and questions about using the CMS.

**After support period:** Content updates via Sanity are self-service at no cost. Design or structural changes can be arranged as needed.

---

## Quick Reference Card

| I want to... | Go to... |
|---|---|
| Change menu items or prices | Sanity Studio > Dishes |
| Update restaurant hours | Sanity Studio > Locations |
| Edit about section text | Sanity Studio > Site Content |
| Post an announcement banner | Sanity Studio > Site Content |
| Add an event | Sanity Studio > Events > Create |
| Update online ordering (Menufy) | ordercafered.com / ordersapsuckers.com |
| Manage reservations | OpenTable |
| Update gallery photos | Sanity Studio > Gallery Sections (or email Brooklyn Strategic) |
| Something looks broken | Email Brooklyn Strategic |

---

*This guide is also available at the URL provided during onboarding. Bookmark it for easy reference.*
