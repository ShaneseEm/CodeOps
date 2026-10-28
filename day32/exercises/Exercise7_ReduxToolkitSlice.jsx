/**
 * Exercise 7: Rebuild just the cart as a Redux Toolkit slice,
 * without wiring it in, and compare the two files.
 *
 * ============================================================================
 * REDUX TOOLKIT SLICE IMPLEMENTATION (cartSlice.js)
 * ============================================================================
 * (Written below using standard Redux Toolkit createSlice pattern)
 */

export const initialReduxCartState = {
  items: [],
};

// Redux Toolkit createSlice mock/definition
export function createCartSlice() {
  return {
    name: "cart",
    initialState: initialReduxCartState,
    reducers: {
      addItem(state, action) {
        // Redux Toolkit uses Immer under the hood to allow "mutating" syntax:
        state.items.push(action.payload);
      },
      remove(state, action) {
        state.items = state.items.filter((item) => item.id !== action.payload);
      },
      clear(state) {
        state.items = [];
      },
    },
  };
}

/**
 * ============================================================================
 * ARCHITECTURAL COMPARISON: Zustand vs Redux Toolkit
 * ============================================================================
 *
 * 1. Boilerplate & Setup:
 *    - Zustand: Only requires `create((set) => ({ ... }))`. No providers, no store
 *      wrapper, no action creator files. 15 lines of code.
 *    - Redux Toolkit: Requires `createSlice`, `configureStore`, `<Provider store={store}>`
 *      at root, typed hooks (`useAppDispatch`, `useAppSelector`), and action dispatching.
 *
 * 2. Selectors:
 *    - Zustand: Direct built-in selector syntax: `useCartStore(s => s.items.length)`.
 *    - Redux Toolkit: Requires `useSelector((state) => state.cart.items.length)`.
 *
 * 3. Middleware & Persistence:
 *    - Zustand: One-line wrapper with `persist(..., { name: "..." })`.
 *    - Redux Toolkit: Requires installing external `redux-persist`, setting up
 *      `persistReducer`, `persistStore`, and `<PersistGate>`.
 *
 * 4. Verdict for Addis Eats:
 *    - Zustand gives all the selector performance benefits of Redux without
 *      the ceremony or boilerplate.
 * ============================================================================
 */

import { useState } from "react";

export default function Exercise7_ReduxToolkitSlice() {
  const [activeTab, setActiveTab] = useState("comparison");

  return (
    <div className="exercise-card">
      <h3>Exercise 7: Redux Toolkit Slice vs Zustand Comparison</h3>

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <button
          onClick={() => setActiveTab("comparison")}
          style={{ fontWeight: activeTab === "comparison" ? 700 : 400 }}
        >
          Architectural Comparison
        </button>
        <button
          onClick={() => setActiveTab("rtk-code")}
          style={{ fontWeight: activeTab === "rtk-code" ? 700 : 400 }}
        >
          RTK Slice Code
        </button>
      </div>

      {activeTab === "comparison" ? (
        <div style={{ background: "#f8f9fa", padding: "1rem", borderRadius: "8px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
            <thead>
              <tr style={{ background: "#eee", textAlign: "left" }}>
                <th style={{ padding: "8px" }}>Feature</th>
                <th style={{ padding: "8px" }}>Zustand (`cartStore.js`)</th>
                <th style={{ padding: "8px" }}>Redux Toolkit (`cartSlice.js`)</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "8px" }}><strong>Boilerplate</strong></td>
                <td style={{ padding: "8px", color: "green" }}>Minimal (~15 lines)</td>
                <td style={{ padding: "8px", color: "orange" }}>High (Slice, Store, Provider, Hooks)</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "8px" }}><strong>Provider Wrapper</strong></td>
                <td style={{ padding: "8px", color: "green" }}>None needed</td>
                <td style={{ padding: "8px", color: "orange" }}>Required (`&lt;Provider&gt;`)</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "8px" }}><strong>Narrow Selectors</strong></td>
                <td style={{ padding: "8px", color: "green" }}>Built-in by default</td>
                <td style={{ padding: "8px" }}>Via `useSelector` or Reselect</td>
              </tr>
              <tr>
                <td style={{ padding: "8px" }}><strong>Persistence</strong></td>
                <td style={{ padding: "8px", color: "green" }}>Built-in `persist` middleware</td>
                <td style={{ padding: "8px" }}>Requires `redux-persist` + PersistGate</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <pre style={{ background: "#2d3748", color: "#f7fafc", padding: "1rem", borderRadius: "8px", overflowX: "auto" }}>
{`// Redux Toolkit Cart Slice Example
import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    remove: (state, action) => {
      state.items = state.items.filter(d => d.id !== action.payload);
    },
    clear: (state) => {
      state.items = [];
    }
  }
});

export const { addItem, remove, clear } = cartSlice.actions;
export default cartSlice.reducer;`}
        </pre>
      )}
    </div>
  );
}
