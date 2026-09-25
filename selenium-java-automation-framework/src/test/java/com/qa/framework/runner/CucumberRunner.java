package com.qa.framework.runner;

import io.cucumber.testng.AbstractTestNGCucumberTests;
import io.cucumber.testng.CucumberOptions;
import org.testng.annotations.DataProvider;

@CucumberOptions(
        features = "src/test/resources/features",
        glue = {"com.qa.framework.steps"},
        tags = "@smoke or @negative",
        plugin = {
                "pretty",
                "html:target/cucumber-report.html",
                "json:target/cucumber.json",
                "timeline:target/timeline"
        },
        monochrome = true
)
public class CucumberRunner extends AbstractTestNGCucumberTests {

    /** Enables parallel scenario execution when dataProviderThreadCount > 1. */
    @Override
    @DataProvider(parallel = false)
    public Object[][] scenarios() {
        return super.scenarios();
    }
}
