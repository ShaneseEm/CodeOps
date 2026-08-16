# ==========================================
# DAY 5 - MINI PROJECT
# ADDIS BANK SYSTEM - VERSION 2
# ==========================================

from abc import ABC, abstractmethod


# ==========================================
# ABSTRACT ACCOUNT
# ==========================================

class Account(ABC):

    def __init__(self, account_number, owner, balance=0):

        self.account_number = account_number
        self.owner = owner

        # Private balance
        self.__balance = 0

        # Validate initial balance
        self.balance = balance

    # --------------------------------------
    # Balance Getter
    # --------------------------------------

    @property
    def balance(self):
        return self.__balance

    # --------------------------------------
    # Balance Setter
    # --------------------------------------

    @balance.setter
    def balance(self, amount):

        if amount < 0:
            raise ValueError(
                "Balance cannot be negative."
            )

        self.__balance = amount

    # --------------------------------------
    # Deposit
    # --------------------------------------

    def deposit(self, amount):

        if amount <= 0:
            raise ValueError(
                "Deposit must be greater than 0."
            )

        self.__balance += amount

    # --------------------------------------
    # Withdraw
    # --------------------------------------

    def withdraw(self, amount):

        if amount <= 0:
            raise ValueError(
                "Withdrawal must be greater than 0."
            )

        if amount > self.__balance:
            raise ValueError(
                "Insufficient funds."
            )

        self.__balance -= amount

    # --------------------------------------
    # Abstract methods
    # --------------------------------------

    @abstractmethod
    def calculate_interest(self):
        pass

    @abstractmethod
    def statement(self):
        pass


# ==========================================
# SAVINGS ACCOUNT
# ==========================================

class SavingsAccount(Account):

    def __init__(
        self,
        account_number,
        owner,
        balance=0,
        interest_rate=0.05
    ):
        super().__init__(
            account_number,
            owner,
            balance
        )

        self.interest_rate = interest_rate

    # Calculate interest
    def calculate_interest(self):

        return self.balance * self.interest_rate

    # Add interest to account
    def add_interest(self):

        interest = self.calculate_interest()

        self.balance += interest

        return interest

    # Override statement
    def statement(self):

        print("\n========== SAVINGS ACCOUNT ==========")

        print(
            f"Account Number: {self.account_number}"
        )

        print(f"Owner: {self.owner}")

        print(
            f"Balance: {self.balance:.2f} ETB"
        )

        print(
            f"Interest Rate: "
            f"{self.interest_rate * 100:.1f}%"
        )


# ==========================================
# CURRENT ACCOUNT
# ==========================================

class CurrentAccount(Account):

    def __init__(
        self,
        account_number,
        owner,
        balance=0,
        overdraft_limit=1000
    ):
        super().__init__(
            account_number,
            owner,
            balance
        )

        self.overdraft_limit = overdraft_limit

    # Override withdraw
    def withdraw(self, amount):

        if amount <= 0:
            raise ValueError(
                "Withdrawal must be greater than 0."
            )

        if amount > self.balance + self.overdraft_limit:
            raise ValueError(
                "Overdraft limit exceeded."
            )

        self.balance -= amount

    # Current accounts have no interest
    def calculate_interest(self):

        return 0

    # Override statement
    def statement(self):

        print("\n========== CURRENT ACCOUNT ==========")

        print(
            f"Account Number: {self.account_number}"
        )

        print(f"Owner: {self.owner}")

        print(
            f"Balance: {self.balance:.2f} ETB"
        )

        print(
            f"Overdraft Limit: "
            f"{self.overdraft_limit:.2f} ETB"
        )


# ==========================================
# HELPER FUNCTIONS
# ==========================================


def get_account(accounts):

    account_number = input(
        "Enter account number: "
    ).strip()

    account = accounts.get(account_number)

    if account is None:
        print("Account not found.")

    return account


# ------------------------------------------
# 1. Create Savings Account
# ------------------------------------------

