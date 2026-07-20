import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) =>
  JSON.parse(fs.readFileSync(path.join(root, "seed", file), "utf8"));

const categories = read("categories.json");
const products = read("products.json");
const reviews = read("reviews.json");

const categoryIds = new Set(categories.map((category) => category.id));
const subcategoryIds = new Set(
  categories.flatMap((category) =>
    category.subcategories.map((subcategory) => subcategory.id),
  ),
);

const errors = [];
const productIds = new Set();
const slugs = new Set();

for (const product of products) {
  if (productIds.has(product.id)) errors.push(`ID duplicado: ${product.id}`);
  if (slugs.has(product.slug)) errors.push(`Slug duplicado: ${product.slug}`);
  productIds.add(product.id);
  slugs.add(product.slug);

  if (!categoryIds.has(product.categoryId)) {
    errors.push(`Categoria inexistente em ${product.id}: ${product.categoryId}`);
  }
  if (!subcategoryIds.has(product.subcategoryId)) {
    errors.push(
      `Subcategoria inexistente em ${product.id}: ${product.subcategoryId}`,
    );
  }
  if (!product.pricing?.kind) errors.push(`Preço ausente em ${product.id}`);
  if (!product.cta?.messageTemplate) errors.push(`CTA ausente em ${product.id}`);
}

for (const review of reviews) {
  if (review.stars < 1 || review.stars > 5) {
    errors.push(`Avaliação inválida: ${review.id}`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(
  `Seed válido: ${categories.length} categorias, ${products.length} produtos e ${reviews.length} avaliações.`,
);
