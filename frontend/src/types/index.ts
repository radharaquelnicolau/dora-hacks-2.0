export type AuthMethod = "email" | "google";

export interface AuthSession {
  email: string;
  method: AuthMethod;
  signedUpAt: string;
}

export type CategoryKey = "needs" | "wants" | "savings" | "debt";
export type PayCadence = "weekly" | "biweekly" | "monthly" | "irregular";

export interface RatioCategory {
  needs: number;
  wants: number;
  savings: number;
  debt: number;
}

export interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  category: CategoryKey;
  date: string; // ISO string
}

export interface Goal {
  id: string;
  name: string;
  emoji: string;
  current: number;
  target: number;
}

export interface Debt {
  id: string;
  name: string;
  balance: number;
  minPayment: number;
  paidThisCycle: number;
}

export interface WrapCard {
  title: string;
  big: string;
  sub: string;
  bg: string; // hex
  dark?: boolean; // true = use dark text on a light background
}