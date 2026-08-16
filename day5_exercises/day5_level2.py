# ==========================================
# DAY 5 - LEVEL 2
# POLYMORPHISM & ABSTRACTION
# ==========================================

from abc import ABC, abstractmethod


# ------------------------------------------
# 6. Abstract Account Class
# ------------------------------------------

class Account(ABC):

    def __init__(self, owner, balance=0):
        self.owner = owner

        if balance < 0:
            raise ValueError(
                "Initial balance cannot be negative."
            )

        self.balance = balance

    def deposit(self, amount):

        if amount <= 0:
            raise ValueError(
                "Deposit must be positive."
            )

        self.balance += amount

    def withdraw(self, amount):

        if amount <= 0:
            raise ValueError(
                "Withdrawal must be positive."
            )

        if amount > self.balance:
            raise ValueError(
                "Insufficient funds."
            )

        self.balance -= amount

    def statement(self):
        print(
            f"Owner: {self.owner} | "
            f"Balance: {self.balance:.2f} ETB"
        )

    # Abstract method
    @abstractmethod
    def calculate_interest(self):
        pass


# ------------------------------------------
# SavingsAccount
# ------------------------------------------

class SavingsAccount(Account):

    def __init__(
        self,
        owner,
        balance=0,
        interest_rate=0.05
    ):
        super().__init__(owner, balance)

        self.interest_rate = interest_rate

    # Implement abstract method
    def calculate_interest(self):

        return self.balance * self.interest_rate

    def add_interest(self):

        interest = self.calculate_interest()

        self.balance += interest

        print(
            f"Interest added: {interest:.2f} ETB"
        )

    # Override statement()
    def statement(self):

        print(
            f"Savings Account | "
            f"Owner: {self.owner} | "
            f"Balance: {self.balance:.2f} ETB | "
            f"Interest Rate: "
            f"{self.interest_rate * 100:.1f}%"
        )


# ------------------------------------------
# CurrentAccount
# ------------------------------------------

class CurrentAccount(Account):

    def __init__(
        self,
        owner,
        balance=0,
        overdraft_limit=1000
    ):
        super().__init__(owner, balance)

        self.overdraft_limit = overdraft_limit

    # Override withdraw()
    def withdraw(self, amount):

        if amount <= 0:
            raise ValueError(
                "Withdrawal must be positive."
            )

        if amount > self.balance + self.overdraft_limit:
            raise ValueError(
                "Overdraft limit exceeded."
            )

        self.balance -= amount

    # Implement abstract method
    def calculate_interest(self):

        # Current accounts do not earn interest
        return 0

    # Override statement()
    def statement(self):

        print(
            f"Current Account | "
            f"Owner: {self.owner} | "
            f"Balance: {self.balance:.2f} ETB | "
            f"Overdraft Limit: "
            f"{self.overdraft_limit:.2f} ETB"
        )


# ------------------------------------------
# 5. Polymorphism
# ------------------------------------------

print("========== POLYMORPHISM ==========")

account1 = SavingsAccount(
    "Bethelhem",
    5000,
    0.05
)

account2 = CurrentAccount(
    "Sara",
    3000,
    2000
)

# Both objects have different implementations
# of statement()
accounts = [
    account1,
    account2
]

for account in accounts:

    # Python automatically uses the correct
    # statement() method for each object
    account.statement()

    account.deposit(100)

    print(
        f"After deposit: "
        f"{account.balance:.2f} ETB"
    )


# ------------------------------------------
# 4. Method Overriding Demonstration
# ------------------------------------------

print("\n========== METHOD OVERRIDING ==========")

account1.statement()
account2.statement()


# ------------------------------------------
# Abstract Class Demonstration
# ------------------------------------------

print("\n========== INTEREST ==========")

print(
    f"{account1.owner}'s interest: "
    f"{account1.calculate_interest():.2f} ETB"
)

print(
    f"{account2.owner}'s interest: "
    f"{account2.calculate_interest():.2f} ETB"
)


# This would cause an error because Account
# is abstract and cannot be instantiated:

# account = Account("Test", 1000)