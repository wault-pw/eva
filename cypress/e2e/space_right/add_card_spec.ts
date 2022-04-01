import {Truncate, Register, Login} from "~/cypress/helpers"

describe("Add new card", () => {
    before(() => {
        Truncate()
        Register({})
        Login({})
    })

    const card = {
        title: "foo",
        tag: "bar",
        label: "baz",
        body: "qux"
    }

    it("it works", () => {
        cy.get('a[data-cy=add]').click()

        cy.get('form[name=card]').as('form')
        cy.get('@form').find('input[data-cy=title]').type(card.title)
        cy.get('@form').find('input[data-cy=tag]').type(card.tag)
        cy.get('@form').find('input[data-cy=label]').eq(0).focus().clear().type(card.label)
        cy.get('@form').find('textarea[data-cy=body]').eq(0).focus().clear().type(card.body)
        cy.get('@form').find('button[data-cy=save]').click()

        // it saves a card and open the preview
        cy.get('div[data-cy=card]').as("card")
        cy.get("@card").should("contain.text", card.title)
        cy.get("@card").should("contain.text", card.tag)
        cy.get("@card").should("contain.text", card.label)
        cy.get("@card").should("contain.text", card.body)

        // it also adds a tag to the left side
        cy.get("aside[data-cy=left]").as("left")
        cy.get("@left").should("contain.text", card.tag)
    })
})
