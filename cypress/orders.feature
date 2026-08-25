Feature: Order History

  As a user
  I want to view my past orders
  So that I can check delivery status or reorder items

  Scenario: View order history
    Given the user is logged in
    When the user navigates to "My Orders"
    Then a list of past orders should be displayed with order ID, date, and status
