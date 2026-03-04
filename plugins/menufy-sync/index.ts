import { definePlugin } from 'sanity'
import { MenufySyncTool } from './MenufySyncTool'

export const menufySyncPlugin = definePlugin({
  name: 'menufy-sync',
  tools: [
    {
      name: 'menufy-sync',
      title: 'Sync from Menufy',
      component: MenufySyncTool,
    },
  ],
})
