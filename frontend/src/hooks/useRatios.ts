"use client";

import { useEffect, useState } from "react";
import type { RatioCategory } from "@/types";
import { fetchAPI } from "@/lib/api";
import { mockRatios } from "@/lib/mockData";

export function useRatios() {
  const [data, setData] = useState<RatioCategory>(mockRatios);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAPI<RatioCategory>("/ratios")
      .then(setData)
      .catch(() => setData(mockRatios))
      .finally(() => setLoading(false));
  }, []);

  return { data, setData, loading };
}
