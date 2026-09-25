package asifa.banking.base;

import com.asifa.banking.constants.AppConstants;
import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.Status;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.apache.commons.io.FileUtils;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.ITestResult;
import org.testng.annotations.AfterClass;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeMethod;

import java.io.File;
import java.io.IOException;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * BaseTest.java
 *
 * Every test class in this framework extends this class.
 * It handles four responsibilities so your test classes never have to:
 *
 *   1. Browser launch and teardown  (@BeforeMethod / @AfterMethod)
 *   2. ExtentReports setup          (@BeforeClass / @AfterClass)
 *   3. Screenshot on failure        (captureScreenshot)
 *   4. Shared driver access         (getDriver / getWait)
 *
 * Think of it as the stage crew — does all the setup so the actors
 * (your test methods) can walk out and perform cleanly.
 */
public class BaseTest {

    // ── Driver — ThreadLocal keeps parallel runs from sharing one browser ──
    private static ThreadLocal<WebDriver> driver = new ThreadLocal<>();

    // ── Explicit wait — reuse across any test via getWait() ───────────────
    private static ThreadLocal<WebDriverWait> wait = new ThreadLocal<>();

    // ── ExtentReports — one report per test class run ─────────────────────
    protected static ExtentReports extent;
    protected static ExtentTest test;  // Each @Test method sets this


    // ══════════════════════════════════════════════════════════════════════
    //  REPORT SETUP — runs once before the first test in the class
    // ══════════════════════════════════════════════════════════════════════
    @BeforeClass
    public void setUpReport() {
        // Make sure the reports folder exists
        new File("reports/screenshots").mkdirs();

        ExtentSparkReporter sparkReporter = new ExtentSparkReporter(AppConstants.REPORT_PATH);
        sparkReporter.config().setDocumentTitle(AppConstants.REPORT_TITLE);
        sparkReporter.config().setReportName(AppConstants.REPORT_NAME);

        extent = new ExtentReports();
        extent.attachReporter(sparkReporter);
        extent.setSystemInfo("Tester",      "Asifa Begum");
        extent.setSystemInfo("Environment", "Demo / Staging");
        extent.setSystemInfo("Browser",     AppConstants.DEFAULT_BROWSER);
    }


    // ══════════════════════════════════════════════════════════════════════
    //  BROWSER LAUNCH — runs before every single @Test method
    // ══════════════════════════════════════════════════════════════════════
    @BeforeMethod
    public void setUp() {
        // Read browser from system property (CI/CD passes -Dbrowser=chrome)
        // Falls back to AppConstants default if nothing is passed
        String browser = System.getProperty("browser", AppConstants.DEFAULT_BROWSER);
        initDriver(browser);

        getDriver().get(AppConstants.BASE_URL);
    }


    // ══════════════════════════════════════════════════════════════════════
    //  BROWSER TEARDOWN — runs after every single @Test method
    // ══════════════════════════════════════════════════════════════════════
    @AfterMethod
    public void tearDown(ITestResult result) {
        // If test failed → take screenshot → log to report
        if (result.getStatus() == ITestResult.FAILURE) {
            String screenshotPath = captureScreenshot(result.getName());

            if (test != null) {
                test.fail("Test FAILED: " + result.getThrowable().getMessage());
                test.addScreenCaptureFromPath(screenshotPath, "Failure Screenshot");
            }

        } else if (result.getStatus() == ITestResult.SUCCESS) {
            if (test != null) test.log(Status.PASS, "Test PASSED");

        } else {
            if (test != null) test.log(Status.SKIP, "Test SKIPPED");
        }

        quitDriver();
    }


    // ══════════════════════════════════════════════════════════════════════
    //  REPORT FLUSH — runs once after the last test in the class
    // ══════════════════════════════════════════════════════════════════════
    @AfterClass
    public void tearDownReport() {
        if (extent != null) {
            extent.flush();  // Writes the HTML report to disk
        }
    }


    // ══════════════════════════════════════════════════════════════════════
    //  DRIVER FACTORY — private, used only by setUp()
    // ══════════════════════════════════════════════════════════════════════
    private void initDriver(String browser) {
        WebDriver webDriver;

        switch (browser.toLowerCase()) {
            case "firefox":
                WebDriverManager.firefoxdriver().setup();
                webDriver = new FirefoxDriver();
                break;

            case "chrome":
            default:
                WebDriverManager.chromedriver().setup();
                ChromeOptions options = new ChromeOptions();

                // Headless mode for CI/CD (GitHub Actions has no monitor)
                if (Boolean.parseBoolean(System.getProperty("headless", "false"))) {
                    options.addArguments("--headless=new");
                    options.addArguments("--no-sandbox");
                    options.addArguments("--disable-dev-shm-usage");
                    options.addArguments("--window-size=1920,1080");
                }

                webDriver = new ChromeDriver(options);
                break;
        }

        webDriver.manage().timeouts().implicitlyWait(Duration.ofSeconds(AppConstants.IMPLICIT_WAIT));
        webDriver.manage().timeouts().pageLoadTimeout(Duration.ofSeconds(AppConstants.PAGE_LOAD_TIMEOUT));
        webDriver.manage().window().maximize();

        driver.set(webDriver);
        wait.set(new WebDriverWait(webDriver, Duration.ofSeconds(AppConstants.EXPLICIT_WAIT)));
    }

    private void quitDriver() {
        if (driver.get() != null) {
            driver.get().quit();
            driver.remove();
            wait.remove();
        }
    }


    // ══════════════════════════════════════════════════════════════════════
    //  PUBLIC ACCESSORS — your Page Objects and test classes call these
    // ══════════════════════════════════════════════════════════════════════

    /**
     * Returns the WebDriver for the current test.
     * Call this in every Page Object constructor and in test classes.
     */
    public WebDriver getDriver() {
        return driver.get();
    }

    /**
     * Returns a pre-configured WebDriverWait (15 seconds by default).
     * Use this instead of Thread.sleep() — always.
     *
     * Example:
     *   getWait().until(ExpectedConditions.visibilityOf(someElement));
     */
    public WebDriverWait getWait() {
        return wait.get();
    }


    // ══════════════════════════════════════════════════════════════════════
    //  SCREENSHOT UTILITY
    // ══════════════════════════════════════════════════════════════════════

    /**
     * Takes a screenshot and saves it to reports/screenshots/
     * Called automatically by tearDown() on test failure.
     * You can also call it manually mid-test for debugging.
     *
     * @param testName  used as the filename prefix
     * @return          the file path string (used by ExtentReports to embed it)
     */
    public String captureScreenshot(String testName) {
        String timestamp = LocalDateTime.now()
                .format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));
        String fileName  = testName + "_" + timestamp + ".png";
        String filePath  = AppConstants.SCREENSHOT_PATH + fileName;

        try {
            File source      = ((TakesScreenshot) getDriver()).getScreenshotAs(OutputType.FILE);
            File destination = new File(filePath);
            FileUtils.copyFile(source, destination);
        } catch (IOException e) {
            System.err.println("Screenshot failed for: " + testName + " — " + e.getMessage());
        }

        return filePath;
    }
}