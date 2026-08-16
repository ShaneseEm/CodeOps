# ==========================================
# DAY 5 - LEVEL 3
# FULL ACCOUNT HIERARCHY
# ==========================================

from abc import ABC, abstractmethod


# ==========================================
# Abstract Parent Class
# ==========================================

class Account(ABC):

    def __init__(self, owner, balance=0):

        self.owner = owner

        if balance < 0:
            raise ValueError(
                "Balance cannot be negative."
            )

        self.__balance = balance

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
                "Deposit must be positive."
            )

        self.__balance += amount

    # --------------------------------------
    # Withdraw
    # --------------------------------------

    def withdraw(self, amount):

        if amount <= 0:
            raise ValueError(
                "Withdrawal must be positive."
            )

        if amount > self.__balance:
            raise ValueError(
                "Insufficient funds."
            )

        self.__balance -= amount

    # --------------------------------------
    # Abstract Method
    # --------------------------------------

    @abstractmethod
    def calculate_interest(self):
        pass

    # --------------------------------------
    # Statement
    # --------------------------------------

    @abstractmethod
    def statement(self):
        pass


# ==========================================
# Savings Account
# ==========================================

class SavingsAccount(Account):

    def __init__(
        self,
        owner,
        balance=0,
        interest_rate=0.05
    ):
        super().__init__(owner, balance)

        self.interest_rate = interest_rate

    def calculate_interest(self):

        return self.balance * self.interest_rate

    def add_interest(self):

        interest = self.calculate_interest()

        self.balance += interest

        return interest

    def statement(self):

        print(
            f"SAVINGS | "
            f"Owner: {self.owner} | "
            f"Balance: {self.balance:.2f} ETB | "
            f"Interest: "
            f"{self.interest_rate * 100:.1f}%"
        )


# ==========================================
# Current Account
# ==========================================

class CurrentAccount(Account):

    def __init__(
        self,
        owner,
        balance=0,
        overdraft_limit=1000
    ):
        super().__init__(owner, balance)

        self.overdraft_limit = overdraft_limit

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

    def calculate_interest(self):

        return 0

    def statement(self):

        print(
            f"CURRENT | "
            f"Owner: {self.owner} | "
            f"Balance: {self.balance:.2f} ETB | "
            f"Overdraft: "
            f"{self.overdraft_limit:.2f} ETB"
        )


# ==========================================
# Testing
# ==========================================

print("========== ACCOUNT HIERARCHY ==========")

savings = SavingsAccount(
    "Bethelhem",
    5000,
    0.05
)

current = CurrentAccount(
    "Sara",
    3000,
    2000
)

savings.statement()
current.statement()

print("\nAdding interest...")

interest = savings.add_interest()

print(
    f"Interest added: {interest:.2f} ETB"
)

savings.statement()

print("\nTesting deposit...")

savings.deposit(1000)

savings.statement()

print("\nTesting withdrawal...")

current.withdraw(4000)

current.statement()