import { sanityClient } from 'sanity:client';

interface LocationData {
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  hours: string;
}

const DEFAULTS = {
  sapsuckers: {
    phone: '(631) 923-3065',
    phoneTel: '+16319233065',
    address: '287 Main St',
    city: 'Huntington',
    state: 'NY',
    zip: '11743',
  },
  'cafe-red': {
    phone: '(631) 544-4500',
    phoneTel: '+16315444500',
    address: '2 Pulaski Rd',
    city: 'Kings Park',
    state: 'NY',
    zip: '11754',
  },
};

function phoneToTel(phone: string): string {
  return '+1' + phone.replace(/\D/g, '');
}

export async function getLocation(restaurant: 'sapsuckers' | 'cafe-red') {
  const defaults = DEFAULTS[restaurant];
  try {
    const data = await sanityClient.fetch(
      `*[_type == "location" && _id == $id][0]{ phone, address, city, state, zip, hours }`,
      { id: `location-${restaurant}` }
    );
    if (data) {
      return {
        phone: data.phone || defaults.phone,
        phoneTel: data.phone ? phoneToTel(data.phone) : defaults.phoneTel,
        address: data.address || defaults.address,
        city: data.city || defaults.city,
        state: data.state || defaults.state,
        zip: data.zip || defaults.zip,
        hours: data.hours || '',
      };
    }
  } catch (e) {
    // Sanity unavailable, use defaults
  }
  return { ...defaults, hours: '' };
}
