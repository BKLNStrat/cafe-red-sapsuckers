import { defineConfig } from 'astro/config';
import sanity from '@sanity/astro';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [
    sanity({
      projectId: 'd676hucs',
      dataset: 'production',
      useCdn: false, // We want fresh data during dev
      apiVersion: '2023-05-03',
    }),
    react(),
  ],
});
