package com.qa.framework.pages;

import com.qa.framework.config.ConfigReader;
import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;

/**
 * Parent of every page object. Holds the reusable, synchronised interactions so no
 * page object ever calls driver.findElement(...).click() raw - that is the single
 * biggest source of flaky Selenium suites.
 */
public abstract class BasePage {

    protected final WebDriver driver;
    protected final WebDriverWait wait;

    protected BasePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver,
                Duration.ofSeconds(ConfigReader.getInt("explicit.wait", 15)));
    }

    // ---------- synchronised actions ----------

    protected WebElement visible(By locator) {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
    }

    protected WebElement clickable(By locator) {
        return wait.until(ExpectedConditions.elementToBeClickable(locator));
    }

    protected void click(By locator) {
        try {
            clickable(locator).click();
        } catch (ElementClickInterceptedException e) {
            // Overlay/sticky header intercepted the click - JS click is the pragmatic fallback
            ((JavascriptExecutor) driver).executeScript(
                    "arguments[0].click();", driver.findElement(locator));
        } catch (StaleElementReferenceException e) {
            // DOM re-rendered between lookup and click: re-find once and retry
            clickable(locator).click();
        }
    }

    protected void type(By locator, String text) {
        WebElement element = visible(locator);
        element.clear();
        element.sendKeys(text);
    }

    protected String textOf(By locator) {
        return visible(locator).getText().trim();
    }

    protected boolean isDisplayed(By locator) {
        try {
            return visible(locator).isDisplayed();
        } catch (TimeoutException | NoSuchElementException e) {
            return false;
        }
    }

    protected List<WebElement> allVisible(By locator) {
        return wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(locator));
    }

    protected void selectByVisibleText(By locator, String text) {
        new Select(visible(locator)).selectByVisibleText(text);
    }

    protected void scrollIntoView(By locator) {
        ((JavascriptExecutor) driver).executeScript(
                "arguments[0].scrollIntoView({block:'center'});", driver.findElement(locator));
    }

    /**
     * FluentWait example: poll every 500ms, ignore NoSuchElement, custom message.
     * Ask an interviewer for the difference between WebDriverWait and FluentWait and
     * this is the answer - WebDriverWait is a FluentWait subclass with fixed defaults.
     */
    protected WebElement fluentlyWaitFor(By locator, int timeoutSeconds) {
        return new FluentWait<>(driver)
                .withTimeout(Duration.ofSeconds(timeoutSeconds))
                .pollingEvery(Duration.ofMillis(500))
                .ignoring(NoSuchElementException.class)
                .withMessage("Element never appeared: " + locator)
                .until(d -> d.findElement(locator));
    }

    public String pageTitle() {
        return driver.getTitle();
    }

    public String currentUrl() {
        return driver.getCurrentUrl();
    }
}
