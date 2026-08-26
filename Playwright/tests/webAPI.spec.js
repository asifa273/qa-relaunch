const { test, expect, request } = require('@playwright/test');
const fs = require('fs');

const loginPayload = { userEmail: 'asifatesting@gmail.com', userPassword: 'PassAug19!' };
const orderPayload = { orders: [{ country: 'India', productOrderedId: '6262e95ae26b7e1a10e89bf0' }] };
let orderId;
let token;
test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
        data: loginPayload
    });
    //ok is for 200 response 
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseBody = await loginResponse.json();
    console.log('Login Response Body:', loginResponseBody);
    token = loginResponseBody.token;
    console.log('Token:', token);

    const orderResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
        data: orderPayload,
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    });
    const orderResponseBody = await orderResponse.json();
    orderId = orderResponseBody.orders[0];
    console.log('Order ID:', orderId);
    console.log('Order Response:', await orderResponse.json());

});

// Actual test --- Login ---
test('Login API Test', async ({ page }) => {
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);
    await page.goto('https://rahulshettyacademy.com/client/#/dashboard');
    await expect(page).toHaveURL(/dashboard/);
    console.log('Shop Dashboard Title is:', await page.title());

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    // await page.getByRole('textbox', { name: 'Email' }).fill('asifatesting@gmail.com');
    // await page.getByRole('textbox', { name: 'enter your passsword' }).fill('PassAug19!');
    // await page.getByRole('button', { name: 'Login' }).click();

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




