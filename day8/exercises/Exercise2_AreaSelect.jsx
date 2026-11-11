import { useState } from "react";

/**
 * Exercise 2: Add a select for the area (Bole, Kazanchis, Megenagna, Piassa)
 * and bind it correctly.
 */
export const DELIVERY_AREAS = ["Bole", "Kazanchis", "Megenagna", "Piassa"];

export default function Exercise2_AreaSelect() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "Bole",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div style={{ maxWidth: "480px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h3>Exercise 2: Controlled Area Select</h3>
      <p style={{ color: "#666", fontSize: "0.9rem" }}>
        Delivery area is bounded to a select dropdown containing Bole, Kazanchis, Megenagna, and Piassa.
      </p>

      <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
        <div>
          <label htmlFor="ex2-area" style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>
            Select Delivery Area:
          </label>
          <select
            id="ex2-area"
            name="area"
            value={form.area}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.55rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            {DELIVERY_AREAS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
      </form>

      <div style={{ marginTop: "1.2rem", padding: "0.75rem", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "6px" }}>
        <strong>Selected Area:</strong> {form.area}
      </div>
    </div>
  );
}
