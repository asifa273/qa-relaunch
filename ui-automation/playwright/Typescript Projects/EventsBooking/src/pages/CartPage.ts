import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
    page: Page;
    cartButton: Locator;
    checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartButton = page.locator('button[routerlink="/dashboard/cart"]').first();
        this.checkoutButton = page.getByRole('button', { name: /checkout/i });
    }

    async navigateToCart(): Promise<void> {
        await this.cartButton.click();
        await expect(this.page).toHaveURL(/cart/);
        await this.checkoutButton.waitFor();
    }

    async fromcheckOuttoPayment(): Promise<void> {
        await this.checkoutButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}