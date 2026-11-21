/**
 * Day 17 Exercises · Middleware Simulator
 * Narrow matcher protecting /checkout and /orders
 */

import { getSession } from "./auth";

/**
 * Exercise 3: Middleware configuration with narrow matcher
 * Only matches private routes. Static images, assets, and public routes are ignored.
 */
export const middlewareConfig = {
  matcher: [
    "/checkout/:path*",
    "/orders/:path*",
    "/kitchen/:path*",
  ],
};

/**
 * Helper to test if a requested URL matches the protected matcher
 */
export function isRouteProtected(pathname) {
  return middlewareConfig.matcher.some((pattern) => {
    const prefix = pattern.replace("/:path*", "");
    return pathname === prefix || pathname.startsWith(`${prefix}/`);
  });
}

/**
 * Middleware executor:
 * - Checks if route requires auth
 * - Verifies session cookie via getSession
 * - Redirects to /sign-in?next=... if unauthenticated
 */
export function runMiddleware(requestUrl, cookieValue) {
  const url = new URL(requestUrl, "https://addiseats.et");
  const pathname = url.pathname;

  // Static assets and public pages pass through without running auth checks
  if (!isRouteProtected(pathname)) {
    return { status: 200, action: "NEXT", destination: pathname };
  }

  // Route is protected - verify session
  const session = getSession(cookieValue);

  if (!session) {
    // Exercise 4: Carry intended destination in 'next' parameter
    const redirectUrl = `/sign-in?next=${encodeURIComponent(pathname)}`;
    return {
      status: 307,
      action: "REDIRECT",
      destination: redirectUrl,
      reason: "Unauthenticated access to protected route",
    };
  }

  // Exercise 7: Server-side role check for /kitchen
  if (pathname.startsWith("/kitchen") && session.user.role !== "staff") {
    return {
      status: 403,
      action: "FORBIDDEN",
      destination: "/unauthorized",
      reason: "403 Forbidden: Staff privileges required",
    };
  }

  return { status: 200, action: "NEXT", destination: pathname, session };
}
