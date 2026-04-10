import source.my_functions as my_functions
import pytest
import sys
from pathlib import Path

# Add parent directories to path so we can import source module FIRST
sys.path.insert(0, str(Path(__file__).parent.parent.parent))


def test_fail():
    assert 1 + 1 == 2
    assert 2 + 2 == 4
    assert 3 + 3 == 6
    assert 4 + 4 == 8
    assert 5 + 5 == 10
    assert 6 + 6 == 12


def inc(x):
    return x + 1


def test_answer():
    assert inc(3) == 4


def test_divide_by_zero():
    with pytest.raises(ZeroDivisionError) as e:
        result = 10 / 0
    assert "division by zero" in str(e.value)


def test_add_strings():
    result = my_functions.add("I like ", "pytest")
    assert result == "I like  pytest"
