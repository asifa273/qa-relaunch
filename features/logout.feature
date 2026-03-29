Feature: Logout Functionality

  As a logged-in user
  I want to log out from the application
  So that I can securely end my session

  Scenario: Successful logout
    Given the user is logged in
    When the user clicks the "Logout" button
    Then the user should be redirected to the homepage
    And should see the "Login" option again
