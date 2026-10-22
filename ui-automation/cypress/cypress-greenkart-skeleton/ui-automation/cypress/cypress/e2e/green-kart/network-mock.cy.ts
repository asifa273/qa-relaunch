describe('GreenKart with a mocked product API', () => {
  it('shows an empty store when the product API returns no items', () => {
    cy.intercept('GET', '**/products.json', { body: [] }).as('products');

    cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');
    cy.wait('@products');

    // 1. Assert no actual product titles are rendered
    cy.get('h4.product-name').should('not.exist');

    // 2. Assert no "ADD TO CART" buttons are rendered
    cy.get('.product-action button').should('not.exist');

    // 3. Optional: Confirm the store is stuck in the loading placeholder state
    cy.get('.products .product.loading').should('have.length', 8);
  });

  it('handles a server error from the product API', () => {
    cy.on('uncaught:exception', (err) => {
      if (err.message.includes('Request failed with status code 500')) {
        return false;
      }
      return true;
    });

    cy.intercept('GET', '**/products.json', {
      statusCode: 500,
      body: { error: 'Internal Server Error' },
    }).as('productsError');

    cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');
    cy.wait('@productsError').its('response.statusCode').should('eq', 500);

    cy.get('.products-wrapper').should('be.visible');
  });
});