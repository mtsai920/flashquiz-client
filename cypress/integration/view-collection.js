describe('Creating a collection', function () {
  it('Signs the user in', function () {
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

  it('Navigates to view page', () => {
    cy.get('[data-rb-event-key="#collections"]').click()

    cy.url().should('include', '#/collections')
  })

  it('Selects the first collection available', () => {
    cy.get('.coll-index-title:first').click()

    cy.get('.coll-index-title:first').should('not.be.visible')
  })
})
