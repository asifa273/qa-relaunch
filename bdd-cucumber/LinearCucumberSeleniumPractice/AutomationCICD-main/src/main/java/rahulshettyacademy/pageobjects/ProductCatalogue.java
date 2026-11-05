package rahulshettyacademy.pageobjects;

import java.util.List;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import java.time.Duration;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import rahulshettyacademy.AbstractComponents.AbstractComponent;

public class ProductCatalogue extends AbstractComponent {

	WebDriver driver;

	public ProductCatalogue(WebDriver driver) {
		super(driver);
		this.driver = driver;
		PageFactory.initElements(driver, this);
	}

	@FindBy(css = ".mb-3")
	List<WebElement> products;
	
	@FindBy(css = ".ng-animating")
	WebElement spinner;
	
	By productsBy = By.cssSelector(".mb-3");
	By addToCart = By.cssSelector(".card-body button:last-of-type");
	By toastMessage = By.cssSelector("#toast-container");

	public List<WebElement> getProductList() {
		waitForElementToAppear(productsBy);
		return products;
	}

	public WebElement getProductByName(String productName) {

		WebElement product = getProductList().stream()
				.filter(pro -> pro.findElement(By.cssSelector("b")).getText().equalsIgnoreCase(productName)).findFirst()
				.orElse(null);
		return product;

	}

	public void addProductToCart(String productName) throws InterruptedException {
		// Clicks made while the login toast is still animating are ignored by the page.
		waitForToastsToClose();
		WebElement prod = getProductByName(productName);
		prod.findElement(addToCart).click();
		// Wait for this action's toast, not the "Login Successfully" one that may still be showing.
		new WebDriverWait(driver, Duration.ofSeconds(10))
				.until(ExpectedConditions.textToBePresentInElementLocated(toastMessage, "Product Added To Cart"));
		waitForToastsToClose();
	}
}
