import { HomePage } from '../../support/pages/HomePage';
import { CartPage } from '../../support/pages/CartPage';
import { CountryPage } from '../../support/pages/CountryPage';

interface OrderData {
  searchTerm: string;
  products: string[];
  country: string;
  invalidPromo: string;
}

describe('GreenKart checkout', () => {
  const home = new HomePage();
  const cart = new CartPage();
  const country = new CountryPage();

  beforeEach(function () {
    cy.fixture<OrderData>('order').as('order');
    home.visit();
  });

  it('places an order for two products', function () {
    const order = this.order as OrderData;
    cy.searchProduct(order.searchTerm);
    order.products.forEach((p) => cy.addToCart(p));
    home.cartItemCount().should('have.text', String(order.products.length));

    home.openCart();
    cart.rows().should('have.length', order.products.length);
    cart.placeOrder();

    country.selectCountry(order.country);
    country.acceptTerms();
    country.proceed();
    cy.contains('Thank you').should('be.visible'); 
  });

  it('rejects an invalid promo code', function () {
    const order = this.order as OrderData;
    cy.searchProduct(order.searchTerm);
    cy.addToCart(order.products[0]);
    home.openCart();
    cart.applyPromo(order.invalidPromo);
    cart.promoMessage().should('contain.text', 'Invalid'); 
  });

  it('blocks the order when terms are not accepted', function () {
    const order = this.order as OrderData;
    cy.searchProduct(order.searchTerm);
    cy.addToCart(order.products[0]);
    home.openCart();
    cart.placeOrder();
    country.selectCountry(order.country);
    country.proceed();
    country.termsError().should('be.visible');
  });
});
