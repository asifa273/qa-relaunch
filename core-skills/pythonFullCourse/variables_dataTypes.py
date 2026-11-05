# Store variables
my_string = "variable"
my_int = 1
my_float = 1.1
my_boolean = True
#print Variables
print(my_string)
print(my_int)
print(my_float)
print(my_boolean)

# Manipulate String Concatenation
loud_string = my_string + "!:)!:)!:)!"
print(loud_string)

# Manipulate Int and Float (Arithmetic)
numeric_sum = my_int + my_float
print(numeric_sum)
numeric_difference = my_int - my_float
print(numeric_difference)
numeric_product = my_int * my_float
print(numeric_product)

#  Manipulate Boolean (Logical NOT)
opposite_boolean = not my_boolean
print(opposite_boolean)

# ==========================================
# STANDARD PYTHON PROGRAM: VARIABLES & TYPES
# ==========================================

# 1. VARIABLE INITIALIZATION (Primitive Data Types)
user_name = "Asifa Begum"
login_attempts = 4
account_balance = 50000.50
is_account_open = True
last_login_date = None

# 2. DYNAMIC TYPING DEMONSTRATION
# Python allows a variable to change its data type dynamically
security_token = "ABC-124-XYZ"
print(f"Initial Security Token: {type(security_token)}")
print(f"Initial Security Token: {security_token}")
security_token = 124
print(f"Updated Security Token: {type(security_token)}")
print(f"Updated Security Token: {security_token}")

# 3. TYPE SAFENESS & CONVERSION (Casting)
# Problem: You cannot directly add strings and integers: "Attempts: " + 3
# Solution: Convert the number to a string first using str()
status_message = "User: " + user_name + " has " + str(login_attempts) + " login attempts left"
print(status_message)

# 4. BASIC OPERATIONS WITH VARIABLES
# Mathematical operations with int and float
withdrawal_amount = 1000.99
new_balance = account_balance-withdrawal_amount
print(new_balance)
# Boolean evaluation
check_login = is_account_open and (login_attempts < 5)
print(check_login)

# 5. OUTPUTTING RESULTS
print("\n-------- Account Summary Report --------")
print (status_message)
print(f"Original Balance: ${account_balance} ")
print(f"New Balance: ${new_balance}")
print (f"Is user allowed to log in? {check_login}")
print(f"When was last login? {last_login_date}")
print("-----------End of Account Summary Report -------------")

# 6. EXPLICIT TYPE CHECKING OUTPUT
print("\n--- Inspecting Types ---")
print("user_name type:", type(user_name))
print("login_attempts type:", type(login_attempts))
print("account_balance type:", type(account_balance))
print("is_account_locked type:", type(is_account_open))
print("last_login_date type:", type(last_login_date))

# Basic Calculator
num1 = input("Enter num1: ")
num2 = input("Enter num2: ")
result = int(num1) + int(num2)
print(result)


