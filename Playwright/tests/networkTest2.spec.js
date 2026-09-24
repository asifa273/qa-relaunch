const { test, expect } = require('@playwright/test');

test('Security test request intercept', async ({ page }) => {
    //login and reacg to orders page
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.getByRole('textbox', { name: 'Email' }).fill('REDACTED_EMAIL');
    await page.getByRole('textbox', { name: 'Passsword' }).fill('REDACTED_PASSWORD');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').first().waitFor();
    // const names = await page.locator('.card-body b').allTextContents();
    await page.getByRole('button', { name: 'ORDERS' }).click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' }))
    await page.getByRole("button", { name: "View" }).first().click();
    await expect(page.getByText('You are not authorize to view this order')).toBeVisible();


})