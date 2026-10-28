import { Link } from "react-router-dom";
import { useCartStore } from "./cartStore";

export default function Cart() {
  // Narrow selectors: strictly subscribe to what is needed
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + (item.price || 0), 0)
  );
  const remove = useCartStore((state) => state.remove);
  const clear = useCartStore((state) => state.clear);

  return (
    <div className="cart-page">
      <div className="cart-page-header">
        <h2>🛒 Your Shopping Cart (Zustand Store)</h2>
        {items.length > 0 && (
          <button type="button" className="btn-clear-cart" onClick={clear}>
            Clear Cart
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <p>Your cart is empty. The persistent Zustand store is ready!</p>
          <Link to="/menu" className="btn-primary" style={{ display: "inline-block", marginTop: "1rem" }}>
            Browse Menu
          </Link>
        </div>
      ) : (
        <div className="cart-content-layout">
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
                    onClick={() => remove(item.id, item._instanceId)}
                    aria-label={`Remove ${item.name}`}
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-summary-card">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Items in Store:</span>
              <strong>{items.length}</strong>
            </div>
            <div className="summary-row total-highlight">
              <span>Derived Subtotal:</span>
              <strong>{total} ETB</strong>
            </div>
            <p style={{ fontSize: "0.82rem", color: "#666", marginTop: "0.5rem" }}>
              💾 Saved in <code>localStorage</code> via persist middleware. Refreshing won&apos;t lose your order!
            </p>

            <Link to="/checkout" className="btn-checkout-link">
              Proceed to Checkout 🔒
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
