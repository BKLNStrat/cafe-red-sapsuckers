import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schema'
import { menufySyncPlugin } from './plugins/menufy-sync'

export default defineConfig({
  name: 'default',
  title: 'Cafe Red Sapsuckers',

  projectId: 'd676hucs',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), menufySyncPlugin()],

  schema: {
    types: schemaTypes,
  },
})
