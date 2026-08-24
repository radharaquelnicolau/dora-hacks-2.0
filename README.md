# Pie — Slice your paycheck. Own your money.

> Hackathon project — DoraHacks 2.0

Pie is a mobile-first budgeting app built for students with irregular income. It helps you split every paycheck into four categories — **Needs, Wants, Savings, and Debt** — using a visual donut chart and smart receipt scanning.

---

## What it does

- **Onboarding** — set your pay cadence and spending ratio slices in under a minute
- **Home** — see your budget donut, per-category spend vs. budget, and recent transactions
- **Scan** — upload a receipt photo and auto-categorize each item
- **Goals** — track savings goals and debt paydown progress
- **Wrap** — end-of-cycle summary card showing how your money moved

---

## Project structure



---

## Services

| Service | Tech | Port | How to run |
|---|---|---|---|
| Backend | 
| Frontend | Next.js 16 (App Router) | 3000 | `npm run dev` from `frontend/` |

---

## Running locally

**1. Clone the repo**
```bash
git clone https://github.com/radharaquelnicolau/dora-hacks-2.0
cd dora-hacks-2.0
git checkout frontend
```

**2. Start the backend**


**3. Start the frontend** (separate terminal)
```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the app will use mock data automatically if the backend isn't reachable.

---



## API contract

All endpoint shapes are documented in [`API_CONTRACT.md`](./API_CONTRACT.md). The frontend never talks to the database directly — all data flows through the backend REST API.

---

## Tech stack

| Layer | Stack |
|---|---|
| Frontend | Next.js 16 (App Router), TypeScript, Tailwind v4, recharts, lucide-react |
| Backend | 
| Database | 

---

## Team — DoraHacks 2.0
