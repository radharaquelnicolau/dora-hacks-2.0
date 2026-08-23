import { useEffect, useState } from "react";
import type { Transaction } from "../types";
import { fetchAPI } from "../lib/api";

export function useTransactions() {
  const [data, setData] = useState<Transaction[]>([]);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => { fetchAPI<Transaction[]>("/transactions").then(setData).catch(setError); }, []);
  return { data, error, isLoading: !error && data.length === 0 };
}
