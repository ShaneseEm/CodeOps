import { createContext, useContext } from "react";

export const AuthContext = createContext(null);

/**
 * useAuth - Guarded Context Hook
 *
 * Requirement: Throws a clear, actionable error when called outside AuthProvider.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuth must be used within an <AuthProvider>. Make sure <AuthProvider> is wrapped around your component tree."
    );
  }
  return context;
}

export default useAuth;
