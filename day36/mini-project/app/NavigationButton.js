"use client";

import { useRouter } from "next/navigation";

/**
 * Exercise 5: Client component that navigates programmatically using useRouter()
 */
export default function NavigationButton({ target = "/menu", label = "Navigate" }) {
  const router = useRouter();

  return (
    <button
      type="button"
      className="btn-router-push"
      onClick={() => router.push(target)}
    >
      ⚡ {label}
    </button>
  );
}
