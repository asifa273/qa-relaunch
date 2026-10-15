const { test, expect } = require('@playwright/test');
require('dotenv').config();

// TEST 1: signIn flow → navigates to shop
test('@Web SignIn succeeds and navigates to shop', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    const credentialHint = await page.locator('p').filter({ hasText: /username is/i }).innerText();
    const [, hintedUsername, hintedPassword] = credentialHint.match(/username is\s+(.+?)\s+and password is\s+(.+?)\s*\)?$/i) ?? [];
    const practiceUsername = process.env.LOGIN_PRACTICE_USERNAME || hintedUsername;
    const practicePassword = process.env.LOGIN_PRACTICE_PASSWORD || hintedPassword;
    if (!practiceUsername || !practicePassword) {
        throw new Error('Practice login credentials were not configured or displayed on the page.');
    }

    await page.getByRole('textbox', { name: 'Username:' }).fill(practiceUsername);
    await page.getByRole('textbox', { name: 'Password:' }).fill(practicePassword);

    await expect(page.getByRole('radio', { name: 'Admin' })).toBeChecked();
    await page.getByRole('radio', { name: 'User' }).check();

    // dismiss the modal
    await expect(page.getByText('You will be limited to only fewer functionalities')).toBeVisible();
    await page.getByRole('button', { name: 'Okay' }).click();
    await expect(page.locator('#myModal')).toBeHidden();

    await page.getByRole('combobox').selectOption('consult');
    await page.getByRole('checkbox', { name: 'I Agree to the terms and' }).check();

    await page.getByRole('button', { name: 'Sign In' }).click();   // ← the missing step

    await expect(page).toHaveURL(/angularpractice\/shop/);
    await expect(page).toHaveTitle('ProtoCommerce');
    await context.close();
});

// TEST 2: child window / new tab handling
test('@Web Blinking Text opens a new tab', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    const documentLink = page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all([   // ← destructure!
        context.waitForEvent('page'),
        documentLink.click(),
    ]);

    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL(/documents-request/);   // assert on the NEW tab
    await newPage.close();
    await context.close();
});


