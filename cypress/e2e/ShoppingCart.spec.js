describe('SauceDemo Cart Page Tests', () => {

  const TIMEOUT = 20000;

  beforeEach(() => {

    cy.session('login-session', () => {

      cy.visit('/', { timeout: TIMEOUT });

      cy.contains('Swag Labs', { timeout: TIMEOUT }).should('be.visible');

      cy.get('[data-test="username"]', { timeout: TIMEOUT }).type('standard_user');
      cy.get('[data-test="password"]', { timeout: TIMEOUT }).type('secret_sauce');

      cy.get('[data-test="login-button"]', { timeout: TIMEOUT }).click();

      cy.url({ timeout: TIMEOUT }).should('include', '/inventory.html');
    });

    cy.visit('/inventory.html', { timeout: TIMEOUT, failOnStatusCode: false });
  });

  //1
  it('Verify user can add a product to cart and navigate to cart page', () => {

    cy.get('.shopping_cart_link', { timeout: TIMEOUT }).click();

    cy.url({ timeout: TIMEOUT }).should('include', '/cart.html');

    cy.contains('Your Cart', { timeout: TIMEOUT }).should('be.visible');
  });

  //2
  it('Verify user can add a product to cart and added product details are displayed correctly', () => {

    // ensure product exists before checking cart
    cy.contains('Sauce Labs Backpack', { timeout: TIMEOUT })
      .parents('.inventory_item')
      .find('button')
      .click();

    cy.get('.shopping_cart_link', { timeout: TIMEOUT }).click();

    cy.contains('Sauce Labs Backpack', { timeout: TIMEOUT }).should('be.visible');
    cy.contains('$29.99', { timeout: TIMEOUT }).should('be.visible');
    cy.contains('carry.allTheThings()', { timeout: TIMEOUT }).should('be.visible');
  });

  //3
  it('Verify user can navigate back to products page using Continue Shopping', () => {
    cy.contains('Sauce Labs Backpack', { timeout: TIMEOUT })
      .parents('.inventory_item')
      .find('button')
      .click();

    cy.get('.shopping_cart_link', { timeout: TIMEOUT }).click();

    cy.get('[data-test="continue-shopping"]', { timeout: TIMEOUT }).click();

    cy.url({ timeout: TIMEOUT }).should('include', '/inventory.html');

    cy.contains('Products', { timeout: TIMEOUT }).should('be.visible');
  });

  //4
  it('Verify user can remove product from cart', () => {

    cy.contains('Sauce Labs Backpack', { timeout: TIMEOUT })
      .parents('.inventory_item')
      .find('button')
      .click();

    cy.get('.shopping_cart_link', { timeout: TIMEOUT }).click();

    cy.contains('Sauce Labs Backpack', { timeout: TIMEOUT })
      .parents('.cart_item')
      .find('button')
      .should('contain', 'Remove')
      .click();

    cy.contains('Sauce Labs Backpack', { timeout: TIMEOUT })
      .should('not.exist');
  });

});