import { type Locator, type Page } from '@playwright/test';

export class HeaderComponent {
    private readonly page: Page;

    // Expose locators publicly so tests can check things like visibility or text states
    readonly homeLink: Locator;
    readonly productsLink: Locator;
    readonly CartLink: Locator;
    readonly signupLoginLink: Locator;
    readonly loggedInLink: Locator;
    readonly logoutLink: Locator;
    readonly deleteLink: Locator;



    constructor(page: Page) {
        this.page = page;
        this.homeLink = page.getByRole('link', { name: 'Home', exact: true });
        this.productsLink = page.getByRole('link', { name: 'Products', exact: true });
        this.CartLink = page.getByRole('link', { name: 'Cart', exact: true });
        this.signupLoginLink = page.getByRole('link', { name: 'Signup / Login', exact: true });
        this.loggedInLink = page.getByText('Logged in as');
        this.logoutLink = page.getByText('Logout');
        this.deleteLink = page.getByText('Delete Account');
    }

    // Action Methods encapsulate execution behaviors
    async goToHome() {
        await this.homeLink.click();
    }
    async goToProducts() {
        await this.productsLink.click();
    }
    async goToCart() {
        await this.CartLink.click();
    }
    async goToSignUpLogin() {
        await this.signupLoginLink.click();
    }

    async goTologoutUser() {
        await this.logoutLink.click();
    }

    async goToDeleteAcc() {
        await this.deleteLink.click();
    }

    async loggedinUser() {
        await this.loggedInLink.click();
    }


}
