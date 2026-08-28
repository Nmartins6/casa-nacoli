import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";

interface SeedEntry {
  categoryId?: string;
  name: string;
  slug: string;
}

const products = JSON.parse(
  readFileSync(new URL("../../seed/products.json", import.meta.url), "utf8"),
) as SeedEntry[];
const categories = JSON.parse(
  readFileSync(new URL("../../seed/categories.json", import.meta.url), "utf8"),
) as SeedEntry[];

test("lista, pesquisa, filtra e limpa o catálogo", async ({ page }) => {
  await page.goto("/produtos");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Encontre o ponto de partida para o seu pedido.",
    }),
  ).toBeVisible();
  await expect(page.locator("[data-catalog-item]")).toHaveCount(
    products.length,
  );
  await expect(page.locator("[data-result-count]")).toHaveText(
    String(products.length),
  );

  const search = page.getByLabel("Buscar no catálogo");
  await search.fill("caneca mágica");
  await expect(page.locator("[data-result-count]")).toHaveText("1");
  await expect(page.locator("[data-catalog-item]:visible")).toHaveCount(1);
  expect(new URL(page.url()).searchParams.get("q")).toBe("caneca mágica");

  await search.fill("");
  await page.getByLabel("Brindes Corporativos", { exact: true }).check();
  const corporateGiftCount = products.filter(
    ({ categoryId }) => categoryId === "brindes-corporativos",
  ).length;
  await expect(page.locator("[data-result-count]")).toHaveText(
    String(corporateGiftCount),
  );
  await expect(page.locator("[data-catalog-item]:visible")).toHaveCount(
    corporateGiftCount,
  );
  await expect(page).toHaveURL(/categoria=brindes-corporativos/);

  await search.fill("produto inexistente");
  await expect(page.locator("[data-empty-state]")).toBeVisible();
  await page.getByRole("button", { name: "Ver todos os produtos" }).click();
  await expect(page.locator("[data-result-count]")).toHaveText(
    String(products.length),
  );
  await expect(search).toBeFocused();
});

test("todos os slugs de produto e categoria geram páginas válidas", async ({
  request,
}) => {
  for (const product of products) {
    const response = await request.get(`/produtos/${product.slug}`);
    expect(response.status(), product.slug).toBe(200);
    expect(await response.text(), product.slug).toContain(
      `<title>${product.name}`,
    );
  }

  for (const category of categories) {
    const response = await request.get(`/categorias/${category.slug}`);
    expect(response.status(), category.slug).toBe(200);
    expect(await response.text(), category.slug).toContain(
      `<title>${category.name} | Casa Nacoli</title>`,
    );
  }
});

test("categoria mantém hierarquia, produtos e acesso ao filtro", async ({
  page,
}) => {
  await page.goto("/categorias/grafica-e-impressoes");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Impressões Digitais",
  );
  await expect(page.locator(".category-products .product-card")).toHaveCount(
    products.filter(({ categoryId }) => categoryId === "grafica").length,
  );
  await expect(
    page.getByRole("navigation", { name: "Navegação estrutural" }),
  ).toContainText("InícioProdutosImpressões Digitais");
  await expect(
    page.getByRole("link", { name: "Buscar no catálogo" }),
  ).toHaveAttribute("href", "/produtos?categoria=grafica");

  const searchButton = page.getByRole("link", {
    name: "Buscar no catálogo",
  });
  const subcategories = page.locator(".subcategory-list");
  const [buttonBox, subcategoriesBox] = await Promise.all([
    searchButton.boundingBox(),
    subcategories.boundingBox(),
  ]);

  expect(buttonBox).not.toBeNull();
  expect(subcategoriesBox).not.toBeNull();
  if (!buttonBox || !subcategoriesBox) {
    throw new Error("Botão de busca ou lista de subcategorias não renderizado");
  }
  expect(subcategoriesBox.y).toBeGreaterThanOrEqual(
    buttonBox.y + buttonBox.height,
  );
});

test("galeria, variantes e dados estruturados refletem o produto", async ({
  page,
}) => {
  await page.goto("/produtos/canecas-personalizadas");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Caneca de cerâmica personalizada",
  );
  const mainImage = page.locator("[data-gallery-main]");
  const firstAlt = await mainImage.getAttribute("alt");
  await page.getByRole("button", { name: /Mostrar imagem 2 de/ }).click();
  await expect(mainImage).not.toHaveAttribute("alt", firstAlt ?? "");
  await expect(page.getByRole("row", { name: /Mágica/ })).toContainText(
    "R$ 55,00",
  );
  await expect(page.getByRole("row", { name: /Xícara/ })).toContainText(
    "Consultar",
  );

  const schemas = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents();
  const productSchema = schemas
    .map((value) => JSON.parse(value) as Record<string, unknown>)
    .find((value) => value["@type"] === "Product");
  expect(productSchema).toMatchObject({
    "@type": "Product",
    name: "Caneca de cerâmica personalizada",
    category: "Personalizados",
  });
  expect(productSchema).toHaveProperty("offers.@type", "AggregateOffer");
});

