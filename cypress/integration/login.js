// Cypress call to sign in
describe('My first test', function () {
  it('Visits a webpage', function () {
    cy.visit('https://mtsai920.github.io/flashquiz-client/#/')

    cy.url().should('equal', 'https://mtsai920.github.io/flashquiz-client/#/')

    cy.get('#sign-in').click()

    cy.get('#email').type('test@test')

    cy.get('#password').type('test')
      .type('{enter}')

    cy.url().should('include', '#/about')
  })
})
