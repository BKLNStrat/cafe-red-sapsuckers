import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'menuSection',
  title: 'Menu Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Optional subtitle (e.g., "Saturday & Sunday")',
    }),
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
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
    defineField({
      name: 'dishes',
      title: 'Dishes',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'dish' }] }],
    }),
  ],
  orderings: [
    {
      title: 'Sort Order',
      name: 'sortOrder',
      by: [{ field: 'sortOrder', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', restaurant: 'restaurant' },
    prepare({ title, restaurant }) {
      return { title: `${title} (${restaurant})` }
    },
  },
})
