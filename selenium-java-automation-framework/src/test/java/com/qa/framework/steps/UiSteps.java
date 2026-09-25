package com.qa.framework.steps;

import com.qa.framework.base.BaseTest;
import com.qa.framework.pages.*;
import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import com.qa.framework.base.DriverFactory;
import com.qa.framework.config.ConfigReader;
import org.openqa.selenium.WebDriver;
import org.testng.Assert;

/**
 * Cucumber glue. Note the steps contain NO locators - they only orchestrate page
 * objects. That separation (Feature -> Steps -> Pages -> Driver) is the layered
 * architecture you should draw on the whiteboard when asked about your framework.
 */
public class UiSteps {

    private WebDriver driver;
    private LoginPage loginPage;
    private ProductsPage productsPage;
    private CartPage cartPage;
    private CheckoutPage checkoutPage;

    @Before
    public void beforeScenario() {
        driver = DriverFactory.initDriver(ConfigReader.get("browser", "chrome"));
    }

    @After
    public void afterScenario() {
        DriverFactory.quitDriver();
    }

    @Given("the shopper is on the SwagLabs login page")
    public void openLoginPage() {
        driver.get(ConfigReader.get("base.url", "https://www.saucedemo.com/"));
        loginPage = new LoginPage(driver);
    }

    @When("the shopper logs in as {string} with password {string}")
    public void login(String username, String password) {
        loginPage.loginExpectingFailure(username, password);
        productsPage = new ProductsPage(driver);
    }

    @Then("the products page is displayed")
    public void productsDisplayed() {
        Assert.assertTrue(productsPage.isLoaded(), "Products page not displayed");
    }

    @And("{int} products are listed")
    public void productsListed(int expected) {
        Assert.assertEquals(productsPage.productCount(), expected);
    }

    @Then("an error message containing {string} is shown")
    public void errorShown(String fragment) {
        String actual = checkoutPage != null && driver.getCurrentUrl().contains("checkout")
                ? checkoutPage.errorMessage()
                : loginPage.errorMessage();
        Assert.assertTrue(actual.contains(fragment),
                "Expected [" + fragment + "] but got [" + actual + "]");
    }

    @And("the shopper remains on the login page")
    public void stillOnLogin() {
        Assert.assertFalse(driver.getCurrentUrl().contains("inventory.html"));
    }

    @When("the shopper adds {string} to the cart")
    public void addToCart(String product) {
        productsPage.addToCart(product);
    }

    @Then("the cart badge shows {int}")
    public void cartBadge(int count) {
        Assert.assertEquals(productsPage.cartCount(), count);
    }

    @When("the shopper checks out as {string} {string} with postcode {string}")
    public void checkout(String first, String last, String zip) {
        cartPage = productsPage.openCart();
        checkoutPage = cartPage.proceedToCheckout().fillDetails(first, last, zip);
    }

    @When("the shopper checks out with no details")
    public void checkoutNoDetails() {
        cartPage = productsPage.openCart();
        checkoutPage = cartPage.proceedToCheckout().submitWithoutDetails();
    }

    @Then("the order total equals subtotal plus tax")
    public void totalIsCorrect() {
        Assert.assertTrue(checkoutPage.totalIsArithmeticallyCorrect(),
                "Total does not equal subtotal + tax");
    }

    @When("the shopper finishes the order")
    public void finishOrder() {
        checkoutPage.finish();
    }

    @Then("the confirmation message {string} is displayed")
    public void confirmation(String expected) {
        Assert.assertEquals(checkoutPage.confirmationMessage(), expected);
    }
}
