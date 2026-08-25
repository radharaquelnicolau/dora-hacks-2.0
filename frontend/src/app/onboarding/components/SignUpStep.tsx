"use client";

import { useState } from "react";
import { Check, Eye, EyeOff } from "lucide-react";
import GoogleIcon from "@/components/auth/GoogleIcon";
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
