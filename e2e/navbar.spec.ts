import { expect, test } from "@playwright/test";

test.describe("Bosses page filtering", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/bosses");
    await expect(page.getByText("Summoning the fallen…")).not.toBeVisible({
      timeout: 10000,
    });
  });

  test("medium difficulty filter", async ({ page }) => {
    await page.getByRole("button", { name: "Medium" }).click();

    const cards = page.locator('[class*="cursor-pointer"]');
    const count = await cards.count();

    const badges = page.getByText("Medium", { exact: true });
    const badgeCount = await badges.count();

    expect(badgeCount).toBe(count / 2);
  });

  test("search with nonsense lol", async ({ page }) => {
    await page
      .getByPlaceholder("Search by name, location, or drop…")
      .fill("213389123123");

    await expect(page.getByText("No boss answers your call…")).toBeVisible();
    await expect(page.getByText(/0 enemies found/)).toBeVisible();
  });

  test("no drops test", async ({ page }) => {
    await page.getByRole("button", { name: "No Drops" }).click();
    const dropIcons = page.locator('[data-lucide="flame"]');
    await expect(dropIcons).toHaveCount(0);
  });
});
