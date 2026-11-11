import { useState } from "react";

/**
 * Exercise 1: Build the checkout with name, TeleBirr phone,
 * delivery area, and optional notes in one state object.
 */
export default function Exercise1_SingleStateForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "Bole",
    notes: "",
  });

  // Single change handler controlling all four fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div style={{ maxWidth: "480px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h3>Exercise 1: Single State Object Form</h3>
      <p style={{ color: "#666", fontSize: "0.9rem" }}>
        All four fields are controlled by a single <code>form</code> state object with a single change handler.
      </p>

      <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
        <div>
          <label htmlFor="ex1-name" style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>
            Customer Name:
          </label>
          <input
            id="ex1-name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Abebe Kebede"
            style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <div>
          <label htmlFor="ex1-phone" style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>
            TeleBirr Phone:
          </label>
          <input
            id="ex1-phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="0911223344"
            style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <div>
          <label htmlFor="ex1-area" style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>
            Delivery Area:
          </label>
          <input
            id="ex1-area"
            name="area"
            type="text"
            value={form.area}
            onChange={handleChange}
            placeholder="Bole"
            style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <div>
          <label htmlFor="ex1-notes" style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>
            Optional Notes:
          </label>
          <textarea
            id="ex1-notes"
            name="notes"
            rows="3"
            value={form.notes}
            onChange={handleChange}
            placeholder="Special delivery instructions..."
            style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>
      </form>

      <div style={{ marginTop: "1rem", background: "#f8f9fa", padding: "0.75rem", borderRadius: "6px" }}>
        <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "0.9rem" }}>Current State:</h4>
        <pre style={{ margin: 0, fontSize: "0.8rem" }}>{JSON.stringify(form, null, 2)}</pre>
      </div>
    </div>
  );
}
