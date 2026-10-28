import { useState } from "react";
import Exercise1_DocumentTitle from "./Exercise1_DocumentTitle";
import Exercise2_FetchMenu from "./Exercise2_FetchMenu";
import Exercise3_LoadingErrorState from "./Exercise3_LoadingErrorState";
import Exercise4_ResOkCheck from "./Exercise4_ResOkCheck";
import Exercise5_CategoryDependency from "./Exercise5_CategoryDependency";
import Exercise6_AbortController from "./Exercise6_AbortController";
import Exercise7_UseRefFocus from "./Exercise7_UseRefFocus";

const EXERCISES = [
  { id: 1, title: "1. document.title", Component: Exercise1_DocumentTitle },
  { id: 2, title: "2. Fetch public/dishes.json", Component: Exercise2_FetchMenu },
  { id: 3, title: "3. Loading & Error States", Component: Exercise3_LoadingErrorState },
  { id: 4, title: "4. res.ok & 404 Check", Component: Exercise4_ResOkCheck },
  { id: 5, title: "5. Category Dependency", Component: Exercise5_CategoryDependency },
  { id: 6, title: "6. AbortController", Component: Exercise6_AbortController },
  { id: 7, title: "7. useRef Search Focus", Component: Exercise7_UseRefFocus },
];

export default function ExerciseRunner() {
  const [activeEx, setActiveEx] = useState(1);
  const CurrentEx = EXERCISES.find((e) => e.id === activeEx)?.Component || Exercise1_DocumentTitle;

  return (
    <div className="exercise-runner" style={{ padding: "1.5rem", maxWidth: "800px", margin: "0 auto" }}>
      <h2>Day 29 — Progressive Exercises Hub</h2>
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
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            {ex.title}
          </button>
        ))}
      </div>
      <div style={{ background: "#fff", padding: "1.5rem", borderRadius: "8px", border: "1px solid #ddd" }}>
        <CurrentEx />
      </div>
    </div>
  );
}
