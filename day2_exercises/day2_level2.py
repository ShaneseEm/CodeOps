# ==========================================
# DAY 2 - LEVEL 2: INTERMEDIATE PYTHON
# ==========================================


# ------------------------------------------
# 5. Grade Classifier
# ------------------------------------------

print("========== GRADE CLASSIFIER ==========")

score = float(input("Enter your score (0-100): "))

if 90 <= score <= 100:
    print("Excellent!")
elif 80 <= score < 90:
    print("Very Good!")
elif 70 <= score < 80:
    print("Good!")
elif 50 <= score < 70:
    print("Pass!")
elif 0 <= score < 50:
    print("Fail!")
else:
    print("Invalid score.")


# ------------------------------------------
# 6. Number Pattern
# ------------------------------------------

print("\n========== NUMBER PATTERN ==========")

print("Odd numbers from 1 to 20:")

for number in range(1, 21):
    if number % 2 != 0:
        print(number)


print("\nNumbers divisible by 5:")

# Nested if: if statement inside a for loop
for number in range(1, 21):
    if number % 5 == 0:
        print(number)


# ------------------------------------------
# 7. While Loop Practice
# ------------------------------------------

print("\n========== NUMBER SUM ==========")

total = 0

while True:
    number = float(input("Enter a positive number (0 to stop): "))

    if number == 0:
        break

    if number > 0:
        total += number
    else:
        print("Please enter a positive number.")

print(f"Total sum: {total}")


# ------------------------------------------
# 8. Function Practice
# ------------------------------------------

print("\n========== FUNCTIONS ==========")


# Function that prints a welcome message
def greet(name):
    print(f"Welcome, {name}!")


# Function that returns the square of a number
def square(number):
    return number * number


# Function that checks if a number is even
def is_even(number):
    return number % 2 == 0


# Test the functions
greet("Bethelhem")

print(f"Square of 5: {square(5)}")

print(f"Is 10 even? {is_even(10)}")
print(f"Is 7 even? {is_even(7)}")