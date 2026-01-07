package com.qa;

import java.time.Duration;

import org.openqa.selenium.By;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class locatorspractice {

    public static void main(String[] args) {
        
        ChromeDriver driver = new ChromeDriver();
       
        driver.get("https://rahulshettyacademy.com/locatorspractice/");
        driver.getTitle();
        System.out.println("Title of the page is: " + driver.getTitle());
        driver.findElement(By.id("inputUsername")).sendKeys("dummyUser");
        driver.findElement(By.cssSelector("input[placeholder='Password']")).sendKeys("dummyPass");
        driver.findElement(By.xpath("//button[@type='submit']")).click();
        
        // Wait for error message to appear (indicates form submission processed)
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));
        wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(By.cssSelector("p.error")));
        //wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("p.error")));
        //System.out.println("Login successful!");
        // Verify the error message
        String errorMessage = driver.findElement(By.cssSelector("p.error")).getText();
        System.out.println("Form Response: " + errorMessage);
        
        // Click and verify first checkbox
        driver.findElement(By.id("chkboxOne")).click();
        boolean isCheckbox1Displayed = driver.findElement(By.id("chkboxOne")).isDisplayed();
        boolean isCheckbox1Checked = driver.findElement(By.id("chkboxOne")).isSelected();
        System.out.println("Checkbox 1 - Displayed: " + isCheckbox1Displayed + ", Checked: " + isCheckbox1Checked);
        
        // Click and verify second checkbox (if exists)
        try {
            driver.findElement(By.id("chkboxTwo")).click();
            boolean isCheckbox2Displayed = driver.findElement(By.id("chkboxTwo")).isDisplayed();
            boolean isCheckbox2Checked = driver.findElement(By.id("chkboxTwo")).isSelected();
            System.out.println("Checkbox 2 - Displayed: " + isCheckbox2Displayed + ", Checked: " + isCheckbox2Checked);
            
            // Verify both are checked and displayed
            if (isCheckbox1Displayed && isCheckbox1Checked && isCheckbox2Displayed && isCheckbox2Checked) {
                System.out.println("✅ Both checkboxes are checked and displayed!");
            } else {
                System.out.println("❌ One or more checkboxes are not in correct state");
            }
        } catch (Exception e) {
            System.out.println("Second checkbox not found: " + e.getMessage());
        }

        //when u click forgot password, it should take to the reset password page
        driver.findElement(By.linkText("Forgot your password?")).click();
        System.out.println("Navigated to reset password page: " + driver.getTitle());
        
        //wait for the reset password page to load

        wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(By.cssSelector(".form")));
//verify we are on the reset password page
        String resetPageText = driver.findElement((By.cssSelector(".form h2"))).getText();
        if (resetPageText.contains("Forgot password")) {
            System.out.println("✅ On reset password page");
        } else {
            System.out.println("❌ Not on reset password page");
        }





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
