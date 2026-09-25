const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('./utils/APIUtils');
require('dotenv').config();
const { requireEnv } = require('./utils/requireEnv');

requireEnv(test, 'SHOP_EMAIL', 'SHOP_PASSWORD');

const loginPayLoad = {
    userEmail: process.env.SHOP_EMAIL,
    userPassword: process.env.SHOP_PASSWORD,
};
const orderPayLoad = { orders: [{ country: "United States", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
const fakePayLoad = { data: [], message: "No Orders" };

let response;
test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);

})


//create order is success
test('@API Place the order', async ({ page }) => {
    await page.addInitScript(value => {

        window.localStorage.setItem('token', value);
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client");
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            const response = await page.request.fetch(route.request())
            let body = JSON.stringify(fakePayLoad);
            route.fulfill(
                {
                    response, body,
                }
            )
            //intercepting the response=api will get response=(intercepting as fake response)->browser->renders the data on front end
        })
    await page.getByRole('button', { name: 'ORDERS' }).click();
    // await page.pause();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/user/get-cart-count/*");

    await expect(page.getByText('You have No Orders to show at this time. Please Visit Back Us')).toBeVisible();




});

