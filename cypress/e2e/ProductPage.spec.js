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


//5
it('Verify user can add a product to the cart and button updates accordingly', () => {

  // Select a product
  cy.contains('Sauce Labs Onesie', { timeout: TIMEOUT })
    .should('be.visible')
    .parents('.inventory_item_description')
    .find('button')
    .should('contain', 'Add to cart')
    .click()

  // Verify button changes to Remove
  cy.contains('Sauce Labs Onesie', { timeout: TIMEOUT })
    .parents('.inventory_item_description')
    .find('button')
    .should('contain', 'Remove')
})

//6
it('Verify product sort dropdown options and selection functionality', () => {

  cy.get('[data-test="product-sort-container"]', { timeout: TIMEOUT })
    .should('be.visible');

  // verify options
  cy.get('[data-test="product-sort-container"] option', { timeout: TIMEOUT })
    .should('have.length', 4);

  // select option
  cy.get('[data-test="product-sort-container"]', { timeout: TIMEOUT })
    .select('Price (low to high)');

  cy.get('[data-test="active-option"]', { timeout: TIMEOUT })
    .should('contain', 'Price (low to high)');
});

})
