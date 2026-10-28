import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="status-box error-box not-found-screen" style={{ margin: "3rem auto", maxWidth: "600px" }}>
      <h2>404 — Page Not Found</h2>
      <p>The screen or dish you were looking for does not exist.</p>
      <div style={{ marginTop: "1.2rem", display: "flex", gap: "1rem", justifyContent: "center" }}>
        <Link to="/" className="btn-primary">
          Return Home
        </Link>
        <Link to="/menu" className="btn-secondary" style={{ padding: "0.65rem 1.4rem", borderRadius: "8px", border: "1px solid #b84a2e", color: "#b84a2e", textDecoration: "none" }}>
          View Menu
        </Link>
      </div>
    </div>
  );
}
