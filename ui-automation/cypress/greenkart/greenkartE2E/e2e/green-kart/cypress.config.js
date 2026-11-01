const { defineConfig } = require("cypress");

module.exports = defineConfig({
  fixturesFolder: "../../fixtures",
  e2e: {
    specPattern: "**/*.cy.ts",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
