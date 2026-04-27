const { test, expect } = require('@playwright/test');
const { log } = require('node:console');

//javascript - asynchronous - execute all steps together, or explicit tell step1 is completed, so give await
test.only('Browser Context Playwright test', async ({ browser }) =>
//function() is called anonomous function so write as async()=>
//({browser}) is calling
{
    //chrome - plugins/cookies

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    const userName = page.locator('Input#username');
    const signIn = page.locator('#signInBtn');
    const cardTitles = page.locator('.card-body a');
    const checkboxAgree = page.locator('#terms');

    //playwright support css selector heavily than xpath
    await userName.fill("rahulshetty");
    await page.locator("[type='password']").fill("Learning@830$3mK2");
    //await page.pause();
    await page.locator('span').nth(4).click();
    await page.locator('div').filter({ hasText: 'You will be limited to only' }).nth(3).click();
    await page.getByRole('button', { name: 'Okay' }).click();
    await page.getByRole('combobox').selectOption({ label: 'Teacher' });
    //await page.locator('option:has-text("Teacher")').click();
    //await page.pause();
    //await page.checkboxAgree.click(); click 
    await checkboxAgree.check();
    await expect(checkboxAgree).toBeChecked();
    // await expect(checkboxAgree.isChecked());
    console.log(await checkboxAgree.isChecked());
    await checkboxAgree.uncheck();
    await expect(checkboxAgree).not.toBeChecked();
    //expect(await checkboxAgree.isChecked()).toBeFalsy();
    console.log(await checkboxAgree.isChecked()); // ✅ logs: false
    await checkboxAgree.check();

    // await page.checkboxAgree.isChecked();
    // await expect(checkboxAgree).isChecked();
    console.log(checkboxAgree);
    await signIn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signIn.click();
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    await expect(cardTitles.nth(1)).toContainText('Samsung');
    //await expect(cardTitles.nth(1).waitFor()); //wait for exact elemennt to be available
    const allCardTiteles = await cardTitles.allTextContents();
    console.log(allCardTiteles);

}
);
test('Page Playwright test', async ({ page }) => {
    await page.goto("https://google.com/");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
    // Expect a title "to contain" a substring.
}
);