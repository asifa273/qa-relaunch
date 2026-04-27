package utils;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;

import config.ConfigReader;
import io.github.bonigarcia.wdm.WebDriverManager;

public class WebDriverUtils {
    
    private static final ThreadLocal<WebDriver> driver = new ThreadLocal<>();

    public static WebDriver initializeDriver() {
        String browserName = ConfigReader.getBrowser().toLowerCase();
        
        switch (browserName) {
            case "chrome":
                driver.set(initializeChromeDriver());
                break;
            case "firefox":
                driver.set(initializeFirefoxDriver());
                break;
            default:
                throw new IllegalArgumentException("Browser not supported: " + browserName);
        }
        
        return driver.get();
    }

    private static WebDriver initializeChromeDriver() {
        WebDriverManager.chromedriver().setup();
        ChromeOptions options = new ChromeOptions();
        
        if (ConfigReader.isHeadless()) {
            options.addArguments("--headless=new");
        }
        options.addArguments("--disable-blink-features=AutomationControlled");
        options.setExperimentalOption("excludeSwitches", new String[]{"enable-automation"});
        options.setExperimentalOption("useAutomationExtension", false);
        
        return new ChromeDriver(options);
    }

    private static WebDriver initializeFirefoxDriver() {
        WebDriverManager.firefoxdriver().setup();
        FirefoxOptions options = new FirefoxOptions();
        
        if (ConfigReader.isHeadless()) {
            options.addArguments("--headless");
        }
        
        return new FirefoxDriver(options);
    }

    public static WebDriver getDriver() {
        return driver.get();
    }

    public static void quitDriver() {
        if (driver.get() != null) {
            driver.get().quit();
            driver.remove();
        }
    }
}
