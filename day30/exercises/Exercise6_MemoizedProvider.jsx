import { useReducer, useMemo, createContext, useContext, useState } from "react";
import { cartReducer, initialCartState } from "../../day30_addis_eats/src/cartReducer";

/**
 * Exercise 6: Memoise the provider value with useMemo and explain in a comment what it prevents.
 *
 * ============================================================================
 * WHAT MEMOIZING THE PROVIDER VALUE PREVENTS:
 * ============================================================================
 * In JavaScript, `{ items, dispatch, total } !== { items, dispatch, total }`.
 * When a provider re-renders (for example, when an unrelated parent state changes,
 * such as a theme toggle or window resize), an inline object literal generates
 * a brand-new object reference on EVERY SINGLE RENDER.
 *
 * React Context uses strict reference equality (`Object.is(prevValue, nextValue)`)
 * to determine whether to trigger a re-render on consumers.
 *
 * If the value object reference changes, EVERY component that calls `useContext(CartContext)`
 * (e.g. CartBadge, CheckoutPanel, individual dish cards) is FORCED to re-render,
 * even if `items` and `total` have NOT changed!
 *
 * Wrapping the object in `useMemo(..., [state.items, total])` guarantees that the
 * value reference remains strictly identical across renders unless the actual
 * dependencies (`state.items` or `total`) change. This prevents wasteful renders
 * across the entire component subtree.
 * ============================================================================
 */
const CartContext = createContext(null);

function MemoizedCartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);
  const total = state.items.reduce((s, d) => s + (d.price || 0), 0);

  // Memoised provider value with useMemo
  const value = useMemo(
    () => ({
      items: state.items,
      dispatch,
      total,
    }),
    [state.items, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

function ConsumerWithRenderCounter() {
  const { items, total, dispatch } = useContext(CartContext);

  return (
    <div style={{ padding: "0.8rem", border: "1px solid #ddd", borderRadius: "6px" }}>
      <p>Cart Items: {items.length} | Total: {total} ETB</p>
      <button
        onClick={() =>
          dispatch({
            type: "add",
            dish: { id: 3, name: "Tibs", price: 280 },
          })
        }
      >
        + Add Tibs
      </button>
    </div>
  );
}

export default function Exercise6_MemoizedProvider() {
  const [parentCount, setParentCount] = useState(0);

  return (
    <div className="exercise-card">
      <h3>Exercise 6: Memoized Provider Value via useMemo</h3>
      <p>
        Clicking the button below re-renders the parent container, but because the
        CartProvider value is memoized with <code>useMemo</code>, consumers don't
        suffer from invalid reference re-renders:
      </p>
      <button onClick={() => setParentCount((c) => c + 1)} style={{ marginBottom: "1rem" }}>
        Re-render Parent Container (Count: {parentCount})
      </button>

      <MemoizedCartProvider>
        <ConsumerWithRenderCounter />
      </MemoizedCartProvider>
    </div>
  );
}
