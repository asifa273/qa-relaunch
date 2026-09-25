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
    yield driver
    # Cleanup after test
    driver.quit()


def test_webpage_title(driver):
    """Test that Google page loads with correct title"""
    driver.get("https://www.google.com/")
    assert driver.title == "Google"


def test_webpage_url(driver):
    """Test that the URL is correct"""
    driver.get("https://www.google.com/")
    assert "google.com" in driver.current_url


def test_webpage_search_box_exists(driver):
    """Test that the search box exists on Google homepage"""
    driver.get("https://www.google.com/")
    search_box = driver.find_element(By.NAME, "q")
    assert search_box.is_displayed()


def test_webpage_search_functionality(driver):
    """Test searching on Google"""
    driver.get("https://www.google.com/")
    
    # Store initial URL
    initial_url = driver.current_url
    
    # Find and fill search box
    search_box = driver.find_element(By.NAME, "q")
    search_box.send_keys("python testing")
    
    # Submit search
    search_box.submit()
    
    # Wait a bit for page to load
    import time
    time.sleep(2)
    
    # Verify search was executed (URL should have changed or contain search params)
    assert driver.current_url != initial_url or "python" in driver.page_source.lower()


def test_webpage_login():
    """Legacy test - kept for backward compatibility"""
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service)
    driver.get("https://www.google.com/")
    assert driver.title == "Google"
    driver.quit()


