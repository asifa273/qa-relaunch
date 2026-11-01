// Page object for the cart / place-order page.

export class CartPage {
  rows() {
    return cy.get('#productCartTables tbody tr');
  }

  applyPromo(code: string): void {
    cy.get('.promoCode').type(code);
    cy.get('.promoBtn').click();
  }

  promoMessage() {
    return cy.get('.promoInfo', { timeout: 15000 });
  }

  placeOrder(): void {
    cy.contains('button', 'Place Order').click();
  }
}
