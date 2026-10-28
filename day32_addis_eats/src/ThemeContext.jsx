import { createContext, useContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

export const ThemeContext = createContext(null);

/**
 * useTheme - Guarded Context Hook
 * Throws a clear error if invoked outside ThemeProvider.
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "useTheme must be used within a <ThemeProvider>. Wrap your root in <ThemeProvider>."
    );
  }
  return context;
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeProvider;
