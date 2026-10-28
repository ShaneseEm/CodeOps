"use client";

import React, { useEffect } from "react";

/**
 * error.js MUST have "use client" because:
 * Next.js error boundaries catch runtime exceptions in the client component tree
 * and must provide client-side interactive recovery actions (such as reset() buttons)
 * without requiring a full server trip.
 */
export default function ErrorBoundary({ error, reset }) {
  useEffect(() => {
    console.error("Caught error in Addis Eats client error boundary:", error);
  }, [error]);

  return (
    <div className="error-container">
      <h2>Something went wrong loading this section!</h2>
      <p>{error?.message || "An unexpected error occurred while rendering."}</p>
      <button onClick={() => reset()} className="retry-btn">
        Try Again
      </button>
    </div>
  );
}
