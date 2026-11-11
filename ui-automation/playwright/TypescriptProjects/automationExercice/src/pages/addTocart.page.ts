import { type Locator, type Page } from '@playwright/test';

export class AddToCartPage {
    private readonly page: Page;
    readonly productCards: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productCards = page.locator('.features_items .product-image-wrapper');
    }
}
