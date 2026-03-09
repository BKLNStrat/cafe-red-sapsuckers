import { definePlugin } from 'sanity'
import { SitePreviewTool } from './SitePreviewTool'

export const sitePreviewPlugin = definePlugin({
  name: 'site-preview',
  tools: [
    {
      name: 'site-preview',
      title: 'Preview Site',
      component: SitePreviewTool,
    },
  ],
})
