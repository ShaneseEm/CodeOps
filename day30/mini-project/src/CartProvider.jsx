import { createContext, useContext, useReducer, useMemo } from "react";
import PropTypes from "prop-types";
import { cartReducer, initialCartState } from "./cartReducer";

// 1. Create the Context
export const CartContext = createContext(null);

/**
 * Custom hook to consume the CartContext with guard check
 */
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

/**
 * CartProvider Component
 *
 * Implements:
 * - Cart state managed by cartReducer via useReducer
 * - Derived total calculated on every render (single source of truth in state.items)
 * - Provider value memoized via useMemo
 *
 * WHY THE PROVIDER VALUE IS MEMOISED:
 * Without `useMemo`, an inline object literal `{ items: state.items, dispatch, total }`
 * creates a brand-new object reference in memory on EVERY re-render of CartProvider
 * (for instance, when a theme changes or parent re-renders).
 * In React, Context uses referential equality (Object.is) to determine if consumers
 * should re-render. If a new object reference is passed on every render, EVERY
 * consumer component (CartBadge, CheckoutPanel, etc.) would be forced to re-render,
 * even when the cart items and total have not changed at all!
 * Wrapping the value in `useMemo` ensures the reference remains stable as long as
 * `state.items` and `total` do not change.
 */
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  // Derived total in ETB: computed on each render rather than stored in state
  const total = state.items.reduce((sum, item) => sum + (item.price || 0), 0);

  // Derived count of total items
  const itemCount = state.items.length;

  // Memoized context value
  const value = useMemo(
    () => ({
      items: state.items,
      dispatch,
      total,
      itemCount,
      addItem: (dish) => dispatch({ type: "add", dish }),
      removeItem: (id, instanceId) => dispatch({ type: "remove", id, instanceId }),
      clearCart: () => dispatch({ type: "clear" }),
    }),
    [state.items, total, itemCount]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartProvider;
