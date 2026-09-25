package com.qa.framework.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;

import java.util.List;

public class CartPage extends BasePage {

    private static final By CART_ITEM = By.cssSelector(".cart_item");
    private static final By ITEM_NAME = By.cssSelector(".inventory_item_name");
    private static final By CHECKOUT_BTN = By.id("checkout");
    private static final By CONTINUE_SHOPPING = By.id("continue-shopping");

    public CartPage(WebDriver driver) {
        super(driver);
    }

    public List<String> itemNames() {
        return allVisible(ITEM_NAME).stream().map(WebElement::getText).toList();
    }

    public int itemCount() {
        return driver.findElements(CART_ITEM).size();
    }

    public CartPage removeItem(String productName) {
        By item = By.xpath("//div[@class='cart_item'][.//div[normalize-space()='" + productName + "']]");
        click(By.xpath("//div[@class='cart_item'][.//div[normalize-space()='"
                + productName + "']]//button[contains(@id,'remove')]"));
        wait.until(ExpectedConditions.invisibilityOfElementLocated(item));
        return this;
    }

    public CheckoutPage proceedToCheckout() {
        click(CHECKOUT_BTN);
        wait.until(ExpectedConditions.urlContains("checkout-step-one"));
        return new CheckoutPage(driver);
    }

    public ProductsPage continueShopping() {
        click(CONTINUE_SHOPPING);
        return new ProductsPage(driver);
    }
}
