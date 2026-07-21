export type ProductStatus = "draft" | "active" | "archived";

export type PricingKind =
  "fixed" | "starting_at" | "variants" | "tiered" | "quote" | "matrix_quote";

export interface Subcategory {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  subcategories: Subcategory[];
  sortOrder: number;
}

export interface ProductImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  objectPosition?: string;
}

export interface Price {
  kind: PricingKind;
  currency: "BRL";
  amount?: number | null;
  display: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  price?: number | null;
  quantity?: number;
  minQuantity?: number;
  maxQuantity?: number | null;
  requiresQuote?: boolean;
  [key: string]: unknown;
}

export interface VolumeDiscountRule {
  minQuantity: number;
  maxQuantity?: number | null;
  label: string;
  discountPercent?: number | null;
  requiresQuote?: boolean;
}

export interface Personalization {
  available: boolean;
  customerCanSendArtwork: boolean;
  designSupport: boolean;
  notes: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  categoryId: string;
  subcategoryId: string;
  status: ProductStatus;
  featured: boolean;
  sortOrder: number;
  summary: string;
  description: string;
  pricing: Price;
  variants: ProductVariant[];
  volumeDiscountRules: VolumeDiscountRule[];
  personalization: Personalization;
  keywords: string[];
  images: ProductImage[];
  imageFolder: string;
  placeholderImage: string;
  cta: {
    label: string;
    messageTemplate: string;
  };
  seo: {
    title: string;
    description: string;
  };
  notes: string[];
  needsPriceConfirmation: boolean;
}

export interface Review {
  id: string;
  stars: number;
  name: string;
  comment: string;
  source: string;
  verifiedCopy: boolean;
}

export interface BusinessHours {
  days: string[];
  label: string;
  opens: string | null;
  closes: string | null;
  closed: boolean;
}

export interface SiteConfig {
  brand: {
    name: string;
    tagline: string;
    domain: string;
    language: string;
    locale: string;
  };
  contact: {
    whatsappNumber: string;
    whatsappDisplay: string;
    instagram: string;
    email: string;
    city: string;
    state: string;
    address: string;
    businessHours: BusinessHours[];
  };
  links: {
    googleBusinessProfile: string;
    instagram: string;
    whatsapp: string;
  };
  seo: {
    defaultTitle: string;
    titleTemplate: string;
    defaultDescription: string;
    defaultOgImage: string;
  };
  analytics: {
    provider: "none" | string;
    measurementId: string;
    events: string[];
  };
  businessRules: {
    pricesMayChange: boolean;
    quoteRequiredForCustomDetails: boolean;
    publishUnconfirmedPrices: boolean;
  };
}
