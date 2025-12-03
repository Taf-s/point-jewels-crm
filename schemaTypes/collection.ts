import { defineField, defineType } from 'sanity'

/**
 * COLLECTION SCHEMA
 * 
 * Represents a grouped set of products for organizational or marketing purposes.
 * Collections are optional - products don't require one.
 * 
 * Examples:
 *   - "Engagement Rings 2025"
 *   - "Summer Collection"
 *   - "Best Sellers"
 *   - "New Arrivals"
 */
export default defineType({
  name: 'collection',
  title: 'Collection',
  type: 'document',
  fields: [
    // Collection name
    defineField({
      name: 'title',
      title: 'Collection Name',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'The name of this collection (e.g., "Engagement Rings")',
    }),

    // Auto-generated URL slug
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
      description: 'Auto-generated URL-friendly identifier. Updates when title changes.',
    }),

    // Collection story and description
    defineField({
      name: 'description',
      title: 'Collection Description',
      type: 'text',
      rows: 3,
      description: 'Tell the story of this collection. Why are these pieces grouped together?',
    }),

    // Hero image for the collection
    defineField({
      name: 'image',
      title: 'Collection Image',
      type: 'image',
      description: 'Hero image that represents this collection',
    }),
  ],

  // Customizes how collections appear in the list view
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
