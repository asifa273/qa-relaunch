import type { Locator, Page } from '@playwright/test';

export class GreenKartCountryPage {
    readonly page: Page;
    readonly countrySelect: Locator;
    readonly termsCheckbox: Locator;
    readonly proceedButton: Locator;
    readonly successMessage: Locator;
    readonly redirectMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.countrySelect = page.getByRole('combobox');
        this.termsCheckbox = page.getByRole('checkbox');
        this.proceedButton = page.getByRole('button', { name: 'Proceed' });
        this.successMessage = page.getByText(/Thank you, your order has been placed successfully/i);
        this.redirectMessage = page.getByText(/You'll be redirected to/i);
    }

    async placeOrderWithoutSelectingCountry(): Promise<void> {
        await this.termsCheckbox.check();
        await this.proceedButton.click();
    }
}