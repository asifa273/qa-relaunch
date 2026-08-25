package com.asifa.banking.pages;

import java.time.Duration;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.asifa.banking.constants.AppConstants;

/**
 * LoginPage.java
 *
 * Represents everything on the Guru99 login screen.
 * Rule of Page Objects: this class knows HOW to interact with the page.
 * Your test class decides WHEN and WHAT to assert.
 *
 * Nothing in here contains Assert statements — that's the test's job.
 * Nothing in the test class contains locators — that's this class's job.
 */
public class LoginPage {

    private WebDriver driver;
    private WebDriverWait wait;


    // ══════════════════════════════════════════════════════════════════════
    //  LOCATORS
    //  @FindBy is PageFactory's annotation — cleaner than By.name() inline
    //  PageFactory.initElements() wires these up in the constructor
    // ══════════════════════════════════════════════════════════════════════

    @FindBy(name = "uid")
    private WebElement usernameField;

    @FindBy(name = "password")
    private WebElement passwordField;

    @FindBy(name = "btnLogin")
    private WebElement loginButton;

    // Shown after a successful login — used to confirm we landed on dashboard
    @FindBy(className = "heading3")
    private WebElement welcomeMessage;

    // Shown when credentials are wrong
    @FindBy(id = "message23")
    private WebElement errorMessage;


    // ══════════════════════════════════════════════════════════════════════
    //  CONSTRUCTOR
    //  Every Page Object gets the driver injected — never creates its own.
    //  PageFactory.initElements wires all the @FindBy fields above.
    // ══════════════════════════════════════════════════════════════════════

    public LoginPage(WebDriver driver) {
        this.driver = driver;
        this.wait   = new WebDriverWait(driver, Duration.ofSeconds(AppConstants.EXPLICIT_WAIT));
        PageFactory.initElements(driver, this);
    }


    // ══════════════════════════════════════════════════════════════════════
    //  LOW-LEVEL ACTIONS
    //  Small, single-purpose methods. Each does exactly one thing.
    //  These are the building blocks for the action methods below.
    // ══════════════════════════════════════════════════════════════════════

    public void enterUsername(String username) {
        wait.until(ExpectedConditions.visibilityOf(usernameField));
        usernameField.clear();
        usernameField.sendKeys(username);
    }

    public void enterPassword(String password) {
        passwordField.clear();
        passwordField.sendKeys(password);
    }

    public void clickLoginButton() {
        loginButton.click();
    }


    // ══════════════════════════════════════════════════════════════════════
    //  HIGH-LEVEL ACTION METHODS
    //  These are what your test classes actually call.
    //  They chain the low-level actions into meaningful user flows.
    // ══════════════════════════════════════════════════════════════════════

    /**
     * Performs a full login with the given credentials.
     * Void — LoginTests only cares about login behavior, not the next page.
     * When DashboardPage exists, other test classes call this as setup then
     * do: DashboardPage dashboard = new DashboardPage(getDriver());
     *
     * Usage in test:
     *   loginPage.loginAs(VALID_USERNAME, VALID_PASSWORD);
     *   Assert.assertTrue(loginPage.isLoginSuccessful());
     */
    public void loginAs(String username, String password) {
        enterUsername(username);
        enterPassword(password);
        clickLoginButton();
    }

    /**
     * Convenience method — logs in using the credentials from AppConstants.
     * Use this in tests where login is setup, not the thing being tested.
     *
     * Usage in test:
     *   loginPage.loginWithValidCredentials();
     *   Assert.assertTrue(loginPage.isLoginSuccessful());
     */
    public void loginWithValidCredentials() {
        loginAs(AppConstants.VALID_USERNAME, AppConstants.VALID_PASSWORD);
    }

    /**
     * Attempts login expecting it to fail — same action, different intent.
     * Kept as a named method so the test reads like plain English.
     *
     * Usage in test:
     *   loginPage.attemptLoginExpectingFailure("wrong", "wrong");
     *   Assert.assertTrue(loginPage.isErrorMessageDisplayed());
     */
    public void attemptLoginExpectingFailure(String username, String password) {
        loginAs(username, password);
    }


    // ══════════════════════════════════════════════════════════════════════
    //  STATE GETTERS
    //  Return information about what the page is currently showing.
    //  Tests use these inside Assert statements.
    // ══════════════════════════════════════════════════════════════════════

    /**
     * Returns true if login succeeded.
     * Checks the URL — Guru99 navigates to index.php on success.
     * No DashboardPage needed; this is purely a URL state check.
     */
    public boolean isLoginSuccessful() {
        try {
            wait.until(ExpectedConditions.urlContains("index.php"));
            return driver.getCurrentUrl().contains("index.php");
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Returns the text of the welcome message after successful login.
     * Example return value: "Manger Id : mngr123"
     */
    public String getWelcomeMessage() {
        wait.until(ExpectedConditions.visibilityOf(welcomeMessage));
        return welcomeMessage.getText();
    }

    /**
     * Returns the error message shown after a failed login attempt.
     * Example return value: "User or Password is not valid"
     */
    public String getErrorMessage() {
        wait.until(ExpectedConditions.visibilityOf(errorMessage));
        return errorMessage.getText();
    }

    /**
     * Returns true if the error message element is currently visible.
     * Use when you want a boolean check rather than reading the text.
     */
    public boolean isErrorMessageDisplayed() {
        try {
            wait.until(ExpectedConditions.visibilityOf(errorMessage));
            return errorMessage.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Returns true if we're still on the login page (login was blocked).
     * Checks that the username field is still visible — it disappears on dashboard.
     */
    public boolean isStillOnLoginPage() {
        try {
            return usernameField.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
}