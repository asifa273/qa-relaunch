import { HomePage } from '../../support/pages/HomePage';

describe('GreenKart search', () => {
  const home = new HomePage();

  beforeEach(() => home.visit());

  // The list filters on every keystroke, so partial terms briefly show extra
  // products. Checking all names inside one should() makes Cypress re-query
  // and retry until the list matches the full term.
  const expectAllNamesToInclude = (term: string) => {
    home.productNames().should(($names) => {
      expect($names.length, 'matching products').to.be.greaterThan(0);
      [...$names].forEach((el) => {
        expect(el.innerText.toLowerCase()).to.include(term);
      });
    });
  };

  it('shows only products that match the search term', () => {
    cy.searchProduct('ca');
    expectAllNamesToInclude('ca');
  });

  it('should show all prducts that match this letter in them', () => {
    cy.searchProduct('li');
    expectAllNamesToInclude('li');
  });

  it('shows no products for a term that matches nothing', () => {
    cy.get('.search-keyword').type('zzzz');

    // Verify that no product cards are displayed
    home.productsResults().should('have.length', 1);

    // Assert the empty-state container is visible
    home.productsResults().should('be.visible');

    // Assert the "no results" heading is visible
    cy.contains('h2', 'Sorry, no products matched your search!').should('be.visible');
    // TODO: assert the "no results" message if the app shows one.
  });
});
