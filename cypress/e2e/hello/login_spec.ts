import {Truncate, Register, Login, DEFAULT_WORKSPACE} from "~/cypress/helpers"

describe("login", () => {
  describe("when workspace exists", () => {
    before(() => {
      Truncate()
      Register({})
      Login({})
    })

    it("redirects to workspace", () => {
      cy.get("aside[data-cy=left]").should("contain", DEFAULT_WORKSPACE)
    })
  })
})
