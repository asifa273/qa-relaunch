const base = require('@playwright/test');
const { APIUtils } = require('./APIUtils');
const { request } = require('@playwright/test')
require('dotenv').config();

const loginPayLoad = {
    userEmail: process.env.SHOP_EMAIL,
    userPassword: process.env.SHOP_PASSWORD,
};
const orderPayLoad = { orders: [{ country: "United States", productOrderedId: "6960eac0c941646b7a8b3e68" }] };


exports.customtest = base.test.extend({
    //setup
    authenticatedPage: async ({ browser }, use) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
        await page.getByRole('textbox', { name: 'Email' }).fill(process.env.SHOP_EMAIL);
        await page.getByRole('textbox', { name: 'Passsword' }).fill(process.env.SHOP_PASSWORD);
        await page.getByRole('button', { name: 'Login' }).click();
        await page.waitForLoadState('networkidle');
        await use(page);
        //teardown
        await context.close();

    },

    createOrder: async ({ }, use) => {
        //setup
        const apiContext = await request.newContext();
        const apiUtils = new APIUtils(apiContext, loginPayLoad);
        const response = await apiUtils.createOrder(orderPayLoad);
        await use(response);
        //teardown
        await apiContext.dispose();
    },
    testDataforOrder: {
        productName: 'ADIDAS ORIGINAL'
    }
});

