import Link from "next/link";
import DishList from "./DishList";
import CategoryBar from "./CategoryBar";
import dishesData from "../../public/dishes.json";

export default function MenuPage({ searchParams }) {
  // Read category from searchParams prop provided by Next.js Server Components
  const activeCategory = searchParams?.category || "All";

  // Demonstrate error.js trigger if user passes error query param
  if (searchParams?.simulateError === "true") {
    throw new Error("Simulated Server Error in Menu Segment! Caught by error.js.");
  }

  const filtered =
    activeCategory === "All"
      ? dishesData
      : dishesData.filter(
          (d) => d.category.toLowerCase() === activeCategory.toLowerCase()
        );

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h2>Addis Eats Menu</h2>
        <p>Browse authentic dishes served with fresh teff injera</p>
      </div>

      {/* Colocated CategoryBar */}
      <CategoryBar activeCategory={activeCategory} />

      {/* Trigger simulated error button */}
      <div style={{ margin: "1rem 0" }}>
        <Link
          href="/menu?simulateError=true"
          style={{ fontSize: "0.85rem", color: "#c53030", textDecoration: "underline" }}
        >
          ⚠️ Test error.js (click to trigger simulated server error)
        </Link>
      </div>

      {/* Colocated DishList */}
      <DishList dishes={filtered} activeCategory={activeCategory} />
    </div>
  );
}
