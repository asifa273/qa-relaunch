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


@pytest.fixture
def login_credentials():
    """Fixture providing test credentials"""
    return {
        "username": "asifa273@gmail.com",
        "password": "test12345"
    }


def test_login_page_loads(driver):
    """Test that login page loads successfully"""
    driver.get("https://www.gmail.com/login")  # Replace with actual login URL
    assert driver.title  # Check page has a title
    # Add more specific assertions as needed


def test_login_form_elements_exist(driver):
    """Test that all login form elements are present"""
    driver.get("https://www.gmail.com/login")  # Replace with actual login URL

    # Check if username field exists
    username_field = driver.find_element(By.ID, "username")
    assert username_field.is_displayed()

    # Check if password field exists
    password_field = driver.find_element(By.ID, "password")
    assert password_field.is_displayed()

    # Check if login button exists
    login_button = driver.find_element(By.ID, "login_button")
    assert login_button.is_displayed()


def test_valid_login(driver, login_credentials):
    """Test successful login with valid credentials"""
    driver.get("https://www.gmail.com/login")  # Replace with actual login URL

    # Enter username
    username_field = driver.find_element(By.ID, "username")
    username_field.send_keys(login_credentials["username"])

    # Enter password
    password_field = driver.find_element(By.ID, "password")
    password_field.send_keys(login_credentials["password"])

    # Click login button
    login_button = driver.find_element(By.ID, "login_button")
    login_button.click()

    # Wait for dashboard to load
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "dashboard"))
    )

    # Verify successful login
    assert "dashboard" in driver.current_url.lower()


def test_invalid_login(driver):
    """Test login with invalid credentials"""
    driver.get("https://www.gmail.com/login")  # Replace with actual login URL

    # Enter invalid credentials
    username_field = driver.find_element(By.ID, "username")
    username_field.send_keys("invalid@email.com")

    password_field = driver.find_element(By.ID, "password")
    password_field.send_keys("wrongpassword123")

    login_button = driver.find_element(By.ID, "login_button")
    login_button.click()

    # Wait for error message
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, "error_message"))
    )

    # Verify error message appears
    error_message = driver.find_element(By.CLASS_NAME, "error_message")
    assert error_message.is_displayed()
    assert "invalid" in error_message.text.lower()


@pytest.mark.parametrize("username,password,should_pass", [
    ("user1@example.com", "password123", True),
    ("user2@example.com", "password456", True),
    ("invalid@example.com", "wrongpass", False),
])
def test_login_parametrized(driver, username, password, should_pass):
    """Test login with multiple username/password combinations"""
    driver.get("https://www.gmail.com/login")  # Replace with actual login URL

    username_field = driver.find_element(By.ID, "username")
    username_field.send_keys(username)

    password_field = driver.find_element(By.ID, "password")
    password_field.send_keys(password)

    login_button = driver.find_element(By.ID, "login_button")
    login_button.click()

    if should_pass:
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "dashboard"))
        )
        assert "dashboard" in driver.current_url.lower()
    else:
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "error_message"))
        )
        assert driver.find_element(
            By.CLASS_NAME, "error_message").is_displayed()
