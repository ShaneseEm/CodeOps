import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage on mount so refresh preserves auth state
  useEffect(() => {
    try {
      const stored = localStorage.getItem("addis_eats_user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // fallback to null
    } finally {
      setLoading(false);
    }
  }, []);

  function login(username) {
    const userData = { username, role: "customer" };
    setUser(userData);
    localStorage.setItem("addis_eats_user", JSON.stringify(userData));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("addis_eats_user");
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
