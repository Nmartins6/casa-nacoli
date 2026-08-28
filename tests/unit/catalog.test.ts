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
import {
  buildBreadcrumbStructuredData,
  buildProductStructuredData,
} from "../../src/utils/structured-data";

describe("catálogo", () => {
  it("carrega e relaciona todo o seed sem erros", () => {
    expect(categories).toHaveLength(4);
    expect(products).toHaveLength(26);
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
    expect(getProductsByCategory("grafica")).toHaveLength(8);
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

  it("agrupa os modelos solicitados e remove os produtos DTF avulsos", () => {
    const ceramicMug = getProductBySlug("canecas-personalizadas");
    const polymerMug = getProductBySlug("caneca-polimero-personalizada");
    const mdfPlaque = getProductBySlug("placa-mdf-15x20");
    const mdfKeyring = getProductBySlug("chaveiro-mdf-5cm");

    expect(ceramicMug?.variants.map(({ id }) => id)).toEqual([
      "branca",
      "preta",
      "magica",
      "alca-coracao",
      "colorida",
      "xicara",
    ]);
    expect(polymerMug?.pricing.amount).toBe(25);
    expect(mdfPlaque?.variants.map(({ id }) => id)).toEqual([
      "15x20-com-suporte",
      "20x30-com-suporte",
    ]);
    expect(mdfKeyring?.variants.map(({ id }) => id)).toEqual([
      "frente",
      "frente-verso",
    ]);
    expect(getProductBySlug("dtf-em-rolo")).toBeUndefined();
    expect(getProductBySlug("dtf-por-arte")).toBeUndefined();
  });

  it("retorna estado vazio para uma busca sem correspondência", () => {
    expect(filterProducts(products, { query: "produto inexistente" })).toEqual(
      [],
    );
  });

  it("gera dados estruturados somente com preços confirmados", () => {
    const category = categories.find(({ id }) => id === "personalizados")!;
    const pricedProduct = products.find(
      ({ slug }) => slug === "canecas-personalizadas",
    )!;
    const pendingProduct = products.find(
      ({ slug }) => slug === "lixo-car-personalizado",
    )!;

    const pricedData = buildProductStructuredData({
      product: pricedProduct,
      category,
      domain: "https://www.casanacoli.com.br",
      publishUnconfirmedPrices: false,
    });
    const pendingData = buildProductStructuredData({
      product: pendingProduct,
      category: categories.find(({ id }) => id === "brindes-corporativos")!,
      domain: "https://www.casanacoli.com.br",
      publishUnconfirmedPrices: false,
    });

    expect(pricedData.offers).toMatchObject({
      "@type": "AggregateOffer",
      lowPrice: 39.9,
      highPrice: 59.9,
      offerCount: 5,
    });
    expect(pendingData).not.toHaveProperty("offers");
  });

  it("gera breadcrumbs absolutos na ordem da interface", () => {
    const data = buildBreadcrumbStructuredData(
      [
        { name: "Início", path: "/" },
        { name: "Produtos", path: "/produtos" },
      ],
      "https://www.casanacoli.com.br",
    );

    expect(data.itemListElement).toEqual([
      {
        "@type": "ListItem",
        position: 1,
        name: "Início",
        item: "https://www.casanacoli.com.br/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Produtos",
        item: "https://www.casanacoli.com.br/produtos",
      },
    ]);
  });
});
