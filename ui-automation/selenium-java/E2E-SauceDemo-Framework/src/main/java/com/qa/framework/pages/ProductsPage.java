package com.qa.framework.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.Comparator;
import java.util.List;

public class ProductsPage extends BasePage {

    private static final By TITLE = By.cssSelector(".title");
    private static final By INVENTORY_ITEM = By.cssSelector(".inventory_item");
    private static final By ITEM_NAME = By.cssSelector(".inventory_item_name");
    private static final By ITEM_PRICE = By.cssSelector(".inventory_item_price");
    private static final By CART_BADGE = By.cssSelector(".shopping_cart_badge");
    private static final By CART_LINK = By.cssSelector(".shopping_cart_link");
    private static final By SORT_DROPDOWN = By.cssSelector(".product_sort_container");
    private static final By BURGER_MENU = By.id("react-burger-menu-btn");
    private static final By LOGOUT = By.id("logout_sidebar_link");

    public ProductsPage(WebDriver driver) {
        super(driver);
    }

    public boolean isLoaded() {
        return isDisplayed(TITLE) && textOf(TITLE).equalsIgnoreCase("Products");
    }

    public int productCount() {
        return allVisible(INVENTORY_ITEM).size();
    }

    /**
     * Dynamic XPath built from data.
     * Note normalize-space() to survive whitespace changes in the DOM.
     */
    public ProductsPage addToCart(String productName) {
        By addButton = By.xpath(
                "//div[@class='inventory_item'][.//div[normalize-space()='" + productName + "']]"
                        + "//button[contains(@id,'add-to-cart')]");
        scrollIntoView(addButton);
        click(addButton);
        return this;
    }

    public int cartCount() {
        return isDisplayed(CART_BADGE) ? Integer.parseInt(textOf(CART_BADGE)) : 0;
    }

    public ProductsPage sortBy(String visibleText) {
        selectByVisibleText(SORT_DROPDOWN, visibleText);
        return this;
    }

    public List<String> productNames() {
        return allVisible(ITEM_NAME).stream().map(WebElement::getText).toList();
    }

    public List<Double> productPrices() {
        return allVisible(ITEM_PRICE).stream()
                .map(e -> Double.parseDouble(e.getText().replace("$", "")))
                .toList();
    }

    public boolean pricesAreAscending() {
        List<Double> prices = productPrices();
        return prices.equals(prices.stream().sorted(Comparator.naturalOrder()).toList());
    }

    public CartPage openCart() {
        click(CART_LINK);
        return new CartPage(driver);
    }

    public LoginPage logout() {
        click(BURGER_MENU);
        click(LOGOUT);
        return new LoginPage(driver);
    }
}
