import { Component, useState } from "react";

/**
 * Exercise 1: Write an ErrorBoundary class taking a fallback prop,
 * and wrap the menu in it.
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log to reporting service or console
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (typeof this.props.fallback === "function") {
        return this.props.fallback({ error: this.state.error, reset: this.reset });
      }
      return (
        this.props.fallback || (
          <div role="alert" style={{ padding: "1rem", background: "#fee2e2", border: "1px solid #ef4444", borderRadius: "6px" }}>
            <h3>Something went wrong</h3>
            <button onClick={this.reset} style={{ marginTop: "0.5rem", padding: "0.4rem 0.8rem", cursor: "pointer" }}>
              Try again
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

// Menu component demonstrating the wrapped boundary
function MenuSample() {
  const [shouldCrash, setShouldCrash] = useState(false);

  if (shouldCrash) {
    throw new Error("Simulated network crash loading Menu items!");
  }

  return (
    <div style={{ padding: "1rem", background: "#f0fdf4", border: "1px solid #86efac", borderRadius: "8px" }}>
      <h4>Addis Eats Menu</h4>
      <ul>
        <li>Doro Wat - 350 ETB</li>
        <li>Tibs - 320 ETB</li>
        <li>Beyaynetu - 250 ETB</li>
      </ul>
      <button
        onClick={() => setShouldCrash(true)}
        style={{ padding: "0.4rem 0.8rem", background: "#dc2626", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
      >
        Simulate Menu Crash 💥
      </button>
    </div>
  );
}

export default function Exercise1_ErrorBoundary() {
  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h3>Exercise 1: ErrorBoundary Class with Fallback Prop</h3>
      <p style={{ color: "#666", fontSize: "0.9rem" }}>
        The Menu is encapsulated inside <code>ErrorBoundary</code>. If it throws, only the menu fallback renders.
      </p>

      <ErrorBoundary
        fallback={({ error, reset }) => (
          <div role="alert" style={{ padding: "1rem", background: "#fef2f2", border: "2px solid #ef4444", borderRadius: "8px" }}>
            <h4 style={{ color: "#991b1b", margin: "0 0 0.5rem 0" }}>⚠️ Menu Failed to Load</h4>
            <p style={{ margin: "0 0 0.75rem 0", color: "#7f1d1d", fontSize: "0.85rem" }}>{error.message}</p>
            <button
              onClick={reset}
              style={{ padding: "0.4rem 0.85rem", background: "#dc2626", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
            >
              Reload Menu
            </button>
          </div>
        )}
      >
        <MenuSample />
      </ErrorBoundary>
    </div>
  );
}
