/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    truncate(): Chainable<any>
  }
}
