import Link from "next/link";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import AddToCartButton from "../../../components/AddToCartButton";

export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), "public", "dishes.json");
  const rawData = fs.readFileSync(filePath, "utf-8");
  const dishes = JSON.parse(rawData);

  return dishes.map((dish) => ({
    id: dish.id.toString(),
  }));
}

/**
 * DishDetailPage - Pure Async Server Component
 * Fetches dish details server-side without hooks.
 * Only the AddToCartButton carries 'use client' at the leaf.
 */
export default async function DishDetailPage({ params }) {
  const filePath = path.join(process.cwd(), "public", "dishes.json");
  const rawData = fs.readFileSync(filePath, "utf-8");
  const dishes = JSON.parse(rawData);
  const dish = dishes.find((d) => d.id.toString() === params.id);

  if (!dish) {
    notFound();
  }

  return (
    <div className="dish-detail-card">
      <Link href="/menu" className="back-link">
        &larr; Back to Full Menu
      </Link>
      <div className="dish-detail-body">
        <div className="dish-badge-row">
          <span className="dish-badge">{dish.category}</span>
          {dish.spicy && <span className="spicy-badge">🌶️ Authentic Spicy Blend</span>}
        </div>
        <h1 className="dish-detail-title">{dish.name}</h1>
        <p className="dish-detail-desc">{dish.description}</p>
        <div className="dish-detail-footer">
          <div className="price-tag">
            <span className="label">Price:</span>
            <span className="amount">${dish.price?.toFixed(2)} ETB/USD</span>
          </div>
          {/* Leaf interactive component */}
          <AddToCartButton dish={dish} />
        </div>
      </div>
    </div>
  );
}
