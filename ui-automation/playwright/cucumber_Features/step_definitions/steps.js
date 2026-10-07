const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { chromium, expect } = require('@playwright/test');
const { POManager } = require('../../PageObjects/POManager');
require('dotenv').config();

// Manage browser lifecycle across steps
Before(async function () {
    this.browser = await chromium.launch({ headless: true });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    this.poManager = new POManager(this.page);
    this.shopEmail = process.env.SHOP_EMAIL;
    this.shopPassword = process.env.SHOP_PASSWORD;
    this.shopInvalidEmail = process.env.SHOP_INVALIDEMAIL;
    this.shopInvalidPassword = process.env.SHOP_INVALIDPASSWORD;
    console.log('\n================== SCENARIO STARTED ==================');
});

After(async function () {
    if (this.browser) {
        await this.browser.close();
        console.log('\n================== SCENARIO ENDED ==================');
    }
});

Given('I am on the E-Commerce login page', async function () {
    this.productName = 'ZARA COAT 3';
    this.allProductNames = ['ADIDAS ORIGINAL', 'ZARA COAT 3', 'iphone 13 pro'];
    this.paymentCredittypes = ['Credit CardPaypalSEPAInvoice'];

    this.loginPage = this.poManager.getLoginPage();
    await this.loginPage.goTo();
    console.log(`[Login Page] Successfully navigated to E-Commerce login page`);
});

When('I log in with valid credentials', async function () {
    await this.loginPage.validLogin(this.shopEmail, this.shopPassword);
    const successMessage = await this.loginPage.getLoginSuccessMessage()
    console.log(`[Login Page] Login response: ${successMessage}`);
});
When('I log in with this credentials {string} and {string}', async function (username, password) {
    await this.loginPage.validLogin(username, password);
    const loginMessage = await this.loginPage.getLoginSuccessMessage();
    expect(loginMessage).toContain('Login Successfully');
    console.log(`[Login Page] Login message: ${loginMessage}`);
    console.log(`[Login Page] username is: ${username}`);
    console.log(`[Login Page] password is: ${password}`);
});

Then('I should see a {string} message for either successful login or invalid login', async function (toastAlert) {
    const loginMessage = await this.loginPage.getLoginSuccessMessage();
    expect(loginMessage).toContain(toastAlert);
    console.log(`[Login Page] Toast Alert message notification is: ${loginMessage}`);
});

Then('I should be redirected to the products page and verify the products are loaded', async function () {
    this.productsPage = this.poManager.getProductsPage();
    await this.productsPage.verifyProductsLoaded();
    console.log(`[products Page] is successfully loaded products`)
});

Then('I add a product {string} to the cart', async function (productName) {
    this.productName = productName;
    this.catalogProducts = [productName];

    const product = this.page.locator('.card-body').filter({ hasText: productName });
    await product.getByRole('button', { name: 'Add To Cart' }).click();

    const toastContainer = this.page.locator('#toast-container');
    await expect(toastContainer).toBeVisible();
    await toastContainer.waitFor({ state: 'hidden' });
    console.log(`2.Added single Product into the cart ${productName}`);

});

Then('I proceed to checkout page', async function () {
    await this.page.locator("[routerlink*='cart']").click();
    await expect(this.page).toHaveURL(/cart/);
    await this.page.locator("text=Checkout").waitFor();
    console.log(`[Cart Page]navigated to cart and ready to check out`);
});

Then('I should see the checkout page with the product details', async function () {
    const catalogProducts = this.catalogProducts ?? this.allProductNames;
    for (const productName of catalogProducts) {
        await expect(this.page.getByText(productName, { exact: true })).toBeVisible();
    }
    console.log(`[Cart Page] verified items in cart: ${catalogProducts.join(', ')}`);
    await this.page.getByRole('button', { name: 'Checkout' }).click();
    console.log(`[Cart Page] clicked check out button`);
});

Then('I proceed to payment orders page', async function () {
    this.paymentOrdersPage = this.poManager.getPaymentOrdersPage();
    await this.paymentOrdersPage.paymentPage();
    console.log(`[Payment Page] payment page is populated`);
});

Then('I fill in the personal information', async function () {
    await this.paymentOrdersPage.verifyPersonalInformation();
    console.log(`[Payment Page] personal infor is populated`);
});

Then('I fill in the shipping information', async function () {
    await expect(this.paymentOrdersPage.shippingInformationPlaceholder).toBeVisible();
    await this.paymentOrdersPage.userEmailInput.fill(this.shopEmail);
    const country = this.page.getByPlaceholder('Select Country');
    await country.click();
    await country.pressSequentially('United', { delay: 100 });
    await this.paymentOrdersPage.typeCountryNameDropDown.waitFor();
    await this.paymentOrdersPage.typeCountryNameDropDown.click();
    console.log(`[Payment Page] shipping inform is filled `)
});

Then('I place the order', async function () {
    await this.paymentOrdersPage.placeOrderButton.click();
    console.log('[Payment Page] Submitted order (Place Order clicked)');
});

Then('I should see a Thanks Order message', async function () {
    this.thanksOrderPage = this.poManager.getThanksOrderPage();
    await this.thanksOrderPage.verifyThankYouSection();
    console.log(`[Thanks Page] Order confirmed from ${this.thanksOrderPage}`);
});

Then('I should see the product name in Proucts page and Thanks Order page must be matched', async function () {
    const productsToVerify = this.catalogProducts ?? [this.productName];
    await this.thanksOrderPage.verifyOrderSummary(productsToVerify);
    console.log(`[Thanks Page] Verified order summary matches purchased products: ${productsToVerify.join(', ')}`);
});

When('I log in with invalid credentials {string} and {string}', async function (shopInvalidEmail, shopInvalidPassword) {
    const email = this[shopInvalidEmail] || shopInvalidEmail || this.shopInvalidEmail;
    const password = this[shopInvalidPassword] || shopInvalidPassword || this.shopInvalidPassword;
    await this.loginPage.invalidLogin(email, password);
    console.log(`[Login Page] Invalid Credentails mesage from ${email}${password} `);
});

Then('I should see a {string} message for invalid login', async function (expectedMessage) {
    const invalidLoginMessage = await this.loginPage.getInvalidLoginMessage();
    expect(invalidLoginMessage).toContain(expectedMessage);
    console.log(`Inavlid login toast notification alert is : ${invalidLoginMessage}`);
});



Then('I add all products to the cart', async function () {
    this.catalogProducts = await this.productsPage.addAllProductsToCart();
    console.log(`All products are added in products page ${this.catalogProducts}`);
});

Then('I should see the correct cart count reflecting the number of products added', async function () {
    const cartBadge = this.page.locator('button[routerlink="/dashboard/cart"] label');
    await expect(cartBadge).toHaveText(String(this.catalogProducts.length));
    const badgeCount = await cartBadge.textContent();
    console.log(`cart Bage count is : ${badgeCount} must match all products names added in cart ${this.catalogProducts}`)
});

