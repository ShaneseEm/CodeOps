import { useState } from "react";
import { validate } from "./Exercise3_PureValidate";

/**
 * Exercise 5: Label every field and wire aria-invalid,
 * aria-describedby, and role="alert".
 */
export default function Exercise5_AccessibleAria() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "Bole",
    notes: "",
  });
  const [touched, setTouched] = useState({});

  const errors = validate(form);
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
      <h3>Exercise 5: Accessible ARIA Form Fields</h3>
      <p style={{ color: "#666", fontSize: "0.9rem" }}>
        Every input has a real <code>&lt;label htmlFor="..."&gt;</code>, <code>aria-invalid</code>,
        <code>aria-describedby</code> pointing to error messages, and error banners with <code>role="alert"</code>.
      </p>

      <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {/* Name Field */}
        <div>
          <label htmlFor="ex5-name" style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>
            Full Name <span style={{ color: "#dc2626" }}>*</span>
          </label>
          <input
            id="ex5-name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            onBlur={() => handleBlur("name")}
            aria-invalid={show("name") ? "true" : "false"}
            aria-describedby={show("name") ? "ex5-name-error" : undefined}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "4px",
              border: show("name") ? "2px solid #dc2626" : "1px solid #ccc",
              outline: "none",
            }}
          />
          {show("name") && (
            <p
              id="ex5-name-error"
              role="alert"
              style={{ color: "#dc2626", fontSize: "0.82rem", margin: "0.25rem 0 0 0", fontWeight: 500 }}
            >
              ⚠️ {errors.name}
            </p>
          )}
        </div>

        {/* TeleBirr Phone Field */}
        <div>
          <label htmlFor="ex5-phone" style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>
            TeleBirr Phone Number <span style={{ color: "#dc2626" }}>*</span>
          </label>
          <input
            id="ex5-phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            onBlur={() => handleBlur("phone")}
            placeholder="0911223344 or +251911223344"
            aria-invalid={show("phone") ? "true" : "false"}
            aria-describedby={show("phone") ? "ex5-phone-error" : undefined}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "4px",
              border: show("phone") ? "2px solid #dc2626" : "1px solid #ccc",
              outline: "none",
            }}
          />
          {show("phone") && (
            <p
              id="ex5-phone-error"
              role="alert"
              style={{ color: "#dc2626", fontSize: "0.82rem", margin: "0.25rem 0 0 0", fontWeight: 500 }}
            >
              ⚠️ {errors.phone}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