test("usa as galerias importadas e mantém placeholder somente sem foto confirmada", async ({
  page,
}) => {
  await page.goto("/produtos/caneca-polimero-personalizada");
  await expect(page.locator("[data-gallery-main]")).toBeVisible();
  await expect(page.locator("[data-gallery-thumbnail]")).toHaveCount(6);

  await page.goto("/produtos/placa-mdf-15x20");
  await expect(page.locator("[data-gallery-main]")).toBeVisible();
  await expect(page.locator("[data-gallery-thumbnail]")).toHaveCount(8);

  await page.goto("/produtos/plastificacao");
  await expect(
    page.getByAltText("Foto de Plastificação ainda não disponível"),
  ).toBeVisible();
  await expect(page.locator("[data-gallery-thumbnail]")).toHaveCount(0);
});

test("não publica preço pendente nem Offer estruturado", async ({ page }) => {
  await page.goto("/produtos/lixo-car-personalizado");

  await expect(page.locator("main")).toContainText("Consultar");
  await expect(page.locator("main")).not.toContainText("R$ 87,00");
  await expect(page.locator("main")).not.toContainText("R$ 95,00");
  const productSchema = await page
    .locator('script[type="application/ld+json"]')
    .evaluateAll((scripts) =>
      scripts
        .map((script) => JSON.parse(script.textContent ?? "{}"))
        .find((value) => value["@type"] === "Product"),
    );
  expect(productSchema).not.toHaveProperty("offers");
});

test("monta a conversa de WhatsApp com os detalhes informados", async ({
  page,
}) => {
  await page.goto("/produtos/camisetas-personalizadas");
  await page.getByLabel("Opção ou modelo").selectOption({
    label: "DTF frente e verso",
  });
  await page.getByLabel("Quantidade").fill("12");
  await page.getByLabel(/Detalhes/).fill("Camiseta preta com logo na frente");

  const popupPromise = page.waitForEvent("popup");
  const submitButton = page.getByRole("button", {
    name: "Abrir conversa com estes detalhes",
  });
  await expect(submitButton.locator("[data-whatsapp-icon]")).toBeVisible();
  await submitButton.click();
  const popup = await popupPromise;
  const url = new URL(popup.url());
  const message = url.searchParams.get("text") ?? "";

  expect(url.href).toMatch(/(?:wa\.me\/|phone=)5551999795488/);
  expect(message).toContain("Produto: Camisetas personalizadas.");
  expect(message).toContain("Modelo: DTF frente e verso.");
  expect(message).toContain("Quantidade: 12.");
  expect(message).toContain("Camiseta preta com logo na frente");
  await popup.close();
});

test("catálogo e páginas representativas não têm violações axe sérias", async ({
  page,
}) => {
  for (const path of [
    "/produtos",
    "/categorias/personalizados",
    "/produtos/canecas-personalizadas",
    "/produtos/placa-mdf-15x20",
  ]) {
    await page.goto(path);
    await expect(
      page.locator("[data-reveal].is-revealed").first(),
    ).toBeVisible();
    await page.evaluate(async () => {
      await Promise.all(
        document.getAnimations().map((animation) => animation.finished),
      );
    });
    const results = await new AxeBuilder({ page }).analyze();
    const relevantViolations = results.violations.filter(({ impact }) =>
      ["critical", "serious"].includes(impact ?? ""),
    );
    expect(relevantViolations, path).toEqual([]);
  }
});

test("rotas do catálogo não criam overflow horizontal", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "chromium");
  await page.setViewportSize({ width: 360, height: 800 });

  for (const path of [
    "/produtos",
    "/categorias/grafica-e-impressoes",
    "/produtos/canecas-personalizadas",
    "/produtos/caneca-polimero-personalizada",
  ]) {
    await page.goto(path);
    const sizes = await page.evaluate(() => {
      const viewport = window.innerWidth;
      const offenders = Array.from(document.querySelectorAll("*"))
        .map((element) => ({
          element: element.tagName.toLowerCase(),
          className: element.getAttribute("class") ?? "",
          href: element.getAttribute("href") ?? "",
          text: element.textContent?.trim().slice(0, 40) ?? "",
          left: element.getBoundingClientRect().left,
          right: element.getBoundingClientRect().right,
        }))
        .filter(({ left, right }) => left < -1 || right > viewport + 1)
        .slice(0, 8);

      return {
        viewport,
        document: document.documentElement.scrollWidth,
        offenders,
      };
    });
    expect(
      sizes.document,
      `${path}: ${JSON.stringify(sizes.offenders)}`,
    ).toBeLessThanOrEqual(sizes.viewport);
  }
});

test("redireciona as páginas removidas de DTF para impressões", async ({
  page,
}) => {
  for (const path of ["/produtos/dtf-em-rolo", "/produtos/dtf-por-arte"]) {
    await page.goto(path);
    await expect(page).toHaveURL(/\/categorias\/grafica-e-impressoes\/?$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Impressões Digitais",
    );
  }
});

test("menu mobile permite chegar ao catálogo a partir de um produto", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "mobile-chromium");
  await page.goto("/produtos/canecas-personalizadas");

  await page.locator('summary[aria-label="Abrir navegação"]').click();
  const navigation = page.getByRole("navigation", {
    name: "Navegação mobile",
  });
  await navigation.getByRole("link", { name: "Todos os produtos" }).click();
  await expect(page).toHaveURL(/\/produtos$/);
  await expect(page.getByLabel("Buscar no catálogo")).toBeVisible();
});
