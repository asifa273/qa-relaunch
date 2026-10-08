// spec: test-plans/greenkart-storefront-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Catalog and Product Selection', () => {
  test('Catalog search filters matching and non-matching products', async ({ page }) => {
    // 1. Open the catalog in a fresh browser context and enter “Apple” in the product search field.
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/');
    const productSearch = page.locator('input[placeholder="Search for Vegetables and Fruits"]');
    const productHeadings = page.getByRole('heading', { level: 4 });
    await expect(productHeadings.first()).toBeVisible();
    const initialProductCount = await productHeadings.count();
    expect(initialProductCount).toBeGreaterThan(1);

    await productSearch.fill('Apple');
    await expect(productHeadings).toHaveCount(1);
    await expect(productHeadings).toHaveText('Apple - 1 Kg');

    // 2. Replace the search text with a string that does not match any product.
    await productSearch.fill('not-a-real-vegetable-xyz');
    await expect(productHeadings).toHaveCount(0);
    await expect(page.getByRole('heading', { name: 'Sorry, no products matched your search!' })).toBeVisible();

    // 3. Clear the search field.
    await productSearch.clear();
    await expect(productHeadings).toHaveCount(initialProductCount);
  });
});
