#!/usr/bin/env node
/**
 * Seed Sanity CMS with location, event, and site content data.
 * Menus are managed via Menufy -- NOT in Sanity.
 * 
 * Usage:
 *   SANITY_WRITE_TOKEN=<token> node scripts/seed-sanity.mjs
 */

import { createClient } from '@sanity/client';

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error('Set SANITY_WRITE_TOKEN env var. Create one at:');
  console.error('https://www.sanity.io/manage/personal/project/d676hucs/api#tokens');
  process.exit(1);
}

const client = createClient({
  projectId: 'd676hucs',
  dataset: 'production',
  token,
  apiVersion: '2023-05-03',
  useCdn: false,
});

const locations = [
  {
    _type: 'location',
    _id: 'location-sapsuckers',
    name: 'Sapsuckers Hops & Grub',
    slug: 'sapsuckers',
    address: '287 Main St',
    city: 'Huntington',
    state: 'NY',
    zip: '11743',
    phone: '(631) 923-3065',
    hours: [
      { _key: 'h1', days: 'Open 7 Days', hours: '12pm - 10pm' },
      { _key: 'h2', days: 'Fri & Sat Late Night Happy Hour', hours: '10pm - 11pm' },
    ],
    orderUrl: 'https://www.ordersapsuckers.com/',
    reservationUrl: 'https://www.opentable.com/r/sapsuckers-hops-and-grub-huntington',
  },
  {
    _type: 'location',
    _id: 'location-cafe-red',
    name: 'Cafe Red',
    slug: 'cafe-red',
    address: '2 Pulaski Rd',
    city: 'Kings Park',
    state: 'NY',
    zip: '11754',
    phone: '(631) 544-4500',
    hours: [
      { _key: 'h1', days: 'Mon - Thu', hours: '11am - 9pm' },
      { _key: 'h2', days: 'Friday', hours: '11am - 10pm' },
      { _key: 'h3', days: 'Saturday', hours: '10am - 10pm' },
      { _key: 'h4', days: 'Sunday', hours: '10am - 8pm' },
    ],
    orderUrl: 'https://www.ordercafered.com/',
    reservationUrl: 'https://www.opentable.com/r/cafe-red-of-kings-park',
  },
];

const siteContent = [
  {
    _type: 'siteContent',
    _id: 'content-sapsuckers',
    restaurant: 'sapsuckers',
    heroTagline: 'Migrate Less, Drink Local',
    aboutHeading: 'Your Neighborhood Favorite Since 2010',
    aboutBody: [
      {
        _type: 'block',
        _key: 'b1',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 's1', text: "Hatched in September 2010, Sapsuckers has become a neighborhood favorite for awesome hops & grub. We keep sixteen lines of craft beers rotating -- all small production and special, many rare and extremely limited. Our Field Guide To Beer gives each one the respect it deserves.", marks: [] }],
      },
      {
        _type: 'block',
        _key: 'b2',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 's2', text: "From the kitchen comes a gastro-pub style menu built on small farm raised meats, artisanal breads, and seasonally local produce. We blend our own organic meats for our burgers, honor a Polish family's recipe for authentic pierogies, and hand cut our fries each morning.", marks: [] }],
      },
      {
        _type: 'block',
        _key: 'b3',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 's3', text: "Enjoy it all in a polished, warm pub setting -- ebony-stained mahogany, antiqued mirrors, vintage lighting, Audubon lithographs under a hand-patina copper tin ceiling, and our custom-made polished chrome beer tower imported from Germany.", marks: [] }],
      },
    ],
  },
  {
    _type: 'siteContent',
    _id: 'content-cafe-red',
    restaurant: 'cafe-red',
    heroTagline: 'New American Cuisine with Italian Flair',
    aboutHeading: 'New American Cuisine with Italian Flair',
    aboutBody: [
      {
        _type: 'block',
        _key: 'b1',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 's1', text: "A warm, woodsy spot with a full bar serving Italian fare and creative takes on American eats. Our kitchen showcases local and organic ingredients to create a menu of refined new American fare.", marks: [] }],
      },
      {
        _type: 'block',
        _key: 'b2',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 's2', text: "From housemade pastas and brunch classics to perfectly prepared steaks and seafood, Cafe Red brings warmth and character to Kings Park. Full liquor license -- enjoy cocktails, wine, and beer with your lunch or dinner.", marks: [] }],
      },
      {
        _type: 'block',
        _key: 'b3',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', _key: 's3', text: "Open seven days for brunch, lunch, and dinner. Call ahead for reservations or curbside pickup.", marks: [] }],
      },
    ],
  },
];

async function main() {
  console.log('Seeding Sanity CMS...\n');

  console.log('Locations:');
  for (const loc of locations) {
    await client.createOrReplace(loc);
    console.log(`  + ${loc.name}`);
  }

  console.log('\nSite Content:');
  for (const content of siteContent) {
    await client.createOrReplace(content);
    console.log(`  + ${content.restaurant}`);
  }

  console.log('\nDone! Content seeded.');
  console.log('Manage at: https://cafe-red-sapsuckers.sanity.studio/');
}

main().catch((err) => {
  console.error('Seed error:', err.message);
  process.exit(1);
});
