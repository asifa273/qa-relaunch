package com.qa.framework.utils;

import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public final class ScreenshotUtils {

    private static final DateTimeFormatter STAMP =
            DateTimeFormatter.ofPattern("yyyyMMdd-HHmmss-SSS");

    private ScreenshotUtils() { }

    /** Called from the TestNG listener on failure, so evidence is automatic. */
    public static String capture(WebDriver driver, String testName) {
        try {
            File src = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
            Path dir = Paths.get("target", "screenshots");
            Files.createDirectories(dir);
            Path dest = dir.resolve(testName + "-" + LocalDateTime.now().format(STAMP) + ".png");
            Files.copy(src.toPath(), dest);
            return dest.toString();
        } catch (Exception e) {
            return "screenshot failed: " + e.getMessage();
        }
    }

    public static String captureBase64(WebDriver driver) {
        return ((TakesScreenshot) driver).getScreenshotAs(OutputType.BASE64);
    }
}
