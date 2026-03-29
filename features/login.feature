Feature: Login Functionality
  As a registered user
  I want to log into the application
  So that I can access my personal dashboard

  Scenario: Successful login with valid credentials
  Given the user enter into the login page
  When the user give valid username and password
  And the user clicks the submit button
  Then the user is taken to the login page Successfully

Feature: User Login

  As a registered user
  I want to log in to the eCommerce application
  So that I can access my account and make purchases

  Scenario: Successful login with valid credentials
    Given the user is on the login page
    When the user enters a valid email and password
    And clicks the "Login" button
    Then the user should be redirected to the homepage
    And a welcome message should be displayed

  Scenario: Login fails with invalid password
    Given the user is on the login page
    When the user enters a valid email and an incorrect password
    And clicks the "Login" button
    Then an error message "Invalid credentials" should be displayed
