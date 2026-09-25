from hashlib import new


#Encapsulation - Encapsulation means grouping data (attributes) and methods together,
                # while restricting direct access to protect the internal data from accidental changes.
        # In Python, prefixing an attribute with two underscores (__) makes it private.

# This is differentiated between private method(__) and protected method(_)
#Getter Method - Exposes or safely reads private/protected data to the outside world.
#Protected Method - Hides internal class logic and helper functions from the outside world.
class BankAccount:
    def __init__(self, balance):
        self.__balance = balance  # 🔒 Strict Private Data: Locked away

    # 🛡️ Protected Method: Internal calculation tool (hidden from main script)
    def _calculate_interest(self):
        return self.__balance * 0.05

    # 🔑 Public Getter Method: Safely exposes data to the outside world
    def get_display_balance(self):
        # Combines the private data and the protected method to return a safe value
        total = self.__balance + self._calculate_interest()
        return f"Your total balance with interest is: ${total}"

# --- Execution ---
account = BankAccount(1000)

# ✅ This is correct. We use the public getter to read the data safely.
print(account.get_display_balance())

# ❌ The code below would violate rules or crash:
# account._calculate_interest()  <- Bad practice (touching a protected method)
# account.__balance             <- Will crash (trying to touch private data)


#Bank Account Balance Deposit

class BankAccount:
    def __init__(self, owner, balance):
        self.owner = owner
        self.__balance = balance # # Private attribute: cannot be accessed directly

    # Getter method to safely read the private data
    def get_balance(self):
        return self.__balance

    # Setter method to safely update the private data with validation
    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
# Usage
account = BankAccount("Asifa", 100)
account.deposit(10000)

print(account.get_balance())


#Program 1: The Smart Home Simulation (State Control)Encapsulation isn't just about hiding variables;
# it is about wrapping up internal actions
# so things happen automatically without the user having to manage them from the outside.

class SmartDoor:
    def __init__(self):
        self.__is_open = True  # Private: cannot be forced open directly
        self.__is_locked = False  # Private: cannot bypass lock mechanics

    def close_door(self):
        """Safely closes and auto-locks the door"""
        self.__is_open = False
        self.__is_locked = False
        print("Door is closed, System auto-locked")

    # def open_door(self):
    #     """Safely opens the door"""
    #     self.__is_open = True
    #     self.__is_locked = True
    #     print("Door is opened")

    def unlock_and_open(self, passcode):
        """Validates the passcode before modifying internal states"""
        if passcode == "1234":
            self.__is_locked = False
            self.__is_open = True
            print("Door is unlocked and Open, Access granted")
            return True
        print("Door is locked, Access denied - Alarm triggered")
        return False

door = SmartDoor()
# door.open_door()
door.unlock_and_open("123")
door.close_door()

#Program 2: Student Grading System (Input Validation)Encapsulation allows you to place a "guard" at the door
# to prevent bad data
# (like negative scores or grades above 100)
# from corrupting your software components.

class Student:
    def __init__(self, name):
        self.__name = name
        self.__grade = 0

     # Add a getter for the private name
    def get_name(self):
        return self.__name

    # Getter: Safely exposes read-only data
    def get_grade(self):
        return self.__grade

    # Setter: Validates the data before saving it
    def set_grade(self, new_grade):
        if 0 <= new_grade <= 100:
            self.__grade = new_grade
        else:
            print("Grade out of range")

    def get_status(self):
        return "Passed" if self.__grade >= 60 else "Failed"

student = Student("Asifa")
# student.set_grade(95)
# student.set_grade(80)
# student.set_grade(70)
# student.set_grade(60)
student.set_grade(50)

print(f"{student.get_name()}'s Status: {student.get_status()}")

# Program 3 : smart thermostat

class SmartThermostat:
    def __init__(self, current_temperature):
        self.__temperature = current_temperature

    def get_temperature(self):
        return self.__temperature

    def set_temperature(self, new_temperature: int) -> None:
        if 90<= new_temperature <= 100:
            self.__temperature = new_temperature
            print( "f new temperature now is {new_temperature}")
        else:
            print("Temperature out of range")

temperature = SmartThermostat(90)
temperature.set_temperature(100)
print(temperature.get_temperature())


