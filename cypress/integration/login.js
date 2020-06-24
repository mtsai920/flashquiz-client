describe('Signs in the user', function () {
  it('Loads the page and signs in the user', function () {
    // Visit FlashQuiz - assertion when page is successfully reached
    cy.visit('https://mtsai920.github.io/flashquiz-client/#/')
    cy.url().should('equal', 'https://mtsai920.github.io/flashquiz-client/#/')

    // Code to sign in the user
    cy.get('#sign-in').click()
    cy.get('#email').type('test@test')
    cy.get('#password').type('test')
      .type('{enter}')

    // User should be successfully redirected to About page
    cy.url().should('include', '#/about')
  })
})
