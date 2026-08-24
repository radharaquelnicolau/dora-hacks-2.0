# Pie — Frontend

Mobile-first Next.js app for the Pie budgeting hackathon project.

> **Stack:** Next.js 16 (App Router) · TypeScript · Tailwind v4 · recharts · lucide-react

---

## Getting started

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app redirects to `/onboarding` on first visit.

The frontend falls back to built-in mock data automatically if the backend isn't running — no backend needed for UI development.

---

## Environment

Create `frontend/.env.local` with:

```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

Omit this file (or leave the URL pointing to a non-running server) to use mock data.

---

## Pages

| Route | File | Description |
|---|---|---|
| `/` | `app/page.tsx` | Redirects to `/onboarding` |
| `/onboarding` | `app/onboarding/page.tsx` | 3-step flow: welcome → pay cadence → ratio sliders |
| `/home` | `app/(tabs)/home/page.tsx` | Income header, donut chart, category budget cards, recent transactions |
| `/scan` | `app/(tabs)/scan/page.tsx` | Receipt upload → processing spinner → confirm + re-categorize items |
| `/goals` | `app/(tabs)/goals/page.tsx` | Savings goals and debt paydown progress |
| `/wrap` | `app/(tabs)/wrap/page.tsx` | End-of-cycle summary cards |

---

## Folder structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (fonts, global styles)
│   ├── globals.css             # Tailwind @theme tokens + base styles
│   ├── page.tsx                # → redirects to /onboarding
│   ├── onboarding/
│   │   ├── page.tsx            # Step controller (useState)
│   │   └── components/
│   │       ├── WelcomeStep.tsx
│   │       ├── CadenceStep.tsx
│   │       └── RatioStep.tsx   # Live sliders + Donut preview
│   └── (tabs)/
│       ├── layout.tsx          # Wraps all tab pages with <BottomNav>
│       ├── home/page.tsx
│       ├── scan/page.tsx
│       ├── goals/page.tsx
│       └── wrap/page.tsx
├── components/
│   ├── ui/
│   │   ├── Button.tsx          # variant: primary | secondary | ghost
│   │   ├── Card.tsx            # rounded-2xl bg-card wrapper
│   │   ├── Donut.tsx           # recharts PieChart donut, takes RatioCategory
│   │   ├── Pill.tsx            # category color badge
│   │   └── ProgressBar.tsx     # bar-track / bar-fill CSS classes
│   └── layout/
│       └── BottomNav.tsx       # Fixed bottom nav, active tab = gold
├── hooks/
│   ├── useTransactions.ts      # GET /transactions, falls back to mockTransactions
│   ├── useRatios.ts            # GET /ratios, falls back to mockRatios
│   └── useWrap.ts              # GET /wrap, falls back to mockWrapCards
├── lib/
│   ├── api.ts                  # fetch wrapper — all backend calls go through here
│   ├── mockData.ts             # realistic fake data matching types/index.ts
│   └── ratios.ts               # normalizeRatios() — keeps 4 sliders summing to 100
├── styles/
│   └── tokens.ts               # C.* colors + CAT_COLOR + CAT_LABEL (for recharts / inline styles)
└── types/
    └── index.ts                # Transaction, RatioCategory, Goal, Debt, WrapCard, PayCadence
```

---

## Design tokens

Colors are defined in two places that must stay in sync:

- `globals.css` `@theme` block → Tailwind classes (`bg-crust`, `text-gold`, `bg-card-alt` …)
- `styles/tokens.ts` → JS object (`C.gold`, `CAT_COLOR.needs` …) for recharts and inline styles

| Token | Hex | Tailwind class | Use |
|---|---|---|---|
| `crust` | `#241812` | `bg-crust` | App background |
| `card` | `#33241b` | `bg-card` | Card surfaces |
| `card-alt` | `#3d2b20` | `bg-card-alt` | Secondary surfaces |
| `cream` | `#fcefdd` | `text-cream` | Primary text |
| `muted` | `#b9a08c` | `text-muted` | Secondary text |
| `gold` | `#f2a93b` | `text-gold` / `bg-gold` | CTA, active tab, accent |
| `needs` | `#e8483c` | `text-needs` | Category color |
| `wants` | `#ffd84d` | `text-wants` | Category color |
| `savings` | `#6c63ff` | `text-savings` | Category color |
| `debt` | `#c23b6b` | `text-debt` | Category color |

Fonts: `Baloo 2` → `font-display` (headings) · `Manrope` → `font-body` (body)

---

## Key conventions

- **`"use client"` only when needed** — hooks, event handlers, `useState`, `usePathname`, file inputs
- **Always import via `@/`** — never use relative paths across folders (`@/components/...`, `@/lib/...`)
- **Category colors always from `CAT_COLOR`** in `styles/tokens.ts` — never hardcode hex inline
- **Ratio sliders must use `normalizeRatios()`** from `lib/ratios.ts` — never write custom rebalancing
- **`@import` must come first** in `globals.css` before `@theme` — this already broke once, don't reorder

---

## Backend integration

When the backend is ready, the following TODOs remain in the frontend:

1. **`onboarding/page.tsx` `handleComplete()`** — POST cadence + ratios via `PUT /ratios`
2. **`scan/page.tsx` `handleConfirm()`** — POST confirmed transactions to backend
3. Hooks auto-switch from mock data to real API as soon as `NEXT_PUBLIC_API_URL` points to a live server

See [`API_CONTRACT.md`](../API_CONTRACT.md) at the repo root for endpoint shapes.
