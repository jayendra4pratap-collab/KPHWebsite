import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("dashboard, profile, and mobile navigation pass accessibility checks", async ({
  page,
}) => {
  for (const route of [
    "/dashboard",
    "/dashboard/profile",
    "/dashboard/resources",
    "/dashboard/leaderboard",
  ]) {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
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
  await page.setViewportSize({ width: 375, height: 812 });
  await page.getByRole("button", { name: "Open navigation" }).click();
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    results.violations.map(({ id, nodes }) => ({
      id,
      elements: nodes.map(({ target, failureSummary }) => ({
        target,
        failureSummary,
      })),
    })),
  ).toEqual([]);
});

test("sidebar navigates, collapses, and remembers its preference", async ({
  page,
}) => {
  await page.goto("/dashboard");
  const sidebar = page.locator(".desktop-sidebar");
  await expect(
    sidebar.getByRole("link", { name: "Dashboard", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  await expect(sidebar.getByText("Alex Morgan")).toBeVisible();
  await sidebar.getByRole("button", { name: "Collapse sidebar" }).click();
  await expect(sidebar).toHaveAttribute("data-collapsed", "true");
  await expect(sidebar).toHaveCSS("width", "72px");
  await page.reload();
  await expect(sidebar).toHaveAttribute("data-collapsed", "true");
  await sidebar.getByRole("link", { name: "Events", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Events.");
  await expect(
    sidebar.getByRole("link", { name: "Events", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  await sidebar.getByRole("button", { name: "Expand sidebar" }).click();
  await expect(sidebar).toHaveCSS("width", "248px");
});

test("profile changes update avatar and user name and persist on reload", async ({
  page,
}) => {
  await page.goto("/dashboard/profile");
  await page.getByLabel("Your name", { exact: true }).fill("Samira Chen");
  await page.getByRole("radio", { name: "blue", exact: true }).check();
  await page.getByRole("button", { name: "Save changes" }).click();
  await expect(page.getByRole("status")).toContainText("updated");
  const profile = page.locator(".sidebar-profile");
  await expect(profile).toContainText("Samira Chen");
  await expect(profile.locator(".member-avatar")).toHaveText("SC");
  await page.reload();
  await expect(page.getByLabel("Your name", { exact: true })).toHaveValue(
    "Samira Chen",
  );
  await expect(profile.locator(".member-avatar")).toHaveClass(/avatar-blue/);
  await page.goto("/dashboard");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Samira");
});

test("mobile drawer supports keyboard dismissal, focus return, and navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/dashboard");
  const trigger = page.getByRole("button", { name: "Open navigation" });
  await trigger.click();
  const drawer = page.getByRole("dialog", { name: "Navigation", exact: true });
  await expect(drawer).toBeVisible();
  await expect(drawer.getByText("Alex Morgan")).toBeVisible();
  await page.screenshot({ path: "test-results/mobile-navigation.png" });
  for (let i = 0; i < 16; i++) {
    await page.keyboard.press("Tab");
    await expect
      .poll(() =>
        drawer.evaluate((element) => element.contains(document.activeElement)),
      )
      .toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(drawer).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await drawer.getByRole("link", { name: "Practice Resources" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Practice Resources",
  );
  await expect(drawer).not.toBeVisible();
});

test("resource filtering and detail dialogs work", async ({ page }) => {
  await page.goto("/dashboard/resources");
  await page
    .getByRole("searchbox", { name: "Search resources" })
    .fill("graphzzzz");
  await expect(
    page.getByRole("heading", { name: "No resources found" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Clear search" }).click();
  await expect(
    page.getByRole("heading", { name: "Codeforces", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Useful tools", exact: true }).click();
  await expect(page).toHaveURL(/tab=tools/);
  await expect(
    page.getByRole("heading", { name: "CLIST", exact: true }),
  ).toBeVisible();
  await page.goto("/dashboard");
  await page.getByRole("button", { name: /Weekly coding contest/ }).click();
  await expect(page.getByRole("dialog")).toContainText("September 26, 2026");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
});

for (const width of [375, 768, 1024, 1440]) {
  test(`dashboard fits ${width}px without overflow or runtime errors`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewportSize({ width, height: width === 375 ? 812 : 1000 });
    await page.goto("/dashboard");
    await expect(
      page.getByRole("heading", { name: /Welcome back/ }),
    ).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    await expect
      .poll(() =>
        page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      )
      .toBe(true);
    if (width >= 768 && width < 1200)
      await expect(page.locator(".desktop-sidebar")).toHaveAttribute(
        "data-collapsed",
        "true",
      );
    await page.screenshot({
      path: `test-results/dashboard-${width}.png`,
      fullPage: true,
    });
    expect(errors).toEqual([]);
  });
}
