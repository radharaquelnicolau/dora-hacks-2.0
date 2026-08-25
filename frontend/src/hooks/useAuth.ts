"use client";

import { useEffect, useState } from "react";
import { getAuthSession, clearAuthSession } from "@/lib/auth";
import type { AuthSession } from "@/types";

export function useAuth() {
  const [session, setSession] = useState<AuthSession | null>(null);

  useEffect(() => {
    setSession(getAuthSession());
  }, []);

  function logout() {
    clearAuthSession();
    setSession(null);
  }

  function refresh() {
    setSession(getAuthSession());
  }

  return { session, logout, refresh };
}
