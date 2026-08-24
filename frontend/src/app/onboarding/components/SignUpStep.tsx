"use client";

import { useState } from "react";
import { Check, Eye, EyeOff } from "lucide-react";
import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";
import { signInWithGoogle, signUpWithEmail } from "@/lib/auth";
import {
  getPasswordChecks,
  isValidEmail,
  passwordsMatch,
} from "@/lib/password";

const REQUIREMENTS = [
  { key: "length" as const, label: "At least 12 characters" },
  { key: "uppercase" as const, label: "One uppercase letter" },
  { key: "lowercase" as const, label: "One lowercase letter" },
  { key: "number" as const, label: "One number" },
  { key: "symbol" as const, label: "One symbol" },
];

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
      />
    </svg>
  );
}

export function SignUpStep({ onComplete }: { onComplete: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checks = getPasswordChecks(password);
  const emailValid = isValidEmail(email);
  const match = passwordsMatch(password, confirmPassword);
  const confirmTouched = confirmPassword.length > 0;
  const canSubmit =
    emailValid && checks.allMet && match && !submitting && !googleLoading;

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    setError(null);
    try {
      await signUpWithEmail(email, password);
      onComplete();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleGoogleSignIn() {
    setGoogleLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
      onComplete();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Google sign-in failed. Try again.");
    } finally {
      setGoogleLoading(false);
    }
  }

  return (
    <main className="flex flex-col min-h-screen px-6 pt-16 pb-10 gap-6">
      <div>
        <h1 className="text-3xl font-display text-cream">Save your slice</h1>
        <p className="text-muted text-sm mt-2">
          Create an account to keep your budget and spending slices synced.
        </p>
      </div>

      <form onSubmit={handleEmailSubmit} className="flex flex-col gap-5">
        <TextInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
        />

        <TextInput
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a strong password"
          autoComplete="new-password"
          endAdornment={
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="text-muted hover:text-cream transition"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          }
        />

        <TextInput
          label="Confirm password"
          type={showConfirm ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Re-enter your password"
          autoComplete="new-password"
          error={confirmTouched && !match ? "Passwords do not match" : undefined}
          endAdornment={
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              className="text-muted hover:text-cream transition"
              aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          }
        />

        <ul className="flex flex-col gap-2">
          {REQUIREMENTS.map(({ key, label }) => (
            <li key={key} className="flex items-center gap-2 text-sm">
              <Check
                size={16}
                className={checks[key] ? "text-gold" : "text-muted/40"}
              />
              <span className={checks[key] ? "text-cream" : "text-muted"}>
                {label}
              </span>
            </li>
          ))}
        </ul>

        {error && (
          <p className="text-sm text-needs bg-card rounded-2xl px-4 py-3">{error}</p>
        )}

        <Button type="submit" disabled={!canSubmit} className="w-full">
          {submitting ? "Creating account..." : "Create account"}
        </Button>
      </form>

      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-card-alt" />
        <span className="text-muted text-sm">or</span>
        <div className="flex-1 h-px bg-card-alt" />
      </div>

      <Button
        variant="secondary"
        onClick={handleGoogleSignIn}
        disabled={submitting || googleLoading}
        className="w-full flex items-center justify-center gap-3"
      >
        <GoogleIcon />
        {googleLoading ? "Signing in..." : "Continue with Google"}
      </Button>
    </main>
  );
}
