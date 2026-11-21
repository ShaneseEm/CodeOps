/**
 * Addis Eats · Edge Middleware Routing & Session Filter
 * Mini-Project · Day 17
 */

import { getSession } from "./auth";

/**
 * Narrow matcher covering strictly private paths.
 * Does NOT run on images, CSS, fonts, or public menu pages.
 */
export const middlewareConfig = {
  matcher: [
    "/checkout/:path*",
    "/orders/:path*",
    "/kitchen/:path*",
  ],
};

export function isRouteProtected(pathname) {
  return middlewareConfig.matcher.some((pattern) => {
    const prefix = pattern.replace("/:path*", "");
    return pathname === prefix || pathname.startsWith(`${prefix}/`);
  });
}

export function handleRequestMiddleware(pathname, cookieValue) {
  // 1. Check if route is included in narrow matcher
  if (!isRouteProtected(pathname)) {
    return {
      allowed: true,
      status: 200,
      action: "PASSTHROUGH",
      destination: pathname,
      middlewareRan: false,
    };
  }

  // 2. Route is private: verify session cookie
  const session = getSession(cookieValue);

  // Line that stops unauthenticated navigation to private routes:
  if (!session) {
    const redirectTarget = `/sign-in?next=${encodeURIComponent(pathname)}`;
    return {
      allowed: false,
      status: 307,
      action: "REDIRECT",
      destination: redirectTarget,
      reason: "Unauthenticated visitor attempting to access private route",
      middlewareRan: true,
    };
  }

  // 3. Staff-only route check
  if (pathname.startsWith("/kitchen") && session.user.role !== "staff") {
    return {
      allowed: false,
      status: 403,
      action: "FORBIDDEN",
      destination: "/unauthorized",
      reason: "403 Forbidden: Staff privileges required",
      middlewareRan: true,
    };
  }

  return {
    allowed: true,
    status: 200,
    action: "AUTHORIZED",
    destination: pathname,
    session,
    middlewareRan: true,
  };
}
