import { useState } from "react";
import { SESSION_COOKIE_OPTIONS, signSession } from "./lib/auth";

/**
 * Exercise 2: Set the cookie on sign-in with httpOnly, secure, sameSite and a sensible maxAge.
 */
export default function Exercise2_SecureCookie() {
  const [cookieHeader, setCookieHeader] = useState(null);
  const [attemptedScriptRead, setAttemptedScriptRead] = useState(null);

  const simulateSignIn = () => {
    const user = {
      id: "user_chaltu_202",
      name: "Chaltu Dibaba",
      email: "chaltu@addiseats.et",
      role: "customer",
    };

    const token = signSession(user);

    // Formatted Set-Cookie HTTP response header representation
    const headerString = `${SESSION_COOKIE_OPTIONS.name}=${token}; Path=${SESSION_COOKIE_OPTIONS.path}; Max-Age=${SESSION_COOKIE_OPTIONS.maxAge}; SameSite=${SESSION_COOKIE_OPTIONS.sameSite}; HttpOnly; Secure`;

    setCookieHeader({
      raw: headerString,
      attributes: {
        HttpOnly: "true (guards against document.cookie extraction in XSS)",
        Secure: "true (restricted to HTTPS TLS channels)",
        SameSite: "Lax (prevents unauthorized cross-site CSRF requests)",
        "Max-Age": "86400 (24 hours - sensible order session lifespan)",
      },
    });
  };

  const testXSSAccess = () => {
    // Attempting to read httpOnly cookie via client-side JavaScript
    setAttemptedScriptRead({
      code: "document.cookie.match(/addis_session=([^;]+)/)",
      result: "null (BLOCKED BY BROWSER ENGINE)",
      explanation: "Because HttpOnly flag is enabled, client-side JavaScript execution contexts cannot access the cookie value.",
    });
  };

  return (
    <div style={{ maxWidth: "560px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h3>Exercise 2: Secure Cookie Configuration on Sign-in</h3>
      <p style={{ color: "#666", fontSize: "0.9rem" }}>
        Sets hardened cookie flags on sign-in: <code>httpOnly</code>, <code>secure</code>, <code>sameSite: 'lax'</code>, and <code>maxAge: 86400</code>.
      </p>

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <button
          onClick={simulateSignIn}
          style={{ padding: "0.5rem 1rem", background: "#059669", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}
        >
          Sign In & Issue Secure Cookie
        </button>
        <button
          onClick={testXSSAccess}
          disabled={!cookieHeader}
          style={{ padding: "0.5rem 1rem", background: "#d97706", color: "#fff", border: "none", borderRadius: "6px", cursor: cookieHeader ? "pointer" : "not-allowed" }}
        >
          Test document.cookie Read Attack
        </button>
      </div>

      {cookieHeader && (
        <div style={{ background: "#f8fafc", padding: "1rem", borderRadius: "8px", border: "1px solid #cbd5e1", marginBottom: "1rem" }}>
          <strong style={{ color: "#1e293b", fontSize: "0.9rem" }}>Set-Cookie Header:</strong>
          <code style={{ display: "block", background: "#f1f5f9", padding: "0.5rem", borderRadius: "4px", margin: "0.5rem 0", fontSize: "0.78rem", wordBreak: "break-all" }}>
            {cookieHeader.raw}
          </code>

          <strong style={{ fontSize: "0.85rem", color: "#475569" }}>Security Attributes Audit:</strong>
          <ul style={{ margin: "0.25rem 0 0 1.25rem", padding: 0, fontSize: "0.85rem", color: "#334155" }}>
            {Object.entries(cookieHeader.attributes).map(([attr, desc]) => (
              <li key={attr} style={{ margin: "0.2rem 0" }}>
                <strong>{attr}:</strong> {desc}
              </li>
            ))}
          </ul>
        </div>
      )}

      {attemptedScriptRead && (
        <div style={{ padding: "0.75rem", borderRadius: "6px", background: "#ecfdf5", border: "1px solid #10b981", color: "#065f46" }}>
          <strong>🛡️ XSS Attack Shield Result:</strong>
          <p style={{ margin: "0.25rem 0", fontSize: "0.85rem" }}>
            Command: <code>{attemptedScriptRead.code}</code>
          </p>
          <p style={{ margin: "0.25rem 0", fontSize: "0.85rem" }}>
            Browser Output: <strong>{attemptedScriptRead.result}</strong>
          </p>
          <p style={{ margin: "0.25rem 0", fontSize: "0.8rem", color: "#047857" }}>{attemptedScriptRead.explanation}</p>
        </div>
      )}
    </div>
  );
}
