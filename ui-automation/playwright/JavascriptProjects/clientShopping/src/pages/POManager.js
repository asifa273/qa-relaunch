const { LoginPage } = require('./LoginPage');
const { ProductsPage } = require('./ProductsPage');
const { CartPage } = require('./CartPage');
const { PaymentOrdersPage } = require('./PaymentOrdersPage');
const { ThanksOrderPage } = require('./ThanksOrderPage');

class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.productsPage = new ProductsPage(page);
        this.cartPage = new CartPage(page);
        this.paymentOrdersPage = new PaymentOrdersPage(page);
        this.thanksOrderPage = new ThanksOrderPage(page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getProductsPage() {
        return this.productsPage;
    }

    getCartPage() {
        return this.cartPage;
    }

    getPaymentOrdersPage() {
        return this.paymentOrdersPage;
    }

    getThanksOrderPage() {
        return this.thanksOrderPage;
    }
}

module.exports = { POManager };
