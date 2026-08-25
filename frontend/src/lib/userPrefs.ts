import type { IncomeDates, PayCadence, RatioCategory } from "@/types";

const KEY = "pie-prefs";

export interface UserPrefs {
  cadence: PayCadence;
  incomeDates: IncomeDates;
  ratios: RatioCategory;
}

const DEFAULT_PREFS: UserPrefs = {
  cadence: "biweekly",
  incomeDates: {},
  ratios: { needs: 50, wants: 20, savings: 20, debt: 10 },
};

export function getUserPrefs(): UserPrefs {
  if (typeof window === "undefined") return DEFAULT_PREFS;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as UserPrefs) : DEFAULT_PREFS;
  } catch {
    return DEFAULT_PREFS;
  }
}

export function saveUserPrefs(prefs: UserPrefs): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(prefs));
  // Notify same-tab listeners (storage event only fires for other tabs)
  window.dispatchEvent(new Event("pie-prefs-updated"));
}
