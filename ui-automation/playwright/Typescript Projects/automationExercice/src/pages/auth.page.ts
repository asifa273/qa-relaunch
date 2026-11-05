import { APIRequestContext, expect, type Locator, type Page } from '@playwright/test';
import { HeaderComponent } from './components/header.component';


// Name, email and password are passed separately, so they're not part of this type.
export type NewuserDetails = {
    signupName: string;
    titleRadio: string; // 'Mr' or 'Mrs' (JSON imports type this as string)
    firstName: string;
    lastName: string;
    address: string;
    countryDropdownSelect: string;
    stateInput: string;
    cityInput: string;
    zipcode: string;
    mobileNumInput: string;

}

/** Shared helpers for every page in the shop. */
export class AuthPage {
    private readonly page: Page;

    readonly header: HeaderComponent;
    private readonly loginEmail: Locator;
    private readonly loginPassword: Locator;
    private readonly signupName: Locator;
    private readonly signupEmail: Locator;
    private readonly signUpButton: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly formName: Locator;
    private readonly formEmail: Locator;
    private readonly firstName: Locator;
    private readonly lastName: Locator;
    private readonly address: Locator;
    private readonly countryDropdownSelect: Locator;
    private readonly stateInput: Locator;
    private readonly cityInput: Locator;
    private readonly zipcode: Locator;
    private readonly mobileNumInput: Locator;
    private readonly createAccButton: Locator;
    private readonly signUpAgainSameUserError: Locator;
    private readonly accountDeletedMessage: Locator;
    private readonly continueButtonforCreateNewAccount: Locator;
    private readonly accountCreatedMessage: Locator;
    private readonly loggedinUser: Locator;





    constructor(page: Page) {
        this.page = page;
        this.header = new HeaderComponent(page);

        //login locators
        this.loginEmail = page.locator('[data-qa="login-email"]');
        this.loginPassword = page.locator('[data-qa="login-password"]');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.loggedinUser = page.getByText('Logged in as ');

        //signup locators
        this.signupName = page.locator('[data-qa="signup-name"]');
        this.signupEmail = page.locator('[data-qa="signup-email"]');
        this.signUpButton = page.getByRole('button', { name: 'Signup' });

        //full registration locators
        this.formName = page.locator('[data-qa="name"]');
        this.formEmail = page.locator('[data-qa="email"]');
        this.firstName = page.locator('[data-qa="first_name"]');
        this.lastName = page.locator('[data-qa="last_name"]');
        this.passwordInput = page.getByLabel('Password');
        // this.titleRadio = page.locator('#id_gender2');
        this.address = page.locator('[data-qa="address"]');
        this.countryDropdownSelect = page.getByRole('combobox', { name: 'Country' });
        this.stateInput = page.getByLabel('State');
        this.cityInput = page.getByLabel('City');
        this.zipcode = page.locator('[data-qa="zipcode"]');
        this.mobileNumInput = page.getByLabel('Mobile Number');
        this.createAccButton = page.getByRole('button', { name: 'Create Account' });
        this.signUpAgainSameUserError = page.getByText('Email Address already exist!');

        // Result messages & action buttons
        this.accountCreatedMessage = page.locator('[data-qa="account-created"]');
        this.accountDeletedMessage = page.locator('[data-qa="account-deleted"]');
        this.continueButtonforCreateNewAccount = page.getByRole('link', { name: 'Continue' });

    }

    async deletAccViaAPI(request: APIRequestContext, email: string, password: string) {
        const response = await request.delete('/api/deleteAccount', {
            form: { email, password }
        });
        expect(response.ok()).toBeTruthy();
    }

    async deleteAcc() {
        await this.header.goToDeleteAcc();
        await expect(this.page).toHaveURL('/delete_account');
        await expect(this.accountDeletedMessage).toBeVisible();
        await expect(this.continueButtonforCreateNewAccount).toBeVisible();
        await this.continueButtonforCreateNewAccount.click();
    }

    async newuserSignUp(name: string, email: string) {
        await this.signupName.fill(name);
        await this.signupEmail.fill(email);
        await this.signUpButton.click();
    }

    async newuserRegistrationForm(password: string, details: NewuserDetails): Promise<void> {
        // Automation Exercise radio labels: 'Mr.' or 'Mrs.'
        await this.page.getByLabel(details.titleRadio, { exact: false }).check();

        //expect name and email popolated
        await expect(this.formName).toBeVisible();
        await expect(this.formEmail).toBeVisible();

        await this.passwordInput.fill(password);
        await this.firstName.fill(details.firstName);
        await this.lastName.fill(details.lastName);
        await this.address.fill(details.address);
        await this.countryDropdownSelect.selectOption(details.countryDropdownSelect);
        await this.stateInput.fill(details.stateInput);
        await this.cityInput.fill(details.cityInput);
        await this.zipcode.fill(details.zipcode);
        await this.mobileNumInput.fill(details.mobileNumInput);
        await this.createAccButton.click();

        // Submitting lands on /account_created
        await expect(this.page).toHaveURL('/account_created');
        await expect(this.accountCreatedMessage).toBeVisible();
        await this.continueButtonforCreateNewAccount.click();
    }

    async goTo() {
        await this.page.goto('/login');
    }

    async login(email: string, password: string) {
        await this.loginEmail.fill(email);
        await this.loginPassword.fill(password);
        await this.loginButton.click();
        await expect(this.loggedinUser).toBeVisible();


    }

    async expectSignUpEmailAlreadyExists() {
        await expect(this.signUpAgainSameUserError).toBeVisible();
    }

    async logout() {
        await this.header.goTologoutUser();
        // Post-condition check: guarantees the logout action completed
        await expect(this.header.signupLoginLink).toBeVisible();
        await expect(this.page).toHaveURL('/login');
    }

}
