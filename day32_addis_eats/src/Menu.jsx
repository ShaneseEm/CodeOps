import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCartStore } from "./cartStore";

const CATEGORIES = ["All", "Main", "Vegan", "Grill"];

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "All";

  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Narrow selector: only selects addItem action (stable reference)
  const addItem = useCartStore((state) => state.addItem);

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
      searchParams.delete("category");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  }

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

  return (
    <div className="menu-page">
      <div className="menu-header">
        <h2>Addis Eats Menu</h2>
        <p>Freshly fetched dishes backed by a persistent Zustand cart store</p>
      </div>

      <div className="menu-controls">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="search"
            className="search-input"
            placeholder="Search Ethiopian dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

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
          <p className="loading-state">Loading menu items...</p>
        </div>
      )}

      {error && (
        <div className="status-box error-box">
          <p className="err">⚠️ {error}</p>
        </div>
      )}

      {!loading && !error && filteredDishes.length === 0 && (
        <div className="empty-state">
          <p>No dishes found matching &quot;{activeCategory}&quot;.</p>
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
