const { expect } = require('@playwright/test');
const { customtest } = require("./utils/fixtures.js");

customtest('Fixtures Demo', async ({ authenticatedPage, createOrder }) => {
    await authenticatedPage.goto("https://rahulshettyacademy.com/client");
    //reuse= login, create order, verify order is created from history page

    await authenticatedPage.locator('.card-body b').first().waitFor();
    await authenticatedPage.getByRole('button', { name: 'ORDERS' }).click();
    // await authenticatedPage.locator('.card-body b').first().waitFor();
    await expect(authenticatedPage.getByText(createOrder.orderId)).toBeVisible();

});
