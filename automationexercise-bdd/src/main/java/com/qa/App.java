package com.qa;

import org.openqa.selenium.By;
import org.openqa.selenium.chrome.ChromeDriver;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args )
    {
        ChromeDriver driver = new ChromeDriver();
        driver.get("https://rahulshettyacademy.com/seleniumPractise/#/");
        driver.getTitle();
        System.out.println("Title of the page is: " + driver.getTitle());
        System.out.println("Product section is displayed: " + driver.findElement(By.className("products-wrapper")).isDisplayed());
        driver.findElement(By.xpath("//*[contains(text(),'Brocolli - 1 Kg') or contains(text(),'Broccoli - 1 Kg')]"));
        System.out.println("Broccoli Product is displayed: " + driver.findElement(By.xpath("//*[contains(text(),'Brocolli - 1 Kg') or contains(text(),'Broccoli - 1 Kg')]")).isDisplayed());
        System.out.println("Cauliflower Product is displayed: " + driver.findElement(By.xpath("//*[contains(text(),'Cauliflower - 1 Kg') or contains(text(),'Cauliflower - 1 Kg')]/following-sibling::div/button")).isDisplayed());
        
        // Example of array usage
        int[] numbers = {1, 2, 3, 4, 5};
        System.out.println("Third element in array: " + numbers[2]);
        
        driver.quit();
    }
}
