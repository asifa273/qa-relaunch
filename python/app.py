"""
A simple Hello World application in Python.
"""
# This code demonstrates basic Python syntax, including variables, data types, string manipulation, numeric operations, and control flow.
import datetime
import math
from time import time
print("Hello Python World")
print("*" * 10)
x = 1
y = 3
students_count = 1000
rating = 4.99
is_published = False
course_name = "Python for Beginners"
print(students_count)
print(len(course_name))
print(course_name)
print(course_name[0])  # First character
print(course_name[-1])  # Last character
print(course_name[0:6])  # Substring from index 0 to 5
course_change = course_name.replace("Beginners", "\\* Absolute Beginners\\*")
print(course_change)

#   String interpolation and string methods example
first_name = "John"
last_name = "Smith"
full_name = f"{first_name} {last_name}"
print(full_name)  # Using f-string for string interpolation
print(course_name.upper())  # Convert to uppercase
print(course_name.lower())  # Convert to lowercase
print(course_name.title())  # Convert to title case
print(course_name.strip())  # Remove leading and trailing whitespace
# Find the index of the first occurrence of "Beg"
print(course_name.find("Beg"))
print("Beg" in course_name)  # Check if "Beg" is in course_name
print("swift" not in course_name)  # Check if "swift" is not in course_name

# Numeric types and operations example
x = 10
x = 1.1
x = 1 + 2j  # Complex number with real part 1 and imaginary part 2
print(x)        # Output: (1+2j)
print(type(x))  # Output: <class 'complex'>
print(x.real)  # Output: 1.0
print(x.imag)  # Output: 2.0

# Arithmetic operations example
print(10 + 3)  # Addition
print(10 - 3)  # Subtraction
print(10 * 3)  # Multiplication
print(10 / 3)  # Division (returns a float)
print(10 // 3)  # Floor division (returns an integer)
print(10 % 3)  # Modulus (returns the remainder)
print(10 ** 3)  # Exponentiation (10 raised to the power of

x = x + 5  # Standard assignment
x += 5  # Augmented assignment (equivalent to x = x + 5)

# Built-in functions example
print(round(2.9))  # Rounds to the nearest integer
print(abs(-2.9))  # Returns the absolute value
print(pow(2, 10))  # Returns 2 raised to the power of
print(max(1, 5555, 3))  # Returns the maximum value
print(min(1, 5, -1))  # Returns the minimum value

print(math.ceil(2.3))  # Rounds up to the nearest integer
print(math.floor(2.7))  # Rounds down to the nearest integer
print(math.sqrt(16))  # Returns the square root of 16

# Get input from the user and convert it to an integer

# x = input("Enter something: ")
# y = int(x) + 1  # Convert the input string to an integer and add 1
# print(type(x))  # Input is always treated as a string
# print(x)  # Print the input value
# print(y)  # Print the converted integer value
# print(type(y))
# print(f"x: {x}, y: {y}")   # Print the type of the converted integer value

# Boolean values and logical operators example
print(bool("") or bool(0) or bool([]) or bool(())
      or bool({}) or bool(None))  # All these are False
print(bool(0))   # Zero is False
print(bool([]))  # Empty list is False
print(bool(()))  # Empty tuple is False
print(bool({}))  # Empty dictionary is False
print(bool(None))  # None is False
print(bool("Hello"))  # Non-empty string is True
print(bool(1))  # Non-zero number is True
print(bool([1, 2, 3]))  # Non-empty list is True
print(bool((1, 2)))  # Non-empty tuple is True
print(bool({"key": "value"}))  # Non-empty dictionary is True

# Comparison operators example
tmeperature = 90
if tmeperature > 80:
    print("It's a hot day")
elif tmeperature > 60:
    print("It's a nice day")
elif tmeperature > 50:
    print("It's a bit cold")
else:
    print("It's cold")
print("Done")

# Ternary operator example
ternanry_operator = "Hot" if tmeperature > 80 else "Not Hot"
print(ternanry_operator)

# Ternary operator example
age = 10
message = "Eligible to vote" if age >= 18 else "Not eligible to vote"
print(message)

# Logical operators example
high_income = False
good_credit = True
student = True

if high_income or good_credit and not student:
    print("Eligible for loan")
elif high_income or good_credit:
    print("Maybe eligible for loan")
else:
    print("Not eligible for loan")

# Logical operators and operator precedence example
age = 25
if age >= 18 and age < 65:
    print("Eligible for work")

if 10 == "10":
    print("a")
elif "bag" > "apple" and "bag" < "cat":
    print("b")
else:
    print("c")

# The for loop with an else block example
sucçess = False
for number in range(1, 10):
    print("Attempt ", number, number * ".")
    if sucçess:
        print("Successful")
        break
    # The else block after a for loop is executed only if the loop completes without encountering a break statement.
else:
    print("Attempted 10 times and failed")

# Nested loops example - A nested loop is a loop inside another loop. The inner loop completes all its iterations for each iteration of the outer loop.
# This code demonstrates nested loops by iterating through a range of x and y values and printing their combinations.
#  Breaking Down Your Code:
# Outer Loop: for x in range(5):
# Runs 5 times: x = 0, 1, 2, 3, 4
# Inner Loop: for y in range(3):
# Runs 3 times for EACH value of x: y = 0, 1, 2
# Total iterations: 5 × 3 = 15 print statements

# Output:
# How It Works Step-by-Step:
# x = 0: Inner loop runs completely (y = 0, 1, 2)
# x = 1: Inner loop runs completely again (y = 0, 1, 2)
# x = 2: Inner loop runs completely again (y = 0, 1, 2)
# x = 3: Inner loop runs completely again (y = 0, 1, 2)
# x = 4: Inner loop runs completely again (y = 0, 1, 2)
# Visual Representation:
# Key Concept:
# The inner loop completes fully before the outer loop moves to the next iteration
# This is useful for creating 2D patterns, multiplication tables, or matrix-like structures

for x in range(5):
    for y in range(3):
        print(f"({x}, {y})")

# Iterables for numbers
print(range(5))  # Returns a range object
for x in range(5):
    print(x)  # Prints each number in the range

# Iterables for strings
course_name = "Python for Beginners"
for char in course_name:
    print(char)  # Prints each character in the string

# Lists
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)  # Prints each fruit in the list
# Tuples
point = (1, 2)
for coordinate in point:
    print(coordinate)  # Prints each coordinate in the tuple

