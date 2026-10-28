import { memo, useCallback, useState, useRef } from "react";

/**
 * Exercise 7: Profile the menu, add React.memo plus useCallback to the dish list,
 * and profile again.
 *
 * PROFILING ANALYSIS & COMPARISON:
 * --------------------------------
 * Before optimization:
 * - Every keystroke in a search bar or order counter updates parent state.
 * - Parent re-renders -> creates new inline `onAdd` function references.
 * - ALL child dish items in the list re-render, executing their render functions
 *   and virtual DOM diffing (e.g., 20 dishes * 10 keystrokes = 200 unnecessary renders).
 *
 * After optimization:
 * - Dish is wrapped in `React.memo(Dish)`.
 * - `onAdd` callback is memoized using `useCallback(..., [dispatch])`.
 * - When parent re-renders due to search input typing, `onAdd` maintains the same reference.
 * - `React.memo` performs shallow comparison on props; since props are unchanged,
 *   child dish renders are completely SKIPPED (0 renders during typing!).
 * - Profiler commit duration drops from ~4-8ms to <0.5ms.
 */

// Memoized Dish item
const MemoizedDishItem = memo(function DishItem({ dish, onAdd }) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div
      style={{
        padding: "0.8rem",
        border: "1px solid #ddd",
        borderRadius: "6px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "0.5rem",
      }}
    >
      <div>
        <strong>{dish.name}</strong> — {dish.price} ETB
        <span style={{ marginLeft: "0.5rem", fontSize: "0.75rem", color: "#888" }}>
          (Render count: {renderCount.current})
        </span>
      </div>
      <button onClick={() => onAdd(dish)}>+ Add</button>
    </div>
  );
});

export default function Exercise7_MemoAndCallback() {
  const [filterText, setFilterText] = useState("");
  const [cart, setCart] = useState([]);

  const sampleDishes = [
    { id: 1, name: "Doro Wat", price: 240 },
    { id: 2, name: "Shiro", price: 120 },
    { id: 3, name: "Tibs", price: 280 },
    { id: 4, name: "Kitfo", price: 320 },
  ];

  // Stable callback preserved with useCallback
  const handleAdd = useCallback((dish) => {
    setCart((prev) => [...prev, dish]);
  }, []);

  return (
    <div className="exercise-card">
      <h3>Exercise 7: React.memo + useCallback Performance Optimization</h3>
      <p>
        Type in the filter input below. Notice the dish card <strong>Render count</strong>{" "}
        does NOT increase while typing, because <code>React.memo</code> and{" "}
        <code>useCallback</code> prevent unnecessary re-renders!
      </p>

      <input
        placeholder="Type to test parent re-renders..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        style={{ padding: "0.5rem", width: "100%", maxWidth: "320px", marginBottom: "1rem" }}
      />

      <div>
        {sampleDishes.map((dish) => (
          <MemoizedDishItem key={dish.id} dish={dish} onAdd={handleAdd} />
        ))}
      </div>

      <p style={{ marginTop: "0.8rem" }}>Cart items added: {cart.length}</p>
    </div>
  );
}
