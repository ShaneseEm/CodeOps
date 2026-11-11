import { Component } from "react";

/**
 * ErrorBoundary.jsx
 *
 * Production-ready React Error Boundary class component.
 * Catches JavaScript errors anywhere in their child component tree,
 * logs those errors, and displays a resilient fallback UI instead of crashing
 * the whole application.
 *
 * Props:
 * - fallback: ReactNode | (({ error, reset }) => ReactNode)
 * - name: string (optional label for logging and accessible alert descriptions)
 * - onReset: function (optional callback triggered when recovery is initiated)
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    // In production, dispatch to monitoring (e.g. Sentry / Datadog)
    console.error(`[ErrorBoundary: ${this.props.name || "Root"}]`, error, errorInfo);
  }

  reset = () => {
    if (this.props.onReset) {
      this.props.onReset();
    }
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      // 1. Render-prop fallback support: fallback({ error, reset })
      if (typeof this.props.fallback === "function") {
        return this.props.fallback({
          error: this.state.error,
          reset: this.reset,
        });
      }

      // 2. ReactNode fallback prop
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // 3. Default accessible resilient fallback UI
      return (
        <div
          role="alert"
          aria-live="assertive"
          style={{
            padding: "1.25rem",
            margin: "1rem 0",
            backgroundColor: "#fef2f2",
            border: "2px solid #ef4444",
            borderRadius: "8px",
            color: "#991b1b",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <span aria-hidden="true" style={{ fontSize: "1.25rem" }}>⚠️</span>
            <h3 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 700 }}>
              {this.props.name ? `${this.props.name} Unavailable` : "Something went wrong"}
            </h3>
          </div>
          <p style={{ margin: "0.25rem 0 0.75rem 0", fontSize: "0.88rem", color: "#7f1d1d" }}>
            {this.state.error?.message || "An unexpected rendering fault occurred."}
          </p>
          <button
            type="button"
            onClick={this.reset}
            style={{
              padding: "0.45rem 0.9rem",
              backgroundColor: "#dc2626",
              color: "#ffffff",
              border: "none",
              borderRadius: "6px",
              fontWeight: 600,
              fontSize: "0.85rem",
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
