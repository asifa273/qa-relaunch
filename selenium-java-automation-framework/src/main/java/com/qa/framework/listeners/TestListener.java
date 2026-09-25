package com.qa.framework.listeners;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.MediaEntityBuilder;
import com.aventstack.extentreports.Status;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import com.qa.framework.base.DriverFactory;
import com.qa.framework.utils.ScreenshotUtils;
import org.testng.*;

/**
 * ITestListener hooks the TestNG lifecycle: build the Extent report, log each result,
 * and auto-attach a screenshot on failure. Wired in via testng.xml <listeners>.
 */
public class TestListener implements ITestListener {

    private static ExtentReports extent;
    private static final ThreadLocal<ExtentTest> TEST = new ThreadLocal<>();

    @Override
    public void onStart(ITestContext context) {
        ExtentSparkReporter spark = new ExtentSparkReporter("target/extent-report.html");
        spark.config().setDocumentTitle("QA Automation Report");
        spark.config().setReportName("Regression Suite");
        extent = new ExtentReports();
        extent.attachReporter(spark);
        extent.setSystemInfo("Framework", "Selenium 4 + TestNG + Cucumber");
    }

    @Override
    public void onTestStart(ITestResult result) {
        TEST.set(extent.createTest(result.getMethod().getMethodName(),
                result.getMethod().getDescription()));
    }

    @Override
    public void onTestSuccess(ITestResult result) {
        TEST.get().log(Status.PASS, "Passed");
    }

    @Override
    public void onTestFailure(ITestResult result) {
        ExtentTest test = TEST.get();
        test.log(Status.FAIL, result.getThrowable());
        try {
            String base64 = ScreenshotUtils.captureBase64(DriverFactory.getDriver());
            ScreenshotUtils.capture(DriverFactory.getDriver(), result.getMethod().getMethodName());
            test.fail("Screenshot on failure",
                    MediaEntityBuilder.createScreenCaptureFromBase64String(base64).build());
        } catch (Exception ignored) {
            // API/DB tests have no driver - nothing to capture
        }
    }

    @Override
    public void onTestSkipped(ITestResult result) {
        TEST.get().log(Status.SKIP, "Skipped");
    }

    @Override
    public void onFinish(ITestContext context) {
        extent.flush();
    }
}
