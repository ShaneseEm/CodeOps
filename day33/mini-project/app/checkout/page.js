"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("0911223344");
  const [area, setArea] = useState("Bole");
  const [confirmed, setConfirmed] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setConfirmed(true);
  }

  if (confirmed) {
    return (
      <div className="status-box success-box">
        <h2>🎉 Order Successfully Placed via TeleBirr!</h2>
        <p>Delivery Area: <strong>{area}</strong></p>
        <p>Confirmation message sent to: <strong>{phone}</strong></p>
        <button
          type="button"
          onClick={() => router.push("/menu")}
          className="btn-primary"
          style={{ marginTop: "1rem" }}
        >
          Return to Menu via useRouter
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h2>🔒 Addis Eats Checkout</h2>
      <p style={{ color: "#666", marginBottom: "1.5rem" }}>
        Enter your delivery address and TeleBirr payment number.
      </p>

      <form onSubmit={handleSubmit} className="checkout-form">
        <label className="form-label">
          Delivery Area:
          <select value={area} onChange={(e) => setArea(e.target.value)} className="form-input">
            <option value="Bole">Bole</option>
            <option value="Kazanchis">Kazanchis</option>
            <option value="Piazza">Piazza</option>
            <option value="Sarbet">Sarbet</option>
          </select>
        </label>

        <label className="form-label">
          TeleBirr Phone:
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="form-input"
            required
          />
        </label>

        <button type="submit" className="btn-primary" style={{ width: "100%", padding: "0.8rem", fontSize: "1rem" }}>
          Confirm TeleBirr Payment
        </button>
      </form>
    </div>
  );
}
