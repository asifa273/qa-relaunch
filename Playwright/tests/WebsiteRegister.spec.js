const { test, expect } = require('@playwright/test');
const { log, assert } = require('node:console');

//In Registeration Pagae - Form fillup

test.only('Register Form', async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 2200, height: 1080 }
  });

  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/client/#/auth/register");
  console.log(await page.title());

//form fields fillin
  await page.getByLabel('First Name').fill('Testxfirst');
  await page.getByLabel('Last Name').fill('Testxlast');
  await page.getByRole('textbox', { name: 'Email' }).fill('Testdummy687fl@ymail.com');

  await page.getByRole('combobox').selectOption('Doctor');
  await page.getByRole('radio', { name: 'Female' }).click();
  await page.locator('#userPassword').fill("LearningTester");
  await page.locator('#confirmPassword').fill("LearningTester");
  await page.isChecked('input[type="checkbox"]');
  await page.click('input[type="checkbox"]');
  await page.getByRole('button', { name: 'Register' }).click();

  await page.locator('input[formcontrolname="userMobile"]').fill("");
  await page.locator('input[formcontrolname="userMobile"]').fill("1234567890");
 

  await page.getByRole('button', { name: 'Register' }).click();
  await page.getByRole('alert', { name: 'Please enter 1 Special' }).click();
  await page.locator('#userPassword').fill("");
  await page.locator('#confirmPassword').fill("");
  await page.locator('#userPassword').fill("Learning@1");
  await page.locator('#confirmPassword').fill("Learning@1");
  await page.getByRole('button', { name: 'Register' }).click();

 
  await page.locator('div').filter({ hasText: 'Registered Successfully' }).nth(2).hover();
  //await page.getByRole('alert', { name: 'User already exisits with' }).click();

  await expect(page.getByRole('heading', { name: 'Account Created Successfully' })).toBeVisible();

  await page.getByRole('button', { name: 'Login' }).click();

  await (page.locator('div.login-wrapper.my-auto.p-5:visible')).isVisible();
  await page.getByText('Register to sign in with your personal account', { exact: true });
  await page.getByRole('textbox', { name: 'email@example.com' }).fill("Testbbclm784999@ymail.com");
  await page.getByRole('textbox', { name: 'enter your passsword' }).fill("Learning@1");
  await page.getByRole('button').click();
  const cardBody = await page.locator('.card-body b');
  console.log(await cardBody.first().textContent());
  await cardBody.nth(1).textContent();
  await expect(cardBody.nth(0)).toContainText('ADIDAS ORIGINAL');
  const allCardBodies = await cardBody.allTextContents();
  console.log(allCardBodies);

});

