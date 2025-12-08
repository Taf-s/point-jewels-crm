import { defineField, defineType } from 'sanity'

/**
 * COLLECTION SCHEMA
 * * Represents a grouped set of products for organizational or marketing purposes.
 * Collections are optional - products don't require one.
 * * Examples:
 * - "Engagement Rings 2025"
 * - "Summer Collection"
 * - "Best Sellers"
 * - "New Arrivals"
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

    // Collection story and description (NOW USING PORTABLE TEXT)
    defineField({
      name: 'description',
      title: 'Collection Description',
      // Changed from 'text' to 'array' for rich text formatting (Portable Text)
      type: 'array',
      of: [{ type: 'block' }], 
      description: 'Tell the story of this collection. Supports rich formatting, links, etc.',
    }),

    // Hero image for the collection (NOW WITH HOTSPOT AND ALT TEXT)
    defineField({
      name: 'image',
      title: 'Collection Image',
      type: 'image',
      description: 'Hero image that represents this collection',
      options: {
        hotspot: true, // Allows editor to define a focal point for cropping
      },
      fields: [
        defineField({ // Added field for accessibility and SEO
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'Important for SEO and accessibility. Describe the image content.',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    
    // Manual Sort Order (NEW FIELD)
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'A numeric value to manually set the display order of this collection (lower numbers appear first).',
      validation: (rule) => rule.min(0),
      options: {
        // Optional: you might want to hide this field from initial view 
        // if it's managed by a custom tool or just for advanced users.
        // collapsible: true, 
        // collapsed: true,
      },
    }),

    // LIZA Collection Tag (NEW FIELD)
    defineField({
      name: 'isLIZACollection',
      title: 'LIZA Collection',
      type: 'boolean',
      description: 'Mark this collection as LIZA-specific for priority handling and customer association.',
      initialValue: false,
    }),
  ],

  // Customizes how collections appear in the list view
  preview: {
    select: {
      title: 'title',
      isLIZA: 'isLIZACollection',
    },
    prepare(selection) {
      const { title, isLIZA } = selection
      return {
        title: title,
        subtitle: isLIZA ? 'Collection (LIZA)' : 'Collection',
      }
    },
  },
})