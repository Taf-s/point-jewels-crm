import { defineField, defineType } from 'sanity'

/**
 * CUSTOMER SCHEMA
 * General customer document for the CRM.
 * Tracks contact info, purchase history, and preferences.
 */
export default defineType({
  name: 'customer',
  title: 'Customer',
  type: 'document',
  fields: [
    // Customer name
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'Customer\'s full name',
    }),

    // Contact email
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.required().email(),
      description: 'Primary contact email',
    }),

    // Phone number
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      description: 'Contact phone number',
    }),

    // Address (simple text for now)
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      description: 'Customer\'s address',
    }),

    // Customer type (to differentiate from LIZA)
    defineField({
      name: 'customerType',
      title: 'Customer Type',
      type: 'string',
      options: {
        list: [
          { title: 'Regular', value: 'regular' },
          { title: 'VIP', value: 'vip' },
          { title: 'LIZA', value: 'liza' }, // Note: LIZA customers use separate schema
        ],
      },
      initialValue: 'regular',
      description: 'Type of customer for segmentation',
    }),

    // Purchase history (references to products or orders - placeholder)
    defineField({
      name: 'purchaseHistory',
      title: 'Purchase History',
      type: 'array',
      of: [{ type: 'string' }], // Simple array of product names for now
      description: 'List of past purchases',
    }),

    // Notes
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
      description: 'Additional notes about the customer',
    }),

    // Associated collections
    defineField({
      name: 'associatedCollections',
      title: 'Associated Collections',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'collection' }] }],
      description: 'Collections this customer is interested in',
    }),
  ],

  // Preview for list view
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      type: 'customerType',
    },
    prepare(selection) {
      const { title, subtitle, type } = selection
      return {
        title: title,
        subtitle: `${subtitle} (${type})`,
      }
    },
  },
})