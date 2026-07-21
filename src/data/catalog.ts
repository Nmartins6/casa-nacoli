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

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function getProductBySlug(slug: string): Product | undefined {
  return activeProducts.find((product) => product.slug === slug);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return activeProducts.filter((product) => product.categoryId === categoryId);
}

export function getSubcategoryName(product: Product): string | undefined {
  return getCategory(product.categoryId)?.subcategories.find(
    (subcategory) => subcategory.id === product.subcategoryId,
  )?.name;
}

export function normalizeSearchTerm(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function getProductSearchText(product: Product): string {
  const category = getCategory(product.categoryId);
  const subcategory = getSubcategoryName(product);

  return normalizeSearchTerm(
    [
      product.name,
      product.summary,
      product.description,
      category?.name,
      subcategory,
      ...product.keywords,
      ...product.variants.map((variant) => variant.name),
    ]
      .filter(Boolean)
      .join(" "),
  );
}

export function filterProducts(
  catalogProducts: Product[],
  options: { query?: string; categoryId?: string } = {},
): Product[] {
  const query = normalizeSearchTerm(options.query ?? "");

  return catalogProducts.filter((product) => {
    const matchesCategory =
      !options.categoryId || product.categoryId === options.categoryId;
    const matchesQuery =
      !query || getProductSearchText(product).includes(query);

    return matchesCategory && matchesQuery;
  });
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  return activeProducts
    .filter(
      (candidate) =>
        candidate.id !== product.id &&
        candidate.categoryId === product.categoryId,
    )
    .sort((a, b) => {
      const aSameSubcategory =
        a.subcategoryId === product.subcategoryId ? 0 : 1;
      const bSameSubcategory =
        b.subcategoryId === product.subcategoryId ? 0 : 1;
      return aSameSubcategory - bSameSubcategory || a.sortOrder - b.sortOrder;
    })
    .slice(0, limit);
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

export function getLowestPublicPrice(product: Product): number | undefined {
  if (
    product.needsPriceConfirmation &&
    !siteConfig.businessRules.publishUnconfirmedPrices
  ) {
    return undefined;
  }

  if (product.pricing.amount !== undefined && product.pricing.amount !== null) {
    return product.pricing.amount;
  }

  const variantPrices = product.variants
    .map((variant) => variant.price)
    .filter((price): price is number => typeof price === "number");

  return variantPrices.length > 0 ? Math.min(...variantPrices) : undefined;
}
