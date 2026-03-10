import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schema'
import { menufySyncPlugin } from './plugins/menufy-sync'
import { sitePreviewPlugin } from './plugins/site-preview'
import { deskStructure } from './deskStructure'
import { initialValueTemplates } from './initialValueTemplates'

export default defineConfig({
  name: 'default',
  title: 'Cafe Red & Sapsuckers',

  projectId: 'd676hucs',
  dataset: 'production',

  plugins: [
    structureTool({ structure: deskStructure }),
    menufySyncPlugin(),
    sitePreviewPlugin(),
  ],

  schema: {
    types: schemaTypes,
    templates: (prev) => [...prev, ...initialValueTemplates],
  },
})
