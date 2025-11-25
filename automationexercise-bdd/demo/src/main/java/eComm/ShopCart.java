package eComm;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class ShopCart {

    public static void main(String[] args) {
        // Let Selenium Manager resolve the correct ChromeDriver for the installed Chrome
        // (avoid hard-coded paths which can become incompatible with browser updates)
        WebDriver driver = new ChromeDriver();
        driver.get("https://rahulshettyacademy.com/seleniumPractise/#/");
        System.out.println("Title of the page: " + driver.getTitle());
        driver.quit();
    }
}
