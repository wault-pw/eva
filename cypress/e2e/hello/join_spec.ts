import {Truncate} from "~/cypress/helpers"

describe('join', () => {
    before(() => {
        Truncate()
        cy.visit("/#")
    })

    it('creates a user', () => {
        cy.get('a[data-cy=join]').click()
        cy.get('form[name=join]').as('form')

        // step 1
        cy.get('@form').find('input[type=text]').type('user')
        cy.get('@form').find('input[type=password]').type('password')
        cy.get('@form').find('button[data-cy=next]').click()

        // step 2
        cy.get('@form').find('input[type=password]').type('password')
        cy.get('@form').find('button[data-cy=next]').click()

        // step 3
        cy.get('@form').find('input#check0').check()
        cy.get('@form').find('input#check1').check()
        cy.get('@form').find('button[data-cy=next]').click()

        // it redirects to login page
        expect(cy.get('form[name=login]')).exist
    })
})
