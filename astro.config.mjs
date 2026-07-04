import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.hometownwebhost.com',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
});
