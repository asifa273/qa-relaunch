# 1. Variables, Data Types & Formatting --Learn how to store different types of information and print them cleanly using f-strings.
# Storing different data types
import re
from math import prod
from typing import Any

user_name = "Alice Smith"
password = "secret"
user_age = 35
hourly_wage = 55.8
is_new_Employee = True

# Printing with an f-string
print (f"User name: {user_name}, password: {password}, user_age: {user_age}, hourly_wage: {hourly_wage}, is_new_Employee: {is_new_Employee}")


#2. Control Flow (If/Else & Loops) -- Learn how to make decisions using if conditions and repeat actions using for loops.
Pass_percentage = 50
if Pass_percentage >= 50:
    print(f"Pass {Pass_percentage}%")
elif Pass_percentage <= 50:
    print(f"Fail {Pass_percentage}%")
else:
    print(f"Fail {Pass_percentage}%")

class Employee:
    def __init__(self, grade=0):
        self.grade = grade

    def set_grade(self, grade):
        self.grade = grade

    def get_status(self):
        return "Passed" if self.grade >= 50 else "Failed"

    def __str__(self):
        return f"Grade: {self.grade} ({self.get_status()})"


new_employee_1 = Employee()
new_employee_1.set_grade(80)
print(f"pass {new_employee_1}")

new_employee_2 = Employee()
new_employee_2.set_grade(40)
print(f"Fail{new_employee_2}")



#3. Data Collections -- (Lists, Tuples, Dictionaries, Sets)Master the four built-in ways to store collections of data in Python.
# Lists - are ordered and CAN be changed anytime
Employee_list = ["Alice", "Bob", "Charlie", "David"]
print(f" This is LISTS: {Employee_list}")

#Tuples - are Ordered as well but CANNOT BE changed at all, fixed
coordinates_tuples = {32.45, -98.07}
print(f" This is TUPLES: {coordinates_tuples}")

# Dictionary: Key-value pairs ex it has Name:values
employee_profile = {"user_name": user_name, "password": password, "user_age": user_age}
print(f" This is DICTIONARY : {employee_profile}")

#SET: are unordered, unique only and remove any duplicates
unique_set = {"David", "Alice", "Bob", "Charlie", "David"}
print(f" This is LISTS : {unique_set}")



#4. Functions & Scope --- Learn how to write reusable blocks of code that take inputs (arguments) and return outputs.
#functions define
def multiplier(x,y):
    answer = x*y
    return answer
#calling function, passing actual values
actual_values = multiplier(10, 3)
print(f"Functions Multiplier result_1 : {actual_values}")

#calling as many times, giving different values
actual_values = multiplier(30, 5)
print(f"Functions Multiplier result_2 : {actual_values}")


#lamba Functions
multiply_by_ten_lambda = lambda num: num * 10
print(multiply_by_ten_lambda (10)) # prints 100

addition = lambda add: add + 100
print(addition(100))

#explain Arguments  & parameters
#item_name and item_price are the parameters
#below is defining the functions
def calculate_tax(item_name, item_price):
    tax_rate = 0.10
    total_tax = item_price * tax_rate
    print(f"Inside function: Received PARAMETER values -> Name: '{item_name}', Price: {item_price}")
    return total_tax
#now these are the variables also called Arguments
product_name = "laptop"
Cost = 2000
#calling the functions
print("__calling functions__")
final_tax = calculate_tax(product_name, Cost)
print(f"{product_name}'s final price with tax : {Cost} + {final_tax} ")


#Default parameter values
def calculate_total(price: object, shipping: object = 10.0, tax_rate: object = 0.05) -> float | Any:
    total_price_amount_with_tax = price * tax_rate
    grand_total = price + shipping + total_price_amount_with_tax
    print(f"Price: ${price} | Shipping: ${shipping} | Grand Total: ${grand_total}")
    return grand_total

#variables/arguments
print("__Test 1: calling functions__")
total_amount = calculate_total(100)
print(f"Test 1 is only price add, everything is default:{total_amount} ")

print("__Test 2: calling functions__")
total_amount = calculate_total(200, 12, 0.10)
print(f"Test 2 is all newly passed, price, shipping and tax :{total_amount} ")

print("__Test 3: calling functions__")
# We want to skip 'shipping' (keep it at $10) but change the 'tax_rate'.
total_amount = calculate_total(200, tax_rate=0.15)
print(f"Test 3 is price add, skip shipping cost and newly changed ta rate:{total_amount} ")


# # Building calculator
# input_number1 = int(input("Enter 1st number: "))
# input_number2 = int(input("Enter 2nd number: "))
# op = input("Enter operation: ")
#
# if op == "add":
#     print(f"Result: {input_number1 + input_number2}")
# elif op == "subtract":
#     print(f"Result: {input_number1 - input_number2}")
# elif op == "multiply":
#     print(f"Result: {input_number1 * input_number2}")
# elif op == "divide":
#     if input_number2 == 0:
#         print("Error: Cannot divide by zero!")
#     else:
#         print(f"Result: {input_number1 / input_number2}")
# else:
#     print(f"Operation '{op}' not supported")


#Guessing Game
secret_word = "secret"
guess = ""
guess_count = 0
guess_limit =3
out_of_guess = False

