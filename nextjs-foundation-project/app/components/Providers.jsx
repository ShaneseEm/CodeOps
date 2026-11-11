"use client";

import React from "react";
import { CartProvider } from "../context/CartContext";

/**
 * Providers Client Component
 * Wraps child components with client providers (like CartProvider)
 * keeping layout.js purely on the Server side.
 */
export default function Providers({ children }) {
  return <CartProvider>{children}</CartProvider>;
}
