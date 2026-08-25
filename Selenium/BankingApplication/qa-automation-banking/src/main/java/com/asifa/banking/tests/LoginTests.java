package com.asifa.banking.tests;

import com.asifa.banking.base.BaseTest;
import com.asifa.banking.constants.AppConstants;
import com.asifa.banking.pages.LoginPage;
import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

/**
 * LoginTests.java
 *
 * Tests every meaningful login scenario:
 *   - Happy path (valid credentials)
 *   - Wrong password
 *   - Wrong username
 *   - Both fields empty
 *   - Username only, password empty
 *   - Password only, username empty
 *
 * Every method follows the same 3-line pattern:
 *   Arrange → Act → Assert
 *
 * Notice: no driver setup, no browser launch, no waits setup.
 * BaseTest handles all of that. This class is pure test logic.
 */
public class LoginTests extends BaseTest {

    private LoginPage loginPage;


    // ══════════════════════════════════════════════════════════════════════
    //  SETUP — runs before each test in THIS class
    //  BaseTest.setUp() already launched the browser and navigated to BASE_URL
    //  This just wraps the current page in our Page Object
    // ══════════════════════════════════════════════════════════════════════

    @BeforeMethod
    public void initPage() {
        loginPage = new LoginPage(getDriver());
    }


    // ══════════════════════════════════════════════════════════════════════
    //  HAPPY PATH
    // ══════════════════════════════════════════════════════════════════════

    @Test(priority = 1,
          description = "Valid credentials should navigate away from login and show welcome message")
    public void testValidLogin() {
        test = extent.createTest("Valid Login");

        // Act
        loginPage.loginWithValidCredentials();

        // Assert — URL check confirms navigation, message check confirms identity
        Assert.assertTrue(
            loginPage.isLoginSuccessful(),
            "URL did not change to index.php after valid login"
        );
        Assert.assertTrue(
            loginPage.getWelcomeMessage().contains(AppConstants.WELCOME_MSG_PREFIX),
            "Welcome message text does not match expected prefix"
        );
    }


    // ══════════════════════════════════════════════════════════════════════
    //  NEGATIVE — WRONG CREDENTIALS
    // ══════════════════════════════════════════════════════════════════════

    @Test(priority = 2,
          description = "Invalid password should show error message and stay on login page")
    public void testInvalidPassword() {
        test = extent.createTest("Invalid Password");

        // Act
        loginPage.attemptLoginExpectingFailure(
            AppConstants.VALID_USERNAME,
            AppConstants.INVALID_PASSWORD
        );

        // Assert — two checks: error visible AND correct message text
        Assert.assertTrue(
            loginPage.isErrorMessageDisplayed(),
            "Error message not displayed for invalid password"
        );
        Assert.assertEquals(
            loginPage.getErrorMessage(),
            AppConstants.LOGIN_ERROR_MSG,
            "Error message text does not match expected value"
        );
    }

    @Test(priority = 3,
          description = "Invalid username should show error message and stay on login page")
    public void testInvalidUsername() {
        test = extent.createTest("Invalid Username");

        loginPage.attemptLoginExpectingFailure(
            AppConstants.INVALID_USERNAME,
            AppConstants.VALID_PASSWORD
        );

        Assert.assertTrue(
            loginPage.isErrorMessageDisplayed(),
            "Error message not displayed for invalid username"
        );
    }

    @Test(priority = 4,
          description = "Wrong username and wrong password should show error, not navigate away")
    public void testBothCredentialsWrong() {
        test = extent.createTest("Both Credentials Wrong");

        loginPage.attemptLoginExpectingFailure(
            AppConstants.INVALID_USERNAME,
            AppConstants.INVALID_PASSWORD
        );

        Assert.assertTrue(
            loginPage.isStillOnLoginPage(),
            "Should remain on login page when both credentials are wrong"
        );
        Assert.assertTrue(
            loginPage.isErrorMessageDisplayed(),
            "Error message should be visible for completely wrong credentials"
        );
    }


    // ══════════════════════════════════════════════════════════════════════
    //  NEGATIVE — EMPTY FIELDS
    // ══════════════════════════════════════════════════════════════════════

    @Test(priority = 5,
          description = "Both fields empty should block login and keep user on login page")
    public void testEmptyCredentials() {
        test = extent.createTest("Empty Credentials");

        loginPage.attemptLoginExpectingFailure("", "");

        Assert.assertTrue(
            loginPage.isStillOnLoginPage(),
            "Should stay on login page when both fields are empty"
        );
    }

    @Test(priority = 6,
          description = "Valid username with empty password should not proceed to dashboard")
    public void testEmptyPassword() {
        test = extent.createTest("Empty Password");

        loginPage.attemptLoginExpectingFailure(
            AppConstants.VALID_USERNAME,
            ""
        );

        Assert.assertTrue(
            loginPage.isStillOnLoginPage(),
            "Should stay on login page when password is empty"
        );
    }

    @Test(priority = 7,
          description = "Empty username with valid password should not proceed to dashboard")
    public void testEmptyUsername() {
        test = extent.createTest("Empty Username");

        loginPage.attemptLoginExpectingFailure(
            "",
            AppConstants.VALID_PASSWORD
        );

        Assert.assertTrue(
            loginPage.isStillOnLoginPage(),
            "Should stay on login page when username is empty"
        );
    }
}