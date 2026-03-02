import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'menuSection',
  title: 'Menu Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Optional (e.g., "Saturday & Sunday")',
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
      description: 'Lower numbers appear first on the menu page',
    }),
    defineField({
      name: 'dishes',
      title: 'Dishes',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'dish' }] }],
    }),
  ],
  orderings: [
    { title: 'Sort Order', name: 'sortOrder', by: [{ field: 'sortOrder', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', restaurant: 'restaurant' },
    prepare({ title, restaurant }) {
      const names: Record<string, string> = { sapsuckers: 'Sapsuckers', 'cafe-red': 'Cafe Red' };
      return { title: `${title} (${names[restaurant] || restaurant})` }
    },
  },
})
