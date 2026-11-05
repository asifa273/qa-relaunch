# ParaBank — Playwright (TypeScript)

Playwright project for the ParaBank demo banking app at https://parabank.parasoft.com.

## Status

🚧 Scaffold only. No tests are automated yet.

## What's built

- `playwright.config.ts`: runner config; `BASE_URL` can be overridden by environment variable
- `config/config.ts`: project settings
- `test-data/constants.ts`, `test-data/user.factory.ts`: test data and a user factory
- `tests/auth.setup.ts`: placeholder for the login setup project (empty)
- Empty folders ready for code: `pages/`, `fixtures/`, `utils/`, `tests/ui/`, `tests/api/`

## Setup and run

```bash
npm ci
npx playwright install chromium
npm run typecheck
npm test
npm run report     # open the last HTML report
```
