Feature: Login Functionality
  As a registered user
  I want to log into the application
  So that I can access my personal dashboard

  Scenario: Successful login with valid credentials
  Given the user enter into the login page
  When the user give valid username and password
  And the user clicks the submit button
  Then the user is taken to the login page Successfully
