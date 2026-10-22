import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://rahulshettyacademy.com/seleniumPractise',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/e2e.ts',
    viewportWidth: 1366,
    viewportHeight: 768,
    defaultCommandTimeout: 8000,
    video: false,
    screenshotOnRunFailure: true,
    retries: { runMode: 2, openMode: 0 },
  },
});
