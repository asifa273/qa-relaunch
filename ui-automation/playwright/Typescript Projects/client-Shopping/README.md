# Client Shopping — Playwright (TypeScript)

UI and API tests across several practice sites, written in TypeScript with the Page Object Model (`src/pages/`).

## What's automated

| Spec | What it tests |
|---|---|
| `clientAppPOM.spec.ts` | Data-driven order placement and invalid-login cases on the client shop (POM) |
| `eCommerceUIEndtoEnd.spec.ts` | Registration form; add every product to cart and cross-check the count three ways |
| `webAPIPart1.spec.ts` | Create an order through the API, inject the token, verify the order in the UI |
| `webAPIPart2.spec.ts` | Log in once, save `storageState`, reuse it to add products and check cart titles |
| `networkTest.spec.ts` | Mock the orders API response to check the "No Orders" empty state |
| `networkTest2.spec.ts` | Security check: reroute an order-details request to another user's order, expect "not authorized" |
| `sandboxBannerVisibilitywithAPIMocking.spec.ts` | Mock the events API (6 vs 4 events) and check the sandbox banner shows or hides |
| `crossUserBookingAccessDenied.spec.ts` | One user gets "Access Denied" when opening another user's booking |
| `angularPracticeLoginShop.spec.ts` | Angular practice login; removing one cart item leaves the other three |
| `siginPage.spec.ts` | Sign-in navigates to the shop; blinking link opens a new tab |
| `sauceDemo.spec.ts` | SauceDemo login pass and fail |
| `uploadDownload.spec.ts` | Download an Excel file, edit a cell with ExcelJS, upload it, verify the change |
| `fixturesDemo.spec.ts` | Custom fixtures: logged-in page + API-created order shown on the Orders page |
| `buildLoginEventFixture.spec.ts` | Custom fixtures: newly created EventHub event appears on the events page |
| `example.spec.ts` | Playwright starter example |

Tests are tagged `@Web` or `@API` so they can be run by group.

## Layout

```
src/
  pages/      page objects + POManager
  fixtures/   custom fixtures (logged-in page, API-created order, EventHub event)
  utils/      APIUtils, requireEnv, test-base
  data/       static order test data
PageObjects_ts/   earlier numbered page objects (not used by current specs)
tests/            *.spec.ts
```

## Setup

```bash
npm ci
npx playwright install
```

Logins read credentials from a local `.env` file (git-ignored).

## Run

```bash
npm test                           # all specs, headless
npx playwright test --headed       # visible browser
npx playwright test --grep @API    # API-tagged tests only
npx playwright show-report         # last HTML report
```
