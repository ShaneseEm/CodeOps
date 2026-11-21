import { useState } from "react";
import { validateNextDestination } from "./lib/auth";

/**
 * Exercise 5: Reject any next value that does not start with a slash, then test a crafted link.
 */
export default function Exercise5_OpenRedirectDefense() {
  const [testedUrl, setTestedUrl] = useState("https://evil-phishing-addis.com/steal-creds");
  const [sanitizedDestination, setSanitizedDestination] = useState(null);
  const [attackAnalysis, setAttackAnalysis] = useState(null);

  const maliciousSamples = [
    { label: "External Absolute URL", value: "https://evil-phishing-addis.com/login" },
    { label: "Protocol-Relative Exploit", value: "//attacker-controlled-site.com" },
    { label: "Backslash Normalization Bypass", value: "/\\malicious.com" },
    { label: "JavaScript URI Scheme", value: "javascript:alert(document.cookie)" },
    { label: "Legitimate Relative Route", value: "/checkout" },
    { label: "Legitimate Nested Order", value: "/orders/AE-9941" },
  ];

  const handleTest = (urlToTest) => {
    setTestedUrl(urlToTest);
    const result = validateNextDestination(urlToTest);
    setSanitizedDestination(result);

    const isMalicious = urlToTest !== result;
    setAttackAnalysis({
      blocked: isMalicious,
      original: urlToTest,
      resolved: result,
      verdict: isMalicious
        ? "🚨 MALICIOUS OPEN REDIRECT DEFUSED! Deflected safely to internal '/' root."
        : "✅ VALID RELATIVE ROUTE! Safely permitted navigation.",
    });
  };

  return (
    <div style={{ maxWidth: "560px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h3>Exercise 5: Open Redirect Attack Shield</h3>
      <p style={{ color: "#666", fontSize: "0.9rem" }}>
        Strictly rejects external URLs, protocol-relative links (<code>//</code>), and backslash exploits, sanitizing to <code>/</code>.
      </p>

      <div style={{ marginBottom: "1rem" }}>
        <label style={{ fontSize: "0.85rem", fontWeight: "bold" }}>Choose or Type a Crafted Attack Link:</label>
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.25rem" }}>
          <input
            type="text"
            value={testedUrl}
            onChange={(e) => setTestedUrl(e.target.value)}
            style={{ flex: 1, padding: "0.4rem 0.6rem", borderRadius: "4px", border: "1px solid #cbd5e1", fontSize: "0.85rem" }}
          />
          <button
            onClick={() => handleTest(testedUrl)}
            style={{ padding: "0.4rem 0.85rem", background: "#0284c7", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
          >
            Audit Link
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem", marginBottom: "1rem" }}>
        {maliciousSamples.map((s) => (
          <button
            key={s.value}
            onClick={() => handleTest(s.value)}
            style={{
              padding: "0.4rem",
              fontSize: "0.78rem",
              textAlign: "left",
              background: testedUrl === s.value ? "#f1f5f9" : "#ffffff",
              border: "1px solid #cbd5e1",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            <strong>{s.label}:</strong>
            <div style={{ color: "#64748b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {s.value}
            </div>
          </button>
        ))}
      </div>

      {attackAnalysis && (
        <div
          style={{
            padding: "0.75rem",
            borderRadius: "6px",
            background: attackAnalysis.blocked ? "#fef2f2" : "#ecfdf5",
            border: `1px solid ${attackAnalysis.blocked ? "#ef4444" : "#10b981"}`,
          }}
        >
          <strong style={{ color: attackAnalysis.blocked ? "#991b1b" : "#065f46" }}>{attackAnalysis.verdict}</strong>
          <div style={{ marginTop: "0.5rem", fontSize: "0.85rem" }}>
            <div>
              <strong>Original Input:</strong> <code>{attackAnalysis.original}</code>
            </div>
            <div>
              <strong>Sanitized Destination:</strong>{" "}
              <code style={{ background: "#fff", padding: "0.1rem 0.3rem", borderRadius: "3px" }}>
                {attackAnalysis.resolved}
              </code>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
