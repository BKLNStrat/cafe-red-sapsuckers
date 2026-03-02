import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'location',
  title: 'Location',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Restaurant Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'string',
      description: 'sapsuckers or cafe-red',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Street Address',
      type: 'string',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
    }),
    defineField({
      name: 'state',
      title: 'State',
      type: 'string',
    }),
    defineField({
      name: 'zip',
      title: 'ZIP Code',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'hours',
      title: 'Hours',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'days', title: 'Days', type: 'string' },
          { name: 'hours', title: 'Hours', type: 'string' },
        ],
      }],
    }),
    defineField({
      name: 'orderUrl',
      title: 'Online Ordering URL',
      type: 'url',
    }),
    defineField({
      name: 'reservationUrl',
      title: 'Reservation URL (OpenTable)',
      type: 'url',
    }),
    defineField({
      name: 'mapEmbedUrl',
      title: 'Google Maps Embed URL',
      type: 'url',
    }),
  ],
})
