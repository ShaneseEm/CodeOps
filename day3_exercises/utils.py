# ==========================================
# Utility Functions
# ==========================================


def add_tax(price, rate=0.15):
    """
    Add tax to a price and return the tax-inclusive price.
    """

    tax = price * rate
    final_price = price + tax

    return final_price