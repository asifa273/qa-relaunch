# GreenKart Playwright Project

Standalone Playwright Test suite for the GreenKart storefront. Tests, specification notes, and the test plan are kept together in this project.

## Run

```bash
npm ci
npx playwright install chromium
npm run typecheck
npm test
```

## Layout

- `tests/`: executable Playwright specs and seed
- `specs/`: specification notes
- `test-plans/`: planned storefront scenarios
- `playwright.config.ts`: project-local runner configuration