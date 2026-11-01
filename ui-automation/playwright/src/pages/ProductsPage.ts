import { expect, type Locator, type Page } from '@playwright/test';

export class ProductsPage {
    readonly page: Page;
    readonly productsSection: Locator;
    readonly productCardNames: Locator;
    readonly productCards: Locator;
    readonly showingResults: Locator;
    readonly toastContainer: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productsSection = page.locator('#products');
        this.productCards = page.locator('.card-body');
        this.productCardNames = this.productCards.locator('b');
        this.showingResults = page.locator('#res');
        this.toastContainer = page.locator('#toast-container');
    }

    async verifyProductsLoaded(): Promise<string[]> {
        await expect(this.productsSection).toBeVisible();
        await this.productCards.first().waitFor({ state: 'visible' });
        await expect(this.showingResults).toHaveText(/Showing\s+\d+\s+results/i);

        const names = await this.productCardNames.allTextContents();
        await expect(this.showingResults).toHaveText(new RegExp(`Showing\\s+${names.length}\\s+results`, 'i'));
        return names;
    }

    async addProductToCart(productName: string): Promise<void> {
        const product = this.productCards.filter({ hasText: productName });
        await product.getByRole('button', { name: 'Add To Cart' }).click();
        await expect(this.toastContainer).toBeVisible();
        await this.toastContainer.waitFor({ state: 'hidden' });
    }

    async addAllProductsToCart(): Promise<string[]> {
        await expect(this.productCards.first()).toBeVisible();
        const count = await this.productCards.count();
        const names: string[] = [];

        for (let index = 0; index < count; index++) {
            const card = this.productCards.nth(index);
            const name = (await card.locator('b').textContent())?.trim() ?? '';
            await card.getByRole('button', { name: 'Add To Cart' }).click();
            await expect(this.toastContainer).toBeVisible();
            await this.toastContainer.waitFor({ state: 'hidden' });
            names.push(name);
        }

        return names;
    }
}