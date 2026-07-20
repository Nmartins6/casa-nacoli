import type { ImageMetadata } from "astro";
import type { Product } from "../types/domain";

const productAssets = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/products/**/*.{avif,gif,jpeg,jpg,png,webp}",
  { eager: true },
);

export interface ResolvedProductImage {
  src: ImageMetadata;
  alt: string;
}

export function getProductImages(product: Product): ResolvedProductImage[] {
  return Object.entries(productAssets)
    .filter(([path]) => path.includes(`/products/${product.slug}/`))
    .sort(([pathA], [pathB]) => pathA.localeCompare(pathB, "pt-BR"))
    .map(([, module], index) => ({
      src: module.default,
      alt: `${product.name}: exemplo ${index + 1} produzido pela Casa Nacoli`,
    }));
}

export function hasProductImage(product: Product): boolean {
  return getProductImages(product).length > 0;
}
