import sys
from pathlib import Path

# Add parent directories to path so we can import source module
sys.path.insert(0, str(Path(__file__).parent.parent.parent))

import pytest
import source.my_functions as my_functions

def test_add():
    result = my_functions.add(1, 2)
    assert result == 3

def test_divide():
    result = my_functions.divide(10, 2)
    assert result == 5

def test_divide_by_zero():
    with pytest.raises(ZeroDivisionError):
        my_functions.divide(10, 0)

def test_factorial():
    result = my_functions.factorial(5)
    assert result == 120

def test_add_strings():
    result = my_functions.add("I like", "Pytest")
    assert result == "I like Pytest"

