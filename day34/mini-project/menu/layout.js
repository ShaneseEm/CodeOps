"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const CATEGORIES = ["All", "Main", "Vegan", "Grill"];

/**
 * Exercise 2 & 3: Nested menu layout with category sidebar & stateful counter.
 *
 * PROOF OF STATE PRESERVATION:
 * Because this layout sits at `app/menu/layout.js`, navigating between `/menu` and
 * any nested dynamic child route like `/menu/1` or `/menu/3` DOES NOT re-mount
 * this layout! The `counter` state and category sidebar survive navigation intact!
 */
export default function MenuLayout({ children }) {
  const [counter, setCounter] = useState(0);
  const pathname = usePathname();

  return (
    <div className="menu-nested-layout">
      {/* Category Sidebar */}
      <aside className="menu-sidebar">
        <div className="sidebar-section">
          <h3>Filter Dishes</h3>
          <p className="sidebar-hint">Sidebar survives nested navigation</p>
          <div className="category-links">
            {CATEGORIES.map((cat) => {
              const href = cat === "All" ? "/menu" : `/menu?category=${cat}`;
              return (
                <Link key={cat} href={href} className="sidebar-cat-pill">
                  {cat}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Stateful Counter to Prove State Survival Across Navigation */}
        <div className="sidebar-counter-box">
          <h4>Layout State Test</h4>
          <p>Click counter, then click a dish. The count is preserved!</p>
          <div className="counter-row">
            <span>Sidebar clicks: <strong>{counter}</strong></span>
            <button
              type="button"
              className="btn-counter"
              onClick={() => setCounter((c) => c + 1)}
            >
              + Increment
            </button>
          </div>
          <p className="pathname-indicator">Current path: <code>{pathname}</code></p>
        </div>
      </aside>

      {/* Main Content Area: Suspended dish list or dynamic dish detail */}
      <section className="menu-main-section">
        {children}
      </section>
    </div>
  );
}
