# Client Shopping – Playwright (JavaScript)

UI and API tests for the practice shop at https://rahulshettyacademy.com/client, using the Page Object Model.

## Setup

```bash
npm ci
npx playwright install chromium
cp .env.example .env   # then add your shop credentials
```

## Run

| Command | What it does |
| --- | --- |
| `npm test` | all tests, headless |
| `npm run test:headed` | all tests with a visible browser |
| `npm run test:web` / `npm run test:api` | tests tagged `@Web` / `@API` |
| `npm run report` | open the last HTML report |

Tests skip themselves when the credentials they need are missing.

## Layout

```
src/
  pages/      page objects + POManager (index.js re-exports all)
  fixtures/   extended `test` with poManager and shopCredentials fixtures
  utils/      APIUtils (login / product / order API helpers), requireEnv
  data/       static test data (no real credentials)
tests/        *.spec.js
playwright.config.js           runner config (baseURL, reporters)
Jenkinsfile                    Jenkins pipeline
```

Tests run with one worker because they share a single shop account and cart.
