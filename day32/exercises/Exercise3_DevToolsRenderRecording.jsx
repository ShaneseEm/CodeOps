import { useRef, useState } from "react";

/**
 * Exercise 3: Turn on "highlight updates" in React DevTools
 * and record what re-renders when you add a dish.
 */
export default function Exercise3_DevToolsRenderRecording() {
  const [badgeCount, setBadgeCount] = useState(0);
  const headerRenderCount = useRef(0);
  const badgeRenderCount = useRef(0);

  // Simulated observations
  return (
    <div className="exercise-card">
      <h3>Exercise 3: React DevTools &quot;Highlight Updates&quot; Observation</h3>

      <div style={{ padding: "1rem", background: "#f8f9fa", borderRadius: "8px", marginBottom: "1rem" }}>
        <h4>Observation Log:</h4>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "0.5rem" }}>
          <thead>
            <tr style={{ background: "#eee", textAlign: "left" }}>
              <th style={{ padding: "6px" }}>Architecture</th>
              <th style={{ padding: "6px" }}>Action</th>
              <th style={{ padding: "6px" }}>Header Re-renders?</th>
              <th style={{ padding: "6px" }}>Badge Re-renders?</th>
              <th style={{ padding: "6px" }}>Dish Cards Re-render?</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "6px" }}><strong>1. Day 30 React Context</strong></td>
              <td style={{ padding: "6px" }}>Add Dish</td>
              <td style={{ padding: "6px", color: "red" }}>YES (Whole header flashes green)</td>
              <td style={{ padding: "6px", color: "red" }}>YES</td>
              <td style={{ padding: "6px", color: "orange" }}>YES (unless wrapped in React.memo)</td>
            </tr>
            <tr>
              <td style={{ padding: "6px" }}><strong>2. Day 32 Zustand (Narrow Selector)</strong></td>
              <td style={{ padding: "6px" }}>Add Dish</td>
              <td style={{ padding: "6px", color: "green" }}><strong>NO (Zero flash)</strong></td>
              <td style={{ padding: "6px", color: "green" }}><strong>YES (Targeted)</strong></td>
              <td style={{ padding: "6px", color: "green" }}><strong>NO (Unchanged items skip)</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
        <p>Simulate adding a dish to badge:</p>
        <button
          onClick={() => {
            badgeRenderCount.current += 1;
            setBadgeCount((c) => c + 1);
          }}
        >
          Add Dish (Badge Count: {badgeCount})
        </button>
        <p style={{ fontSize: "0.85rem", color: "#666", marginTop: "0.5rem" }}>
          Badge render count: {badgeRenderCount.current} | Header container renders: {headerRenderCount.current}
        </p>
      </div>
    </div>
  );
}
