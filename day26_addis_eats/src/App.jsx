import Header from "./Header";
import Menu from "./Menu";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Menu />
      </main>
      <footer className="footer">
        <p>© 2026 Addis Eats · Built with React + Vite · Module 3 Day 26</p>
      </footer>
    </div>
  );
}

export default App;
