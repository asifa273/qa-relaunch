// spec: ../test-plans/greenkart-storefront-test-plan.md
// seed: ./seed.spec.ts

import { expect, test } from '../src/fixtures';

test.describe('Catalog and Product Selection', () => {
  test('Catalog search filters matching and non-matching products', async ({ greenKart }) => {
    const { catalog } = greenKart;
    await catalog.openCatalog();
    const initialProductCount = await catalog.productHeadings.count();
    expect(initialProductCount).toBeGreaterThan(1);

    await catalog.searchFor('Apple');
    await expect(catalog.productHeadings).toHaveCount(1);
    await expect(catalog.productHeadings).toHaveText('Apple - 1 Kg');

    await catalog.searchFor('not-a-real-vegetable-xyz');
    await expect(catalog.productHeadings).toHaveCount(0);
    await expect(catalog.noResultsMessage).toBeVisible();

    await catalog.clearSearch();
    await expect(catalog.productHeadings).toHaveCount(initialProductCount);
  });
});
