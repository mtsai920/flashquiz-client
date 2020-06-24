describe('Deleting a collection', function () {
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

  it('Navigates to the create collection page', function () {
    // Click on Create Collection in navbar
    cy.get('[data-rb-event-key="#create-collection"]').click()

    cy.url().should('include', '#/create-collection')
  })

  // Creating a collection
  it('Successfully creates collection', function () {
    cy.get('#collection-title').type('random')
    cy.get('#collection-description').type('random')
    cy.get('#collection-create').click()

    cy.get('#collection-create').should('not.be.visible')
  })

  // Deleting the collection
  it('Deletes the collection', function () {
    cy.get('#delete-collection').click()

    cy.url().should('equal', 'https://mtsai920.github.io/flashquiz-client/#/collections')
  })
})
