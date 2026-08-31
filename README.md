# QA Relaunch — SDET / QA Automation Portfolio

> A hands-on portfolio of test automation projects across **UI, API, data, and AI-assisted QA** — built with Selenium, Playwright, Java, Python, and CI/CD pipelines. Each folder is a working practice project targeting real SDET / QA Automation Engineer skills.

![Java](https://img.shields.io/badge/Java-21-orange)
![Selenium](https://img.shields.io/badge/Selenium-4.x-43B02A?logo=selenium&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-1.62-2EAD33?logo=playwright&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.11+-3776AB?logo=python&logoColor=white)
![pytest](https://img.shields.io/badge/pytest-tested-0A9EDC?logo=pytest&logoColor=white)
![TestNG](https://img.shields.io/badge/TestNG-7.10-red)
![GitHub Actions](https://img.shields.io/badge/CI-GitHub%20Actions-2088FF?logo=githubactions&logoColor=white)

**Author:** Asifa Begum — QA / SDET · Frisco, TX
🔗 [LinkedIn](https://www.linkedin.com/in/asifa-begum-qa/) · [GitHub](https://github.com/asifa273)

---

## What's inside

| Area | Project | What it demonstrates | Status |
|---|---|---|---|
| **Selenium (Java)** | `Selenium/BankingApplication` | Page Object Model framework, utilities, data-driven tests, CI | ✅ Working |
| **Selenium (Java)** | `Selenium/LoginFlowAutomator` | End-to-end login → sort → cart → checkout on SauceDemo | ✅ Working |
| **Selenium (Java)** | `Selenium/SeleniumBasicsExercise` | POM basics, reusable wait/driver utilities | ✅ Working |
| **Playwright (JS)** | `Playwright/` | Cross-browser E2E tests + GitHub Actions CI | ✅ Working |
| **AI-assisted QA** | `ai/ai-defect-resolver` | Claude API defect analysis → fix → validate → report loop | ✅ Working |
| **Python** | `python/pytest` | pytest suites, fixtures, parametrization | ✅ Working |
| **Python** | `python/` (Flask chatbot) | Flask + Generative AI web app | ✅ Working |
| **BDD / Cucumber** | `cypress/` | Gherkin feature files + Cucumber-Selenium-TestNG framework | ✅ Working |
| **Java fundamentals** | `java/` | Core Java, OOP, arrays, loops, methods | ✅ Working |
| **Performance** | `JMeter/` | JMeter test plan + thread group | ✅ Working |
| **SQL data QA** | `sql/` | Data-quality query patterns (nulls, duplicates, reconciliation) | 🚧 Documented, scripts in progress |
| **API (Postman)** | `postman/` | REST collections | 🔜 Planned |
| **SpecFlow (.NET BDD)** | `specflow/` | C# BDD | 🔜 Planned |

---

## Featured projects

### 🏦 Banking Application — Selenium POM Framework
A structured **Page Object Model** automation framework for a banking web app.
- **Pages:** Login, Dashboard, Deposit, New Account, Transactions
- **Tests:** login, account creation, deposits, transactions, and data-validation suites
- **Framework plumbing:** `DriverFactory`, `ConfigReader`, `WaitHelper`, externalized `config.properties` and `testdata.properties`
- **CI:** GitHub Actions workflow (`selenium-tests.yml`) runs the suite automatically
- **Stack:** Java · Selenium WebDriver · TestNG · Maven

```bash
cd Selenium/BankingApplication/qa-automation-banking
mvn test
```

### 🔐 LoginFlowAutomator — End-to-End SauceDemo
Validates the full user journey: authentication, sorting products (low→high), cart badge validation, and complete checkout.
- **Stack:** Java 21 · Selenium 4.21 · TestNG · WebDriverManager · Lombok · Maven

```bash
cd Selenium/LoginFlowAutomator
mvn test
```

### 🎭 Playwright E2E Suite
Cross-browser end-to-end tests against practice e-commerce and sign-in sites.
- **Specs:** SauceDemo login (pass/fail), shop flow, sign-in, user registration, Angular practice
- **Config:** parallel execution, HTML reporter, trace/screenshot/video **on failure**, retries on CI
- **CI:** GitHub Actions (`playwright.yml`) runs on every push/PR and uploads the HTML report as an artifact
- **Stack:** JavaScript · @playwright/test 1.62

```bash
cd Playwright
npm install
npx playwright install
npx playwright test          # headless
npx playwright test --headed # visible browser
```

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
cd ai/ai-defect-resolver
pip install -r requirements.txt
export ANTHROPIC_API_KEY="your_api_key_here"
pytest tests/ -v
```

### 🐍 Python Test Automation (pytest)
Nine pytest modules covering assertions, fixtures, parametrization, and login/webpage test scenarios, plus a core-Python learning track and a Flask + Generative AI chatbot app.

```bash
cd python
pip install -r requirements.txt
pytest pytest/basicTests/ -v
```

### 🥒 BDD — Cucumber + Selenium
Gherkin feature files (login, signup, cart, checkout, payment, orders, search, profile, notifications) and a full **Cucumber + Selenium + TestNG** Java framework with page objects, step definitions, runners, and Extent reports.

> Note: this lives under the `cypress/` folder but is implemented in **Cucumber + Selenium (Java)**, not Cypress.

### ⚡ JMeter — Performance Testing
A JMeter test plan and thread group for load/performance test practice.

---

## Skills covered

**UI Automation:** Selenium WebDriver, Playwright, Page Object Model
**API Testing:** REST validation (Postman — in progress)
**BDD:** Cucumber, Gherkin
**Languages:** Java 21, Python 3.11, JavaScript
**Frameworks/Tools:** TestNG, pytest, Maven, WebDriverManager, Lombok
**CI/CD:** GitHub Actions
**Data QA:** SQL data-quality validation
**Performance:** JMeter
**AI in QA:** Claude API for automated defect analysis

---

## Repository structure

```
qa-relaunch/
├── Selenium/
│   ├── BankingApplication/     # POM framework + CI
│   ├── LoginFlowAutomator/     # E2E SauceDemo
│   └── SeleniumBasicsExercise/ # POM basics + utils
├── Playwright/                 # JS E2E suite + GitHub Actions
├── ai/ai-defect-resolver/      # Claude-API defect workflow + CI
├── python/                     # pytest suites, core Python, Flask chatbot
├── cypress/                    # Cucumber BDD + Selenium framework (Gherkin features)
├── java/                       # Core Java & OOP exercises
├── JMeter/                     # Performance test plans
├── sql/                        # SQL data-QA (in progress)
├── postman/                    # REST collections (planned)
└── specflow/                   # .NET BDD (planned)
```

---

## Roadmap

- [ ] Add Postman REST API collections with example requests and assertions
- [ ] Commit the SQL data-quality scripts described in `sql/README_SQL.md`
- [ ] Add TypeScript to the Playwright suite
- [ ] Add RestAssured (Java) API tests alongside the Selenium frameworks

---

_Built as a focused relaunch into SDET / QA Automation Engineering — pairing framework depth (Selenium, Playwright) with API, data, CI/CD, and AI-assisted testing._
