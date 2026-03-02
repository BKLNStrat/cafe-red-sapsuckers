#!/usr/bin/env node
/**
 * Menufy -> Sanity Menu Sync
 * 
 * Scrapes Menufy ordering pages (which are JS-rendered SPAs) and 
 * syncs menu data to Sanity CMS as drafts for review.
 * 
 * Since Menufy is a JS SPA, this script expects pre-scraped JSON files
 * at /tmp/menufy-sapsuckers.json and /tmp/menufy-cafe-red.json
 * 
 * Generate those files first:
 *   node scripts/menufy-scrape-browser.mjs
 * 
 * Or manually via Chrome DevTools:
 *   1. Open ordersapsuckers.com in Chrome
 *   2. Run in console: copy(JSON.stringify([...document.querySelectorAll('.category')].map(c => ({title: c.querySelector('.category-name')?.textContent, items: [...c.querySelectorAll('.item')].map(i => ({name: i.querySelector('.item-name')?.textContent, price: i.querySelector('.item-price')?.textContent, desc: i.querySelector('.item-description')?.textContent}))}))))
 *   3. Save as /tmp/menufy-sapsuckers.json
 * 
 * Usage: SANITY_WRITE_TOKEN=<token> node scripts/menufy-sync.mjs [--publish]
 */

import { readFileSync, existsSync } from 'fs';

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) { console.error('Set SANITY_WRITE_TOKEN'); process.exit(1); }

const autoPublish = process.argv.includes('--publish');
const API = 'https://d676hucs.api.sanity.io/v2023-05-03/data/mutate/production';
const QUERY_API = 'https://d676hucs.api.sanity.io/v2023-05-03/data/query/production';

function slug(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function sanityQuery(query) {
  const url = `${QUERY_API}?query=${encodeURIComponent(query)}`;
  const res = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });
  return (await res.json()).result || [];
}

async function sanityMutate(mutations) {
  for (let i = 0; i < mutations.length; i += 50) {
    const chunk = mutations.slice(i, i + 50);
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ mutations: chunk }),
    });
    if (!res.ok) {
      console.error('Mutation error:', await res.text());
      return false;
    }
  }
  return true;
}

async function syncRestaurant(restaurant, scrapedSections) {
  console.log(`\nSyncing ${restaurant}: ${scrapedSections.length} sections, ${scrapedSections.reduce((n, s) => n + s.items.length, 0)} items`);

  // Get existing dishes
  const existing = await sanityQuery(`*[_type == "dish" && restaurant == "${restaurant}"]{ _id, title, price, description }`);
  const existingMap = {};
  for (const d of existing) existingMap[d.title.toLowerCase()] = d;

  const mutations = [];
  const sectionRefs = [];
  let added = 0, updated = 0, unchanged = 0;

  for (let si = 0; si < scrapedSections.length; si++) {
    const section = scrapedSections[si];
    const dishRefs = [];

    for (const item of section.items) {
      if (!item.name || !item.name.trim()) continue;
      const name = item.name.trim();
      const price = (item.price || '').trim();
      const desc = (item.desc || '').trim();
      const key = name.toLowerCase();
      const dishId = `dish-${restaurant}-${slug(name)}`;

      if (existingMap[key]) {
        const ex = existingMap[key];
        if (ex.price !== price || (desc && ex.description !== desc)) {
          console.log(`  CHANGED: ${name} "${ex.price}" -> "${price}"${desc && ex.description !== desc ? ' +desc' : ''}`);
          const docId = autoPublish ? dishId : `drafts.${dishId}`;
          mutations.push({ createOrReplace: { _type: 'dish', _id: docId, title: name, restaurant, price, description: desc || ex.description || '' } });
          updated++;
        } else {
          unchanged++;
        }
        delete existingMap[key]; // Mark as seen
      } else {
        console.log(`  NEW: ${name} (${price})`);
        const docId = autoPublish ? dishId : `drafts.${dishId}`;
        mutations.push({ createOrReplace: { _type: 'dish', _id: docId, title: name, restaurant, price, description: desc || '' } });
        added++;
      }

      dishRefs.push({ _type: 'reference', _ref: dishId, _key: dishId });
    }

    // Create/update section
    const sectionId = `section-${restaurant}-${slug(section.title || `section-${si}`)}`;
    const secDocId = autoPublish ? sectionId : `drafts.${sectionId}`;
    mutations.push({
      createOrReplace: {
        _type: 'menuSection', _id: secDocId,
        title: section.title || `Section ${si + 1}`,
        subtitle: section.subtitle || '',
        restaurant, sortOrder: si,
        dishes: dishRefs,
      }
    });
    sectionRefs.push(sectionId);
  }

  // Items in Sanity but NOT in Menufy
  const removed = Object.values(existingMap);
  if (removed.length > 0) {
    console.log(`  REMOVED from Menufy (${removed.length} items -- kept in Sanity, not deleted):`);
    for (const r of removed.slice(0, 5)) console.log(`    - ${r.title}`);
    if (removed.length > 5) console.log(`    ... and ${removed.length - 5} more`);
  }

  if (mutations.length > 0) {
    const ok = await sanityMutate(mutations);
    if (ok) console.log(`  Result: ${added} new, ${updated} updated, ${unchanged} unchanged${autoPublish ? ' (published)' : ' (as drafts -- review in Studio)'}`);
  } else {
    console.log(`  No changes. ${unchanged} items match.`);
  }

  return { added, updated, unchanged, removed: removed.length };
}

async function main() {
  console.log('Menufy -> Sanity Menu Sync');
  console.log(`Mode: ${autoPublish ? 'Auto-publish' : 'Drafts for review'}\n`);

  const restaurants = {
    sapsuckers: '/tmp/menufy-sapsuckers.json',
    'cafe-red': '/tmp/menufy-cafe-red.json',
  };

  for (const [restaurant, path] of Object.entries(restaurants)) {
    if (!existsSync(path)) {
      console.log(`Skipping ${restaurant}: ${path} not found.`);
      console.log(`  Run the browser scraper first or save menu JSON manually.`);
      continue;
    }

    try {
      const data = JSON.parse(readFileSync(path, 'utf-8'));
      await syncRestaurant(restaurant, data);
    } catch (e) {
      console.error(`Error processing ${restaurant}:`, e.message);
    }
  }

  console.log('\nDone. If changes were made as drafts, review them in Sanity Studio.');
}

main().catch(e => { console.error(e); process.exit(1); });
