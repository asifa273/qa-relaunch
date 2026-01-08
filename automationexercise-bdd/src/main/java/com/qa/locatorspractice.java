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
        driver.findElement(By.cssSelector("#inputUsername")).sendKeys("dummyUser");
        
        // CSS Selector - finds input with placeholder attribute containing 'Password'
        driver.findElement(By.name("inputPassword")).sendKeys("dummyPass");
        
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
        System.out.println("Attempting to navigate to forgot password page...");
        
        try {
            // Try to find and click the forgot password link
            driver.findElement(By.linkText("Forgot your password?")).click();

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
        } catch (Exception e) {
            System.out.println("❌ Could not navigate to forgot password page: " + e.getMessage());
            System.out.println("⚠️  This link may not exist on the current page");
        }

        // === PASSWORD RESET FORM SECTION ===
        // This section fills in the password reset form with user information
        // Using different locator strategies to find form input fields
        System.out.println("\n--- PASSWORD RESET FORM SUBMISSION ---");
        
        // CSS Selector - finds input with placeholder="Name" and enters test data
        // This locates the name field using its HTML placeholder attribute
        driver.findElement(By.cssSelector("input[placeholder=\"Name\"]")).sendKeys("Begum");
        
        // XPath - finds input with placeholder="Email" and enters test email
        // XPath uses attribute matching with @ symbol to find elements by attribute values
        driver.findElement(By.xpath("//input[@placeholder=\"Email\"]")).sendKeys("dummye@gmail.com");
        
        // XPath - finds input with placeholder="Phone Number" and enters phone
        // This demonstrates finding elements nested within the form using attribute predicates
        driver.findElement(By.xpath("//input[@placeholder=\"Phone Number\"]")).sendKeys("1234567890");
        
        // CSS Selector with class - finds button with class="reset-pwd-btn" and clicks it
        // The dot (.) in CSS selectors represents class selector (.classname)
        System.out.println("Submitting password reset form...");
        driver.findElement(By.cssSelector(".reset-pwd-btn")).click();

        // === RESET CONFIRMATION MESSAGE SECTION ===
        // After form submission, wait for and verify the success message appears
        System.err.println("\n--- PASSWORD RESET CONFIRMATION ---");
        
        // First try-catch block: Check if confirmation message is displayed
        // This verifies the message element is visible on the page
        try {
            // Wait up to 30 seconds for the confirmation message to appear
            // XPath searches for any <p> element with class="infoMsg"
            wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(By.xpath("//p[@class=\"infoMsg\"]")));
            
            // Extract the visibility state (should be true if wait succeeded)
            boolean isResetMessageDisplayed = driver.findElement(By.xpath("//p[@class=\"infoMsg\"]")).isDisplayed();
            
            // Print the visibility status
            System.out.println("Reset Confirmation Message - Is Displayed: " + isResetMessageDisplayed); 
             
            System.err.println("✅ Reset form submitted successfully");
        } catch (Exception e) {
            // If the message doesn't appear within 30 seconds, catch the exception
            System.out.println("❌ Reset confirmation message not found: " + e.getMessage());
            System.out.println("⚠️  The form may not have submitted correctly");
        }

        // Second try-catch block: Extract the actual text of the confirmation message
        // This retrieves what the confirmation message actually says
        try {
            // Find the confirmation message element and get its text content
            String resetMessage = driver.findElement(By.xpath("//p[@class=\"infoMsg\"]")).getText();
            
            // Display the actual confirmation message text
            System.out.println("Reset Message Text: " + resetMessage);
            System.out.println("✅ Password reset message retrieved successfully");
        } catch (Exception e2) {
            // If the element doesn't exist or has no text, handle the error
            System.out.println("❌ Reset message not found: " + e2.getMessage());
            System.out.println("⚠️  Could not retrieve confirmation message text");
        }

        // === CLEANUP SECTION ===
        // Quit the WebDriver session - this closes all windows and ends the session
        // Note: driver.quit() is sufficient - no need to call driver.close() before it
        System.out.println("\n--- TEST COMPLETE ---");
        System.out.println("Closing browser...");
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
