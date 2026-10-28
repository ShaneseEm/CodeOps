import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCart } from "./CartProvider";

/**
 * DishDetail Component
 * Dynamic route screen for `/menu/:id`
 *
 * Implements:
 * - Reads `:id` from route via `useParams()`
 * - Handles invalid/non-existent IDs (e.g. `/menu/not-a-dish`) without crashing
 * - Displays complete dish information and allows adding to cart
 * - Back button navigating to menu
 */
export default function DishDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, items: cartItems } = useCart();

  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchDish() {
      setLoading(true);
      setNotFound(false);
      try {
        const res = await fetch("/dishes.json");
        if (!res.ok) throw new Error("Could not load dishes");
        const list = await res.json();

        // Check if ID matches numeric or string ID
        const matched = list.find((d) => String(d.id) === String(id));
        if (matched) {
          setDish(matched);
        } else {
          setNotFound(true);
        }
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    fetchDish();
  }, [id]);

  if (loading) {
    return (
      <div className="status-box loading-box">
        <div className="spinner"></div>
        <p className="loading-state">Loading dish details...</p>
      </div>
    );
  }

  // Requirement: Does /menu/not-a-dish say the dish was not found rather than crashing?
  if (notFound || !dish) {
    return (
      <div className="status-box error-box not-found-dish-box">
        <h2>⚠️ Dish Not Found</h2>
        <p>
          We searched our kitchen, but could not find any dish matching{" "}
          <strong>&quot;{id}&quot;</strong>.
        </p>
        <Link to="/menu" className="btn-primary" style={{ display: "inline-block", marginTop: "1rem" }}>
          ← Back to Menu
        </Link>
      </div>
    );
  }

  const inCartCount = cartItems.filter((item) => item.id === dish.id).length;

  return (
    <div className="dish-detail-container">
      <nav className="breadcrumbs">
        <Link to="/menu">← Back to Menu</Link>
      </nav>

      <div className="dish-detail-card">
        <div className="dish-detail-header">
          <h2>{dish.name}</h2>
          <span className="dish-detail-category">{dish.category}</span>
          {dish.spicy && <span className="badge-spicy">🌶 Spicy Berbere</span>}
        </div>

        <p className="dish-detail-desc">{dish.description}</p>

        <div className="dish-detail-meta">
          <div className="meta-box">
            <span className="meta-label">Price</span>
            <span className="meta-value">{dish.price} ETB</span>
          </div>
          <div className="meta-box">
            <span className="meta-label">Includes</span>
            <span className="meta-value">Fresh Teff Injera</span>
          </div>
          <div className="meta-box">
            <span className="meta-label">Status</span>
            <span className="meta-value in-stock">Ready to serve</span>
          </div>
        </div>

        <div className="dish-detail-cta">
          <button
            type="button"
            className="btn-add-large"
            onClick={() => addItem(dish)}
          >
            + Add to Cart {inCartCount > 0 ? `(${inCartCount} in cart)` : ""}
          </button>
          <button
            type="button"
            className="btn-view-cart"
            onClick={() => navigate("/cart")}
          >
            Go to Cart ({cartItems.length}) 🛒
          </button>
        </div>
      </div>
    </div>
  );
}
