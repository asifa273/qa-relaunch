# QA Automation Framework — Banking Application
### Selenium WebDriver | Java | TestNG | Page Object Model | GitHub Actions

## About This Project
End-to-end automation framework for a demo banking application,
demonstrating enterprise-grade test architecture including:
- Page Object Model (POM) design pattern
- Data-driven testing
- CI/CD pipeline via GitHub Actions
- HTML test reporting with ExtentReports

## Tech Stack
| Tool | Purpose |
|------|---------|
| Selenium WebDriver 4.x | UI automation |
| Java 17 | Programming language |
| TestNG | Test runner & assertions |
| Maven | Build & dependency management |
| GitHub Actions | CI/CD pipeline |
| ExtentReports | HTML test reports |
| WebDriverManager | Automated driver management |

## Test Coverage
- ✅ Login module (valid/invalid/edge cases)
- ✅ Account management (create/verify)
- ✅ Deposit & withdrawal flows
- ✅ Data consistency validation across UI layers
- ✅ Cross-browser ready (Chrome, Firefox)

## How to Run Locally
\`\`\`bash
git clone /Users/asifabegum/asifa273/qa-relaunch/Selenium/BankingApplication
mvn test
\`\`\`

## CI/CD
Tests run automatically on every push to main and every Monday via GitHub Actions.
View latest results in the Actions tab above.

## Framework Architecture
[Brief description of POM structure and why you chose it]