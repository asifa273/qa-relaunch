package com.qa.framework.base;

import com.qa.framework.config.ConfigReader;
import org.openqa.selenium.WebDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Optional;
import org.testng.annotations.Parameters;

public class BaseTest {

    /**
     * NO instance field for the driver. TestNG creates ONE instance of a test class and
     * runs its @Test methods across parallel threads, so an instance field would be
     * shared mutable state — thread 2 would overwrite thread 1's driver mid-test.
     * Always resolve the driver per-thread through the ThreadLocal in DriverFactory.
     */
    protected WebDriver driver() {
        return DriverFactory.getDriver();
    }

    @Parameters({"browser"})
    @BeforeMethod(alwaysRun = true)
    public void setUp(@Optional("") String browserParam) {
        String browser = browserParam.isBlank()
                ? ConfigReader.get("browser", "chrome")
                : browserParam;
        DriverFactory.initDriver(browser);
        driver().get(ConfigReader.get("base.url", "https://www.saucedemo.com/"));
    }

    @AfterMethod(alwaysRun = true)
    public void tearDown() {
        DriverFactory.quitDriver();
    }
}