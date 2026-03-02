import { defineConfig } from 'astro/config';
import sanity from '@sanity/astro';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [
    sanity({
      projectId: 'd676hucs',
      dataset: 'production',
      useCdn: false,
      apiVersion: '2023-05-03',
    }),
    react(),
    tailwind(),
  ],
});
