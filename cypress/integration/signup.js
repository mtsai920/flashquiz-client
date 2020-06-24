describe('Signing up', function () {
  it('Signs up a user', function () {
    cy.visit('https://mtsai920.github.io/flashquiz-client/#/')
    cy.url().should('equal', 'https://mtsai920.github.io/flashquiz-client/#/')

    cy.get('#sign-up').click()
    cy.get('#email').type('random@b')
    cy.get('#password').type('r')
    cy.get('#passwordConfirmation').type('r')
      .type('{enter}')

    cy.url().should('include', '#/about')
  })
})
