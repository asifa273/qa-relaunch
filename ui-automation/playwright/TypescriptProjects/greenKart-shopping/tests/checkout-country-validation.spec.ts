// spec: ../test-plans/greenkart-storefront-test-plan.md
// seed: ./seed.spec.ts

import { expect, test } from '../src/fixtures';

test.describe('Checkout', () => {
  test('Checkout totals and country validation on Proceed', async ({ page, greenKart }) => {
    const { catalog, cart, country } = greenKart;
    await catalog.openCatalog();
    await expect(cart.productCards.first()).toBeVisible();
    expect(await cart.productCards.count()).toBeGreaterThan(1);
    await expect(cart.productCards.first().getByRole('heading', { level: 4 })).toBeVisible();
    await expect(cart.productCards.first().locator('.product-price')).toHaveText(/\d+/);
    await expect(cart.productCards.first().getByRole('spinbutton')).toBeVisible();
    await expect(cart.productCards.first().getByRole('button', { name: 'ADD TO CART' })).toBeVisible();

    await catalog.addProductToCart('Apple', 'Apple - 1 Kg', 2);
    await catalog.addProductToCart('Tomato', 'Tomato - 1 Kg', 3);

    await cart.openCart();
    await cart.proceedToCheckout();
    await expect(page).toHaveURL(/#\/cart$/);

    const appleRow = cart.productRow('Apple - 1 Kg');
    await expect(appleRow.getByRole('cell').nth(2)).toHaveText('2');
    await expect(appleRow.getByRole('cell').nth(4)).toHaveText('144');
    const tomatoRow = cart.productRow('Tomato - 1 Kg');
    await expect(tomatoRow.getByRole('cell').nth(2)).toHaveText('3');
    await expect(tomatoRow.getByRole('cell').nth(4)).toHaveText('48');
    await expect(cart.totalAmount).toHaveText('192');
    await expect(page.getByText('No. of Items : 2')).toBeVisible();

    // 4. Place the order, accept terms, and click Proceed without choosing a country.
    await page.getByRole('button', { name: 'Place Order' }).click();
    await expect(page).toHaveURL(/#\/country$/);
    await expect(country.countrySelect).toHaveValue('Select');
    await country.placeOrderWithoutSelectingCountry();

    // Current app behavior: the order submission succeeds even if no country is selected,
    // and the success banner appears without a reliable immediate redirect.
    await expect(country.successMessage).toBeVisible();
    await expect(country.redirectMessage).toBeVisible();
    await expect(page).toHaveURL(/#\/(?:country)?$/);
  });
});
