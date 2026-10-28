"use client";

import React, { useState } from "react";
import { useCart } from "../context/CartContext";

/**
 * AddToCartButton Client Leaf Component
 * "Move each directive down to the smallest component that genuinely needs it."
 * Only this tiny interactive button needs 'use client' and onClick handler.
 * DishCard and DishList remain 100% Server Components.
 */
export default function AddToCartButton({ dish }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(dish);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <button
      onClick={handleClick}
      className={`add-to-cart-leaf-btn ${added ? "added" : ""}`}
      aria-label={`Add ${dish.name} to cart`}
    >
      {added ? "✓ Added!" : "+ Add to Cart"}
    </button>
  );
}
