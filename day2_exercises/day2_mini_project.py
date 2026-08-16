# ==========================================
# DAY 2 - MINI PROJECT
# PERSONAL FINANCE TRACKER
# ==========================================


# Store the user's balance
balance = 0.0


# ------------------------------------------
# Add Income
# ------------------------------------------

def add_income(current_balance):
    try:
        income = float(input("Enter income amount: "))

        if income <= 0:
            print("Income must be greater than 0.")
            return current_balance

        current_balance += income

        print(f"Income of {income:.2f} ETB added successfully.")

        return current_balance

    except ValueError:
        print("Invalid input. Please enter a number.")
        return current_balance


# ------------------------------------------
# Add Expense
# ------------------------------------------

def add_expense(current_balance):
    try:
        expense = float(input("Enter expense amount: "))

        if expense <= 0:
            print("Expense must be greater than 0.")
            return current_balance

        if expense > current_balance:
            print("Insufficient balance.")
            return current_balance

        current_balance -= expense

        print(f"Expense of {expense:.2f} ETB added successfully.")

        return current_balance

    except ValueError:
        print("Invalid input. Please enter a number.")

        return current_balance


# ------------------------------------------
# Show Balance
# ------------------------------------------

def show_balance(current_balance):
    print("\n========== BALANCE ==========")
    print(f"Current balance: {current_balance:.2f} ETB")


# ------------------------------------------
# Main Program
# ------------------------------------------

print("====================================")
print("       PERSONAL FINANCE TRACKER")
print("====================================")


# Keep showing the menu until the user exits
while True:

    print("\n========== MENU ==========")
    print("1. Add income")
    print("2. Add expense")
    print("3. Show balance")
    print("4. Exit")

    choice = input("Choose an option: ")

    if choice == "1":
        balance = add_income(balance)

    elif choice == "2":
        balance = add_expense(balance)

    elif choice == "3":
        show_balance(balance)

    elif choice == "4":
        print("\n========== SUMMARY ==========")
        print(f"Final balance: {balance:.2f} ETB")
        print("Thank you for using the Personal Finance Tracker!")
        break

    else:
        print("Invalid choice. Please select 1, 2, 3, or 4.")