Feature: Product Search

  As a shopper
  I want to search for products by name
  So that I can find items quickly

  Scenario: Search for a valid product
    Given the user is on the homepage
    When the user enters "laptop" in the search bar
    And clicks the search icon
    Then a list of laptops should be displayed

  Scenario: Search for a non-existing product
    Given the user is on the homepage
    When the user enters "hoverboard" in the search bar
    Then a message "No products found" should be displayed
