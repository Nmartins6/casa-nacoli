import { expect, test, type Page } from "@playwright/test";

const getCardByName = (page: Page, name: string) =>
  page.locator("[data-product-card]").filter({
    has: page.getByRole("heading", { level: 3, name }),
  });

test("card reúne conteúdo, link principal e foco percebido", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "chromium");
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto("/produtos");

  const card = getCardByName(page, "Caneca de cerâmica personalizada");
  const imageLink = card.getByRole("link", {
    name: "Ver Caneca de cerâmica personalizada",
  });
  const titleLink = card.getByRole("link", {
    name: "Caneca de cerâmica personalizada",
    exact: true,
  });

  await expect(card).toBeVisible();
  await expect(imageLink).toHaveAttribute(
    "href",
    "/produtos/canecas-personalizadas",
  );
  await expect(titleLink).toHaveAttribute(
    "href",
    "/produtos/canecas-personalizadas",
  );
  await expect(card.locator(".product-summary")).toBeVisible();
  await expect(card.locator(".price-value")).toHaveText("A partir de R$ 39,90");
  await expect(
    card.getByRole("link", { name: /Ver detalhes de/ }),
  ).toBeVisible();

  const bounds = await card.evaluate((element) => {
    const cardRect = element.getBoundingClientRect();
    const imageRect = element
      .querySelector(".product-image")
      ?.getBoundingClientRect();
    const contentRect = element
      .querySelector(".product-content")
      ?.getBoundingClientRect();
    return { cardRect, imageRect, contentRect };
  });
  expect(bounds.imageRect?.left).toBeGreaterThanOrEqual(bounds.cardRect.left);
  expect(bounds.imageRect?.right).toBeLessThanOrEqual(bounds.cardRect.right);
  expect(bounds.contentRect?.left).toBeGreaterThanOrEqual(bounds.cardRect.left);
  expect(bounds.contentRect?.right).toBeLessThanOrEqual(bounds.cardRect.right);

  await expect(
    page.locator("a a, a button, button a, button button"),
  ).toHaveCount(0);

  const beforeFocus = await card.evaluate(
    (element) => getComputedStyle(element).borderColor,
  );
  await titleLink.focus();
  await expect(titleLink).toBeFocused();
  const focusState = await card.evaluate((element) => ({
    borderColor: getComputedStyle(element).borderColor,
    boxShadow: getComputedStyle(element).boxShadow,
  }));
  const linkOutline = await titleLink.evaluate((element) => ({
    style: getComputedStyle(element).outlineStyle,
    width: getComputedStyle(element).outlineWidth,
  }));

  expect(focusState.borderColor).not.toBe(beforeFocus);
  expect(focusState.boxShadow).not.toBe("none");
  expect(linkOutline.style).not.toBe("none");
  expect(Number.parseFloat(linkOutline.width)).toBeGreaterThan(0);
});

test("cards preservam preço, orçamento e placeholder do catálogo", async ({
  page,
}) => {
  await page.goto("/produtos");

  await expect(
    getCardByName(page, "Caneca de cerâmica personalizada"),
  ).toContainText("A partir de R$ 39,90");
  await expect(getCardByName(page, "Moletons personalizados")).toContainText(
    "Consultar",
  );
  await expect(
    getCardByName(page, "Plastificação").getByAltText(
      "Foto do produto ainda não disponível",
    ),
  ).toBeVisible();
});

test("entrada acontece ao rolar sem erro nem deslocamento de layout", async ({
  page,
}) => {
  const consoleErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  await page.addInitScript(() => {
    Object.defineProperty(window, "__casaNacoliCls", {
      configurable: true,
      value: 0,
      writable: true,
    });
    new PerformanceObserver((list) => {
      const shift = list
        .getEntries()
        .filter(
          (entry) =>
            !(entry as PerformanceEntry & { hadRecentInput?: boolean })
              .hadRecentInput,
        )
        .reduce((total, entry) => total + (entry as LayoutShift).value, 0);
      (window as typeof window & { __casaNacoliCls: number }).__casaNacoliCls +=
        shift;
    }).observe({ type: "layout-shift", buffered: true });
  });
  await page.goto("/");

  const review = page.locator("#avaliacoes [data-reveal]").first();
  await expect(review).not.toBeInViewport();
  await review.scrollIntoViewIfNeeded();
  await expect
    .poll(() => review.evaluate((element) => element.getAnimations().length))
    .toBeGreaterThan(0);
  await review.evaluate(async (element) => {
    await Promise.all(
      element.getAnimations().map((animation) => animation.finished),
    );
  });

  const finalState = await review.evaluate((element) => ({
    opacity: getComputedStyle(element).opacity,
    translate: getComputedStyle(element).translate,
  }));
  const cls = await page.evaluate(
    () =>
      (window as typeof window & { __casaNacoliCls: number }).__casaNacoliCls,
  );

  expect(finalState.opacity).toBe("1");
  expect(["none", "0px"]).toContain(finalState.translate);
  expect(cls).toBeLessThanOrEqual(0.01);
  expect(consoleErrors).toEqual([]);
});

