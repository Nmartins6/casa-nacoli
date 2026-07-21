import { describe, expect, it } from "vitest";
import {
  categories,
  filterProducts,
  featuredProducts,
  getCategoryBySlug,
  getLowestPublicPrice,
  getProductBySlug,
  getProductsByCategory,
  getPublicPrice,
  getRelatedProducts,
  normalizeSearchTerm,
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
    expect(getLowestPublicPrice(pendingProduct!)).toBeUndefined();
  });

  it("localiza categorias, produtos e relacionados pelos dados", () => {
    const category = getCategoryBySlug("grafica-e-impressoes");
    const product = getProductBySlug("cartoes-de-visita");

    expect(category?.id).toBe("grafica");
    expect(product?.categoryId).toBe("grafica");
    expect(getProductsByCategory("grafica")).toHaveLength(10);
    expect(getRelatedProducts(product!, 3)).toHaveLength(3);
  });

  it("normaliza acentos, pontuação e caixa na busca", () => {
    expect(normalizeSearchTerm("  CARTÕES & Etiquetas! ")).toBe(
      "cartoes etiquetas",
    );
  });

  it("busca em nome, categoria, palavras-chave e variantes", () => {
    expect(filterProducts(products, { query: "caneca magica" })).toHaveLength(
      1,
    );
    expect(
      filterProducts(products, { query: "uniforme" }).map(({ slug }) => slug),
    ).toContain("camisetas-personalizadas");
    expect(
      filterProducts(products, { query: "A6 rígido" }).map(({ slug }) => slug),
    ).toEqual(["plastificacao"]);
    expect(
      filterProducts(products, { categoryId: "brindes-corporativos" }),
    ).toHaveLength(2);
  });

  it("retorna estado vazio para uma busca sem correspondência", () => {
    expect(filterProducts(products, { query: "produto inexistente" })).toEqual(
      [],
    );
  });
});
