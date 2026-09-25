package com.qa.framework.tests;

import com.qa.framework.base.BaseTest;
import com.qa.framework.pages.*;
import org.testng.Assert;
import org.testng.annotations.Test;

import java.util.List;

/**
 * The flagship end-to-end regression test: login -> browse -> add to cart ->
 * checkout -> validate totals -> confirm order. Fluent page chaining reads like the
 * manual test case it replaces, which is exactly how you should narrate it in an interview.
 */
public class EndToEndPurchaseTest extends BaseTest {

    private static final String ITEM_1 = "Sauce Labs Backpack";
    private static final String ITEM_2 = "Sauce Labs Bike Light";

    @Test(groups = {"smoke", "regression", "e2e"},
          description = "TC-E2E-01 Complete purchase flow with total validation")
    public void userCanCompletePurchase() {
        ProductsPage products = new LoginPage(driver())
                .loginAs("standard_user", "secret_sauce")
                .addToCart(ITEM_1)
                .addToCart(ITEM_2);

        Assert.assertEquals(products.cartCount(), 2, "Cart badge did not update");

        CartPage cart = products.openCart();
        List<String> namesInCart = cart.itemNames();
        Assert.assertTrue(namesInCart.containsAll(List.of(ITEM_1, ITEM_2)),
                "Cart contents do not match what was added: " + namesInCart);

        CheckoutPage checkout = cart.proceedToCheckout()
                .fillDetails("Priya", "Sharma", "560001");

        Assert.assertTrue(checkout.totalIsArithmeticallyCorrect(),
                String.format("Total mismatch: subtotal %.2f + tax %.2f != total %.2f",
                        checkout.subtotal(), checkout.tax(), checkout.total()));

        checkout.finish();
        Assert.assertEquals(checkout.confirmationMessage(), "Thank you for your order!",
                "Order confirmation not shown");
    }

    @Test(groups = "regression", description = "TC-CHK-02 Checkout blocks empty mandatory fields")
    public void checkoutRequiresCustomerDetails() {
        String error = new LoginPage(driver())
                .loginAs("standard_user", "secret_sauce")
                .addToCart(ITEM_1)
                .openCart()
                .proceedToCheckout()
                .submitWithoutDetails()
                .errorMessage();

        Assert.assertTrue(error.contains("First Name is required"),
                "Expected mandatory-field validation, got: " + error);
    }

    @Test(groups = "regression", description = "TC-SRT-03 Price low-to-high sort is correct")
    public void priceSortLowToHigh() {
        ProductsPage products = new LoginPage(driver())
                .loginAs("standard_user", "secret_sauce")
                .sortBy("Price (low to high)");

        Assert.assertTrue(products.pricesAreAscending(),
                "Prices not ascending: " + products.productPrices());
    }

    @Test(groups = "regression", description = "TC-CRT-04 Removing an item updates the cart")
    public void removingItemUpdatesCart() {
        CartPage cart = new LoginPage(driver())
                .loginAs("standard_user", "secret_sauce")
                .addToCart(ITEM_1)
                .addToCart(ITEM_2)
                .openCart()
                .removeItem(ITEM_1);

        Assert.assertEquals(cart.itemCount(), 1, "Item was not removed from cart");
        Assert.assertFalse(cart.itemNames().contains(ITEM_1), "Removed item still listed");
    }
}
