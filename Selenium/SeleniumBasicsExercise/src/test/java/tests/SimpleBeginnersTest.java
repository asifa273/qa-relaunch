package tests;

import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import io.github.bonigarcia.wdm.WebDriverManager;

public class SimpleBeginnersTest {
    
    // Global variable - can be used in any method
    WebDriver driver;
    
    @BeforeMethod
    public void setup() throws InterruptedException {
        // This runs BEFORE each test - Setup
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://rahulshettyacademy.com/dropdownsPractise/");
    }
    
    @Test
    public void testCountrySelection() throws InterruptedException {
        // Select the country as Indonesia from the auto-suggestive dropdown
        System.out.println("Step 1: Typing 'Indonesia' in country field");
        driver.findElement(By.id("autosuggest")).sendKeys("Indonesia");
        Thread.sleep(1500);
        
        // Get all dropdown options
        List<WebElement> optionList = driver.findElements(By.cssSelector("li[class='ui-menu-item'] a"));
        System.out.println("Step 2: Found " + optionList.size() + " options");
        
        // Loop through options and find Indonesia
        for (WebElement option : optionList) {
            if(option.getText().equalsIgnoreCase("Indonesia")) {
                System.out.println("Step 3: Found Indonesia option");
                
                // Use JavaScript to click (more reliable for intercepted elements)
                JavascriptExecutor js = (JavascriptExecutor) driver;
                js.executeScript("arguments[0].click();", option);
                System.out.println("✓ Successfully selected Indonesia");
                break;
            }
        }
        Thread.sleep(1000);
    }
    
    @AfterMethod
    public void teardown() {
        // This runs AFTER each test - Cleanup
        if(driver != null) {
            driver.quit();
        }
    }
}
    
   
    
 //   @Test
   // public void testFromSearch() throws InterruptedException {
        /*
        // Step 1: Click on the "From" dropdown
        System.out.println("Step 1: Clicking From dropdown");
        driver.findElement(By.id("ctl00_mainContent_ddl_originStation1_CTXTaction")).click();
        Thread.sleep(500);
        
        // Step 2: Select BKK from the dropdown
        System.out.println("Step 2: Selecting BKK");
        driver.findElement(By.xpath("//a[@value='BKK']")).click();
        Thread.sleep(1000);
        
        // Step 3: Click on the "To" dropdown
        System.out.println("Step 3: Clicking To dropdown");
        driver.findElement(By.id("ctl00_mainContent_ddl_destinationStation1_CTXTaction")).click();
        Thread.sleep(500);
        
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript("arguments[0].click();", driver.findElement(By.xpath("//div[@id = 'ctl00_mainContent_ddl_destinationStation1_CTNR'] //a[contains(text(), 'Chennai (MAA)')]")));
        Thread.sleep(1000); 
       
    // Step 4: Select MAA from the dropdown
  System.out.println("Step 4: Selecting MAA");
    driver.findElement(By.xpath("//div[@id = 'ctl00_mainContent_ddl_destinationStation1_CTNR'] //a[contains(text(), 'Chennai (MAA)')]")).click();
    Thread.sleep(1000);

        // Step 5: Print success message
        System.out.println("✓ Test completed! Selected BKK to MAA");

          Thread.sleep(1000);
 */
      
   /* 
    @Test
    public void testOpenGoogle() {
        // Test 2: Simple test - just verify page loaded
        String title = driver.getTitle();
        System.out.println("Google page title is: " + title);
    }
    
    @Test
    public void testGetCurrentUrl() {
        // Test 3: Get the current URL
        String url = driver.getCurrentUrl();
        System.out.println("Current URL: " + url);
    }
    
    @Test
    public void testSearchBoxExists() {
        // Test 4: Check if search box exists
        try {
            driver.findElement(By.name("q"));
            System.out.println("✓ Search box found!");
        } catch (Exception e) {
            System.out.println("✗ Search box NOT found!");
        }
    }
    
}
    */ 
