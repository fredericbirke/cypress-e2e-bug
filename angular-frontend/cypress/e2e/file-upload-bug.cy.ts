

describe('template spec', () => {
  const triggerSubscription = `trigger-subscription-button`;
  it('passes', () => {
    cy.visit('http://localhost:4200/')
    cy.get(`[data-cy=${triggerSubscription}]`).click()
  })
})
