import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

/**
 * Login Screen
 *
 * Implements:
 * - Redirects back to intended guarded route (`location.state.from`) upon sign in
 * - Allows quick one-click guest / demo login
 */
export default function Login() {
  const [username, setUsername] = useState("Abebe");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve destination that was blocked by RequireAuth, defaulting to /checkout
  const from = location.state?.from?.pathname || "/checkout";

  function handleSubmit(e) {
    e.preventDefault();
    if (!username.trim()) return;
    login(username.trim());
    // Navigate back to the guarded screen that triggered the redirect
    navigate(from, { replace: true });
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>🔐 Sign In to Addis Eats</h2>
        <p className="login-hint">
          {location.state?.from ? (
            <span>
              Please sign in to access <code>{location.state.from.pathname}</code>.
            </span>
          ) : (
            <span>Sign in to manage your orders and speed up checkout.</span>
          )}
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          <label className="form-label">
            Username / Name:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. Abebe, Bethelhem, Selam"
              className="form-input"
              required
            />
          </label>

          <button type="submit" className="btn-submit">
            Sign In & Continue →
          </button>
        </form>

        <div className="login-footer">
          <p>
            Just exploring? <Link to="/menu">Browse the menu</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
