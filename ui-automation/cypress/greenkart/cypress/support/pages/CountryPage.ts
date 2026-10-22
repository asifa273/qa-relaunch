// Page object for the final step: choose country, accept terms, proceed.

export class CountryPage {
  selectCountry(country: string): void {
    cy.get('select').select(country);
  }

  acceptTerms(): void {
    cy.get('.chkAgree').check();
  }

  proceed(): void {
    cy.contains('button', 'Proceed').click();
  }

  termsError() {
    return cy.get('.errorAlert');
  }
}
