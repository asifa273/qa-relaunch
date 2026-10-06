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

    /**
     * Waits for products to load and verifies the dynamic result counter.
     */
    async verifyProductsLoaded(): Promise<string[]> {
        await expect(this.productsSection).toBeVisible();

        // Wait for at least one card to appear, then wait for the counter to display the total
        await this.productCards.first().waitFor({ state: 'visible' });

        // Let Playwright retry until the count in the text stabilizes
        await expect(this.showingResults).toHaveText(/Showing\s+\d+\s+results/i);

        const names = await this.productCardNames.allTextContents();
        await expect(this.showingResults).toHaveText(new RegExp(`Showing\\s+${names.length}\\s+results`, 'i'));

        return names;
    }

    /**
     * Adds a specific product to the cart by its exact title.
     */
    async addProductToCart(productName: string): Promise<void> {
        const product = this.productCards.filter({ hasText: productName });
        await product.getByRole('button', { name: 'Add To Cart' }).click();

        // Wait for the confirmation toast to appear and clear out to prevent click interception
        await expect(this.toastContainer).toBeVisible();
        await this.toastContainer.waitFor({ state: 'hidden' });
    }

    /**
     * Adds all visible products sequentially, safely handling UI toast overlays.
     */
    async addAllProductsToCart(): Promise<string[]> {
        const count = await this.productCards.count();
        const names: string[] = [];

        for (let i = 0; i < count; i++) {
            const card = this.productCards.nth(i);
            const name = (await card.locator('b').textContent())?.trim() ?? '';

            await card.getByRole('button', { name: 'Add To Cart' }).click();
            await expect(this.toastContainer).toBeVisible();
            await this.toastContainer.waitFor({ state: 'hidden' });

            names.push(name);
        }

        return names;
    }
}