"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Donut from "@/components/ui/Donut";
import { normalizeRatios } from "@/lib/ratios";
import { CAT_COLOR, CAT_LABEL } from "@/styles/tokens";
import type { CategoryKey, RatioCategory } from "@/types";

const DEFAULT_RATIOS: RatioCategory = { needs: 50, wants: 20, savings: 20, debt: 10 };
const KEYS: CategoryKey[] = ["needs", "wants", "savings", "debt"];

export function RatioStep({ onComplete }: { onComplete: (ratios: RatioCategory) => void }) {
  const [ratios, setRatios] = useState<RatioCategory>(DEFAULT_RATIOS);

  function handleSlider(key: CategoryKey, value: number) {
    setRatios((prev) => normalizeRatios(prev, key, value));
  }

  return (
    <main className="flex flex-col min-h-screen px-6 pt-16 pb-10 gap-8">
      <div>
        <h1 className="text-3xl font-display text-cream">Set your spending slices</h1>
        <p className="text-muted text-sm mt-2">Drag to split your paycheck. They'll always add up to 100%.</p>
      </div>

      <div className="flex justify-center">
        <Donut ratios={ratios} size={200} thickness={28} centerContent={
          <span className="text-cream font-display text-lg">100%</span>
        } />
      </div>

      <div className="flex flex-col gap-5">
        {KEYS.map((key) => (
          <div key={key} className="flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span className="font-semibold" style={{ color: CAT_COLOR[key] }}>{CAT_LABEL[key]}</span>
              <span className="text-cream font-bold">{Math.round(ratios[key])}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={Math.round(ratios[key])}
              onChange={(e) => handleSlider(key, Number(e.target.value))}
              className="w-full accent-gold h-2 rounded-full"
              style={{ accentColor: CAT_COLOR[key] }}
            />
          </div>
        ))}
      </div>

      <Button onClick={() => onComplete(ratios)} className="w-full mt-auto">
        Let's go
      </Button>
    </main>
  );
}
