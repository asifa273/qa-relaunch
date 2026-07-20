
#File Read and Write Operations
#1. File I/O (Reading and Writing Files)The safest and most modern way to open a file in Python is using the with keyword.
# It automatically closes the file for you when you are done, which prevents data loss.
# "w" (Write Mode): Creates a new file or overwrites an existing one.
# "r" (Read Mode): Opens an existing file to read its contents.

# 1. Write mode: Wipes old content and creates the file
#open() with modes r/w/a
with open("notes.txt", "w") as file:
    file.write("Learning Python File I/O")


# 2. Append mode: Safely adds lines to the bottom without deleting anything
with open("notes.txt", "a") as file:
    file.write("\nThis is line 2 of amend")
    file.write("\nThis is line 3 of Write information")

# 3. Read mode: Let's extract the data
with open("notes.txt", "r") as file:
    print(file.readable())   # Output: True
    print(file.readline())   # Reads Line 1
    print(file.readline())   # Reads Line 2

    file.seek(0)             # Resets the cursor back to the start
    print(file.readlines())  # Output: ['Learning Python File I/O\n', ...]

    file.seek(0)             # Reset cursor again for the loop
    for line in file.readlines():
        print(line.strip())  # .strip() removes ugly extra blank lines in the terminal

# 4. Create a completely separate file
with open("notes2.txt", "w") as file:
    file.write("This is write end notes.txt file")

#2. Error Handling (try / except)If your program tries to open a file that does not exist,
# Python will crash with an error.
# You use a try/except block to catch the error and keep the program running safely.
try:
    with open("non_existent_file.txt", "r") as file:
        print(file.read())
except FileNotFoundError:
    print("Error: The file you are looking for does not exist.")
except Exception as e:
    print(f"An unexpected error occurred: {e}")
finally:
    print("Execution of error handling block finished.")

try:
    result = 10/0
    print(result)
    print("result of variable that divides a number by 0")
except ZeroDivisionError:
    print("Error: The file you are looking for does not exist.")
except Exception as e:
    print(f"An unexpected error occurred: {e}")
finally:
    print("Execution of error handling block finished.")
