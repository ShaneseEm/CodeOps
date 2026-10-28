import { useRef } from "react";
import { useCartStore } from "../../day32_addis_eats/src/cartStore";

/**
 * Exercise 5: Replace each useCart call with a narrow selector, one component at a time.
 *
 * Demonstrates:
 * Component A subscribes ONLY to `items.length`.
 * Component B subscribes ONLY to `addItem`.
 * Component C subscribes ONLY to `items`.
 */

function ComponentA_BadgeOnly() {
  const renderCount = useRef(0);
  renderCount.current += 1;

  // Narrow selector: only selects length
  const count = useCartStore((s) => s.items.length);

  return (
    <div style={{ padding: "0.8rem", border: "1px solid #48bb78", borderRadius: "6px" }}>
      <strong>Component A (Count Badge):</strong> {count} items
      <span style={{ fontSize: "0.8rem", color: "#666", display: "block" }}>
        Render count: {renderCount.current}
      </span>
    </div>
  );
}

function ComponentB_AddButtonOnly() {
  const renderCount = useRef(0);
  renderCount.current += 1;

  // Narrow selector: only selects addItem action (stable reference)
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div style={{ padding: "0.8rem", border: "1px solid #4299e1", borderRadius: "6px" }}>
      <strong>Component B (Action Only):</strong>
      <button
        onClick={() => addItem({ id: Date.now(), name: "Doro Wat", price: 240 })}
        style={{ marginLeft: "0.5rem" }}
      >
        Add Doro Wat
      </button>
      <span style={{ fontSize: "0.8rem", color: "#666", display: "block" }}>
        Render count: {renderCount.current} (Notice this NEVER re-renders on cart additions!)
      </span>
    </div>
  );
}

export default function Exercise5_NarrowSelectors() {
  return (
    <div className="exercise-card">
      <h3>Exercise 5: Replacing useCart with Narrow Selectors</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <ComponentA_BadgeOnly />
        <ComponentB_AddButtonOnly />
      </div>
    </div>
  );
}
