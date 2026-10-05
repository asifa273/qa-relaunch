const { expect } = require('@playwright/test');
require('dotenv').config();

class ProductsPage {
    constructor(page) {
        this.page = page;
        this.productsSection = page.locator('#products');
        this.productCardNames = page.locator('.card-body b');
        this.productCards = page.locator('.card-body');
        this.showingResults = page.locator('#res');

    }

    async verifyProductsLoaded() {
        await expect(this.productsSection).toBeVisible();
        await this.productCardNames.first().waitFor();

        const names = await this.productCardNames.allTextContents();
        expect(names).toEqual(["ADIDAS ORIGINAL", "ZARA COAT 3", "iphone 13 pro"]);

        const resultText = await this.showingResults.textContent();
        const shown = parseInt(resultText.match(/\d+/)[0], 10);
        expect(shown).toBe(names.length);

        return names;
    }

    // async searchProductAddCart(productName) {
    //     await this.productCards
    //         .filter({ hasText: productName })
    //         .getByRole('button', { name: 'Add To Cart' })
    //         .click();
    // }

    async addAllProductsToCart() {
        const names = await this.productCardNames.allTextContents();
        for (const name of names) {
            await this.productCards
                .filter({ hasText: name })
                .getByRole('button', { name: 'Add To Cart' })
                .click();
        }
        return names;
    }



}

module.exports = { ProductsPage };