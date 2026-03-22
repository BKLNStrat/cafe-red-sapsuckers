import { sanityClient } from 'sanity:client';

export async function getMenuSections(restaurant: 'sapsuckers' | 'cafe-red') {
  const query = `*[_type == "menu" && title match $restaurant][0]{
    title,
    sections[]->{
      title,
      subtitle,
      dishes[]->{
        title,
        description,
        price,
        dietaryTags,
        "imageUrl": image.asset->url
      }
    }
  }`;
  
  const result = await sanityClient.fetch(query, { restaurant });
  return result;
}

export async function getLocation(name: string) {
  const query = `*[_type == "location" && name == $name][0]`;
  return await sanityClient.fetch(query, { name });
}

export async function getEvents(restaurant: string) {
  const query = `*[_type == "event" && restaurant == $restaurant && date >= now()] | order(date asc)`;
  return await sanityClient.fetch(query, { restaurant });
}

export async function getAllDishes(restaurant: string) {
  const query = `*[_type == "menu" && title match $restaurant][0]{
    sections[]->{
      title,
      subtitle,
      dishes[]->{
        title,
        description,
        price,
        dietaryTags
      }
    }
  }`;
  return await sanityClient.fetch(query, { restaurant });
}

export async function getPrixFixeMenu(restaurant: string) {
  const query = `*[_type == "prixFixeMenu" && restaurant == $restaurant][0]{
    price,
    schedule,
    allergyNote,
    sections[]{
      courseLabel,
      heading,
      items[]{ name }
    },
    footnote,
    active
  }`;
  return await sanityClient.fetch(query, { restaurant });
}

export async function getHappyHourMenu(restaurant: string) {
  const query = `*[_type == "happyHourMenu" && restaurant == $restaurant][0]{
    hours,
    locationNote,
    drinkSections[]{
      heading,
      description,
      items[]{ name, desc }
    },
    snacks[]{ name, desc },
    snacksHeading,
    active
  }`;
  return await sanityClient.fetch(query, { restaurant });
}
