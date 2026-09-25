package com.qa.framework.base;

import com.qa.framework.config.ConfigReader;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.edge.EdgeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;

import java.time.Duration;

/**
 * ThreadLocal<WebDriver> is the whole reason this framework can run tests in parallel
 * without sessions bleeding into each other. Every thread TestNG spawns gets its own
 * driver reference; a plain static WebDriver would be shared and instantly flaky.
 *
 * INTERVIEW: "How do you support parallel execution?" -> this class plus
 * testng.xml parallel="methods" thread-count="3".
 */
public final class DriverFactory {

    private static final ThreadLocal<WebDriver> DRIVER = new ThreadLocal<>();

    private DriverFactory() { }

    public static WebDriver initDriver(String browser) {
        boolean headless = ConfigReader.getBoolean("headless", true);
        WebDriver driver;

        switch (browser.toLowerCase()) {
            case "firefox" -> {
                FirefoxOptions options = new FirefoxOptions();
                if (headless) options.addArguments("-headless");
                driver = new FirefoxDriver(options);
            }
            case "edge" -> {
                EdgeOptions options = new EdgeOptions();
                if (headless) options.addArguments("--headless=new");
                driver = new EdgeDriver(options);
            }
            default -> {
                ChromeOptions options = new ChromeOptions();
                if (headless) options.addArguments("--headless=new");
                options.addArguments("--window-size=1920,1080", "--no-sandbox",
                        "--disable-dev-shm-usage", "--disable-gpu");
                driver = new ChromeDriver(options);
            }
        }

        // Implicit wait kept LOW and only as a safety net. Real synchronisation is the
        // explicit waits in BasePage. Mixing a high implicit wait with explicit waits
        // gives unpredictable timeouts - a very common interview follow-up.
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(2));
        driver.manage().timeouts().pageLoadTimeout(Duration.ofSeconds(30));

        DRIVER.set(driver);
        return driver;
    }

    public static WebDriver getDriver() {
        WebDriver driver = DRIVER.get();
        if (driver == null) throw new IllegalStateException("Driver not initialised for this thread");
        return driver;
    }

    public static void quitDriver() {
        WebDriver driver = DRIVER.get();
        if (driver != null) {
            driver.quit();
            DRIVER.remove();   // prevents ThreadLocal leaks in long CI runs
        }
    }
}
