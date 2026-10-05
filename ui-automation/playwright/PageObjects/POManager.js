const { LoginPage } = require('../PageObjects/LoginPage');
const { ProductsPage } = require('../PageObjects/ProductsPage');
const { CartPage } = require('../PageObjects/CartPage');
const { PaymentOrdersPage } = require('../PageObjects/PaymentOrdersPage');
const { ThanksOrderPage } = require('../PageObjects/ThanksOrderPage');

class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.productsPage = new ProductsPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.paymentOrdersPage = new PaymentOrdersPage(this.page);
        this.thanksOrderPage = new ThanksOrderPage(this.page);

    }
    getLoginPage() {
        return new LoginPage(this.page);
    }
    getProductsPage() {
        return new ProductsPage(this.page);
    }
    getCartPage() {
        return new CartPage(this.page);
    }
    getPaymentOrdersPage() {
        return new PaymentOrdersPage(this.page);
    }
    getThanksOrderPage() {
        return new ThanksOrderPage(this.page);
    }
}
module.exports = { POManager };