import { defineField, defineType } from 'sanity'

/**
 * LIZA CUSTOMER SCHEMA
 * Dedicated schema for LIZA customers (high-priority segment).
 * Includes VIP features, preferences, and enhanced tracking.
 */
export default defineType({
  name: 'lizaCustomer',
  title: 'LIZA Customer',
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

    // VIP status
    defineField({
      name: 'isVIP',
      title: 'VIP Status',
      type: 'boolean',
      initialValue: true, // Default to true for LIZA
      description: 'Indicates if this is a VIP customer',
    }),

    // Preferences (array for multiple)
    defineField({
      name: 'preferences',
      title: 'Jewelry Preferences',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Engagement Rings', value: 'engagement' },
          { title: 'Necklaces', value: 'necklaces' },
          { title: 'Earrings', value: 'earrings' },
          { title: 'Bracelets', value: 'bracelets' },
          { title: 'Custom Designs', value: 'custom' },
        ],
      },
      description: 'Customer\'s preferred jewelry types',
    }),

    // Notes
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
      description: 'Additional notes about the customer',
    }),

    // Associated collections (reference to collections)
    defineField({
      name: 'associatedCollections',
      title: 'Associated Collections',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'collection' }] }],
      description: 'Collections this customer is interested in or has purchased from',
    }),
  ],

  // Preview for list view
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      isVIP: 'isVIP',
    },
    prepare(selection) {
      const { title, subtitle, isVIP } = selection
      return {
        title: title,
        subtitle: `${subtitle} ${isVIP ? '(VIP)' : ''}`,
      }
    },
  },
})