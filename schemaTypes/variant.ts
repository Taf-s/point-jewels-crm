import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'variant',
  title: 'Product Variant',
  type: 'object',
  fields: [
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
    }),
    defineField({
      name: 'price',
      title: 'Price (ZAR)',
      type: 'number',
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: 'stock',
      title: 'Stock Quantity',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'sku',
      title: 'SKU (Stock Keeping Unit)',
      type: 'string',
      description: 'Unique identifier for inventory tracking (e.g., NECKL-GOLD-001)',
      validation: (rule) => rule.required(),
    }),
  ],
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
