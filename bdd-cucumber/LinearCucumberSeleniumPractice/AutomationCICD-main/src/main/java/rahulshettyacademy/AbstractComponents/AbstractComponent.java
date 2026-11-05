package rahulshettyacademy.AbstractComponents;

import java.time.Duration;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import rahulshettyacademy.pageobjects.CartPage;
import rahulshettyacademy.pageobjects.OrderPage;

public class AbstractComponent {
	WebDriver driver;

	@FindBy(css = "[routerlink*='cart']")
	WebElement cartHeader;

	@FindBy(css = "[routerlink*='myorders']")
	WebElement orderHeader;

	public AbstractComponent(WebDriver driver) {
		this.driver = driver;
		PageFactory.initElements(driver, this);
	}

	public void waitForElementToAppear(By findBy) {
		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
		wait.until(ExpectedConditions.visibilityOfElementLocated(findBy));
	}

	public void waitForWebElementToAppear(WebElement webElement) {
		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
		wait.until(ExpectedConditions.visibilityOf(webElement));
	}

	public void waitForElementToDisappear(WebElement element) throws InterruptedException {
		Thread.sleep(2000);
		// WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(3));
		// wait.until(ExpectedConditions.invisibilityOf(element));
	}

	public void waitForToastsToClose() {
		new WebDriverWait(driver, Duration.ofSeconds(10))
				.until(ExpectedConditions.invisibilityOfElementLocated(By.cssSelector("#toast-container .ngx-toastr")));
	}

	public CartPage goToCartPage() {
		// Toasts sit over the header links; wait until they are gone before clicking.
		waitForToastsToClose();
		new WebDriverWait(driver, Duration.ofSeconds(10)).until(ExpectedConditions.elementToBeClickable(cartHeader)).click();
		new WebDriverWait(driver, Duration.ofSeconds(10)).until(ExpectedConditions.urlContains("/cart"));
		CartPage cartPage = new CartPage(driver);
		return cartPage;
	}

	public OrderPage goToOrdersPage() {
		waitForToastsToClose();
		new WebDriverWait(driver, Duration.ofSeconds(10)).until(ExpectedConditions.elementToBeClickable(orderHeader)).click();
		new WebDriverWait(driver, Duration.ofSeconds(10)).until(ExpectedConditions.urlContains("/myorders"));
		OrderPage orderPage = new OrderPage(driver);
		return orderPage;
	}
}
