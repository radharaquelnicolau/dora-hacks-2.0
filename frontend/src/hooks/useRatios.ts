import { useEffect, useState } from "react";
import type { RatioCategory } from "../types";
import { fetchAPI } from "../lib/api";

export function useRatios() {
  const [data, setData] = useState<RatioCategory[]>([]);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => { fetchAPI<RatioCategory[]>("/ratios").then(setData).catch(setError); }, []);
  return { data, error, isLoading: !error && data.length === 0, setData };
}
