import { useState } from "react";
import { validate } from "./Exercise3_PureValidate";

/**
 * Exercise 6: Add a submitting flag, disable the button,
 * and put the ETB total in its label.
 */
export default function Exercise6_SubmittingState() {
  const [form, setForm] = useState({
    name: "Abebe Bikila",
    phone: "0911223344",
    area: "Bole",
    notes: "Leave at front desk",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const orderTotalETB = 550; // Dynamic or fixed cart order total in ETB
  const errors = validate(form);
  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid || isSubmitting) return;

    setIsSubmitting(true);
    // Simulate async network request
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setOrderComplete(true);
  };

  return (
    <div style={{ maxWidth: "480px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h3>Exercise 6: Submitting Flag & ETB Total</h3>
      <p style={{ color: "#666", fontSize: "0.9rem" }}>
        While submitting, the submit button is disabled to prevent duplicate submissions, and the label displays the ETB total.
      </p>

      {orderComplete ? (
        <div style={{ padding: "1rem", background: "#f0fdf4", border: "1px solid #86efac", borderRadius: "6px" }}>
          <h4>🎉 Order Placed!</h4>
          <p>Total Paid: {orderTotalETB} ETB</p>
          <button
            onClick={() => setOrderComplete(false)}
            style={{ padding: "0.5rem 1rem", background: "#15803d", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
          >
            Reset
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label style={{ display: "block", fontWeight: 600 }}>Customer Name:</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontWeight: 600 }}>TeleBirr Phone:</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
            />
          </div>

          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            style={{
              padding: "0.75rem 1.25rem",
              background: isSubmitting ? "#9ca3af" : isValid ? "#b84a2e" : "#d1d5db",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: isValid && !isSubmitting ? "pointer" : "not-allowed",
              transition: "all 0.2s ease",
            }}
          >
            {isSubmitting
              ? `Processing Order (${orderTotalETB} ETB)...`
              : `Pay & Place Order (${orderTotalETB} ETB)`}
          </button>
        </form>
      )}
    </div>
  );
}
