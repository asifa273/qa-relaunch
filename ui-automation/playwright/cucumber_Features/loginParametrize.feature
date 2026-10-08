Feature: Validations with various credentials

@loginParametrize @smoke
    Scenario Outline: Scenario Outline name: Passing various crdentails username and Password
        Given I am on the E-Commerce login page 
        When I log in with the credentials from env "<emailVar>" and "<passwordVar>"
        Then I should be redirected to the products page and verify the products are loaded

Examples:
# Values are env variable names, read from .env or GitHub secrets.
|   emailVar         |   passwordVar         |
|   SHOP_EMAIL       |   SHOP_PASSWORD       |
|   SHOP_ALT_EMAIL   |   SHOP_ALT_PASSWORD   |
