const { test, expect } = require('@playwright/test');

test.describe.configure({ mode: 'serial' });
const registeredEmail = `Testdummy${Date.now()}@ymail.com`;
const fs = require('fs');
const path = require('path');

// ============================================================================
// Test 1 — Registration: fill the form, confirm the success screen + nav to login
// ============================================================================
test('User Register Form', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 1600, height: 1000 } });
  const page = await context.newPage();

  // Surface the site's own JS errors (e.g. the occupation setValue bug) without failing the test.
  page.on('pageerror', (err) => console.log('PAGE ERROR (app-side):', err.message));

  await page.goto('https://rahulshettyacademy.com/client/#/auth/register');
  console.log('Title:', await page.title());

  // -- First & Last Name, Email, Phone --
  // Unique email each run so re-registration doesn't fail on "already registered".
  const email = registeredEmail;
  await page.getByLabel('First Name').fill('Testxfirst');
  await page.getByLabel('Last Name').fill('Testxlast');
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('textbox', { name: 'enter your number' }).fill('9876543210');
  console.log('Registering with:', email);

  // -- Occupation -- pick ONE option (cycling every option fires the app's buggy change handler).
  const dropdownOption = page.getByRole('combobox');
  await dropdownOption.selectOption('Scientist');
  await expect(dropdownOption).toHaveValue('4: Scientist');

  // -- Gender --
  await page.getByRole('radio', { name: 'Female' }).click();
  await expect(page.getByRole('radio', { name: 'Female' })).toBeChecked();

  // -- Password / Confirm Password --
  await page.getByRole('textbox', { name: 'Passsword' }).fill('PassAug19!');
  await page.getByRole('textbox', { name: 'Confirm Password' }).fill('PassAug19!');

  // -- Checkbox --
  await page.getByRole('checkbox').check();
  await expect(page.getByRole('checkbox')).toBeChecked();

  // -- Register --
  await page.getByRole('button', { name: 'Register' }).click();

  // The "Registered Successfully" toast is transient; anchor on the stable success screen.
  await expect(page.getByText('Account Created Successfully')).toBeVisible({ timeout: 15000 });
  console.log('Success screen shown: Account Created Successfully');

  // -- Continue to Login --
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/\/auth\/login/);
  console.log('Navigated to login page:', page.url());



  // ============================================================================
  // Test 2 — Login, add every product to the cart, cross-verify the count 3 ways
  // ============================================================================

  // --- Login ---
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('textbox', { name: 'enter your passsword' }).fill('PassAug19!');
  await page.getByRole('button', { name: 'Login' }).click();

  // App navigates to the dashboard on successful login (assert instead of a fragile toast).
  await expect(page).toHaveURL(/dashboard/);
  console.log('Shop Dashboard Title is:', await page.title());

  // --- On the products page ---
  await expect(page.locator('#products')).toBeVisible();
  await page.locator('.card-body b').first().waitFor();

  // List + verify products (clean names come from the <b> tag, not the whole card).
  const names = await page.locator('.card-body b').allTextContents();
  console.log('Products:', names);   // ['ADIDAS ORIGINAL', 'ZARA COAT 3', 'iphone 13 pro']
  expect(names).toEqual(['ADIDAS ORIGINAL', 'ZARA COAT 3', 'iphone 13 pro']);

  // Also cross-check against the "Showing N results" label.
  const resultText = await page.locator('#res').textContent();
  const shown = parseInt(resultText.match(/\d+/)[0], 10);
  expect(shown).toBe(names.length);

  // --- ONE add loop = single source of truth for `added` ---
  // Filter on .card-body (holds the buttons), NOT .card-body b (just the name text).
  let added = 0;
  for (const name of names) {
    await page.locator('.card-body')
      .filter({ hasText: name })
      .getByRole('button', { name: 'Add To Cart' })
      .click();
    added++;
  }
  console.log('Items added:', added);   // 3

  // --- Cross-verify #1: header badge count, BEFORE leaving the page ---
  const cartBadge = page.locator('button[routerlink="/dashboard/cart"] label');
  await expect(cartBadge).toHaveText(String(added));   // '3' (toHaveText needs a string)
  console.log('Badge matches items added:', added);

  // --- Open the cart ---
  // Use the routerlink locator: getByRole('button', {name:'Cart'}) also matches the
  // three "Add To Cart" buttons (substring match) and throws a strict-mode error.
  await page.locator('button[routerlink="/dashboard/cart"]').click();
  await expect(page).toHaveURL(/cart/);
  await expect(page.getByText('My Cart')).toBeVisible();

  // --- Cross-verify #2: one row per cart item ---
  // NOTE: .cartSection resolves to 9 (3 sub-blocks per item), so it's NOT the row.
  // Count the "Buy Now" button instead — exactly one per cart item.
  const cartRows = page.getByRole('button', { name: 'Buy Now' });
  await expect(cartRows).toHaveCount(added);   // 3
  console.log('Rows in cart:', await cartRows.count());
  // --Cross Verify the Product name
  const productName = await page.locator('.cartSection h3').allTextContents();
  console.log('Product Name in Cart:', productName);
  expect(productName).toEqual(names);



  // ============================================================================
  // Test 3 — Checkout, add every product to the cart, cross-verify the count 3 ways
  // ============================================================================

  // --- Checkout ---
  await page.getByRole('button', { name: 'Checkout' }).click();
  await expect(page).toHaveURL(/order/);
  await expect(page.locator('.payment')).toBeVisible();

  // --- Payment Method ---
  const paymentMethods = await page.locator('.payment__types').allTextContents();
  console.log('Payment Methods:', paymentMethods);
  expect(paymentMethods).toEqual(['Credit CardPaypalSEPAInvoice']);

  // -- Select a payment method (Credit Card) and fill the form --
  await expect(page.getByText('Credit Card Number')).toBeVisible();
  await page.getByRole('textbox').first().fill('4111 1111 1111 1111');
  await page.getByText('Expiry Date').isVisible();
  await page.getByRole('combobox').first().selectOption('12');
  await page.locator('select.ddl').last().selectOption('31');
  await expect(page.getByText('CVV Code ?')).toBeVisible();
  await page.getByRole('textbox').nth(1).fill('123');
  await expect(page.getByText('Name on Card')).toBeVisible();
  await page.getByRole('textbox').nth(2).fill('Testxfirst Testxlast');
  await expect(page.getByText('Apply Coupon').first()).toBeVisible();
  await page.locator('input[name="coupon"]').fill('2026');
  // await page.getByRole('button', { name: 'Apply Coupon' }).click();

  // --- Shipping Information + Place Order ---
  await expect(page.getByText('Shipping Information')).toBeVisible();
  await page.getByRole('textbox').nth(4).fill(email);
  const country = page.getByPlaceholder('Select Country');
  await country.click();
  await country.pressSequentially('United', { delay: 100 });
  await page.getByText('United States', { exact: true }).waitFor();
  await page.getByText('United States', { exact: true }).click();
  await page.locator('a.action__submit').filter({ hasText: 'Place Order' }).click();

  // --- Cross-verify #3: order summary + thank-you message ---
  await expect(page).toHaveURL(/thanks/);
  await expect(page.locator('h1.hero-primary').and(page.getByText('Thankyou for the order.'))).toBeVisible();
  const productSummary = page.locator('.order-summary');   // ✅ this is a LOCATOR (no await)
  await expect(productSummary.getByText('ADIDAS ORIGINAL')).toBeVisible();
  // or simpler:
  await expect(productSummary).toContainText('ADIDAS ORIGINAL');
  console.log('Order Summary:', productSummary);
  await expect(productSummary.getByText('ADIDAS ORIGINAL')).toBeVisible();
  await expect(productSummary.getByText('ZARA COAT 3')).toBeVisible();
  await expect(productSummary.getByText('iphone 13 pro')).toBeVisible();

  // 1. Grab the invoice numbers shown on the CURRENT PAGE
  const pageInvoiceText = await page.locator('.em-spacer-1, td.content-wrap').first().innerText();
  const invoice = pageText.match(/[0-9a-f]{24}/)[0];   // first 24-char id on the page
  await expect(text).toContain(invoice);        // the 24-char hex ids
  console.log('invoice from page:', invoice);
  console.log('is it in the CSV?', text.includes(invoice));
  await expect(text).toContain(invoice);
  // 1. Download the CSV
  const downloadPromise = page.waitForEvent('download');
  await page.getByText('Click To Download Order Details in CSV').click();
  const download = await downloadPromise;
  await download.saveAs('order.csv');

  // 2. Read the file as text
  const text = fs.readFileSync('order.csv', 'utf8');

  // 3. Check the product name is in the file
  expect(text).toContain('ZARA COAT 3');

  // 4. Check the invoice number is in the file
  expect(text).toContain('6a8c8fbb21054ba465ef623d');
});




