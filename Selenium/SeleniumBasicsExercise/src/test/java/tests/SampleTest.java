package tests;

import org.testng.Assert;
import org.testng.annotations.Test;

import basetests.BaseTest;
import pageobjects.GoogleSearchPage;

public class SampleTest extends BaseTest {

    @Test(description = "Verify Google Search functionality")
    public void testGoogleSearch() {
        // Initialize Page Object
        GoogleSearchPage googlePage = new GoogleSearchPage(driver);
        
        // Perform search
        googlePage.performSearch("Selenium WebDriver");
        
        // Verify search results
        String pageTitle = googlePage.getPageTitle();
        Assert.assertTrue(pageTitle.contains("Selenium WebDriver"), 
            "Search results page title should contain search term");
        
        System.out.println("Test passed! Page title: " + pageTitle);
    }
}
