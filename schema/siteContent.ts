import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteContent',
  title: 'Site Content',
  type: 'document',
  fields: [
    defineField({
      name: 'restaurant',
      title: 'Restaurant',
      type: 'string',
      options: {
        list: [
          { title: 'Sapsuckers', value: 'sapsuckers' },
          { title: 'Cafe Red', value: 'cafe-red' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroTagline',
      title: 'Hero Tagline',
      type: 'string',
      description: 'Short tagline shown on the homepage hero',
    }),
    defineField({
      name: 'aboutHeading',
      title: 'About Section Heading',
      type: 'string',
    }),
    defineField({
      name: 'aboutBody',
      title: 'About Section Body',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Rich text content for the about section',
    }),
    defineField({
      name: 'announcement',
      title: 'Announcement Banner',
      type: 'string',
      description: 'Optional banner text shown at the top of the site. Leave empty to hide.',
    }),
    defineField({
      name: 'ga4MeasurementId',
      title: 'Google Analytics 4 Measurement ID',
      type: 'string',
      description: 'GA4 Measurement ID (e.g. G-XXXXXXXXXX). Leave empty to disable analytics.',
    }),
  ],
  preview: {
    select: { restaurant: 'restaurant' },
    prepare({ restaurant }) {
      const names: Record<string, string> = { 'sapsuckers': 'Sapsuckers', 'cafe-red': 'Cafe Red' };
      return { title: `${names[restaurant] || restaurant} Site Content` }
    },
  },
})
