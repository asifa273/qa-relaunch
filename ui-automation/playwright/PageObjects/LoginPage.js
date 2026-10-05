const { expect } = require('@playwright/test');
require('dotenv').config();

class LoginPage {
    constructor(page) {
        this.page = page;
        this.shopEmail = page.getByRole('textbox', { name: 'Email' });
        this.shopPassword = page.locator('#userPassword');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.LoginSucessAlert = page.locator('div').filter({ hasText: 'Login Successfully' }).nth(2);
        this.invalidLoginAlert = page.locator('div').filter({ hasText: 'Incorrect email or password.' }).nth(2);

    }

    async goTo() {
        await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    }

    async validLogin(shopEmail = process.env.SHOP_EMAIL, shopPassword = process.env.SHOP_PASSWORD) {
        await this.shopEmail.fill(shopEmail);
        await this.shopPassword.fill(shopPassword);
        await this.loginButton.click();
        await this.LoginSucessAlert.waitFor();
        await expect(this.LoginSucessAlert).toBeVisible();
        this.loginSuccessMessage = await this.LoginSucessAlert.textContent();
        await this.page.waitForLoadState('networkidle');

    }
    async invalidLogin(shopEmail = process.env.SHOP_INVALIDEMAIL, shopPassword = process.env.SHOP_INVALIDPASSWORD) {
        await this.goTo();
        await this.shopEmail.fill(shopEmail);
        await this.shopPassword.fill(shopPassword);
        await this.loginButton.click();
        await this.invalidLoginAlert.waitFor();
        await expect(this.invalidLoginAlert).toBeVisible();
        this.invalidLoginMessage = await this.invalidLoginAlert.textContent();
        await this.page.waitForLoadState('networkidle');


    }

    async getLoginSuccessMessage() {
        return this.loginSuccessMessage;
    }

    async getInvalidLoginMessage() {
        return this.invalidLoginMessage;
    }
}
module.exports = { LoginPage };