# Lists
shopping_list = ["milk", "bread", "eggs"]
for items in shopping_list:
    print(items)  # Prints each item in the shopping list

# while loop example
count = 0
while count < 5:
    print(count)
    count += 1  # Increment the count to avoid an infinite loop
# This code demonstrates a simple while loop that continues to execute as long as the condition (count < 5) is true. Inside the loop, it prints the current value of count and then increments it by 1. Once count reaches 5, the condition becomes false, and the loop terminates.
# Note: If the increment statement (count += 1) were missing, the loop would run indefinitely because count would always be less than 5.


# # This code demonstrates a simple command-line interface that continuously prompts the user for input until they type "quit". The user's input is echoed back to them, and the loop terminates when "quit" is entered (case-insensitive).
# command = ""  # Initialize command as an empty string and ensures the loop condition is True on the first iteration
# while command.lower() != "quit":  # Loop continues until the user types "quit" (case-insensitive)
#     # Prompt the user for input and store it in the variable 'command'
#     command = input(">")
#     print("ECHO", command)  # Echo the user's input back to them
# # When the user types "quit", the loop condition becomes False, and the program exits the loop, effectively ending the program.

# while True:  # Infinite loop
#     # Prompt the user for input and store it in the variable 'command'
#     command = input(">")
#     if command.lower() == "quit":
#         break  # Exit the loop if the user types "quit"
#     print("ECHO", command)  # Echo the user's input back to them

# while True:  # Infinite loop
#     # Prompt the user to enter a username and store it in the variable 'user'
#     user = input("Username: ")
#     # Prompt the user to enter a password and store it in the variable 'password'
#     password = input("Password: ")
#     if user == "admin" and password == "secret":  # Check if the username is "admin" and the password is "secret
#         # If the credentials are correct, print "Access granted"
#         print("Access granted")
#         break  # Exit the loop if the credentials are correct
#     else:  # If the credentials are incorrect, print "Access denied, try again" and continue the loop to prompt the user again
#         # The loop will continue to prompt the user until they enter the correct credentials (username: "admin", password: "secret")
#         # This message is printed when the user enters incorrect credentials, prompting them to try again.
#         print("Access denied, try again")

# Print Even numbers from 1 to 10

even_count = 0
for even_numbers in range(1, 10):
    if even_numbers % 2 == 0:
        # This will print all even numbers from 1 to 10
        print(even_numbers)
        even_count += 1
print(f"we have {even_count} even numbers")

odd_count = 0
for odd_numbers in range(1, 10):
    if odd_numbers % 2 != 0:
        # This will print all odd numbers from 1 to 10
        print(odd_numbers)
        odd_count += 1
print(f"we have {odd_count} odd numbers")


