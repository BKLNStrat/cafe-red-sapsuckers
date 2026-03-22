import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'prixFixeMenu',
  title: 'Prix Fixe Menu',
  type: 'document',
  fields: [
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
      title: 'Price',
      type: 'string',
      description: 'e.g. $37.95 per person',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'schedule',
      title: 'Schedule',
      type: 'string',
      description: 'e.g. Sunday through Thursday, every week',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'allergyNote',
      title: 'Allergy Note',
      type: 'string',
      description: 'e.g. Please inform us of any food allergies before you order.',
      initialValue: 'Please inform us of any food allergies before you order.',
    }),
    defineField({
      name: 'sections',
      title: 'Menu Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'prixFixeSection',
          title: 'Section',
          fields: [
            defineField({
              name: 'courseLabel',
              title: 'Course Label',
              type: 'string',
              description: 'e.g. First Course, Second Course, Dessert',
            }),
            defineField({
              name: 'heading',
              title: 'Heading',
              type: 'string',
              description: 'e.g. Appetizer — Choice of',
            }),
            defineField({
              name: 'items',
              title: 'Items',
              type: 'array',
              of: [{
                type: 'object',
                name: 'prixFixeItem',
                title: 'Item',
                fields: [
                  defineField({ name: 'name', title: 'Item', type: 'string' }),
                ],
                preview: { select: { title: 'name' } },
              }],
            }),
          ],
          preview: {
            select: { title: 'heading', subtitle: 'courseLabel' },
          },
        },
      ],
    }),
    defineField({
      name: 'footnote',
      title: 'Footnote',
      type: 'text',
      rows: 2,
      description: 'e.g. "+" indicates naturally gluten free...',
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Uncheck to hide the prix fixe page.',
      initialValue: true,
    }),
  ],
  preview: {
    select: { restaurant: 'restaurant', price: 'price' },
    prepare({ restaurant, price }) {
      return {
        title: `Prix Fixe — ${restaurant === 'cafe-red' ? 'Cafe Red' : 'Sapsuckers'}`,
        subtitle: price || '',
      };
    },
  },
});
