const { expect } = require('@playwright/test');

class CartPage {
    constructor(page) {
        this.page = page;
        this.cartButton = page.locator('button[routerlink="/dashboard/cart"]').first();
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    }

    async navigateToCart() {
        await this.cartButton.click();
        await expect(this.page).toHaveURL(/cart/);
        await expect(this.checkoutButton).toBeVisible();
    }

    async checkoutToPayment() {
        await this.checkoutButton.click();
    }
}

module.exports = { CartPage };
