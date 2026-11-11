import { useState, useRef } from "react";
import Field from "./Field";
import { validate, VALID_DELIVERY_AREAS } from "./validate";

export default function Checkout({ cartTotal = 485, onOrderPlaced }) {
  // State 1 & 2: Form state & Touched tracking
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "Bole",
    notes: "",
  });
  const [touched, setTouched] = useState({});

  // State 4, 5, 6: Submitting, Success, and Failure states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState("idle"); // "idle" | "success" | "error"
  const [errorMessage, setErrorMessage] = useState("");
  const [orderReceipt, setOrderReceipt] = useState(null);

  // Testing & Evaluation toggles
  const [simulateServerFailure, setSimulateServerFailure] = useState(false);
  const [isGreyscale, setIsGreyscale] = useState(false);

  // Focus management refs for first invalid field targeting
  const fieldRefs = {
    name: useRef(null),
    phone: useRef(null),
    area: useRef(null),
    notes: useRef(null),
  };

  // Requirement: Pure validate(form) derived on EVERY render pass
  const errors = validate(form);
  const hasErrors = Object.keys(errors).length > 0;

  // Single change handler controlling all four fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // If an error was active, clear the top-level error banner as the user edits
    if (submissionStatus === "error") {
      setSubmissionStatus("idle");
      setErrorMessage("");
    }
  };

  // Blur handler: Marks field touched so errors appear only after visited
  const handleBlur = (field) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  // Helper: focus the first invalid field
  const focusFirstInvalidField = (currentErrors) => {
    const errorKeys = Object.keys(currentErrors);
    if (errorKeys.length > 0) {
      const firstField = errorKeys[0];
      fieldRefs[firstField]?.current?.focus();
    }
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent double submission if already in-flight
    if (isSubmitting) return;

    // Mark all fields as touched upon submission attempt
    const allTouched = {
      name: true,
      phone: true,
      area: true,
      notes: true,
    };
    setTouched(allTouched);

    // Re-check derived errors
    if (hasErrors) {
      focusFirstInvalidField(errors);
      return;
    }

    // Set Submitting State
    setIsSubmitting(true);
    setSubmissionStatus("idle");
    setErrorMessage("");

    try {
      // Simulate network latency (1.2s)
      await new Promise((resolve) => setTimeout(resolve, 1200));

      if (simulateServerFailure) {
        throw new Error(
          "TeleBirr Gateway Error: Transaction timeout. Your account was not charged. Please verify phone number and retry."
        );
      }

      // Success Path: Generate order receipt
      const receipt = {
        orderId: `AE-${Math.floor(100000 + Math.random() * 900000)}`,
        customerName: form.name.trim(),
        phone: form.phone.trim(),
        deliveryArea: form.area,
        notes: form.notes.trim() || "None",
        totalAmount: cartTotal,
        timestamp: new Date().toLocaleTimeString(),
      };

      setOrderReceipt(receipt);
      setSubmissionStatus("success");
      if (onOrderPlaced) onOrderPlaced(receipt);
    } catch (err) {
      // Failure Path:
      // 1. Keep every value intact in form state
      // 2. Set error message and role="alert" banner
      // 3. Move focus to the primary interactive field (phone or name)
      setSubmissionStatus("error");
      setErrorMessage(err.message || "Failed to process order. Please try again.");
      fieldRefs.phone?.current?.focus();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setForm({ name: "", phone: "", area: "Bole", notes: "" });
    setTouched({});
    setSubmissionStatus("idle");
    setErrorMessage("");
    setOrderReceipt(null);
  };

  return (
    <div
      style={{
        maxWidth: "540px",
        margin: "0 auto",
        fontFamily: "system-ui, -apple-system, sans-serif",
        filter: isGreyscale ? "grayscale(100%)" : "none",
        transition: "filter 0.3s ease",
      }}
    >
      {/* Greyscale & Failure Simulation Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "1rem",
          padding: "0.6rem 0.85rem",
          background: "#f3f4f6",
          borderRadius: "8px",
          fontSize: "0.82rem",
          color: "#4b5563",
          border: "1px dashed #d1d5db",
        }}
      >
        <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={simulateServerFailure}
            onChange={(e) => setSimulateServerFailure(e.target.checked)}
          />
          <span>Simulate Server/Network Failure</span>
        </label>

        <button
          type="button"
          onClick={() => setIsGreyscale((prev) => !prev)}
          style={{
            padding: "0.25rem 0.6rem",
            fontSize: "0.75rem",
            background: isGreyscale ? "#1f2937" : "#e5e7eb",
            color: isGreyscale ? "#fff" : "#111827",
            border: "1px solid #9ca3af",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {isGreyscale ? "Disable Greyscale" : "Audit Greyscale 👁️"}
        </button>
      </div>

      <div
        style={{
          background: "#ffffff",
          borderRadius: "12px",
          padding: "1.75rem",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
          border: "1px solid #e5e7eb",
        }}
      >
        <header style={{ marginBottom: "1.5rem", borderBottom: "1px solid #f3f4f6", paddingBottom: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
            <span style={{ fontSize: "1.5rem" }}>🇪🇹</span>
            <h2 style={{ margin: 0, fontSize: "1.4rem", color: "#111827", fontWeight: 700 }}>
              Addis Eats Checkout
            </h2>
          </div>
          <p style={{ margin: 0, fontSize: "0.88rem", color: "#6b7280" }}>
            Order subtotal: <strong>{cartTotal} ETB</strong> via TeleBirr
          </p>
        </header>

        {/* State 5: Success State */}
        {submissionStatus === "success" && orderReceipt && (
          <div
            role="status"
            aria-live="polite"
            style={{
              padding: "1.25rem",
              background: "#ecfdf5",
              border: "2px solid #059669",
              borderRadius: "8px",
              textAlign: "left",
              marginBottom: "1.5rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "1.3rem" }}>✅</span>
              <h3 style={{ margin: 0, color: "#065f46", fontSize: "1.1rem" }}>
                Order Placed Successfully!
              </h3>
            </div>
            <p style={{ margin: "0.25rem 0", fontSize: "0.9rem", color: "#047857" }}>
              Confirmation Number: <strong>{orderReceipt.orderId}</strong>
            </p>
            <p style={{ margin: "0.25rem 0", fontSize: "0.9rem", color: "#047857" }}>
              Deliver to: <strong>{orderReceipt.customerName}</strong> ({orderReceipt.deliveryArea})
            </p>
            <p style={{ margin: "0.25rem 0", fontSize: "0.9rem", color: "#047857" }}>
              TeleBirr Billing Number: <strong>{orderReceipt.phone}</strong>
            </p>
            <p style={{ margin: "0.25rem 0", fontSize: "0.9rem", color: "#047857" }}>
              Amount Paid: <strong>{orderReceipt.totalAmount} ETB</strong>
            </p>

            <button
              type="button"
              onClick={handleReset}
              style={{
                marginTop: "1rem",
                padding: "0.55rem 1rem",
                background: "#059669",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Start New Order
            </button>
          </div>
        )}

        {/* State 6: Server Failure Alert Banner */}
        {submissionStatus === "error" && (
          <div
            role="alert"
            aria-live="assertive"
            style={{
              padding: "1rem",
              background: "#fef2f2",
              border: "2px solid #dc2626",
              borderRadius: "8px",
              color: "#991b1b",
              marginBottom: "1.25rem",
              textAlign: "left",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: 700 }}>
              <span aria-hidden="true" style={{ fontSize: "1.2rem" }}>❌</span>
              <span>Checkout Failed</span>
            </div>
            <p style={{ margin: "0.35rem 0 0 0", fontSize: "0.88rem" }}>{errorMessage}</p>
            <small style={{ display: "block", marginTop: "0.4rem", color: "#7f1d1d" }}>
              All your information has been preserved. Please check and try submitting again.
            </small>
          </div>
        )}

        {/* The Checkout Form */}
        {submissionStatus !== "success" && (
          <form onSubmit={handleSubmit} noValidate>
            {/* Field 1: Customer Name */}
            <Field
              ref={fieldRefs.name}
              id="checkout-name"
              name="name"
              label="Full Name"
              placeholder="e.g. Bethlehem Alemayehu"
              value={form.name}
              onChange={handleChange}
              onBlur={() => handleBlur("name")}
              error={errors.name}
              touched={touched.name}
              required
            />

            {/* Field 2: TeleBirr Phone Number */}
            <Field
              ref={fieldRefs.phone}
              id="checkout-phone"
              name="phone"
              type="tel"
              label="TeleBirr Phone Number"
              placeholder="0911223344"
              value={form.phone}
              onChange={handleChange}
              onBlur={() => handleBlur("phone")}
              error={errors.phone}
              touched={touched.phone}
              helpText="Format: 09XXXXXXXX, 07XXXXXXXX, or +2519XXXXXXXX"
              required
            />

            {/* Field 3: Delivery Area */}
            <Field
              ref={fieldRefs.area}
              id="checkout-area"
              name="area"
              as="select"
              label="Delivery Area"
              value={form.area}
              onChange={handleChange}
              onBlur={() => handleBlur("area")}
              error={errors.area}
              touched={touched.area}
              required
            >
              {VALID_DELIVERY_AREAS.map((area) => (
                <option key={area} value={area}>
                  {area} Zone
                </option>
              ))}
            </Field>

            {/* Field 4: Optional Notes */}
            <Field
              ref={fieldRefs.notes}
              id="checkout-notes"
              name="notes"
              as="textarea"
              label="Delivery Notes (Optional)"
              placeholder="Gate code, landmark, or specific instructions for the courier..."
              value={form.notes}
              onChange={handleChange}
              onBlur={() => handleBlur("notes")}
              error={errors.notes}
              touched={touched.notes}
              rows={3}
            />

            {/* Submit Button with Dynamic ETB Label & Disabled State */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: "100%",
                padding: "0.85rem",
                marginTop: "0.5rem",
                background: isSubmitting ? "#9ca3af" : "#b84a2e",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                fontSize: "1rem",
                fontWeight: 700,
                letterSpacing: "0.02em",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.5rem",
                transition: "background 0.2s ease, transform 0.1s ease",
              }}
            >
              {isSubmitting ? (
                <>
                  <span
                    style={{
                      display: "inline-block",
                      width: "16px",
                      height: "16px",
                      border: "2px solid #ffffff",
                      borderTopColor: "transparent",
                      borderRadius: "50%",
                      animation: "spin 0.8s linear infinite",
                    }}
                  />
                  <span>Processing TeleBirr Order ({cartTotal} ETB)...</span>
                </>
              ) : (
                <span>Pay with TeleBirr & Place Order ({cartTotal} ETB)</span>
              )}
            </button>
          </form>
        )}
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
