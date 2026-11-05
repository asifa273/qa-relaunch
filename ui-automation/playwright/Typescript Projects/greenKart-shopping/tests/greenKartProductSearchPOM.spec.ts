// spec: ../test-plans/greenkart-storefront-test-plan.md
// seed: ./seed.spec.ts

import { expect, test } from '../src/fixtures';

test.describe('Catalog and Product Selection', () => {
  test('Catalog search filters matching and non-matching products', async ({ greenKart }) => {
    const productsPage = greenKart.catalog;

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
