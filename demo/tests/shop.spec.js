const { test, expect } = require("@playwright/test");
const baseUrl = process.env.BASE_URL || "http://127.0.0.1:4173";

async function resetDemo(page, path = "/") {
  await page.goto(`${baseUrl}${path}`);
  await page.evaluate(() => localStorage.clear());
  await page.reload();
}

test("kupac može filtrirati, dodati proizvod i završiti demo checkout", async ({ page }) => {
  const errors = [];
  page.on("console", message => {
    if (message.type() === "error") errors.push(message.text());
  });
  await resetDemo(page);
  await expect(page.locator(".product-card")).toHaveCount(8);
  await page.locator("#category-filter").selectOption("Flower box");
  await expect(page.locator(".product-card")).toHaveCount(3);
  await page.locator(".product-card:not(.unavailable) [data-add]").first().click();
  await expect(page.locator("#cart-drawer")).toHaveClass(/open/);
  await expect(page.locator("#cart-count")).toHaveText("1");
  await page.locator("#open-checkout").click();
  await page.locator('[name="name"]').fill("Demo kupac");
  await page.locator('[name="phone"]').fill("091 000 0000");
  await page.locator('[name="address"]').fill("Demo adresa 1");
  await page.locator('[name="date"]').fill("2026-10-01");
  await page.locator("#checkout-form button[type=submit]").click();
  await expect(page.locator("#order-success")).toBeVisible();
  expect(errors).toEqual([]);
});

test("admin može dodati, urediti, sakriti i obrisati proizvod", async ({ page }) => {
  await resetDemo(page, "/admin.html");
  await expect(page.locator(".admin-product")).toHaveCount(8);
  await page.locator("#add-product").click();
  await page.locator('[name="name"]').fill("Demo orhideja");
  await page.locator('[name="description"]').fill("Ogledni proizvod dodan kroz demo admin.");
  await page.locator('[name="price"]').fill("33");
  await page.locator("#product-form button[type=submit]").click();
  await expect(page.locator(".admin-product")).toHaveCount(9);
  let demoRow = page.locator(".admin-product").filter({ hasText: "Demo orhideja" });
  await demoRow.getByRole("button", { name: "Uredi" }).click();
  await page.locator('[name="price"]').fill("36");
  await page.locator("#product-form button[type=submit]").click();
  demoRow = page.locator(".admin-product").filter({ hasText: "Demo orhideja" });
  await expect(demoRow).toContainText("36,00");
  await demoRow.locator('[data-toggle]').uncheck();
  await expect(demoRow).toContainText("Skriveno");
  await page.goto(`${baseUrl}/`);
  await expect(page.locator(".product-card")).toHaveCount(9);
  const shopCard = page.locator(".product-card").filter({ hasText: "Demo orhideja" });
  await expect(shopCard).toHaveClass(/unavailable/);
  await page.goto(`${baseUrl}/admin.html`);
  demoRow = page.locator(".admin-product").filter({ hasText: "Demo orhideja" });
  page.once("dialog", dialog => dialog.accept());
  await demoRow.getByRole("button", { name: "Obriši" }).click();
  await expect(page.locator(".admin-product")).toHaveCount(8);
});

test("mobilni prikaz nema horizontalni overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${baseUrl}/`);
  await expect(page.locator(".product-card")).toHaveCount(8);
  const widths = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    page: document.documentElement.scrollWidth
  }));
  expect(widths.page).toBeLessThanOrEqual(widths.viewport);
  await page.locator(".product-card [data-add]").first().click();
  await expect(page.locator("#cart-drawer")).toHaveClass(/open/);
});

test("mobilni admin ostaje upotrebljiv", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await resetDemo(page, "/admin.html");
  await expect(page.locator(".admin-product")).toHaveCount(8);
  const widths = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    page: document.documentElement.scrollWidth
  }));
  expect(widths.page).toBeLessThanOrEqual(widths.viewport);
  await page.locator("#add-product").click();
  await expect(page.locator("#editor-dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#editor-dialog")).not.toBeVisible();
});
