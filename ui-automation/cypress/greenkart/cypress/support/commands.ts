// Custom commands. Each one needs a matching type in the declare block below.

Cypress.Commands.add('searchProduct', (term: string) => {
  // Products load from an API call; wait for them before typing.
  cy.get('.products .product').should('have.length.greaterThan', 0);
  cy.get('.search-keyword').clear().type(term);
  // GreenKart filters as you type; wait until the list settles.
  cy.get('.products .product:visible').should('have.length.greaterThan', 0);
});

Cypress.Commands.add('addToCart', (productName: string) => {
  cy.contains('.product', productName).find('.product-action button').click();
});

declare global {
  namespace Cypress {
    interface Chainable {
      /** Type a term in the GreenKart search box. */
      searchProduct(term: string): Chainable<void>;
      /** Click ADD TO CART on the product card whose name contains productName. */
      addToCart(productName: string): Chainable<void>;
    }
  }
}

export {};