# Write own functions
# Define a function named 'greet_user' that takes two parameters: 'first_name' and 'last_name'
def greet_user(first_name, last_name):
    # Create a full name by concatenating the first name and last name with a space in between
    full_name = f"{first_name} {last_name}"
    # Print a greeting message that includes the full name
    print(f"Hello, {full_name}!")


# Call the function 'greet_user' with the arguments "Alice" and "Smith", which will print "Hello, Alice Smith!"
greet_user("Alice", "Smith")
# Call the function 'greet_user' with the arguments "Bob" and "Johnson", which will print "Hello, Bob Johnson!"
greet_user("Bob", "Johnson")


# real world example of a function that calculates the area of a rectangle
# Define a function named 'calculate_rectangle_area' that takes two parameters: 'length' and 'width'
def calculate_rectangle_area(length, width):
    # Calculate the area of the rectangle by multiplying length and width
    area = length * width
    return area  # Return the calculated area


# Example usage of the function
length = 5  # Define the length of the rectangle
width = 3  # Define the width of the rectangle
# Call the function with the specified length and width
area = calculate_rectangle_area(length, width)
# Print the calculated area of the rectangle, which will output "The area of the rectangle is: 15"
print(f"The area of the rectangle is: {area}")

# functions that perform a specific task, such as calculating the area of a rectangle, can be reused throughout your code. This promotes code reusability and makes your program more organized and easier to maintain. By defining a function once, you can call it multiple times with different arguments to perform the same calculation for different rectangles without having to rewrite the logic each time.

# functions that returns a value can be used in expressions, assigned to variables, or passed as arguments to other functions, making them versatile and powerful tools for structuring your code effectively.
# example of a function that returns a value and is used in an expression


def greet(name):  # Define (def) a function named 'greet' that takes a parameter 'name'
    # Return a greeting message that includes the provided name
    # The return statement allows the function to send back a value (the greeting message) to the caller, which can then be used in expressions or assigned to variables.
    return f"Hello, {name}!"


# Call the function and store the returned message in a variable
# This will call the greet function with "Alice" and return "Hello, Alice!"
message = greet("Alice")
print(message)  # Print the greeting message, which will output "Hello, Alice!"


def homePage(name):
    return f"Welcome to the home page, {name}"


home_message = homePage("Alice! ")
print(home_message)  # This will print "Welcome to the home page, Alice "

# incrementing a number using a function


def increment(number, by=1):
    return number + by


result = increment(5)  # This will return 6
print(result)  # This will print 6

# real world example of incrementing a number using a function


def temperature_increase(increase, by=1):
    return increase + by


increase = 40
increase = temperature_increase(increase)  # This will return 1
print(increase)  # This will print 1
increase = temperature_increase(increase, by=2)  # This will return 3
print(increase)  # This will print 3

# dafault arguments example


def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"


print(greet("Alice"))  # This will print "Hello, Alice!"
print(greet("Bob", greeting="Hi"))  # This will print "Hi, Bob!"

# multiple return values example


def get_user_info():
    name = "Alice"
    age = 30
    experience = 5
    # This function returns a tuple containing the name, age, and experience
    return name, age, experience


# Unpacking the returned tuple into separate variables
user_name, user_age, user_experience = get_user_info()
# This will print "Name: Alice, Age: 30, Experience: 5"
print(f"Name: {user_name}, Age: {user_age}, Experience: {user_experience}")


def multiply(a, b):
    return a * b


result = multiply(4, 5)  # This will return 20
print(result)  # This will print 20

# Example of a function that takes a variable number of arguments using *args. The *args syntax allows the function to accept any number of positional arguments, which are then accessible as a tuple within the function.

# The *numbers parameter allows the function to accept a variable number of arguments, which are collected into a tuple named 'numbers'.


def multiply_args(*numbers):
    print(numbers)  # This will print the tuple of numbers passed to the function


# The function can be called with any number of arguments, and it will print them as a tuple. For example:
multiply_args(1, 2, 3, 4, 5, 6)  # This will print (1, 2, 3, 4, 5, 6)

# Classes and Instances examples


