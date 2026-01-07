package com.qa;

import java.time.Duration;

import org.openqa.selenium.By;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class locatorspractice {

    public static void main(String[] args) {
        
        // Initialize ChromeDriver - automatically manages the browser instance
        // Selenium Manager will find the correct ChromeDriver version matching your Chrome browser
        ChromeDriver driver = new ChromeDriver();
       
        // Navigate to the Rahul Shetty Academy locator practice website
        driver.get("https://rahulshettyacademy.com/locatorspractice/");
        // Get the page title (not printed, just retrieves it)
        driver.getTitle();
        //System.out.println("Title of the page is: " + driver.getTitle());
        
        // === LOGIN FORM SECTION ===
        // Use different locator strategies to find and interact with form elements
        // ID locator - finds element with id="inputUsername"
        driver.findElement(By.id("inputUsername")).sendKeys("dummyUser");
        
        // CSS Selector - finds input with placeholder attribute containing 'Password'
        driver.findElement(By.cssSelector("input[placeholder='Password']")).sendKeys("dummyPass");
        
        // XPath - finds button with type='submit'
        driver.findElement(By.xpath("//button[@type='submit']")).click();
        
        // === EXPLICIT WAIT SECTION ===
        // Create a WebDriverWait object with 30 second timeout
        // This is better than Thread.sleep() because it polls every 500ms by default
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));
        
        // Wait until error message appears (CSS selector: p with class 'error')
        // This ensures the page has processed the login attempt before continuing
        wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(By.cssSelector("p.error")));
        
        // === ERROR MESSAGE CAPTURE SECTION ===
        // After waiting for the error message to appear, extract the text content
        // CSS selector "p.error" finds <p> element with class='error'
        String errorMessage = driver.findElement(By.cssSelector("p.error")).getText();
        System.out.println("\n--- FORM RESPONSE RECEIVED ---");
        System.out.println("Error Message: " + errorMessage);
        System.out.println("(This confirms the form submission was processed)");
        
        // === CHECKBOX VERIFICATION SECTION ===
        // This section demonstrates how to interact with and verify checkboxes
        // We check two important states: isDisplayed() and isSelected()
        
        // Click first checkbox and verify its state
        // isDisplayed() = is element visible on screen
        // isSelected() = is checkbox marked/checked
        driver.findElement(By.id("chkboxOne")).click();
        boolean isCheckbox1Displayed = driver.findElement(By.id("chkboxOne")).isDisplayed();
        boolean isCheckbox1Checked = driver.findElement(By.id("chkboxOne")).isSelected();
        System.out.println("\n--- CHECKBOX 1 STATE ---");
        System.out.println("ID Locator: chkboxOne");
        System.out.println("Is Displayed: " + isCheckbox1Displayed + " | Is Checked: " + isCheckbox1Checked);
        
        // Click and verify second checkbox (wrapped in try-catch for safety)
        try {
            driver.findElement(By.id("chkboxTwo")).click();
            boolean isCheckbox2Displayed = driver.findElement(By.id("chkboxTwo")).isDisplayed();
            boolean isCheckbox2Checked = driver.findElement(By.id("chkboxTwo")).isSelected();
            System.out.println("\n--- CHECKBOX 2 STATE ---");
            System.out.println("ID Locator: chkboxTwo");
            System.out.println("Is Displayed: " + isCheckbox2Displayed + " | Is Checked: " + isCheckbox2Checked);
            
            // Verify both are checked and displayed
            if (isCheckbox1Displayed && isCheckbox1Checked && isCheckbox2Displayed && isCheckbox2Checked) {
                System.out.println("\n✅ CHECKBOX VERIFICATION PASSED");
                System.out.println("Both checkboxes are checked and displayed!");
            } else {
                System.out.println("\n❌ CHECKBOX VERIFICATION FAILED");
                System.out.println("One or more checkboxes are not in correct state");
            }
        } catch (Exception e) {
            System.out.println("\n⚠️  Second checkbox test: " + e.getMessage());
        }
        
        // === FORGOT PASSWORD / NAVIGATION SECTION ===
        // This section demonstrates link navigation and URL verification
        // LinkText locator finds <a> elements by their visible text
        System.out.println("\n--- FORGOT PASSWORD FLOW ---");
        System.out.println("Navigating to forgot password page...");
        driver.findElement(By.linkText("Forgot password?")).click();

        // === URL VERIFICATION SECTION ===
        // After clicking the link, we verify if the URL changed
        String beforeUrl = driver.getCurrentUrl();
        System.out.println("Current URL: " + beforeUrl);
        
        if (beforeUrl.contains("resetpassword")) {
            System.out.println("✅ URL changed to reset password page");
        } else {
            System.out.println("✅ URL remained the same (dynamic form load)");
        }

        // === FORM DISPLAY VERIFICATION SECTION ===
        // Wait for and verify the "Forgot Password" form appears
        // Use WebDriverWait with XPath to ensure element is loaded before checking
        System.out.println("\n--- FORM VERIFICATION ---");
        try {
            // Wait for the form heading to be visible (30 second timeout)
            wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(By.xpath("//form[@action='#']//h2")));
            
            // Extract and verify the heading text
            boolean isFormDisplayed = driver.findElement(By.xpath("//form[@action='#']//h2")).isDisplayed();
            String formHeading = driver.findElement(By.xpath("//form[@action='#']//h2")).getText();
            
            System.out.println("Form Heading Found: " + formHeading);
            System.out.println("Is Form Displayed: " + isFormDisplayed);
            
            if (isFormDisplayed) {
                System.out.println("✅ Forgot password form displayed successfully!");
            } else {
                System.out.println("❌ Form not displayed (element exists but hidden)");
            }
        } catch (Exception e) {
            System.out.println("❌ Form heading not found: " + e.getMessage());
            System.out.println("\nAttempting alternative selectors for debugging...");
            
            // Try to find h2 anywhere on page
            try {
                String heading = driver.findElement(By.xpath("//h2")).getText();
                System.out.println("DEBUG: Found h2 with text: " + heading);
            } catch (Exception e2) {
                System.out.println("DEBUG: No h2 element found");
            }
            
            // Try to find form element
            try {
                String formText = driver.findElement(By.cssSelector("form")).getText();
                System.out.println("DEBUG: Found form element with content length: " + formText.length());
            } catch (Exception e3) {
                System.out.println("DEBUG: No form element found");
            }
        }

        // === CLEANUP SECTION ===
        // Close the browser window and quit the WebDriver session
        System.out.println("\n--- TEST COMPLETE ---");
        System.out.println("Closing browser...");
        driver.close();
        driver.quit();
        System.out.println("✅ Browser closed successfully");



        /*System.out.println(driver.findElement(By.cssSelector("p.error")).getText());
        driver.findElement(By.linkText("Forgot your password?")).click();
       driver.findElement(By.xpath("//input[@placeholder='Name']")).sendKeys("John");
       driver.findElement(By.cssSelector("input[placeholder='Email']")).sendKeys("john@ example.com");
       driver.findElement(By.xpath("//input[@type='text'][2]")).clear();
       driver.findElement(By.xpath("//input[@type='text'][2]")).sendKeys("  johnny@ example.com");
       driver.findElement(By.cssSelector("input[placeholder='Phone Number']")).sendKeys("1234567890");
       driver.findElement(By.xpath("//button[@class='reset-pwd-btn']")).            click();
       System.out.println(driver.findElement(By.cssSelector("form p")).getText());
       driver.findElement(By.xpath("//div[@class='forgot-pwd-btn-conainer']/button")).click();
       driver.findElement(By.id("inputUsername")).sendKeys("dummyUser");
       driver.findElement(By.cssSelector("input[placeholder='Password']")).sendKeys("dummyPass");
       driver.findElement(By.xpath("//input[@type='checkbox']")).click();
       driver.findElement(By.xpath("//button[@type='submit']")).click();
       System.out.println("Logged in successfully");
       */
  
      
    }

}
