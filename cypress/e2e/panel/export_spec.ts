import {Truncate, Register, Login} from "~/cypress/helpers"

describe("Export offline copy", () => {
    before(() => {
        Truncate()
        Register({})
        Login({})
    })

    it("it works", () => {
        cy.get('a[data-cy=menu]').click()
        cy.get('a[data-cy=export]').click()

        cy.get('aside[data-cy=panel]').as('panel')
        cy.get('@panel').find('button[data-cy=download]').should('not.be.disabled')
    })
})
