# Cypress + TypeScript: GreenKart

End-to-end and API tests for the [GreenKart practice app](https://rahulshettyacademy.com/seleniumPractise/#/), written in Cypress with TypeScript. Companion to the Playwright suite in this repo.

## What it covers

| Spec | What it tests | Cypress features |
|---|---|---|
| `search.cy.ts` | Search filters products; no-match case | custom command, page object |
| `checkout.cy.ts` | Two-item order, invalid promo, terms not accepted | fixtures, page objects, `this` aliases |
| `network-mock.cy.ts` | Empty product list, server error | `cy.intercept`, `cy.wait('@alias')` |
| `products-api.cy.ts` | Status code, shape of every product | `cy.request` |

## Run it

```bash
npm ci
npx cypress open          # interactive runner
npm run cy:run            # headless, Chrome
npm run typecheck         # tsc --noEmit
```

## Cypress vs Playwright: what I noticed

|                           | Cypress                                             | Playwright                                    |
|---                        |---                                                  |---                                            |
| How tests run             | Inside the browser, commands are queued and chained | Outside the browser, async/await              |
| Waiting                   | Automatic retries on queries and assertions         | Auto-waiting on actions; web-first assertions |
| Multiple tabs / origins   | Limited (`cy.origin` for cross-origin)              | Built in                                      |
| Network mocking           | `cy.intercept`                                      | `page.route`                                  |
| API tests                 | `cy.request`                                        | `request` fixture                             |


