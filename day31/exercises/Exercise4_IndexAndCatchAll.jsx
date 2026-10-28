import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";

/**
 * Exercise 4: Add an index route for the landing page and a "*" route rendering NotFound.
 */
function Frame() {
  return (
    <div style={{ padding: "1rem", border: "1px solid #ddd", borderRadius: "8px" }}>
      <nav style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <Link to="/ex4">Landing (Index)</Link>
        <Link to="/ex4/random-route-xyz">Test 404 Route</Link>
      </nav>
      <Outlet />
    </div>
  );
}

function LandingIndex() {
  return (
    <div style={{ background: "#f0fdf4", padding: "1rem", borderRadius: "6px" }}>
      <h4>Landing Page (Index Route)</h4>
      <p>This renders automatically when navigating to the parent layout URL without any trailing subpath.</p>
    </div>
  );
}

function NotFoundScreen() {
  return (
    <div style={{ background: "#fff5f5", padding: "1rem", borderRadius: "6px", border: "1px solid #feb2b2" }}>
      <h4>404: Screen Not Found</h4>
      <p>Caught by the wildcard <code>path=&quot;*&quot;</code> route.</p>
      <Link to="/ex4">Return to Landing</Link>
    </div>
  );
}

export default function Exercise4_IndexAndCatchAll() {
  return (
    <div className="exercise-card">
      <h3>Exercise 4: Index Route & Wildcard (*) Catch-All</h3>
      <BrowserRouter>
        <Routes>
          <Route path="/ex4" element={<Frame />}>
            <Route index element={<LandingIndex />} />
            <Route path="*" element={<NotFoundScreen />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
