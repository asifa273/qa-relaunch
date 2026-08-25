import pytest

def test_addition():
    assert 1 + 1 == 2
    assert 2 + 2 == 4
    assert 3 + 3 == 6
    assert 4 + 4 == 8
    assert 5 + 5 == 10
    assert 6 + 6 == 12

def test_subtraction():
    assert 5 - 2 == 3
    assert 10 - 4 == 6
    assert 15 - 5 == 10
    assert 20 - 10 == 10
    assert 25 - 15 == 10
    assert 30 - 20 == 10    

def test_multiplication():
    assert 2 * 3 == 6
    assert 4 * 5 == 20
    assert 6 * 7 == 42
    assert 8 * 9 == 72
    assert 10 * 11 == 110
    assert 12 * 13 == 156

def test_division():
    assert 10 / 2 == 5
    assert 20 / 4 == 5
    assert 30 / 6 == 5
    assert 40 / 8 == 5
    assert 50 / 10 == 5
    assert 60 / 12 == 5


