import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

/**
 * Exercise 1: Install react-router-dom and wrap the application
 * in BrowserRouter with three routes.
 */
function HomeScreen() {
  return (
    <div style={{ padding: "1rem" }}>
      <h4>Home Screen</h4>
      <p>Welcome to Addis Eats!</p>
    </div>
  );
}

function MenuScreen() {
  return (
    <div style={{ padding: "1rem" }}>
      <h4>Menu Screen</h4>
      <p>Delicious Ethiopian traditional dishes.</p>
    </div>
  );
}

function AboutScreen() {
  return (
    <div style={{ padding: "1rem" }}>
      <h4>About Screen</h4>
      <p>Addis Eats was founded in Addis Ababa.</p>
    </div>
  );
}

export default function Exercise1_BrowserRouter() {
  return (
    <div className="exercise-card">
      <h3>Exercise 1: BrowserRouter with Three Routes</h3>
      <BrowserRouter>
        <nav style={{ display: "flex", gap: "1rem", padding: "0.5rem 0", borderBottom: "1px solid #ccc" }}>
          <Link to="/">Home</Link>
          <Link to="/menu-ex1">Menu</Link>
          <Link to="/about-ex1">About</Link>
        </nav>

        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/menu-ex1" element={<MenuScreen />} />
          <Route path="/about-ex1" element={<AboutScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
