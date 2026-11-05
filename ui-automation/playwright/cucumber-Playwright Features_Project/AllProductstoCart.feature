Feature: Adding all products to cart and verifying the cart count
@AllProducts
    Scenario: Add all products to cart and verify the cart count
        Given I am on the E-Commerce login page 
        When I log in with valid credentials 
        Then I should see a "Login Successfully" message for either successful login or invalid login
        And I should be redirected to the products page and verify the products are loaded
        And I add all products to the cart
        Then I should see the correct cart count reflecting the number of products added
        Then I proceed to checkout page
        And I should see the checkout page with the product details
        Then I proceed to payment orders page 
        And I fill in the personal information
        And I fill in the shipping information
        And I place the order
        Then I should see a Thanks Order message
        And I should see the product name in Proucts page and Thanks Order page must be matched