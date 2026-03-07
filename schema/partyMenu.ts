import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'partyMenu',
  title: 'Party Menu',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Menu Name',
      type: 'string',
      description: 'e.g. North Fork, Sardegna, Provence',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'restaurant',
      title: 'Restaurant',
      type: 'string',
      options: { list: ['cafe-red', 'sapsuckers'] },
      initialValue: 'cafe-red',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price Per Person ($)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'courses',
      title: 'Course Description',
      type: 'string',
      description: 'e.g. Three-Course Menu, Four-Course Menu',
    }),
    defineField({
      name: 'note',
      title: 'Footer Note',
      type: 'string',
      description: 'e.g. Includes soda, coffee & tea. Not including 20% gratuity...',
    }),
    defineField({
      name: 'sections',
      title: 'Menu Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'menuSection',
          title: 'Section',
          fields: [
            defineField({ name: 'heading', title: 'Heading', type: 'string', description: 'e.g. Appetizer, Main Course' }),
            defineField({ name: 'subheading', title: 'Subheading', type: 'string', description: 'e.g. Choice of (optional)' }),
            defineField({
              name: 'items',
              title: 'Items',
              type: 'array',
              of: [{
                type: 'object',
                name: 'partyMenuItem',
                title: 'Item',
                fields: [
                  defineField({ name: 'name', title: 'Item Name', type: 'string' }),
                  defineField({ name: 'desc', title: 'Description', type: 'text', rows: 2 }),
                ],
                preview: { select: { title: 'name', subtitle: 'desc' } },
              }],
            }),
          ],
          preview: { select: { title: 'heading' } },
        }
      ],
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      initialValue: 10,
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Uncheck to hide this menu from the site without deleting it.',
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'price' },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle ? `$${subtitle}/person` : '' };
    },
  },
  orderings: [{ title: 'Sort Order', name: 'sortOrderAsc', by: [{ field: 'sortOrder', direction: 'asc' }] }],
});
