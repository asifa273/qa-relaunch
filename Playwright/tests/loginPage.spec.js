const { test, expect } = require('@playwright/test');


// TEST 1: login flow → navigates to shop
test('login succeeds and navigates to shop', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    await page.getByRole('textbox', { name: 'Username:' }).fill('rahulshettyacademy');
    await page.getByRole('textbox', { name: 'Password:' }).fill('Learning@830$3mK2');

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
    console.log('SignIn navigated to Proto COmmerce URL:', page.url());
});

// TEST 2: child window / new tab handling
test('Blinking Text opens a new tab', async ({ browser }) => {
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
    console.log('Blinking Text navigated to New tab URL:', newPage.url());
    // await newPage.close();
});


/*
const { test, expect } = require('@playwright/test');
const console = require('node:console');
test('login Pass', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    // await expect(page.getByText('Username:')).toBeVisible();
    await expect(page.getByLabel('Username:')).toBeVisible();

    const username = page.getByRole('textbox', { name: 'Username:' });
    const password = page.getByRole('textbox', { name: 'Password:' });

    await username.fill('rahulshettyacademy');
    await expect(username).toHaveValue('rahulshettyacademy');
    console.log('Username entered:', await username.inputValue());

    await password.fill('Learning@830$3mK2');
    await expect(password).toHaveValue('Learning@830$3mK2');
    console.log('Password entered:', await password.inputValue());

    // Admin radio is checked by default
    const adminCheckbox = page.getByRole('radio', { name: 'Admin' });
    //page.locator('label').filter({ hasText: 'Admin' });

    await expect(adminCheckbox).toBeChecked();
    console.log('Admin radio button is default checked?', await adminCheckbox.isChecked());

    // switch to User radio button to check
    const userRadio = page.getByRole('radio', { name: 'User' });
    await userRadio.check();
    await expect(userRadio).toBeChecked();
    console.log('User radio checked?', await userRadio.isChecked());

    //PopUp Modal opens when checking radio buttons
    await expect(page.getByText('You will be limited to only fewer functionalities of the app. Proceed? Cancel')).toBeVisible();
    await page.getByRole('button', { name: 'Cancel' }).click();
    await userRadio.check();
    await expect(page.getByText('You will be limited to only fewer functionalities of the app. Proceed? Cancel')).toBeVisible();
    await page.getByRole('button', { name: 'Okay' }).click();


    //Dropdown select Options
    const dropdownOptions = page.getByRole('combobox');
    await expect(dropdownOptions).toBeVisible();
    // const dropdownOptions = ['Student', 'Teacher', 'Consultant']
    await dropdownOptions.selectOption('teach');
    await dropdownOptions.click();
    await dropdownOptions.selectOption('consult');
    await dropdownOptions.selectOption('stud');
    console.log('Selected Dropdown is :', await dropdownOptions.isVisible());

    //Terms & conditions Checkbox
    const termsCheckbox = page.getByRole('checkbox', { name: 'I Agree to the terms and' })
    await termsCheckbox.isVisible();
    await termsCheckbox.check();
    await expect(termsCheckbox).toBeChecked();
    console.log('Is termsCheckbox selected ?', await termsCheckbox.isChecked());

    //SignIN Submit
    const signIn = page.getByRole('button', { name: 'Sign In' });
    await signIn.click();
    // await Promise.all([
    //     page.waitForURL('https://rahulshettyacademy.com/angularpractice/shop'),
    //     page.getByRole('button', { name: 'Sign In' }).click(),
    // ]);
    await page.waitForURL('https://rahulshettyacademy.com/angularpractice/shop');
    await expect(page).toHaveURL('https://rahulshettyacademy.com/angularpractice/shop');
    await expect(page).toHaveTitle('ProtoCommerce');
    console.log('New Page Title: ', await page.url());

    



});

*/
