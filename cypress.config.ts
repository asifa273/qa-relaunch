import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    specPattern: "ui-automation/cypress/e2e/**/*.cy.js",
    supportFile: "ui-automation/cypress/e2e/support/e2e.js",
    fixturesFolder: "ui-automation/cypress/e2e/fixtures",
  },
});
