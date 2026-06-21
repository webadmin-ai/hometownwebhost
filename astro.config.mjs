import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://hometownwebhost.com',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
});
