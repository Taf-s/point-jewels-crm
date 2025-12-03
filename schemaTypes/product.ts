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
      name: 'images',
      title: 'Gallery',
      type: 'array',
      of: [{ type: 'image' }],
      options: {
        layout: 'grid',
      },
    }),
    defineField({
      name: 'price',
      title: 'Price (ZAR)',
      type: 'number',
    }),
    defineField({
      name: 'material',
      title: 'Metal Type',
      type: 'string',
      options: {
        list: [
          { title: '18k Gold', value: '18k_gold' },
          { title: 'Rose Gold', value: 'rose_gold' },
          { title: 'Platinum', value: 'platinum' },
          { title: 'Sterling Silver', value: 'silver' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'description',
      title: 'Romance Copy',
      type: 'text',
      rows: 3,
    }),
  ],
})