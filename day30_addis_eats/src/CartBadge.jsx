import { useCart } from "./CartProvider";

/**
 * CartBadge Component
 *
 * Implements:
 * - Reads cart state directly via `useCart()` context hook
 * - Zero prop drilling from parent components
 * - Displays live item count with animated indicator
 */
export default function CartBadge({ onOpenCart }) {
  const { itemCount, total } = useCart();

  return (
    <button
      type="button"
      className="cart-badge-btn"
      onClick={onOpenCart}
      aria-label={`Shopping cart with ${itemCount} items`}
    >
      <span className="cart-icon" aria-hidden="true">🛒</span>
      <span className="cart-label">Cart</span>
      <span className={`cart-count-pill ${itemCount > 0 ? "active" : ""}`}>
        {itemCount}
      </span>
      {itemCount > 0 && (
        <span className="cart-badge-total">{total} ETB</span>
      )}
    </button>
  );
}
