package basetests;

import org.openqa.selenium.WebDriver;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.AfterMethod;
import utils.WebDriverUtils;
import config.ConfigReader;

public class BaseTest {
    
    protected WebDriver driver;

    @BeforeMethod
    public void setUp() {
        driver = WebDriverUtils.initializeDriver();
        driver.get(ConfigReader.getBaseUrl());
        driver.manage().window().maximize();
    }

    @AfterMethod
    public void tearDown() {
        WebDriverUtils.quitDriver();
    }
}
