import {Truncate, Register, Login, DEFAULT_WORKSPACE} from "~/cypress/helpers"
import {authenticator} from "otplib"

describe("Mfa enable/disable", () => {
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
    /**
     * Turn ON MFA
     */
    cy.get('a[data-cy=menu]').click()
    cy.get('a[data-cy=mfa]').click()

    cy.get('aside[data-cy=panel]').as('panel')
    cy.get('@panel').find('a[data-cy=on]').click()

    cy.get('@panel').find('span[data-cy=secret]').invoke('text').then((secret: string) => {
      cy.get('@panel').find('input[data-cy=username]').type(user.username)
      cy.get('@panel').find('input[data-cy=passcode]').type(authenticator.generate(secret))
      cy.get('@panel').find('input#accept').check()
      cy.get('@panel').find('button').click()

      expect(cy.get('@panel').get('a[data-cy=off]')).exist

      cy.reload()
      Login({...user, passcode: authenticator.generate(secret)})
    })

    /**
     * Turn OFF MFA
     */
    cy.get('a[data-cy=menu]').click()
    cy.get('a[data-cy=mfa]').click()
    cy.get('aside[data-cy=panel]').as('panel')
    cy.get('@panel').find('a[data-cy=off]').click()

    cy.get('aside[data-cy=dialog]').as('dialog')
    cy.get('@dialog').find('button[data-cy=yes]').click()
    expect(cy.get('@panel').get('a[data-cy=on]')).exist

    cy.reload()
    Login(user)

    cy.get("aside[data-cy=left]").should("contain.text", DEFAULT_WORKSPACE)
  })
})
