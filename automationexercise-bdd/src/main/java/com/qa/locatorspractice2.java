package com.qa;

import org.openqa.selenium.By;
import org.openqa.selenium.chrome.ChromeDriver;


public abstract class locatorspractice2 {
     public static void main(String[] args) {
        

    ChromeDriver driver = new ChromeDriver();
    driver.get("https://proleed.academy/exercises/selenium/automation-practice-form-with-radio-button-check-boxes-and-drop-down.php");
    driver.getTitle();
    System.out.println("Title of the page is: " + driver.getTitle());
    // Find checkbox by ID
    driver.findElement(By.id("prefix")).click();
    // Check if checkbox is displayed (visible on page)
    boolean isDisplayed = driver.findElement(By.id("prefix")).isDisplayed();
    System.out.println("Checkbox is displayed: " + isDisplayed);
    // Check if checkbox is checked (selected)
    boolean isChecked = driver.findElement(By.id("prefix")).isSelected();
    System.out.println("Checkbox is checked: " + isChecked);

}}
