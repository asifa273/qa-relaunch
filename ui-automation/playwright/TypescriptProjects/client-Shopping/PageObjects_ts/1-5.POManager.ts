import { Page } from '@playwright/test';
import { LoginPage } from './1.LoginPage';
import { ProductsPage } from './2.ProductsPage';
import { CartPage } from './3.CartPage';
import { PaymentOrdersPage } from './4.PaymentOrdersPage';
import { ThanksOrderPage } from './5.ThanksOrderPage';

export class POManager {
    page: Page;
    loginPage: LoginPage;
    productsPage: ProductsPage;
    cartPage: CartPage;
    paymentOrdersPage: PaymentOrdersPage;
    thanksOrderPage: ThanksOrderPage;
    constructor(page: Page) {
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