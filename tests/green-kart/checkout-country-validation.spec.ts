// spec: test-plans/greenkart-storefront-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect, type Page } from '@playwright/test';

async function addProductToCart(page: Page, searchText: string, productName: string, quantity: number) {
  await page.getByRole('searchbox', { name: 'Search for Vegetables and Fruits' }).fill(searchText);
  const productCard = page.locator('.product').filter({ has: page.getByRole('heading', { name: productName }) });
  await expect(page.getByRole('heading', { level: 4 })).toHaveText([productName]);
  // The quantity field carries over from the previously filtered card, so set it explicitly.
  await productCard.getByRole('spinbutton').fill(String(quantity));
  await productCard.getByRole('button', { name: 'ADD TO CART' }).click();
}

test.describe('Checkout', () => {
  test('Checkout totals and country validation on Proceed', async ({ page }) => {
    // 1. Open the catalog in a fresh browser context.
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/');
    const productCards = page.locator('.product');
    await expect(productCards.first()).toBeVisible();
    expect(await productCards.count()).toBeGreaterThan(1);
    await expect(productCards.first().getByRole('heading', { level: 4 })).toBeVisible();
    await expect(productCards.first().locator('.product-price')).toHaveText(/\d+/);
    await expect(productCards.first().getByRole('spinbutton')).toBeVisible();
    await expect(productCards.first().getByRole('button', { name: 'ADD TO CART' })).toBeVisible();

    // 2. Search "Apple", add quantity 2 (plus Tomato quantity 3 for the expected cart).
    await addProductToCart(page, 'Apple', 'Apple - 1 Kg', 2);
    await addProductToCart(page, 'Tomato', 'Tomato - 1 Kg', 3);

    // 3. Open the cart flyout and proceed to checkout.
    await page.getByRole('link', { name: 'Cart' }).click();
    await page.getByRole('button', { name: 'PROCEED TO CHECKOUT' }).click();
    await expect(page).toHaveURL(/#\/cart$/);

    const appleRow = page.getByRole('row').filter({ hasText: 'Apple - 1 Kg' });
    await expect(appleRow.getByRole('cell').nth(2)).toHaveText('2');
    await expect(appleRow.getByRole('cell').nth(4)).toHaveText('144');
    const tomatoRow = page.getByRole('row').filter({ hasText: 'Tomato - 1 Kg' });
    await expect(tomatoRow.getByRole('cell').nth(2)).toHaveText('3');
    await expect(tomatoRow.getByRole('cell').nth(4)).toHaveText('48');
    await expect(page.locator('.totAmt')).toHaveText('192');
    await expect(page.getByText('No. of Items : 2')).toBeVisible();

    // 4. Place the order, accept terms, and click Proceed without choosing a country.
    await page.getByRole('button', { name: 'Place Order' }).click();
    await expect(page).toHaveURL(/#\/country$/);
    await expect(page.getByRole('combobox')).toHaveValue('Select');
    await page.getByRole('checkbox').check();
    await page.getByRole('button', { name: 'Proceed' }).click();

    // Expected: country is required. Known defect: the order is placed and the app
    // redirects to the catalog, so these assertions fail until it is fixed.
    await expect(page.getByText('Thank you, your order has been placed successfully')).toBeHidden();
    await expect(page.getByText(/country/i).filter({ hasText: /required|select/i })).toBeVisible();
    await expect(page).toHaveURL(/#\/country$/);
  });
});
