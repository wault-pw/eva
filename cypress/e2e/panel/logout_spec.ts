import {Truncate, Register, Login} from "~/cypress/helpers"

describe("Logout", () => {
    before(() => {
        Truncate()
        Register({})
        Login({})
    })

    it("it works", () => {
        cy.get('a[data-cy=menu]').click()
        cy.get('a[data-cy=logout]').click()

        expect(cy.get('form[name=login]')).exist
    })
})
