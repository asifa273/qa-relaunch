Feature: Checkout Process

  As a registered user
  I want to complete my purchase
  So that I can receive my ordered items

  Scenario: Successful checkout
    Given the user has items in the cart
    And is logged in
    When the user proceeds to checkout
    And enters a valid shipping address
    And selects a payment method
    And confirms the order
    Then the order should be placed successfully
    And a confirmation message should be displayed
