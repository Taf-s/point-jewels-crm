import { defineField, defineType } from 'sanity'

/**
 * MARKETING CAMPAIGN SCHEMA
 * Tracks marketing campaigns, targeting, and performance.
 * Integrates with customers and collections for targeted outreach.
 */
export default defineType({
  name: 'marketingCampaign',
  title: 'Marketing Campaign',
  type: 'document',
  fields: [
    // Campaign name
    defineField({
      name: 'name',
      title: 'Campaign Name',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'Name of the marketing campaign',
    }),

    // Description
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Campaign goals and strategy',
    }),

    // Target audience
    defineField({
      name: 'targetAudience',
      title: 'Target Audience',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          'All Customers',
          'LIZA Customers',
          'VIP Customers',
          'New Customers',
          'Returning Customers',
        ],
      },
      description: 'Who the campaign targets',
    }),

    // Associated collections/products
    defineField({
      name: 'associatedCollections',
      title: 'Associated Collections',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'collection' }] }],
      description: 'Collections featured in the campaign',
    }),

    // Start and end dates
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      validation: (rule) => rule.required(),
      description: 'Campaign launch date',
    }),

    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      description: 'Campaign end date',
    }),

    // Budget
    defineField({
      name: 'budget',
      title: 'Budget',
      type: 'number',
      description: 'Allocated budget for the campaign',
    }),

    // Channels
    defineField({
      name: 'channels',
      title: 'Marketing Channels',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          'Email',
          'Social Media',
          'Website',
          'In-Store',
          'Partnerships',
        ],
      },
      description: 'Channels used for the campaign',
    }),

    // Performance metrics
    defineField({
      name: 'metrics',
      title: 'Performance Metrics',
      type: 'object',
      fields: [
        defineField({ name: 'impressions', type: 'number', title: 'Impressions' }),
        defineField({ name: 'clicks', type: 'number', title: 'Clicks' }),
        defineField({ name: 'conversions', type: 'number', title: 'Conversions' }),
        defineField({ name: 'revenue', type: 'number', title: 'Revenue Generated' }),
      ],
      description: 'Track campaign performance',
    }),

    // Status
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Planning', value: 'planning' },
          { title: 'Active', value: 'active' },
          { title: 'Paused', value: 'paused' },
          { title: 'Completed', value: 'completed' },
        ],
      },
      initialValue: 'planning',
      description: 'Current campaign status',
    }),
  ],

  // Preview
  preview: {
    select: {
      title: 'name',
      status: 'status',
      startDate: 'startDate',
    },
    prepare(selection) {
      const { title, status, startDate } = selection
      return {
        title: title,
        subtitle: `${status} - Starts ${startDate}`,
      }
    },
  },
})