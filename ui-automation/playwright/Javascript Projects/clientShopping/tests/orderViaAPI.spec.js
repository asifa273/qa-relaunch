const { test, expect, request } = require('../src/fixtures');
const { APIUtils, requireEnv } = require('../src/utils');

requireEnv(test, 'SHOP_EMAIL', 'SHOP_PASSWORD');

test.describe('@API @Web Client shop - order created through the API', () => {
    let apiContext;
    let order;

    test.beforeAll(async () => {
        apiContext = await request.newContext();
        const apiUtils = new APIUtils(apiContext, {
            userEmail: process.env.SHOP_EMAIL,
            userPassword: process.env.SHOP_PASSWORD,
        });
        const productId = await apiUtils.getFirstProductId();
        order = await apiUtils.createOrder({
            orders: [{ country: 'United States', productOrderedId: productId }],
        });
    });

    test.afterAll(async () => {
        await apiContext?.dispose();
    });

    test('shows the API-created order in the Orders page', async ({ page }) => {
        // Skip the UI login by seeding the token the app reads from localStorage.
        await page.addInitScript((token) => {
            window.localStorage.setItem('token', token);
        }, order.token);

        await page.goto('/client');
        await page.getByRole('button', { name: 'ORDERS' }).click();

        const orderId = String(order.orderId);
        const row = page.locator('tbody tr').filter({ hasText: orderId });
        await expect(row).toBeVisible();

        await row.getByRole('button', { name: 'View' }).click();
        await expect(page.locator('.col-text')).toHaveText(orderId);
    });
});
