const { expect } = require('@playwright/test');

class ProductsPage {
    constructor(page) {
        this.page = page;
        this.productsSection = page.locator('#products');
        this.productCards = page.locator('.card-body');
        this.productCardNames = page.locator('.card-body b');
        this.showingResults = page.locator('#res');
        this.toast = page.locator('#toast-container');
    }

    async verifyProductsLoaded() {
        await expect(this.productsSection).toBeVisible();
        await expect(this.productCardNames.first()).toBeVisible();

        const names = await this.productCardNames.allTextContents();
        expect(names.length).toBeGreaterThan(0);

        const resultText = (await this.showingResults.textContent()) ?? '';
        const shown = Number.parseInt(resultText.match(/\d+/)?.[0] ?? '0', 10);
        expect(shown).toBe(names.length);

        return names;
    }

    async addProductToCart(productName) {
        await this.productCards
            .filter({ has: this.page.getByText(productName, { exact: true }) })
            .getByRole('button', { name: 'Add To Cart' })
            .click();
        await expect(this.toast).toContainText('Product Added To Cart');
        // Wait for the toast to clear so the next click is not intercepted.
        await expect(this.toast).toBeHidden();
    }

    async addAllProductsToCart() {
        const names = await this.verifyProductsLoaded();
        for (const name of names) {
            await this.addProductToCart(name);
        }
        return names;
    }
}

module.exports = { ProductsPage };
