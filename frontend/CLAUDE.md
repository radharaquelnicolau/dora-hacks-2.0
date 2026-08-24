# Pie — Frontend

Budgeting app for students with irregular income. Hackathon project.
"Slice your paycheck. Own your money."

This file is for Claude Code (or any AI agent working in this repo). Read it
before making changes — it explains conventions this project depends on that
aren't obvious from the code alone.

## Stack

- Next.js (App Router), TypeScript, `src/` directory enabled
- Tailwind v4 — colors/fonts defined via `@theme` in `src/app/globals.css`, NOT a `tailwind.config.ts`
- recharts (Donut chart on Home/Onboarding/Wrap)
- lucide-react (icons)
- No state management library — `useState` for local UI state, hooks in `src/hooks/` for server state

## Critical: backend is a separate service

This repo is **frontend only**. Do not create anything under `src/app/api/`.
All backend calls go through `src/lib/api.ts`, which reads `NEXT_PUBLIC_API_URL`
from `.env.local`. See `API_CONTRACT.md` at repo root for endpoint shapes —
check it before assuming a response shape; don't guess.

Every hook in `src/hooks/` should fall back to `src/lib/mockData.ts` if the
backend call fails or `NEXT_PUBLIC_API_URL` is unset, so the UI stays demoable
even when the backend isn't running.

## Folder structure

```
src/
├── app/
│   ├── layout.tsx, globals.css, page.tsx
│   ├── onboarding/            # 3-step flow: welcome -> cadence -> ratio builder
│   └── (tabs)/                # route group — folder name has parens, doesn't affect URL
│       ├── layout.tsx         # renders <BottomNav/> + children
│       ├── home/page.tsx
│       ├── scan/page.tsx
│       ├── goals/page.tsx
│       └── wrap/page.tsx
├── components/
│   ├── ui/                    # Donut, ProgressBar, Card, Pill, Button — done, don't rebuild these
│   └── layout/BottomNav.tsx   # done
├── lib/
│   ├── api.ts                 # fetch wrapper — route ALL backend calls through this
│   ├── mockData.ts            # fake data, must match types/index.ts exactly
│   └── ratios.ts              # normalizeRatios() — keeps the 4 sliders summing to 100
├── types/index.ts             # Transaction, RatioCategory, CategoryKey, Goal, Debt, WrapCard, PayCadence
├── hooks/                     # useTransactions, useRatios, useWrap — wrap lib/api.ts calls
└── styles/tokens.ts           # color palette in JS form, for anything that needs raw hex (e.g. recharts)
```

## Design tokens

Colors live in two places that must stay in sync:
- `src/app/globals.css` (`@theme` block) — gives Tailwind classes like `bg-crust`, `text-gold`, `bg-card-alt`
- `src/styles/tokens.ts` — same colors as a JS object (`C.gold`, `CAT_COLOR.needs`, etc.) for components that need a raw hex string (recharts `fill` prop, inline styles)

| Token | Hex | Use |
|---|---|---|
| `crust` | `#241812` | app background |
| `card` | `#33241b` | card surfaces |
| `cardAlt` / `card-alt` | `#3d2b20` | secondary surfaces, modals |
| `cream` | `#fcefdd` | primary text |
| `muted` | `#b9a08c` | secondary text |
| `gold` | `#f2a93b` | primary CTA / accent |
| `needs` | `#e8483c` | category |
| `wants` | `#ffd84d` | category |
| `savings` | `#6c63ff` | category |
| `debt` | `#c23b6b` | category |

Fonts: `Baloo 2` for headings (`font-display`), `Manrope` for body (`font-body`).
Radius: `rounded-2xl` on cards, `rounded-full` on buttons/pills/chips. Never sharp corners.

## Conventions

- **Server Components by default.** Add `"use client"` only when a component uses `useState`, `usePathname`, event handlers, or browser-only APIs (file input, geolocation).
- **Path alias `@/*` maps to `src/*`** — always import via `@/components/...`, `@/lib/...`, `@/types`, `@/styles/tokens`, never relative paths across folders.
- **Category colors always come from `CAT_COLOR` / `CAT_LABEL` in `styles/tokens.ts`** — never hardcode a category hex value inline in a new component.
- **Ratio sliders must always sum to 100.** Use `lib/ratios.ts`'s `normalizeRatios(prev, key, newValue)` — don't write ad hoc rebalancing logic.
- **`@import` rules in globals.css must come before everything else**, including the `@theme` block — this already broke once, don't reorder it.

## Status — what's done vs. not

Done:
- `components/ui/`: Donut, ProgressBar, Card, Pill, Button
- `components/layout/BottomNav.tsx` + `app/(tabs)/layout.tsx`
- `types/index.ts`, `styles/tokens.ts`, `globals.css`
- `lib/mockData.ts` — filled with realistic transactions, ratios, goals, debts, wrap cards
- `lib/ratios.ts` — normalizeRatios() implemented
- `hooks/useTransactions`, `useRatios`, `useWrap` — all fall back to mockData on API failure
- `home/page.tsx` — income header, Donut chart, per-category budget cards with ProgressBar, recent transactions list
- `onboarding/` — full 3-step flow: WelcomeStep (branding), CadenceStep (option selector), RatioStep (live sliders + Donut preview); redirects to /home on complete
- `scan/page.tsx` — idle (file upload + demo shortcut) → processing (spinner) → confirm (editable category pills per item) states
- `goals/page.tsx` — Goals section (emoji + ProgressBar + amounts) + Debt section (balance + min payment progress)
- `wrap/page.tsx` — styled wrap cards from useWrap hook with dark-text support

Remaining:
1. Wire BottomNav icons (currently text links — add lucide-react icons)
2. Swap mock data for real API calls once backend endpoints are live (`NEXT_PUBLIC_API_URL` in `.env.local`)
3. Persist onboarding cadence + ratios to backend via `PUT /ratios`
4. POST confirmed scan transactions to backend

## Commands

```bash
npm run dev          # start dev server
npm install           # after pulling changes that touch package.json
```

## Before committing

- Confirm the dev server has no red errors in terminal or browser console
- Check `/home`, `/scan`, `/goals`, `/wrap` all still route correctly and bottom nav highlights the active tab
- Small commits, feature branches (`feat/...`), don't push directly to `main`

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
