import { Suspense } from "react";
import DishList from "./DishList";
import FilterShell from "../components/FilterShell";

/**
 * Exercise 2 & Mini-Project Static Route Metadata:
 * - Distinct, human-readable title and description written for people
 * - Canonical URL points to /menu regardless of query parameters (?category=Vegan, ?spicy=true)
 *   preventing duplicate content penalties across filtered views.
 */
export const metadata = {
  title: "Full Menu & Traditional Specialties",
  description:
    "Explore our complete Addis Ababa menu of authentic slow-simmered wots, sizzling clay pot tibs, and vegan beyaynetu fasting platters. Filter by category and spice level.",
  alternates: {
    canonical: "/menu",
  },
  openGraph: {
    title: "Full Menu & Traditional Specialties | Addis Eats",
    description:
      "Explore our complete Addis Ababa menu of authentic slow-simmered wots, sizzling clay pot tibs, and vegan fasting platters.",
    url: "/menu",
  },
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
        <h1>Traditional Ethiopian Menu & Daily Specials</h1>
        <p className="subtitle">
          Served fresh daily with authentic sourdough teff injera and hand-crafted spice blends.
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
