# EventsBooking — Playwright (TypeScript)

Playwright framework for the EventHub practice app at https://eventhub.rahulshettyacademy.com. The framework layer is in place; spec files have not been written yet.

## Status

🚧 Framework only. There is no `tests/` folder yet, so `npm test` finds nothing to run. [client-Shopping](../client-Shopping/) keeps its own copy of this `src/` code and its specs.

## What's built

- `src/pages/`: page objects (Login, Products, Cart, Payment/Orders, Thank-you) and a `POManager`
- `src/fixtures/eventsFixtures.ts`: `authenticatedEventsPage` (logs in and opens Events) and `createEvent` fixtures
- `src/fixtures/customFixtures.ts`, `fixtureDemoFixtures.ts`: extended `test` objects
- `src/utils/`: `APIUtils`, `requireEnv`, shared `test-base`
- `src/data/`: static order test data

## Setup

```bash
npm ci
npx playwright install chromium
```

Create a `.env` file (git-ignored) with:

```
EVENTS_EMAIL=...
EVENTS_PASSWORD=...
```

## Run

```bash
npm run typecheck
npm test           # once specs are added under tests/
npm run test:headed
```
