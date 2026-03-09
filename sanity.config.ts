import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schema'
import { menufySyncPlugin } from './plugins/menufy-sync'
import { sitePreviewPlugin } from './plugins/site-preview'

export default defineConfig({
  name: 'default',
  title: 'Cafe Red Sapsuckers',

  projectId: 'd676hucs',
  dataset: 'production',

  plugins: [structureTool(), menufySyncPlugin(), sitePreviewPlugin()],

  schema: {
    types: schemaTypes,
  },
})
