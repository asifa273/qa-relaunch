# QA Automation Framework — Banking Application
### Selenium WebDriver | Java | TestNG | Page Object Model

Selenium framework for the Guru99 Bank demo application.

## Tech stack

| Tool | Purpose |
|------|---------|
| Selenium WebDriver 4.15 | UI automation |
| Java 11 | Language |
| TestNG 7.7 | Test runner and assertions |
| Maven | Build and dependencies |
| WebDriverManager | Driver management |
| ExtentReports 5 | HTML report with screenshot on failure |
| GitHub Actions | CI (`.github/workflows/selenium-banking.yml`) |

## What's automated

| Area | Status |
|---|---|
| Login: valid login, wrong password, wrong username, both wrong, empty username, empty password, both empty (7 tests in `LoginTests.java`) | ✅ |
| Account creation (`AccountTests.java`) | 🔜 Page object ready, no tests yet |
| Deposit (`DepositTests.java`) | 🔜 Page object ready, no tests yet |
| Transactions (`TransactionTests.java`) | 🔜 Page object ready, no tests yet |
| Data validation (`DataValidationTests.java`) | 🔜 Not started |

## Framework layout

```
src/main/java/com/asifa/banking/
  constants/AppConstants.java
  pages/        LoginPage, DashboardPage, NewAccountPage, DepositPage, TransactionsPage
src/main/java/com/utils/
  ConfigReader.java, WaitHelper.java
src/test/java/com/asifa/banking/
  base/BaseTest.java   ThreadLocal driver, Extent report setup, screenshot on failure
  tests/               test classes
config/config.properties
test-data/testdata.properties
```

## Credentials

Guru99 manager credentials expire after 20 days, so they are never committed. Pass them as system properties, or set `GURU99_USER_ID` / `GURU99_PASSWORD` (GitHub secrets in CI). Tests that need them are skipped, not failed, when they're missing.

## Run

```bash
cd ui-automation/selenium-java/BankingApplication/qa-automation-banking
mvn test -Dguru99.userId=<your mngr id> -Dguru99.password=<your password>
```
