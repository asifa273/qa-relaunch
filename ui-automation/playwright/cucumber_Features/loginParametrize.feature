Feature: Validations with various credentials

@loginParametrize @smoke
    Scenario Outline: Scenario Outline name: Passing various crdentails username and Password
        Given I am on the E-Commerce login page 
        When I log in with this credentials "<username>" and "<password>"
        Then I should be redirected to the products page and verify the products are loaded

Examples:
|   username                 |   password     |
|   asifatesting@gmail.com   |   Seppass123*  |
|   anshika@gmail.com        |   Iamking@000  |


