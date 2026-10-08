// spec: test-plans/greenkart-storefront-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect, type Locator, type Page } from '@playwright/test';

class GreenKartProductsPage {
  readonly searchInput: Locator;
  readonly productHeadings: Locator;
  readonly noResultsMessage: Locator;

  constructor(private readonly page: Page) {
    this.searchInput = page.getByRole('searchbox', { name: 'Search for Vegetables and Fruits' });
    this.productHeadings = page.getByRole('heading', { level: 4 });
    this.noResultsMessage = page.getByRole('heading', { name: 'Sorry, no products matched your search!' });
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
}

class GreenKartPOManager {
  private readonly greenKartProductsPage: GreenKartProductsPage;

  constructor(page: Page) {
    this.greenKartProductsPage = new GreenKartProductsPage(page);
  }

  getGreenKartProductsPage(): GreenKartProductsPage {
    return this.greenKartProductsPage;
  }
}

test.describe('Catalog and Product Selection', () => {
  test('Catalog search filters matching and non-matching products', async ({ page }) => {
    const poManager = new GreenKartPOManager(page);
    const productsPage = poManager.getGreenKartProductsPage();

    // 1. Open the catalog in a fresh browser context and enter “Apple” in the product search field.
    await productsPage.openCatalog();
    const initialProductCount = await productsPage.productHeadings.count();
    expect(initialProductCount).toBeGreaterThan(1);
    await productsPage.searchFor('Apple');
    await expect(productsPage.productHeadings).toHaveCount(1);
    await expect(productsPage.productHeadings).toHaveText('Apple - 1 Kg');

    // 2. Replace the search text with a string that does not match any product.
    await productsPage.searchFor('not-a-real-vegetable-xyz');
    await expect(productsPage.productHeadings).toHaveCount(0);
    await expect(productsPage.noResultsMessage).toBeVisible();

    // 3. Clear the search field.
    await productsPage.clearSearch();
    await expect(productsPage.productHeadings).toHaveCount(initialProductCount);
  });
});
