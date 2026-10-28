import { useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "./cartStore";
import { useAuth } from "./useAuth";

export default function Checkout() {
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + (item.price || 0), 0)
  );
  const clear = useCartStore((state) => state.clear);

  const { user } = useAuth();

  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("Bole");
  const [ordered, setOrdered] = useState(false);

  const isPhoneValid = /^(09\d{8}|\+2519\d{8})$/.test(phone.trim());
  const canSubmit = isPhoneValid && items.length > 0;

  function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    setOrdered(true);
    clear();
  }

  if (ordered) {
    return (
      <div className="checkout-page success-box">
        <h2>🎉 Order Placed Successfully!</h2>
        <p>
          Thank you, <strong>{user?.username}</strong>! Your order is confirmed.
        </p>
        <p>
          Delivery Area: <strong>{area}</strong> | Confirmation sent to <strong>{phone}</strong>.
        </p>
        <div style={{ marginTop: "1.5rem" }}>
          <Link to="/menu" className="btn-primary">
            Order More Dishes
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="checkout-page empty-state">
        <h2>Your Cart is Empty</h2>
        <p>Please add dishes to your cart before proceeding to checkout.</p>
        <Link to="/menu" className="btn-primary" style={{ display: "inline-block", marginTop: "1rem" }}>
          Go to Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h2>🔒 Secure Checkout (TeleBirr)</h2>
      <p className="checkout-auth-info">
        Signed in as: <strong>{user?.username}</strong> ({user?.role})
      </p>

      <div className="checkout-grid">
        <div className="checkout-form-container">
          <form onSubmit={handleSubmit} className="checkout-form">
            <label className="form-label">
              Delivery Area:
              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="form-input"
              >
                <option value="Bole">Bole</option>
                <option value="Kazanchis">Kazanchis</option>
                <option value="Piazza">Piazza</option>
                <option value="Sarbet">Sarbet</option>
                <option value="Mexico">Mexico</option>
                <option value="CMC">CMC</option>
              </select>
            </label>

            <label className="form-label">
              TeleBirr Number (09... or +2519...):
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0911223344"
                className={`form-input ${phone && !isPhoneValid ? "input-error" : ""}`}
                required
              />
              {phone && !isPhoneValid && (
                <span className="error-hint">Format: 09XXXXXXXX or +2519XXXXXXXX</span>
              )}
            </label>

            <button type="submit" className="btn-submit" disabled={!canSubmit}>
              Pay with TeleBirr ({total} ETB)
            </button>
          </form>
        </div>

        <div className="checkout-cart-summary">
          <h3>Order Details ({items.length} items)</h3>
          <ul>
            {items.map((it, idx) => (
              <li key={idx} className="checkout-mini-row">
                <span>{it.name}</span>
                <strong>{it.price} ETB</strong>
              </li>
            ))}
          </ul>
          <div className="checkout-mini-total">
            <span>Total:</span>
            <strong>{total} ETB</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
