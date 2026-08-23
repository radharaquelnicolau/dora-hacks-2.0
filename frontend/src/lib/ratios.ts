import type { CategoryKey } from "../types";

export function normalizeRatios(prev: Record<CategoryKey, number>, key: CategoryKey, newVal: number) {
  const value = Math.min(100, Math.max(0, newVal));
  const otherKeys = (Object.keys(prev) as CategoryKey[]).filter((item) => item !== key);
  const remaining = 100 - value;
  const otherTotal = otherKeys.reduce((sum, item) => sum + prev[item], 0);
  return Object.fromEntries(Object.keys(prev).map((item) => {
    const category = item as CategoryKey;
    if (category === key) return [category, value];
    return [category, otherTotal ? (prev[category] / otherTotal) * remaining : remaining / otherKeys.length];
  })) as Record<CategoryKey, number>;
}
