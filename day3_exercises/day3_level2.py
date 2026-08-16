# ==========================================
# DAY 3 - LEVEL 2
# List Operations, Dictionaries, Comprehensions
# ==========================================


# ------------------------------------------
# 4. List Operations
# ------------------------------------------

numbers = [10, 25, 40, 15, 60, 30]

print("========== NUMBERS GREATER THAN 30 ==========")

# Loop through the list
for number in numbers:
    if number > 30:
        print(number)

# Sort the list
numbers.sort()

print("\nSorted list:")
print(numbers)

# Calculate the sum
total = sum(numbers)

# Calculate the average
average = total / len(numbers)

print(f"\nSum: {total}")
print(f"Average: {average:.2f}")


# ------------------------------------------
# 5. Dictionary Operations
# ------------------------------------------

products = {
    "Laptop": 45000,
    "Phone": 15000,
    "Headphones": 2000,
    "Keyboard": 1200,
    "Mouse": 800
}

print("\n========== PRODUCT LIST ==========")

# Loop through the dictionary
for product, price in products.items():
    print(f"Product: {product:<15} | Price: {price:,} ETB")


# Ask the user for a product
search_product = input("\nEnter a product name: ")

# Use .get() with a default message
price = products.get(
    search_product,
    "Sorry, that product was not found."
)

print(f"Result: {price}")


# ------------------------------------------
# 6. List Comprehension
# ------------------------------------------

# Numbers from 1 to 20
numbers_1_to_20 = [number for number in range(1, 21)]

print("\n========== LIST COMPREHENSION ==========")
print("Numbers 1-20:")
print(numbers_1_to_20)


# Even numbers from 1 to 30
even_numbers = [
    number
    for number in range(1, 31)
    if number % 2 == 0
]

print("\nEven numbers from 1-30:")
print(even_numbers)


# Odd numbers from 1 to 10
odd_numbers = [
    number
    for number in range(1, 11)
    if number % 2 != 0
]

print("\nOdd numbers from 1-10:")
print(odd_numbers)