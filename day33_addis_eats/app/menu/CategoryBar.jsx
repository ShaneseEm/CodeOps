import Link from "next/link";

const CATEGORIES = ["All", "Main", "Vegan", "Grill"];

/**
 * Exercise 4 & Requirement: Colocated CategoryBar inside app/menu/
 * Demonstrably not routable because it is named CategoryBar.jsx (not page.js).
 */
export default function CategoryBar({ activeCategory = "All" }) {
  return (
    <div className="category-bar">
      {CATEGORIES.map((cat) => {
        const isActive = cat.toLowerCase() === activeCategory.toLowerCase();
        const href = cat === "All" ? "/menu" : `/menu?category=${encodeURIComponent(cat)}`;

        return (
          <Link
            key={cat}
            href={href}
            className={`cat-pill ${isActive ? "active" : ""}`}
          >
            {cat}
          </Link>
        );
      })}
    </div>
  );
}
