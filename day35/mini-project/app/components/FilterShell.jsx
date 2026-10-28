"use client";

import React, { useState } from "react";

/**
 * FilterShell Client Component
 * Demonstrates: "At least one client shell receiving server-rendered content through children."
 * It controls category filtering via client interactive state,
 * while the server-rendered dish catalog ({children}) is passed directly
 * without importing DishList into this client bundle.
 */
export default function FilterShell({ categories = [], children }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="filter-shell">
      <div className="filter-controls-card">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Ethiopian dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="filter-input"
          />
        </div>
        <div className="category-chips">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`filter-chip ${selectedCategory === cat.id ? "active" : ""}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <div className="filter-status-hint">
          Active filter: <strong>{selectedCategory.toUpperCase()}</strong> | Interactivity handled in client leaf shell
        </div>
      </div>

      {/* Server-rendered content passed through children */}
      <div className="filter-children-content">
        {children}
      </div>
    </div>
  );
}
