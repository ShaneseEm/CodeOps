import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCartStore } from "./cartStore";

export default function DishDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Narrow selectors: action and item count
  const addItem = useCartStore((state) => state.addItem);
  const cartTotalItems = useCartStore((state) => state.items.length);

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

  if (notFound || !dish) {
    return (
      <div className="status-box error-box">
        <h2>⚠️ Dish Not Found</h2>
        <p>Could not locate any dish matching &quot;{id}&quot;.</p>
        <Link to="/menu" className="btn-primary" style={{ display: "inline-block", marginTop: "1rem" }}>
          ← Back to Menu
        </Link>
      </div>
    );
  }

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
            <span className="meta-label">Accompaniment</span>
            <span className="meta-value">Fresh Injera</span>
          </div>
          <div className="meta-box">
            <span className="meta-label">Store Status</span>
            <span className="meta-value in-stock">Persisted Store</span>
          </div>
        </div>

        <div className="dish-detail-cta">
          <button
            type="button"
            className="btn-add-large"
            onClick={() => addItem(dish)}
          >
            + Add to Cart
          </button>
          <button
            type="button"
            className="btn-view-cart"
            onClick={() => navigate("/cart")}
          >
            Go to Cart ({cartTotalItems}) 🛒
          </button>
        </div>
      </div>
    </div>
  );
}
