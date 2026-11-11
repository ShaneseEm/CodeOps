import { useState } from "react";

/**
 * Exercise 3: Pure validate(form) function called during render.
 * It takes form state and returns an errors object with zero side effects.
 */
export function validate(form) {
  const errors = {};

  // Name validation: required, at least 2 characters
  if (!form.name || !form.name.trim()) {
    errors.name = "Name is required";
  } else if (form.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  // TeleBirr phone validation: starts with 09 or +2519 followed by 8 digits
  const telebirrRegex = /^(09\d{8}|\+2519\d{8})$/;
  if (!form.phone || !form.phone.trim()) {
    errors.phone = "TeleBirr phone is required";
  } else if (!telebirrRegex.test(form.phone.trim())) {
    errors.phone = "Must be valid TeleBirr format (09XXXXXXXX or +2519XXXXXXXX)";
  }

  // Delivery area: must be one of allowed zones
  const validAreas = ["Bole", "Kazanchis", "Megenagna", "Piassa"];
  if (!validAreas.includes(form.area)) {
    errors.area = "Please select a valid delivery zone";
  }

  // Notes: optional, but max 200 characters if present
  if (form.notes && form.notes.length > 200) {
    errors.notes = "Notes must not exceed 200 characters";
  }

  return errors;
}

export default function Exercise3_PureValidate() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "Bole",
    notes: "",
  });

  // Pure function derived on EVERY render - no useEffect, no state synchronization bugs!
  const errors = validate(form);
  const isValid = Object.keys(errors).length === 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ maxWidth: "480px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h3>Exercise 3: Pure validate(form) Derived on Render</h3>
      <p style={{ color: "#666", fontSize: "0.9rem" }}>
        <code>errors = validate(form)</code> computes synchronously on each render pass with zero side effects.
      </p>

      <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
        <div>
          <label htmlFor="ex3-name" style={{ display: "block", fontWeight: 600 }}>
            Name:
          </label>
          <input
            id="ex3-name"
            name="name"
            value={form.name}
            onChange={handleChange}
            style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <div>
          <label htmlFor="ex3-phone" style={{ display: "block", fontWeight: 600 }}>
            TeleBirr Phone:
          </label>
          <input
            id="ex3-phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="0911223344"
            style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>
      </form>

      <div style={{ marginTop: "1rem", padding: "0.75rem", background: isValid ? "#f0fdf4" : "#fef2f2", borderRadius: "6px" }}>
        <h4 style={{ margin: "0 0 0.5rem 0", color: isValid ? "#166534" : "#991b1b" }}>
          Validation Status: {isValid ? "Valid Form ✅" : "Has Errors ❌"}
        </h4>
        <pre style={{ margin: 0, fontSize: "0.8rem", color: "#333" }}>
          {JSON.stringify(errors, null, 2)}
        </pre>
      </div>
    </div>
  );
}
