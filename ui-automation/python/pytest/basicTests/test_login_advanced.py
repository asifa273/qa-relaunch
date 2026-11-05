import pytest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager


@pytest.fixture
def driver():
    """Fixture to initialize and cleanup the Chrome driver"""
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service)
    driver.implicitly_wait(10)  # Wait up to 10 seconds for elements
    yield driver
    driver.quit()


# Public practice login page; its demo credentials are published on the page.
LOGIN_URL = "https://the-internet.herokuapp.com/login"
LOGIN_BUTTON = (By.CSS_SELECTOR, "button[type='submit']")
FLASH_SUCCESS = (By.CSS_SELECTOR, "#flash.success")
FLASH_ERROR = (By.CSS_SELECTOR, "#flash.error")


@pytest.fixture
def login_credentials():
    """Fixture providing test credentials"""
    return {
        "username": "tomsmith",
        "password": "SuperSecretPassword!"
    }


def login(driver, username, password):
    driver.get(LOGIN_URL)
    driver.find_element(By.ID, "username").send_keys(username)
    driver.find_element(By.ID, "password").send_keys(password)
    driver.find_element(*LOGIN_BUTTON).click()


def test_login_page_loads(driver):
    """Test that login page loads successfully"""
    driver.get(LOGIN_URL)
    assert "The Internet" in driver.title


def test_login_form_elements_exist(driver):
    """Test that all login form elements are present"""
    driver.get(LOGIN_URL)
    assert driver.find_element(By.ID, "username").is_displayed()
    assert driver.find_element(By.ID, "password").is_displayed()
    assert driver.find_element(*LOGIN_BUTTON).is_displayed()


def test_valid_login(driver, login_credentials):
    """Test successful login with valid credentials"""
    login(driver, login_credentials["username"], login_credentials["password"])

    flash = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located(FLASH_SUCCESS)
    )
    assert "/secure" in driver.current_url
    assert "You logged into a secure area!" in flash.text


def test_invalid_login(driver):
    """Test login with invalid credentials"""
    login(driver, "invaliduser", "wrongpassword123")

    error_message = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located(FLASH_ERROR)
    )
    assert "invalid" in error_message.text.lower()


@pytest.mark.parametrize("username,password,should_pass", [
    ("tomsmith", "SuperSecretPassword!", True),
    ("tomsmith", "wrongpass", False),
    ("invaliduser", "SuperSecretPassword!", False),
])
def test_login_parametrized(driver, username, password, should_pass):
    """Test login with multiple username/password combinations"""
    login(driver, username, password)

    if should_pass:
        WebDriverWait(driver, 10).until(EC.visibility_of_element_located(FLASH_SUCCESS))
        assert "/secure" in driver.current_url
    else:
        WebDriverWait(driver, 10).until(EC.visibility_of_element_located(FLASH_ERROR))
        assert "/login" in driver.current_url
