import { defineField, defineType } from 'sanity'

/**
 * CUSTOMER SCHEMA
 * Enhanced with comprehensive segmentation and sales intelligence data
 * Supports data-driven sales decisions with behavioral analytics
 */
export default defineType({
  // ... rest of the schema remains the same
  name: 'customer',
  title: 'Customer',
  type: 'document',
  fields: [
    // Basic Information
    defineField({
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      description: 'Primary contact number',
    }),

    // Customer Segmentation & Analytics
    defineField({
      name: 'customerSegment',
      title: 'Customer Segment',
      type: 'string',
      options: {
        list: [
          { title: 'High Net Worth', value: 'high-net-worth' },
          { title: 'Mid-Tier', value: 'mid-tier' },
          { title: 'Entry Level', value: 'entry-level' },
          { title: 'Gift Buyer', value: 'gift-buyer' },
          { title: 'Collector', value: 'collector' },
          { title: 'Investor', value: 'investor' },
        ],
      },
      validation: (rule) => rule.required(),
      description: 'Customer category for targeted sales strategies',
    }),

    defineField({
      name: 'lifetimeValue',
      title: 'Lifetime Value',
      type: 'number',
      description: 'Total value of all purchases (auto-calculated from orders)',
      readOnly: true,
    }),

    defineField({
      name: 'purchaseFrequency',
      title: 'Purchase Frequency',
      type: 'string',
      options: {
        list: [
          { title: 'Frequent (Monthly+)', value: 'frequent' },
          { title: 'Regular (Quarterly)', value: 'regular' },
          { title: 'Occasional (Annually)', value: 'occasional' },
          { title: 'One-time', value: 'one-time' },
        ],
      },
      description: 'How often this customer makes purchases',
    }),

    // Preferences & Behavior
    defineField({
      name: 'preferredCategories',
      title: 'Preferred Product Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Engagement Rings', value: 'engagement-rings' },
          { title: 'Wedding Bands', value: 'wedding-bands' },
          { title: 'Necklaces', value: 'necklaces' },
          { title: 'Earrings', value: 'earrings' },
          { title: 'Bracelets', value: 'bracelets' },
          { title: 'Watches', value: 'watches' },
          { title: 'Custom Pieces', value: 'custom' },
          { title: 'Investment Pieces', value: 'investment' },
        ],
      },
      description: 'Product categories this customer prefers',
    }),

    defineField({
      name: 'priceSensitivity',
      title: 'Price Sensitivity',
      type: 'string',
      options: {
        list: [
          { title: 'Price Insensitive', value: 'insensitive' },
          { title: 'Value Conscious', value: 'value-conscious' },
          { title: 'Budget Focused', value: 'budget-focused' },
        ],
      },
      description: 'How price influences purchasing decisions',
    }),

    defineField({
      name: 'decisionDrivers',
      title: 'Key Decision Drivers',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Quality & Craftsmanship', value: 'quality' },
          { title: 'Brand Reputation', value: 'brand' },
          { title: 'Investment Value', value: 'investment' },
          { title: 'Design & Aesthetics', value: 'design' },
          { title: 'Personal Significance', value: 'personal' },
          { title: 'Gift Purpose', value: 'gift' },
          { title: 'Resale Value', value: 'resale' },
        ],
      },
      description: 'Factors that influence this customer\'s buying decisions',
    }),

    // Sales Intelligence
    defineField({
      name: 'referralSource',
      title: 'Referral Source',
      type: 'string',
      options: {
        list: [
          { title: 'Word of Mouth', value: 'word-of-mouth' },
          { title: 'Social Media', value: 'social-media' },
          { title: 'Online Search', value: 'search' },
          { title: 'Advertisement', value: 'advertisement' },
          { title: 'Event/Show', value: 'event' },
          { title: 'Existing Customer', value: 'existing-customer' },
          { title: 'Direct Contact', value: 'direct' },
        ],
      },
      description: 'How this customer found Point Jewels',
    }),

    defineField({
      name: 'communicationPreferences',
      title: 'Communication Preferences',
      type: 'object',
      fields: [
        defineField({
          name: 'emailMarketing',
          title: 'Email Marketing',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'smsUpdates',
          title: 'SMS Updates',
          type: 'boolean',
          initialValue: false,
        }),
        defineField({
          name: 'personalizedOffers',
          title: 'Personalized Offers',
          type: 'boolean',
          initialValue: true,
        }),
      ],
    }),

    // Relationship Management
    defineField({
      name: 'relationshipManager',
      title: 'Relationship Manager',
      type: 'reference',
      to: [{ type: 'staff' }],
      description: 'Staff member assigned to manage this customer relationship',
    }),

    defineField({
      name: 'lastContact',
      title: 'Last Contact Date',
      type: 'datetime',
      description: 'Date of last interaction with this customer',
    }),

    defineField({
      name: 'nextFollowUp',
      title: 'Next Follow-up Date',
      type: 'datetime',
      description: 'Scheduled date for next customer engagement',
    }),

    // Notes & History
    defineField({
      name: 'salesNotes',
      title: 'Sales Notes',
      type: 'text',
      description: 'Internal notes for sales team about this customer',
    }),

    // Encrypted sensitive data
    defineField({
      name: 'encryptedData',
      title: 'Encrypted Customer Data',
      type: 'object',
      fields: [
        defineField({
          name: 'creditCardToken',
          title: 'Credit Card Token',
          type: 'string',
          description: 'Encrypted token for stored payment method',
        }),
        defineField({
          name: 'personalId',
          title: 'Personal ID',
          type: 'string',
          description: 'Encrypted government ID or passport number',
        }),
      ],
      hidden: true, // Only accessible via API with proper auth
    }),

    // Auto-generated fields
    defineField({
      name: 'customerId',
      title: 'Customer ID',
      type: 'string',
      readOnly: true,
      description: 'Auto-generated unique identifier',
    }),

    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    }),

    defineField({
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
      readOnly: true,
    }),
  ],

  // Enhanced preview with segmentation info
  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      segment: 'customerSegment',
      lifetimeValue: 'lifetimeValue',
    },
    prepare(selection) {
      const { firstName, lastName, segment, lifetimeValue } = selection
      return {
        title: `${firstName} ${lastName}`,
        subtitle: `${segment || 'Unsegmented'} • $${lifetimeValue || 0} LTV`,
      }
    },
  },
})