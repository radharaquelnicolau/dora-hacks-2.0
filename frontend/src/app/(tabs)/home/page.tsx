"use client";

import Donut from "@/components/ui/Donut";
import Card from "@/components/ui/Card";
import Pill from "@/components/ui/Pill";
import ProgressBar from "@/components/ui/ProgressBar";
import { useTransactions } from "@/hooks/useTransactions";
import { useRatios } from "@/hooks/useRatios";
import { CAT_COLOR, CAT_LABEL } from "@/styles/tokens";
import type { CategoryKey } from "@/types";

const CATEGORY_KEYS: CategoryKey[] = ["needs", "wants", "savings", "debt"];

export default function HomePage() {
  const { data: transactions } = useTransactions();
  const { data: ratios } = useRatios();

  const totalSpent = transactions.reduce((sum, t) => sum + t.amount, 0);
  const spentByCategory = CATEGORY_KEYS.reduce((acc, key) => {
    acc[key] = transactions.filter((t) => t.category === key).reduce((s, t) => s + t.amount, 0);
    return acc;
  }, {} as Record<CategoryKey, number>);

  const mockIncome = 1240;
  const recent = transactions.slice(0, 5);

  return (
    <div className="flex flex-col gap-5 px-4 pt-8 pb-28">
      <div>
        <p className="text-muted text-sm">This cycle</p>
        <h1 className="text-3xl font-display text-cream">${mockIncome.toLocaleString()} <span className="text-muted text-lg font-body font-normal">income</span></h1>
      </div>

      {/* Donut */}
      <div className="flex justify-center">
        <Donut
          ratios={ratios}
          size={200}
          thickness={28}
          centerContent={
            <div className="flex flex-col items-center">
              <span className="text-muted text-xs">spent</span>
              <span className="text-cream font-display text-xl">${totalSpent.toFixed(0)}</span>
            </div>
          }
        />
      </div>

      {/* Category cards */}
      <div className="grid grid-cols-2 gap-3">
        {CATEGORY_KEYS.map((key) => {
          const budget = (ratios[key] / 100) * mockIncome;
          const spent = spentByCategory[key];
          return (
            <Card key={key} className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold" style={{ color: CAT_COLOR[key] }}>
                  {CAT_LABEL[key]}
                </span>
                <span className="text-xs text-muted">{ratios[key]}%</span>
              </div>
              <p className="text-cream font-bold text-lg leading-none">${spent.toFixed(0)}</p>
              <p className="text-muted text-xs">of ${budget.toFixed(0)}</p>
              <ProgressBar value={spent} max={budget} color={CAT_COLOR[key]} />
            </Card>
          );
        })}
      </div>

      {/* Recent transactions */}
      <div className="flex flex-col gap-3">
        <h2 className="text-cream font-display text-lg">Recent</h2>
        {recent.map((t) => (
          <Card key={t.id} className="flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <p className="text-cream font-semibold text-sm">{t.merchant}</p>
              <Pill category={t.category} />
            </div>
            <p className="text-cream font-bold">-${t.amount.toFixed(2)}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
