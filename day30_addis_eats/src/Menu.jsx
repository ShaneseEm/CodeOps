import { useState, useEffect, useRef, useCallback } from "react";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import { useFetch } from "./useFetch";
import { useCart } from "./CartProvider";

const CATEGORIES = ["All", "Main", "Vegan", "Grill"];

/**
 * Menu Component - Addis Eats Assembled
 *
 * Implements:
 * - `useFetch` hook handling data, loading, and error states with cancellation
 * - `useCart` context for dispatching item additions without prop drilling
 * - Memoized `onAddDish` via `useCallback` paired with `React.memo(Dish)`
 * - Autofocused search bar on mount via `useRef`
 * - Dynamic `document.title` showing dish count
 */
export default function Menu() {
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const searchInputRef = useRef(null);

  // Consume cart context
  const { items: cartItems, addItem } = useCart();

  // 1. Requirement: Use custom useFetch hook with category in query
  const endpoint =
    category && category !== "All"
      ? `/dishes.json?category=${encodeURIComponent(category)}`
      : `/dishes.json`;

  const { data: rawDishes, loading, error } = useFetch(endpoint, [category]);

  // Autofocus search on mount
  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  /**
   * PERFORMANCE JUSTIFICATION FOR useCallback:
   * `handleAddDish` is passed down through `DishList` to each `Dish` card.
   * Because `Dish` is wrapped in `React.memo`, passing an inline arrow function
   * would generate a new function reference on every re-render (e.g. while typing in search),
   * destroying `React.memo`'s optimization.
   * `useCallback` preserves function identity as long as `addItem` is stable.
   */
  const handleAddDish = useCallback(
    (dish) => {
      addItem(dish);
    },
    [addItem]
  );

  // Filter raw dishes by category and search term
  const dishes = Array.isArray(rawDishes) ? rawDishes : [];

  const displayedDishes = dishes.filter((dish) => {
    // Client-side category safety filter if JSON is static
    const matchesCategory =
      category === "All" ||
      dish.category.toLowerCase() === category.toLowerCase();

    const query = searchTerm.trim().toLowerCase();
    const matchesSearch =
      !query ||
      dish.name.toLowerCase().includes(query) ||
      (dish.description && dish.description.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  // Sync document.title
  useEffect(() => {
    const count = displayedDishes.length;
    document.title = `Addis Eats (${count} dish${count === 1 ? "" : "es"})`;
  }, [displayedDishes.length]);

  return (
    <section className="menu-section">
      <div className="menu-toolbar">
        {/* Search input focused on mount */}
        <div className="search-box">
          <span className="search-icon" aria-hidden="true">🔍</span>
          <input
            ref={searchInputRef}
            type="search"
            className="search-input"
            placeholder="Search Ethiopian dishes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search dishes"
          />
          {searchTerm && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category bar to drive new requests */}
        <CategoryBar
          categories={CATEGORIES}
          selected={category}
          onSelect={(newCategory) => setCategory(newCategory)}
        />
      </div>

      {/* Dish list with early returns for all 3 states */}
      <DishList
        dishes={displayedDishes}
        loading={loading}
        error={error}
        cartItems={cartItems}
        onAddDish={handleAddDish}
      />
    </section>
  );
}
