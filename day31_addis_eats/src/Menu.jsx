import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCart } from "./CartProvider";

const CATEGORIES = ["All", "Main", "Vegan", "Grill"];

/**
 * Menu Component with Shareable Query String Filter
 *
 * Implements:
 * - Query string synchronization with `useSearchParams()`
 * - `/menu?category=Vegan` is shareable and loads filtered view on mount
 * - Links to individual dish screens (`/menu/:id`)
 * - "+ Add to Cart" updates global CartContext
 */
export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "All";

  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { addItem, items: cartItems } = useCart();

  // Load menu from public/dishes.json
  useEffect(() => {
    async function loadDishes() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/dishes.json");
        if (!res.ok) throw new Error(`Could not load dishes: ${res.status}`);
        const data = await res.json();
        setDishes(data);
      } catch (err) {
        setError(err.message || "Failed to load dishes");
      } finally {
        setLoading(false);
      }
    }
    loadDishes();
  }, []);

  function handleCategoryChange(cat) {
    if (cat === "All") {
      // Remove query param for default view
      searchParams.delete("category");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  }

  // Filter dishes by active category from searchParams and search query
  const filteredDishes = dishes.filter((dish) => {
    const matchesCategory =
      activeCategory === "All" ||
      dish.category.toLowerCase() === activeCategory.toLowerCase();

    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      dish.name.toLowerCase().includes(q) ||
      (dish.description && dish.description.toLowerCase().includes(q));

    return matchesCategory && matchesQuery;
  });

  // Calculate counts in cart
  const itemCounts = cartItems.reduce((acc, item) => {
    acc[item.id] = (acc[item.id] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="menu-page">
      <div className="menu-header">
        <h2>Addis Eats Menu</h2>
        <p>Select a category or search your favorite Ethiopian delicacy</p>
      </div>

      <div className="menu-controls">
        {/* Search input */}
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="search"
            className="search-input"
            placeholder="Search dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category pills powered by useSearchParams */}
        <div className="category-nav">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`cat-btn ${cat.toLowerCase() === activeCategory.toLowerCase() ? "active" : ""}`}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="status-box loading-box">
          <div className="spinner"></div>
          <p className="loading-state">Loading fresh menu items...</p>
        </div>
      )}

      {error && (
        <div className="status-box error-box">
          <p className="err">⚠️ {error}</p>
        </div>
      )}

      {!loading && !error && filteredDishes.length === 0 && (
        <div className="empty-state">
          <p>No dishes found in category &quot;{activeCategory}&quot;.</p>
        </div>
      )}

      {!loading && !error && filteredDishes.length > 0 && (
        <div className="menu-grid">
          {filteredDishes.map((dish) => (
            <div key={dish.id} className="card dish-card">
              <div className="dish-card-body">
                <div className="dish-card-title-row">
                  <h3>{dish.name}</h3>
                  {dish.spicy && <span className="badge-spicy">🌶 Spicy</span>}
                  {itemCounts[dish.id] > 0 && (
                    <span className="badge-count">×{itemCounts[dish.id]}</span>
                  )}
                </div>
                <p className="dish-description">{dish.description}</p>
                <div className="dish-footer">
                  <span className="dish-price">{dish.price} ETB</span>
                  <div className="dish-actions">
                    <Link to={`/menu/${dish.id}`} className="btn-details">
                      Details ↗
                    </Link>
                    <button
                      type="button"
                      className="btn-add"
                      onClick={() => addItem(dish)}
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
