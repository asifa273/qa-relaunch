//login through Ui -playwright storage tool-> store in .json
//test, browser->through storage has .json, cartorder, orderdeatils, orderhistory

const { test, expect } = require('@playwright/test');
require('dotenv').config();
let webContext;
test.describe.configure({ mode: 'serial' });

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.getByRole('textbox', { name: 'Email' }).fill(process.env.SHOP_EMAIL);
    await page.getByRole('textbox', { name: 'Passsword' }).fill(process.env.SHOP_PASSWORD);
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForLoadState('networkidle');
    await context.storageState({ path: '.auth/state.json' });
    webContext = await browser.newContext({ storageState: '.auth/state.json' });
    await context.close();

});

test.afterAll(async () => {
    await webContext?.close();
});
//skips the login and add products to the cart and continues
test('Add products to Cart', async () => {
    const page = await webContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('.card-body b').first().waitFor();
    const names = await page.locator('.card-body b').allTextContents();
    expect(names).toEqual(['ADIDAS ORIGINAL', 'ZARA COAT 3', 'iphone 13 pro']);

    // Also cross-check against the "Showing N results" label.
    const resultText = await page.locator('#res').textContent();
    const shown = parseInt(resultText.match(/\d+/)[0], 10);
    expect(shown).toBe(names.length);

    // --- ONE add loop = single source of truth for `added` ---
    // Filter on .card-body (holds the buttons), NOT .card-body b (just the name text).
    let added = 0;
    for (const name of names) {
        await page.locator('.card-body')
            .filter({ hasText: name })
            .getByRole('button', { name: 'Add To Cart' })
            .click();
        added++;
    }
    await expect(page.locator('button[routerlink="/dashboard/cart"] label')).toHaveText(String(added));
});
test('Check titles in Cart', async () => {
    const page = await webContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client/#/dashboard/cart');

    await expect(page.locator('.cartSection h3')).toHaveText([
        'ADIDAS ORIGINAL',
        'ZARA COAT 3',
        'iphone 13 pro',
    ]);
});