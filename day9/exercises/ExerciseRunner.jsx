import { useState } from "react";
import Exercise1_ErrorBoundary from "./Exercise1_ErrorBoundary";
import Exercise2_DeliberateDishThrow from "./Exercise2_DeliberateDishThrow";
import Exercise3_DualErrorBoundaries from "./Exercise3_DualErrorBoundaries";
import Exercise4_LazySuspenseRoutes from "./Exercise4_LazySuspenseRoutes";
import Exercise5_ProfilerSlowComponent from "./Exercise5_ProfilerSlowComponent";
import Exercise6_ReRenderFixComparison from "./Exercise6_ReRenderFixComparison";
import Exercise7_PortalDishModal from "./Exercise7_PortalDishModal";

const EXERCISES = [
  { id: 1, title: "1. ErrorBoundary Class", Component: Exercise1_ErrorBoundary },
  { id: 2, title: "2. Deliberate Dish Throw", Component: Exercise2_DeliberateDishThrow },
  { id: 3, title: "3. Dual Boundaries", Component: Exercise3_DualErrorBoundaries },
  { id: 4, title: "4. Lazy Suspense Routes", Component: Exercise4_LazySuspenseRoutes },
  { id: 5, title: "5. Profiler Session", Component: Exercise5_ProfilerSlowComponent },
  { id: 6, title: "6. Re-Render Fix & Timing", Component: Exercise6_ReRenderFixComparison },
  { id: 7, title: "7. Portal Dish Modal", Component: Exercise7_PortalDishModal },
];

export default function ExerciseRunner() {
  const [activeEx, setActiveEx] = useState(1);
  const Current = EXERCISES.find((e) => e.id === activeEx)?.Component || Exercise1_ErrorBoundary;

  return (
    <div style={{ padding: "1.5rem", maxWidth: "900px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <header style={{ marginBottom: "1.5rem", borderBottom: "2px solid #e5e7eb", paddingBottom: "1rem" }}>
        <h2 style={{ margin: 0, color: "#1f2937" }}>Prog M3-SQ10 S26 / Day 9 — Exercises Hub</h2>
        <p style={{ margin: "0.4rem 0 0 0", color: "#6b7280" }}>
          Step-by-step solutions for Exercises 1 through 7 (Resilient & Fast Addis Eats)
        </p>
      </header>

      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
        {EXERCISES.map((ex) => (
          <button
            key={ex.id}
            onClick={() => setActiveEx(ex.id)}
            style={{
              padding: "0.5rem 0.85rem",
              borderRadius: "6px",
              border: activeEx === ex.id ? "2px solid #b84a2e" : "1px solid #d1d5db",
              background: activeEx === ex.id ? "#b84a2e" : "#fff",
              color: activeEx === ex.id ? "#fff" : "#374151",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            {ex.title}
          </button>
        ))}
      </div>

      <div
        style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          border: "1px solid #e5e7eb",
        }}
      >
        <Current />
      </div>
    </div>
  );
}
