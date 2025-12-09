// /Users/tafarasithole/Desktop/point-jewels-crm/schemaTypes/creativeExpression.ts
import { defineField, defineType } from 'sanity'

/**
 * CREATIVE EXPRESSION SCHEMA
 * Phase 2: Experiential Design + Music/Visual Harmony Integration
 * Transforms jewelry sales through sensory, emotional, and artistic engagement
 */
export default defineType({
  name: 'creativeExpression',
  title: 'Creative Expression Profile',
  type: 'document',
  fields: [
    // Reference to Customer
    defineField({
      name: 'customerId',
      title: 'Customer Reference',
      type: 'reference',
      to: [{ type: 'customer' }, { type: 'lizaCustomer' }],
      validation: (rule) => rule.required(),
      description: 'Link to customer profile',
    }),

    // Musical Harmony Profile
    defineField({
      name: 'musicalHarmony',
      title: 'Musical Harmony Profile',
      type: 'object',
      description: 'Music as language for emotional resonance and brand experience',
      fields: [
        defineField({
          name: 'musicalPreference',
          title: 'Musical Preference',
          type: 'string',
          options: {
            list: [
              { title: 'Classical & Symphony', value: 'classical' },
              { title: 'Jazz & Blues', value: 'jazz' },
              { title: 'Contemporary & Electronic', value: 'contemporary' },
              { title: 'World & Fusion', value: 'world-fusion' },
              { title: 'Ambient & Meditative', value: 'ambient' },
              { title: 'Acoustic & Organic', value: 'acoustic' },
            ],
          },
          description: 'Musical genre that resonates with customer aesthetic',
        }),
        defineField({
          name: 'emotionalTone',
          title: 'Emotional Tone',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            list: [
              { title: 'Energetic & Bold', value: 'energetic' },
              { title: 'Serene & Peaceful', value: 'serene' },
              { title: 'Romantic & Intimate', value: 'romantic' },
              { title: 'Powerful & Majestic', value: 'powerful' },
              { title: 'Playful & Joyful', value: 'joyful' },
              { title: 'Melancholic & Reflective', value: 'reflective' },
            ],
          },
          description: 'Emotional qualities desired in brand experience',
        }),
        defineField({
          name: 'soundscapePreference',
          title: 'Soundscape Preference',
          type: 'string',
          options: {
            list: [
              { title: 'Orchestral Richness', value: 'orchestral' },
              { title: 'Minimalist Elegance', value: 'minimalist' },
              { title: 'Layered Complexity', value: 'layered' },
              { title: 'Rhythmic Groove', value: 'rhythmic' },
              { title: 'Natural Elements', value: 'natural' },
            ],
          },
          description: 'Preferred soundscape composition style',
        }),
        defineField({
          name: 'musicAsExperience',
          title: 'Music as Experience',
          type: 'text',
          description: 'How music should enhance their jewelry purchase journey',
        }),
      ],
    }),

    // Visual Harmony Profile
    defineField({
      name: 'visualHarmony',
      title: 'Visual Harmony Profile',
      type: 'object',
      description: 'Color, light, and design aesthetics for visual resonance',
      fields: [
        defineField({
          name: 'colorPalette',
          title: 'Color Palette',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            list: [
              { title: 'Precious Metals (Gold, Silver, Platinum)', value: 'precious-metals' },
              { title: 'Jewel Tones (Deep, Rich)', value: 'jewel-tones' },
              { title: 'Pastels & Soft Hues', value: 'pastels' },
              { title: 'Earth Tones & Naturals', value: 'earth-tones' },
              { title: 'Monochromatic & Minimalist', value: 'monochromatic' },
              { title: 'High Contrast & Bold', value: 'high-contrast' },
            ],
          },
          description: 'Color preferences for visual experience',
        }),
        defineField({
          name: 'lightingMood',
          title: 'Lighting Mood',
          type: 'string',
          options: {
            list: [
              { title: 'Warm & Golden', value: 'warm' },
              { title: 'Cool & Ethereal', value: 'cool' },
              { title: 'Dramatic & Moody', value: 'dramatic' },
              { title: 'Soft & Diffused', value: 'soft' },
              { title: 'Natural & Daylight', value: 'natural' },
            ],
          },
          description: 'Preferred lighting atmosphere for showroom/experience',
        }),
        defineField({
          name: 'designAesthetic',
          title: 'Design Aesthetic',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            list: [
              { title: 'Modern & Minimalist', value: 'modern' },
              { title: 'Vintage & Timeless', value: 'vintage' },
              { title: 'Bohemian & Eclectic', value: 'bohemian' },
              { title: 'Art Deco & Geometric', value: 'art-deco' },
              { title: 'Nature-Inspired & Organic', value: 'organic' },
              { title: 'Futuristic & Contemporary', value: 'futuristic' },
            ],
          },
          description: 'Design movements that resonate aesthetically',
        }),
        defineField({
          name: 'visualSymbolism',
          title: 'Visual Symbolism',
          type: 'text',
          description: 'Symbolic meanings and visual metaphors important to customer',
        }),
      ],
    }),

    // Experiential Design Profile
    defineField({
      name: 'experientialDesign',
      title: 'Experiential Design',
      type: 'object',
      description: 'Immersive, multi-sensory jewelry experience preferences',
      fields: [
        defineField({
          name: 'experienceType',
          title: 'Preferred Experience Type',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            list: [
              { title: 'Virtual Reality Showroom', value: 'vr-showroom' },
              { title: 'Intimate Private Consultation', value: 'private-consultation' },
              { title: 'Immersive Installation Events', value: 'installations' },
              { title: 'Artisan Workshop Experience', value: 'workshop' },
              { title: 'Storytelling & Heritage Tour', value: 'storytelling' },
              { title: 'Customization Co-Creation', value: 'co-creation' },
            ],
          },
          description: 'Types of experiences customer values most',
        }),
        defineField({
          name: 'sensoryEngagement',
          title: 'Sensory Engagement',
          type: 'object',
          fields: [
            defineField({
              name: 'touchTexture',
              title: 'Touch & Texture',
              type: 'string',
              options: {
                list: [
                  { title: 'Smooth & Polished', value: 'smooth' },
                  { title: 'Textured & Tactile', value: 'textured' },
                  { title: 'Organic & Natural', value: 'organic-touch' },
                  { title: 'Cool & Metallic', value: 'metallic-touch' },
                ],
              },
            }),
            defineField({
              name: 'spatialFlow',
              title: 'Spatial Flow',
              type: 'string',
              options: {
                list: [
                  { title: 'Open & Spacious', value: 'open' },
                  { title: 'Intimate & Enclosed', value: 'intimate' },
                  { title: 'Flowing & Connected', value: 'flowing' },
                  { title: 'Secluded & Private', value: 'secluded' },
                ],
              },
            }),
            defineField({
              name: 'scent',
              title: 'Scent Preference',
              type: 'string',
              options: {
                list: [
                  { title: 'Floral & Botanical', value: 'floral' },
                  { title: 'Woody & Earthy', value: 'woody' },
                  { title: 'Fresh & Citrus', value: 'citrus' },
                  { title: 'Luxurious & Musky', value: 'luxurious' },
                  { title: 'Unscented', value: 'unscented' },
                ],
              },
            }),
          ],
          description: 'Multi-sensory preferences for immersive engagement',
        }),
        defineField({
          name: 'timeFrame',
          title: 'Preferred Experience Time',
          type: 'string',
          options: {
            list: [
              { title: 'Quick & Efficient (15-30 min)', value: 'quick' },
              { title: 'Moderate (30-60 min)', value: 'moderate' },
              { title: 'Immersive (1-3 hours)', value: 'immersive' },
              { title: 'Extended (Full Day Experience)', value: 'extended' },
            ],
          },
          description: 'How much time customer wants to invest in experience',
        }),
        defineField({
          name: 'socialContext',
          title: 'Social Context',
          type: 'string',
          options: {
            list: [
              { title: 'Solo & Introspective', value: 'solo' },
              { title: 'Partner & Intimate', value: 'partner' },
              { title: 'Family & Inclusive', value: 'family' },
              { title: 'Group & Community', value: 'group' },
            ],
          },
          description: 'Preferred social dynamic during experience',
        }),
      ],
    }),

    // Synesthetic Bridge (Music ↔ Jewelry ↔ Story)
    defineField({
      name: 'synaestheticBridge',
      title: 'Synesthetic Bridge',
      type: 'object',
      description: 'Cross-sensory connections between music, jewelry, and emotion',
      fields: [
        defineField({
          name: 'musicToJewelryMapping',
          title: 'Music to Jewelry Mapping',
          type: 'text',
          description: 'How customer experiences jewelry through musical metaphor',
        }),
        defineField({
          name: 'jewelryStory',
          title: 'Jewelry Story',
          type: 'text',
          description: 'Personal narrative that jewelry embodies and expresses',
        }),
        defineField({
          name: 'creativeTheme',
          title: 'Creative Theme',
          type: 'string',
          options: {
            list: [
              { title: 'Journey & Transformation', value: 'journey' },
              { title: 'Love & Connection', value: 'love' },
              { title: 'Power & Confidence', value: 'power' },
              { title: 'Artistry & Mastery', value: 'artistry' },
              { title: 'Heritage & Legacy', value: 'heritage' },
              { title: 'Nature & Elements', value: 'nature' },
            ],
          },
          description: 'Overarching creative theme for customer expression',
        }),
      ],
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
      customerId: 'customerId',
      musicalPreference: 'musicalHarmony.musicalPreference',
      aesthetic: 'visualHarmony.designAesthetic',
      theme: 'synaestheticBridge.creativeTheme',
    },
    prepare(selection) {
      const { musicalPreference, aesthetic, theme } = selection
      return {
        title: 'Creative Expression',
        subtitle: `${musicalPreference || 'Musical'} • ${aesthetic?.[0] || 'Design'} • ${theme || 'Theme'}`,
      }
    },
  },
})