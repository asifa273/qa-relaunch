package pageobjects;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

import utils.CommonUtils;
import utils.WaitUtils;

public class GoogleSearchPage {
    
    private final CommonUtils commonUtils;
    private final WaitUtils waitUtils;

    // Locators
    private final By searchBox = By.name("q");
    private final By searchButton = By.name("btnK");

    public GoogleSearchPage(WebDriver driver) {
        this.commonUtils = new CommonUtils(driver);
        this.waitUtils = new WaitUtils(driver);
    }

    public void enterSearchText(String searchText) {
        waitUtils.waitForElementToBeVisible(searchBox);
        commonUtils.sendText(searchBox, searchText);
    }

    public void clickSearchButton() {
        commonUtils.clickElement(searchButton);
    }

    public void performSearch(String searchText) {
        enterSearchText(searchText);
        clickSearchButton();
    }

    public String getPageTitle() {
        return commonUtils.getPageTitle();
    }
}
