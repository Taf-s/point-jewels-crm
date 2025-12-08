import { defineField, defineType } from 'sanity'

/**
 * ANALYTICS DASHBOARD SCHEMA
 * Stores key metrics and KPIs for the CRM.
 * Updated periodically for real-time insights.
 */
export default defineType({
  name: 'analyticsDashboard',
  title: 'Analytics Dashboard',
  type: 'document',
  fields: [
    // Dashboard name
    defineField({
      name: 'name',
      title: 'Dashboard Name',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'Name of the analytics view',
    }),

    // Date range
    defineField({
      name: 'dateRange',
      title: 'Date Range',
      type: 'object',
      fields: [
        defineField({ name: 'start', type: 'date', title: 'Start Date' }),
        defineField({ name: 'end', type: 'date', title: 'End Date' }),
      ],
      description: 'Period for the analytics',
    }),

    // Sales metrics
    defineField({
      name: 'salesMetrics',
      title: 'Sales Metrics',
      type: 'object',
      fields: [
        defineField({ name: 'totalRevenue', type: 'number', title: 'Total Revenue' }),
        defineField({ name: 'totalOrders', type: 'number', title: 'Total Orders' }),
        defineField({ name: 'averageOrderValue', type: 'number', title: 'Average Order Value' }),
        defineField({ name: 'conversionRate', type: 'number', title: 'Conversion Rate (%)' }),
      ],
      description: 'Key sales performance indicators',
    }),

    // Customer metrics
    defineField({
      name: 'customerMetrics',
      title: 'Customer Metrics',
      type: 'object',
      fields: [
        defineField({ name: 'totalCustomers', type: 'number', title: 'Total Customers' }),
        defineField({ name: 'newCustomers', type: 'number', title: 'New Customers' }),
        defineField({ name: 'returningCustomers', type: 'number', title: 'Returning Customers' }),
        defineField({ name: 'customerLifetimeValue', type: 'number', title: 'Avg Customer Lifetime Value' }),
      ],
      description: 'Customer acquisition and retention metrics',
    }),

    // Product metrics
    defineField({
      name: 'productMetrics',
      title: 'Product Metrics',
      type: 'object',
      fields: [
        defineField({ name: 'topSellingProducts', type: 'array', of: [{ type: 'reference', to: [{ type: 'product' }] }], title: 'Top Selling Products' }),
        defineField({ name: 'lowStockAlerts', type: 'array', of: [{ type: 'reference', to: [{ type: 'product' }] }], title: 'Low Stock Products' }),
        defineField({ name: 'totalInventoryValue', type: 'number', title: 'Total Inventory Value' }),
      ],
      description: 'Product performance and inventory insights',
    }),

    // Marketing metrics
    defineField({
      name: 'marketingMetrics',
      title: 'Marketing Metrics',
      type: 'object',
      fields: [
        defineField({ name: 'campaignROI', type: 'number', title: 'Campaign ROI (%)' }),
        defineField({ name: 'emailOpenRate', type: 'number', title: 'Email Open Rate (%)' }),
        defineField({ name: 'socialEngagement', type: 'number', title: 'Social Engagement Score' }),
      ],
      description: 'Marketing effectiveness metrics',
    }),

    // Last updated
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      validation: (rule) => rule.required(),
      initialValue: () => new Date().toISOString(),
      description: 'When the dashboard was last refreshed',
    }),
  ],

  // Preview
  preview: {
    select: {
      title: 'name',
      revenue: 'salesMetrics.totalRevenue',
      lastUpdated: 'lastUpdated',
    },
    prepare(selection) {
      const { title, revenue, lastUpdated } = selection
      return {
        title: title,
        subtitle: `Revenue: $${revenue} | Updated: ${new Date(lastUpdated).toLocaleDateString()}`,
      }
    },
  },
})