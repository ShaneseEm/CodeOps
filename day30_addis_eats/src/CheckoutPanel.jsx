import { useState } from "react";
import { useCart } from "./CartProvider";

/**
 * CheckoutPanel Component
 *
 * Implements:
 * - Reads items, total, removeItem, clearCart via useContext (useCart) — NO prop drilling!
 * - Displays itemized list with individual removal
 * - Shows derived total in ETB
 * - Controlled TeleBirr checkout form
 */
export default function CheckoutPanel() {
  const { items, total, removeItem, clearCart } = useCart();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "Bole",
  });
  const [submitted, setSubmitted] = useState(false);

  // Live TeleBirr phone validation regex
  const isPhoneValid = /^(09\d{8}|\+2519\d{8})$/.test(form.phone.trim());
  const isFormValid = form.name.trim().length >= 2 && isPhoneValid && items.length > 0;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!isFormValid) return;
    setSubmitted(true);
    clearCart();
  }

  if (submitted) {
    return (
      <section className="checkout-panel success-box" id="checkout">
        <h2>🎉 Order Placed Successfully!</h2>
        <p>Thank you, <strong>{form.name}</strong>! Your order has been placed via TeleBirr.</p>
        <p>Delivery Area: <strong>{form.area}</strong> | Confirmation sent to <strong>{form.phone}</strong>.</p>
        <button
          type="button"
          className="btn-primary"
          onClick={() => {
            setSubmitted(false);
            setForm({ name: "", phone: "", area: "Bole" });
          }}
        >
          Place Another Order
        </button>
      </section>
    );
  }

  return (
    <section className="checkout-panel" id="checkout">
      <div className="checkout-header">
        <h2>🛍️ Your Order Summary</h2>
        {items.length > 0 && (
          <button type="button" className="btn-clear-cart" onClick={clearCart}>
            Clear Cart
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <p className="empty-cart-msg">Your cart is currently empty. Add dishes from the menu above!</p>
      ) : (
        <>
          <ul className="cart-items-list">
            {items.map((item, idx) => (
              <li key={item._instanceId || `${item.id}-${idx}`} className="cart-item-row">
                <div className="cart-item-info">
                  <span className="cart-item-name">{item.name}</span>
                  <span className="cart-item-cat">({item.category})</span>
                </div>
                <div className="cart-item-right">
                  <span className="cart-item-price">{item.price} ETB</span>
                  <button
                    type="button"
                    className="btn-remove-item"
                    onClick={() => removeItem(item.id, item._instanceId)}
                    aria-label={`Remove ${item.name}`}
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="checkout-total-row">
            <span>Derived Total:</span>
            <strong>{total} ETB</strong>
          </div>

          <form className="checkout-form" onSubmit={handleSubmit}>
            <h3>Delivery & Payment (TeleBirr)</h3>

            <label className="form-label">
              Full Name:
              <input
                type="text"
                name="name"
                className="form-input"
                placeholder="Abebe Bikila"
                value={form.name}
                onChange={handleChange}
                required
              />
            </label>

            <label className="form-label">
              TeleBirr Phone (09... or +2519...):
              <input
                type="tel"
                name="phone"
                className={`form-input ${form.phone && !isPhoneValid ? "input-error" : ""}`}
                placeholder="0911223344"
                value={form.phone}
                onChange={handleChange}
                required
              />
              {form.phone && !isPhoneValid && (
                <span className="error-hint">Must start with 09 or +2519 followed by 8 digits</span>
              )}
            </label>

            <label className="form-label">
              Delivery Area:
              <select name="area" className="form-input" value={form.area} onChange={handleChange}>
                <option value="Bole">Bole</option>
                <option value="Kazanchis">Kazanchis</option>
                <option value="Piazza">Piazza</option>
                <option value="Sarbet">Sarbet</option>
                <option value="Mexico">Mexico</option>
                <option value="CMC">CMC</option>
              </select>
            </label>

            <button type="submit" className="btn-submit" disabled={!isFormValid}>
              Complete Order ({total} ETB)
            </button>
          </form>
        </>
      )}
    </section>
  );
}
