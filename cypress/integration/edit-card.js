describe('Creating a card', function () {
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

  it('Successfully creates collection', function () {
    cy.get('#collection-title').type('random')
    cy.get('#collection-description').type('random')
    cy.get('#collection-create').click()

    cy.get('#collection-create').should('not.be.visible')
  })

  // Creating a card
  it('Creates a card', function () {
    cy.get('#card-term').type('hi')
    cy.get('#card-definition').type('hello')
    cy.get('#create-card').click()

    // Card should appear at the bottom of the screen
    cy.get('.flip-card').should('be.visible')
  })

  // Clicking on card
  it('Selects card', function () {
    cy.get('.flip-card').last().click()
  })
})
