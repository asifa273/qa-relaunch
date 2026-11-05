import type { Page } from '@playwright/test';
import { CartPage } from './CartPage';
import { LoginPage } from './LoginPage';
import { PaymentOrdersPage } from './PaymentOrdersPage';
import { ProductsPage } from './ProductsPage';
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
        this.loginPage = new LoginPage(page);
        this.productsPage = new ProductsPage(page);
        this.cartPage = new CartPage(page);
        this.paymentOrdersPage = new PaymentOrdersPage(page);
        this.thanksOrderPage = new ThanksOrderPage(page);
    }

    getLoginPage(): LoginPage {
        return this.loginPage;
    }

    getProductsPage(): ProductsPage {
        return this.productsPage;
    }

    getCartPage(): CartPage {
        return this.cartPage;
    }

    getPaymentOrdersPage(): PaymentOrdersPage {
        return this.paymentOrdersPage;
    }

    getThanksOrderPage(): ThanksOrderPage {
        return this.thanksOrderPage;
    }
}