oginFlowAutomator
LoginFlowAutomator is a Selenium-based automation project designed to validate the core user journey on the SauceDemo platform. It covers everything from authentication to sorting products and completing a full checkout flow.

🚀 Key Features
Authentication: Automated login with standard user credentials.

Product Interaction: Sorting items by price (Low to High) and verifying data integrity.

Cart Management: Adding/removing items and validating the shopping cart badge.

End-to-End Checkout: Full automation of the checkout information form and order finalization.

Driver Management: Uses WebDriverManager to eliminate the need for manual driver downloads.

🛠 Tech Stack
Language: Java 21

Framework: Selenium WebDriver (4.25.0)

Test Runner: TestNG

Build Tool: Maven

📋 Prerequisites
Ensure you have the following installed:

JDK 21

Apache Maven

Google Chrome Browser

📥 Setup & Installation
Navigate to the project subfolder:

Bash
cd Selenium/LoginFlowAutomator
Install the required dependencies:

Bash
mvn clean install
🧪 Running Tests
To execute all test cases in the suite, use the following command:

Bash
mvn test
📂 Project Structure
src/test/java/tests/LoginItemsCart.java: Contains the test logic and assertions.

pom.xml: Defines Maven dependencies and compiler settings.
