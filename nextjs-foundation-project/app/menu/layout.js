import Link from "next/link";

export default function MenuLayout({ children }) {
  const categories = [
    { name: "All Dishes", slug: "all" },
    { name: "Traditional Wots", slug: "traditional" },
    { name: "Tibs & Meat", slug: "meat" },
    { name: "Vegan Fasting", slug: "vegan" },
    { name: "Beverages", slug: "beverage" },
  ];

  return (
    <div className="menu-layout-container">
      <aside className="menu-sidebar">
        <h3 className="sidebar-title">Menu Categories</h3>
        <ul className="category-list">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link href={`/menu?cat=${c.slug}`} className="category-link">
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      <section className="menu-content">
        {children}
      </section>
    </div>
  );
}
