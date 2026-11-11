import { useState, useRef } from "react";
import { validate } from "./Exercise3_PureValidate";

/**
 * Exercise 7: Simulate a failed request: show the reason,
 * keep every value, and focus the first bad field.
 */
export default function Exercise7_SimulatedFailure() {
  const [form, setForm] = useState({
    name: "Hanna Girma",
    phone: "0911223344",
    area: "Bole",
    notes: "Ring bell twice",
  });
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  // Field refs for programmatic focus on failure
  const nameInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const areaSelectRef = useRef(null);
  const notesRef = useRef(null);

  const fieldRefs = {
    name: nameInputRef,
    phone: phoneInputRef,
    area: areaSelectRef,
    notes: notesRef,
  };

  const errors = validate(form);
  const show = (field) => Boolean(touched[field] && errors[field]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear server error banner upon user modification
    if (serverError) setServerError(null);
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields touched
    const allTouched = { name: true, phone: true, area: true, notes: true };
    setTouched(allTouched);

    const currentErrors = validate(form);
    const errorKeys = Object.keys(currentErrors);

    if (errorKeys.length > 0) {
      // Focus first invalid client field
      const firstBadField = errorKeys[0];
      fieldRefs[firstBadField]?.current?.focus();
      return;
    }

    setIsSubmitting(true);
    setServerError(null);

    // Simulate backend network/gateway failure
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);

    // Server responds with failure: e.g. TeleBirr account suspended/insufficient balance
    const failureReason = "TeleBirr Gateway Error: Insufficient wallet balance for 0911223344. Please check your balance or use another number.";
    setServerError(failureReason);

    // CRITICAL: Keep every form value intact!
    // Focus the first bad field (phone)
    fieldRefs.phone?.current?.focus();
  };

  return (
    <div style={{ maxWidth: "480px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h3>Exercise 7: Simulated Failure with Preserved State</h3>
      <p style={{ color: "#666", fontSize: "0.9rem" }}>
        When the server request fails, the reason is displayed clearly with <code>role="alert"</code>, all values are preserved, and focus shifts to the invalid field.
      </p>

      {/* Server Failure Banner */}
      {serverError && (
        <div
          role="alert"
          style={{
            padding: "0.85rem",
            marginBottom: "1rem",
            background: "#fee2e2",
            border: "2px solid #ef4444",
            borderRadius: "6px",
            color: "#991b1b",
          }}
        >
          <strong>⚠️ Request Failed:</strong>
          <p style={{ margin: "0.25rem 0 0 0", fontSize: "0.88rem" }}>{serverError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <label htmlFor="ex7-name" style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>
            Name:
          </label>
          <input
            ref={nameInputRef}
            id="ex7-name"
            name="name"
            value={form.name}
            onChange={handleChange}
            onBlur={() => handleBlur("name")}
            aria-invalid={show("name") ? "true" : "false"}
            aria-describedby={show("name") ? "ex7-name-err" : undefined}
            style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: show("name") ? "2px solid #dc2626" : "1px solid #ccc" }}
          />
          {show("name") && (
            <p id="ex7-name-err" role="alert" style={{ color: "#dc2626", fontSize: "0.8rem", margin: "0.2rem 0 0 0" }}>
              ⚠️ {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="ex7-phone" style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>
            TeleBirr Phone:
          </label>
          <input
            ref={phoneInputRef}
            id="ex7-phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            onBlur={() => handleBlur("phone")}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "4px",
              border: serverError ? "2px solid #dc2626" : "1px solid #ccc",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: "0.75rem",
            background: isSubmitting ? "#9ca3af" : "#dc2626",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "1rem",
            fontWeight: 600,
            cursor: isSubmitting ? "not-allowed" : "pointer",
          }}
        >
          {isSubmitting ? "Attempting Payment (650 ETB)..." : "Simulate Failed Order (650 ETB)"}
        </button>
      </form>
    </div>
  );
}
