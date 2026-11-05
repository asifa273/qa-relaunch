const { expect } = require('@playwright/test');

class ThanksOrderPage {
    constructor(page) {
        this.page = page;
        this.thankyouTitle = page.getByRole('heading', { name: 'Thankyou for the order.' });
        this.orderSummary = page.locator('.order-summary');
    }

    async verifyThankYouSection() {
        await expect(this.page).toHaveURL(/thanks/);
        await expect(this.thankyouTitle).toBeVisible();
    }

    async verifyOrderSummary(productNames) {
        await expect(this.orderSummary).toBeVisible();
        for (const productName of productNames) {
            await expect(this.orderSummary.getByText(productName, { exact: true })).toBeVisible();
        }
    }

    async getConfirmedProductNames(productNames) {
        const confirmedNames = [];
        for (const productName of productNames) {
            if (await this.orderSummary.getByText(productName, { exact: true }).isVisible()) {
                confirmedNames.push(productName);
            }
        }
        return confirmedNames;
    }
}

module.exports = { ThanksOrderPage };
