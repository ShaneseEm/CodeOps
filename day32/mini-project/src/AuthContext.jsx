import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "./useAuth";

export { AuthContext, useAuth } from "./useAuth";

/**
 * AuthProvider
 * Manages the current authenticated user session in React Context.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("addis_eats_user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // ignore parse errors
    } finally {
      setLoading(false);
    }
  }, []);

  function login(username) {
    const data = { username, role: "customer" };
    setUser(data);
    localStorage.setItem("addis_eats_user", JSON.stringify(data));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("addis_eats_user");
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
