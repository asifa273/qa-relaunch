package tests;

import javax.xml.xpath.XPath;
import java.time.Duration;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.Test;

import io.github.bonigarcia.wdm.WebDriverManager;

public class LoginItemsCart {

    @Test
    public void addToCart() {

        WebDriverManager.chromedriver().setup();
        ChromeOptions options = new ChromeOptions();
        WebDriver driver = new ChromeDriver(options);

        try {
            driver.get("https://www.saucedemo.com");
            driver.findElement(By.id("user-name")).sendKeys("standard_user");
            driver.findElement(By.id("password")).sendKeys("secret_sauce");
            driver.findElement(By.id("login-button")).click();  // ✅ click once only

            String pageTitle = driver.findElement(By.className("title")).getText();
            Assert.assertEquals(pageTitle, "Products", "Title mismatch on inventory page!");
            System.out.println("Successfully logged in and navigated to Products page.");

            // Wait to observe the Products page
            try {
                Thread.sleep(5000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            WebElement dropdown = driver.findElement(By.xpath("//select[@class='product_sort_container']"));
            Select sortSelect = new Select(dropdown);
            sortSelect.selectByValue("lohi");
             try {
                Thread.sleep(5000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("Sorted items from low to high price.");

           // Wait for prices to refresh after sorting before asserting
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("inventory_item_price")));
            String firstItemPrice = driver.findElement(By.className("inventory_item_price")).getText();
            Assert.assertEquals(firstItemPrice, "$7.99");
            System.out.println("Verified that the first item is the cheapest one.");

        
            
            WebElement addToCardButton = driver.findElement(By.id("add-to-cart-sauce-labs-onesie"));
            addToCardButton.click();
            System.out.println("Added the cheapest item-Sauce Labs Onesie to the cart.");
           
            WebElement cartBadge = driver.findElement(By.xpath("//span[@class='shopping_cart_badge']"));
            cartBadge.isDisplayed();
            cartBadge.click();
            Assert.assertEquals(cartBadge.getText(), "1");
            System.out.println("Verified that the cart badge shows 1 item.");
             try {
                Thread.sleep(5000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        } 
           
        
        finally {
            driver.quit();  // ✅ always runs, even if the test fails
        }
    }
}