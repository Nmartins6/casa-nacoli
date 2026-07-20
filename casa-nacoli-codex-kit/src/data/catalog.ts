import categoriesJson from "../../seed/categories.json";
import productsJson from "../../seed/products.json";
import reviewsJson from "../../seed/reviews.json";
import siteConfigJson from "../../seed/site-config.json";
import type { Category, Product, Review, SiteConfig } from "../types/domain";
import {
  categorySchema,
  productSchema,
  reviewSchema,
  siteConfigSchema,
} from "./schemas";

export const categories = categorySchema
  .array()
  .parse(categoriesJson) as Category[];
export const products = productSchema.array().parse(productsJson) as Product[];
export const reviews = reviewSchema.array().parse(reviewsJson) as Review[];
export const siteConfig = siteConfigSchema.parse(siteConfigJson) as SiteConfig;

export function validateCatalogReferences(
  catalogCategories: Category[],
  catalogProducts: Product[],
): string[] {
  const errors: string[] = [];
  const categoryIds = new Set(catalogCategories.map(({ id }) => id));
  const subcategoriesByCategory = new Map(
    catalogCategories.map((category) => [
      category.id,
      new Set(category.subcategories.map(({ id }) => id)),
    ]),
  );
  const productIds = new Set<string>();
  const productSlugs = new Set<string>();

  for (const product of catalogProducts) {
    if (productIds.has(product.id)) errors.push(`ID duplicado: ${product.id}`);
    if (productSlugs.has(product.slug))
      errors.push(`Slug duplicado: ${product.slug}`);

    productIds.add(product.id);
    productSlugs.add(product.slug);

    if (!categoryIds.has(product.categoryId)) {
      errors.push(`Categoria inválida em ${product.id}: ${product.categoryId}`);
    } else if (
      !subcategoriesByCategory
        .get(product.categoryId)
        ?.has(product.subcategoryId)
    ) {
      errors.push(
        `Subcategoria inválida em ${product.id}: ${product.subcategoryId}`,
      );
    }

    if (
      product.pricing.kind === "quote" &&
      product.pricing.amount !== undefined &&
      product.pricing.amount !== null
    ) {
      errors.push(`Produto sob orçamento com valor: ${product.id}`);
    }
  }

  return errors;
}

const referenceErrors = validateCatalogReferences(categories, products);

if (referenceErrors.length > 0) {
  throw new Error(`Catálogo inválido:\n${referenceErrors.join("\n")}`);
}

export const activeProducts = products
  .filter(({ status }) => status === "active")
  .sort((a, b) => a.sortOrder - b.sortOrder);

export const featuredProducts = activeProducts.filter(
  ({ featured }) => featured,
);

export function getCategory(categoryId: string): Category | undefined {
  return categories.find(({ id }) => id === categoryId);
}

export function getPublicPrice(product: Product): string {
  if (
    product.needsPriceConfirmation &&
    !siteConfig.businessRules.publishUnconfirmedPrices
  ) {
    return "Consultar";
  }

  return product.pricing.display;
}
