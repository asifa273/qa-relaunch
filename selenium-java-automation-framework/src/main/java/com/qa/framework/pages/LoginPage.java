package com.qa.framework.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/**
 * Page Object Model, By-locator style (no @FindBy/PageFactory).
 * Why: PageFactory's lazy proxies hide StaleElementReferenceException in odd ways and
 * Selenium's own team now discourages it. Plain By constants are simpler and explicit.
 * Be ready to say that out loud - it shows you chose, rather than copied a tutorial.
 */
public class LoginPage extends BasePage {

    private static final By USERNAME = By.id("user-name");
    private static final By PASSWORD = By.id("password");
    private static final By LOGIN_BTN = By.id("login-button");
    private static final By ERROR_MSG = By.cssSelector("h3[data-test='error']");

    public LoginPage(WebDriver driver) {
        super(driver);
    }

    /** Page actions return the NEXT page object - that chaining is core to POM. */
    public ProductsPage loginAs(String username, String password) {
        type(USERNAME, username);
        type(PASSWORD, password);
        click(LOGIN_BTN);
        return new ProductsPage(driver);
    }

    /** Negative path stays on the same page, so it returns this. */
    public LoginPage loginExpectingFailure(String username, String password) {
        type(USERNAME, username);
        type(PASSWORD, password);
        click(LOGIN_BTN);
        return this;
    }

    public String errorMessage() {
        return textOf(ERROR_MSG);
    }

    public boolean isErrorDisplayed() {
        return isDisplayed(ERROR_MSG);
    }
}
