import { useState } from "react";
import { signSession, validateNextDestination } from "./lib/auth";

/**
 * Exercise 4: Carry the intended destination in a next parameter and return to it after sign-in.
 */
export default function Exercise4_NextDestination() {
  const [currentUrl, setCurrentUrl] = useState("/sign-in?next=%2Fcheckout");
  const [session, setSession] = useState(null);
  const [redirectedTo, setRedirectedTo] = useState(null);

  const intendedDestination = new URL(currentUrl, "https://addiseats.et").searchParams.get("next") || "/";

  const handleSignIn = () => {
    // 1. Simulate authentication
    const user = { id: "user_101", name: "Abebe Bikila", email: "abebe@addiseats.et" };
    setSession(user);

    // 2. Validate and redirect back to intended destination
    const safeNext = validateNextDestination(intendedDestination);
    setRedirectedTo(safeNext);
  };

  const handleReset = () => {
    setSession(null);
    setRedirectedTo(null);
  };

  return (
    <div style={{ maxWidth: "560px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h3>Exercise 4: Preserve & Return to `next` Destination</h3>
      <p style={{ color: "#666", fontSize: "0.9rem" }}>
        Middleware carries the intercepted destination in the <code>next</code> parameter and returns the user there post-login.
      </p>

      <div style={{ background: "#f8fafc", padding: "0.75rem", borderRadius: "6px", border: "1px solid #cbd5e1", marginBottom: "1rem" }}>
        <label style={{ fontSize: "0.85rem", fontWeight: "bold", color: "#334155" }}>Simulated Browser URL:</label>
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.25rem" }}>
          <select
            value={currentUrl}
            onChange={(e) => {
              setCurrentUrl(e.target.value);
              handleReset();
            }}
            style={{ flex: 1, padding: "0.4rem", borderRadius: "4px", border: "1px solid #cbd5e1" }}
          >
            <option value="/sign-in?next=%2Fcheckout">/sign-in?next=/checkout (User attempted /checkout)</option>
            <option value="/sign-in?next=%2Forders%2FAE-9941">/sign-in?next=/orders/AE-9941 (Direct order link)</option>
            <option value="/sign-in">/sign-in (Direct visitor with no next param)</option>
          </select>
        </div>
      </div>

      <div style={{ padding: "1rem", background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "8px", marginBottom: "1rem" }}>
        <h4 style={{ margin: "0 0 0.5rem 0" }}>Sign In to Addis Eats</h4>
        <p style={{ margin: "0 0 0.75rem 0", fontSize: "0.85rem", color: "#475569" }}>
          Intended target detected: <strong>{intendedDestination}</strong>
        </p>

        {!session ? (
          <button
            onClick={handleSignIn}
            style={{ padding: "0.5rem 1rem", background: "#059669", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}
          >
            Sign In with Google / Telebirr
          </button>
        ) : (
          <div>
            <div style={{ padding: "0.75rem", borderRadius: "6px", background: "#ecfdf5", border: "1px solid #10b981", color: "#065f46", marginBottom: "0.5rem" }}>
              ✅ <strong>Sign-in Successful!</strong> Welcome, {session.name}.
            </div>
            <div style={{ padding: "0.75rem", borderRadius: "6px", background: "#eff6ff", border: "1px solid #3b82f6", color: "#1d4ed8" }}>
              🚀 <strong>Redirecting to:</strong> <code>{redirectedTo}</code> (Returned directly to intended page!)
            </div>
            <button
              onClick={handleReset}
              style={{ marginTop: "0.75rem", padding: "0.3rem 0.6rem", background: "#94a3b8", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "0.8rem" }}
            >
              Reset Demo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
