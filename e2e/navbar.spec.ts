import { expect, test } from "@playwright/test";

// test("has title", async ({ page }) => {
//   await page.goto("https://elden-ring-next-js.vercel.app/");
//   await expect(page).toHaveTitle("Elden Ring Wiki");
// });

// test("Navbar has logo", async ({ page }) => {
//   await page.goto("https://elden-ring-next-js.vercel.app/");

//   const logo = page.getByRole("img", { name: "Logo" }).first();
//   await expect(logo).toBeVisible();
// });

// test("Navbar has links", async ({ page }) => {
//   await page.goto("https://elden-ring-next-js.vercel.app/");

//   const homeLink = page.getByRole("link", { name: "Bosses" }).first();
//   await expect(homeLink).toBeVisible();

//   const charactersLink = page.getByRole("link", { name: "Weapons" }).first();
//   await expect(charactersLink).toBeVisible();

//   const charactersLink2 = page.getByRole("link", { name: "Items" }).first();
//   await expect(charactersLink2).toBeVisible();
// });

test("go down button works", async ({ page }) => {
  await page.goto("http://localhost:3000");
  const goDownButton = page.getByRole("img", { name: "Go down" }).first();
  await expect(goDownButton).toBeVisible();

  await goDownButton.click();

  const scrollY = await page.evaluate(() => window.scrollY);
  expect(scrollY).toBeGreaterThan(0);
});

test("click on bosses link and be routered to bosses page", async ({
  page,
}) => {
  await page.goto("http://localhost:3000");
  const bossesLink = page.getByText("Search Bosses");
  await expect(bossesLink).toBeVisible();
  await bossesLink.click();

  await expect(page).toHaveURL("http://localhost:3000/bosses");
});

test("click on weapons link and be routered to weapons page", async ({
  page,
}) => {
  await page.goto("http://localhost:3000");
  const weaponsLink = page.getByText("Search Weapons");
  await expect(weaponsLink).toBeVisible();
  await weaponsLink.click();
  await expect(page).toHaveURL("http://localhost:3000/weapons");
});

test("click on items link and be routered to items page", async ({ page }) => {
  await page.goto("http://localhost:3000");
  const itemsLink = page.getByText("Search Items");
  await expect(itemsLink).toBeVisible();
  await itemsLink.click();
  await expect(page).toHaveURL("http://localhost:3000/items");
});
