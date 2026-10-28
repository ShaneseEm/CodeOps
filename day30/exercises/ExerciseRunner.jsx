import { useState } from "react";
import Exercise1_ThemeContext from "./Exercise1_ThemeContext";
import Exercise2_UseFetchHook from "./Exercise2_UseFetchHook";
import Exercise3_CartReducerDirect from "./Exercise3_CartReducerDirect";
import Exercise4_UseStateToUseReducer from "./Exercise4_UseStateToUseReducer";
import Exercise5_CartProvider from "./Exercise5_CartProvider";
import Exercise6_MemoizedProvider from "./Exercise6_MemoizedProvider";
import Exercise7_MemoAndCallback from "./Exercise7_MemoAndCallback";

const EXERCISES = [
  { id: 1, title: "1. ThemeContext", Component: Exercise1_ThemeContext },
  { id: 2, title: "2. useFetch Hook", Component: Exercise2_UseFetchHook },
  { id: 3, title: "3. cartReducer Direct", Component: Exercise3_CartReducerDirect },
  { id: 4, title: "4. useState → useReducer", Component: Exercise4_UseStateToUseReducer },
  { id: 5, title: "5. CartProvider", Component: Exercise5_CartProvider },
  { id: 6, title: "6. useMemo Provider", Component: Exercise6_MemoizedProvider },
  { id: 7, title: "7. React.memo + useCallback", Component: Exercise7_MemoAndCallback },
];

export default function ExerciseRunner() {
  const [activeEx, setActiveEx] = useState(1);
  const Current = EXERCISES.find((e) => e.id === activeEx)?.Component || Exercise1_ThemeContext;

  return (
    <div style={{ padding: "1.5rem", maxWidth: "900px", margin: "0 auto" }}>
      <h2>Day 30 (Week 1 Day 5) — Exercises Hub</h2>
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
