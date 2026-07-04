export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  contactEmail: string;
  contactEndpoint: string;
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  seo: {
    defaultTitle: string;
    titleTemplate: string;
    defaultDescription: string;
    defaultOgImage: string;
  };
}

export const siteConfig: SiteConfig = {
  name: 'Home Town Web Host',
  description: 'Web hosting for small local businesses with AI-enabled website management',
  url: 'https://hometownwebhost.com',
  contactEmail: 'support@hometownwebhost.com',
  contactEndpoint: import.meta.env.CONTACT_ENDPOINT || '/api/contact',
  socialMedia: {},
  seo: {
    defaultTitle: 'Home Town Web Host',
    titleTemplate: '%s | Home Town Web Host',
    defaultDescription: 'Affordable web hosting for small businesses with AI-enabled management',
    defaultOgImage: '/images/og-default.jpg',
  },
};
