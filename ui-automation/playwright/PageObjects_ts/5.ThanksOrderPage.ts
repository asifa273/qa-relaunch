import { Locator, Page } from "@playwright/test";

import { expect } from '@playwright/test';
require('dotenv').config();

export class ThanksOrderPage {
    page: Page;
    thankyouTitle: Locator;
    orderTextMessage: Locator;
    orderSummary: Locator
    constructor(page: Page) {
        this.page = page;
        this.thankyouTitle = page.getByRole('heading', { name: 'Thankyou for the order.' });
        this.orderTextMessage = page.locator('h1.hero-primary');
        this.orderSummary = page.locator('.order-summary');
    }

    async verifyThankYouSection() {
        // Allow for hash-routing or order confirmation URL
        await expect(this.page).toHaveURL(/.*dashboard\/(thanks|order)/, { timeout: 10000 });
        // Or verify the primary header directly:
        await expect(this.page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
        const orderMessage = await this.orderTextMessage.textContent();
        console.log(orderMessage);
    }


    async verifyOrderSummary(allProductNames: string[]) {
        await expect(this.orderSummary).toBeVisible();

        for (const productName of allProductNames) {
            await expect(this.orderSummary.getByText(productName, { exact: true })).toBeVisible();
        }
    }

    async getConfirmedProductNames(allProductNames: string[]) {
        const confirmedNames = [];

        for (const productName of allProductNames) {
            const isVisible = await this.orderSummary.getByText(productName, { exact: true }).isVisible();
            if (isVisible) {
                confirmedNames.push(productName);
            }
        }

        return confirmedNames;
    }
}

module.exports = { ThanksOrderPage };