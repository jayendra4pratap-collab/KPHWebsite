import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("theme toggle sits above profile, persists, and works in collapsed and mobile navigation", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/dashboard");
  const sidebar = page.locator(".desktop-sidebar");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  const lightButton = sidebar.getByRole("button", {
    name: "Switch to light theme",
  });
  const toggleBounds = await lightButton.boundingBox();
  const profileBounds = await sidebar.locator(".sidebar-profile").boundingBox();
  expect(toggleBounds!.y + toggleBounds!.height).toBeLessThanOrEqual(
    profileBounds!.y,
  );
  await lightButton.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(page.locator("body")).toHaveCSS(
    "background-color",
    "rgb(248, 250, 251)",
  );
  await expect(sidebar).toHaveCSS("background-color", "rgb(255, 255, 255)");
  await page.screenshot({
    path: "test-results/dashboard-light.png",
    fullPage: true,
  });

  await sidebar.getByRole("link", { name: /View .* profile/ }).click();
  await expect(page.getByLabel("Your name", { exact: true })).toHaveCSS(
    "background-color",
    "rgb(255, 255, 255)",
  );
  await page.reload();
  await expect(
    sidebar.getByRole("button", { name: "Switch to dark theme" }),
  ).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await sidebar.getByRole("button", { name: "Collapse sidebar" }).click();
  await sidebar.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(page.locator("body")).toHaveCSS(
    "background-color",
    "rgb(16, 24, 21)",
  );
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

  await page.setViewportSize({ width: 375, height: 812 });
  await page.getByRole("button", { name: "Open navigation" }).click();
  const drawer = page.getByRole("dialog", { name: "Navigation", exact: true });
  await drawer.getByRole("button", { name: "Switch to light theme" }).click();
  await expect(drawer).toHaveCSS("background-color", "rgb(255, 255, 255)");
  await expect(
    drawer.getByRole("button", { name: "Switch to dark theme" }),
  ).toBeVisible();
  await page.screenshot({ path: "test-results/mobile-navigation-light.png" });
  await drawer.getByRole("link", { name: "Practice Resources" }).click();
  await expect(page).toHaveURL(/\/dashboard\/resources/);
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  expect(errors).toEqual([]);
});

test("dark routes and portals pass accessibility checks", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("kph-theme", "dark"));
  async function checkAccessibility(selector?: string) {
    const builder = new AxeBuilder({ page }).withTags([
      "wcag2a",
      "wcag2aa",
      "wcag21aa",
    ]);
    if (selector) builder.include(selector);
    const results = await builder.analyze();
    expect(
      results.violations.map(({ id, nodes }) => ({
        id,
        elements: nodes.map(({ target, failureSummary }) => ({
          target,
          failureSummary,
        })),
      })),
    ).toEqual([]);
  }
  for (const route of [
    "/dashboard",
    "/dashboard/profile",
    "/dashboard/resources",
    "/dashboard/leaderboard",
    "/missing-page",
  ]) {
    await page.goto(route);
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await checkAccessibility();
  }
  await page.goto("/dashboard");
  await page.getByRole("button", { name: /Weekly coding contest/ }).click();
  await expect(page.getByRole("dialog")).toHaveCSS(
    "background-color",
    "rgb(24, 35, 30)",
  );
  await checkAccessibility();
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: /Account menu/ }).click();
  await expect(page.getByRole("menu")).toHaveCSS(
    "background-color",
    "rgb(24, 35, 30)",
  );
  // Check the themed menu content independently of Radix's hidden background.
  await checkAccessibility(".dropdown-menu");
  await page.keyboard.press("Escape");
  await page.setViewportSize({ width: 375, height: 812 });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await checkAccessibility();
});

test("saved dark theme is applied before the application JavaScript loads", async ({
  page,
}) => {
  await page.addInitScript(() => localStorage.setItem("kph-theme", "dark"));
  await page.route(/\/_next\/.*\.js(?:\?|$)/, (route) => route.abort());
  await page.goto("/dashboard");
  await expect(
    page.getByRole("heading", { name: /Welcome back/ }),
  ).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator("body")).toHaveCSS(
    "background-color",
    "rgb(16, 24, 21)",
  );
});

test("theme changes synchronize across tabs", async ({ page, context }) => {
  await page.goto("/dashboard");
  const otherPage = await context.newPage();
  await otherPage.goto("/dashboard/profile");
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await expect(
    otherPage.getByRole("button", { name: "Switch to dark theme" }),
  ).toBeVisible();
  await expect(otherPage.locator("html")).toHaveAttribute(
    "data-theme",
    "light",
  );
  await otherPage.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await otherPage.close();
});

test("invalid preferences fall back to dark and blocked storage still permits toggling", async ({
  page,
}) => {
  await page.addInitScript(() => {
    localStorage.setItem("kph-theme", "invalid");
    Storage.prototype.setItem = () => {
      throw new Error("Storage blocked");
    };
  });
  await page.goto("/dashboard");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});
