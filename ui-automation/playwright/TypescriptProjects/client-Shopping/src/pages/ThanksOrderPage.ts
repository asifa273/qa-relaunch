import { expect, type Locator, type Page } from '@playwright/test';

export class ThanksOrderPage {
    page: Page;
    thankyouTitle: Locator;
    orderTextMessage: Locator;
    orderSummary: Locator;

    constructor(page: Page) {
        this.page = page;
        this.thankyouTitle = page.getByRole('heading', { name: 'Thankyou for the order.' });
        this.orderTextMessage = page.locator('h1.hero-primary');
        this.orderSummary = page.locator('.order-summary');
    }

    async verifyThankYouSection(): Promise<void> {
        await expect(this.page).toHaveURL(/\/dashboard\/thanks/);
        await expect(this.thankyouTitle).toBeVisible();
        const orderMessage = await this.orderTextMessage.textContent();
        console.log(orderMessage);
    }

    async verifyOrderSummary(allProductNames: string[]): Promise<void> {
        await this.orderSummary.first().waitFor({ state: 'visible' });
        for (const productName of allProductNames) {
            await expect(this.orderSummary.getByText(new RegExp(productName, 'i'))).toBeVisible({ timeout: 10000 });
        }
    }

    async getConfirmedProductNames(allProductNames: string[]): Promise<string[]> {
        const confirmedNames: string[] = [];
        for (const productName of allProductNames) {
            const isVisible = await this.orderSummary.getByText(productName, { exact: true }).isVisible();
            if (isVisible) {
                confirmedNames.push(productName);
            }
        }
        return confirmedNames;
    }
}