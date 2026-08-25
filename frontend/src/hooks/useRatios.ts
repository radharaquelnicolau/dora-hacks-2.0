"use client";

import { useEffect, useState } from "react";
import type { RatioCategory } from "@/types";
import { fetchAPI } from "@/lib/api";
import { getUserPrefs, saveUserPrefs } from "@/lib/userPrefs";

const DEFAULT_RATIOS: RatioCategory = { needs: 50, wants: 20, savings: 20, debt: 10 };

export function useRatios() {
  // Start with the safe default (same on server and client) to avoid hydration mismatch.
  // localStorage is read only inside useEffect, which is client-only.
  const [data, setData] = useState<RatioCategory>(DEFAULT_RATIOS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load persisted prefs first so the UI shows the user's saved values
    setData(getUserPrefs().ratios);

    fetchAPI<RatioCategory>("/ratios")
      .then((r) => {
        setData(r);
        const prefs = getUserPrefs();
        saveUserPrefs({ ...prefs, ratios: r });
      })
      .catch(() => setData(getUserPrefs().ratios))
      .finally(() => setLoading(false));
  }, []);

  // Re-read from storage when user saves settings in the drawer
  useEffect(() => {
    function onPrefsSaved() {
      setData(getStoredRatios());
    }
    window.addEventListener("pie-prefs-updated", onPrefsSaved);
    return () => window.removeEventListener("pie-prefs-updated", onPrefsSaved);
  }, []);

  return { data, setData, loading };
}
