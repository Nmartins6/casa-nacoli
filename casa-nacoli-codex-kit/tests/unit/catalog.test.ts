import { describe, expect, it } from "vitest";
import {
  categories,
  featuredProducts,
  getPublicPrice,
  products,
  reviews,
  validateCatalogReferences,
} from "../../src/data/catalog";

describe("catálogo", () => {
  it("carrega e relaciona todo o seed sem erros", () => {
    expect(categories).toHaveLength(4);
    expect(products).toHaveLength(27);
    expect(reviews).toHaveLength(29);
    expect(validateCatalogReferences(categories, products)).toEqual([]);
  });

  it("mantém os destaques orientados pelos dados", () => {
    expect(featuredProducts.map(({ slug }) => slug)).toEqual([
      "canecas-personalizadas",
      "camisetas-personalizadas",
      "cartoes-de-visita",
    ]);
  });

  it("não publica preço pendente de confirmação", () => {
    const pendingProduct = products.find(
      ({ slug }) => slug === "lixo-car-personalizado",
    );

    expect(pendingProduct).toBeDefined();
    expect(getPublicPrice(pendingProduct!)).toBe("Consultar");
  });
});
