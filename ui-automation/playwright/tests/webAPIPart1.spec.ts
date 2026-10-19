import { expect, request, test, type APIRequestContext } from '@playwright/test';
import 'dotenv/config';
import { APIUtils } from '../utils_ts/APIUtils';
import { requireEnv } from '../utils/requireEnv';

requireEnv(test, 'SHOP_EMAIL', 'SHOP_PASSWORD');

type OrderResponse = {
    token: string;
    orderId: string | number;
};

let response: OrderResponse;
let apiContext: APIRequestContext;

const loginPayLoad = {
    userEmail: process.env.SHOP_EMAIL ?? '',
    userPassword: process.env.SHOP_PASSWORD ?? '',
};

const orderPayLoad = {
    orders: [{ country: 'United States', productOrderedId: '6960eac0c941646b7a8b3e68' }]
};

test.beforeAll(async () => {
    apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);
});

test.afterAll(async () => {
    await apiContext?.dispose();
});

test('@Web Place the order', async ({ page }) => {
    // 1. Inject token into localStorage before page load
    await page.addInitScript((value: string) => {
        window.localStorage.setItem('token', value);
    }, String(response.token));

    // 2. Navigate to client app and open Orders page
    await page.goto('https://rahulshettyacademy.com/client');
    await page.getByRole('button', { name: 'ORDERS' }).click();

    // 3. Ensure the orders table is loaded
    await page.locator('tbody').waitFor();

    // 4. Locate and assert on the row matching the generated orderId
    const stringOrderId = String(response.orderId);
    const targetRow = page.locator('tbody tr').filter({ hasText: stringOrderId });
    await expect(targetRow).toBeVisible();

    // 5. Open order details
    await targetRow.getByRole('button', { name: 'View' }).click();

    // 6. Verify order details summary
    const orderDetailsLocator = page.locator('.col-text');
    await expect(orderDetailsLocator).toBeVisible();

    const orderIdDetails = (await orderDetailsLocator.textContent())?.trim() ?? '';
    expect(stringOrderId).toContain(orderIdDetails);
});