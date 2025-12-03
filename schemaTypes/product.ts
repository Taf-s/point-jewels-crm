import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Jewelry Piece',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Name of Piece',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Necklace', value: 'necklace' },
          { title: 'Ring', value: 'ring' },
          { title: 'Bracelet', value: 'bracelet' },
          { title: 'Pendant', value: 'pendant' },
          { title: 'Watch', value: 'watch' },
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Gallery',
      type: 'array',
      of: [{ type: 'image' }],
      options: {
        layout: 'grid',
      },
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'description',
      title: 'Romance Copy',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'collection',
      title: 'Collection',
      type: 'reference',
      to: [{ type: 'collection' }],
      description: 'Optional: Add this piece to a collection',
    }),
    defineField({
      name: 'variants',
      title: 'Materials & Pricing',
      type: 'array',
      of: [
        {
          type: 'variant',
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
    },
    prepare(selection) {
      const { title, category } = selection
      return {
        title: title,
        subtitle: `Category: ${category}`,
      }
    },
  },
})