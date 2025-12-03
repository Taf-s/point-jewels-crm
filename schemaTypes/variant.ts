import { defineField, defineType } from 'sanity'

/**
 * VARIANT SCHEMA
 * 
 * Represents a single material/price option for a product.
 * Nested within Product documents (not a separate document type).
 * 
 * Example: A necklace can have a Gold variant and a Silver variant,
 * each with different prices and stock levels.
 * 
 * SKU Convention:
 *   [CATEGORY]-[MATERIAL]-[NUMBER]
 *   Examples: NECKL-GOLD-001, RING-SILVER-001
 */
export default defineType({
  name: 'variant',
  title: 'Product Variant',
  type: 'object',
  fields: [
    // Material type
    defineField({
      name: 'material',
      title: 'Material',
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
      validation: (rule) => rule.required(),
      description: 'Select the metal type for this variant',
    }),

    // Price in ZAR
    defineField({
      name: 'price',
      title: 'Price (ZAR)',
      type: 'number',
      validation: (rule) => rule.required().positive(),
      description: 'Price for this material variant in South African Rand',
    }),

    // Inventory quantity
    defineField({
      name: 'stock',
      title: 'Stock Quantity',
      type: 'number',
      validation: (rule) => rule.required().min(0),
      description: 'How many units of this variant are in stock',
    }),

    // Unique inventory identifier
    defineField({
      name: 'sku',
      title: 'SKU (Stock Keeping Unit)',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'Unique identifier for inventory tracking (e.g., NECKL-GOLD-001)',
    }),
  ],

  // Customizes how variants appear in the list view
  preview: {
    select: {
      material: 'material',
      price: 'price',
      stock: 'stock',
    },
    prepare(selection) {
      const { material, price, stock } = selection
      return {
        title: `${material} - R${price}`,
        subtitle: `Stock: ${stock}`,
      }
    },
  },
})
