try {
    require('dotenv').config();
} catch {
    // Load .env without requiring dotenv to be installed.
    const fs = require('node:fs');
    const envFile = `${process.cwd()}/.env`;
    if (fs.existsSync(envFile)) {
        for (const line of fs.readFileSync(envFile, 'utf8').split(/\r?\n/)) {
            const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
            if (match && process.env[match[1]] === undefined) {
                process.env[match[1]] = match[2].replace(/^(['"])(.*)\1$/, '$2').replace(/\s+#.*$/, '');
            }
        }
    }
}

import { test, expect } from '@playwright/test';
import { POManager } from '../PageObjects_ts/1-5.POManager';
// Scenario names and fake invalid-login values live in the JSON; real credentials come from .env / GitHub secrets.
interface Scenario {
    validUseCase?: string;
    testData?: Record<string, string>;
    invalidUseCase?: string;
    invalidLogin?: { testData: { SHOP_INVALIDEMAIL: string; SHOP_INVALIDPASSWORD: string } };
}
const dataSet: Scenario[] = require('../utils/placeorderTestData.json');
import { customtest } from '../utils/test-base';

for (const data of dataSet) {

    if (data.testData) {
        test(`@Web POM client App for ${data.validUseCase}`, async ({ page }) => {
            test.skip(!process.env.SHOP_EMAIL || !process.env.SHOP_PASSWORD, 'Set SHOP_EMAIL and SHOP_PASSWORD (.env or GitHub secrets)');
            const poManager = new POManager(page);

            // 1. Login via Page Object
            const loginPage = poManager.getLoginPage();
            await loginPage.goTo();
            await loginPage.validLogin(process.env.SHOP_EMAIL ?? '', process.env.SHOP_PASSWORD ?? '');
            console.log(`1. Login Successful: ${await loginPage.getLoginSuccessMessage()}`);

            // 2. Add to cart & Navigate to Cart via Page Object
            const productsPage = poManager.getProductsPage();
            const catalogProducts = await productsPage.addAllProductsToCart();

            // 3. Checkout/Cart Page
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

            console.log('Confirmed in Order:', sortedConfirmed); // Log the confirmed product names from the order summary/thank-you page
            console.log('Expected from Catalog:', sortedCatalog); // Log the expected product names from the catalog/products page

            // Assert that the confirmed product names match the expected catalog product names

            await expect(sortedConfirmed).toEqual(sortedCatalog);

            console.log('Verification Success: All ordered products match the catalog.');

        });
    }

    if (data.testData) {
        customtest(`@Web Valid Login with different email for ${data.validUseCase}`, async ({ page, testDataForOrder }: any) => {
            const productName = 'ZARA COAT 3';
            const allProductNames = ["ADIDAS ORIGINAL", "ZARA COAT 3", "iphone 13 pro"];
            const paymentCredittypes = ['Credit CardPaypalSEPAInvoice'];
            customtest.skip(!testDataForOrder.differentEmail || !testDataForOrder.differentPassword, 'Set SHOP_ALT_EMAIL and SHOP_ALT_PASSWORD');
            const poManager = new POManager(page);

            // 1. Login via Page Object
            const loginPage = poManager.getLoginPage();
            await loginPage.goTo();
            await loginPage.validLogin(testDataForOrder.differentEmail, testDataForOrder.differentPassword);
            console.log(`1. Login Successful: ${await loginPage.getLoginSuccessMessage()}`);
            expect(await loginPage.getLoginSuccessMessage()).toContain('Login Successfully');
        });
    }

    const invalid = data.invalidLogin;
    if (invalid) {
        test(`@Web Invalid ${data.invalidUseCase}`, async ({ page }: { page: import('@playwright/test').Page }) => {
            const productName = 'ZARA COAT 3';
            const allProductNames = ["ADIDAS ORIGINAL", "ZARA COAT 3", "iphone 13 pro"];
            const paymentCredittypes = ['Credit CardPaypalSEPAInvoice'];
            const poManager = new POManager(page);

            // 1. Login via Page Object
            const loginPage = poManager.getLoginPage();
            await loginPage.goTo();
            await loginPage.invalidLogin(invalid.testData.SHOP_INVALIDEMAIL, invalid.testData.SHOP_INVALIDPASSWORD);
            console.log(`2..Login Failure: ${await loginPage.getInvalidLoginMessage()}`);
        });
    }
}