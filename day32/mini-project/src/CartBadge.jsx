import { Link } from "react-router-dom";
import { useCartStore } from "./cartStore";

/**
 * CartBadge Component
 *
 * Implements:
 * - Narrow Zustand selector: `useCartStore(s => s.items.length)`
 * - NEVER calls bare `useCartStore()`
 * - Only re-renders when itemCount or total changes
 */
export default function CartBadge() {
  // Narrow selectors: only re-render when count or total changes
  const itemCount = useCartStore((state) => state.items.length);
  const total = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + (item.price || 0), 0)
  );

  return (
    <Link to="/cart" className="cart-badge-btn" aria-label="Shopping Cart">
      <span className="cart-icon" aria-hidden="true">🛒</span>
      <span className="cart-count-pill">{itemCount}</span>
      {itemCount > 0 && <span className="cart-total-pill">{total} ETB</span>}
    </Link>
  );
}
