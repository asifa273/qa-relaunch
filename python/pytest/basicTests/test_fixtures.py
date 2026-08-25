# conftest.py
import pytest
import requests


@pytest.fixture
def chatbot_connection():
    """
    This fixture runs BEFORE every test that needs it.
    Like a hotel room being cleaned before every guest.
    """

    # SETUP — runs before your test
    print("\n Setting up chatbot connection...")

    connection = {
        "base_url": "https://generativelanguage.googleapis.com/v1beta/openai",
        "token": "AIzaSyA3i5cmDuJ-Tx-iFjj2sSvTI4XIL2DUE3s",
        "session": requests.Session()
    }

    # This line PASSES the connection to your test
    yield connection

    # TEARDOWN — runs after your test automatically
    print("\n Closing chatbot connection...")
    connection["session"].close()


# ===== TEST FUNCTIONS =====

def test_chatbot_connection_exists(chatbot_connection):
    """Test that chatbot connection fixture works"""
    assert chatbot_connection is not None
    assert "base_url" in chatbot_connection
    assert "token" in chatbot_connection
    assert "session" in chatbot_connection


def test_chatbot_base_url(chatbot_connection):
    """Test that base URL is set correctly"""
    assert chatbot_connection["base_url"] == "https://generativelanguage.googleapis.com/v1beta/openai"


def test_chatbot_token_exists(chatbot_connection):
    """Test that token exists and is a string"""
    assert isinstance(chatbot_connection["token"], str)
    assert len(chatbot_connection["token"]) > 0


def test_chatbot_session_is_valid(chatbot_connection):
    """Test that session object is valid"""
    assert isinstance(chatbot_connection["session"], requests.Session)
    # Session should be open and usable
    assert not chatbot_connection["session"].close.__self__.__dict__.get(
        '_closed', False)
