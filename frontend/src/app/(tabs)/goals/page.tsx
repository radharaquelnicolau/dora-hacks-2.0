"use client";

import { mockDebts, mockGoals } from "@/lib/mockData";
import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";
import { C } from "@/styles/tokens";

export default function GoalsPage() {
  const goals = mockGoals;
  const debts = mockDebts;

  return (
    <div className="flex flex-col px-4 pt-8 pb-28 gap-6">
      {/* Goals */}
      <div className="flex flex-col gap-3">
        <h2 className="text-cream font-display text-xl">Goals</h2>
        {goals.map((goal) => {
          const pct = Math.min(100, (goal.current / goal.target) * 100);
          return (
            <Card key={goal.id} className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{goal.emoji}</span>
                  <p className="text-cream font-semibold">{goal.name}</p>
                </div>
                <span className="text-muted text-sm">{Math.round(pct)}%</span>
              </div>
              <ProgressBar value={goal.current} max={goal.target} color={C.savings} />
              <div className="flex justify-between text-sm">
                <span className="text-muted">${goal.current.toLocaleString()} saved</span>
                <span className="text-cream font-semibold">${goal.target.toLocaleString()} goal</span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Debts */}
      <div className="flex flex-col gap-3">
        <h2 className="text-cream font-display text-xl">Debt</h2>
        {debts.map((debt) => {
          const paid = debt.paidThisCycle;
          return (
            <Card key={debt.id} className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <p className="text-cream font-semibold">{debt.name}</p>
                <span className="text-xs font-semibold px-2 py-1 rounded-full"
                  style={{ background: `${C.debt}33`, color: C.debt }}>
                  ${debt.balance.toLocaleString()} left
                </span>
              </div>
              <ProgressBar value={paid} max={debt.minPayment} color={C.debt} />
              <div className="flex justify-between text-sm">
                <span className="text-muted">${paid} paid this cycle</span>
                <span className="text-cream font-semibold">${debt.minPayment} min</span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
