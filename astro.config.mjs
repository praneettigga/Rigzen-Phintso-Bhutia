// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Change `site` to the final domain once it is connected in Vercel.
export default defineConfig({
  site: 'https://rigzen-phintso-bhutia.vercel.app',
  output: 'static',
  integrations: [sitemap()],
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  image: { layout: 'constrained' },
});
