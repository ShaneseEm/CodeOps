"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * Exercise 6: Declarative error boundary for app/menu/ segment
 * Must be a Client Component ("use client")
 */
export default function MenuError({ error, reset }) {
  useEffect(() => {
    console.error("Menu segment error captured by error.js:", error);
  }, [error]);

  return (
    <div className="status-box error-box">
      <h2>⚠️ Something went wrong in the Menu!</h2>
      <p className="err-msg">{error?.message || "An unexpected error occurred while loading dishes."}</p>
      <div style={{ marginTop: "1rem", display: "flex", gap: "0.8rem", justifyContent: "center" }}>
        <button
          type="button"
          onClick={() => reset()}
          className="btn-primary"
        >
          Try Again
        </button>
        <Link href="/menu" className="btn-secondary">
          Clear Error
        </Link>
      </div>
    </div>
  );
}
