const { test, expect } = require('@playwright/test');
require('dotenv').config();

const practiceUsername = process.env.PRACTICE_USERNAME;
const practicePassword = process.env.PRACTICE_PASSWORD;
const practiceFormName = process.env.PRACTICE_FORM_NAME;
const practiceFormEmail = process.env.PRACTICE_FORM_EMAIL;
const practiceFormPassword = process.env.PRACTICE_FORM_PASSWORD;

//By providing {page} , we can skipp prvoding Context and New page , so playwright can go to website directly
//async()=> is called a anonomous function, 
//{page} is called fixture
//By providing {browser} , we prvode explicitly Context and New page , so playwright can act as per provided
//javascript - asynchronous - execute all steps together, or explicit tell step1 is completed, so give await
test('login Page Practise', async ({ browser }) =>
//function() is called anonomous function so write as async()=>
//({browser}) is called fixture
{
    //chrome - plugins/cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    // page.route('**/*.css', route => route.abort());
    // page.route('**/*.{jpg,png,ipeg}', route => route.abort());
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    const userName = page.locator('Input#username');
    const signIn = page.locator('#signInBtn');
    const cardTitles = page.locator('.card-body a');
    const checkboxAgree = page.locator('#terms');

    //playwright support css selector heavily than xpath
    // await page.getByRole('textbox', { name: 'Password:' }).click();
    await userName.fill(practiceUsername);
    await page.locator("[type='password']").fill(practicePassword);
    //await page.pause();

    await page.locator(":text-is('User')").click();
    await page.getByText('You will be limited to only fewer functionalities of the app. Proceed? Cancel').click();
    await page.getByRole('button', { name: 'Cancel' }).click();
    await page.locator(":text-is('User')").click();
    await page.getByText('You will be limited to only fewer functionalities of the app. Proceed? Cancel').click();
    await page.getByRole('button', { name: 'Okay' }).click();

    const dropdown = page.getByRole('combobox');
    await dropdown.selectOption('teach');
    await expect(dropdown).toHaveValue('teach');
    await dropdown.selectOption('consult');
    await expect(dropdown).toHaveValue('consult');
    await dropdown.selectOption('stud');
    await expect(dropdown).toHaveValue('stud');

    await page.getByText('I Agree to the terms and conditions Sign In').click();
    await page.getByText('I Agree to the terms and').click();
    await page.getByRole('checkbox', { name: 'I Agree to the terms and' }).uncheck();
    await page.getByRole('link', { name: 'terms and conditions' }).click();
    await page.getByRole('checkbox', { name: 'I Agree to the terms and' }).check();
    await page.getByRole('button', { name: 'Sign In' }).click();





    //login Page takes to 'angularpracticeshop' for adding items in cart
    await page.goto('https://rahulshettyacademy.com/angularpractice/shop');
    await expect(page.locator('app-navbar')).toBeVisible();
    await expect(page.getByRole('link', { name: 'ProtoCommerce Home', exact: true })).toBeVisible();
    await page.getByRole('link', { name: 'ProtoCommerce', exact: true }).click();
    await page.getByRole('link', { name: 'Home' }).click();
    await page.getByRole('link', { name: 'Shop' }).click();
    await page.getByRole('link', { name: 'ProtoCommerce Home' }).click();
    await page.getByRole('link', { name: 'Shop' }).click();
    await page.getByText('Checkout ( 0 ) (current)').click();
    await expect(page.getByText('Checkout ( 0 ) (current)')).toHaveCount(0);
    await page.getByRole('link', { name: 'ProtoCommerce Home' }).click();
    await page.getByRole('link', { name: 'Shop' }).click();
    await page.getByRole('heading', { name: 'Shop Name' }).click();
    await page.getByRole('link', { name: 'Category 1' }).click();
    await page.getByRole('link', { name: 'Shop' }).click();
    await page.getByRole('link', { name: 'Category 2' }).click();
    await page.getByRole('link', { name: 'Shop' }).click();
    await page.getByRole('link', { name: 'Category 3' }).click();
    await page.getByRole('link', { name: 'Shop' }).click();
    await page.getByRole('img', { name: 'Third slide' }).click();
    await page.getByText('Previous Next iphone X $24.99').click();
    await page.locator('app-card').filter({ hasText: 'iphone X $24.99 Lorem ipsum' }).click();
    await page.locator('app-card').filter({ hasText: 'Samsung Note 8 $24.99 Lorem' }).click();
    await page.locator('app-card').filter({ hasText: 'Nokia Edge $24.99 Lorem ipsum' }).click();
    await page.locator('app-card').filter({ hasText: 'Blackberry $24.99 Lorem ipsum' }).click();
    await page.locator('app-card').filter({ hasText: 'iphone X $24.99 Lorem ipsum' }).getByRole('button').click();
    await page.locator('app-card').filter({ hasText: 'Samsung Note 8 $24.99 Lorem' }).getByRole('button').click();
    await page.locator('app-card').filter({ hasText: 'Nokia Edge $24.99 Lorem ipsum' }).getByRole('button').click();
    await page.locator('app-card').filter({ hasText: 'Blackberry $24.99 Lorem ipsum' }).getByRole('button').click();
    await page.getByText('Checkout ( 4 ) (current)').click();
    // await expect(page.getByText('Checkout ( 4 ) (current)')).toHaveScreenshot();

    await page.locator('div').filter({ hasText: 'iphone X by Sim cart Status:' }).nth(3).click();
    await page.getByRole('row', { name: 'iphone X by Sim cart Status:' }).getByRole('button').click();
    await page.getByRole('button', { name: 'Continue Shopping' }).click();
    await page.getByText('Blackberry $24.99 Lorem ipsum').click();
    await page.locator('app-card').filter({ hasText: 'Blackberry $24.99 Lorem ipsum' }).getByRole('button').click();
    await page.getByText('Checkout ( 1 ) (current)').click();
    await page.getByRole('button', { name: 'Continue Shopping' }).click();
    await page.getByRole('link', { name: 'Category 2' }).click();
    await page.getByText('ProtoCommerce Home Shop').click();
    await page.locator('form input[name="name"]').fill(practiceFormName);
    await page.locator('input[name="email"]').fill(practiceFormEmail);
    await page.locator('input[name="email"]').press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill(practiceFormPassword);
    await page.getByRole('textbox', { name: 'Password' }).press('Tab');

    //await page.locator('option:has-text("Teacher")').click();
    //await page.pause();
    //await page.checkboxAgree.click(); click 
    await page.locator('form div').filter({ hasText: 'Check me out if you Love' }).click();
    await page.getByRole('checkbox', { name: 'Check me out if you Love' }).check();
    await page.getByRole('checkbox', { name: 'Check me out if you Love' }).uncheck();
    await page.getByRole('checkbox', { name: 'Check me out if you Love' }).check();
    await page.getByText('Gender').click();

    await page.getByLabel('Gender').selectOption('Female');
    await page.getByLabel('Gender').selectOption('Male');

    await page.getByText('Employment Status:').click();
    await page.getByText('Employment Status: Student').click();
    await page.locator('div').filter({ hasText: 'Employed' }).nth(2).click();
    await expect(page.getByText('Entrepreneur (disabled)')).toBeDisabled();

    await expect(page.getByText('Date of Birth')).toBeVisible();
    await expect(page.locator('input[name="bday"]')).toBeVisible();
    await page.locator('input[name="bday"]').fill('1987-01-02');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('× Success! The Form has been')).toBeVisible();

}
);


test('removing one cart item leaves the other three', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/angularpractice/shop');

    const productsToAdd = ['iphone X', 'Samsung Note 8', 'Nokia Edge', 'Blackberry'];
    for (const name of productsToAdd) {
        await test.step(`Add ${name} to cart`, async () => {
            await page.locator('.card', { hasText: name }).getByRole('button', { name: 'Add' }).click();
        });
    }

    await page.locator('a.nav-link.btn.btn-primary').click();

    const rowFor = (name) => page.getByRole('row', { name: new RegExp(name) });

    // all 4 present
    for (const name of productsToAdd) {
        await expect(rowFor(name)).toBeVisible();
    }

    // remove one
    const removed = 'Nokia Edge';
    await rowFor(removed).getByRole('button').click();

    // removed item is gone
    await expect(rowFor(removed)).toHaveCount(0);

    // the other 3 are still displayed
    const remaining = productsToAdd.filter(p => p !== removed);
    for (const name of remaining) {
        await expect(rowFor(name)).toBeVisible();
    }
});