import { createContext, useContext, useState } from "react";

/**
 * Exercise 1: Wrap CartContext in a useCart hook that throws a clear error
 * when the provider is missing.
 */
const CartContext = createContext(null);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error(
      "useCart must be used within a <CartProvider>. Ensure <CartProvider> wraps your component tree."
    );
  }
  return context;
}

function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  function addItem(dish) {
    setItems((prev) => [...prev, { ...dish, _id: Date.now() }]);
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function clearCart() {
    setItems([]);
  }

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Consumer that correctly uses the guarded hook inside the provider
function SafeCartConsumer() {
  const { items, addItem, clearCart } = useCart();

  return (
    <div style={{ padding: "0.8rem", background: "#f0fdf4", borderRadius: "8px" }}>
      <p><strong>✅ Inside Provider:</strong> {items.length} items in cart</p>
      <button onClick={() => addItem({ id: Date.now(), name: "Tibs", price: 280 })}>
        Add Tibs (280 ETB)
      </button>
      <button onClick={clearCart} style={{ marginLeft: "0.5rem" }} disabled={items.length === 0}>
        Clear
      </button>
    </div>
  );
}

// Unsafe consumer to demonstrate the error
function UnsafeCartConsumer() {
  try {
    useCart(); // This will throw
    return null;
  } catch (err) {
    return (
      <div style={{ padding: "0.8rem", background: "#fff5f5", border: "1px solid #feb2b2", borderRadius: "8px", marginTop: "0.8rem" }}>
        <p><strong>❌ Outside Provider:</strong></p>
        <pre style={{ fontSize: "0.8rem", whiteSpace: "pre-wrap" }}>{err.message}</pre>
      </div>
    );
  }
}

export default function Exercise1_GuardedCartHook() {
  return (
    <div className="exercise-card">
      <h3>Exercise 1: Guarded useCart Hook with Clear Error</h3>

      <p>Consumer <strong>inside</strong> CartProvider (safe):</p>
      <CartProvider>
        <SafeCartConsumer />
      </CartProvider>

      <p style={{ marginTop: "1rem" }}>Consumer <strong>outside</strong> CartProvider (throws error caught below):</p>
      <UnsafeCartConsumer />
    </div>
  );
}
