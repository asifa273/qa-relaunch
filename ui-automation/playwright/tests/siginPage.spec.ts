import { expect, test, type Page } from '@playwright/test';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

type User = {
    practiceUsername: string;
    practicePassword: string;
}

// TEST 1: signIn flow → navigates to shop
test('@Web SignIn succeeds and navigates to shop', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    const practiceUsername = process.env.LOGIN_PRACTICE_USERNAME || 'rahulshettyacademy';
    const practicePassword = process.env.LOGIN_PRACTICE_PASSWORD || 'learning';

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

    await page.locator('#signInBtn').click();
    await page.waitForLoadState('load');

    // 2. Validate URL and Title
    await expect(page).toHaveURL(/.*angularpractice\/shop/, { timeout: 15000 });
    await expect(page).toHaveTitle('ProtoCommerce', { timeout: 15000 });

    // Wait for products to mount
    await expect(page.locator('app-card-list app-card').first()).toBeVisible({ timeout: 15000 });

    const protoCommerceTitle = await page.title();
    console.log(protoCommerceTitle);

    await page.screenshot({
        path: 'screenshots/SignInsucceedsandnavigatesto-shopProtoCommerce-message.png',
        fullPage: true
    });
});

// TEST 2: child window / new tab handling
test('@Web Blinking Text opens a new tab', async ({ page, context }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    const documentLink = page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click(),
    ]);

    await newPage.waitForLoadState('load');
    await newPage.waitForLoadState('networkidle');

    await expect(newPage.getByRole('heading', { name: 'DOCUMENTS REQUEST' })).toBeVisible();

    const documentsrequestTitle = await newPage.title();
    console.log(documentsrequestTitle);

    await newPage.screenshot({
        path: 'screenshots/BlinkingTextopensanewTab-documentsrequestTitle-message.png',
        fullPage: true
    });
    await newPage.close();
});