# --- Section 1: Basic Function Definition and Calling ---
# This section demonstrates how to define a simple function and call it.

# Defining a function named 'my_function' that takes no arguments
def my_function():
    # This block of code executes when the function is called
    print("Hello from a function")

# Execution starts here
print("top")
# Calling the defined function
my_function()
print("bottom")

# --- Section 2: Functions with Parameters ---
# This section shows how to pass data into a function using parameters/arguments.

# Defining a function 'say_hi' that takes two parameters: 'name' and 'age'
def say_hi(name, age):
    # Using string concatenation to build a greeting message
    # Note: 'age' is an integer, so it must be converted to a string using str()
    print("Hey there!  " + name + " whats ur age? " + str(age))

# Calling the function multiple times with different arguments
say_hi( "alice", 25)
say_hi("Bob", 30)
say_hi("Charlie", 35)

# --- Section 3: Functions with Return Values and f-strings ---
# This section demonstrates how to return a value from a function and store it.

# Variables defined outside the function
uname = "check"
iage = 100

# Defining a function 'say_hii' with parameters
def say_hii(uname,iage):
    # Instead of printing, this function returns a formatted string (f-string)
    # The variables inside {} are evaluated and inserted into the string
    return f"hey there! {uname} whats ur age? {iage}"

# Calling the function with the variables as arguments
# The returned value is then stored in the variable 'greet'
greet = say_hii(uname, iage)
print(greet)

# --- Section 4: Functions with Lists ---
# This section demonstrates passing lists to a function.
#The Loop Way (Best for Lists)
# If you have a list of names and a list of ages, you can pair them up using a loop and call your function repeatedly.

loop_way_names = ["Alice", "Bob", "Charlie"]
loop_way_ages = [22, 33, 44, 55]

def more_func(loop_way_names, loop_way_ages ):
    # This function returns a formatted string that embeds the lists directly
    return f"hey there! {loop_way_names} whats ur ages? {loop_way_ages }"

for loop_way_names, loop_way_ages in zip(loop_way_names, loop_way_ages):
    check_greet = more_func(loop_way_names, loop_way_ages)
    print(check_greet)

# 1. Here is our data
a_names = ["Ana", "Eli", "Sam"]
a_ages = [19, 24, 31]

# 2. Complete this function so it RETURNS an f-string
def format_greeting(name, age):
    # YOUR CODE HERE: Return the f-string "Hi {user_name}, age {user_age}!"
    return f"Hello {name}, What is your age {age}"

# 3. Complete the loop to pair names and ages
for single_name, single_age in zip(a_names, a_ages):
    # YOUR CODE HERE: Call format_greeting, pass it name and age, and save to a variable
    loop_greet = format_greeting(single_name, single_age)
    # YOUR CODE HERE: Print that variable
    print(loop_greet)


# Dictionary way - best for grouped data
users = [{"name": "Alice", "age": 25}, {"name": "Bob", "age": 30}, {"name": "Charlie", "age": 35}]

def dict_func(new_name, new_age):
    return f"hello {new_name}, whats ur new age? {new_age}"

for people in users:
    greeting = dict_func(people["name"], people["age"])
    print(greeting)
    print(people)

#reusable function
def greet_user(name="Admin"):
    hello = f"Hi {name}"
    return hello
print(greet_user())

price = 50
tax = 5
def calculate_total():
    # Created inside the function
    return price + tax

# Running the function
calculate_total()

# Trying to print 'tax' outside the function
print(tax)




