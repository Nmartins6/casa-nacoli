import { z } from "zod";

const slugSchema = z.string().regex(/^[a-z0-9-]+$/);

export const categorySchema = z.object({
  id: slugSchema,
  name: z.string().min(2),
  slug: slugSchema,
  description: z.string().min(20),
  subcategories: z.array(
    z.object({
      id: slugSchema,
      name: z.string().min(2),
    }),
  ),
  sortOrder: z.number().int(),
});

export const productImageSchema = z.object({
  src: z.string(),
  alt: z.string().min(3),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  objectPosition: z.string().optional(),
});

export const productVariantSchema = z.looseObject({
  id: slugSchema,
  name: z.string().min(2),
  price: z.number().nonnegative().nullable().optional(),
  quantity: z.number().int().positive().optional(),
  minQuantity: z.number().int().positive().optional(),
  maxQuantity: z.number().int().positive().nullable().optional(),
  requiresQuote: z.boolean().optional(),
});

export const productSchema = z.object({
  id: slugSchema,
  slug: slugSchema,
  name: z.string().min(3),
  categoryId: slugSchema,
  subcategoryId: slugSchema,
  status: z.enum(["draft", "active", "archived"]),
  featured: z.boolean().default(false),
  sortOrder: z.number().int(),
  summary: z.string().min(20).max(180),
  description: z.string().min(30),
  pricing: z.object({
    kind: z.enum([
      "fixed",
      "starting_at",
      "variants",
      "tiered",
      "quote",
      "matrix_quote",
    ]),
    currency: z.literal("BRL"),
    amount: z.number().nonnegative().nullable().optional(),
    display: z.string().min(3),
  }),
  variants: z.array(productVariantSchema),
  volumeDiscountRules: z.array(
    z.object({
      minQuantity: z.number().int().positive(),
      maxQuantity: z.number().int().positive().nullable().optional(),
      label: z.string().min(3),
      discountPercent: z.number().nonnegative().nullable().optional(),
      requiresQuote: z.boolean().optional(),
    }),
  ),
  personalization: z.object({
    available: z.boolean(),
    customerCanSendArtwork: z.boolean(),
    designSupport: z.boolean(),
    notes: z.string(),
  }),
  keywords: z.array(z.string().min(2)),
  images: z.array(productImageSchema),
  imageFolder: z.string(),
  placeholderImage: z.string(),
  cta: z.object({
    label: z.string().min(3),
    messageTemplate: z.string().min(10),
  }),
  seo: z.object({
    title: z.string().min(5),
    description: z.string().min(20),
  }),
  notes: z.array(z.string()),
  needsPriceConfirmation: z.boolean().default(false),
});

export const reviewSchema = z.object({
  id: slugSchema,
  stars: z.number().int().min(1).max(5),
  name: z.string().min(2),
  comment: z.string().min(2),
  source: z.string().min(2),
  verifiedCopy: z.boolean(),
});

export const siteConfigSchema = z.object({
  brand: z.object({
    name: z.string().min(2),
    tagline: z.string().min(10),
    domain: z.url(),
    language: z.string().min(2),
    locale: z.string().min(2),
  }),
  contact: z.object({
    whatsappNumber: z.string().regex(/^\+[1-9]\d{7,14}$/),
    whatsappDisplay: z.string().min(8),
    instagram: z.string().min(2),
    email: z.email(),
    city: z.string().min(2),
    state: z.string().length(2),
    address: z.string().min(2),
    businessHours: z.array(
      z.object({
        days: z.array(z.string()),
        label: z.string(),
        opens: z.string().nullable(),
        closes: z.string().nullable(),
        closed: z.boolean(),
      }),
    ),
  }),
  links: z.object({
    googleBusinessProfile: z.url(),
    instagram: z.url(),
    whatsapp: z.url(),
  }),
  seo: z.object({
    defaultTitle: z.string().min(5),
    titleTemplate: z.string().min(5),
    defaultDescription: z.string().min(20),
    defaultOgImage: z.string(),
  }),
  analytics: z.object({
    provider: z.string(),
    measurementId: z.string(),
    events: z.array(z.string()),
  }),
  businessRules: z.object({
    pricesMayChange: z.boolean(),
    quoteRequiredForCustomDetails: z.boolean(),
    publishUnconfirmedPrices: z.boolean(),
  }),
});
