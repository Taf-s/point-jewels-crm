// /Users/tafarasithole/Desktop/point-jewels-crm/schemaTypes/lizaCustomer.ts
import { defineField, defineType } from 'sanity'

/**
 * LIZA CUSTOMER SCHEMA
 * High-net-worth customer profile with advanced analytics and priority handling
 * Enhanced for data-driven luxury sales decisions
 * Phase 1: Added Advanced Cultural Profiling for elite customer resonance
 */
export default defineType({
  name: 'lizaCustomer',
  title: 'LIZA Customer',
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

    // LIZA-Specific Segmentation
    defineField({
      name: 'lizaTier',
      title: 'LIZA Tier',
      type: 'string',
      options: {
        list: [
          { title: 'Diamond Elite', value: 'diamond-elite' },
          { title: 'Platinum Premier', value: 'platinum-premier' },
          { title: 'Gold Preferred', value: 'gold-preferred' },
          { title: 'Silver Select', value: 'silver-select' },
        ],
      },
      validation: (rule) => rule.required(),
      description: 'LIZA membership tier for priority service levels',
    }),

    defineField({
      name: 'netWorthRange',
      title: 'Net Worth Range',
      type: 'string',
      options: {
        list: [
          { title: '$50M+', value: '50m-plus' },
          { title: '$25M - $50M', value: '25m-50m' },
          { title: '$10M - $25M', value: '10m-25m' },
          { title: '$5M - $10M', value: '5m-10m' },
        ],
      },
      description: 'Estimated net worth range for investment guidance',
    }),

    // Advanced Analytics
    defineField({
      name: 'lifetimeValue',
      title: 'Lifetime Value',
      type: 'number',
      description: 'Total value of all purchases (auto-calculated)',
      readOnly: true,
    }),

    defineField({
      name: 'averageOrderValue',
      title: 'Average Order Value',
      type: 'number',
      description: 'Average value per transaction',
      readOnly: true,
    }),

    defineField({
      name: 'investmentProfile',
      title: 'Investment Profile',
      type: 'object',
      fields: [
        defineField({
          name: 'riskTolerance',
          title: 'Risk Tolerance',
          type: 'string',
          options: {
            list: [
              { title: 'Conservative', value: 'conservative' },
              { title: 'Moderate', value: 'moderate' },
              { title: 'Aggressive', value: 'aggressive' },
            ],
          },
        }),
        defineField({
          name: 'investmentHorizon',
          title: 'Investment Horizon',
          type: 'string',
          options: {
            list: [
              { title: 'Short-term (1-3 years)', value: 'short-term' },
              { title: 'Medium-term (3-7 years)', value: 'medium-term' },
              { title: 'Long-term (7+ years)', value: 'long-term' },
            ],
          },
        }),
        defineField({
          name: 'preferredMetals',
          title: 'Preferred Precious Metals',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            list: [
              { title: 'Gold', value: 'gold' },
              { title: 'Platinum', value: 'platinum' },
              { title: 'Palladium', value: 'palladium' },
              { title: 'Silver', value: 'silver' },
            ],
          },
        }),
      ],
      description: 'Investment preferences for personalized recommendations',
    }),

    // Luxury Preferences
    defineField({
      name: 'luxuryPreferences',
      title: 'Luxury Preferences',
      type: 'object',
      fields: [
        defineField({
          name: 'preferredDesigners',
          title: 'Preferred Designers',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Designers or styles this customer favors',
        }),
        defineField({
          name: 'gemstonePreferences',
          title: 'Gemstone Preferences',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            list: [
              { title: 'Diamonds', value: 'diamonds' },
              { title: 'Rubies', value: 'rubies' },
              { title: 'Emeralds', value: 'emerald' },
              { title: 'Sapphires', value: 'sapphires' },
              { title: 'Colored Gems', value: 'colored-gems' },
            ],
          },
        }),
        defineField({
          name: 'customizationLevel',
          title: 'Customization Level',
          type: 'string',
          options: {
            list: [
              { title: 'Standard Pieces', value: 'standard' },
              { title: 'Semi-Custom', value: 'semi-custom' },
              { title: 'Bespoke', value: 'bespoke' },
            ],
          },
        }),
      ],
    }),

    // Advanced Cultural Profiling (Phase 1: Enhanced for LIZA VIPs)
    defineField({
      name: 'culturalProfile',
      title: 'Cultural Profile',
      type: 'object',
      description: 'Deep anthropological insights with engineering precision for elite customer resonance',
      fields: [
        defineField({
          name: 'culturalHeritage',
          title: 'Cultural Heritage',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            list: [
              { title: 'African', value: 'african' },
              { title: 'European', value: 'european' },
              { title: 'Asian', value: 'asian' },
              { title: 'North American', value: 'north-american' },
              { title: 'South American', value: 'south-american' },
              { title: 'Middle Eastern', value: 'middle-eastern' },
              { title: 'Oceanic', value: 'oceanic' },
              { title: 'Mixed Heritage', value: 'mixed' },
              { title: 'Global Cosmopolitan', value: 'cosmopolitan' },
            ],
          },
          description: 'Primary cultural backgrounds for bespoke, culturally resonant experiences',
        }),
        defineField({
          name: 'primaryLanguage',
          title: 'Primary Language',
          type: 'string',
          description: 'Native or preferred language for elite communication',
        }),
        defineField({
          name: 'culturalValues',
          title: 'Cultural Values',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            list: [
              { title: 'Family Legacy & Tradition', value: 'family-legacy' },
              { title: 'Harmony & Spiritual Balance', value: 'harmony-spiritual' },
              { title: 'Innovation & Cultural Fusion', value: 'innovation-fusion' },
              { title: 'Excellence & Mastery', value: 'excellence-mastery' },
              { title: 'Philanthropy & Social Impact', value: 'philanthropy-impact' },
              { title: 'Artistic Expression', value: 'artistic-expression' },
            ],
          },
          description: 'Sophisticated values guiding luxury decision-making',
        }),
        defineField({
          name: 'communicationStyle',
          title: 'Communication Style',
          type: 'string',
          options: {
            list: [
              { title: 'Direct & Visionary', value: 'direct-visionary' },
              { title: 'Indirect & Diplomatic', value: 'indirect-diplomatic' },
              { title: 'Formal & Elite', value: 'formal-elite' },
              { title: 'Casual & Cultured', value: 'casual-cultured' },
            ],
          },
          description: 'Refined communication preferences for positive, aligned engagement',
        }),
        defineField({
          name: 'decisionMakingApproach',
          title: 'Decision Making Approach',
          type: 'string',
          options: {
            list: [
              { title: 'Individual Visionary', value: 'individual-visionary' },
              { title: 'Family Dynasty Consensus', value: 'family-dynasty' },
              { title: 'Trusted Advisor Network', value: 'advisor-network' },
              { title: 'Intuitive & Experiential', value: 'intuitive-experiential' },
            ],
          },
          description: 'Elite decision-making processes in cultural context',
        }),
        defineField({
          name: 'jewelryCulturalSignificance',
          title: 'Jewelry Cultural Significance',
          type: 'text',
          description: 'Deep cultural meaning and legacy value of jewelry in their heritage',
        }),
        defineField({
          name: 'culturalInvestmentPhilosophy',
          title: 'Cultural Investment Philosophy',
          type: 'text',
          description: 'How cultural values influence investment and collection strategies',
        }),
        defineField({
          name: 'positiveEnergyAlignment',
          title: 'Positive Energy Alignment',
          type: 'string',
          options: {
            list: [
              { title: 'Exceptional - Reiki-Harmonized', value: 'exceptional' },
              { title: 'High - Naturally Aligned', value: 'high' },
              { title: 'Medium - Evolving Harmony', value: 'medium' },
            ],
          },
          description: 'Advanced positive energy alignment for transformative customer experiences',
        }),
        defineField({
          name: 'preferredCulturalExperiences',
          title: 'Preferred Cultural Experiences',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            list: [
              { title: 'Cultural Heritage Tours', value: 'heritage-tours' },
              { title: 'Artisan Collaborations', value: 'artisan-collaborations' },
              { title: 'Cultural Fusion Events', value: 'fusion-events' },
              { title: 'Philanthropic Initiatives', value: 'philanthropic' },
              { title: 'Spiritual Retreats', value: 'spiritual-retreats' },
            ],
          },
          description: 'Elite cultural experiences to enhance jewelry engagement',
        }),
      ],
    }),

    // Relationship & Service
    defineField({
      name: 'dedicatedAdvisor',
      title: 'Dedicated LIZA Advisor',
      type: 'reference',
      to: [{ type: 'staff' }],
      description: 'Dedicated relationship manager for this LIZA customer',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'serviceLevel',
      title: 'Service Level Agreement',
      type: 'string',
      options: {
        list: [
          { title: 'White Glove', value: 'white-glove' },
          { title: 'Priority', value: 'priority' },
          { title: 'Standard LIZA', value: 'standard-liza' },
        ],
      },
      initialValue: 'standard-liza',
    }),

    defineField({
      name: 'lastEngagement',
      title: 'Last Engagement',
      type: 'datetime',
      description: 'Date of last high-touch interaction',
    }),

    defineField({
      name: 'nextEngagement',
      title: 'Next Scheduled Engagement',
      type: 'datetime',
      description: 'Upcoming appointment or event',
    }),

    // Encrypted VIP Data
    defineField({
      name: 'encryptedVIPData',
      title: 'Encrypted VIP Data',
      type: 'object',
      fields: [
        defineField({
          name: 'privateContactInfo',
          title: 'Private Contact Information',
          type: 'text',
          description: 'Additional private contact details',
        }),
        defineField({
          name: 'confidentialNotes',
          title: 'Confidential Notes',
          type: 'text',
          description: 'Highly sensitive internal notes',
        }),
      ],
      hidden: true,
    }),

    // Auto-generated fields
    defineField({
      name: 'lizaId',
      title: 'LIZA ID',
      type: 'string',
      readOnly: true,
      description: 'Unique LIZA customer identifier',
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

  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      tier: 'lizaTier',
      lifetimeValue: 'lifetimeValue',
    },
    prepare(selection) {
      const { firstName, lastName, tier, lifetimeValue } = selection
      return {
        title: `${firstName} ${lastName}`,
        subtitle: `LIZA ${tier} • $${lifetimeValue || 0} LTV`,
      }
    },
  },
})