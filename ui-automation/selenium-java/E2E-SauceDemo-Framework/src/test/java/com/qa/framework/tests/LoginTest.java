package com.qa.framework.tests;

import com.qa.framework.base.BaseTest;
import com.qa.framework.listeners.RetryAnalyzer;
import com.qa.framework.pages.LoginPage;
import com.qa.framework.pages.ProductsPage;
import org.testng.Assert;
import org.testng.asserts.SoftAssert;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

/**
 * Demonstrates: groups, priority, DataProvider, hard vs soft assertions, retry.
 */
public class LoginTest extends BaseTest {

    @Test(groups = {"smoke", "regression"}, priority = 1,
          description = "Valid user can log in and land on Products",
          retryAnalyzer = RetryAnalyzer.class)
    public void validLoginLandsOnProducts() {
        ProductsPage products = new LoginPage(driver())
                .loginAs("standard_user", "secret_sauce");

        Assert.assertTrue(products.isLoaded(), "Products page did not load after login");
        Assert.assertTrue(products.currentUrl().contains("inventory.html"),
                "URL did not change to inventory");
        Assert.assertEquals(products.productCount(), 6, "Unexpected product count");
    }

    /**
     * Data-driven negative testing. One method, four scenarios, four report entries.
     * This is the answer to "how do you avoid duplicating tests?"
     */
    @DataProvider(name = "invalidCredentials")
    public Object[][] invalidCredentials() {
        return new Object[][]{
                {"locked_out_user", "secret_sauce", "Sorry, this user has been locked out."},
                {"standard_user",   "wrong_pass",   "Username and password do not match"},
                {"ghost_user",      "secret_sauce", "Username and password do not match"},
                {"",                "",             "Username is required"}
        };
    }

    @Test(groups = "regression", priority = 2, dataProvider = "invalidCredentials",
          description = "Invalid credentials are rejected with the correct message")
    public void invalidLoginShowsError(String user, String pass, String expectedFragment) {
        LoginPage login = new LoginPage(driver()).loginExpectingFailure(user, pass);

        SoftAssert soft = new SoftAssert();
        soft.assertTrue(login.isErrorDisplayed(), "No error banner for user: " + user);
        soft.assertTrue(login.errorMessage().contains(expectedFragment),
                "Expected [" + expectedFragment + "] but got [" + login.errorMessage() + "]");
        soft.assertFalse(login.currentUrl().contains("inventory.html"),
                "User reached inventory with invalid credentials - security defect");
        soft.assertAll();   // without assertAll() a SoftAssert never fails the test
    }

    @Test(groups = "regression", priority = 3, description = "Logout returns user to login page")
    public void logoutReturnsToLogin() {
        LoginPage login = new LoginPage(driver())
                .loginAs("standard_user", "secret_sauce")
                .logout();
        Assert.assertTrue(login.currentUrl().endsWith("saucedemo.com/"),
                "Did not return to login page after logout");
    }
}
