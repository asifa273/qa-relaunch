const { test, expect } = require('@playwright/test');
const assert = require('node:assert');
const { log } = require('node:console');

test('Sauce Demo Login Failure', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.saucedemo.com/");
    console.log(await page.title());
    const userName = page.locator('[data-test="username"]');
    const password = page.locator('[data-test="password"]');
    await userName.fill("_user");
    await password.fill("_sauce");
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('input[data-test="username"].error')).toBeVisible();
    await expect(page.locator('input[data-test="password"].error')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');



});
test.only('Sauce Demo Login Pass', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.saucedemo.com/");
    console.log(await page.title());
    const userName = page.locator('[data-test="username"]');
    const password = page.locator('[data-test="password"]');
    await userName.fill("standard_user");
    await password.fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('div.app_logo').textContent('Swag Labs'));
    const cardTitles = await page.locator('[data-test="inventory-item-name"]');
    await cardTitles.nth(0).textContent();
    await expect(cardTitles.nth(0)).toContainText('Sauce Labs Backpack');
    const allCardTitles = await cardTitles.allTextContents();
    console.log(allCardTitles);


});