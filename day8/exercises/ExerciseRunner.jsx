import { useState } from "react";
import Exercise1_SingleStateForm from "./Exercise1_SingleStateForm";
import Exercise2_AreaSelect from "./Exercise2_AreaSelect";
import Exercise3_PureValidate from "./Exercise3_PureValidate";
import Exercise4_TouchedOnBlur from "./Exercise4_TouchedOnBlur";
import Exercise5_AccessibleAria from "./Exercise5_AccessibleAria";
import Exercise6_SubmittingState from "./Exercise6_SubmittingState";
import Exercise7_SimulatedFailure from "./Exercise7_SimulatedFailure";

const EXERCISES = [
  { id: 1, title: "1. Single State Form", Component: Exercise1_SingleStateForm },
  { id: 2, title: "2. Area Select", Component: Exercise2_AreaSelect },
  { id: 3, title: "3. Pure Validate", Component: Exercise3_PureValidate },
  { id: 4, title: "4. Touched on Blur", Component: Exercise4_TouchedOnBlur },
  { id: 5, title: "5. Accessible ARIA", Component: Exercise5_AccessibleAria },
  { id: 6, title: "6. Submitting Flag & ETB", Component: Exercise6_SubmittingState },
  { id: 7, title: "7. Simulated Failure", Component: Exercise7_SimulatedFailure },
];

export default function ExerciseRunner() {
  const [activeEx, setActiveEx] = useState(1);
  const Current = EXERCISES.find((e) => e.id === activeEx)?.Component || Exercise1_SingleStateForm;

  return (
    <div style={{ padding: "1.5rem", maxWidth: "900px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <header style={{ marginBottom: "1.5rem", borderBottom: "2px solid #e5e7eb", paddingBottom: "1rem" }}>
        <h2 style={{ margin: 0, color: "#1f2937" }}>Prog M3-SQ10 S26 / Day 8 — Exercises Hub</h2>
        <p style={{ margin: "0.4rem 0 0 0", color: "#6b7280" }}>
          Step-by-step solutions for Exercises 1 through 7 (The Addis Eats Checkout)
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
