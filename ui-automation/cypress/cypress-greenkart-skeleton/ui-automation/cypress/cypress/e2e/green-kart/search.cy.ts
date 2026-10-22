import { HomePage } from '../../support/pages/HomePage';

describe('GreenKart search', () => {
  const home = new HomePage();

  beforeEach(() => home.visit());

  it('shows only products that match the search term', () => {
    cy.searchProduct('ca');

    // Wait for the total unfiltered list of 30 to shrink
    home.productNames().should('have.length.lt', 30);

    home.productNames().each(($name) => {
      expect($name.text().toLowerCase()).to.include('ca');
    });
  });

  it('should show all prducts that match this letter in them', () => {
    cy.searchProduct('li');

    // Waits until the visible list has shrunk from the initial 30 items
    home.productNames().should('have.length.lt', 30);

    home.productNames().each(($name) => {
      expect($name.text().toLowerCase()).to.include('li');
    });

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
