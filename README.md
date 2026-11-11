# QA Relaunch — SDET / QA Automation Portfolio

> A hands-on portfolio of test automation projects across **UI, API, database, BDD, performance, and AI-assisted QA**, built with Selenium, Playwright, Cypress, Java, TypeScript, and Python. Each project is self-contained with its own build file and README.

![Java](https://img.shields.io/badge/Java-11%20%7C%2017-orange)
![Selenium](https://img.shields.io/badge/Selenium-4.x-43B02A?logo=selenium&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-Test-2EAD33?logo=playwright&logoColor=white)
![Cypress](https://img.shields.io/badge/Cypress-TypeScript-69D3A7?logo=cypress&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.11+-3776AB?logo=python&logoColor=white)
![pytest](https://img.shields.io/badge/pytest-tested-0A9EDC?logo=pytest&logoColor=white)
![TestNG](https://img.shields.io/badge/TestNG-7.x-red)
![GitHub Actions](https://img.shields.io/badge/CI-GitHub%20Actions-2088FF?logo=githubactions&logoColor=white)

**Live CI status**

[![Playwright Tests](https://github.com/asifa273/qa-relaunch/actions/workflows/playwright.yml/badge.svg)](https://github.com/asifa273/qa-relaunch/actions/workflows/playwright.yml)
[![Cypress Tests](https://github.com/asifa273/qa-relaunch/actions/workflows/cypress.yml/badge.svg)](https://github.com/asifa273/qa-relaunch/actions/workflows/cypress.yml)
[![Selenium Test Suite](https://github.com/asifa273/qa-relaunch/actions/workflows/selenium-banking.yml/badge.svg)](https://github.com/asifa273/qa-relaunch/actions/workflows/selenium-banking.yml)
[![QA Regression](https://github.com/asifa273/qa-relaunch/actions/workflows/selenium-regression.yml/badge.svg)](https://github.com/asifa273/qa-relaunch/actions/workflows/selenium-regression.yml)
[![AI Defect Resolver CI](https://github.com/asifa273/qa-relaunch/actions/workflows/ai-defect-resolver.yml/badge.svg)](https://github.com/asifa273/qa-relaunch/actions/workflows/ai-defect-resolver.yml)

**Author:** Asifa Begum — QA / SDET · Frisco, TX
🔗 [LinkedIn](https://www.linkedin.com/in/asifa-begum-qa/) · [GitHub](https://github.com/asifa273)

---

## What's automated

Status key: ✅ automated tests in place · 🚧 framework built, tests partly written · 📝 practice / learning code · 🔜 planned

### UI automation — Selenium (Java)

| Project | Application under test | What's automated | Status |
|---|---|---|---|
| [E2E-SauceDemo-Framework](ui-automation/selenium-java/E2E-SauceDemo-Framework/) | SauceDemo (UI) + Restful-Booker (API) + H2 (DB) | 7 UI tests (login, logout, purchase, checkout validation, price sort, cart removal), 6 REST Assured API tests, 5 JDBC data-integrity tests, 4 Cucumber scenarios | ✅ |
| [BankingApplication](ui-automation/selenium-java/BankingApplication/qa-automation-banking/) | Guru99 Bank demo | 7 login tests. Page objects exist for Dashboard, Deposit, New Account, Transactions; those test classes are still empty | 🚧 |
| [LoginFlowAutomator](ui-automation/selenium-java/LoginFlowAutomator/) | SauceDemo | One end-to-end test: login → sort low→high → cart badge → checkout | ✅ |
| [SeleniumBasicsExercise](ui-automation/selenium-java/SeleniumBasicsExercise/) | Google search, practice pages | Beginner TestNG tests with config reader, wait and driver utilities | 📝 |

### UI automation — Playwright

| Project | Application under test | What's automated | Status |
|---|---|---|---|
| [JavascriptProjects/clientShopping](ui-automation/playwright/JavascriptProjects/clientShopping/) | Rahul Shetty Academy client shop | POM + custom fixtures: data-driven order placement, alternate login, bad-credential checks, order created via API then verified in UI. Allure reports and a Jenkinsfile | ✅ |
| [TypescriptProjects/client-Shopping](ui-automation/playwright/TypescriptProjects/client-Shopping/) | Client shop, Angular practice, SauceDemo, EventHub | 15 spec files, 24 tests: login flows, cart, new-tab handling, Excel upload/download, API + UI order flow, request interception, API mocking, cross-user access-denied check | ✅ |
| [TypescriptProjects/greenKart-shopping](ui-automation/playwright/TypescriptProjects/greenKart-shopping/) | GreenKart grocery store | Catalog search, checkout totals and country validation, plus a written storefront test plan | ✅ |
| [TypescriptProjects/automationExercice](ui-automation/playwright/TypescriptProjects/automationExercice/) | automationexercise.com | User lifecycle (register, login, logout, delete). Add-to-cart spec is still empty | ✅ |
| [TypescriptProjects/EventsBooking](ui-automation/playwright/TypescriptProjects/EventsBooking/) | EventHub | Page objects, API utilities, and fixtures (logged-in page, create-event). No spec files yet | 🚧 |
| [TypescriptProjects/paraBank-project](ui-automation/playwright/TypescriptProjects/paraBank-project/) | ParaBank | Config, test-data factory, and folder layout only | 🚧 |
| [cucumber-Playwright Features_Project](ui-automation/playwright/cucumber-Playwright%20Features_Project/) | Client shop | 4 Gherkin features (end-to-end order, add all to cart, error login, parametrized login) with JS step definitions | ✅ |

### UI automation — Cypress

| Project | Application under test | What's automated | Status |
|---|---|---|---|
| [greenkart-project](ui-automation/cypress/greenkart-project/) | GreenKart | 10 tests: product search, checkout (order, invalid promo, terms not accepted), network mocking with `cy.intercept`, products API with `cy.request`. TypeScript page objects and custom commands | ✅ |

### API testing

| Project | What's there | Status |
|---|---|---|
| REST Assured — inside [E2E-SauceDemo-Framework](ui-automation/selenium-java/E2E-SauceDemo-Framework/) | Restful-Booker: auth token, create, get, update, 403 without token, delete | ✅ |
| Playwright API — inside the Playwright projects | `request` fixture, login/order API helpers, `page.route` mocking | ✅ |
| [API/rest-assured](API/rest-assured/) | Standalone REST Assured project | 🔜 |
| [API/postman](API/postman/) | Postman collections | 🔜 |

### Python and AI-assisted QA

| Project | What's automated | Status |
|---|---|---|
| [ai-defect-resolver](ui-automation/python/ai-defect-resolver/) | Claude API defect workflow: root-cause analysis → generated fix → pytest validation → markdown report. 7 pytest tests | ✅ |
| [pytest](ui-automation/python/pytest/) | 33 pytest tests: assertions, fixtures, parametrization, Selenium login pages. Also a Flask chatbot (`chatbot_app.py`) and OOP demo (`app.py`) | ✅ |

### BDD, performance, and fundamentals

| Area | Location | What's there | Status |
|---|---|---|---|
| BDD feature specs | [bdd-cucumber/](bdd-cucumber/) | 11 Gherkin features: login, logout, signup, search, product details, cart, checkout, payment, orders, profile, notifications | 📝 Specs only |
| Cucumber + Selenium + TestNG | [bdd-cucumber/LinearCucumberSeleniumPractice/AutomationCICD-main/](bdd-cucumber/LinearCucumberSeleniumPractice/AutomationCICD-main/) | Course framework: page objects, step definitions, TestNG runner, retry, listeners, Extent reports, JSON data | ✅ |
| SpecFlow (.NET) | [bdd-cucumber/specflow/](bdd-cucumber/specflow/) | — | 🔜 |
| Performance | [performance/jmeter/](performance/jmeter/) | JMeter test plan and thread group | 📝 |
| Java | [core-skills/java-fundamentals/](core-skills/java-fundamentals/) | Operators, loops, arrays, strings, methods, OOP, interfaces | 📝 |
| JavaScript / TypeScript | [core-skills/javascript/](core-skills/javascript/), [core-skills/typescript/](core-skills/typescript/) | Loops, classes, string exercises (palindrome, reverse words, character frequency) | 📝 |
| Python | [core-skills/pythonFullCourse/](core-skills/pythonFullCourse/) | Data types, collections, functions, classes, file I/O, error handling | 📝 |
| SQL data QA | [core-skills/sql/](core-skills/sql/) | Data-quality query patterns (documented, scripts in progress) | 🚧 |

---

## Featured projects

### 🧪 E2E SauceDemo Framework — UI + API + DB + BDD
The most complete project here. Layered Selenium framework: Page Objects on a `ThreadLocal` driver factory, TestNG for data-driven tests, Cucumber for BDD, REST Assured for the API layer, and JDBC (H2) for database checks. Ships with a Jenkinsfile, GitLab CI, and a GitHub Actions workflow, Extent reports, and screenshots on failure.

```bash
cd ui-automation/selenium-java/E2E-SauceDemo-Framework
mvn clean test                            # full suite
mvn test -DsuiteXmlFile=testng-smoke.xml  # smoke only
```

### 🎭 Playwright — client shop (TypeScript)
The widest Playwright suite: UI flows, API-driven setup, request interception, response mocking, file upload/download, multi-tab handling, and a cross-user authorization check.

```bash
cd "ui-automation/playwright/TypescriptProjects/client-Shopping"
npm install
npx playwright install
npx playwright test
```

### 🤖 AI Defect Resolver — QA meets GenAI
```
Bug Report → AI Root Cause Analysis → AI-Generated Fix → pytest Validation → Resolution Report
```

```bash
cd ui-automation/python/ai-defect-resolver
pip install -r requirements.txt
export ANTHROPIC_API_KEY="your_api_key_here"
pytest tests/ -v
```

### 🏦 Banking Application — Selenium POM
Login suite against Guru99 Bank with ExtentReports and screenshot-on-failure. Credentials come from `GURU99_USER_ID` / `GURU99_PASSWORD` and are never committed; tests that need them are skipped when they're missing.

```bash
cd ui-automation/selenium-java/BankingApplication/qa-automation-banking
mvn test -Dguru99.userId=<your mngr id> -Dguru99.password=<your password>
```

---

## Credentials

Projects that log in read credentials from a local `.env` file (git-ignored) or from GitHub Actions secrets. Copy `.env.example` where one is provided. Never commit real credentials.

---

## Skills covered

**UI Automation:** Selenium WebDriver, Playwright, Cypress, Page Object Model, custom fixtures
**API Testing:** REST Assured, Playwright `request`, network interception and mocking
**Database Testing:** JDBC validation against H2
**BDD:** Cucumber (Java and JS), Gherkin
**Languages:** Java, TypeScript, JavaScript, Python
**Frameworks/Tools:** TestNG, pytest, Maven, npm, WebDriverManager, Lombok, ExtentReports, Allure
**CI/CD:** GitHub Actions, Jenkins, GitLab CI
**Performance:** JMeter
**AI in QA:** Claude API for automated defect analysis

---

## Repository structure

```
qa-relaunch/
├── .github/workflows/               # CI: Playwright, Cypress, Selenium (2), AI Defect Resolver
├── API/
│   ├── postman/                       # Planned collections
│   └── rest-assured/                  # Planned standalone project
├── bdd-cucumber/
│   ├── *.feature                      # 11 Gherkin feature specs
│   ├── LinearCucumberSeleniumPractice/AutomationCICD-main/   # Cucumber + Selenium + TestNG
│   └── specflow/                      # Planned .NET BDD
├── core-skills/
│   ├── java-fundamentals/
│   ├── javascript/
│   ├── typescript/
│   ├── pythonFullCourse/
│   └── sql/
├── performance/jmeter/                # JMeter plans
└── ui-automation/
    ├── cypress/greenkart-project/     # Cypress + TypeScript
    ├── playwright/
    │   ├── JavascriptProjects/clientShopping/
    │   ├── TypescriptProjects/
    │   │   ├── client-Shopping/
    │   │   ├── greenKart-shopping/
    │   │   ├── automationExercice/
    │   │   ├── EventsBooking/
    │   │   └── paraBank-project/
    │   └── cucumber-Playwright Features_Project/
    ├── python/
    │   ├── ai-defect-resolver/
    │   └── pytest/
    └── selenium-java/
        ├── E2E-SauceDemo-Framework/
        ├── BankingApplication/qa-automation-banking/
        ├── LoginFlowAutomator/
        └── SeleniumBasicsExercise/
```

---

## Roadmap

- [ ] Write Banking account, deposit, transaction, and data-validation tests
- [ ] Add specs to the EventsBooking and ParaBank Playwright projects
- [ ] Add Postman REST API collections
- [ ] Commit the SQL data-quality scripts described in `core-skills/sql/README_SQL.md`

---

_Built as a focused relaunch into SDET / QA Automation Engineering, pairing framework depth (Selenium, Playwright, Cypress) with API, data, CI/CD, and AI-assisted testing._