def create_savings_account(accounts):

    account_number = input(
        "Enter account number: "
    ).strip()

    if account_number in accounts:
        print("Account already exists.")
        return

    owner = input(
        "Enter owner's name: "
    ).strip()

    try:

        balance = float(
            input("Enter initial balance: ")
        )

        interest_rate = float(
            input(
                "Enter interest rate "
                "(example: 0.05 for 5%): "
            )
        )

        account = SavingsAccount(
            account_number,
            owner,
            balance,
            interest_rate
        )

        accounts[account_number] = account

        print(
            "Savings account created successfully."
        )

    except ValueError as error:

        print(f"Error: {error}")


# ------------------------------------------
# 2. Create Current Account
# ------------------------------------------

def create_current_account(accounts):

    account_number = input(
        "Enter account number: "
    ).strip()

    if account_number in accounts:
        print("Account already exists.")
        return

    owner = input(
        "Enter owner's name: "
    ).strip()

    try:

        balance = float(
            input("Enter initial balance: ")
        )

        overdraft_limit = float(
            input("Enter overdraft limit: ")
        )

        account = CurrentAccount(
            account_number,
            owner,
            balance,
            overdraft_limit
        )

        accounts[account_number] = account

        print(
            "Current account created successfully."
        )

    except ValueError as error:

        print(f"Error: {error}")


# ------------------------------------------
# 3. Deposit
# ------------------------------------------

def deposit_money(accounts):

    account = get_account(accounts)

    if account is None:
        return

    try:

        amount = float(
            input("Enter deposit amount: ")
        )

        account.deposit(amount)

        print(
            f"{amount:.2f} ETB deposited."
        )

        print(
            f"New balance: "
            f"{account.balance:.2f} ETB"
        )

    except ValueError as error:

        print(f"Error: {error}")


# ------------------------------------------
# 4. Withdraw
# ------------------------------------------

def withdraw_money(accounts):

    account = get_account(accounts)

    if account is None:
        return

    try:

        amount = float(
            input("Enter withdrawal amount: ")
        )

        account.withdraw(amount)

        print(
            f"{amount:.2f} ETB withdrawn."
        )

        print(
            f"New balance: "
            f"{account.balance:.2f} ETB"
        )

    except ValueError as error:

        print(f"Error: {error}")


# ------------------------------------------
# 5. Show Statement
# ------------------------------------------

def show_statement(accounts):

    account = get_account(accounts)

    if account is None:
        return

    # POLYMORPHISM:
    # Python calls the correct statement()
    # depending on the account type.
    account.statement()


# ------------------------------------------
# 6. Apply Interest
# ------------------------------------------

def apply_interest(accounts):

    print("\n========== APPLYING INTEREST ==========")

    found_savings = False

    for account in accounts.values():

        if isinstance(account, SavingsAccount):

            found_savings = True

            interest = account.add_interest()

            print(
                f"{account.owner}: "
                f"{interest:.2f} ETB interest added."
            )

    if not found_savings:

        print(
            "No savings accounts found."
        )


# ------------------------------------------
# 7. Show All Accounts
# ------------------------------------------

def show_all_accounts(accounts):

    print("\n========== ALL ACCOUNTS ==========")

    if not accounts:

        print("No accounts available.")

        return

    # POLYMORPHISM
    for account in accounts.values():

        account.statement()


# ==========================================
# MAIN MENU
# ==========================================

def main():

    # Dictionary:
    # account number -> account object
    accounts = {}

    print("==========================================")
    print("        WELCOME TO ADDIS BANK V2")
    print("==========================================")

    while True:

        print("\n========== MENU ==========")

        print("1. Create Savings Account")
        print("2. Create Current Account")
        print("3. Deposit")
        print("4. Withdraw")
        print("5. Show Statement")
        print("6. Apply Interest to Savings")
        print("7. Show All Accounts")
        print("8. Exit")

        choice = input(
            "\nChoose an option: "
        ).strip()

        if choice == "1":

            create_savings_account(accounts)

        elif choice == "2":

            create_current_account(accounts)

        elif choice == "3":

            deposit_money(accounts)

        elif choice == "4":

            withdraw_money(accounts)

        elif choice == "5":

            show_statement(accounts)

        elif choice == "6":

            apply_interest(accounts)

        elif choice == "7":

            show_all_accounts(accounts)

        elif choice == "8":

            print(
                "\nThank you for using Addis Bank V2."
            )

            break

        else:

            print(
                "Invalid option. "
                "Please choose 1-8."
            )


# Start the application
if __name__ == "__main__":
    main()