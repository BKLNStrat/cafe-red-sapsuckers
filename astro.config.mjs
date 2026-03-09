import { defineConfig } from 'astro/config';
import sanity from '@sanity/astro';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

const isPreview = process.env.PREVIEW_MODE === 'true';

// https://astro.build/config
export default defineConfig({
  base: isPreview ? '/preview' : '/',
  outDir: isPreview ? './dist-preview' : './dist',
  integrations: [
    sanity({
      projectId: 'd676hucs',
      dataset: 'production',
      useCdn: false,
      apiVersion: '2023-05-03',
      ...(isPreview
        ? {
            perspective: 'previewDrafts',
            token: process.env.SANITY_TOKEN,
          }
        : {}),
    }),
    react(),
    tailwind(),
  ],
});
