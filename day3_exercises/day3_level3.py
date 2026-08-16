# ==========================================
# DAY 3 - LEVEL 3
# Files & Error Handling
# ==========================================


# ------------------------------------------
# 8. File Reading & Writing
# ------------------------------------------

students = [
    ("Abebe", 85),
    ("Sara", 92),
    ("Dawit", 78),
    ("Hana", 88),
    ("Mimi", 95)
]

file_name = "students.txt"


# Write student names and scores to a file
with open(file_name, "w") as file:

    for name, score in students:
        file.write(f"{name},{score}\n")


print("Student information saved successfully.")


# Read the file and calculate the average
try:

    scores = []

    with open(file_name, "r") as file:

        for line in file:
            # Remove whitespace and split at comma
            name, score = line.strip().split(",")

            # Convert score from string to integer
            scores.append(int(score))

    if scores:
        average_score = sum(scores) / len(scores)

        print(f"Average score: {average_score:.2f}")

except FileNotFoundError:

    print("The students.txt file does not exist.")

except ValueError:

    print("There is invalid score data in the file.")


# ------------------------------------------
# 9. Error Handling
# ------------------------------------------

print("\n========== CALCULATOR ==========")

try:

    number1 = float(input("Enter the first number: "))
    number2 = float(input("Enter the second number: "))

    result = number1 / number2

    print(f"Result: {result}")

except ValueError:

    print("Error: Please enter numeric values.")

except ZeroDivisionError:

    print("Error: You cannot divide by zero.")

finally:

    print("Calculation attempt completed.")