import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'happyHourMenu',
  title: 'Happy Hour Menu',
  type: 'document',
  fields: [
    defineField({
      name: 'restaurant',
      title: 'Restaurant',
      type: 'string',
      options: { list: ['cafe-red', 'sapsuckers'] },
      initialValue: 'sapsuckers',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hours',
      title: 'Hours',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'One line per schedule entry, e.g. "Monday — All Day"',
    }),
    defineField({
      name: 'locationNote',
      title: 'Location Note',
      type: 'string',
      description: 'e.g. Available in the bar or the dining room.',
    }),
    defineField({
      name: 'drinkSections',
      title: 'Drink Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'drinkSection',
          title: 'Drink Section',
          fields: [
            defineField({
              name: 'heading',
              title: 'Heading',
              type: 'string',
              description: 'e.g. Cocktails ($10), Draft Beer, Wine',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'string',
              description: 'Optional — e.g. "$2 off every draft beer"',
            }),
            defineField({
              name: 'items',
              title: 'Items',
              type: 'array',
              of: [{
                type: 'object',
                name: 'drinkItem',
                title: 'Item',
                fields: [
                  defineField({ name: 'name', title: 'Name', type: 'string' }),
                  defineField({ name: 'desc', title: 'Description', type: 'string' }),
                ],
                preview: { select: { title: 'name', subtitle: 'desc' } },
              }],
            }),
          ],
          preview: { select: { title: 'heading' } },
        },
      ],
    }),
    defineField({
      name: 'snacks',
      title: 'Bar Bites / Snacks',
      type: 'array',
      of: [{
        type: 'object',
        name: 'snackItem',
        title: 'Item',
        fields: [
          defineField({ name: 'name', title: 'Name', type: 'string' }),
          defineField({ name: 'desc', title: 'Description', type: 'string' }),
        ],
        preview: { select: { title: 'name', subtitle: 'desc' } },
      }],
    }),
    defineField({
      name: 'snacksHeading',
      title: 'Snacks Section Heading',
      type: 'string',
      description: 'e.g. $10 Bar Bites',
      initialValue: '$10 Bar Bites',
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Uncheck to hide the happy hour page.',
      initialValue: true,
    }),
  ],
  preview: {
    select: { restaurant: 'restaurant' },
    prepare({ restaurant }) {
      return {
        title: `Happy Hour — ${restaurant === 'cafe-red' ? 'Cafe Red' : 'Sapsuckers'}`,
      };
    },
  },
});
