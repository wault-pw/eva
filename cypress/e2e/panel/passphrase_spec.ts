import {Truncate, Register, Login, LoginAs, DEFAULT_WORKSPACE} from "~/cypress/helpers"

describe("Change passphrase", () => {
    const oldUser = {
        username: "foo",
        password: "bar"
    }

    const newUser = {
        username: "b2025a809c3639018a9dae73b191243aa20c928fad167d70b03b4b34f188983f",
        password: "f5c194113bd1c74af9e2efa05e62d1cfade75d71695be847a781ca90cd3d86e0"
    }

    before(() => {
        Truncate()
        Register(oldUser)
        Login(oldUser)
    })

    it("it works", () => {
        cy.get('a[data-cy=menu]').click()
        cy.get('a[data-cy=passphrase]').click()

        cy.get('aside[data-cy=panel]').as('panel')
        cy.get('@panel').find('input[data-cy=new-username]').type(newUser.username)
        cy.get('@panel').find('input[data-cy=old-username]').type(oldUser.username)
        cy.get('@panel').find('input[data-cy=new-password]').type(newUser.password)
        cy.get('@panel').find('input[data-cy=confirm-password]').type(newUser.password)
        cy.get('@panel').find('input#accept').check()
        cy.get('@panel').find('button[type=submit]').click()

        // it should change credentials
        // and redirect to the login page
        LoginAs(newUser)
        cy.get("aside[data-cy=left]").should("contain", DEFAULT_WORKSPACE)
    })
})
