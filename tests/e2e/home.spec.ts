import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("apresenta o conteúdo essencial e links válidos", async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });

  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Sua ideia feita com carinho!",
    }),
  ).toBeVisible();
  await expect(page.locator("#categorias article")).toHaveCount(4);
  await expect(page.locator("#destaques article")).toHaveCount(4);
  await expect(page.locator("#avaliacoes figure")).toHaveCount(3);

  const whatsappLinks = page.locator('a[href^="https://wa.me/"]');
  const whatsappLinkCount = await whatsappLinks.count();
  expect(whatsappLinkCount).toBeGreaterThan(0);
  expect(await whatsappLinks.locator("[data-whatsapp-icon]").count()).toBe(
    whatsappLinkCount,
  );
  await expect(whatsappLinks.first()).toHaveAttribute(
    "href",
    /wa\.me\/5551999795488\?text=/,
  );
  expect(consoleErrors).toEqual([]);
});

test("menu mobile funciona por teclado", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile-chromium");
  await page.goto("/");

  const menuButton = page.locator('summary[aria-label="Abrir navegação"]');
  await menuButton.focus();
  await page.keyboard.press("Enter");

  const mobileNavigation = page.getByRole("navigation", {
    name: "Navegação mobile",
  });
  await expect(mobileNavigation).toBeVisible();

  await mobileNavigation.getByRole("link", { name: "Como pedir" }).click();
  await expect(page.locator("#como-pedir")).toBeInViewport();
  await expect(mobileNavigation).toBeHidden();
});

test("FAQ indica visualmente os estados fechado e aberto", async ({ page }) => {
  await page.goto("/");

  const questions = page.locator(".faq-list details");
  await expect(questions).toHaveCount(5);
  await expect(questions.locator("summary")).toHaveText([
    "Posso escolher a arte?",
    "Quanto tempo leva para produzir?",
    "Posso montar uma cesta personalizada?",
    "Vocês entregam ou é retirada?",
    "Posso pedir pelo WhatsApp?",
  ]);

  const question = questions.first();
  const summary = question.locator("summary");
  const indicator = () =>
    summary.evaluate((element) =>
      getComputedStyle(element, "::after").content.replace(/["']/g, ""),
    );

  expect(await indicator()).toBe("+");
  await summary.focus();
  await page.keyboard.press("Enter");

  await expect(question).toHaveAttribute("open", "");
  expect(await indicator()).toBe("−");
});

test("não cria overflow horizontal nos viewports-alvo", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "chromium");
  const viewports = [
    { width: 360, height: 800 },
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
    { width: 1024, height: 900 },
    { width: 1440, height: 1000 },
  ];

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    const sizes = await page.evaluate(() => ({
      viewport: window.innerWidth,
      document: document.documentElement.scrollWidth,
    }));
    expect(sizes.document, `${viewport.width}px`).toBeLessThanOrEqual(
      sizes.viewport,
    );
  }
});

test("não apresenta violações axe críticas ou sérias", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("[data-reveal].is-revealed").first()).toBeVisible();
  await page.evaluate(async () => {
    await Promise.all(
      document.getAnimations().map((animation) => animation.finished),
    );
  });
  const results = await new AxeBuilder({ page }).analyze();
  const relevantViolations = results.violations.filter(({ impact }) =>
    ["critical", "serious"].includes(impact ?? ""),
  );

  expect(relevantViolations).toEqual([]);
});
