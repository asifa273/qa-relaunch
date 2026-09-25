package com.qa.framework.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class CheckoutPage extends BasePage {

    private static final By FIRST_NAME = By.id("first-name");
    private static final By LAST_NAME = By.id("last-name");
    private static final By POSTAL_CODE = By.id("postal-code");
    private static final By CONTINUE = By.id("continue");
    private static final By FINISH = By.id("finish");
    private static final By ERROR = By.cssSelector("h3[data-test='error']");
    private static final By SUBTOTAL = By.cssSelector(".summary_subtotal_label");
    private static final By TAX = By.cssSelector(".summary_tax_label");
    private static final By TOTAL = By.cssSelector(".summary_total_label");
    private static final By CONFIRMATION = By.cssSelector(".complete-header");

    public CheckoutPage(WebDriver driver) {
        super(driver);
    }

    public CheckoutPage fillDetails(String first, String last, String zip) {
        type(FIRST_NAME, first);
        type(LAST_NAME, last);
        type(POSTAL_CODE, zip);
        click(CONTINUE);
        return this;
    }

    public CheckoutPage submitWithoutDetails() {
        click(CONTINUE);
        return this;
    }

    public String errorMessage() {
        return textOf(ERROR);
    }

    private double money(By locator) {
        String raw = textOf(locator);
        return Double.parseDouble(raw.substring(raw.indexOf('$') + 1));
    }

    public double subtotal() { return money(SUBTOTAL); }
    public double tax()      { return money(TAX); }
    public double total()    { return money(TOTAL); }

    /** Business rule check: total must equal subtotal + tax, to 2 decimal places. */
    public boolean totalIsArithmeticallyCorrect() {
        return Math.abs((subtotal() + tax()) - total()) < 0.01;
    }

    public CheckoutPage finish() {
        click(FINISH);
        return this;
    }

    public String confirmationMessage() {
        return textOf(CONFIRMATION);
    }
}
