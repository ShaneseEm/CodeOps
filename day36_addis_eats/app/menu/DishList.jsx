import DishCard from "./DishCard";
import fs from "fs";
import path from "path";

/**
 * DishList - Pure Async Server Component
 * Does NOT have "use client".
 * Awaits dish data directly without client fetching hooks (no useFetch, no useState, no useEffect).
 * Never shipped as JS executable bundle to the browser!
 */
export default async function DishList() {
  const filePath = path.join(process.cwd(), "public", "dishes.json");
  const rawData = fs.readFileSync(filePath, "utf-8");
  const dishes = JSON.parse(rawData);

  return (
    <div className="dish-grid">
      {dishes.map((dish) => (
        <DishCard key={dish.id} dish={dish} />
      ))}
    </div>
  );
}
