import { useFetch } from "../../day30_addis_eats/src/useFetch";

/**
 * Exercise 2: Extract Day 29 fetching logic into a useFetch hook in its own file,
 * and use it in two different components.
 */

// Component 1 using useFetch: Menu preview
function MenuDishesList() {
  const { data: dishes, loading, error } = useFetch("/dishes.json");

  if (loading) return <p>Loading menu component...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div>
      <h4>Component 1: Menu List ({dishes?.length} dishes)</h4>
      <ul>
        {dishes?.slice(0, 3).map((d) => (
          <li key={d.id}>
            {d.name} — {d.price} ETB
          </li>
        ))}
      </ul>
    </div>
  );
}

// Component 2 using useFetch: Specials / Summary component
function SpecialsSummary() {
  const { data: dishes, loading, error } = useFetch("/dishes.json");

  if (loading) return <p>Loading specials...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  const spicyCount = dishes?.filter((d) => d.spicy).length || 0;

  return (
    <div style={{ marginTop: "1rem", padding: "0.8rem", background: "#fffaf0", borderRadius: "8px" }}>
      <h4>Component 2: Specials Summary</h4>
      <p>Spicy dishes available today: <strong>{spicyCount}</strong></p>
      <p>Average price: <strong>{Math.round((dishes?.reduce((s, d) => s + d.price, 0) || 0) / (dishes?.length || 1))} ETB</strong></p>
    </div>
  );
}

export default function Exercise2_UseFetchHook() {
  return (
    <div className="exercise-card">
      <h3>Exercise 2: Reusable useFetch Hook in Two Components</h3>
      <MenuDishesList />
      <SpecialsSummary />
    </div>
  );
}
