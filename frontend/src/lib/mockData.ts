import type { Debt, Goal, RatioCategory, Transaction, WrapCard } from "@/types";

export const mockTransactions: Transaction[] = [
  { id: "t1", merchant: "Whole Foods", amount: 54.32, category: "needs", date: "2026-08-22T10:14:00Z" },
  { id: "t2", merchant: "Netflix", amount: 15.99, category: "wants", date: "2026-08-21T08:00:00Z" },
  { id: "t3", merchant: "Spotify", amount: 9.99, category: "wants", date: "2026-08-20T08:00:00Z" },
  { id: "t4", merchant: "Sallie Mae", amount: 120.0, category: "debt", date: "2026-08-19T12:00:00Z" },
  { id: "t5", merchant: "Vanguard", amount: 50.0, category: "savings", date: "2026-08-18T09:00:00Z" },
  { id: "t6", merchant: "Target", amount: 38.74, category: "needs", date: "2026-08-17T15:30:00Z" },
  { id: "t7", merchant: "Chipotle", amount: 12.85, category: "wants", date: "2026-08-16T13:00:00Z" },
  { id: "t8", merchant: "CVS Pharmacy", amount: 21.50, category: "needs", date: "2026-08-15T11:00:00Z" },
  { id: "t9", merchant: "HYSA Transfer", amount: 75.0, category: "savings", date: "2026-08-14T09:00:00Z" },
  { id: "t10", merchant: "Credit Card Min.", amount: 35.0, category: "debt", date: "2026-08-13T12:00:00Z" },
];

export const mockRatios: RatioCategory = {
  needs: 50,
  wants: 20,
  savings: 20,
  debt: 10,
};

export const mockGoals: Goal[] = [
  { id: "g1", name: "Emergency Fund", emoji: "🛡️", current: 650, target: 1000 },
  { id: "g2", name: "New Laptop", emoji: "💻", current: 280, target: 800 },
  { id: "g3", name: "Spring Break Trip", emoji: "✈️", current: 120, target: 500 },
];

export const mockDebts: Debt[] = [
  { id: "d1", name: "Student Loan", balance: 4200, minPayment: 120, paidThisCycle: 120 },
  { id: "d2", name: "Credit Card", balance: 740, minPayment: 35, paidThisCycle: 35 },
];

export const mockWrapCards: WrapCard[] = [
  { title: "This cycle you earned", big: "$1,240", sub: "from 3 different sources", bg: "#33241b" },
  { title: "Biggest slice", big: "Needs", sub: "50% of your paycheck — right on target", bg: "#e8483c" },
  { title: "You saved", big: "$125", sub: "across 2 goals this cycle", bg: "#6c63ff" },
  { title: "Debt crushed", big: "$155", sub: "min payments + extra this cycle", bg: "#c23b6b" },
  { title: "Treat yourself", big: "$248", sub: "spent on wants — you earned it", bg: "#ffd84d", dark: true },
];
