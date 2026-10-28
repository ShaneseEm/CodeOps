import { useReducer, createContext, useContext } from "react";
import { cartReducer, initialCartState } from "../../day30_addis_eats/src/cartReducer";

/**
 * Exercise 5: Build a CartProvider that holds the reducer
 * and provides items, dispatch and the derived total.
 */
const CartContext = createContext(null);

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  // Derived total in ETB: calculated on every render
  const total = state.items.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <CartContext.Provider value={{ items: state.items, dispatch, total }}>
      {children}
    </CartContext.Provider>
  );
}

function CartConsumerDemo() {
  const { items, dispatch, total } = useContext(CartContext);

  return (
    <div style={{ padding: "1rem", background: "#fdf6ec", borderRadius: "8px" }}>
      <h4>Cart Consumer View</h4>
      <p>Cart Items Count: <strong>{items.length}</strong></p>
      <p>Derived Total: <strong>{total} ETB</strong></p>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          onClick={() =>
            dispatch({
              type: "add",
              dish: { id: 1, name: "Kitfo", price: 320, category: "Grill" },
            })
          }
        >
          + Add Kitfo (320 ETB)
        </button>
        <button onClick={() => dispatch({ type: "clear" })} disabled={items.length === 0}>
          Clear Cart
        </button>
      </div>
    </div>
  );
}

export default function Exercise5_CartProvider() {
  return (
    <div className="exercise-card">
      <h3>Exercise 5: CartProvider with useReducer & Derived Total</h3>
      <CartProvider>
        <CartConsumerDemo />
      </CartProvider>
    </div>
  );
}
