

describe('template spec', () => {
  const triggerSubscription = `trigger-subscription-button`;
  const notificationCount = `notification-count`;
  it('passes', () => {
    cy.visit('http://localhost:4200/')
    cy.get(`[data-cy=${triggerSubscription}]`).click()
    cy.get(`[data-cy=${notificationCount}]`).should('have.text', '1')
  })
})
