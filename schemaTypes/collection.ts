import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'collection',
  title: 'Collection',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Collection Name',
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
      name: 'description',
      title: 'Collection Description',
      type: 'text',
      rows: 3,
      description: 'Tell the story of this collection',
    }),
    defineField({
      name: 'image',
      title: 'Collection Image',
      type: 'image',
      description: 'Hero image for this collection',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const { title } = selection
      return {
        title: title,
        subtitle: 'Collection',
      }
    },
  },
})
