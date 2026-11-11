"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("addis_eats_cart");
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load cart from storage", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("addis_eats_cart", JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart to storage", e);
    }
  }, [cart]);

  const addToCart = (dish) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === dish.id);
      if (existing) {
        return prev.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...dish, quantity: 1 }];
    });
  };

  const removeFromCart = (dishId) => {
    setCart((prev) => prev.filter((item) => item.id !== dishId));
  };

  const updateQuantity = (dishId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(dishId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === dishId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
