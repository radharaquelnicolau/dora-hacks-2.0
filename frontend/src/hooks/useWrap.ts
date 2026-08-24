"use client";

import { useEffect, useState } from "react";
import type { WrapCard } from "@/types";
import { fetchAPI } from "@/lib/api";
import { mockWrapCards } from "@/lib/mockData";

export function useWrap() {
  const [data, setData] = useState<WrapCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAPI<WrapCard[]>("/wrap")
      .then(setData)
      .catch(() => setData(mockWrapCards))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}
