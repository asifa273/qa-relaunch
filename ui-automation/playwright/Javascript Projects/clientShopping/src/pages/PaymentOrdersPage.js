const { expect } = require('@playwright/test');

// Dummy card details accepted by the practice shop.
const CARD = {
    number: '4111 1111 1111 1111',
    expiryMonth: '12',
    expiryYear: '31',
    cvv: '123',
    nameOnCard: 'Testxfirst Testxlast',
    coupon: '2026',
};

class PaymentOrdersPage {
    constructor(page) {
        this.page = page;
        this.paymentCard = page.locator('.payment');
        this.paymentTypes = page.locator('.payment__types');
        this.expectedPaymentTypes = ['Credit CardPaypalSEPAInvoice'];
        this.personalInformationTitle = page.getByText('Personal Information');
        this.creditCardNumberInput = page.getByRole('textbox').first();
        this.expiryDateName = page.getByText('Expiry Date');
        this.expiryDateMonth = page.getByRole('combobox').first();
        this.expiryDateYear = page.locator('select.ddl').last();
        this.cvvCodeName = page.getByText('CVV Code ?');
        this.cvvCodeNumberInput = page.getByRole('textbox').nth(1);
        this.nameOnCardLabel = page.getByText('Name on Card');
        this.nameOnCardInput = page.getByRole('textbox').nth(2);
        this.applyCouponName = page.getByText('Apply Coupon').first();
        this.applyCouponInput = page.locator('input[name="coupon"]');
        this.shippingInformationTitle = page.getByText('Shipping Information');
        this.userEmailInput = page.getByRole('textbox').nth(4);
        this.countryInput = page.getByPlaceholder('Select Country');
        this.countryOption = page.getByText('United States', { exact: true });
        this.placeOrderButton = page.locator('a.action__submit').filter({ hasText: 'Place Order' });
    }

    async paymentPage() {
        await expect(this.page).toHaveURL(/order/);
        await expect(this.paymentCard).toBeVisible();
    }

    async verifyPersonalInformation() {
        await expect(this.personalInformationTitle).toBeVisible();
        expect(await this.paymentTypes.allTextContents()).toEqual(this.expectedPaymentTypes);

        await this.creditCardNumberInput.fill(CARD.number);
        await expect(this.expiryDateName).toBeVisible();
        await this.expiryDateMonth.selectOption(CARD.expiryMonth);
        await this.expiryDateYear.selectOption(CARD.expiryYear);
        await expect(this.cvvCodeName).toBeVisible();
        await this.cvvCodeNumberInput.fill(CARD.cvv);
        await expect(this.nameOnCardLabel).toBeVisible();
        await this.nameOnCardInput.fill(CARD.nameOnCard);
        await expect(this.applyCouponName).toBeVisible();
        await this.applyCouponInput.fill(CARD.coupon);
    }

    async verifyShippingInformation(email = process.env.SHOP_EMAIL ?? '') {
        await expect(this.shippingInformationTitle).toBeVisible();
        await this.userEmailInput.fill(email);

        await this.countryInput.click();
        await this.countryInput.pressSequentially('United', { delay: 100 });
        await this.countryOption.click();

        await this.placeOrderButton.click();
    }
}

module.exports = { PaymentOrdersPage };
