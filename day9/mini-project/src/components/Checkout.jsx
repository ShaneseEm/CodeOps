import { useState } from "react";

export default function Checkout({ cartTotal, cartItems = [], onComplete, onBack }) {
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("Bole");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    if (onComplete) onComplete();
  };

  return (
    <div style={{ maxWidth: "520px", margin: "0 auto", backgroundColor: "#fff", padding: "1.75rem", borderRadius: "10px", border: "1px solid #e5e7eb" }}>
      <button
        type="button"
        onClick={onBack}
        style={{ background: "none", border: "none", color: "#6b7280", cursor: "pointer", marginBottom: "1rem", padding: 0 }}
      >
        ← Back to Menu
      </button>

      <h2 style={{ margin: "0 0 1rem 0" }}>🔒 Checkout &amp; TeleBirr Payment</h2>
      <p style={{ color: "#4b5563", fontSize: "0.9rem" }}>
        Order Total: <strong>{cartTotal} ETB</strong> ({cartItems.length} items)
      </p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <label htmlFor="chk-phone" style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>
            TeleBirr Phone Number:
          </label>
          <input
            id="chk-phone"
            type="tel"
            required
            placeholder="0911223344"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", border: "1px solid #d1d5db", boxSizing: "border-box" }}
          />
        </div>

        <div>
          <label htmlFor="chk-area" style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>
            Delivery Zone:
          </label>
          <select
            id="chk-area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", border: "1px solid #d1d5db", boxSizing: "border-box" }}
          >
            <option value="Bole">Bole</option>
            <option value="Kazanchis">Kazanchis</option>
            <option value="Megenagna">Megenagna</option>
            <option value="Piassa">Piassa</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={submitting}
          style={{
            padding: "0.8rem",
            backgroundColor: submitting ? "#9ca3af" : "#b84a2e",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontWeight: 700,
            cursor: submitting ? "not-allowed" : "pointer",
          }}
        >
          {submitting ? "Authorizing TeleBirr..." : `Pay ${cartTotal} ETB & Confirm Order`}
        </button>
      </form>
    </div>
  );
}
