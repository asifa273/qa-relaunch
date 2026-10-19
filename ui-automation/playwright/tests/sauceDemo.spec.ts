import { expect, test, type Page } from '@playwright/test';
// test.describe.configure({ mode: 'parallel' });


test('@Web Sauce Demo Login Failure', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.saucedemo.com/");
    const userName = page.locator('[data-test="username"]');
    const password = page.locator('[data-test="password"]');
    await userName.fill("_user");
    await password.fill("_sauce");
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('input[data-test="username"].error')).toBeVisible();
    await expect(page.locator('input[data-test="password"].error')).toBeVisible();
    const errorMessage = await page.locator('[data-test="error"]').textContent();
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
    const errorLocator = await page.locator('[data-test="error"]');
    console.log(errorMessage);
    await errorLocator.screenshot({ path: 'screenshots/SauceDemoLoginFailure-error-message.png' });



});
test('@Web Sauce Demo Login Pass', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.saucedemo.com/");

    const userName = page.locator('[data-test="username"]');
    const password = page.locator('[data-test="password"]');

    await userName.fill("standard_user");
    await password.fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();

    await expect(page.locator('div.app_logo')).toHaveText('Swag Labs');

    const cardTitles = page.locator('[data-test="inventory-item-name"]');

    await cardTitles.nth(0).textContent();
    await expect(cardTitles.nth(0)).toContainText('Sauce Labs Backpack');

    const allCardTitles = await cardTitles.allTextContents();
    expect(allCardTitles).toContain('Sauce Labs Backpack');
    console.log(allCardTitles);

    await page.screenshot({ path: 'screenshots/SauceDemoLoginPass-message.png', fullPage: true });
    const title = await page.title();
    console.log(title);


});