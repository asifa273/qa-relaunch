const { test, expect } = require('@playwright/test');

test('removing one cart item leaves the other three', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/angularpractice/shop');

    const productsToAdd = ['iphone X', 'Samsung Note 8', 'Nokia Edge', 'Blackberry'];
    for (const name of productsToAdd) {
        await page.locator('.card', { hasText: name }).getByRole('button', { name: 'Add' }).click();
        console.log(`Added: ${name}`);
    }

    await page.locator('a.nav-link.btn.btn-primary').click();
    console.log('Navigated to cart');

    const rowFor = (name) => page.getByRole('row', { name: new RegExp(name) });

    // all 4 present
    for (const name of productsToAdd) {
        await expect(rowFor(name)).toBeVisible();
        console.log(`✓ Present in cart: ${name}`);
    }
    console.log(`✓ All ${productsToAdd.length} items present`);

    // remove one
    const removed = 'Nokia Edge';
    await rowFor(removed).getByRole('button').click();
    console.log(`Clicked Remove on: ${removed}`);

    // removed item is gone
    await expect(rowFor(removed)).toHaveCount(0);
    console.log(`✓ Removed item NOT displayed: ${removed}`);

    // the other 3 are still displayed
    const remaining = productsToAdd.filter(p => p !== removed);
    for (const name of remaining) {
        await expect(rowFor(name)).toBeVisible();
        console.log(`✓ Still displayed: ${name}`);
    }
    console.log(`✓ Remaining ${remaining.length} items displayed correctly`);
});