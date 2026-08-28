import type { ImageMetadata } from "astro";
import type { Product } from "../types/domain";

const productAssets = import.meta.glob<{ default: ImageMetadata }>(
  [
    "../assets/products/**/*.{avif,gif,jpeg,jpg,png,webp}",
    "!../assets/products/**/*nao adcionar ainda*/**/*",
  ],
  { eager: true },
);

export interface ResolvedProductImage {
  src: ImageMetadata;
  alt: string;
}

function getProductAssetDirectory(product: Product): string {
  const productRoot = "src/assets/products/";

  if (!product.imageFolder.startsWith(productRoot)) {
    return product.slug;
  }

  return product.imageFolder.slice(productRoot.length).replaceAll("\\", "/");
}

export function getProductImages(product: Product): ResolvedProductImage[] {
  const assetDirectory = getProductAssetDirectory(product);

  return Object.entries(productAssets)
    .filter(([path]) => path.includes(`/products/${assetDirectory}/`))
    .sort(([pathA], [pathB]) => pathA.localeCompare(pathB, "pt-BR"))
    .map(([, module], index) => ({
      src: module.default,
      alt:
        index === 0
          ? `Foto principal de ${product.name}`
          : `${product.name}: exemplo ${index} produzido pela Casa Nacoli`,
    }));
}

export function hasProductImage(product: Product): boolean {
  return getProductImages(product).length > 0;
}
