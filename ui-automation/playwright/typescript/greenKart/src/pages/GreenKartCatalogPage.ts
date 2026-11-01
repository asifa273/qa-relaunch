import { expect, type Locator, type Page } from '@playwright/test';

export class GreenKartCatalogPage {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly productHeadings: Locator;
    readonly noResultsMessage: Locator;
    readonly productCards: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.getByRole('searchbox', { name: 'Search for Vegetables and Fruits' });
        this.productHeadings = page.getByRole('heading', { level: 4 });
        this.noResultsMessage = page.getByRole('heading', { name: 'Sorry, no products matched your search!' });
        this.productCards = page.locator('.product');
    }

    async openCatalog(): Promise<void> {
        await this.page.goto('https://rahulshettyacademy.com/seleniumPractise/');
        await expect(this.productHeadings.first()).toBeVisible();
    }

    async searchFor(query: string): Promise<void> {
        await this.searchInput.fill(query);
    }

    async clearSearch(): Promise<void> {
        await this.searchInput.clear();
    }

    async addProductToCart(searchText: string, productName: string, quantity: number): Promise<void> {
        await this.searchFor(searchText);
        const productCard = this.productCards.filter({
            has: this.page.getByRole('heading', { name: productName }),
        });
        await expect(this.productHeadings).toHaveText([productName]);
        await productCard.getByRole('spinbutton').fill(String(quantity));
        await productCard.getByRole('button', { name: 'ADD TO CART' }).click();
    }
}