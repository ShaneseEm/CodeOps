import { useState } from "react";

/**
 * Exercise 7: Add paging with the page number in the query string,
 * then write DATA.md.
 *
 * SWR Query Key: `/api/dishes?page=${pageNumber}&limit=4`
 * Query string is linkable and shareable (e.g. `/menu?page=2`).
 */
const ALL_DISHES = [
  { id: 1, name: "Doro Wat", price: 380, page: 1 },
  { id: 2, name: "Kitfo Special", price: 420, page: 1 },
  { id: 3, name: "Beyaynetu", price: 290, page: 1 },
  { id: 4, name: "Tibs Tegabino", price: 350, page: 1 },
  { id: 5, name: "Shiro Mitten", price: 220, page: 2 },
  { id: 6, name: "Mango Spris", price: 110, page: 2 },
  { id: 7, name: "Zilzil Tibs", price: 370, page: 2 },
  { id: 8, name: "Derek Tibs", price: 360, page: 2 },
];

export default function Exercise7_PagedDishList() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 2;

  const currentDishes = ALL_DISHES.filter((d) => d.page === currentPage);
  const activeKey = `/api/dishes?page=${currentPage}&limit=4`;

  return (
    <div style={{ maxWidth: "540px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h3>Exercise 7: Paged Dish List with Query String</h3>
      <p style={{ color: "#666", fontSize: "0.9rem" }}>
        Page numbers sync directly to the query string (<code>?page={currentPage}</code>) and SWR key. Shareable and linkable.
      </p>

      <div style={{ background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "1rem", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
          <strong>URL Query String:</strong>
          <code style={{ background: "#f1f5f9", padding: "0.2rem 0.5rem", borderRadius: "4px", color: "#0f766e" }}>
            ?page={currentPage}
          </code>
        </div>

        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1rem 0" }}>
          {currentDishes.map((dish) => (
            <li
              key={dish.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0.5rem 0",
                borderBottom: "1px solid #f1f5f9",
              }}
            >
              <span>{dish.name}</span>
              <strong>{dish.price} ETB</strong>
            </li>
          ))}
        </ul>

        {/* Pagination Controls */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.5rem", borderTop: "1px solid #e2e8f0" }}>
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            style={{
              padding: "0.4rem 0.8rem",
              background: currentPage === 1 ? "#f1f5f9" : "#1f2937",
              color: currentPage === 1 ? "#94a3b8" : "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
            }}
          >
            ← Previous
          </button>

          <span style={{ fontSize: "0.85rem", color: "#64748b" }}>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            style={{
              padding: "0.4rem 0.8rem",
              background: currentPage === totalPages ? "#f1f5f9" : "#1f2937",
              color: currentPage === totalPages ? "#94a3b8" : "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            }}
          >
            Next →
          </button>
        </div>
      </div>

      <div style={{ marginTop: "0.75rem", fontSize: "0.8rem", color: "#64748b" }}>
        🔑 Active SWR Key: <code>{activeKey}</code>
      </div>
    </div>
  );
}
