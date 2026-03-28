describe('SauceDemo Login Tests', () => {

  const TIMEOUT = 20000;

  beforeEach(() => {
    cy.visit('/', { timeout: TIMEOUT })
    cy.contains('Swag Labs', { timeout: TIMEOUT })
    .should('be.visible')
  })

  //1
  it('Verify successful login with valid credentials', () => {

    cy.get('[data-test="username"]', { timeout: TIMEOUT }).type('standard_user')
    cy.get('[data-test="password"]', { timeout: TIMEOUT }).type('secret_sauce')

    cy.get('[data-test="login-button"]', { timeout: TIMEOUT }).click()

    cy.url({ timeout: TIMEOUT }).should('include', '/inventory.html')
  })

  //2
  it('Verify error message when password is empty', () => {

    cy.get('[data-test="username"]', { timeout: TIMEOUT }).type('standard_user')

    cy.get('[data-test="login-button"]', { timeout: TIMEOUT }).click()

    cy.get('[data-test="error"]', { timeout: TIMEOUT })
      .should('be.visible')
      .and('contain.text', 'Password is required')
  })

  //3
  it('Verify error message when username is empty', () => {

  cy.get('[data-test="password"]', { timeout: TIMEOUT }).type('secret_sauce')

  cy.get('[data-test="login-button"]', { timeout: TIMEOUT }).click()

  cy.get('[data-test="error"]', { timeout: TIMEOUT })
    .should('be.visible')
    .and('contain.text', 'Username is required')
  })  

  //4
  it('Verify error message for invalid credentials', () => {

    cy.get('[data-test="username"]', { timeout: TIMEOUT }).type('wrong_user')
    cy.get('[data-test="password"]', { timeout: TIMEOUT }).type('wrong_pass')

    cy.get('[data-test="login-button"]', { timeout: TIMEOUT }).click()

    cy.get('[data-test="error"]', { timeout: TIMEOUT })
      .should('be.visible')
      .and('contain.text', 'Username and password do not match any user in this service')
  })

  //5
  it('Verify username field clears correctly after typing and deleting', () => {

  cy.get('[data-test="username"]', { timeout: TIMEOUT })
    .type('test automation')
    .clear()

  cy.get('[data-test="login-button"]', { timeout: TIMEOUT }).click()

  cy.get('[data-test="error"]', { timeout: TIMEOUT })
    .should('be.visible')
    .and('contain.text', 'Username is required')
})

})