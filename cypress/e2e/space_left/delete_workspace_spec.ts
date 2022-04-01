import {Truncate, Register, Login, DEFAULT_WORKSPACE} from "~/cypress/helpers"

describe("Delete a workspace", () => {
    before(() => {
        Truncate()
        Register({})
        Login({})
    })

    const workspaceName = "foo"

    it("it works", () => {
        cy.get('a[data-cy=left]').click()
        cy.get("aside[data-cy=left]").as("left")
        cy.get("@left").find('a[data-cy=delete]').click()

        // confirmation alert
        cy.get('aside[data-cy=dialog]').as('dialog')
        cy.get('@dialog').find('input').type(DEFAULT_WORKSPACE)
        cy.get('@dialog').find('button[data-cy=yes]').click()

        // it redirects to a new workspace form
        cy.get('form[name=workspace]').as('form')
        cy.get('@form').find('input').type(workspaceName)
        cy.get('@form').find('button').click()

        // new workspace space
        cy.get("aside[data-cy=left]").should("contain.text", workspaceName)
    })
})
