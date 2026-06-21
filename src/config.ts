export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  contactEmail: string;
  contactPhone: string;
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
  name: "Home Town Web Host",
  description: "Web hosting for small local businesses with AI-enabled website management",
  url: "https://hometownwebhost.com",
  contactEmail: "info@hometownwebhost.com",
  contactPhone: "+1-800-555-HOST",
  contactEndpoint: import.meta.env.CONTACT_ENDPOINT || "https://api.hometownwebhost.com/contact",
  socialMedia: {
    facebook: "https://facebook.com/hometownwebhost",
    twitter: "https://twitter.com/hometownwebhost",
  },
  seo: {
    defaultTitle: "Home Town Web Host | Local Web Hosting with AI Power",
    titleTemplate: "%s | Home Town Web Host",
    defaultDescription: "Affordable, high-performance web hosting for small local businesses with innovative, plain-English AI management features.",
    defaultOgImage: "/images/og-default.jpg",
  },
};
