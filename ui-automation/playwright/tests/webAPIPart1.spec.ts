import { expect, request, test, type APIRequestContext } from '@playwright/test';
import 'dotenv/config';
import { APIUtils } from './utils/APIUtils';

type OrderResponse = {
    token: string;
    orderId: string;
};

const loginPayLoad = {
    userEmail: process.env.SHOP_EMAIL ?? '',
    userPassword: process.env.SHOP_PASSWORD ?? '',
};
const orderPayLoad = { orders: [{ country: "United States", productOrderedId: "6960eac0c941646b7a8b3e68" }] };

let apiContext: APIRequestContext;
let response: OrderResponse;
test.beforeAll(async () => {
    apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);

});

test.afterAll(async () => {
    await apiContext?.dispose();
});


//create order is success
test('@API Place the order', async ({ page }) => {
    await page.addInitScript(value => {

        window.localStorage.setItem('token', value);
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByRole('button', { name: 'ORDERS' }).click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");


    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (rowOrderId && response.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    //await page.pause();
    expect(orderIdDetails).not.toBeNull();
    expect(response.orderId.includes(orderIdDetails ?? '')).toBeTruthy();

});