test("movimento reduzido mantém conteúdo visível e sem zoom", async ({
  page,
}) => {
  test.skip(test.info().project.name !== "chromium");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const hero = page.locator(".hero-copy");
  const card = page.locator("[data-product-card]").first();
  await card.scrollIntoViewIfNeeded();

  for (const element of [hero, card]) {
    await expect(element).toBeVisible();
    const state = await element.evaluate((node) => ({
      animation: getComputedStyle(node).animationName,
      opacity: getComputedStyle(node).opacity,
      translate: getComputedStyle(node).translate,
    }));
    expect(state.animation).toBe("none");
    expect(state.opacity).toBe("1");
    expect(state.translate).toBe("none");
  }

  await card.hover();
  await expect(card.locator(".product-image img")).toHaveCSS(
    "transform",
    "none",
  );
});

test("conteúdo essencial permanece acessível sem JavaScript", async ({
  browser,
}, testInfo) => {
  test.skip(testInfo.project.name !== "chromium");
  const context = await browser.newContext({
    baseURL: "http://127.0.0.1:4322",
    javaScriptEnabled: false,
  });
  const page = await context.newPage();
  await page.goto("/produtos");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Encontre o ponto de partida para o seu pedido.",
    }),
  ).toBeVisible();
  await expect(page.locator("[data-product-card]")).toHaveCount(46);
  await expect(page.locator("[data-product-card]").last()).toBeVisible();
  await expect(
    page.getByRole("link", {
      name: "Caneca de cerâmica personalizada",
      exact: true,
    }),
  ).toHaveAttribute("href", "/produtos/canecas-personalizadas");

  await context.close();
});

test("páginas representativas não têm overflow nos viewports de revisão", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "chromium");
  const viewports = [
    { width: 375, height: 812 },
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
    { width: 1366, height: 768 },
    { width: 1440, height: 900 },
  ];
  const paths = [
    "/",
    "/produtos",
    "/categorias/personalizados",
    "/produtos/canecas-personalizadas",
  ];

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    for (const path of paths) {
      await page.goto(path);
      const layout = await page.evaluate(() => {
        const viewportWidth = window.innerWidth;
        const offenders = Array.from(document.querySelectorAll("*"))
          .map((element) => ({
            element: element.tagName.toLowerCase(),
            className: element.getAttribute("class") ?? "",
            left: element.getBoundingClientRect().left,
            right: element.getBoundingClientRect().right,
            text: element.textContent?.trim().slice(0, 50) ?? "",
          }))
          .filter(({ left, right }) => left < -1 || right > viewportWidth + 1)
          .slice(0, 8);
        const clipped = Array.from(document.querySelectorAll<HTMLElement>("*"))
          .filter((element) => element.scrollWidth > element.clientWidth + 1)
          .map((element) => ({
            className: element.getAttribute("class") ?? "",
            clientWidth: element.clientWidth,
            element: element.tagName.toLowerCase(),
            scrollWidth: element.scrollWidth,
          }))
          .slice(0, 8);
        return {
          clipped,
          documentWidth: document.documentElement.scrollWidth,
          offenders,
          viewportWidth,
        };
      });
      expect(
        layout.documentWidth,
        `${path} em ${viewport.width} × ${viewport.height}: ${JSON.stringify({ clipped: layout.clipped, offenders: layout.offenders })}`,
      ).toBeLessThanOrEqual(layout.viewportWidth);
    }
  }
});

interface LayoutShift extends PerformanceEntry {
  value: number;
}
