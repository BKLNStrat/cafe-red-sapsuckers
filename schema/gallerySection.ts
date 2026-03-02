import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'gallerySection',
  title: 'Gallery Section',
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
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'e.g., "From the Kitchen", "On Tap", "The Space"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
    defineField({
      name: 'aspectRatio',
      title: 'Photo Aspect Ratio',
      type: 'string',
      options: {
        list: [
          { title: 'Square', value: 'square' },
          { title: 'Landscape (4:3)', value: 'landscape' },
        ],
      },
      initialValue: 'square',
    }),
    defineField({
      name: 'columns',
      title: 'Grid Columns (Desktop)',
      type: 'number',
      description: '3 or 4 columns on desktop',
      initialValue: 4,
      options: { list: [3, 4] },
    }),
    defineField({
      name: 'photos',
      title: 'Photos',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: { hotspot: true },
            validation: (rule: any) => rule.required(),
          },
          {
            name: 'alt',
            title: 'Description',
            type: 'string',
            description: 'Brief description of the photo (for accessibility)',
          },
        ],
        preview: {
          select: { title: 'alt', media: 'image' },
        },
      }],
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
    prepare({ title, restaurant }: { title: string; restaurant: string }) {
      const names: Record<string, string> = { 'sapsuckers': 'Sapsuckers', 'cafe-red': 'Cafe Red' };
      return { title: `${title} (${names[restaurant] || restaurant})` }
    },
  },
})
