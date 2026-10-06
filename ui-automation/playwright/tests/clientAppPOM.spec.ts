require('dotenv').config();

import { test, expect } from '@playwright/test';
import { POManager } from '../PageObjects_ts/POManager';
const dataSet = JSON.parse(JSON.stringify(require('../utils/placeorderTestData.json')));
import { customtest } from '../utils/test-base';

for (const data of dataSet) {

    if (data.testData) {
        test(`@Web POM client App for ${data.validUseCase}`, async ({ page }: any) => {
            const productName = 'ZARA COAT 3';
            const allProductNames = ["ADIDAS ORIGINAL", "ZARA COAT 3", "iphone 13 pro"];
            const paymentCredittypes = ['Credit CardPaypalSEPAInvoice'];
            const poManager = new POManager(page);

            // 1. Login via Page Object
            const loginPage = poManager.getLoginPage();
            await loginPage.goTo();
            await loginPage.validLogin(data.testData.SHOP_EMAIL, data.testData.SHOP_PASSWORD);
            console.log(`1. Login Successful: ${await loginPage.getLoginSuccessMessage()}`);

            // 2. Add to cart & Navigate to Cart via Page Object
            const productsPage = poManager.getProductsPage();
            const catalogProducts = await productsPage.addAllProductsToCart();

            // 3. Checkout
            const cartPage = poManager.getCartPage();
            await cartPage.navigateToCart();
            await cartPage.fromcheckOuttoPayment();


            // 4. Payment Method -Select a payment method (Credit Card) and fill the form
            const paymentOrdersPage = poManager.getPaymentOrdersPage();
            await paymentOrdersPage.paymentPage();
            await paymentOrdersPage.verifyPersonalInformation();
            await paymentOrdersPage.verifyShippingInformation();


            // 6. Verify order summary + thank-you message
            const thanksOrderPage = poManager.getThanksOrderPage();
            await thanksOrderPage.verifyThankYouSection();
            await thanksOrderPage.verifyOrderSummary(catalogProducts);
            const confirmedProductNames = await thanksOrderPage.getConfirmedProductNames(catalogProducts);

            const sortedConfirmed = [...confirmedProductNames].sort();
            const sortedCatalog = [...catalogProducts].sort();

            console.log('Confirmed in Order:', sortedConfirmed);
            console.log('Expected from Catalog:', sortedCatalog);

            await expect(sortedConfirmed).toEqual(sortedCatalog);

            console.log('Verification Success: All ordered products match the catalog.');

        });
    }

    if (data.testData) {
        customtest(`@Web Valid Login with different email for ${data.validUseCase}`, async ({ page, testDataForOrder }: any) => {
            const productName = 'ZARA COAT 3';
            const allProductNames = ["ADIDAS ORIGINAL", "ZARA COAT 3", "iphone 13 pro"];
            const paymentCredittypes = ['Credit CardPaypalSEPAInvoice'];
            const poManager = new POManager(page);

            // 1. Login via Page Object
            const loginPage = poManager.getLoginPage();
            await loginPage.goTo();
            await loginPage.validLogin(testDataForOrder.differentEmail, testDataForOrder.differentPassword);
            console.log(`1. Login Successful: ${await loginPage.getLoginSuccessMessage()}`);
            expect(await loginPage.getLoginSuccessMessage()).toContain('Login Successfully');
        });
    }

    if (data.invalidLogin) {
        test(`@Web Invalid ${data.invalidUseCase}`, async ({ page }: { page: import('@playwright/test').Page }) => {
            const productName = 'ZARA COAT 3';
            const allProductNames = ["ADIDAS ORIGINAL", "ZARA COAT 3", "iphone 13 pro"];
            const paymentCredittypes = ['Credit CardPaypalSEPAInvoice'];
            const poManager = new POManager(page);

            // 1. Login via Page Object
            const loginPage = poManager.getLoginPage();
            await loginPage.goTo();
            await loginPage.invalidLogin(data.invalidLogin.testData.SHOP_INVALIDEMAIL, data.invalidLogin.testData.SHOP_INVALIDPASSWORD);
            console.log(`2..Login Failure: ${await loginPage.getInvalidLoginMessage()}`);
        });
    }
}