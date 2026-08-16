# ==========================================
# DAY 5 - LEVEL 1
# INHERITANCE
# ==========================================


# ------------------------------------------
# 1. Simple Inheritance
# ------------------------------------------

class Vehicle:

    def __init__(self, name, model, year):
        self.name = name
        self.model = model
        self.year = year

    def info(self):
        print(
            f"Vehicle: {self.name} {self.model} "
            f"({self.year})"
        )


# Car inherits from Vehicle
class Car(Vehicle):

    def __init__(self, name, model, year, doors):
        # Get name, model and year from parent class
        super().__init__(name, model, year)

        # Unique Car attribute
        self.doors = doors

    # Unique Car method
    def open_trunk(self):
        print(f"The trunk of the {self.name} is open.")


# Motorcycle inherits from Vehicle
class Motorcycle(Vehicle):

    def __init__(self, name, model, year, engine_cc):
        super().__init__(name, model, year)

        # Unique Motorcycle attribute
        self.engine_cc = engine_cc

    # Unique Motorcycle method
    def wheelie(self):
        print(f"The {self.name} motorcycle is doing a wheelie!")


print("========== VEHICLES ==========")

car = Car("Toyota", "Corolla", 2024, 4)

car.info()
print(f"Doors: {car.doors}")
car.open_trunk()


motorcycle = Motorcycle(
    "Honda",
    "CBR",
    2023,
    600
)

motorcycle.info()
print(f"Engine: {motorcycle.engine_cc}cc")
motorcycle.wheelie()


# ------------------------------------------
# 2. SavingsAccount
# ------------------------------------------

class Account:

    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):

        if amount <= 0:
            print("Deposit must be positive.")
            return

        self.balance += amount

    def withdraw(self, amount):

        if amount <= 0:
            print("Withdrawal must be positive.")
            return

        if amount > self.balance:
            print("Insufficient funds.")
            return

        self.balance -= amount

    def statement(self):
        print(
            f"Owner: {self.owner} | "
            f"Balance: {self.balance:.2f} ETB"
        )


class SavingsAccount(Account):

    def __init__(
        self,
        owner,
        balance=0,
        interest_rate=0.05
    ):
        # Initialize parent class
        super().__init__(owner, balance)

        self.interest_rate = interest_rate

    def add_interest(self):

        interest = self.balance * self.interest_rate

        self.balance += interest

        print(
            f"Interest added: {interest:.2f} ETB"
        )


print("\n========== SAVINGS ACCOUNT ==========")

savings = SavingsAccount(
    "Bethelhem",
    5000,
    0.05
)

savings.statement()

savings.add_interest()

savings.statement()


# ------------------------------------------
# 3. CurrentAccount
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
            print("Withdrawal must be positive.")
            return

        # Account can go below zero up to overdraft limit
        if amount > self.balance + self.overdraft_limit:
            print("Overdraft limit exceeded.")
            return

        self.balance -= amount

        print(
            f"Withdrew {amount:.2f} ETB."
        )


print("\n========== CURRENT ACCOUNT ==========")

current = CurrentAccount(
    "Sara",
    1000,
    2000
)

current.statement()

current.withdraw(2500)

current.statement()

current.withdraw(1000)