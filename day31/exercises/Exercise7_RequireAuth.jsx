import { useState } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate, useLocation, useNavigate } from "react-router-dom";

/**
 * Exercise 7: Write RequireAuth, guard /checkout, and return the person there after signing in.
 */
function RequireAuthGuard({ user, children }) {
  const location = useLocation();

  if (!user) {
    // Preserve attempted destination in state.from
    return <Navigate to="/ex7/login" state={{ from: location }} replace />;
  }

  return children;
}

function LoginScreen({ onLogin }) {
  const [name, setName] = useState("Abebe");
  const navigate = useNavigate();
  const location = useLocation();

  const destination = location.state?.from?.pathname || "/ex7/checkout";

  function handleSignIn(e) {
    e.preventDefault();
    onLogin(name);
    // Return the user to the screen they originally attempted to visit
    navigate(destination, { replace: true });
  }

  return (
    <div style={{ padding: "1.5rem", border: "1px solid #ccc", borderRadius: "8px", background: "#fff" }}>
      <h4>Login Required</h4>
      <p>You attempted to access: <code>{destination}</code></p>
      <form onSubmit={handleSignIn}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Username" />
        <button type="submit" style={{ marginLeft: "0.5rem" }}>Sign In & Continue</button>
      </form>
    </div>
  );
}

function ProtectedCheckoutScreen({ user, onLogout }) {
  return (
    <div style={{ padding: "1.5rem", border: "2px solid green", borderRadius: "8px", background: "#f0fdf4" }}>
      <h4>🔒 Protected Checkout Screen</h4>
      <p>Welcome, <strong>{user}</strong>! You have access to TeleBirr checkout.</p>
      <button onClick={onLogout}>Sign Out</button>
    </div>
  );
}

export default function Exercise7_RequireAuth() {
  const [user, setUser] = useState(null);

  return (
    <div className="exercise-card">
      <h3>Exercise 7: Route Guarding with RequireAuth & Return Redirect</h3>
      <BrowserRouter>
        <nav style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          <Link to="/ex7/home">Home</Link>
          <Link to="/ex7/checkout">Protected Checkout 🔒</Link>
          {user ? <span>Signed in as: {user}</span> : <span>(Signed out)</span>}
        </nav>

        <Routes>
          <Route path="/ex7/home" element={<p>Public Home Screen. Click &quot;Protected Checkout&quot; to test guard.</p>} />
          <Route path="/ex7/login" element={<LoginScreen onLogin={setUser} />} />
          <Route
            path="/ex7/checkout"
            element={
              <RequireAuthGuard user={user}>
                <ProtectedCheckoutScreen user={user} onLogout={() => setUser(null)} />
              </RequireAuthGuard>
            }
          />
          <Route path="*" element={<p>Click &quot;Protected Checkout&quot; above to see RequireAuth in action.</p>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
