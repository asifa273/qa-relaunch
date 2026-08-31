const { test, expect, request } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const loginPayload = { userEmail: 'asifatesting@gmail.com', userPassword: 'PassAug19!' };
const orderPayload = { orders: [{ country: 'India', productOrderedId: '67a8dde5c0d3e6622a297cc8' }] };

let orderId;
let token;

test.beforeAll(async () => {
    const apiContext = await request.newContext();

    // --- Login ---
    const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
        data: loginPayload
    });
    console.log('Login response status:', loginResponse.status());
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseBody = await loginResponse.json();
    token = loginResponseBody.token;
    console.log('Token:', token);

    // --- Create order ---
    const orderResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
        data: orderPayload,
        headers: {
            Authorization: token,
            'Content-Type': 'application/json'
        }
    });
    console.log('Order response status:', orderResponse.status());
    const orderResponseBody = await orderResponse.json();
    console.log('Order response body:', orderResponseBody);

    expect(orderResponse.ok()).toBeTruthy();
    orderId = orderResponseBody.orders[0];
    console.log('Order ID:', orderId);

    await apiContext.dispose();
});

test('Login API Test', async ({ page }) => {
    // Inject the token so we land on the dashboard already authenticated
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    await page.goto('https://rahulshettyacademy.com/client/#/dashboard');
    await expect(page).toHaveURL(/dashboard/);
    console.log('Shop Dashboard Title is:', await page.title());

    // --- Go to order history and open the order that matches the API-created orderId ---
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator('tbody').waitFor();

    const rows = page.locator('tbody tr');
    const rowCount = await rows.count();
    let matched = false;

    for (let i = 0; i < rowCount; i++) {
        const rowOrderId = (await rows.nth(i).locator('th').textContent()).trim();
        // orderId is the FULL id; rowOrderId is what's shown in the table row.
        // Check whether the known orderId contains the row's (possibly truncated) id,
        // not the other way around.
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator('button').first().click();
            matched = true;
            break;
        }
    }
    expect(matched, `Order ${orderId} not found in order history`).toBeTruthy();

    // --- On the order details page — grab the invoice number ---
    const pageInvoiceText = await page.locator('.em-spacer-1, td.content-wrap').first().innerText();
    const invoiceMatch = pageInvoiceText.match(/[0-9a-f]{24}/);
    expect(invoiceMatch, 'No 24-char invoice id found on the page').toBeTruthy();
    const invoice = invoiceMatch[0];
    console.log('Invoice from page:', invoice);

    // --- Download the CSV ---
    const downloadPromise = page.waitForEvent('download');
    await page.getByText('Click To Download Order Details in CSV').click();
    const download = await downloadPromise;
    const csvPath = path.join(__dirname, 'order.csv');
    await download.saveAs(csvPath);

    const csvContent = fs.readFileSync(csvPath, 'utf8');
    console.log('CSV content:\n', csvContent);

    const rowsCsv = csvContent
        .split('\n')
        .map(r => r.trim())
        .filter(Boolean)
        .map(r => r.split(','));

    // --- Cross-verify the invoice number captured from the page against the CSV ---
    const invoiceFoundInCsv = rowsCsv.some(row => row.some(cell => cell.includes(invoice)));
    expect(invoiceFoundInCsv, `Invoice "${invoice}" not found in CSV`).toBeTruthy();
    console.log(`Invoice "${invoice}" found in CSV:`, invoiceFoundInCsv);
});