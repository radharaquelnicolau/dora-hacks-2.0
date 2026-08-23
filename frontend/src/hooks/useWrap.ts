import { useEffect, useState } from "react";
import type { WrapCard } from "../types";
import { fetchAPI } from "../lib/api";

export function useWrap() {
  const [data, setData] = useState<WrapCard[]>([]);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => { fetchAPI<WrapCard[]>("/wrap").then(setData).catch(setError); }, []);
  return { data, error, isLoading: !error && data.length === 0 };
}
