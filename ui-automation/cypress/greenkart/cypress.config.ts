import { defineConfig } from 'cypress';

export default defineConfig({
  fixturesFolder: 'greenkartE2E/fixtures',
  e2e: {
    baseUrl: 'https://rahulshettyacademy.com/seleniumPractise',
    specPattern: 'greenkartE2E/e2e/green-kart/**/*.cy.ts',
    supportFile: 'greenkartE2E/e2e/green-kart/cypress/support/e2e.js',
    viewportWidth: 1366,
    viewportHeight: 768,
    defaultCommandTimeout: 8000,
    video: false,
    screenshotOnRunFailure: true,
    retries: { runMode: 2, openMode: 0 },
  },
});
