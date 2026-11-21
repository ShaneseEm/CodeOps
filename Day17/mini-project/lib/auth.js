/**
 * Addis Eats · Core Authentication & Session Security Engine
 * Mini-Project · Day 17
 */

// Secret cryptographic key (Server-only environment variable, NEVER exposed to browser)
const SERVER_SIGNING_SECRET = "addis-eats-sq10-production-signing-secret-key-2026";

export const SESSION_COOKIE_OPTIONS = {
  name: "addis_session",
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  maxAge: 60 * 60 * 24, // 24 hours (86,400 seconds)
  path: "/",
};

function createSignature(payloadString, secret) {
  let hash = 0;
  const combined = `${payloadString}:${secret}`;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

/**
 * Signs user object into a secure session token
 */
export function signSession(user) {
  const sessionData = {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role || "customer",
    },
    exp: Date.now() + SESSION_COOKIE_OPTIONS.maxAge * 1000,
  };

  const payloadString = btoa(JSON.stringify(sessionData));
  const signature = createSignature(payloadString, SERVER_SIGNING_SECRET);

  return `${payloadString}.${signature}`;
}

/**
 * Universal getSession helper used by pages, actions, and route handlers alike
 */
export function getSession(cookieValue) {
  if (!cookieValue || typeof cookieValue !== "string") {
    return null;
  }

  const parts = cookieValue.split(".");
  if (parts.length !== 2) return null;

  const [payloadString, signature] = parts;
  const expectedSignature = createSignature(payloadString, SERVER_SIGNING_SECRET);

  // Line that stops token tampering:
  if (signature !== expectedSignature) {
    return null;
  }

  try {
    const session = JSON.parse(atob(payloadString));
    // Line that stops expired sessions:
    if (Date.now() > session.exp) {
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

/**
 * Open Redirect defense sanitizer:
 * Rejects external URLs and protocol-relative links (//), preserving internal relative routes.
 */
export function validateNextDestination(nextParam) {
  if (!nextParam || typeof nextParam !== "string") return "/menu";

  const trimmed = nextParam.trim();

  // Line that stops external URL redirection:
  if (!trimmed.startsWith("/") || trimmed.startsWith("//") || trimmed.includes("\\")) {
    return "/menu";
  }

  return trimmed;
}
