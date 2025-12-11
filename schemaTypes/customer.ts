// /Users/tafarasithole/Desktop/point-jewels-crm/schemaTypes/trendAnalysis.ts
import { defineField, defineType } from 'sanity'

/**
 * TREND ANALYSIS SCHEMA
 * Phase 3: Trend metrics, patterns, and insights
 * Tracks seasonal trends, cultural patterns, engagement effectiveness
 */
export default defineType({
  name: 'trendAnalysis',
  title: 'Trend Analysis',
  type: 'document',
  fields: [
    // Trend Type
    defineField({
      name: 'trendType',
      title: 'Trend Type',
      type: 'string',
      options: {
        list: [
          { title: 'Seasonal Pattern', value: 'seasonal' },
          { title: 'Cultural Preference', value: 'cultural' },
          { title: 'Musical-Jewelry Correlation', value: 'musical-jewelry' },
          { title: 'Engagement Effectiveness', value: 'engagement' },
          { title: 'Collection Performance', value: 'collection' },
          { title: 'Experience Adoption', value: 'experience' },
          { title: 'Energy Alignment Impact', value: 'energy-alignment' },
        ],
      },
      validation: (rule) => rule.required(),
      description: 'Type of trend being analyzed',
    }),

    // Time Frame
    defineField({
      name: 'timeFrame',
      title: 'Time Frame',
      type: 'string',
      options: {
        list: [
          { title: 'Daily', value: 'daily' },
          { title: 'Weekly', value: 'weekly' },
          { title: 'Monthly', value: 'monthly' },
          { title: 'Quarterly', value: 'quarterly' },
          { title: 'Yearly', value: 'yearly' },
          { title: 'Multi-Year', value: 'multi-year' },
        ],
      },
      description: 'Granularity of trend analysis',
    }),

    // Period
    defineField({
      name: 'period',
      title: 'Analysis Period',
      type: 'string',
      description: 'Specific period analyzed (e.g., Q4 2025, Holiday Season)',
    }),

    // Data Points
    defineField({
      name: 'dataPoints',
      title: 'Data Points',
      type: 'object',
      fields: [
        defineField({
          name: 'totalMetric',
          title: 'Total Metric',
          type: 'number',
          description: 'Aggregate metric value',
        }),
        defineField({
          name: 'averageMetric',
          title: 'Average Metric',
          type: 'number',
          description: 'Average value',
        }),
        defineField({
          name: 'percentageChange',
          title: 'Percentage Change',
          type: 'number',
          description: 'Change from previous period (%)',
        }),
        defineField({
          name: 'topCategory',
          title: 'Top Category',
          type: 'string',
          description: 'Leading category or segment',
        }),
        defineField({
          name: 'bottomCategory',
          title: 'Bottom Category',
          type: 'string',
          description: 'Lowest performing category',
        }),
        defineField({
          name: 'recordsAnalyzed',
          title: 'Records Analyzed',
          type: 'number',
          description: 'Number of records in analysis',
        }),
      ],
      description: 'Aggregated metric data',
    }),

    // Insights
    defineField({
      name: 'insights',
      title: 'Insights',
      type: 'object',
      fields: [
        defineField({
          name: 'narrativeAnalysis',
          title: 'Narrative Analysis',
          type: 'text',
          description: 'Detailed written analysis of trends',
        }),
        defineField({
          name: 'keyFindings',
          title: 'Key Findings',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Bullet-point key findings',
        }),
        defineField({
          name: 'patterns',
          title: 'Identified Patterns',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Notable patterns detected',
        }),
        defineField({
          name: 'anomalies',
          title: 'Anomalies',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Unusual or unexpected findings',
        }),
      ],
      description: 'Analysis and insights',
    }),

    // Recommendations
    defineField({
      name: 'recommendations',
      title: 'Recommendations',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Actionable recommendations based on trends',
    }),

    // Impact
    defineField({
      name: 'impact',
      title: 'Business Impact',
      type: 'object',
      fields: [
        defineField({
          name: 'estimatedRevenueImpact',
          title: 'Estimated Revenue Impact',
          type: 'number',
          description: 'Projected revenue impact ($)',
        }),
        defineField({
          name: 'customersAffected',
          title: 'Customers Affected',
          type: 'number',
          description: 'Number of customers impacted',
        }),
        defineField({
          name: 'implementationEffort',
          title: 'Implementation Effort',
          type: 'string',
          options: {
            list: [
              { title: 'Low', value: 'low' },
              { title: 'Medium', value: 'medium' },
              { title: 'High', value: 'high' },
            ],
          },
          description: 'Effort to implement recommendations',
        }),
        defineField({
          name: 'priority',
          title: 'Priority',
          type: 'string',
          options: {
            list: [
              { title: 'Critical', value: 'critical' },
              { title: 'High', value: 'high' },
              { title: 'Medium', value: 'medium' },
              { title: 'Low', value: 'low' },
            ],
          },
          description: 'Priority for implementation',
        }),
      ],
      description: 'Business impact metrics',
    }),

    // Auto-generated fields
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

  preview: {
    select: {
      trendType: 'trendType',
      period: 'period',
      percentageChange: 'dataPoints.percentageChange',
    },
    prepare(selection) {
      const { trendType, period, percentageChange } = selection
      const changeLabel = percentageChange > 0 ? `+${percentageChange}%` : `${percentageChange}%`
      return {
        title: trendType,
        subtitle: `${period} • ${changeLabel}`,
      }
    },
  },
})

// /Users/tafarasithole/Desktop/point-jewels-crm/schemaTypes/trendAnalysis.test.ts
import trendAnalysis from './trendAnalysis'

describe('Trend Analysis Schema', () => {
  it('should define a valid Sanity document type', () => {
    expect(trendAnalysis.name).toBe('trendAnalysis')
    expect(trendAnalysis.title).toBe('Trend Analysis')
    expect(trendAnalysis.type).toBe('document')
  })

  it('should have trend type field', () => {
    const fields = trendAnalysis.fields
    const trendTypeField = fields.find((field: any) => field.name === 'trendType')
    expect(trendTypeField).toBeDefined()
    expect(trendTypeField?.type).toBe('string')
    expect(trendTypeField?.validation).toBeDefined()
  })

  it('should have time frame field', () => {
    const fields = trendAnalysis.fields
    const timeFrameField = fields.find((field: any) => field.name === 'timeFrame')
    expect(timeFrameField).toBeDefined()
    expect(timeFrameField?.type).toBe('string')
  })

  it('should have data points object', () => {
    const fields = trendAnalysis.fields
    const dataPointsField = fields.find((field: any) => field.name === 'dataPoints')
    expect(dataPointsField).toBeDefined()
    expect(dataPointsField?.type).toBe('object')
    expect(dataPointsField?.fields).toBeDefined()
  })

  it('should have insights object', () => {
    const fields = trendAnalysis.fields
    const insightsField = fields.find((field: any) => field.name === 'insights')
    expect(insightsField).toBeDefined()
    expect(insightsField?.type).toBe('object')
  })

  it('should have recommendations array', () => {
    const fields = trendAnalysis.fields
    const recommendationsField = fields.find((field: any) => field.name === 'recommendations')
    expect(recommendationsField).toBeDefined()
    expect(recommendationsField?.type).toBe('array')
  })

  it('should have impact object with business metrics', () => {
    const fields = trendAnalysis.fields
    const impactField = fields.find((field: any) => field.name === 'impact')
    expect(impactField).toBeDefined()
    expect(impactField?.type).toBe('object')
    expect(impactField?.fields).toBeDefined()
  })
})