class Employee:  # CLASS VARIABLES (shared by all instances)
    num_of_employees = 0      # Tracks total number of employees created
    raise_amount = 1.04        # Multiplier for salary increases (4% raise)

    # CONSTRUCTOR - runs when a new instance is created
    def __init__(self, first, last, pay):  # The __init__ method is a special method in Python classes that is called when a new instance of the class is created. It initializes the instance with the provided parameters (first, last, pay) and sets up the instance variables for that specific employee.
        # INSTANCE VARIABLES (unique to each object)
        self.first = first                                    # Store first name
        self.last = last                                      # Store last name
        self.pay = pay                                        # Store salary
        # self.email = first + "." + last + "@gmail.com"       # Auto-generate email

        # Increment class variable whenever a new employee is created
        Employee.num_of_employees += 1

    # INSTANCE METHOD - returns full name
    # This decorator allows us to access the fullname method as an attribute (without parentheses) instead of a method (with parentheses).
    @property
    def fullname(self):  # Instance method to return the full name of the employee
        # Returns "FirstName LastName"
        return "{} {}".format(self.first, self.last)

    @fullname.setter
    def fullname(self, name):
        first, last = name.split(" ")
        self.first = first
        self.last = last

    # This decorator allows us to access the email method as an attribute (without parentheses) instead of a method (with parentheses).

    @property
    def email(self):  # Instance method to return the email address of the employee
        return "{}.{}@gmail.com".format(self.first, self.last)

    # INSTANCE METHOD - applies salary raise

    def apply_raise(self):  # Instance method to apply the raise to the employee's pay
        # Multiply current pay by raise_amount and convert to int
        self.pay = int(self.pay * self.raise_amount)

    def __repr__(self):
        return f"Employee('{self.first}', '{self.last}', {self.pay})"

    def __str__(self):
        return f"Employee: {self.fullname}, Email: {self.email}, Pay: {self.pay}"

    def __add__(self, other):
        return self.pay + other.pay

    # Class method is a method that is bound to the class and not the instance of the class. It can modify a class state that applies across all instances of the class, rather than just a single instance.
    @classmethod
    def set_raise_amt(cls, amount):  # Class method to set the raise amount for all employees
        cls.raise_amount = amount

    @classmethod
    def from_string(cls, emp_str):
        first, last, pay = emp_str.split("-")
        return cls(first, last, pay)

    # Static method does not access class or instance variables, it is a utility function related to the class.
    @staticmethod
    def is_workday(day):
        if day.weekday() == 5 or day.weekday() == 6:
            return False
        return True


Employee.set_raise_amt(1.07)


class Developer(Employee):  # Define a subclass of Employee called Developer
    raise_amount = 1.10  # Override the raise_amount for developers to 10%

    def __init__(self, first, last, pay, prog_lang):
        # Call the constructor of the Employee class to initialize first, last, pay
        super().__init__(first, last, pay)
        # Add an additional instance variable for programming language
        self.prog_lang = prog_lang


class Manager(Employee):  # Define a subclass of Employee called Manager
    # Initialize the Manager with an optional list of employees they manage
    def __init__(self, first, last, pay, employees=None):
        # Call the constructor of the Employee class to initialize first, last, pay
        super().__init__(first, last, pay)
        if employees is None:  # If no list of employees is provided, initialize it as an empty list
            # Set the instance variable 'employees' to the provided list of employees (or an empty list if none was provided)
            employees = []
        # Define a method to add an employee to the manager's list of employees
        self.employees = employees

    def add_employee(self, emp):
        if emp not in self.employees:
            # Add the employee to the manager's list of employees if they are not already in the list
            self.employees.append(emp)
    # Define a method to remove an employee from the manager's list of employees

    def remove_employee(self, emp):
        if emp in self.employees:
            self.employees.remove(emp)
    # Define a method to print the full names of all employees managed by this manager

    def print_employees(self):
        for emp in self.employees:
            print("-->", emp.fullname)


employee_3 = Employee("Bob", "Alice", 100000)   # Create 3rd employee
employee_3.fullname = "Owais Begum"


developer_1 = Developer("Asifa", "Begum", 140000,
                        "Python")   # Create 1st developer
developer_2 = Developer("Esh", "Khan", 130000,
                        "JavaScript")  # Create 2nd developer

# Create a manager instance
Manager_1 = Manager("Sue", "Smith", 90000, [developer_1])


print("Developer 1 email is", developer_1.pay)
print("Developer 1 programming language is", developer_1.prog_lang)


print("Manager 1 email is", Manager_1.email)
Manager_1.print_employees()

Manager_1.add_employee(
    developer_2)  # Add developer_2 to Manager_1's list of employees\
Manager_1.print_employees()

# Remove developer_1 from Manager_1's list of employees
Manager_1.remove_employee(developer_1)
Manager_1.print_employees()


my_date = datetime.date(2024, 6, 11)
# Output: False (since June 1, 2024 is a Saturday)
print("Employee Weekday is", Employee.is_workday(my_date))

