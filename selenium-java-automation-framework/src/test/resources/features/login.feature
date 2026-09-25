@ui @login
Feature: SwagLabs authentication
  As a returning shopper
  I want to sign in to my account
  So that I can browse and purchase products

  Background:
    Given the shopper is on the SwagLabs login page

  @smoke
  Scenario: Successful login with valid credentials
    When the shopper logs in as "standard_user" with password "secret_sauce"
    Then the products page is displayed
    And 6 products are listed

  @negative
  Scenario Outline: Login is rejected for invalid credentials
    When the shopper logs in as "<username>" with password "<password>"
    Then an error message containing "<message>" is shown
    And the shopper remains on the login page

    Examples:
      | username        | password     | message                                  |
      | locked_out_user | secret_sauce | Sorry, this user has been locked out.    |
      | standard_user   | wrong_pass   | Username and password do not match       |
      |                 | secret_sauce | Username is required                     |
