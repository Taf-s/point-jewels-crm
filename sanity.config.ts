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

  // ... rest of the config
  

  schema: {
    types: [collection, lizaCustomer, customer, product, salesOrder, marketingCampaign, staff, analyticsDashboard, auditLog],
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