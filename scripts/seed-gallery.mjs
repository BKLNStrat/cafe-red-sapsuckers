#!/usr/bin/env node
/**
 * Seed Sanity gallery sections using raw HTTP API.
 * Usage: source .env.local && node scripts/seed-gallery.mjs
 */

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) { console.error('Set SANITY_WRITE_TOKEN'); process.exit(1); }

const sections = [
  { _id: 'gallery-sapsuckers-food', restaurant: 'sapsuckers', title: 'From the Kitchen', sortOrder: 0, aspectRatio: 'square', columns: 4, photos: [] },
  { _id: 'gallery-sapsuckers-drinks', restaurant: 'sapsuckers', title: 'On Tap', sortOrder: 1, aspectRatio: 'landscape', columns: 3, photos: [] },
  { _id: 'gallery-sapsuckers-space', restaurant: 'sapsuckers', title: 'The Space', sortOrder: 2, aspectRatio: 'landscape', columns: 3, photos: [] },
  { _id: 'gallery-cafered-food', restaurant: 'cafe-red', title: 'From the Kitchen', sortOrder: 0, aspectRatio: 'square', columns: 4, photos: [] },
  { _id: 'gallery-cafered-interior', restaurant: 'cafe-red', title: 'The Dining Room', sortOrder: 1, aspectRatio: 'square', columns: 4, photos: [] },
  { _id: 'gallery-cafered-exterior', restaurant: 'cafe-red', title: 'Our Location', sortOrder: 2, aspectRatio: 'landscape', columns: 3, photos: [] },
];

const mutations = sections.map(s => ({
  createOrReplace: { _type: 'gallerySection', ...s }
}));

const res = await fetch('https://d676hucs.api.sanity.io/v2023-05-03/data/mutate/production', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ mutations }),
});

const data = await res.json();
if (res.ok) {
  console.log('Gallery sections seeded:');
  sections.forEach(s => console.log(`  + ${s.title} (${s.restaurant})`));
  console.log('\nAdd photos via Sanity Studio: https://cafe-red-sapsuckers.sanity.studio/');
} else {
  console.error('Error:', JSON.stringify(data, null, 2));
  process.exit(1);
}
