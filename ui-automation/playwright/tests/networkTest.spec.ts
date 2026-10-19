import { test, expect, request } from '@playwright/test';
import { APIUtils } from '../utils_ts/APIUtils';
import type { OrderResult } from '../utils_ts/APIUtils';
import 'dotenv/config';
import { requireEnv } from '../utils_ts/requireEnv';

requireEnv(test, 'SHOP_EMAIL', 'SHOP_PASSWORD');

const loginPayLoad = {
    shopEmail: process.env.SHOP_EMAIL ?? '',
    shopPassword: process.env.SHOP_PASSWORD ?? '',
};

const orderPayLoad = {
    orders: [{ country: 'United States', productOrderedId: '6960eac0c941646b7a8b3e68' }],
};

const fakePayLoad = { data: [], message: 'No Orders' };

let orderResult: OrderResult;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayLoad);
    // Assign directly to the outer variable (do NOT write 'let orderResult = ...')
    orderResult = await apiUtils.createOrder(orderPayLoad);
});

test('@API Place the order', async ({ page }) => {
    // Fix 3: Access token from orderResult
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, orderResult.token);

    await page.goto('https://rahulshettyacademy.com/client');

    // Fix 4: Intercept and mock the API response
    await page.route(
        'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*',
        async route => {
            const originalResponse = await page.request.fetch(route.request());
            await route.fulfill({
                response: originalResponse,
                body: JSON.stringify(fakePayLoad),
            });
        }
    );

    await page.getByRole('button', { name: 'ORDERS' }).click();

    // Fix 5: Wait for the mock orders API to complete (not get-cart-count)
    await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*');

    await expect(page.getByText('You have No Orders to show at this time. Please Visit Back Us')).toBeVisible();
});