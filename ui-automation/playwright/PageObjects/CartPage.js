const { expect } = require('@playwright/test');
require('dotenv').config();

class CartPage {
    constructor(page) {
        this.page = page;
        this.cartButton = page.locator('button[routerlink="/dashboard/cart"]').first();
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    }

    async navigateToCart() {
        await this.cartButton.click();
        await expect(this.page).toHaveURL(/cart/);
        await this.checkoutButton.waitFor();
    }
    async fromcheckOuttoPayment() {
        await this.checkoutButton.click();

    }
} module.exports = { CartPage };