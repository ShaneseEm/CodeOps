import { useState, useReducer } from "react";

/**
 * Exercise 4: Convert a component with three related useState calls
 * to useReducer, and compare the two versions.
 *
 * Example: A multi-field order step (customer name, delivery area, express delivery toggle)
 */

// VERSION A: With 3 separate useState calls
function FormWithUseState() {
  const [name, setName] = useState("");
  const [area, setArea] = useState("Bole");
  const [express, setExpress] = useState(false);

  function reset() {
    setName("");
    setArea("Bole");
    setExpress(false);
  }

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
      <h4>Version A: 3 useState calls</h4>
      <input
        placeholder="Customer Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select value={area} onChange={(e) => setArea(e.target.value)}>
        <option value="Bole">Bole</option>
        <option value="Kazanchis">Kazanchis</option>
        <option value="Piazza">Piazza</option>
      </select>
      <label style={{ display: "block", marginTop: "0.5rem" }}>
        <input
          type="checkbox"
          checked={express}
          onChange={(e) => setExpress(e.target.checked)}
        />{" "}
        Express Delivery (+50 ETB)
      </label>
      <button onClick={reset} style={{ marginTop: "0.5rem" }}>Reset</button>
      <p>Summary: {name || "(unnamed)"} | {area} | Express: {express ? "Yes" : "No"}</p>
    </div>
  );
}

// VERSION B: With 1 unified useReducer
const initialFormState = { name: "", area: "Bole", express: false };

function formReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "TOGGLE_EXPRESS":
      return { ...state, express: !state.express };
    case "RESET":
      return initialFormState;
    default:
      return state;
  }
}

function FormWithUseReducer() {
  const [state, dispatch] = useReducer(formReducer, initialFormState);

  return (
    <div style={{ border: "1px solid #b84a2e", padding: "1rem", borderRadius: "8px", background: "#fffaf7" }}>
      <h4>Version B: 1 unified useReducer</h4>
      <input
        placeholder="Customer Name"
        value={state.name}
        onChange={(e) => dispatch({ type: "SET_FIELD", field: "name", value: e.target.value })}
      />
      <select
        value={state.area}
        onChange={(e) => dispatch({ type: "SET_FIELD", field: "area", value: e.target.value })}
      >
        <option value="Bole">Bole</option>
        <option value="Kazanchis">Kazanchis</option>
        <option value="Piazza">Piazza</option>
      </select>
      <label style={{ display: "block", marginTop: "0.5rem" }}>
        <input
          type="checkbox"
          checked={state.express}
          onChange={() => dispatch({ type: "TOGGLE_EXPRESS" })}
        />{" "}
        Express Delivery (+50 ETB)
      </label>
      <button onClick={() => dispatch({ type: "RESET" })} style={{ marginTop: "0.5rem" }}>Reset</button>
      <p>Summary: {state.name || "(unnamed)"} | {state.area} | Express: {state.express ? "Yes" : "No"}</p>
    </div>
  );
}

export default function Exercise4_UseStateToUseReducer() {
  return (
    <div className="exercise-card">
      <h3>Exercise 4: Converting 3 useState Calls to 1 useReducer</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <FormWithUseState />
        <FormWithUseReducer />
      </div>

      <div style={{ marginTop: "1rem", padding: "0.8rem", background: "#f0f8ff", borderRadius: "6px" }}>
        <strong>Comparison Takeaways:</strong>
        <ul>
          <li><strong>Atomicity:</strong> With `useReducer`, multi-field updates (like `RESET`) occur in a single dispatch rather than 3 separate state setters.</li>
          <li><strong>Separation of Concerns:</strong> Business transitions are kept inside a pure reducer function outside the UI markup.</li>
          <li><strong>Testability:</strong> `formReducer` can be unit tested with standard objects without mounting React components.</li>
        </ul>
      </div>
    </div>
  );
}
