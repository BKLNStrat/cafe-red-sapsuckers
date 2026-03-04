import { sanityClient } from 'sanity:client';

export interface LocationData {
  name: string;
  phone: string;
  phoneTel: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  hours: string;
  orderUrl: string;
  reservationUrl: string;
}

export interface SiteContentData {
  heroTagline: string;
  aboutHeading: string;
  aboutBody: string;
  announcementBanner: string;
}

const LOCATION_DEFAULTS: Record<string, LocationData> = {
  sapsuckers: {
    name: 'Sapsuckers Hops & Grub',
    phone: '(631) 923-3065',
    phoneTel: '+16319233065',
    address: '287 Main St',
    city: 'Huntington',
    state: 'NY',
    zip: '11743',
    hours: '',
    orderUrl: 'https://www.ordersapsuckers.com/',
    reservationUrl: 'https://www.opentable.com/r/sapsuckers-hops-and-grub-huntington',
  },
  'cafe-red': {
    name: 'Cafe Red',
    phone: '(631) 544-4500',
    phoneTel: '+16315444500',
    address: '2 Pulaski Rd',
    city: 'Kings Park',
    state: 'NY',
    zip: '11754',
    hours: '',
    orderUrl: 'https://www.ordercafered.com/',
    reservationUrl: 'https://www.opentable.com/r/cafe-red-of-kings-park',
  },
};

const CONTENT_DEFAULTS: Record<string, SiteContentData> = {
  sapsuckers: {
    heroTagline: 'Migrate Less, Drink Local',
    aboutHeading: 'Craft Beer. Gastropub Grub. Good Times.',
    aboutBody: 'Sixteen rotating taps of the best craft beers. Handcrafted burgers, wings, and creative American comfort food. A place where everyone knows your name. Welcome to Sapsuckers.',
    announcementBanner: '',
  },
  'cafe-red': {
    heroTagline: 'New American Cuisine with Italian Flair',
    aboutHeading: 'Where Every Meal Tells a Story',
    aboutBody: 'From housemade pastas and brunch classics to perfectly prepared steaks and seafood, Cafe Red brings warmth and character to Kings Park. Full liquor license -- enjoy cocktails, wine, and beer with your lunch or dinner.',
    announcementBanner: '',
  },
};

function phoneToTel(phone: string): string {
  return '+1' + phone.replace(/\D/g, '');
}

export async function getLocation(restaurant: 'sapsuckers' | 'cafe-red'): Promise<LocationData> {
  const defaults = LOCATION_DEFAULTS[restaurant];
  try {
    const data = await sanityClient.fetch(
      `*[_type == "location" && _id == $id][0]{ name, phone, address, city, state, zip, hours, orderUrl, reservationUrl }`,
      { id: `location-${restaurant}` }
    );
    if (data) {
      return {
        name: data.name || defaults.name,
        phone: data.phone || defaults.phone,
        phoneTel: data.phone ? phoneToTel(data.phone) : defaults.phoneTel,
        address: data.address || defaults.address,
        city: data.city || defaults.city,
        state: data.state || defaults.state,
        zip: data.zip || defaults.zip,
        hours: data.hours || defaults.hours,
        orderUrl: data.orderUrl || defaults.orderUrl,
        reservationUrl: data.reservationUrl || defaults.reservationUrl,
      };
    }
  } catch (e) {
    // Sanity unavailable
  }
  return defaults;
}

function blocksToText(blocks: any): string {
  if (typeof blocks === 'string') return blocks;
  if (!Array.isArray(blocks)) return '';
  return blocks
    .filter((b: any) => b._type === 'block')
    .map((b: any) => (b.children || []).map((c: any) => c.text || '').join(''))
    .join('\n\n');
}

export async function getSiteContent(restaurant: 'sapsuckers' | 'cafe-red'): Promise<SiteContentData> {
  const defaults = CONTENT_DEFAULTS[restaurant];
  try {
    const data = await sanityClient.fetch(
      `*[_type == "siteContent" && _id == $id][0]{ heroTagline, aboutHeading, aboutBody, announcementBanner }`,
      { id: `content-${restaurant}` }
    );
    if (data) {
      return {
        heroTagline: data.heroTagline || defaults.heroTagline,
        aboutHeading: data.aboutHeading || defaults.aboutHeading,
        aboutBody: blocksToText(data.aboutBody) || defaults.aboutBody,
        announcementBanner: data.announcementBanner || '',
      };
    }
  } catch (e) {
    // Sanity unavailable
  }
  return defaults;
}
