import { Suspense } from "react";
import DishList from "./DishList";
import FilterShell from "../components/FilterShell";

export const metadata = {
  title: "Addis Eats - Authentic Ethiopian Menu",
  description: "Browse authentic Ethiopian delicacies pre-rendered as Server Components.",
};

const CATEGORIES = [
  { id: "all", label: "All Items" },
  { id: "traditional", label: "Traditional" },
  { id: "meat", label: "Meat Specialties" },
  { id: "vegan", label: "Vegetarian / Vegan" },
  { id: "beverage", label: "Beverages & Coffee" },
];

function DishSkeleton() {
  return (
    <div className="dish-grid">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="dish-card skeleton-card">
          <div className="skeleton-line title" />
          <div className="skeleton-line desc" />
          <div className="skeleton-line price" />
        </div>
      ))}
    </div>
  );
}

/**
 * MenuPage - Async Server Component
 * 1. Converted to an async server component that awaits its dishes.
 * 2. Removed useFetch hook, loading states, and error states.
 * 3. Wraps the server DishList in a client FilterShell using children rather than an import.
 * 4. Zero callback props passed across the server-to-client boundary!
 */
export default async function MenuPage() {
  return (
    <div className="menu-page">
      <div className="menu-header">
        <h1>Traditional Ethiopian Menu</h1>
        <p className="subtitle">
          Served with fresh sourdough injera and authentic spice blends.
        </p>
      </div>

      {/* Wrapping the server DishList in client FilterShell using {children} */}
      <FilterShell categories={CATEGORIES}>
        <Suspense fallback={<DishSkeleton />}>
          <DishList />
        </Suspense>
      </FilterShell>
    </div>
  );
}
