import Link from "next/link";

/**
 * Exercise 7 & Requirement: not-found.js boundary
 * Triggered automatically when notFound() is invoked or for invalid URLs
 */
export default function NotFound() {
  return (
    <div className="status-box not-found-box">
      <h2>404 — Dish or Page Not Found</h2>
      <p>
        The requested dish or route does not exist in our kitchen or menu catalog.
      </p>
      <div style={{ marginTop: "1.2rem", display: "flex", gap: "1rem", justifyContent: "center" }}>
        <Link href="/menu" className="btn-primary">
          Back to Menu 🍲
        </Link>
        <Link href="/" className="btn-secondary">
          Go Home 🏠
        </Link>
      </div>
    </div>
  );
}
