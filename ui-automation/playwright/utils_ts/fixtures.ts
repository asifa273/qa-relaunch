declare const require: any;
declare const process: any;

import { test as baseTest, request } from '@playwright/test';
import { APIUtils } from './APIUtils';
import { } from './EventsFixture';

require('dotenv').config();

const loginPayLoad = {
    email: process.env.SHOP_EMAIL,
    password: process.env.SHOP_PASSWORD,
};
const orderPayLoad = { orders: [{ country: "United States", productOrderedId: "6960eac0c941646b7a8b3e68" }] };


export const customtest = baseTest.extend<{
    authenticatedPage: any;
    createOrder: any;
    testDataforOrder: {
        productName: string;
    };
}>({
    //setup
    authenticatedPage: async ({ browser }: { browser: any }, use: any) => {
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

    createOrder: async ({ }, use: any) => {
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

