export const DEFAULT_WORKSPACE = "персональный"

export interface CredentialOpts {
  username?: string | null
  password?: string | null
  passcode?: string
}

export async function Register(opts: CredentialOpts): Promise<void> {
  const username = opts.username ?? "username"
  const password = opts.password ?? "password"

  cy.visit("/#/join")
  cy.get('form[name=join]').as('form')

  // step 1
  cy.get('@form').find('input[type=text]').type(username)
  cy.get('@form').find('input[type=password]').type(password)
  cy.get('@form').find('button[data-cy=next]').click()

  // step 2
  cy.get('@form').find('input[type=password]').type(password)
  cy.get('@form').find('button[data-cy=next]').click()

  // step 3
  cy.get('@form').find('input#check0').check()
  cy.get('@form').find('input#check1').check()
  cy.get('@form').find('button[data-cy=next]').click()

  // it redirects to login page
  expect(cy.get('form[name=login]')).exist
}

export async function Login(opts: CredentialOpts) {
  cy.visit("/#")
  await LoginAs(opts)
}

export async function LoginAs(opts: CredentialOpts) {
  const username = opts.username ?? "username"
  const password = opts.password ?? "password"

  cy.get('form[name=login]').as('form')
  cy.get('@form').find('input[type=text]').type(username)
  cy.get('@form').find('input[type=password]').type(password)
  cy.get('@form').find('button[type=submit]').click()

  if (opts.passcode) {
    cy.get('aside[data-cy=dialog]').as('dialog')
    cy.get('@dialog').find('input').type(opts.passcode)
    cy.get('@dialog').find('button[data-cy=yes]').click()
  }
}

export function Truncate() {
  cy.request({
    url: `${Cypress.env("ALICE_URL")}/__cypress__/truncate`,
    method: 'POST',
    form: true,
    failOnStatusCode: true,
  })
}
