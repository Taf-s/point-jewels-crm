import { defineField, defineType } from 'sanity'

/**
 * SALES ORDER SCHEMA
 * Tracks customer orders and sales transactions.
 * Links customers, products, and collections.
 */
export default defineType({
  name: 'salesOrder',
  title: 'Sales Order',
  type: 'document',
  fields: [
    // Order number (auto-generated or manual)
    defineField({
      name: 'orderNumber',
      title: 'Order Number',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'Unique order identifier',
    }),

    // Customer reference
    defineField({
      name: 'customer',
      title: 'Customer',
      type: 'reference',
      to: [{ type: 'customer' }, { type: 'lizaCustomer' }],
      validation: (rule) => rule.required(),
      description: 'Customer who placed the order',
    }),

    // Order date
    defineField({
      name: 'orderDate',
      title: 'Order Date',
      type: 'datetime',
      validation: (rule) => rule.required(),
      initialValue: () => new Date().toISOString(),
      description: 'Date the order was placed',
    }),

    // Order items
    defineField({
      name: 'items',
      title: 'Order Items',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'product', type: 'reference', to: [{ type: 'product' }], title: 'Product' }),
          defineField({ name: 'quantity', type: 'number', title: 'Quantity', validation: (rule) => rule.min(1) }),
          defineField({ name: 'price', type: 'number', title: 'Unit Price' }),
        ],
      }],
      validation: (rule) => rule.required().min(1),
      description: 'Products in the order',
    }),

    // Total amount
    defineField({
      name: 'totalAmount',
      title: 'Total Amount',
      type: 'number',
      validation: (rule) => rule.required().min(0),
      description: 'Total order value',
    }),

    // Status
    defineField({
      name: 'status',
      title: 'Order Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Processing', value: 'processing' },
          { title: 'Shipped', value: 'shipped' },
          { title: 'Delivered', value: 'delivered' },
          { title: 'Cancelled', value: 'cancelled' },
        ],
      },
      initialValue: 'pending',
      description: 'Current order status',
    }),

    // Payment method
    defineField({
      name: 'paymentMethod',
      title: 'Payment Method',
      type: 'string',
      options: {
        list: [
          'Credit Card',
          'PayPal',
          'Bank Transfer',
          'Cash',
        ],
      },
      description: 'How the order was paid',
    }),

    // Notes
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
      description: 'Additional order notes',
    }),
  ],

  // Preview for list view
  preview: {
    select: {
      title: 'orderNumber',
      customerName: 'customer.name',
      total: 'totalAmount',
      status: 'status',
    },
    prepare(selection) {
      const { title, customerName, total, status } = selection
      return {
        title: `Order ${title}`,
        subtitle: `${customerName} - $${total} (${status})`,
      }
    },
  },
})