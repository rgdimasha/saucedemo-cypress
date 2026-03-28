describe('SauceDemo Checkout Flow Functional Tests', () => {

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

  it('Verify user can complete checkout process successfully', () => {

    // Step 1: Add product
    cy.contains('Sauce Labs Backpack', { timeout: TIMEOUT })
      .parents('.inventory_item')
      .find('button')
      .click();

    // Step 2: Go to cart
    cy.get('.shopping_cart_link', { timeout: TIMEOUT }).click();
    cy.url({ timeout: TIMEOUT }).should('include', '/cart.html');
    cy.contains('Your Cart', { timeout: TIMEOUT }).should('be.visible');

    // Step 3: Checkout
    cy.get('[data-test="checkout"]', { timeout: TIMEOUT }).click();

    // Step 4: Fill details
    cy.get('[data-test="firstName"]', { timeout: TIMEOUT }).type('Automation');
    cy.get('[data-test="lastName"]', { timeout: TIMEOUT }).type('Testing');
    cy.get('[data-test="postalCode"]', { timeout: TIMEOUT }).type('10250');

    cy.get('[data-test="continue"]', { timeout: TIMEOUT }).click();

    // Step 5: Verify overview
    cy.contains('Checkout: Overview', { timeout: TIMEOUT })
      .should('be.visible');

    // Step 6: Finish
    cy.get('[data-test="finish"]', { timeout: TIMEOUT }).click();

    // Step 7: Success message
    cy.contains('Thank you for your order!', { timeout: TIMEOUT })
      .should('be.visible');

    cy.contains('Your order has been dispatched', { timeout: TIMEOUT })
      .should('be.visible');
  });

});