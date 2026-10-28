import { createContext, useContext, useState } from "react";

/**
 * Exercise 1: Create a ThemeContext holding "light" or "dark"
 * and read it from a deeply nested component.
 */
export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

// Deeply nested component reading theme without props passed through intermediaries
function DeeplyNestedButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      style={{
        padding: "1rem",
        borderRadius: "8px",
        background: theme === "light" ? "#f5f5f5" : "#333",
        color: theme === "light" ? "#111" : "#fff",
        border: "1px solid #ccc",
      }}
    >
      <p>I am a deeply nested component reading <strong>{theme}</strong> theme from context!</p>
      <button
        type="button"
        onClick={toggleTheme}
        style={{
          padding: "0.5rem 1rem",
          cursor: "pointer",
          borderRadius: "6px",
          background: theme === "light" ? "#b84a2e" : "#e0684b",
          color: "#fff",
          border: "none",
        }}
      >
        Toggle Theme (Current: {theme})
      </button>
    </div>
  );
}

// Intermediate wrapper with NO theme prop passed down
function IntermediateContainer() {
  return (
    <div style={{ padding: "1rem", border: "1px dashed #aaa", borderRadius: "8px" }}>
      <h4>Intermediate Container (No props passed through here)</h4>
      <DeeplyNestedButton />
    </div>
  );
}

export default function Exercise1_ThemeContext() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="exercise-card">
        <h3>Exercise 1: ThemeContext with Deeply Nested Consumer</h3>
        <IntermediateContainer />
      </div>
    </ThemeContext.Provider>
  );
}
