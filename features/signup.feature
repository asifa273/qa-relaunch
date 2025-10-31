Feature: User Signup

  As a new visitor
  I want to create an account
  So that I can make purchases and track orders

  Scenario: Successful account creation
    Given the user is on the signup page
    When the user enters valid name, email, password, and confirms password
    And clicks the "Create Account" button
    Then the user account should be created successfully
    And the user should be logged in automatically

  Scenario: Signup with existing email
    Given the user is on the signup page
    When the user enters an email that already exists
    And clicks "Create Account"
    Then a message "Email already registered" should be displayed
