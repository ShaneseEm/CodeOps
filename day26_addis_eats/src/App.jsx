import Header from "./Header";
import Menu from "./Menu";
import menu from "./data";
import "./App.css";

// Categories derived from the data — "All" added at the front
const CATEGORIES = ["All", ...new Set(menu.map((d) => d.category))];

function App() {
  // Day 27 is still static — the active category is hardcoded here.
  // On Day 28 this becomes useState so the buttons actually filter live.
  const activeCategory = "All";

  return (
    <div className="app">
      <Header />

      <main>
        {/* Category tabs — static for now, interactive on Day 28 */}
        <nav className="category-nav">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`cat-btn${cat === activeCategory ? " active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </nav>

        <Menu dishes={menu} category={activeCategory} />
      </main>

      <footer className="footer">
        <p>© 2026 Addis Eats · React + Vite · Module 3 Day 27</p>
      </footer>
    </div>
  );
}

export default App;
