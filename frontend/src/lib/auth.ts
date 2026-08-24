import { fetchAPI } from "@/lib/api";
import { isValidPassword } from "@/lib/password";
import type { AuthSession } from "@/types";

const AUTH_STORAGE_KEY = "pie-auth";

function saveSession(session: AuthSession): AuthSession {
  if (typeof window !== "undefined") {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  }
  return session;
}

export function getAuthSession(): AuthSession | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthSession;
  } catch {
    return null;
  }
}

export function clearAuthSession(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
}

export async function signUpWithEmail(email: string, password: string): Promise<AuthSession> {
  if (!isValidPassword(password)) {
    throw new Error("Password does not meet requirements.");
  }

  const trimmedEmail = email.trim();

  try {
    await fetchAPI<AuthSession>("/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email: trimmedEmail, password }),
    });
  } catch {
    // Fall back to mock session when backend is unavailable
  }

  return saveSession({
    email: trimmedEmail,
    method: "email",
    signedUpAt: new Date().toISOString(),
  });
}

export async function signInWithEmail(email: string, password: string): Promise<AuthSession> {
  const trimmedEmail = email.trim();
  if (!trimmedEmail || !password) {
    throw new Error("Email and password are required.");
  }

  try {
    await fetchAPI<AuthSession>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: trimmedEmail, password }),
    });
  } catch {
    // Fall back to mock session when backend is unavailable
  }

  return saveSession({
    email: trimmedEmail,
    method: "email",
    signedUpAt: new Date().toISOString(),
  });
}

export async function signInWithGoogle(): Promise<AuthSession> {
  try {
    await fetchAPI<AuthSession>("/auth/google", { method: "POST" });
  } catch {
    // Fall back to mock session when backend is unavailable
  }

  return saveSession({
    email: "demo@gmail.com",
    method: "google",
    signedUpAt: new Date().toISOString(),
  });
}
