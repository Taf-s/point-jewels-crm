import { defineField, defineType } from 'sanity'

/**
 * PRODUCT SCHEMA
 * 
 * Represents a jewelry piece in the catalog.
 * Each product can have multiple variants (different materials, prices, inventory).
 * 
 * Example: "Delicate Heart Necklace" with Gold and Silver variants
 */
export default defineType({
  name: 'product',
  title: 'Jewelry Piece',
  type: 'document',
  fields: [
    // Basic product information
    defineField({
      name: 'title',
      title: 'Name of Piece',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'The name of your jewelry piece (e.g., "Classic Engagement Ring")',
    }),

    // Auto-generated URL slug from title
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

    // Product type/category
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
      description: 'Choose the type of jewelry',
    }),

    // Product photos/gallery
    defineField({
      name: 'images',
      title: 'Gallery',
      type: 'array',
      of: [{ type: 'image' }],
      options: {
        layout: 'grid',
      },
      validation: (rule) => rule.required().min(1),
      description: 'Upload at least one beautiful photo. First photo is the thumbnail.',
    }),

    // Marketing/storytelling description
    defineField({
      name: 'description',
      title: 'Romance Copy',
      type: 'text',
      rows: 3,
      description: 'Tell the story of this piece. Make it poetic and compelling!',
    }),

    // Optional collection grouping
    defineField({
      name: 'collection',
      title: 'Collection',
      type: 'reference',
      to: [{ type: 'collection' }],
      description: 'Optional: Add this piece to a collection (e.g., "Engagement Rings")',
    }),

    // Material variants with pricing and inventory
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
      description: 'Add different material options (Gold, Silver, etc.) with separate prices and inventory',
    }),
  ],

  // Customizes how products appear in the list view
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