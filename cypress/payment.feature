Feature: Payment Gateway

  As a user
  I want to securely make payments
  So that I can complete my order

  Scenario: Successful credit card payment
    Given the user is on the payment page
    When the user enters valid card details
    And clicks "Pay Now"
    Then payment should be processed successfully
    And an order confirmation number should be shown

  Scenario: Payment fails due to invalid card
    Given the user is on the payment page
    When the user enters an expired card
    And clicks "Pay Now"
    Then an error message "Payment declined" should appear
