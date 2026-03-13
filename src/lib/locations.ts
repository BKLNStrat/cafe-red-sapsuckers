import { sanityClient } from 'sanity:client';

export interface HoursEntry {
  days: string;
  hours: string;
}

export interface LocationData {
  name: string;
  phone: string;
  phoneTel: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  hours: HoursEntry[];
  orderUrl: string;
  reservationUrl: string;
  mapEmbedUrl: string;
  mapDirectionsUrl: string;
  untappdEmbedUrl: string;
  facebookUrl: string;
  instagramUrl: string;
}

export interface SiteContentData {
  heroTagline: string;
  aboutHeading: string;
  aboutBody: string;
  announcement: string;
  ga4MeasurementId: string;
}

const LOCATION_DEFAULTS: Record<string, LocationData> = {
  sapsuckers: {
    name: 'Sapsuckers Hops & Grub',
    phone: '(631) 683-4945',
    phoneTel: '+16319233065',
    address: '287 Main St',
    city: 'Huntington',
    state: 'NY',
    zip: '11743',
    email: '',
    hours: [
      { days: 'Open 7 Days', hours: '12pm - 10pm' },
      { days: 'Fri & Sat Late Night Happy Hour', hours: '10pm - 11pm' },
    ],
    orderUrl: 'https://www.ordersapsuckers.com/',
    reservationUrl: 'https://www.opentable.com/r/sapsuckers-hops-and-grub-huntington',
    mapEmbedUrl: '',
    mapDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Sapsuckers+Hops+%26+Grub+287+Main+St+Huntington+NY+11743',
    untappdEmbedUrl: 'https://business.untappd.com/embeds/iframes/15551/58029',
    facebookUrl: '',
    instagramUrl: '',
  },
  'cafe-red': {
    name: 'Cafe Red',
    phone: '(631) 544-4500',
    phoneTel: '+16315444500',
    address: '107 Main Street',
    city: 'Kings Park',
    state: 'NY',
    zip: '11754',
    email: '',
    hours: [
      { days: 'Mon - Thu', hours: '11am - 9pm' },
      { days: 'Friday', hours: '11am - 10pm' },
      { days: 'Saturday', hours: '10am - 10pm' },
      { days: 'Sunday', hours: '10am - 8pm' },
    ],
    orderUrl: 'https://www.ordercafered.com/',
    reservationUrl: 'https://www.opentable.com/r/cafe-red-of-kings-park',
    mapEmbedUrl: '',
    mapDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Cafe+Red+107+Main+Street+Kings+Park+NY+11754',
    untappdEmbedUrl: '',
    facebookUrl: '',
    instagramUrl: '',
  },
};

const CONTENT_DEFAULTS: Record<string, SiteContentData> = {
  sapsuckers: {
    heroTagline: 'Migrate Less, Drink Local',
    aboutHeading: 'Your Neighborhood Favorite Since 2010',
    aboutBody: 'Hatched in September 2010, Sapsuckers has become a neighborhood favorite for awesome hops & grub.',
    announcement: '',
    ga4MeasurementId: '',
  },
  'cafe-red': {
    heroTagline: 'New American Cuisine with Italian Flair',
    aboutHeading: 'Where Every Meal Tells a Story',
    aboutBody: 'From housemade pastas and brunch classics to perfectly prepared steaks and seafood, Cafe Red brings warmth and character to Kings Park.',
    announcement: '',
    ga4MeasurementId: '',
  },
};

function phoneToTel(phone: string): string {
  return '+1' + phone.replace(/\D/g, '');
}

function blocksToText(blocks: any): string {
  if (typeof blocks === 'string') return blocks;
  if (!Array.isArray(blocks)) return '';
  return blocks
    .filter((b: any) => b._type === 'block')
    .map((b: any) => (b.children || []).map((c: any) => c.text || '').join(''))
    .join('\n\n');
}

export async function getLocation(restaurant: 'sapsuckers' | 'cafe-red'): Promise<LocationData> {
  const defaults = LOCATION_DEFAULTS[restaurant];
  try {
    const data = await sanityClient.fetch(
      `*[_type == "location" && _id == $id][0]{ name, phone, address, city, state, zip, email, hours, orderUrl, reservationUrl, mapEmbedUrl, mapDirectionsUrl, untappdEmbedUrl, facebookUrl, instagramUrl }`,
      { id: `location-${restaurant}` }
    );
    if (data) {
      const hours = Array.isArray(data.hours) && data.hours.length > 0
        ? data.hours.map((h: any) => ({ days: h.days || '', hours: h.hours || '' }))
        : defaults.hours;
      return {
        name: data.name || defaults.name,
        phone: data.phone || defaults.phone,
        phoneTel: data.phone ? phoneToTel(data.phone) : defaults.phoneTel,
        address: data.address || defaults.address,
        city: data.city || defaults.city,
        state: data.state || defaults.state,
        zip: data.zip || defaults.zip,
        email: data.email || defaults.email,
        hours,
        orderUrl: data.orderUrl || defaults.orderUrl,
        reservationUrl: data.reservationUrl || defaults.reservationUrl,
        mapEmbedUrl: data.mapEmbedUrl || defaults.mapEmbedUrl,
        mapDirectionsUrl: data.mapDirectionsUrl || defaults.mapDirectionsUrl,
        untappdEmbedUrl: data.untappdEmbedUrl || defaults.untappdEmbedUrl,
        facebookUrl: data.facebookUrl || defaults.facebookUrl,
        instagramUrl: data.instagramUrl || defaults.instagramUrl,
      };
    }
  } catch (e) {
    // Sanity unavailable
  }
  return defaults;
}

export async function getSiteContent(restaurant: 'sapsuckers' | 'cafe-red'): Promise<SiteContentData> {
  const defaults = CONTENT_DEFAULTS[restaurant];
  try {
    const data = await sanityClient.fetch(
      `*[_type == "siteContent" && _id == $id][0]{ heroTagline, aboutHeading, aboutBody, announcement, ga4MeasurementId }`,
      { id: `content-${restaurant}` }
    );
    if (data) {
      return {
        heroTagline: data.heroTagline || defaults.heroTagline,
        aboutHeading: data.aboutHeading || defaults.aboutHeading,
        aboutBody: blocksToText(data.aboutBody) || defaults.aboutBody,
        announcement: data.announcement || '',
        ga4MeasurementId: data.ga4MeasurementId || '',
      };
    }
  } catch (e) {
    // Sanity unavailable
  }
  return defaults;
}
