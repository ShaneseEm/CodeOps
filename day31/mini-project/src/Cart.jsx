import { Link } from "react-router-dom";
import { useCart } from "./CartProvider";

export default function Cart() {
  const { items, total, removeItem, clearCart } = useCart();

  return (
    <div className="cart-page">
      <div className="cart-page-header">
        <h2>🛒 Your Shopping Cart</h2>
        {items.length > 0 && (
          <button type="button" className="btn-clear-cart" onClick={clearCart}>
            Clear Cart
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <p>Your cart is empty. Explore our authentic Ethiopian menu to add dishes!</p>
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
                    onClick={() => removeItem(item.id, item._instanceId)}
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
              <span>Total Dishes:</span>
              <strong>{items.length}</strong>
            </div>
            <div className="summary-row total-highlight">
              <span>Subtotal:</span>
              <strong>{total} ETB</strong>
            </div>

            <Link to="/checkout" className="btn-checkout-link">
              Proceed to Checkout 🔒
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
