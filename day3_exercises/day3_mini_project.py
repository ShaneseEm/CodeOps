# ==========================================
# DAY 3 - MINI PROJECT
# INVENTORY MANAGER
# ==========================================


# Dictionary storing product -> quantity
inventory = {}


# ------------------------------------------
# 1. Add New Product
# ------------------------------------------

def add_product():
    product = input("Enter product name: ").strip()

    try:
        quantity = int(input("Enter quantity: "))

        if quantity < 0:
            print("Quantity cannot be negative.")
            return

        if product in inventory:
            print("Product already exists.")
            return

        inventory[product] = quantity

        print(f"{product} added successfully.")

    except ValueError:
        print("Please enter a valid number.")


# ------------------------------------------
# 2. Update Quantity
# ------------------------------------------

def update_quantity():
    product = input("Enter product name: ").strip()

    if product not in inventory:
        print("Product not found.")
        return

    try:
        quantity = int(input("Enter new quantity: "))

        if quantity < 0:
            print("Quantity cannot be negative.")
            return

        inventory[product] = quantity

        print(f"{product} quantity updated successfully.")

    except ValueError:
        print("Please enter a valid number.")


# ------------------------------------------
# 3. View All Products
# ------------------------------------------

def view_products():

    print("\n========== INVENTORY ==========")

    if not inventory:
        print("Inventory is empty.")
        return

    for product, quantity in inventory.items():
        print(f"{product:<20} | Quantity: {quantity}")


# ------------------------------------------
# 4. Save Inventory to File
# ------------------------------------------

def save_to_file():

    try:

        with open("inventory.txt", "w") as file:

            for product, quantity in inventory.items():
                file.write(f"{product},{quantity}\n")

        print("Inventory saved successfully.")

    except OSError:

        print("Could not save the inventory file.")


# ------------------------------------------
# 5. Load Inventory from File
# ------------------------------------------

def load_from_file():

    try:

        with open("inventory.txt", "r") as file:

            # Clear current inventory before loading
            inventory.clear()

            for line in file:

                product, quantity = line.strip().split(",")

                inventory[product] = int(quantity)

        print("Inventory loaded successfully.")

    except FileNotFoundError:

        print("inventory.txt does not exist.")

    except ValueError:

        print("Invalid data found in inventory file.")

    except OSError:

        print("Could not read the inventory file.")


# ------------------------------------------
# 6. Main Menu
# ------------------------------------------

def main():

    while True:

        print("\n================================")
        print("       INVENTORY MANAGER")
        print("================================")

        print("1. Add new product")
        print("2. Update quantity")
        print("3. View all products")
        print("4. Save to file")
        print("5. Load from file")
        print("6. Exit")

        choice = input("\nChoose an option: ")

        if choice == "1":
            add_product()

        elif choice == "2":
            update_quantity()

        elif choice == "3":
            view_products()

        elif choice == "4":
            save_to_file()

        elif choice == "5":
            load_from_file()

        elif choice == "6":
            print("Goodbye!")
            break

        else:
            print("Invalid choice. Please choose 1-6.")


# Start the program
main()