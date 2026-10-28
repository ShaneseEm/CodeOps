import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "./AuthContext";

/**
 * RequireAuth Route Guard
 *
 * Implements:
 * - Waits for auth initialization to complete (`loading`)
 * - Preserves the attempted destination URL via `state: { from: location }`
 * - Redirects to /login if unauthenticated
 * - Renders protected children if authenticated
 */
export default function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="status-box loading-box" style={{ margin: "3rem auto" }}>
        <div className="spinner" aria-hidden="true"></div>
        <p className="loading-state">Checking authentication...</p>
      </div>
    );
  }

  if (!user) {
    // Send to login, passing the current path in location state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};
