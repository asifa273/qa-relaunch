//login through Ui -playwright storage tool-> store in .json
//test, browser->through storage has .json, cartorder, orderdeatils, orderhistory

import { expect, test, type Browser, type BrowserContext, type Page } from '@playwright/test';
import 'dotenv/config';

import { requireEnv } from '../utils/requireEnv';

requireEnv(test, 'SHOP_EMAIL', 'SHOP_PASSWORD');

const userEmail = process.env.SHOP_EMAIL ?? '';
const userPassword = process.env.SHOP_PASSWORD ?? '';
let webContext: BrowserContext;
test.describe.configure({ mode: 'serial' });

test.beforeAll(async ({ browser }: { browser: Browser }) => {
    // 1. Create a setup context and page
    const setupContext: BrowserContext = await browser.newContext();
    const page: Page = await setupContext.newPage();


    // 2. Perform login
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.getByRole('textbox', { name: 'Email' }).fill(userEmail);
    await page.getByRole('textbox', { name: 'Passsword' }).fill(userPassword);
    await page.getByRole('button', { name: 'Login' }).click();

    // 3. Confirm navigation past login
    await page.waitForURL('**/client/#/dashboard/dash');
    await page.waitForLoadState('networkidle');

    // 4. Save session state to disk
    await setupContext.storageState({ path: '.auth/state.json' });
    await setupContext.close();

    // 5. Initialize the shared authenticated context for upcoming tests
    webContext = await browser.newContext({ storageState: '.auth/state.json' });

});

test.afterAll(async () => {
    await webContext?.close();
});

// TEST 1: Skips login, adds products to cart
test('Add products to Cart', async () => {
    const page: Page = await webContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client');

    // Wait for inventory cards to render
    const cardTitleLocator = page.locator('.card-body b');
    await cardTitleLocator.first().waitFor();


    const names: string[] = await cardTitleLocator.allTextContents();

    // Also cross-check against the "Showing N results" label.
    const resultText = (await page.locator('#res').textContent()) ?? '';
    const shownMatch = resultText.match(/\d+/);
    if (shownMatch) {
        const shown = parseInt(shownMatch[0], 10);
        expect(shown).toBe(names.length);
    }

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
// TEST 2: Inspect cart items using existing session
test('@Web Check titles in Cart', async () => {
    const page: Page = await webContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client/#/dashboard/cart');

    // Auto-retrying assertion for list of cart item titles
    const cartItems = page.locator('.cartSection h3');
    await expect(cartItems.first()).toBeVisible();

    const expectedProducts = ['ADIDAS ORIGINAL', 'ZARA COAT 3', 'iphone 13 pro'];
    for (const product of expectedProducts) {
        await expect(cartItems.filter({ hasText: product })).toBeVisible();
    }

    await page.close();
});