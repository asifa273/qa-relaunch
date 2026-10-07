import { expect, type Locator, type Page } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export class LoginPage {
    readonly page: Page;
    readonly shopEmailInput: Locator;
    readonly shopPasswordInput: Locator;
    readonly loginButton: Locator;
    readonly toastAlert: Locator;

    constructor(page: Page) {
        this.page = page;
        this.shopEmailInput = page.getByPlaceholder('email@example.com');
        this.shopPasswordInput = page.locator('#userPassword');
        this.loginButton = page.locator('#login');
        this.toastAlert = page.locator('#toast-container');
    }

    async goTo(): Promise<void> {
        await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    }

    async validLogin(
        shopEmail = process.env.SHOP_EMAIL ?? '',
        shopPassword = process.env.SHOP_PASSWORD ?? ''
    ): Promise<string | null> {
        await this.shopEmailInput.fill(shopEmail);
        await this.shopPasswordInput.fill(shopPassword);
        await this.loginButton.click();

        await expect(this.toastAlert).toContainText('Login Successfully');
        return await this.toastAlert.textContent();
    }

    async invalidLogin(
        shopEmail = process.env.SHOP_INVALIDEMAIL ?? '',
        shopPassword = process.env.SHOP_INVALIDPASSWORD ?? ''
    ): Promise<string | null> {
        await this.shopEmailInput.fill(shopEmail);
        await this.shopPasswordInput.fill(shopPassword);
        await this.loginButton.click();

        await expect(this.toastAlert).toContainText('Incorrect email or password.');
        return await this.toastAlert.textContent();
    }

    async getLoginSuccessMessage(): Promise<string | null> {
        return await this.toastAlert.textContent();
    }

    async getInvalidLoginMessage(): Promise<string | null> {
        return await this.toastAlert.textContent();
    }
}