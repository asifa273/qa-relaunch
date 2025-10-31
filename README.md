# 🛍️ eCommerce BDD Feature Files (Gherkin)

This repository contains **Behavior-Driven Development (BDD)** test scenarios written in **Gherkin syntax** for a sample **eCommerce web application**.  
These features demonstrate end-to-end testing coverage for key user journeys — from login to checkout.

---

## 📁 Folder Structure

qa-relaunch/
└── features/
├── login.feature
├── signup.feature
├── search.feature
├── product_details.feature
├── cart.feature
├── checkout.feature
├── payment.feature
├── profile.feature
├── orders.feature
└── logout.feature


Each `.feature` file describes user behavior in **Given / When / Then** format.

---

## 🧠 Project Purpose

This project was created to:
- Showcase **Gherkin syntax** writing skills
- Demonstrate **UAT / QA functional test coverage**
- Support **Cucumber / SpecFlow** integration examples
- Serve as a base for **manual or automated testing frameworks**

---

## 🚀 Key User Journeys Covered

| Feature File | Description |
|---------------|-------------|
| `login.feature` | Valid and invalid user login flows |
| `signup.feature` | New user registration scenarios |
| `search.feature` | Searching products by name or keyword |
| `product_details.feature` | Viewing product info, description, and reviews |
| `cart.feature` | Adding and removing products from cart |
| `checkout.feature` | Completing a purchase with shipping and payment details |
| `payment.feature` | Payment gateway validation and failure handling |
| `profile.feature` | Updating user profile and address |
| `orders.feature` | Viewing past orders and order status |
| `logout.feature` | Securely ending the user session |

---

## 🧩 Tools & Frameworks (Suggested Integration)

These feature files can be integrated with:
- **Cucumber (Java / JUnit / TestNG)**
- **SpecFlow (C# / NUnit)**
- **Postman / Newman (for API Gherkin scenarios)**
- **Selenium / Playwright** (for UI automation)
- **Jira Xray** (for test case management)

---

## 💡 Example Use

Run automated tests using Cucumber (Java example):

```bash
mvn test -Dcucumber.options="--tags @SmokeTest"
