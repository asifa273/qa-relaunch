import { test, expect } from '@playwright/test';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { requireEnv } from '../utils/requireEnv';

const registrationEmail: string = process.env.SHOP_NEW_REGISTRATION_EMAIL ?? '';
const registrationPassword: string = process.env.SHOP_NEW_REGISTRATION_PASSWORD ?? '';
const shopEmail: string = process.env.SHOP_EMAIL ?? '';
const shopPassword: string = process.env.SHOP_PASSWORD ?? '';

// ============================================================================
// Test 1 — Registration: fill the form, confirm success + navigate to login
// ============================================================================
test.skip('@Web User Register Form', async ({ browser }) => {
  requireEnv(test, 'SHOP_NEW_REGISTRATION_EMAIL', 'SHOP_NEW_REGISTRATION_PASSWORD');
  const context = await browser.newContext({ viewport: { width: 1600, height: 1000 } });
  const page = await context.newPage();

  await page.goto('https://rahulshettyacademy.com/client/#/auth/register');

  await page.getByLabel('First Name').fill('Testing');
  await page.getByLabel('Last Name').fill('Asifa');
  await page.getByRole('textbox', { name: 'Email' }).fill(registrationEmail);
  await page.getByRole('textbox', { name: 'enter your number' }).fill('9876543210');

  const dropdownOption = page.getByRole('combobox');
  await dropdownOption.selectOption('Scientist');
  await expect(dropdownOption).toHaveValue('4: Scientist');

  await page.getByRole('radio', { name: 'Female' }).click();
  await expect(page.getByRole('radio', { name: 'Female' })).toBeChecked();

  await page.getByRole('textbox', { name: 'Passsword' }).fill(registrationPassword);
  await page.getByRole('textbox', { name: 'Confirm Password' }).fill(registrationPassword);

  await page.getByRole('checkbox').check();
  await expect(page.getByRole('checkbox')).toBeChecked();

  await page.getByRole('button', { name: 'Register' }).click();

  const successScreen = page.locator('.hero-primary').and(page.getByText('Account Created Successfully'));
  await successScreen.waitFor();
  await expect(successScreen).toBeVisible();

  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/\/auth\/login/);
  await context.close();
});