employee_1 = Employee("Bob", "Alice", 100000)   # Create 1st employee
employee_2 = Employee("Jared", "Lushness", 120000)  # Create 2nd employee


print(employee_1 + employee_2,
      "%^&*(*&) Employee 1 and Empoyee 2 Pay combined amount")


print("____Employee from Repr example ____********____", repr(employee_1))
print("____Employee from Repr example ____********____", employee_1.__repr__())

print("____********____ Employee from string example", str(employee_1))
print("____********____ Employee from string example", employee_1.__str__())

emp_str_1 = "John-ALice-200000"
emp_str_2 = "Steve-Smith-220000"
emp_str_3 = "Jane-Doe-230000"

new_emp_1 = Employee.from_string(emp_str_1)
new_emp_2 = Employee.from_string(emp_str_2)
new_emp_3 = Employee.from_string(emp_str_3)

# This will show that Developer inherits from Employee and has access to its methods and variables
# print(help(Developer))

# Output: Asifa.Begum@gmail.com
# This will print the pay of developer_1, which is 140000
print("Developer 1 email is", developer_1.pay)
# This will apply the raise to developer_1's pay, which will be 140000 * 1.07 = 149800
developer_1.apply_raise()
# This will print the new pay of developer_1 after applying the raise, which is 149800
print("Developer 1 pay after raise is", developer_1.pay)

print("Developer 2 email is", developer_2.email)  # Output: Esh.Khan@gmail.com

print("new employee_1 first is", new_emp_1.first)  # Output: John
print("new employee_1 last is", new_emp_1.last)   # Output: ALice
print("new employee_1 pay is", new_emp_1.pay)  # Output: 200000
print("new employee_1 email is", new_emp_1.email)

print("$$$$$$$$$$$$$$$$", employee_3.first)  # Output: Bob
print("$$$$$$$$$$$$$$$$", employee_3.last)   # Output: Alice
print("$$$$$$$$$$$$$$$$", employee_3.fullname)    # Output: Bob Alice
# print(employee_1.email)
# print(employee_2.email)

# print(Employee.fullname(employee_1))
# print((employee_1.pay))
# employee_1.apply_raise()
# print((employee_1.pay))

# print(Employee.fullname(employee_2))
# print((employee_2.pay))
# employee_2.apply_raise()
# print((employee_2.pay))

# print(Employee.raise_amount)
# print(employee_1.raise_amount)
# print(employee_2.raise_amount)

employee_1.raise_amount = 1.06
# This is crucial — it creates an instance variable that shadows the class variable:

# What	                    Value	Why
# employee_1.raise_amount	1.06	Instance variable (overrides class variable)
# employee_2.raise_amount	1.04	Still uses class variable
# Employee.raise_amount	    1.04	Class variable unchanged

print(employee_1.__dict__)
# Output: {'first': 'Bob', 'last': 'Alice', 'pay': 100000,
#          'email': 'Bob.Alice@gmail.com', 'raise_amount': 1.06}
# Shows all instance variables (including the new raise_amount!)

# Output: 1.06 (instance variable)
print("Employee 1 raise amount: ", employee_1.raise_amount)
# Output: 1.04 (class variable)
print("Employee 2 raise amount: ", employee_2.raise_amount)

print("Number of Employees are:", Employee.num_of_employees)  # Output: 2

print("Employee(class) new increased set raise amount: ",
      Employee.raise_amount)  # output: 1.07


# Employee Class (Blueprint)
# ├── Class Variables
# │   ├── num_of_employees = 0
# │   └── raise_amount = 1.04
# │
# └── Methods
#     ├── __init__()
#     ├── fullname()
#     └── apply_raise()

# employee_1 Instance              employee_2 Instance
# ├── first = "Bob"               ├── first = "Jared"
# ├── last = "Alice"              ├── last = "Lushness"
# ├── pay = 100000                ├── pay = 120000
# ├── email = "Bob.Alice@..."     ├── email = "Jared.Lushness@..."
# └── raise_amount = 1.06 ★       └── (uses class variable 1.04)

# Key Concepts:
# __init__ (constructor) — Initializes each new instance
# Instance variables (self.first, self.pay) — Unique to each object
# Class variables (num_of_employees, raise_amount) — Shared by all instances
# Instance shadowing — Setting employee_1.raise_amount = 1.06 creates a new instance variable that hides the class variable for that object only
# __dict__ — Shows all instance variables as a dictionary
# This code demonstrates the use of classes and instances in Python by defining an Employee class with class variables, instance variables, and methods. It also shows how to create instances of the Employee class, call methods, and manipulate class and instance variables.
