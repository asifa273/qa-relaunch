const { expect } = require('@playwright/test');
require('dotenv').config();

class ThanksOrderPage {
    constructor(page) {
        this.page = page;
        this.thankyouTitle = page.getByRole('heading', { name: 'Thankyou for the order.' });
        this.orderTextMessage = page.locator('h1.hero-primary');
        this.orderSummary = page.locator('.order-summary');
    }

    async verifyThankYouSection() {
        await expect(this.page).toHaveURL(/thanks/);
        await expect(this.thankyouTitle).toBeVisible();
        const orderMessage = await this.orderTextMessage.textContent();
        console.log(orderMessage);
    }

    async verifyOrderSummary(allProductNames) {
        await expect(this.orderSummary).toBeVisible();

        for (const productName of allProductNames) {
            await expect(this.orderSummary.getByText(productName, { exact: true })).toBeVisible();
        }
    }

    async getConfirmedProductNames(allProductNames) {
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