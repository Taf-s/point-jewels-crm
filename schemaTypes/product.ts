import { defineField, defineType } from 'sanity'

/**
 * PRODUCT SCHEMA
 * Represents individual jewelry products in the catalog.
 * Supports variants, pricing, inventory, and collection association.
 */
export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    // Product name
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'Name of the jewelry product',
    }),

    // SKU (Stock Keeping Unit)
    defineField({
      name: 'sku',
      title: 'SKU',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'Unique product identifier',
    }),

    // Description
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Detailed description of the product',
    }),

    // Price
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (rule) => rule.required().min(0),
      description: 'Base price in USD',
    }),

    // Images
    defineField({
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (rule) => rule.required().min(1),
      description: 'Product photos (at least one required)',
    }),

    // Variants (e.g., sizes, colors)
    defineField({
      name: 'variants',
      title: 'Variants',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'name', type: 'string', title: 'Variant Name' }),
          defineField({ name: 'priceModifier', type: 'number', title: 'Price Modifier' }),
          defineField({ name: 'inventory', type: 'number', title: 'Inventory Count' }),
        ],
      }],
      description: 'Product variations (e.g., different sizes or metals)',
    }),

    // Inventory count (base)
    defineField({
      name: 'inventory',
      title: 'Inventory',
      type: 'number',
      validation: (rule) => rule.min(0),
      description: 'Total inventory count',
    }),

    // Categories/Tags
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          'Rings',
          'Necklaces',
          'Earrings',
          'Bracelets',
          'Watches',
          'Custom',
        ],
      },
      description: 'Product categories',
    }),

    // Associated collection
    defineField({
      name: 'collection',
      title: 'Collection',
      type: 'reference',
      to: [{ type: 'collection' }],
      description: 'Collection this product belongs to',
    }),

    // Is active (for sale)
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Whether the product is available for sale',
    }),
  ],

  // Preview for list view
  preview: {
    select: {
      title: 'name',
      subtitle: 'sku',
      price: 'price',
      media: 'images.0',
    },
    prepare(selection) {
      const { title, subtitle, price, media } = selection
      return {
        title: title,
        subtitle: `${subtitle} - $${price}`,
        media: media,
      }
    },
  },
})