import {Truncate, Register, Login} from "~/cypress/helpers"

describe("Terminate account", () => {
  const user = {
    username: "foo",
    password: "bar"
  }

  before(() => {
    Truncate()
    Register(user)
    Login(user)
  })

  it("it works", () => {
    cy.get('a[data-cy=menu]').click()
    cy.get('a[data-cy=termination]').click()

    cy.get('aside[data-cy=panel]').as('panel')
    cy.get('@panel').find('input[data-cy=username]').type(user.username)
    cy.get('@panel').find('input#accept').check()
    cy.get('@panel').find('button[type=submit]').click()

    cy.get('aside[data-cy=dialog]').as('dialog')
    cy.get('@dialog').find('button[data-cy=yes]').click()

    // it redirects to login page
    expect(cy.get('form[name=login]')).exist
  })
})
