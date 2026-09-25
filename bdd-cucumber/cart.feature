Feature: Shopping Cart

  As a shopper
  I want to add and remove products from my cart
  So that I can manage my purchase list before checkout

  Scenario: Add item to cart
    Given the user is viewing a product
    When the user clicks the "Add to Cart" button
    Then the product should appear in the cart
    And the cart icon should show updated item count

  Scenario: Remove item from cart
    Given the user has an item in the cart
    When the user removes the item
    Then the cart should be empty
