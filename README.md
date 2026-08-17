# QA Relaunch Portfolio

A collection of projects focused on modern Quality Assurance, Software Engineering, and AI-driven automation. It serves as a comprehensive resource for demonstrating skills in automated testing, data validation, and development across multiple languages and tools.

## Projects Overview

| # | Project | Focus | Stack |
|---|---------|-------|-------|
| 1 | Selenium – LoginFlowAutomator | UI authentication & product-sorting tests | Java, Selenium, Maven |
| 2 | Python Learning Project | Core Python, data manipulation, test automation | Python, Pytest |
| 3 | SQL QA Portfolio | Data quality: nulls, duplicates, reconciliation | SQL (PostgreSQL/SQLite) |
| 4 | AI Defect Resolver | AI-assisted bug analysis and code fixes | Python, Claude API |
| 5 | Java Exercises | Core Java & OOP fundamentals | Java |
| 6 | Postman Collections | REST API testing (status codes, JSON bodies) | Postman |
| 7 | Playwright Automation Suite | End-to-end e-commerce UI tests | Playwright, JS/TS |

---

### 1. Selenium – LoginFlowAutomator
Automated test scripts verifying user authentication and product sorting on web platforms (e.g., SauceDemo).

**Run:**
```bash
cd Selenium/LoginFlowAutomator
mvn test
```

### 2. Python Learning Project
Covers core Python concepts, data manipulation, and automation testing with the Pytest framework.

**Run:**
```bash
pip install -r python/requirements.txt
pytest python/pytest/basicTests/
```

### 3. SQL QA Portfolio
Data-quality assurance: identifying nulls, detecting duplicates, and reconciling data in financial/regulatory contexts.

**Run:** Execute the `.sql` scripts in any standard SQL environment (PostgreSQL/SQLite) or via db-fiddle.com.

### 4. AI Defect Resolver
A tool integrating the Claude AI API to analyze bug reports and propose or apply code fixes automatically.

**Run:**
```bash
export ANTHROPIC_API_KEY=your_key_here
pip install -r ai/requirements.txt
python ai/resolver.py
```

### 5. Java Exercises
Core Java logic and Object-Oriented Programming (OOP) exercises for building a strong coding foundation.

**Run:**
```bash
javac FileName.java
java FileName
```

### 6. Postman Collections
API testing collections for verifying REST endpoints, status codes, and JSON response bodies.

**Run:** Import the `.json` collection files into the Postman desktop client.

---

## 7. Playwright Automation Suite

End-to-end automation tests for e-commerce practice sites, built with Playwright (JavaScript/TypeScript).

### Prerequisites
- [Node.js](https://nodejs.org/) installed.

### Installation
```bash
cd Playwright
npm install
npx playwright install      # download browser binaries
```

### Project Structure
```
Playwright/
├── tests/
│   ├── UIBasics.spec.js          # UI interaction & locator basics
│   ├── loginPage.spec.js         # login flow + child-window handling
│   └── WebsiteRegister.spec.ts   # registration workflows
├── playwright.config.ts          # test execution, browser projects, reporting
└── .github/workflows/            # CI pipeline for automated runs
```

### Running Tests
```bash
npx playwright test                          # all tests, headless
npx playwright test --headed                 # visible browser
npx playwright test tests/loginPage.spec.js  # a single file
npx playwright test --ui                     # interactive UI mode
```

### Reporting
```bash
npx playwright show-report   # open the HTML report with results & screenshots
```
