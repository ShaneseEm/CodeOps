import { createContext, useContext, useState } from "react";

/**
 * Exercise 2: Split auth and theme into their own providers,
 * separate from the cart provider.
 */

// 1. Theme Provider & Hook
const ThemeContext = createContext(null);
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const toggle = () => setTheme((t) => (t === "light" ? "dark" : "light"));
  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 2. Auth Provider & Hook
const AuthContext = createContext(null);
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
function AuthProvider({ children }) {
  const [user, setUser] = useState({ username: "Abebe" });
  const logout = () => setUser(null);
  const login = (name) => setUser({ username: name });
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function ProfileCard() {
  const { theme, toggle } = useTheme();
  const { user, login, logout } = useAuth();

  return (
    <div
      style={{
        padding: "1rem",
        borderRadius: "8px",
        background: theme === "light" ? "#fff" : "#333",
        color: theme === "light" ? "#222" : "#fff",
        border: "1px solid #ccc",
      }}
    >
      <p>Theme: <strong>{theme}</strong></p>
      <button onClick={toggle}>Toggle Theme</button>
      <hr style={{ margin: "1rem 0" }} />
      <p>User: <strong>{user ? user.username : "(Logged Out)"}</strong></p>
      {user ? (
        <button onClick={logout}>Log Out</button>
      ) : (
        <button onClick={() => login("Bethelhem")}>Log in as Bethelhem</button>
      )}
    </div>
  );
}

export default function Exercise2_SplitProviders() {
  return (
    <div className="exercise-card">
      <h3>Exercise 2: Separate ThemeProvider and AuthProvider</h3>
      <p>Notice Theme and Auth are cleanly separated into their own distinct providers rather than bundled:</p>
      <ThemeProvider>
        <AuthProvider>
          <ProfileCard />
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}
