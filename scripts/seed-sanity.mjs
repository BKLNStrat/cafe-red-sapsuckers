#!/usr/bin/env node
/**
 * Seed Sanity CMS with current menu, location, and restaurant data.
 * 
 * Usage:
 *   1. Run `npx sanity login` first
 *   2. Create a write token at https://www.sanity.io/manage/personal/project/d676hucs/api#tokens
 *   3. Run: SANITY_WRITE_TOKEN=<token> node scripts/seed-sanity.mjs
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

// ─── SAPSUCKERS MENU DATA ─────────────────────────────────────────────────────

const sapsuckersMenu = [
  {
    title: 'Specials',
    sortOrder: 0,
    items: [
      { name: 'Yellow Split Pea Soup', price: '$14' },
      { name: 'Homemade Empanadas', price: '$19' },
      { name: 'Lobster & Crab Ravioli', price: '$30' },
      { name: 'Tuscan Monkfish', price: '$36' },
      { name: 'Pork Ossobuco', price: '$35' },
      { name: 'Buffalo Pinsa', price: '$26' },
    ],
  },
  {
    title: 'Appetizers',
    sortOrder: 1,
    items: [
      { name: 'Eggs Nest', price: '$13' },
      { name: 'House Cut Fries', price: '$12' },
      { name: 'Bavarian Pretzel', price: '$12' },
      { name: 'Onion Rings', price: '$15' },
      { name: 'Cheddar Curds', price: '$16' },
      { name: 'Nacho Libre', price: '$20+' },
      { name: 'Buffalo Sprouts', price: '$18' },
      { name: 'Mac + Cheese', price: '$17' },
      { name: 'Pierogies', price: '$17' },
      { name: 'Stuffed Jalapenos', price: '$16' },
      { name: 'Spicy Wings', price: '$19' },
      { name: 'BBQ Wings', price: '$19' },
      { name: 'Three Little Pigs', price: '$16' },
    ],
  },
  {
    title: 'Salads',
    sortOrder: 2,
    items: [
      { name: 'The Wedge', price: '$17+' },
      { name: 'Cauliflower Salad', price: '$16+' },
      { name: 'Il Greco', price: '$15+' },
      { name: 'Caesar', price: '$15+' },
    ],
  },
  {
    title: 'Sandwiches',
    sortOrder: 3,
    items: [
      { name: 'Black Bean Burger', price: '$24' },
      { name: 'Sauzalito', price: '$25' },
      { name: 'Brooklyn Dog', price: '$20' },
      { name: 'Cubano', price: '$26' },
      { name: 'Philly Mignon', price: '$27' },
      { name: 'Alabama Sloppy Hammer', price: '$26' },
      { name: 'The Chief', price: '$26' },
      { name: 'The Mallet Burger', price: '$24+' },
    ],
  },
  {
    title: 'Taco-Land',
    sortOrder: 4,
    items: [
      { name: 'Chili Tacos', price: '$20' },
      { name: 'BBQ Pork Tacos', price: '$20' },
      { name: 'Swordfish Tacos', price: '$26' },
      { name: 'Buffalo Chicken Tacos', price: '$24' },
      { name: 'Tacos Birria', price: '$22' },
    ],
  },
  {
    title: 'Entrees',
    sortOrder: 5,
    items: [
      { name: 'Swordfish Steak', price: '$36' },
      { name: 'Shrimp Curry', price: '$34' },
      { name: 'Shawarma Bowl', price: '$27' },
      { name: 'Lemon Chicken', price: '$28' },
      { name: 'Chicken & Waffles', price: '$34' },
      { name: 'Hay & Straw', price: '$27' },
      { name: 'Pappardelle Bolognese', price: '$29' },
      { name: 'Baby Back Ribs', price: '$34' },
      { name: 'Chili Bowl', price: '$24' },
      { name: 'Beef Short Rib', price: '$39' },
    ],
  },
];

// ─── CAFE RED MENU DATA ───────────────────────────────────────────────────────

const cafeRedMenu = [
  {
    title: 'Specials',
    sortOrder: 0,
    items: [
      { name: 'Soup of the Day', price: 'Market' },
      { name: 'Seasonal Risotto', price: 'Market' },
      { name: "Chef's Fish Special", price: 'Market' },
    ],
  },
  {
    title: 'Brunch',
    subtitle: 'Saturday & Sunday',
    sortOrder: 1,
    items: [
      { name: 'Buttermilk Pancakes', price: '$16', desc: 'Fresh berries, whipped cream, maple syrup' },
      { name: 'French Toast', price: '$17', desc: 'Brioche, seasonal fruit, powdered sugar' },
      { name: 'Eggs Benedict', price: '$18', desc: 'Canadian bacon, hollandaise, English muffin' },
      { name: 'Crab Cake Benedict', price: '$22', desc: 'House crab cakes, poached eggs, hollandaise, avocado' },
      { name: 'Classic Omelet', price: '$16', desc: 'Three eggs, choice of fillings, toast' },
      { name: 'Steak & Eggs', price: '$24', desc: 'Grilled steak, two eggs any style, breakfast potatoes' },
      { name: 'Avocado Toast', price: '$15', desc: 'Smashed avocado, poached egg, everything seasoning' },
    ],
  },
  {
    title: 'Lunch',
    sortOrder: 2,
    items: [
      { name: 'Grilled Chicken Club', price: '$18' },
      { name: 'Turkey BLT', price: '$16' },
      { name: 'Cafe Red Burger', price: '$19', desc: 'Angus beef, aged cheddar, lettuce, tomato, brioche bun' },
      { name: 'Soup & Half Sandwich', price: '$16' },
    ],
  },
  {
    title: 'Lunch Salads',
    sortOrder: 3,
    items: [
      { name: 'Caesar Salad', price: '$15+', desc: 'Romaine, parmesan, croutons, classic dressing' },
      { name: 'Mixed Greens', price: '$14', desc: 'Seasonal greens, vegetables, house vinaigrette' },
      { name: 'Caprese', price: '$16', desc: 'Fresh mozzarella, heirloom tomatoes, basil, balsamic' },
      { name: 'Chopped Italian', price: '$16', desc: 'Salami, peppers, olives, provolone, Italian dressing' },
    ],
  },
  {
    title: 'Lunch Pasta',
    sortOrder: 4,
    items: [
      { name: 'Penne Vodka', price: '$18', desc: 'Creamy vodka sauce, parmesan' },
      { name: 'Spaghetti & Meatballs', price: '$20', desc: 'Housemade meatballs, marinara, parmesan' },
      { name: 'Fettuccine Alfredo', price: '$18+', desc: 'Classic cream sauce, parmesan' },
      { name: 'Mushroom Pappardelle', price: '$20', desc: 'Mixed mushrooms, truffle cream, parmesan' },
    ],
  },
  {
    title: 'Lunch Sandwiches',
    sortOrder: 5,
    items: [
      { name: 'Grilled Cheese & Tomato Soup', price: '$16', desc: 'Three-cheese blend, sourdough' },
      { name: 'Cubano', price: '$18', desc: 'Roasted pork, ham, Swiss, pickles, mustard' },
      { name: 'Italian Hero', price: '$18', desc: 'Capicola, salami, provolone, peppers, oil & vinegar' },
      { name: 'Chicken Parm Sub', price: '$19', desc: 'Breaded cutlet, marinara, mozzarella' },
    ],
  },
  {
    title: 'Dinner Starters',
    sortOrder: 6,
    items: [
      { name: 'Bruschetta', price: '$14', desc: 'Heirloom tomato, garlic, basil, balsamic' },
      { name: 'Fried Calamari', price: '$17', desc: 'Lemon, marinara' },
      { name: 'Meatballs', price: '$15', desc: 'Housemade, Sunday gravy, ricotta' },
      { name: 'Burrata', price: '$18', desc: 'Prosciutto, roasted peppers, arugula, balsamic' },
      { name: 'Shrimp Scampi', price: '$19', desc: 'White wine, garlic, lemon, butter, crostini' },
      { name: 'Bread & Bacon Jam', price: '$12', desc: 'Warm bread, housemade bacon jam' },
    ],
  },
  {
    title: 'Dinner Pasta',
    sortOrder: 7,
    items: [
      { name: 'Rigatoni Bolognese', price: '$24', desc: 'Slow-braised meat sauce, parmesan' },
      { name: 'Lobster Ravioli', price: '$30', desc: 'Lobster cream sauce, fresh herbs' },
      { name: 'Chicken Parmigiana', price: '$26', desc: 'Breaded cutlet, marinara, mozzarella, spaghetti' },
      { name: 'Mushroom Pappardelle', price: '$24', desc: 'Wild mushrooms, truffle cream, parmesan' },
      { name: 'Shrimp Fra Diavolo', price: '$28', desc: 'Spicy tomato sauce, linguine' },
      { name: 'Eggplant Parmigiana', price: '$22', desc: 'Breaded eggplant, marinara, mozzarella, ricotta' },
    ],
  },
  {
    title: 'Dinner Entrees',
    sortOrder: 8,
    items: [
      { name: 'NY Strip Steak', price: '$38', desc: '12oz grilled, peppercorn sauce, asparagus, fries' },
      { name: 'Grilled Salmon', price: '$32', desc: 'Lemon butter, seasonal vegetables, rice' },
      { name: 'Chicken Marsala', price: '$26', desc: 'Mushroom Marsala sauce, mashed potatoes' },
      { name: 'Veal Piccata', price: '$30', desc: 'Lemon caper sauce, angel hair pasta' },
      { name: 'Grilled Branzino', price: '$34', desc: 'Herb crust, lemon, roasted vegetables' },
      { name: 'Short Rib', price: '$36', desc: 'Braised, red wine reduction, creamy polenta' },
    ],
  },
];

// ─── LOCATION DATA ────────────────────────────────────────────────────────────

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

// ─── SEED LOGIC ───────────────────────────────────────────────────────────────

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function seedMenu(restaurant, sections) {
  const sectionRefs = [];

  for (const section of sections) {
    const dishRefs = [];

    for (const item of section.items) {
      const dishId = `dish-${restaurant}-${slugify(item.name)}`;
      const doc = {
        _type: 'dish',
        _id: dishId,
        title: item.name,
        restaurant,
        price: item.price,
        description: item.desc || '',
      };

      await client.createOrReplace(doc);
      dishRefs.push({ _type: 'reference', _ref: dishId, _key: dishId });
      process.stdout.write('.');
    }

    const sectionId = `section-${restaurant}-${slugify(section.title)}`;
    const sectionDoc = {
      _type: 'menuSection',
      _id: sectionId,
      title: section.title,
      subtitle: section.subtitle || '',
      restaurant,
      sortOrder: section.sortOrder,
      dishes: dishRefs,
    };

    await client.createOrReplace(sectionDoc);
    sectionRefs.push({ _type: 'reference', _ref: sectionId, _key: sectionId });
    console.log(` ${section.title}`);
  }

  const menuId = `menu-${restaurant}`;
  await client.createOrReplace({
    _type: 'menu',
    _id: menuId,
    title: restaurant === 'sapsuckers' ? 'Sapsuckers Menu' : 'Cafe Red Menu',
    restaurant,
    sections: sectionRefs,
  });

  console.log(`Menu "${restaurant}" created with ${sectionRefs.length} sections.\n`);
}

async function main() {
  console.log('Seeding Sanity CMS for Cafe Red & Sapsuckers...\n');

  // Seed locations
  console.log('Seeding locations...');
  for (const loc of locations) {
    await client.createOrReplace(loc);
    console.log(`  Location: ${loc.name}`);
  }
  console.log();

  // Seed Sapsuckers menu
  console.log('Seeding Sapsuckers menu...');
  await seedMenu('sapsuckers', sapsuckersMenu);

  // Seed Cafe Red menu
  console.log('Seeding Cafe Red menu...');
  await seedMenu('cafe-red', cafeRedMenu);

  console.log('Done! All data seeded.');
}

main().catch((err) => {
  console.error('Seed error:', err.message);
  process.exit(1);
});
