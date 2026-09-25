@ui @checkout
Feature: Cart and checkout

  Background:
    Given the shopper is on the SwagLabs login page
    When the shopper logs in as "standard_user" with password "secret_sauce"

  @smoke @e2e
  Scenario: Shopper completes a purchase
    When the shopper adds "Sauce Labs Backpack" to the cart
    And the shopper adds "Sauce Labs Bike Light" to the cart
    Then the cart badge shows 2
    When the shopper checks out as "Priya" "Sharma" with postcode "560001"
    Then the order total equals subtotal plus tax
    When the shopper finishes the order
    Then the confirmation message "Thank you for your order!" is displayed

  @negative
  Scenario: Checkout requires mandatory customer details
    When the shopper adds "Sauce Labs Backpack" to the cart
    And the shopper checks out with no details
    Then an error message containing "First Name is required" is shown
