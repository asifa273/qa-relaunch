"""
My custom functions module for testing
"""


def add(a, b):
    """
    Concatenate two strings or add two numbers
    
    Args:
        a: First string or number
        b: Second string or number
        
    Returns:
        Concatenated string or sum of numbers
    """
    if isinstance(a, str) and isinstance(b, str):
        return a + " " + b
    else:
        return a + b


def subtract(a, b):
    """Subtract b from a"""
    return a - b


def multiply(a, b):
    """Multiply a and b"""
    return a * b


def divide(a, b):
    """Divide a by b"""
    if b == 0:
        raise ZeroDivisionError("Cannot divide by zero")
    return a / b


def is_even(n):
    """Check if number is even"""
    return n % 2 == 0


def is_odd(n):
    """Check if number is odd"""
    return n % 2 != 0


def factorial(n):
    """Calculate factorial of n"""
    if n < 0:
        raise ValueError("Factorial not defined for negative numbers")
    if n == 0 or n == 1:
        return 1
    return n * factorial(n - 1)


def fibonacci(n):
    """Generate fibonacci sequence up to n terms"""
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    
    fib_seq = [0, 1]
    for i in range(2, n):
        fib_seq.append(fib_seq[i-1] + fib_seq[i-2])
    return fib_seq
