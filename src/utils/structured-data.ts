import type { Category, Product } from "../types/domain";

export type StructuredData = Record<string, unknown>;

interface BreadcrumbEntry {
  name: string;
  path: string;
}

interface ProductStructuredDataOptions {
  product: Product;
  category: Category;
  domain: string;
  imageUrls?: string[];
  publishUnconfirmedPrices: boolean;
}

function absoluteUrl(domain: string, path: string): string {
  return new URL(path, `${domain}/`).href;
}

export function buildBreadcrumbStructuredData(
  entries: BreadcrumbEntry[],
  domain: string,
): StructuredData {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: entries.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: absoluteUrl(domain, entry.path),
    })),
  };
}

function buildConfirmedOffer(
  product: Product,
  domain: string,
  publishUnconfirmedPrices: boolean,
): StructuredData | undefined {
  if (product.needsPriceConfirmation && !publishUnconfirmedPrices) {
    return undefined;
  }

  const variantPrices = product.variants
    .map((variant) => variant.price)
    .filter((price): price is number => typeof price === "number");
  const prices =
    variantPrices.length > 0
      ? variantPrices
      : typeof product.pricing.amount === "number"
        ? [product.pricing.amount]
        : [];

  if (prices.length === 0) return undefined;

  const common = {
    priceCurrency: product.pricing.currency,
    url: absoluteUrl(domain, `/produtos/${product.slug}`),
  };

  if (prices.length > 1) {
    return {
      "@type": "AggregateOffer",
      ...common,
      lowPrice: Math.min(...prices),
      highPrice: Math.max(...prices),
      offerCount: prices.length,
    };
  }

  return {
    "@type": "Offer",
    ...common,
    price: prices[0],
  };
}

export function buildProductStructuredData({
  product,
  category,
  domain,
  imageUrls = [],
  publishUnconfirmedPrices,
}: ProductStructuredDataOptions): StructuredData {
  const offer = buildConfirmedOffer(product, domain, publishUnconfirmedPrices);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.seo.description,
    url: absoluteUrl(domain, `/produtos/${product.slug}`),
    category: category.name,
    ...(imageUrls.length > 0 ? { image: imageUrls } : {}),
    ...(offer ? { offers: offer } : {}),
  };
}
