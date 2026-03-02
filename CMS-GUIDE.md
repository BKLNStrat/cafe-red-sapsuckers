# Website Management Guide
## Cafe Red & Sapsuckers

**Prepared for:** Kelley Danek and the Red & Co team
**Prepared by:** Brooklyn Strategic
**Last updated:** March 2026

---

## Table of Contents

1. [Overview](#overview)
2. [What You Can Update Yourself](#what-you-can-update-yourself)
3. [Using Sanity Studio (Your CMS)](#using-sanity-studio)
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

## Using Sanity Studio

### Accessing the Dashboard

1. Go to **https://cafe-red-sapsuckers.sanity.studio/** in your web browser
2. Sign in with the Google account we set up during onboarding
3. You will see the content dashboard with categories on the left sidebar

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

## Managing Online Ordering & Menus

Your Menufy accounts handle BOTH online ordering AND the menu display. This is unchanged from before:

- **Cafe Red orders & menu:** ordercafered.com
- **Sapsuckers orders & menu:** ordersapsuckers.com

When a customer clicks "Order Online" on your website, they are taken directly to your Menufy page. Any changes you make in Menufy (prices, items, availability, hours) take effect immediately.

**The website menu page displays the current menu items.** If menu items or prices change significantly, let Brooklyn Strategic know and we will update the website menu page to match.

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

Update it in Menufy as you normally do. If it is a significant change (new section, many new items), let Brooklyn Strategic know and we will update the website menu page.

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

- **Gallery page layout** -- adding/removing/reordering gallery page photos
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
| Change menu items or prices | Menufy (ordercafered.com / ordersapsuckers.com) |
| Update restaurant hours | Sanity Studio > Locations |
| Edit about section text | Sanity Studio > Site Content |
| Post an announcement banner | Sanity Studio > Site Content |
| Add an event | Sanity Studio > Events > Create |
| Manage reservations | OpenTable |
| Update gallery photos | Email Brooklyn Strategic |
| Update website menu page | Email Brooklyn Strategic |
| Something looks broken | Email Brooklyn Strategic |

---

*This guide is also available at the URL provided during onboarding. Bookmark it for easy reference.*
