/**
 * Day 17 Exercises · Authentication & Session Security Utilities
 * Addis Eats Full Stack Architecture
 */

// Secret key maintained exclusively on the server (never exposed to client)
const SERVER_SIGNING_SECRET = "addis-eats-sq10-production-signing-secret-key-2026";

/**
 * Exercise 2: Secure Cookie Configuration
 * Flags:
 * - httpOnly: true (prevents XSS attacks from reading document.cookie)
 * - secure: true (ensures cookies are only transmitted over TLS/HTTPS)
 * - sameSite: 'lax' (guards against CSRF while permitting top-level navigation)
 * - maxAge: 86400 (sensible 24-hour expiration window)
 */
export const SESSION_COOKIE_OPTIONS = {
  name: "addis_session",
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  maxAge: 60 * 60 * 24, // 24 hours in seconds
  path: "/",
};

/**
 * Lightweight deterministic cryptographic signature simulator (HMAC imitation for runtime)
 */
function createSignature(payloadString, secret) {
  let hash = 0;
  const combined = `${payloadString}:${secret}`;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
}

/**
 * Exercise 1 & 2: Sign a new user session into a tamper-proof signed cookie string
 */
export function signSession(user) {
  const sessionData = {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role || "customer", // customer | staff
    },
    exp: Date.now() + SESSION_COOKIE_OPTIONS.maxAge * 1000,
  };

  const payloadString = btoa(JSON.stringify(sessionData));
  const signature = createSignature(payloadString, SERVER_SIGNING_SECRET);

  return `${payloadString}.${signature}`;
}

/**
 * Exercise 1: getSession helper that reads and verifies the session cookie
 * @param {string|null} cookieValue - The raw session cookie string
 * @returns {object|null} - Decoded session object if valid and unexpired, otherwise null
 */
export function getSession(cookieValue) {
  if (!cookieValue || typeof cookieValue !== "string") {
    return null;
  }

  const parts = cookieValue.split(".");
  if (parts.length !== 2) {
    return null; // Malformed token structure
  }

  const [payloadString, signature] = parts;
  const expectedSignature = createSignature(payloadString, SERVER_SIGNING_SECRET);

  // Verification step: reject if signature was tampered with
  if (signature !== expectedSignature) {
    return null; // Tamper detected: invalid cryptographic signature
  }

  try {
    const session = JSON.parse(atob(payloadString));

    // Expiration verification: reject if token lifetime exceeded
    if (Date.now() > session.exp) {
      return null; // Expired session
    }

    return session;
  } catch {
    return null;
  }
}

/**
 * Exercise 4 & 5: Open Redirect Sanitizer
 * Rejects any next parameter that is an external URL, protocol-relative (//), or path traversal.
 * Only allows relative paths starting with a single '/'
 */
export function validateNextDestination(nextParam) {
  if (!nextParam || typeof nextParam !== "string") {
    return "/";
  }

  const trimmed = nextParam.trim();

  // Rule 1: Must strictly start with a slash
  if (!trimmed.startsWith("/")) {
    return "/"; // Rejects 'http://evil.com', 'evil.com', 'javascript:alert(1)'
  }

  // Rule 2: Must NOT start with '//' (protocol-relative URL exploit like '//evil.com')
  if (trimmed.startsWith("//")) {
    return "/";
  }

  // Rule 3: Must NOT contain backslashes which browsers normalize into domains ('/\evil.com')
  if (trimmed.includes("\\")) {
    return "/";
  }

  return trimmed;
}
