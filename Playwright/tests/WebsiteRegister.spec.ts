import { test, expect } from '@playwright/test';
import { assert } from 'node:console';
const { log } = require('node:console');

test.only('Browser Context Playwright test', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  console.log(await page.title());

  //Register link
  const registerButton = await page.locator('a.text-reset');
  await expect(registerButton).toContainText('Register here');
  console.log(await (registerButton).textContent());
  await registerButton.click();

  //In Registeration Pagae - Form fillup
  await page.locator('#firstName').fill('Testbbclm');
  await page.locator('input[type="lastName"]').fill("784999");
  await page.locator('#userEmail').fill("Testbbclm784999@ymail.com");
  await page.locator('input[formcontrolname="userMobile"]').fill("09887654567");
  // await expect(page.getByText('*only numbers is allowed')).toBeVisible();
  //await expect(page.getByText('*Phone Number must be 10 digit')).toBeVisible();
  await page.locator('select[formcontrolname="occupation"]').selectOption('Doctor');
  await page.getByRole('radio', { name: 'Female' }).click();
  await page.locator('#userPassword').fill("LearningTester");
  await page.locator('#confirmPassword').fill("LearningTester");
  await page.isChecked('input[type="checkbox"]');
  await page.click('input[type="checkbox"]');
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(page.getByText('*only numbers is allowed')).toBeVisible();
  await expect(page.getByText('*Phone Number must be 10 digit')).toBeVisible();
  await page.locator('input[formcontrolname="userMobile"]').fill("");
  await page.locator('input[formcontrolname="userMobile"]').fill("1234567890");
  //await page.pause();
  // await expect(page.getByText('Please enter 1 Special Character, 1 Capital 1, Numeric 1 Small')).toBeVisible();

  await page.getByRole('button', { name: 'Register' }).click();
  // await page.waitForTimeout(1000);
  await expect(page.getByText('Please enter 1 Special Character, 1 Capital 1, Numeric 1 Small')).toBeVisible();
  //  await page.pause();
  await page.getByRole('alert', { name: 'Please enter 1 Special' }).click();
  await page.locator('#userPassword').fill("");
  await page.locator('#confirmPassword').fill("");
  await page.locator('#userPassword').fill("Learning@1");
  await page.locator('#confirmPassword').fill("Learning@1");
  await page.getByRole('button', { name: 'Register' }).click();

  //await page.waitForTimeout(1000);
  //await page.pause();
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
  await page.waitForLoadState('networkidle');


});