// ============================================================================
// Test 2 — Login, add products to cart, checkout, and verify CSV invoice
// ============================================================================
test('@Web Login, add every product to the cart, cross-verify the count 3 ways', async ({ browser }) => {
  requireEnv(test, 'SHOP_EMAIL', 'SHOP_PASSWORD');
  const context = await browser.newContext({ viewport: { width: 1600, height: 1000 } });
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

  // --- Login ---
  await page.getByRole('textbox', { name: 'Email' }).fill(shopEmail);
  await page.getByRole('textbox', { name: 'enter your passsword' }).fill(shopPassword);
  await page.getByRole('button', { name: 'Login' }).click();

  // --- Dashboard & Product Verification ---
  await expect(page.locator('#products')).toBeVisible();
  await page.locator('.card-body b').first().waitFor();

  const names: string[] = await page.locator('.card-body b').allTextContents();
  expect(names).toEqual(['ADIDAS ORIGINAL', 'ZARA COAT 3', 'iphone 13 pro']);

  // Match and parse showing results count safely
  const resultText: string | null = await page.locator('#res').textContent();
  const digitMatch: RegExpMatchArray | null = resultText ? resultText.match(/\d+/) : null;
  expect(digitMatch).not.toBeNull();
  const shown: number = parseInt(digitMatch![0], 10);
  expect(shown).toBe(names.length);

  // --- Add Products to Cart ---
  let added: number = 0;
  for (const name of names) {
    await page.locator('.card-body')
      .filter({ hasText: name })
      .getByRole('button', { name: 'Add To Cart' })
      .click();
    added++;
  }

  // --- Cross-verify #1: Badge count ---
  const cartBadge = page.locator('button[routerlink="/dashboard/cart"] label');
  // Wait for any active 'Product Added To Cart' overlay to detach before checking badge
  await page.locator('.ngx-toastr').waitFor({ state: 'hidden' }).catch(() => { });
  await expect(cartBadge).toHaveText(String(added));

  // --- Open Cart ---
  await page.locator('button[routerlink="/dashboard/cart"]').click();
  await expect(page).toHaveURL(/cart/);
  await expect(page.getByText('My Cart')).toBeVisible();

  // --- Cross-verify #2: Item count & names ---
  const cartRows = page.getByRole('button', { name: 'Buy Now' });
  await expect(cartRows).toHaveCount(added);
  const productName: string[] = await page.locator('.cartSection h3').allTextContents();
  expect([...productName].sort()).toEqual([...names].sort());

  // --- Checkout & Payment Details ---
  await page.getByRole('button', { name: 'Checkout' }).click();
  await expect(page).toHaveURL(/order/);
  await expect(page.locator('.payment')).toBeVisible();

  const paymentMethods: string[] = await page.locator('.payment__types').allTextContents();
  expect(paymentMethods).toEqual(['Credit CardPaypalSEPAInvoice']);

  await expect(page.getByText('Credit Card Number')).toBeVisible();
  await page.getByRole('textbox').first().fill('4111 1111 1111 1111');
  await expect(page.getByText('Expiry Date')).toBeVisible();
  await page.getByRole('combobox').first().selectOption('12');
  await page.locator('select.ddl').last().selectOption('31');
  await expect(page.getByText('CVV Code ?')).toBeVisible();
  await page.getByRole('textbox').nth(1).fill('123');
  await expect(page.getByText('Name on Card')).toBeVisible();
  await page.getByRole('textbox').nth(2).fill('Testxfirst Testxlast');
  await expect(page.getByText('Apply Coupon').first()).toBeVisible();
  await page.locator('input[name="coupon"]').fill('2026');

  // --- Shipping & Submit ---
  await expect(page.getByText('Shipping Information')).toBeVisible();
  await page.getByRole('textbox').nth(4).fill(shopEmail);
  const country = page.getByPlaceholder('Select Country');
  await country.click();
  await country.pressSequentially('United', { delay: 100 });
  await page.getByText('United States', { exact: true }).waitFor();
  await page.getByText('United States', { exact: true }).click();
  await page.locator('a.action__submit').filter({ hasText: 'Place Order' }).click();

  // --- Confirmation & Invoice Capture ---
  await expect(page).toHaveURL(/thanks/);
  await expect(page.locator('h1.hero-primary').and(page.getByText('Thankyou for the order.'))).toBeVisible();

  const productSummary = page.locator('.order-summary');
  await expect(productSummary.getByText('ADIDAS ORIGINAL')).toBeVisible();
  await expect(productSummary.getByText('ZARA COAT 3')).toBeVisible();
  await expect(productSummary.getByText('iphone 13 pro')).toBeVisible();

  const pageInvoiceText: string = await page.locator('.em-spacer-1, td.content-wrap').first().innerText();
  const invoiceMatch: RegExpMatchArray | null = pageInvoiceText.match(/[0-9a-f]{24}/);
  expect(invoiceMatch, 'Expected a 24-character invoice id on the order page').not.toBeNull();

  const invoice: string = invoiceMatch![0];

  // --- CSV Download & File System Operations ---
  const downloadPromise = page.waitForEvent('download');
  await page.getByText('Click To Download Order Details in CSV').click();
  const download = await downloadPromise;
  const csvPath: string = path.join(__dirname, 'order.csv');
  await download.saveAs(csvPath);

  const csvContent: string = fs.readFileSync(csvPath, 'utf8');
  const rows: string[][] = csvContent
    .split('\n')
    .map(r => r.trim())
    .filter(Boolean)
    .map(r => r.split(','));

  // --- CSV Verification ---
  for (const name of names) {
    const foundInCsv: boolean = rows.some((row: string[]) => row.some((cell: string) => cell.includes(name)));
    expect(foundInCsv, `Product "${name}" not found in CSV`).toBeTruthy();
  }

  const invoiceFoundInCsv: boolean = rows.some((row: string[]) => row.some((cell: string) => cell.includes(invoice)));
  expect(invoiceFoundInCsv, `Invoice "${invoice}" not found in CSV`).toBeTruthy();

  await context.close();
});