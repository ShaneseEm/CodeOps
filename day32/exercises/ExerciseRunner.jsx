import { useState } from "react";
import Exercise1_GuardedCartHook from "./Exercise1_GuardedCartHook";
import Exercise2_SplitProviders from "./Exercise2_SplitProviders";
import Exercise3_DevToolsRenderRecording from "./Exercise3_DevToolsRenderRecording";
import Exercise4_ZustandCartStore from "./Exercise4_ZustandCartStore";
import Exercise5_NarrowSelectors from "./Exercise5_NarrowSelectors";
import Exercise6_PersistMiddleware from "./Exercise6_PersistMiddleware";
import Exercise7_ReduxToolkitSlice from "./Exercise7_ReduxToolkitSlice";

const EXERCISES = [
  { id: 1, title: "1. Guarded Hook", Component: Exercise1_GuardedCartHook },
  { id: 2, title: "2. Split Providers", Component: Exercise2_SplitProviders },
  { id: 3, title: "3. DevTools Renders", Component: Exercise3_DevToolsRenderRecording },
  { id: 4, title: "4. Zustand Store", Component: Exercise4_ZustandCartStore },
  { id: 5, title: "5. Narrow Selectors", Component: Exercise5_NarrowSelectors },
  { id: 6, title: "6. Persist Middleware", Component: Exercise6_PersistMiddleware },
  { id: 7, title: "7. Redux Toolkit Slice", Component: Exercise7_ReduxToolkitSlice },
];

export default function ExerciseRunner() {
  const [activeEx, setActiveEx] = useState(1);
  const Current = EXERCISES.find((e) => e.id === activeEx)?.Component || Exercise1_GuardedCartHook;

  return (
    <div style={{ padding: "1.5rem", maxWidth: "900px", margin: "0 auto" }}>
      <h2>Day 32 (Module 3 Day 7) — Exercises Hub</h2>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", margin: "1rem 0" }}>
        {EXERCISES.map((ex) => (
          <button
            key={ex.id}
            onClick={() => setActiveEx(ex.id)}
            style={{
              padding: "0.5rem 0.9rem",
              borderRadius: "6px",
              border: activeEx === ex.id ? "2px solid #b84a2e" : "1px solid #ccc",
              background: activeEx === ex.id ? "#b84a2e" : "#fff",
              color: activeEx === ex.id ? "#fff" : "#333",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {ex.title}
          </button>
        ))}
      </div>
      <div style={{ background: "#fff", padding: "1.5rem", borderRadius: "10px", border: "1px solid #e8c9a0" }}>
        <Current />
      </div>
    </div>
  );
}
