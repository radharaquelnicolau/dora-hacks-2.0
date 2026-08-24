"use client";

import { useEffect, useState } from "react";
import type { Transaction } from "@/types";
import { fetchAPI } from "@/lib/api";
import { mockTransactions } from "@/lib/mockData";

export function useTransactions() {
  const [data, setData] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAPI<Transaction[]>("/transactions")
      .then(setData)
      .catch(() => setData(mockTransactions))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}
