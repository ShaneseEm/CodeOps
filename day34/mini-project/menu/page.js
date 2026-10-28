import { Suspense } from "react";
import DishList from "./DishList";

/**
 * Exercise 4: Set revalidate on the menu route and confirm the build still marks it static.
 *
 * STRATEGY: Incremental Static Regeneration (ISR) with a 60-second window.
 * The menu is pre-rendered at build time (static ○ / ●) and automatically re-evaluated
 * in the background every 60 seconds if menu data or prices change.
 */
export const revalidate = 60;

function DishesFallback() {
  return (
    <div className="status-box loading-box">
      <div className="spinner"></div>
      <p className="loading-state">Streaming delicious dishes (Sidebar is already loaded!)...</p>
    </div>
  );
}

export default function MenuPage({ searchParams }) {
  const activeCategory = searchParams?.category || "All";

  return (
    <div className="menu-page-content">
      <div className="menu-content-header">
        <h2>Ethiopian Dishes ({activeCategory})</h2>
        <p>Pre-rendered with ISR (revalidate: 60s) and streamed with React Suspense.</p>
      </div>

      {/* Exercise 7: Wrap the dish list in Suspense so the sidebar renders immediately */}
      <Suspense key={activeCategory} fallback={<DishesFallback />}>
        <DishList category={activeCategory} />
      </Suspense>
    </div>
  );
}
