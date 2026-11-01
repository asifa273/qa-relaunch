// Page object for the GreenKart product list.
// TODO: verify every selector in the Cypress runner (cy.open → selector playground).

export class HomePage {
  visit(): void {
    cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');
  }

  productCards() {
    return cy.get('.product:visible');
  }
  productsResults(){
    return cy.get('.products-wrapper .no-results');
  }

  productNames() {
    return cy.get('.product:visible h4.product-name');
  }

  cartItemCount() {
    return cy.get('.cart-info tr:first-child strong');
  }

  openCart(): void {
    cy.get('.cart-icon').click();
    cy.contains('button', 'PROCEED TO CHECKOUT').click();
  }
}
