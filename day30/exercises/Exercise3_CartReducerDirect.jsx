import { cartReducer, initialCartState } from "../../day30_addis_eats/src/cartReducer";

/**
 * Exercise 3: Write a cartReducer with add, remove and clear,
 * and call it directly with plain objects to check each case.
 *
 * This function can be run directly in node or inside React to test pure state transitions.
 */
export function runCartReducerDirectTests() {
  const results = [];

  // Test 1: Initial State
  const s0 = initialCartState;
  results.push({
    test: "Initial state is empty",
    passed: Array.isArray(s0.items) && s0.items.length === 0,
    state: s0,
  });

  // Test 2: Add Dish
  const doroWat = { id: 1, name: "Doro Wat", price: 240, category: "Main" };
  const s1 = cartReducer(s0, { type: "add", dish: doroWat });
  results.push({
    test: "Add Doro Wat",
    passed: s1.items.length === 1 && s1.items[0].name === "Doro Wat",
    state: s1,
  });

  // Test 3: Add Second Dish
  const shiro = { id: 2, name: "Shiro", price: 120, category: "Vegan" };
  const s2 = cartReducer(s1, { type: "add", dish: shiro });
  results.push({
    test: "Add Shiro",
    passed: s2.items.length === 2 && s2.items[1].name === "Shiro",
    state: s2,
  });

  // Test 4: Remove Dish by id
  const s3 = cartReducer(s2, { type: "remove", id: 1 });
  results.push({
    test: "Remove Doro Wat (id 1)",
    passed: s3.items.length === 1 && s3.items[0].id === 2,
    state: s3,
  });

  // Test 5: Clear Cart
  const s4 = cartReducer(s3, { type: "clear" });
  results.push({
    test: "Clear Cart",
    passed: s4.items.length === 0,
    state: s4,
  });

  return results;
}

export default function Exercise3_CartReducerDirect() {
  const testResults = runCartReducerDirectTests();

  return (
    <div className="exercise-card">
      <h3>Exercise 3: Pure cartReducer Direct Plain Object Verification</h3>
      <p>The cartReducer was invoked sequentially outside React with plain action objects:</p>
      <ul>
        {testResults.map((r, i) => (
          <li key={i} style={{ margin: "0.5rem 0" }}>
            <strong>{r.test}</strong>:{" "}
            <span style={{ color: r.passed ? "green" : "red", fontWeight: 700 }}>
              {r.passed ? "✓ PASSED" : "✗ FAILED"}
            </span>
            <pre style={{ background: "#f4f4f4", padding: "0.3rem", borderRadius: "4px" }}>
              {JSON.stringify(r.state)}
            </pre>
          </li>
        ))}
      </ul>
    </div>
  );
}
