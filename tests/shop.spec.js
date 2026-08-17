import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/angularpractice/shop');
  await page.getByRole('link', { name: 'Category 2' }).click();
  await page.getByRole('checkbox', { name: 'Check me out if you Love' }).check();
});