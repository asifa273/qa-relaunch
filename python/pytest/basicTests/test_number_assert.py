def test_number_assertions():
    number = 42
    assert isinstance(number, int), "The variable 'number' should be an integer"
    assert number > 0, "The variable 'number' should be greater than 0"
    assert number < 100, "The variable 'number' should be less than 100"
    number = 3.14
    assert isinstance(number, float), "The variable 'number' should be a float"
    assert number > 0, "The variable 'number' should be greater than 0"
    assert number < 10, "The variable 'number' should be less than 10"
