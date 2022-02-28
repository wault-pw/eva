Cypress.Commands.add("truncate", function () {
  cy.request({
    url: `${Cypress.env("ALICE_URL")}/__cypress__/truncate`,
    method: 'POST',
    form: true,
    failOnStatusCode: true,
  })
})
