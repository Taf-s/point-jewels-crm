import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'point-jewels-crm',

  projectId: 'ivgk830x',
  dataset: 'production',

  plugins: [structureTool(),],

  schema: {
    types: schemaTypes,
  },
})
