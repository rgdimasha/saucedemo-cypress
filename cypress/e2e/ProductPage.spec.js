describe('SauceDemo Product Page Tests', () => {

  const TIMEOUT = 20000;

  beforeEach(() => {

    cy.session('login-session', () => {

      cy.visit('/', { timeout: TIMEOUT })

      cy.contains('Swag Labs', { timeout: TIMEOUT }).should('be.visible')

      cy.get('[data-test="username"]', { timeout: TIMEOUT }).type('standard_user')
      cy.get('[data-test="password"]', { timeout: TIMEOUT }).type('secret_sauce')

      cy.get('[data-test="login-button"]', { timeout: TIMEOUT }).click()

      cy.url({ timeout: TIMEOUT }).should('include', '/inventory.html')
    })

    // AFTER session → manually go to product page
    cy.visit('/inventory.html', { timeout: TIMEOUT, failOnStatusCode: false })
  })

  //1
  it('Verify user is on product page and products header is visible', () => {

    cy.contains('Products', { timeout: TIMEOUT })
      .should('be.visible')
  })

  //2
  it('Verify product page is scrollable', () => {

    cy.get('.inventory_list', { timeout: TIMEOUT })
      .should('be.visible')

    cy.scrollTo('bottom')

    cy.get('.inventory_item', { timeout: TIMEOUT })
      .last()
      .should('be.visible')
  })

  //3
  it('Verify user is redirected to product details page when clicking a product name', () => {

  cy.contains('Sauce Labs Backpack', { timeout: TIMEOUT })
    .should('be.visible')
    .click()

  cy.contains('Sauce Labs Backpack', { timeout: TIMEOUT })
    .should('be.visible')

  cy.contains('carry.allTheThings()', { timeout: TIMEOUT })
    .should('be.visible')
})

//4
it('Verify user can navigate back to products page from product details page', () => {

  cy.contains('Sauce Labs Backpack', { timeout: TIMEOUT })
    .should('be.visible')
    .click()

  cy.get('[data-test="back-to-products"]', { timeout: TIMEOUT })
    .should('be.visible')
    .click()

  cy.contains('Products', { timeout: TIMEOUT })
    .should('be.visible')
})

})
