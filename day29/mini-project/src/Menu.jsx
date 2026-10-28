import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import { fetchDishes } from "./api";

const CATEGORIES = ["All", "Main", "Vegan", "Grill"];

/**
 * Menu Component - The Menu That Loads Itself
 *
 * Implements:
 * - Dishes loaded in useEffect and stored in state (no hard-coded array)
 * - Category dependency array: switching category drives a new request
 * - AbortController cancellation in cleanup so switching quickly cancels stale requests
 * - res.ok checked in api.js with clear user-facing error message
 * - Separate loading and error state with setLoading(false) in a finally block
 * - Search input focused on mount with useRef
 * - document.title synced with the count of dishes currently shown
 */
export default function Menu({ onAddDish = () => {} }) {
  // 1. Component State
  const [category, setCategory] = useState("All");
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // 2. Ref for search input
  const searchInputRef = useRef(null);

  /**
   * Exercise 7 & Requirement: Focus search input on mount with useRef.
   *
   * WHY THE FOCUS CALL HAS TO BE INSIDE AN EFFECT:
   * During the render phase, React calculates the component output and virtual DOM.
   * The actual browser DOM node does NOT exist or is not yet attached to the document,
   * meaning searchInputRef.current is still `null` (or points to an uncommitted node).
   * Attempting to call `.focus()` during render would cause a runtime error
   * (e.g. Cannot read properties of null) or fail silently.
   * `useEffect` runs asynchronously AFTER the component mounts and the DOM node
   * has been attached and painted, ensuring searchInputRef.current is valid.
   */
  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  /**
   * Exercise 2, 3, 4, 5, 6 & Requirements:
   * - Fetch dishes from /dishes.json
   * - Category in dependency array so changing category refetches
   * - AbortController cancels in-flight requests on category switch or unmount
   * - setLoading(false) in finally block ensures spinner never gets stuck
   * - res.ok checked with friendly error message
   */
  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchDishes(category, controller.signal);
        setDishes(data);
      } catch (err) {
        // AbortError is expected when switching rapidly; do not show error screen
        if (err.name === "AbortError") {
          return;
        }
        setError(err.message || "Could not load the menu. Please try again.");
      } finally {
        // Only mark loading false if this fetch was not aborted by a newer one
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    load();

    // Cleanup: cancel the in-flight request when category changes or component unmounts
    return () => {
      controller.abort();
    };
  }, [category]);

  // Derived filtered dishes based on user search query
  const displayedDishes = dishes.filter((dish) => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return true;
    return (
      dish.name.toLowerCase().includes(query) ||
      (dish.description && dish.description.toLowerCase().includes(query))
    );
  });

  /**
   * Exercise 1: Set document.title to the number of dishes currently shown,
   * updating whenever the list changes (category change or search query change).
   */
  useEffect(() => {
    const count = displayedDishes.length;
    document.title = `Addis Eats (${count} dish${count === 1 ? "" : "es"})`;
  }, [displayedDishes.length]);

  return (
    <section className="menu-section">
      <div className="menu-toolbar">
        {/* Search input focused on mount via useRef */}
        <div className="search-box">
          <span className="search-icon" aria-hidden="true">🔍</span>
          <input
            ref={searchInputRef}
            type="search"
            className="search-input"
            placeholder="Search dishes (e.g. Tibs, Shiro, Kitfo)..."
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
          onSelect={(newCat) => {
            setCategory(newCat);
          }}
        />
      </div>

      {/* Dish list with early returns for loading, error, and empty state */}
      <DishList
        dishes={displayedDishes}
        loading={loading}
        error={error}
        onAddDish={onAddDish}
      />
    </section>
  );
}

Menu.propTypes = {
  onAddDish: PropTypes.func,
};
