import { defineType } from 'sanity'

// Templates that pre-fill the restaurant field when creating items from a filtered list
export const initialValueTemplates = [
  defineType({
    id: 'dish-for-restaurant',
    title: 'Dish (restaurant)',
    schemaType: 'dish',
    parameters: [{ name: 'restaurant', type: 'string' }],
    value: (params: { restaurant: string }) => ({
      restaurant: params.restaurant,
    }),
  }),
  defineType({
    id: 'menuSection-for-restaurant',
    title: 'Menu Section (restaurant)',
    schemaType: 'menuSection',
    parameters: [{ name: 'restaurant', type: 'string' }],
    value: (params: { restaurant: string }) => ({
      restaurant: params.restaurant,
    }),
  }),
  defineType({
    id: 'gallerySection-for-restaurant',
    title: 'Gallery Section (restaurant)',
    schemaType: 'gallerySection',
    parameters: [{ name: 'restaurant', type: 'string' }],
    value: (params: { restaurant: string }) => ({
      restaurant: params.restaurant,
    }),
  }),
  defineType({
    id: 'partyMenu-for-restaurant',
    title: 'Party Menu (restaurant)',
    schemaType: 'partyMenu',
    parameters: [{ name: 'restaurant', type: 'string' }],
    value: (params: { restaurant: string }) => ({
      restaurant: params.restaurant,
    }),
  }),
  defineType({
    id: 'event-for-restaurant',
    title: 'Event (restaurant)',
    schemaType: 'event',
    parameters: [{ name: 'restaurant', type: 'string' }],
    value: (params: { restaurant: string }) => ({
      restaurant: params.restaurant,
    }),
  }),
  defineType({
    id: 'faq-for-restaurant',
    title: 'FAQ (restaurant)',
    schemaType: 'faq',
    parameters: [{ name: 'restaurant', type: 'string' }],
    value: (params: { restaurant: string }) => ({
      restaurant: params.restaurant,
    }),
  }),
]
