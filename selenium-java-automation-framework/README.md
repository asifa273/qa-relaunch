# QA Automation Portfolio — Selenium 4 + Java + TestNG + Cucumber + RestAssured + SQL + CI/CD

A single project that demonstrates **every line item** in the QA Automated Tester JD.
Built to be talked through in an interview, not just run.

**Asifa Begum** — ISTQB® Certified | github.com/asifa273/qa-relaunch

---

## Why this project exists

The JD asks for eight separate capabilities. Most portfolio repos show one. This one
puts UI, API, database, BDD, and CI/CD in the same codebase so you can answer
"walk me through your framework" with a single story.

---

## Architecture

```
                    ┌──────────────────────────────┐
                    │  testng.xml / Jenkinsfile    │   ← execution + CI layer
                    └──────────────┬───────────────┘
                                   │
        ┌──────────────┬───────────┴────────┬───────────────┐
        │              │                    │               │
   ┌────▼────┐   ┌─────▼─────┐        ┌─────▼─────┐   ┌─────▼──────┐
   │ UI Tests│   │ .feature  │        │ API Tests │   │  DB Tests  │
   │ TestNG  │   │ Cucumber  │        │RestAssured│   │   JDBC     │
   └────┬────┘   └─────┬─────┘        └───────────┘   └────────────┘
        │              │
        │        ┌─────▼──────┐
        └───────►│ Step Defs  │              ← orchestration only, zero locators
                 └─────┬──────┘
                       │
              ┌────────▼─────────┐
              │   Page Objects   │           ← locators + page actions
              │  extends BasePage│
              └────────┬─────────┘
                       │
              ┌────────▼─────────┐
              │  BasePage        │           ← synchronised click/type/wait
              │  DriverFactory   │           ← ThreadLocal<WebDriver>
              │  ConfigReader    │           ← -D > properties > default
              └──────────────────┘
```

**The one-sentence version to say out loud:**
"It's a layered Selenium framework — Page Object Model on top of a ThreadLocal driver
factory, driven by TestNG for data-driven tests and Cucumber for BDD scenarios, with
RestAssured covering the API layer and JDBC covering database integrity, all wired into
Jenkins and GitHub Actions with Extent reports and auto-screenshots on failure."

---

## What maps to which JD requirement

| JD requirement | Where it lives in this repo |
|---|---|
| Selenium WebDriver in Java | `pages/`, `base/DriverFactory.java` |
| Page Object Model | `pages/BasePage.java` + 4 page classes |
| TestNG / JUnit framework | `tests/`, `testng.xml`, groups, DataProvider, priority |
| Cucumber BDD | `features/*.feature`, `steps/UiSteps.java`, `runner/CucumberRunner.java` |
| Functional / regression / smoke / sanity / integration | TestNG `groups`, `testng-smoke.xml` |
| API testing (Postman/Swagger) | `api/BookingApiTest.java` (+ Postman collection story) |
| SQL database validation | `db/DatabaseValidationTest.java`, `utils/DBUtils.java` |
| CI/CD (Jenkins, GitLab CI, Azure DevOps) | `Jenkinsfile`, `.gitlab-ci.yml`, `.github/workflows/` |
| Git version control | branch/PR workflow, see docs/01 |
| Manual test plans, test cases, exploratory | `docs/04-MANUAL-TESTING-PACK.md` |
| Reporting to stakeholders | `listeners/TestListener.java` → Extent report |
| Code reviews of test scripts | review checklist in `docs/01` |

---

## Running it

```bash
# Prerequisites: JDK 17+, Maven 3.9+, Chrome installed.
# Selenium 4 resolves the driver binary itself — no WebDriverManager, no chromedriver on PATH.

mvn clean test                                  # full suite
mvn test -DsuiteXmlFile=testng-smoke.xml        # smoke only
mvn test -Dgroups=api                           # API layer only
mvn test -Dbrowser=firefox -Dheadless=false     # watch it run
mvn test -Dbase.url=https://staging.myapp.com   # point at another environment
```

**Reports after a run**
- `target/extent-report.html` — pass/fail with embedded failure screenshots
- `target/cucumber-report.html` — BDD scenario results
- `target/surefire-reports/` — XML consumed by Jenkins/GitHub

---

## Test inventory

| ID | Layer | What it proves |
|---|---|---|
| TC-LOG-01 | UI | Valid login lands on Products, 6 items listed |
| TC-LOG-02 | UI | 4 invalid-credential variants via `@DataProvider` + SoftAssert |
| TC-LOG-03 | UI | Logout returns to login page |
| TC-E2E-01 | UI | Full purchase: cart → checkout → **total = subtotal + tax** → confirmation |
| TC-CHK-02 | UI | Mandatory field validation blocks checkout |
| TC-SRT-03 | UI | Price low-to-high sort verified by comparing the actual list |
| TC-CRT-04 | UI | Remove-from-cart updates count and contents |
| API-01→06 | API | Auth, POST, GET, PUT, 403 without token, DELETE then 404 |
| DB-01→05 | DB | Status persisted, header total = Σ line items, no orphans, no dup emails, 2nd-highest |
| BDD | Cucumber | Same flows expressed as business-readable Gherkin |

---

## Deliberate design decisions (interviewers probe these)

1. **`By` constants instead of `@FindBy`/PageFactory.** PageFactory's lazy proxies mask
   `StaleElementReferenceException` and Selenium's own maintainers no longer recommend it.
2. **Implicit wait pinned to 2s, explicit waits everywhere.** Mixing a long implicit wait
   with `WebDriverWait` produces unpredictable compound timeouts.
3. **`@BeforeMethod`, not `@BeforeClass`.** Fresh browser per test = no order dependency.
4. **`ThreadLocal<WebDriver>` + `DRIVER.remove()`** — parallel-safe and leak-free.
5. **Retry analyzer capped at 1.** Retries buy triage time; they are not a fix, and flaky
   tests get logged and repaired.
6. **H2 in-memory for DB tests.** The suite runs on any laptop; swap the JDBC URL for MySQL.
