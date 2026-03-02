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

- Menu items, descriptions, and prices (website display)
- Events and specials
- Photos in the gallery
- Restaurant hours
- Contact information

Through Menufy (as you do now):

- Online ordering menu, prices, availability
- Delivery/pickup settings

Through OpenTable (as you do now):

- Reservation availability and settings

---

## Using Sanity Studio

### Accessing the Dashboard

1. Go to **https://cafe-red-sapsuckers.sanity.studio/** in your web browser
2. Sign in with the Google account we set up during onboarding
3. You will see the content dashboard with categories on the left sidebar

### The Dashboard Layout

The left sidebar shows your content types:

- **Dishes** -- Individual menu items (name, description, price, dietary tags, photo)
- **Menu Sections** -- Groups of dishes (e.g., "Appetizers", "Entrees", "Brunch")
- **Menus** -- Full menus made up of sections (e.g., "Sapsuckers Dinner Menu")
- **Events** -- Upcoming events and specials
- **Locations** -- Restaurant details (address, phone, hours)

### Editing a Menu Item

1. Click **Dishes** in the sidebar
2. Find the dish you want to edit (use the search bar at the top)
3. Click on it to open the editor
4. Make your changes:
   - **Title** -- the dish name as it appears on the website
   - **Description** -- a brief description (1-2 sentences)
   - **Price** -- number only, no dollar sign (e.g., `14.95`)
   - **Dietary Tags** -- check any that apply (Vegan, Vegetarian, Gluten-Free, etc.)
   - **Image** -- click to upload or replace a photo
5. Click **Publish** in the bottom-right corner

Changes appear on the website within a few minutes.

### Adding a New Dish

1. Click **Dishes** in the sidebar
2. Click the **+ Create** button (top-right or pencil icon)
3. Fill in all fields
4. Click **Publish**
5. Then add the dish to the appropriate **Menu Section** (see below)

### Organizing Menu Sections

1. Click **Menu Sections** in the sidebar
2. Click the section you want to edit (e.g., "Appetizers")
3. In the **Dishes** field, you can:
   - Drag items to reorder them
   - Click **Add item** to add a dish reference
   - Click the X on any item to remove it from the section
4. Click **Publish**

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

## Managing Online Ordering

Your Menufy accounts are completely separate from the website and work exactly as before:

- **Cafe Red orders:** ordercafered.com
- **Sapsuckers orders:** ordersapsuckers.com

When a customer clicks "Order Online" on your website, they are taken directly to your Menufy page. Any changes you make in Menufy (prices, items, availability, hours) take effect immediately on the ordering side.

**Important:** The menu displayed on your *website* (for browsing) is managed separately in Sanity. If you change a price in Menufy, you should also update it in Sanity so the website matches. These are two separate systems.

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

### "I need to add a new dish to the menu"

1. Sanity Studio > Dishes > Create new dish (name, description, price)
2. Sanity Studio > Menu Sections > Add the dish to the right section
3. Update Menufy if the dish should also be available for online ordering

### "I need to change a price"

1. Sanity Studio > Dishes > Find the dish > Update the price > Publish
2. Update the same price in Menufy

### "I need to post about an upcoming event"

1. Sanity Studio > Events > Create new event with details and date
2. Publish -- it will appear on the website

### "I need to update our hours for a holiday"

1. Sanity Studio > Locations > Edit hours > Publish
2. Also update Google Business Profile and OpenTable

### "I want to add new photos from a recent photoshoot"

1. For menu item photos: upload directly in Sanity (edit the dish, replace image)
2. For gallery page: send photos to Brooklyn Strategic

### "A menu section needs to be reorganized"

1. Sanity Studio > Menu Sections > Drag dishes to reorder
2. Publish

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
| Edit a menu item or price | Sanity Studio > Dishes |
| Add a new dish | Sanity Studio > Dishes > Create |
| Reorder menu items | Sanity Studio > Menu Sections |
| Add an event | Sanity Studio > Events > Create |
| Change hours | Sanity Studio > Locations |
| Update online ordering menu | Menufy (ordercafered.com / ordersapsuckers.com) |
| Manage reservations | OpenTable |
| Update gallery photos | Email Brooklyn Strategic |
| Something looks broken | Email Brooklyn Strategic |

---

*This guide is also available at the URL provided during onboarding. Bookmark it for easy reference.*
