import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/testimonials' }),
  schema: z.object({
    quote: z.string().min(20).max(500),
    author: z.string().min(2).max(100),
    businessName: z.string().max(100).optional(),
    businessType: z.string().max(50).optional(),
    order: z.number().int().positive(),
  }),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/services' }),
  schema: z.object({
    title: z.string().min(5).max(100),
    description: z.string().min(20).max(500),
    icon: z.string().optional(),
    features: z.array(z.string()),
    targetAudience: z.array(z.string()),
    order: z.number().int().positive(),
    body: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

const pricing = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/pricing' }),
  schema: z.object({
    planName: z.string().min(3).max(100),
    planType: z.enum(['basic', 'ai', 'custom']),
    monthlyPrice: z.number().nonnegative(),
    annualPrice: z.number().nonnegative(),
    features: z.array(z.string()),
    technicalSpecs: z.object({
      storage: z.string().optional(),
      bandwidth: z.string().optional(),
      domains: z.string().optional(),
      email: z.string().optional(),
      support: z.string().optional(),
      aiFeatures: z.boolean(),
    }).optional(),
    isPopular: z.boolean().default(false),
    promotionalPricing: z.object({
      monthly: z.number().positive(),
      annual: z.number().positive(),
      expiresAt: z.string(),
    }).optional(),
    additionalCosts: z.array(z.object({
      description: z.string(),
      amount: z.number().nonnegative(),
    })).optional(),
    order: z.number().int().positive(),
    contactForPricing: z.boolean().default(false),
    startingAt: z.boolean().default(false),
  }),
});

export const collections = { testimonials, services, pricing };
