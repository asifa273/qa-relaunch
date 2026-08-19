Playwright Automation Suite
This directory contains end-to-end automation tests for e-commerce website practice using Playwright with TypeScript/JavaScript.

🚀 Getting Started
Prerequisites
Ensure you have Node.js installed on your system.

Installation
Clone the repository and navigate to the Playwright directory:

Bash
cd Playwright
Install the required dependencies:

Bash
npm install
Install Playwright browsers:

Bash
npx playwright install
📂 Project Structure
tests/: Contains the test specification files.

UIBasics.spec.js: Fundamental UI interaction tests and locator basics.

WebsiteRegister.spec.ts: User registration workflows for e-commerce practice.

playwright.config.ts: Global configuration for test execution, browser projects, and reporting.

.github/workflows/: CI/CD pipeline configurations for automated test runs on GitHub Actions.

🛠 Running Tests
Run all tests in headless mode:

Bash
npx playwright test
Run tests in headed mode (visible browser):

Bash
npx playwright test --headed
Run a specific test file:

Bash
npx playwright test tests/WebsiteRegister.spec.ts
📊 Reporting
After tests complete, you can view the detailed HTML report to analyze results and screenshots:

Bash
npx playwright show-report
