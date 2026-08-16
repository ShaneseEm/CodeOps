# ==========================================
# DAY 3 - LEVEL 1
# Collections: Lists, Tuples, Dictionaries, Sets
# ==========================================


# ------------------------------------------
# 1. Lists & Tuples
# ------------------------------------------

# Create a list of favorite foods
favorite_foods = [
    "Pasta",
    "Pizza",
    "Burger",
    "Shiro",
    "Injera",
    "Fruits"
]

print("========== FAVORITE FOODS ==========")
print("First food:", favorite_foods[0])
print("Last food:", favorite_foods[-1])

# Add a new food using append()
favorite_foods.append("Cake")

print("\nAfter adding a new food:")
print(favorite_foods)

# Remove the second food using pop()
# Index 1 represents the second item
removed_food = favorite_foods.pop(1)

print(f"\nRemoved food: {removed_food}")
print("Updated food list:", favorite_foods)


# Create a tuple of coordinates for Ethiopia
# These are approximate coordinates
ethiopia_coordinates = (9.145, 40.4897)

# Unpack the tuple into two variables
latitude, longitude = ethiopia_coordinates

print("\n========== ETHIOPIA COORDINATES ==========")
print(f"Latitude: {latitude}")
print(f"Longitude: {longitude}")


# ------------------------------------------
# 2. Dictionaries
# ------------------------------------------

student = {
    "name": "Bethelhem",
    "age": 20,
    "grade": 12,
    "city": "Addis Ababa",
    "department": "Software Engineering"
}

print("\n========== STUDENT ==========")

print("Name:", student["name"])
print("Department:", student["department"])
print("Grade:", student["grade"])

# Add a new key and value
student["phone"] = "0987654321"

# Update the grade
student["grade"] = 13

print("\nUpdated student:")
print(student)


# ------------------------------------------
# 3. Sets
# ------------------------------------------

# List containing duplicate names
names = [
    "Abebe",
    "Sara",
    "Abebe",
    "Dawit",
    "Sara",
    "Hana"
]

print("\n========== SETS ==========")
print("Original list:", names)

# Convert list to a set to remove duplicates
unique_names = set(names)

print("Names without duplicates:", unique_names)

# Add a new name
unique_names.add("Mimi")

print("After adding Mimi:", unique_names)