const { test, expect } = require('../src/fixtures');
const { requireEnv } = require('../src/utils');
const data = require('../src/data/placeorderTestData.json');

test.describe('@Web Client shop - UI', () => {
    test(`places an order for every product: ${data.validUseCase}`, async ({ poManager, shopCredentials }) => {
        requireEnv(test, 'SHOP_EMAIL', 'SHOP_PASSWORD');

        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.validLogin(shopCredentials.email, shopCredentials.password);

        const catalogProducts = await poManager.getProductsPage().addAllProductsToCart();

        const cartPage = poManager.getCartPage();
        await cartPage.navigateToCart();
        await cartPage.checkoutToPayment();

        const paymentOrdersPage = poManager.getPaymentOrdersPage();
        await paymentOrdersPage.paymentPage();
        await paymentOrdersPage.verifyPersonalInformation();
        await paymentOrdersPage.verifyShippingInformation(shopCredentials.email);

        const thanksOrderPage = poManager.getThanksOrderPage();
        await thanksOrderPage.verifyThankYouSection();
        await thanksOrderPage.verifyOrderSummary(catalogProducts);

        const confirmed = await thanksOrderPage.getConfirmedProductNames(catalogProducts);
        expect([...confirmed].sort()).toEqual([...catalogProducts].sort());
    });

    test('logs in with the alternate shop account', async ({ poManager, shopCredentials }) => {
        requireEnv(test, 'SHOP_ALT_EMAIL', 'SHOP_ALT_PASSWORD');

        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.validLogin(shopCredentials.altEmail, shopCredentials.altPassword);
        expect(loginPage.getLoginSuccessMessage()).toContain('Login Successfully');
    });

    test(`rejects bad credentials: ${data.invalidUseCase}`, async ({ poManager }) => {
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.invalidLogin(data.invalidLogin.email, data.invalidLogin.password);
        expect(loginPage.getInvalidLoginMessage()).toContain('Incorrect email or password.');
    });
});
