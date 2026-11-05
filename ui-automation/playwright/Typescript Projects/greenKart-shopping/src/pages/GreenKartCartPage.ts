import type { Locator, Page } from '@playwright/test';

export class GreenKartCartPage {
    readonly page: Page;
    readonly productCards: Locator;
    readonly cartLink: Locator;
    readonly proceedButton: Locator;
    readonly totalAmount: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productCards = page.locator('.product');
        this.cartLink = page.getByRole('link', { name: 'Cart' });
        this.proceedButton = page.getByRole('button', { name: 'PROCEED TO CHECKOUT' });
        this.totalAmount = page.locator('.totAmt');
    }

    productRow(productName: string): Locator {
        return this.page.getByRole('row').filter({ hasText: productName });
    }

    async openCart(): Promise<void> {
        await this.cartLink.click();
    }

    async proceedToCheckout(): Promise<void> {
        await this.proceedButton.click();
    }
}