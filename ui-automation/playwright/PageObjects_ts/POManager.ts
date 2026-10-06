import { Page } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { ProductsPage } from './ProductsPage';
import { CartPage } from './CartPage';
import { PaymentOrdersPage } from './PaymentOrdersPage';
import { ThanksOrderPage } from './ThanksOrderPage';

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