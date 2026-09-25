# QA Relaunch — SDET / QA Automation Portfolio

> A hands-on portfolio of test automation projects across **UI, API, data, and AI-assisted QA** — built with Selenium, Playwright, Java, Python, and CI/CD pipelines. Working projects and clearly marked learning tracks target real SDET / QA Automation Engineer skills.

![Java](https://img.shields.io/badge/Java-21-orange)
![Selenium](https://img.shields.io/badge/Selenium-4.x-43B02A?logo=selenium&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-1.63-2EAD33?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-7-3178C6?logo=typescript&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.11+-3776AB?logo=python&logoColor=white)
![pytest](https://img.shields.io/badge/pytest-tested-0A9EDC?logo=pytest&logoColor=white)
![TestNG](https://img.shields.io/badge/TestNG-7.10-red)
![GitHub Actions](https://img.shields.io/badge/CI-GitHub%20Actions-2088FF?logo=githubactions&logoColor=white)

**Live CI status**

[![Playwright Tests](https://github.com/asifa273/qa-relaunch/actions/workflows/playwright.yml/badge.svg)](https://github.com/asifa273/qa-relaunch/actions/workflows/playwright.yml)
[![Selenium Test Suite](https://github.com/asifa273/qa-relaunch/actions/workflows/selenium-banking.yml/badge.svg)](https://github.com/asifa273/qa-relaunch/actions/workflows/selenium-banking.yml)
[![QA Regression](https://github.com/asifa273/qa-relaunch/actions/workflows/selenium-regression.yml/badge.svg)](https://github.com/asifa273/qa-relaunch/actions/workflows/selenium-regression.yml)
[![AI Defect Resolver CI](https://github.com/asifa273/qa-relaunch/actions/workflows/ai-defect-resolver.yml/badge.svg)](https://github.com/asifa273/qa-relaunch/actions/workflows/ai-defect-resolver.yml)

**Author:** Asifa Begum — QA / SDET · Frisco, TX
🔗 [LinkedIn](https://www.linkedin.com/in/asifa-begum-qa/) · [GitHub](https://github.com/asifa273)

---

## What's inside

| Area | Project | What it demonstrates | Status |
|---|---|---|---|
| **Selenium (Java)** | `ui-automation/selenium-java/` | Banking, SauceDemo, and Selenium fundamentals POM frameworks | ✅ Working (see CI badges) |
| **Playwright (JS/TS)** | `ui-automation/playwright/` | Browser E2E tests in JS and TypeScript + GitHub Actions CI | ✅ Working (see CI badges) |
| **AI-assisted QA** | `python-automation/ai-defect-resolver/` | Claude API defect analysis → fix → validate → report loop | ✅ Working |
| **Python** | `python-automation/pytest/` | pytest suites, fixtures, parametrization | ✅ Working |
| **Python** | `python-automation/` | Flask chatbot and Python learning track | ✅ Working |
| **BDD / Cucumber** | `bdd-cucumber/` | Gherkin feature specs (`*.feature`) + a Cucumber-Selenium-TestNG framework built while following a course | 📝 Specs + course framework |
| **Java fundamentals** | `core-skills/java-fundamentals/` | Core Java, OOP, arrays, loops, methods | ✅ Working |
| **Performance** | `performance/jmeter/` | JMeter test plan + thread group | 📝 Test plans |
| **SQL data QA** | `core-skills/sql/` | Data-quality query patterns (nulls, duplicates, reconciliation) | 🚧 Documented, scripts in progress |
| **API (Postman)** | `api-testing/postman/` | REST collections | 🔜 Planned |
| **API (REST Assured)** | `ui-automation/selenium-java/E2E-Banking-Framework/` | Java API tests with response validation | ✅ Working |
| **SpecFlow (.NET BDD)** | `bdd-cucumber/specflow/` | C# BDD | 🔜 Planned |

---

## Featured projects

### 🏦 Banking Application — Selenium POM Framework
A structured **Page Object Model** automation framework for a banking web app.
- **Pages:** Login, Dashboard, Deposit, New Account, Transactions
- **Tests:** 7 login scenarios (valid, wrong password/username, empty fields), including Guru99's JavaScript error alert. Account, deposit, transaction and data-validation suites are next.
- **Framework plumbing:** ThreadLocal driver in `BaseTest`, `ConfigReader`, `WaitHelper`, ExtentReports with a screenshot on failure
- **Credentials:** Guru99 manager credentials expire after 20 days, so they are read from `GURU99_USER_ID` / `GURU99_PASSWORD` (GitHub secrets in CI) and never committed. Without them, credential-dependent tests are skipped, not failed.
- **CI:** GitHub Actions workflow (`.github/workflows/selenium-banking.yml`) runs the suite automatically
- **Stack:** Java · Selenium WebDriver · TestNG · Maven

```bash
cd ui-automation/selenium-java/BankingApplication/qa-automation-banking
mvn test -Dguru99.userId=<your mngr id> -Dguru99.password=<your password>
```

### 🔐 LoginFlowAutomator — End-to-End SauceDemo
Validates the full user journey: authentication, sorting products (low→high), cart badge validation, and complete checkout.
- **Stack:** Java 21 · Selenium 4.21 · TestNG · WebDriverManager · Lombok · Maven

```bash
cd ui-automation/selenium-java/LoginFlowAutomator
mvn test
```

### 🧪 E2E Banking Framework — Full-Stack QA
The strongest Selenium project in this repository combines Page Objects, a `ThreadLocal` driver, Cucumber scenarios, RestAssured API coverage, JDBC validation, and cross-browser CI.

```bash
cd ui-automation/selenium-java/E2E-Banking-Framework
mvn test
```

### 🎭 Playwright E2E Suite
Browser end-to-end tests against practice e-commerce and sign-in sites.
- **Specs:** SauceDemo login (pass/fail), shop flow, sign-in, user registration, Angular practice, API/UI authorization checks
- **Config:** parallel execution on Chromium, HTML reporter, trace/screenshot/video **on failure**, retries on CI
- **CI:** GitHub Actions (`playwright.yml`) runs on every push/PR and uploads the HTML report as an artifact
- **Stack:** JavaScript + TypeScript · @playwright/test 1.63

```bash
cd ui-automation/playwright
npm install
npx playwright install
npx playwright test          # headless
npx playwright test --headed # visible browser
```

CI expects these GitHub Actions secrets: `SHOP_EMAIL`, `SHOP_PASSWORD`, `SHOP_REGISTRATION_EMAIL`, `SHOP_REGISTRATION_PASSWORD`, `EVENTS_EMAIL`, `EVENTS_PASSWORD`, `GMAIL_EMAIL`, `GMAIL_PASSWORD`, `YAHOO_EMAIL`, `YAHOO_PASSWORD`, `PRACTICE_USERNAME`, `PRACTICE_PASSWORD`, `PRACTICE_FORM_NAME`, `PRACTICE_FORM_EMAIL`, and `PRACTICE_FORM_PASSWORD`.

### 🤖 AI Defect Resolver — QA meets GenAI
An AI-driven defect-resolution workflow powered by the **Claude API**:

```
Bug Report → AI Root Cause Analysis → AI-Generated Fix → pytest Validation → Resolution Report
```

- **`src/analyzer.py`** — sends the defect to Claude, returns root cause + impact
- **`src/fix_generator.py`** — generates a corrected version of the code
- **`src/validator.py`** — validates the fix with pytest assertions
- **`src/reporter.py`** — auto-writes a structured markdown resolution report to `reports/`
- **CI:** GitHub Actions (`ci.yml`) runs the pytest suite on every push
- **Stack:** Python 3.11 · Anthropic Claude API · pytest · GitHub Actions

```bash
cd python-automation/ai-defect-resolver
pip install -r requirements.txt
export ANTHROPIC_API_KEY="your_api_key_here"
pytest tests/ -v
```

### 🐍 Python Test Automation (pytest)
Nine pytest modules covering assertions, fixtures, parametrization, and login/webpage test scenarios, plus a core-Python learning track and a Flask + Generative AI chatbot app.

```bash
cd python-automation
pip install -r requirements.txt
pytest pytest/basicTests/ -v
```

### 🥒 BDD — Cucumber + Selenium
Gherkin feature files (login, signup, cart, checkout, payment, orders, search, profile, notifications) and a full **Cucumber + Selenium + TestNG** Java framework with page objects, step definitions, runners, and Extent reports.

> Note: this is implemented in **Cucumber + Selenium (Java)**, not Cypress.

### ⚡ JMeter — Performance Testing
A JMeter test plan and thread group for load/performance test practice.

---

## Skills covered

**UI Automation:** Selenium WebDriver, Playwright, Page Object Model
**API Testing:** REST validation with RestAssured; Postman collections planned
**BDD:** Cucumber, Gherkin
**Languages:** Java 21, Python 3.11, JavaScript, TypeScript
**Frameworks/Tools:** TestNG, pytest, Maven, WebDriverManager, Lombok
**CI/CD:** GitHub Actions
**Data QA:** SQL data-quality validation
**Performance:** JMeter
**AI in QA:** Claude API for automated defect analysis

---

## Repository structure

```
qa-relaunch/
├── .github/workflows/          # Playwright, Selenium, and pytest pipelines
├── ui-automation/
│   ├── playwright/             # JavaScript/TypeScript Playwright tests and fixtures
│   └── selenium-java/          # Selenium POM frameworks
├── bdd-cucumber/               # Cucumber + TestNG frameworks and Gherkin specs
├── api-testing/
│   ├── postman/                # Collections and environments
│   └── rest-assured/           # REST Assured learning notes
├── python-automation/
│   ├── pytest/                 # Parametrized tests and fixtures
│   └── ai-defect-resolver/     # Claude API defect analysis tool
├── performance/jmeter/         # JMeter test plans
├── core-skills/
│   ├── java-fundamentals/      # OOP exercises and algorithms
│   └── sql/                    # Data validation queries and README
└── bdd-cucumber/specflow/      # .NET BDD (planned)
```

---

## Roadmap

- [ ] Add Postman REST API collections with example requests and assertions
- [ ] Commit the SQL data-quality scripts described in `core-skills/sql/README_SQL.md`

---

_Built as a focused relaunch into SDET / QA Automation Engineering — pairing framework depth (Selenium, Playwright) with API, data, CI/CD, and AI-assisted testing._
