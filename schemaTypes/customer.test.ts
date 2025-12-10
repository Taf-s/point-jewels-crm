// /Users/tafarasithole/Desktop/point-jewels-crm/schemaTypes/creativeExpression.test.ts
import creativeExpression from './creativeExpression'

describe('Creative Expression Schema', () => {
  it('should define a valid Sanity document type', () => {
    expect(creativeExpression.name).toBe('creativeExpression')
    expect(creativeExpression.title).toBe('Creative Expression Profile')
    expect(creativeExpression.type).toBe('document')
  })

  it('should have reference to customer', () => {
    const fields = creativeExpression.fields
    const customerRef = fields.find((field: any) => field.name === 'customerId')
    expect(customerRef).toBeDefined()
    expect(customerRef?.type).toBe('reference')
    expect(customerRef?.validation).toBeDefined()
  })

  it('should have musical harmony profile', () => {
    const fields = creativeExpression.fields
    const musicField = fields.find((field: any) => field.name === 'musicalHarmony')
    expect(musicField).toBeDefined()
    expect(musicField?.type).toBe('object')
    expect(musicField?.fields).toBeDefined()
  })

  it('should have visual harmony profile', () => {
    const fields = creativeExpression.fields
    const visualField = fields.find((field: any) => field.name === 'visualHarmony')
    expect(visualField).toBeDefined()
    expect(visualField?.type).toBe('object')
    expect(visualField?.fields).toBeDefined()
  })

  it('should have experiential design profile', () => {
    const fields = creativeExpression.fields
    const expField = fields.find((field: any) => field.name === 'experientialDesign')
    expect(expField).toBeDefined()
    expect(expField?.type).toBe('object')
    expect(expField?.fields).toBeDefined()
  })

  it('should have synesthetic bridge', () => {
    const fields = creativeExpression.fields
    const synaField = fields.find((field: any) => field.name === 'synaestheticBridge')
    expect(synaField).toBeDefined()
    expect(synaField?.type).toBe('object')
    expect(synaField?.fields).toBeDefined()
  })

  it('should have a preview configuration', () => {
    expect(creativeExpression.preview).toBeDefined()
    expect(creativeExpression.preview.select).toBeDefined()
    expect(creativeExpression.preview.prepare).toBeDefined()
  })

  it('should have proper field types', () => {
    const fields = creativeExpression.fields
    const fieldTypes = fields.map((field: any) => field.type)
    expect(fieldTypes).toContain('reference')
    expect(fieldTypes).toContain('object')
    expect(fieldTypes).toContain('datetime')
  })
})

// /Users/tafarasithole/Desktop/point-jewels-crm/sanity.config.ts
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import collection from './schemaTypes/collection'
import lizaCustomer from './schemaTypes/lizaCustomer'
import customer from './schemaTypes/customer'
import product from './schemaTypes/product'
import salesOrder from './schemaTypes/salesOrder'
import marketingCampaign from './schemaTypes/marketingCampaign'
import staff from './schemaTypes/staff'
import analyticsDashboard from './schemaTypes/analyticsDashboard'
import auditLog from './schemaTypes/auditLog'
import creativeExpression from './schemaTypes/creativeExpression'

// Desk structure for better organization
const deskStructure = (S: any) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Dashboard')
        .child(S.documentTypeList('analyticsDashboard')),
      S.listItem()
        .title('Collections')
        .child(S.documentTypeList('collection')),
      S.listItem()
        .title('Customers')
        .child(
          S.list()
            .title('Customer Types')
            .items([
              S.listItem().title('LIZA Customers').child(S.documentTypeList('lizaCustomer')),
              S.listItem().title('General Customers').child(S.documentTypeList('customer')),
            ])
        ),
      S.listItem()
        .title('Creative Expressions')
        .child(S.documentTypeList('creativeExpression')),
      S.listItem()
        .title('Products')
        .child(S.documentTypeList('product')),
      S.listItem()
        .title('Sales Orders')
        .child(S.documentTypeList('salesOrder')),
      S.listItem()
        .title('Marketing')
        .child(S.documentTypeList('marketingCampaign')),
      S.listItem()
        .title('Staff')
        .child(S.documentTypeList('staff')),
      S.listItem()
        .title('Audit Logs')
        .child(S.documentTypeList('auditLog')),
    ])

export default defineConfig({
  name: 'default',
  title: 'Point Jewels CRM',

  projectId: process.env.SANITY_PROJECT_ID || 'nzwofsfy',
  dataset: process.env.SANITY_DATASET || 'production',

  plugins: [deskTool({ structure: deskStructure })],

  schema: {
    types: [collection, lizaCustomer, customer, product, salesOrder, marketingCampaign, staff, analyticsDashboard, auditLog, creativeExpression],
  },

  // Auth roles for access control
  auth: {
    providers: [
      {
        name: 'sanity-login',
        title: 'Sanity',
        url: 'https://api.sanity.io/v1/auth/login/sanity',
      },
    ],
    redirectOnSingle: false,
  },
})