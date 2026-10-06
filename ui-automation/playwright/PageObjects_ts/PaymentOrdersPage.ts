import { Locator, Page } from "@playwright/test";

const { expect } = require('@playwright/test');
require('dotenv').config();

export class PaymentOrdersPage {
    page: Page;
    paymentCard: Locator;
    paymentTypes: Locator;
    paymentCredittypes: string[];
    creditCardName: Locator

    personalInformationTitle: Locator;
    creditCardNumberInput: Locator;
    expiryDateName: Locator;
    expiryDateMonth: Locator;
    expiryDateYear: Locator;
    cvvCodeName: Locator;
    cvvCodeNumberInput: Locator;
    nameonCard: Locator;
    nameonCardInput: Locator;
    applyCouponName: Locator;
    applyCouponInput: Locator;

    shippingInformationPlaceholder: Locator;
    userEmailInput: Locator;
    typeCountryNameDropDown: Locator;

    placeOrderButton: Locator;
    constructor(page: Page) {
        this.page = page;
        this.paymentCard = page.locator('.payment');
        this.paymentTypes = page.locator('.payment__types')
        this.paymentCredittypes = ['Credit CardPaypalSEPAInvoice'];
        this.creditCardName = page.getByText('Credit Card Number');
        this.personalInformationTitle = page.getByText("Personal Information");
        this.creditCardNumberInput = page.getByRole('textbox').first();
        this.expiryDateName = page.getByText('Expiry Date');
        this.expiryDateMonth = page.getByRole('combobox').first();
        this.expiryDateYear = page.locator('select.ddl').last();
        this.cvvCodeName = page.getByText('CVV Code ?');
        this.cvvCodeNumberInput = page.getByRole('textbox').nth(1);
        this.nameonCard = page.getByText('Name on Card');
        this.nameonCardInput = page.getByRole('textbox').nth(2);
        this.applyCouponName = page.getByText('Apply Coupon').first();
        this.applyCouponInput = page.locator('input[name="coupon"]');
        this.shippingInformationPlaceholder = page.getByText('Shipping Information');
        this.userEmailInput = page.getByRole('textbox').nth(4);
        this.typeCountryNameDropDown = page.getByText('United States', { exact: true });
        this.placeOrderButton = page.locator('a.action__submit').filter({ hasText: 'Place Order' });
    }


    async paymentPage() {
        //payment Method -Select a payment method (Credit Card) 
        await expect(this.page).toHaveURL(/order/);
        await expect(this.paymentCard).toBeVisible();
    }

    async verifyPersonalInformation() {
        //fill the credit cardform
        const paymentMethods = await this.paymentTypes.allTextContents();
        expect(paymentMethods).toEqual(this.paymentCredittypes);
        await this.personalInformationTitle.waitFor();
        await expect(this.personalInformationTitle).toBeVisible();
        await expect(this.creditCardNumberInput).toBeVisible();
        await this.creditCardNumberInput.fill('4111 1111 1111 1111');
        await expect(this.expiryDateName).toBeVisible();
        await this.expiryDateMonth.selectOption('12');
        await this.expiryDateYear.selectOption('31');
        await expect(this.cvvCodeName).toBeVisible();
        await this.cvvCodeNumberInput.fill('123');
        await expect(this.nameonCard).toBeVisible();
        await this.nameonCardInput.fill('Testxfirst Testxlast');
        await expect(this.applyCouponName).toBeVisible();
        await this.applyCouponInput.fill('2026');
    }
    async verifyShippingInformation() {
        // Shipping Information + Place Order
        await expect(this.shippingInformationPlaceholder).toBeVisible();
        await this.userEmailInput.fill(process.env.SHOP_EMAIL ?? '');

        const country = this.page.getByPlaceholder('Select Country');
        await country.click();
        await country.pressSequentially('United', { delay: 100 });
        await this.typeCountryNameDropDown.waitFor();
        await this.typeCountryNameDropDown.click();

        await this.placeOrderButton.click();

    }
}
module.exports = { PaymentOrdersPage };


