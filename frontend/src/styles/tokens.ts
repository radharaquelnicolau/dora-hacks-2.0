import type { CategoryKey } from "@/types";

// Single source of truth for colors used outside plain Tailwind classes —
// e.g. the Donut chart (recharts needs raw hex, not class names).
// These mirror the CSS variables defined in globals.css's @theme block.

export const C = {
  crust: "#241812",
  crustDark: "#15100c",
  card: "#33241b",
  cardAlt: "#3d2b20",
  cream: "#fcefdd",
  muted: "#b9a08c",
  gold: "#f2a93b",
  page: "#ede6dc",

  needs: "#e8483c",
  wants: "#ffd84d",
  savings: "#6c63ff",
  debt: "#c23b6b",
} as const;

export const CAT_LABEL: Record<CategoryKey, string> = {
  needs: "Needs",
  wants: "Wants",
  savings: "Savings",
  debt: "Debt",
};

export const CAT_COLOR: Record<CategoryKey, string> = {
  needs: C.needs,
  wants: C.wants,
  savings: C.savings,
  debt: C.debt,
};