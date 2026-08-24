"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import type { PayCadence } from "@/types";

const OPTIONS: { value: PayCadence; label: string; desc: string }[] = [
  { value: "weekly", label: "Weekly", desc: "Every 7 days" },
  { value: "biweekly", label: "Bi-weekly", desc: "Every 2 weeks" },
  { value: "monthly", label: "Monthly", desc: "Once a month" },
  { value: "irregular", label: "Irregular", desc: "Gig work / variable income" },
];

export function CadenceStep({ onNext }: { onNext: (cadence: PayCadence) => void }) {
  const [selected, setSelected] = useState<PayCadence>("biweekly");

  return (
    <main className="flex flex-col min-h-screen px-6 pt-16 pb-10 gap-8">
      <div>
        <h1 className="text-3xl font-display text-cream">How often do you get paid?</h1>
        <p className="text-muted text-sm mt-2">We'll use this to track your budget cycle.</p>
      </div>

      <div className="flex flex-col gap-3">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setSelected(opt.value)}
            className={`flex justify-between items-center rounded-2xl px-5 py-4 text-left transition border ${
              selected === opt.value
                ? "bg-card-alt border-gold text-cream"
                : "bg-card border-transparent text-muted"
            }`}
          >
            <div>
              <p className="font-semibold text-cream">{opt.label}</p>
              <p className="text-sm text-muted">{opt.desc}</p>
            </div>
            {selected === opt.value && (
              <span className="w-4 h-4 rounded-full bg-gold shrink-0" />
            )}
          </button>
        ))}
      </div>

      <Button onClick={() => onNext(selected)} className="w-full mt-auto">Continue</Button>
    </main>
  );
}
