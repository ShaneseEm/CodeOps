import { useState } from "react";
import { validate } from "./Exercise3_PureValidate";

/**
 * Exercise 4: Track touched fields on blur and show each error
 * only after its field has been visited.
 */
export default function Exercise4_TouchedOnBlur() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "Bole",
    notes: "",
  });

  // Track visited fields: { name: true, phone: false, ... }
  const [touched, setTouched] = useState({});

  const errors = validate(form);

  // Helper: show error only when the field has been visited
  const show = (field) => Boolean(touched[field] && errors[field]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  return (
    <div style={{ maxWidth: "480px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h3>Exercise 4: Touched on Blur Error Display</h3>
      <p style={{ color: "#666", fontSize: "0.9rem" }}>
        Fresh untouched empty inputs stay quiet. As soon as you unfocus (blur) a field, its error is revealed if invalid.
      </p>

      <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
        <div>
          <label htmlFor="ex4-name" style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>
            Customer Name:
          </label>
          <input
            id="ex4-name"
            name="name"
            value={form.name}
            onChange={handleChange}
            onBlur={() => handleBlur("name")}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "4px",
              border: `1px solid ${show("name") ? "#dc2626" : "#ccc"}`,
            }}
          />
          {show("name") && (
            <span style={{ color: "#dc2626", fontSize: "0.8rem", marginTop: "0.2rem", display: "block" }}>
              ⚠️ {errors.name}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="ex4-phone" style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>
            TeleBirr Phone:
          </label>
          <input
            id="ex4-phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            onBlur={() => handleBlur("phone")}
            placeholder="0911223344"
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "4px",
              border: `1px solid ${show("phone") ? "#dc2626" : "#ccc"}`,
            }}
          />
          {show("phone") && (
            <span style={{ color: "#dc2626", fontSize: "0.8rem", marginTop: "0.2rem", display: "block" }}>
              ⚠️ {errors.phone}
            </span>
          )}
        </div>
      </form>

      <div style={{ marginTop: "1rem", background: "#f8f9fa", padding: "0.75rem", borderRadius: "6px" }}>
        <strong>Touched State:</strong> {JSON.stringify(touched)}
      </div>
    </div>
  );
}
