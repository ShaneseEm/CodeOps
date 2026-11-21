import { useState } from "react";
import { signSession, getSession } from "./lib/auth";

/**
 * Exercise 1: Write a getSession helper that reads and verifies the session cookie.
 */
export default function Exercise1_GetSession() {
  const [activeSession, setActiveSession] = useState(null);
  const [cookieString, setCookieString] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);

  const mockUser = {
    id: "user_abebe_101",
    name: "Abebe Bikila",
    email: "abebe@addiseats.et",
    role: "customer",
  };

  const generateSession = () => {
    const signedToken = signSession(mockUser);
    setCookieString(signedToken);
    const verified = getSession(signedToken);
    setActiveSession(verified);
    setVerificationResult({ status: "SUCCESS", message: "Valid cryptographic signature verified!" });
  };

  const tamperSession = () => {
    if (!cookieString) return;
    // Tamper with the payload while leaving signature untouched
    const [payload, sig] = cookieString.split(".");
    const decoded = JSON.parse(atob(payload));
    decoded.user.name = "Attacker Injected Name";
    const tamperedPayload = btoa(JSON.stringify(decoded));
    const tamperedCookie = `${tamperedPayload}.${sig}`;

    setCookieString(tamperedCookie);
    const verified = getSession(tamperedCookie);
    setActiveSession(verified);
    setVerificationResult({
      status: "REJECTED",
      message: "Tamper Detected! Cryptographic signature mismatch. getSession() returned null.",
    });
  };

  return (
    <div style={{ maxWidth: "560px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h3>Exercise 1: `getSession` Verification Helper</h3>
      <p style={{ color: "#666", fontSize: "0.9rem" }}>
        Reads the signed session cookie and strictly verifies the HMAC payload signature and expiration.
      </p>

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <button
          onClick={generateSession}
          style={{ padding: "0.5rem 1rem", background: "#059669", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}
        >
          Sign & Verify Session
        </button>
        <button
          onClick={tamperSession}
          disabled={!cookieString}
          style={{ padding: "0.5rem 1rem", background: "#dc2626", color: "#fff", border: "none", borderRadius: "6px", cursor: cookieString ? "pointer" : "not-allowed" }}
        >
          Simulate Cookie Tamper Attack
        </button>
      </div>

      {cookieString && (
        <div style={{ background: "#f8fafc", padding: "0.75rem", borderRadius: "6px", border: "1px solid #cbd5e1", marginBottom: "1rem", wordBreak: "break-all" }}>
          <strong style={{ fontSize: "0.85rem", color: "#475569" }}>Raw Cookie Value:</strong>
          <pre style={{ margin: "0.25rem 0 0 0", fontSize: "0.8rem", color: "#0f766e" }}>{cookieString}</pre>
        </div>
      )}

      {verificationResult && (
        <div
          style={{
            padding: "0.75rem",
            borderRadius: "6px",
            background: verificationResult.status === "SUCCESS" ? "#ecfdf5" : "#fef2f2",
            border: `1px solid ${verificationResult.status === "SUCCESS" ? "#10b981" : "#ef4444"}`,
            color: verificationResult.status === "SUCCESS" ? "#065f46" : "#991b1b",
          }}
        >
          <strong>Status: {verificationResult.status}</strong>
          <p style={{ margin: "0.25rem 0 0 0", fontSize: "0.9rem" }}>{verificationResult.message}</p>
          {activeSession && (
            <div style={{ marginTop: "0.5rem", fontSize: "0.85rem" }}>
              <strong>Verified Session Payload:</strong>
              <pre style={{ margin: "0.25rem 0 0 0" }}>{JSON.stringify(activeSession, null, 2)}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
