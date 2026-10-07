Feature: Error Login Scenarios

    Scenario: Invalid login attempt
        Given I am on the E-Commerce login page 
        When I log in with invalid credentials "shopInvalidEmail" and "shopInvalidPassword"
        Then I should see a "Incorrect email or password." message for invalid login