# # guess_1 = input("Please enter your secret word: ")
# # if secret_word == guess:
# #     print(f"You guessed the right word {guess} ")
# while guess != secret_word and not out_of_guess:
#     if guess_count < guess_limit:
#         guess = input("Enter guess: ")
#         guess_count += 1
#     else:
#         out_of_guess = True
# print(f"You guessed {guess_count} times, and you win {secret_word} ")
# if out_of_guess :
#     print(f"You guessed {guess_count} times and exceeded the limit of {guess_limit} ")

#Example of classes, objects, attributes, methods and self


class Employees_Profile:
    def __init__(self, employee_name, employee_id,dept, owner ):
        self.employee_name = employee_name
        self.employee_id = employee_id
        self.dept_name = dept
        self.owner = owner

class Owner:
    def __init__(self, owner_name, owner_address, owner_phone):
        self.owner_name = owner_name
        self._owner_address = owner_address
        self._owner_phone = owner_phone

    def get_owner_address(self):
        return self._owner_address

    def get_owner_phone(self):
        return self._owner_phone

    def set_owner_phone(self, new_phone):
        self._owner_phone = new_phone

owner_1 = Owner("Esh_Khan", "99 springfield dr", "99-00-88")
employee_1 = Employees_Profile("owais", 123, "Medicine", owner_1)

print(employee_1.owner.owner_name)
print(employee_1.owner.get_owner_phone())
print(employee_1.owner.get_owner_address())

employee_1.owner.set_owner_phone("987-654-321")
print(employee_1.owner.get_owner_phone())


owner_2 = Owner("Asifa_Khan", "98 springfield dr", "88-00-88")
employee_2 = Employees_Profile("Omera", 321, "Medicine", owner_2)
print(employee_2.owner.owner_name)
employee_2.owner.owner_name = "Asifa_Begum"
print(employee_2.owner.owner_name)

import re


def set_password(new_password):
    if len(new_password) != 8:
        new_password("")
        print("Password is not 8 characters long")
    else:
        print("Password is 8 characters long")

import re
class Person:
    def __init__(self, glob_name, glob_email, glob_password):
        self.name = glob_name
        self.email = glob_email
        self.password = None
        self.set_password(glob_password)

    def get_name(self): return self.name
    def get_email(self): return self.email
    def get_password(self): return self.password

    def set_name(self, new_name): self.name = new_name
    def set_email(self, new_email): self.email = new_email


    def set_password(self, new_password):
    # Check 1: Length check
        if len(new_password) != 8:
            print(f"❌ Rejected: '{new_password}' is not exactly 8 characters long.")
            return False
        self.password = new_password
        return True

person = Person("don", "da@email.com", "char12*_")
person.set_email("dae@mail.com")
person.set_password("char12*!")

print(person.get_name())
print(person.get_email())
print(person.get_password())

if "@" not in person.get_email() or ".com" not in person.get_email():
    person.set_email("")
    print("Email address is not valid")
else:
    print("Email address is valid")

letter_count = len(re.findall(r'[a-zA-Z]', person.get_password()))
print(letter_count)
digits_count = len(re.findall(r'[0-9]', person.get_password()))
print(digits_count)
special_char_count = len(re.findall(r'[^a-zA-Z0-9]', person.get_password()))
print(special_char_count)

if letter_count == 4 and digits_count == 2 and special_char_count == 2:
    print("Password has 4 chars, 2 digits and 2 special characters")
else:
    print("Missing required requirements")

print(person.get_name())
print(person.get_email())
print(person.get_password())



class Company:
    user_count = 0
    def __init__(self, people_name, user_email,):
        self.user_name = people_name
        self.user_email = user_email
        Company.user_count += 1

    def display(self):
        print(f" People:{self.user_name} and Email:{self.user_email}")

    @classmethod
    def display_total_people(cls):
        print(f"{cls.user_count} people have been displayed")

    @staticmethod
    def display_total_companies(name):
        print(f"{name} has {Company.user_count} people")


people1 = Company("Daniel", "daniel@email.com")
people2 = Company("Smooth", "smooth@email.com")

Company.display_total_people()
Company.display_total_companies("TATA")

print(Company.user_count)
print(people1.user_count)
print(people2.user_count)

#difference between static and instance
class BonkAccount:
    """Represents a bank account with deposit and interest calculations."""
    #class variable shared by whole Bonk, not just one person
    MIN_BALANCE = 100

    def __init__(self, acc_name, acc_balance=0):
        #Instance variables - specific to one specific account
        self.name = acc_name
        self.balance = acc_balance

    #Instance method:this persons balance needs self
    def acc_deposit(self, acc_amount):
        if acc_amount >0:
            self.balance += acc_amount
            print(f"deposit new money: ${acc_amount},Current Balance: ${self.balance}")

    #Static Method: no self or no object, fully isolated
    @staticmethod
    def calculate_interest(amount, rate_percentage):
        #calculate numbers, doesn't care who owns account
        return amount * (rate_percentage / 100)
        # CHANGED: Turned into an instance method by adding 'self'

    # CHANGED: Turned into an instance method by adding 'self'
    # def calculate_interest(self, rate_percentage):
    #     # Now uses 'self.balance' automatically instead of a hardcoded number
    #     return self.balance * (rate_percentage / 100)

# --- Execution ---

#create object(instance)
# Create object (instance) with $50
my_acc = BonkAccount("Daniel", 50)

#calling instance method
# Deposit $5 (New balance is now $55)
my_acc.acc_deposit(5)

#Static-call directly on class without object
interest_earned = BonkAccount.calculate_interest(1000, 6.5)
print(f"Interest on Daniel at 6.5% interest is ${interest_earned}")
