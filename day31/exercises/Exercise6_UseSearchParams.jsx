import { BrowserRouter, useSearchParams } from "react-router-dom";

/**
 * Exercise 6: Move the category filter into the query string with useSearchParams.
 *
 * ADVANTAGES OF QUERY STRING FILTERING:
 * 1. Shareability: A user can copy `/menu?category=Vegan` and send it to a friend.
 * 2. Bookmarking: Users can bookmark specific filtered states.
 * 3. Browser History: Forward/back browser buttons cycle through filter selections.
 */
function SearchParamsDemo() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get("category") || "All";

  const categories = ["All", "Main", "Vegan", "Grill"];

  function handleSelect(cat) {
    if (cat === "All") {
      searchParams.delete("category");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  }

  return (
    <div style={{ padding: "1rem", background: "#f8f9fa", borderRadius: "8px" }}>
      <h4>Active Filter in Query String: <code>category={currentCategory}</code></h4>
      <div style={{ display: "flex", gap: "0.5rem", margin: "1rem 0" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleSelect(cat)}
            style={{
              padding: "0.4rem 1rem",
              borderRadius: "999px",
              border: "2px solid #b84a2e",
              background: cat.toLowerCase() === currentCategory.toLowerCase() ? "#b84a2e" : "transparent",
              color: cat.toLowerCase() === currentCategory.toLowerCase() ? "#fff" : "#b84a2e",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {cat}
          </button>
        ))}
      </div>
      <p>
        Observe the URL query parameters update dynamically without full page reloads!
      </p>
    </div>
  );
}

export default function Exercise6_UseSearchParams() {
  return (
    <div className="exercise-card">
      <h3>Exercise 6: Query String Filtering via useSearchParams</h3>
      <BrowserRouter>
        <SearchParamsDemo />
      </BrowserRouter>
    </div>
  );
}
