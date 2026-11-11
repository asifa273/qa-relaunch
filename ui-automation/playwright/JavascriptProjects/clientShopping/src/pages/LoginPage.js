const { expect } = require('@playwright/test');

class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailInput = page.getByRole('textbox', { name: 'Email' });
        this.passwordInput = page.locator('#userPassword');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.toast = page.locator('#toast-container');
        this.productCards = page.locator('.card-body');
    }

    async goTo() {
        await this.page.goto('/client/#/auth/login');
    }

    async submit(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async validLogin(email = process.env.SHOP_EMAIL ?? '', password = process.env.SHOP_PASSWORD ?? '') {
        await this.submit(email, password);
        await expect(this.toast).toContainText('Login Successfully');
        this.loginSuccessMessage = (await this.toast.textContent())?.trim();
        // The dashboard is ready once the product catalog renders.
        await expect(this.productCards.first()).toBeVisible();
    }

    async invalidLogin(email, password) {
        await this.submit(email, password);
        await expect(this.toast).toContainText('Incorrect email or password.');
        this.invalidLoginMessage = (await this.toast.textContent())?.trim();
    }

    getLoginSuccessMessage() {
        return this.loginSuccessMessage;
    }

    getInvalidLoginMessage() {
        return this.invalidLoginMessage;
    }
}

module.exports = { LoginPage };
