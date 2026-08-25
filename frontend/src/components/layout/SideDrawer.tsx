"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { X, LogOut, LogIn, UserPlus, Mail, Settings, Check } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/ui/Button";
import GoogleIcon from "@/components/auth/GoogleIcon";
import { CAT_COLOR, CAT_LABEL, C } from "@/styles/tokens";
import { normalizeRatios } from "@/lib/ratios";
import { getUserPrefs, saveUserPrefs } from "@/lib/userPrefs";
import type { CategoryKey, PayCadence, RatioCategory } from "@/types";

interface SideDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CADENCE_OPTIONS: { value: PayCadence; label: string }[] = [
  { value: "weekly", label: "Weekly" },
  { value: "biweekly", label: "Bi-weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "irregular", label: "Irregular" },
];

const RATIO_KEYS: CategoryKey[] = ["needs", "wants", "savings", "debt"];

const DEFAULT_RATIOS: RatioCategory = { needs: 50, wants: 20, savings: 20, debt: 10 };

export function SideDrawer({ open, onClose }: SideDrawerProps) {
  const { session, logout } = useAuth();
  const router = useRouter();

  const [cadence, setCadence] = useState<PayCadence>("biweekly");
  // savedRatios = committed to storage (shown in the "Current" section)
  const [savedRatios, setSavedRatios] = useState<RatioCategory>(DEFAULT_RATIOS);
  // draft = what the sliders show while editing (not saved yet)
  const [draft, setDraft] = useState<RatioCategory>(DEFAULT_RATIOS);
  const [justSaved, setJustSaved] = useState(false);

  // Load from localStorage each time the drawer opens
  useEffect(() => {
    if (open) {
      const prefs = getUserPrefs();
      setCadence(prefs.cadence);
      setSavedRatios(prefs.ratios);
      setDraft(prefs.ratios);
      setJustSaved(false);
    }
  }, [open]);

  function handleSlider(key: CategoryKey, value: number) {
    setDraft((prev) => normalizeRatios(prev, key, value));
    setJustSaved(false);
  }

  function handleSave() {
    const prefs = getUserPrefs();
    saveUserPrefs({ ...prefs, cadence, ratios: draft });
    setSavedRatios(draft);
    setJustSaved(true);
  }

  function handleLogout() {
    logout();
    onClose();
    router.push("/onboarding");
  }

  const initials = session?.email ? session.email[0].toUpperCase() : "?";
  const joinedDate = session?.signedUpAt
    ? new Date(session.signedUpAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : null;

  const draftChanged = RATIO_KEYS.some((k) => Math.round(draft[k]) !== Math.round(savedRatios[k]));

  return (
    <>
      {open && <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} />}

      <aside
        className={`fixed top-0 left-0 h-full w-72 z-50 flex flex-col transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ background: C.card }}
      >
        <div className="flex justify-end p-4 shrink-0">
          <button onClick={onClose} className="text-muted hover:text-cream transition p-1">
            <X size={22} />
          </button>
        </div>

        <div className="flex flex-col flex-1 overflow-y-auto px-5 pb-8 gap-8">

          {/* ── 1: About ── */}
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">About</p>
            <div className="rounded-2xl p-4 flex flex-col gap-2" style={{ background: C.cardAlt }}>
              <h2 className="text-2xl font-display text-cream">Pie 🥧</h2>
              <p className="text-muted text-sm leading-relaxed">Slice your paycheck. Own your money.</p>
              <p className="text-muted text-xs leading-relaxed">
                Built for students with irregular income — split every paycheck into Needs, Wants, Savings, and Debt.
              </p>
              <div className="mt-2 pt-3 border-t border-card">
                <p className="text-xs text-muted">DoraHacks 2.0 · 2026</p>
              </div>
            </div>
          </div>

          {/* ── 2: Profile ── */}
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">Profile</p>
            <div className="rounded-2xl p-4 flex flex-col gap-3" style={{ background: C.cardAlt }}>
              {session ? (
                <>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-display text-lg shrink-0"
                      style={{ background: C.gold, color: C.crust }}
                    >
                      {initials}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <p className="text-cream font-semibold text-sm truncate">{session.email}</p>
                      {joinedDate && <p className="text-muted text-xs">Joined {joinedDate}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {session.method === "google" ? (
                      <span className="w-4 h-4 flex items-center justify-center"><GoogleIcon /></span>
                    ) : (
                      <Mail size={14} className="text-muted" />
                    )}
                    <span className="text-xs text-muted capitalize">{session.method} account</span>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: C.card, border: `1px solid ${C.muted}33` }}>
                    <span className="text-muted text-lg">?</span>
                  </div>
                  <div>
                    <p className="text-cream font-semibold text-sm">Not signed in</p>
                    <p className="text-muted text-xs">Your data is stored locally</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── 3: Settings ── */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Settings size={14} className="text-muted" />
              <p className="text-xs font-semibold uppercase tracking-widest text-muted">Settings</p>
            </div>
            <div className="rounded-2xl p-4 flex flex-col gap-5" style={{ background: C.cardAlt }}>

              {/* Current saved values — read-only, never changes while dragging */}
              <div className="flex flex-col gap-2">
                <p className="text-cream text-xs font-semibold uppercase tracking-wide">Current (saved)</p>
                <div className="flex flex-col gap-1.5">
                  {RATIO_KEYS.map((key) => (
                    <div key={key} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ background: CAT_COLOR[key] }} />
                      <span className="text-xs text-muted flex-1">{CAT_LABEL[key]}</span>
                      <span className="text-xs font-bold text-cream">{Math.round(savedRatios[key])}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-px" style={{ background: C.card }} />

              {/* Pay cadence */}
              <div className="flex flex-col gap-2">
                <p className="text-cream text-sm font-semibold">Pay cadence</p>
                <div className="grid grid-cols-2 gap-2">
                  {CADENCE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => { setCadence(opt.value); setJustSaved(false); }}
                      className="rounded-xl px-3 py-2 text-xs font-semibold transition border"
                      style={{
                        background: cadence === opt.value ? `${C.gold}22` : C.card,
                        borderColor: cadence === opt.value ? C.gold : "transparent",
                        color: cadence === opt.value ? C.gold : C.muted,
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Draft ratio sliders */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <p className="text-cream text-sm font-semibold">Spending slices</p>
                  {draftChanged && (
                    <span className="text-xs text-gold">unsaved changes</span>
                  )}
                </div>
                {RATIO_KEYS.map((key) => (
                  <div key={key} className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs">
                      <span style={{ color: CAT_COLOR[key] }} className="font-semibold">
                        {CAT_LABEL[key]}
                      </span>
                      <span className="text-cream font-bold">{Math.round(draft[key])}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={Math.round(draft[key])}
                      onChange={(e) => handleSlider(key, Number(e.target.value))}
                      className="w-full h-1.5 rounded-full"
                      style={{ accentColor: CAT_COLOR[key] }}
                    />
                  </div>
                ))}
              </div>

              {/* Save button */}
              <button
                onClick={handleSave}
                className="flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition"
                style={{
                  background: justSaved ? `${C.savings}33` : C.gold,
                  color: justSaved ? C.savings : C.crust,
                }}
              >
                {justSaved ? <><Check size={15} /> Saved</> : "Save changes"}
              </button>
            </div>
          </div>

          {/* ── 4: Account ── */}
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">Account</p>
            <div className="flex flex-col gap-3">
              {session ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 text-left transition"
                  style={{ background: C.cardAlt }}
                >
                  <LogOut size={18} className="text-needs shrink-0" />
                  <div>
                    <p className="text-cream font-semibold text-sm">Log out</p>
                    <p className="text-muted text-xs">You'll be taken back to onboarding</p>
                  </div>
                </button>
              ) : (
                <>
                  <Button onClick={() => { onClose(); router.push("/login"); }}
                    className="w-full flex items-center justify-center gap-2">
                    <LogIn size={16} /> Log in
                  </Button>
                  <Button variant="secondary"
                    onClick={() => { onClose(); router.push("/onboarding"); }}
                    className="w-full flex items-center justify-center gap-2">
                    <UserPlus size={16} /> Create account
                  </Button>
                </>
              )}
            </div>
          </div>

        </div>
      </aside>
    </>
  );
}
