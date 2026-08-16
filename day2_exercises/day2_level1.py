# ==========================================
# DAY 2 - LEVEL 1: BASIC PYTHON
# ==========================================


# ------------------------------------------
# 1. Variables & Data Types
# ------------------------------------------

# Store different types of information
full_name = "Bethelhem Alemayehu"
age = 20
height = 1.65
is_student = True
favorite_food = "Pasta"

# Print the information using an f-string
print("========== MY PROFILE ==========")
print(
    f"My name is {full_name}, I am {age} years old, "
    f"I am {height} meters tall, and it is {is_student} "
    f"that I am a student. My favorite food is {favorite_food}."
)


# ------------------------------------------
# 2. Arithmetic Operations
# ------------------------------------------

print("\n========== ARITHMETIC ==========")

# Get two numbers from the user
number1 = float(input("Enter the first number: "))
number2 = float(input("Enter the second number: "))

# Perform arithmetic operations
print(f"\nFirst number: {number1}")
print(f"Second number: {number2}")

print(f"Sum: {number1 + number2}")
print(f"Difference: {number1 - number2}")
print(f"Product: {number1 * number2}")

# Avoid division by zero
if number2 != 0:
    print(f"Division: {number1 / number2}")
    print(f"Floor division: {number1 // number2}")
    print(f"Remainder: {number1 % number2}")
else:
    print("Division, floor division, and remainder cannot use zero as divisor.")


# ------------------------------------------
# 3. Type Conversion
# ------------------------------------------

print("\n========== AGE CALCULATOR ==========")

# input() gives us a string, so convert it to int
birth_year = int(input("Enter your birth year: "))

current_year = 2026
calculated_age = current_year - birth_year

print(f"If you were born in {birth_year}, you are approximately {calculated_age} years old in {current_year}.")


# ------------------------------------------
# 4. Simple Decision
# ------------------------------------------

print("\n========== PASS OR FAIL ==========")

score = float(input("Enter your score (0-100): "))

if score >= 50:
    print(f"Your score is {score}. Pass!")
else:
    print(f"Your score is {score}. Fail!")