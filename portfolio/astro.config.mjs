// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://alejandrozumbado.dev',
  // Prefetch any internal page on hover/focus so clicks feel instant
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [sitemap()],
});