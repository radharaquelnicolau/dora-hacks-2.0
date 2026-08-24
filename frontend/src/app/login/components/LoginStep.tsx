"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import GoogleIcon from "@/components/auth/GoogleIcon";
import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";
import { signInWithEmail, signInWithGoogle } from "@/lib/auth";
import { isValidEmail } from "@/lib/password";

export function LoginStep({ onComplete }: { onComplete: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const emailValid = isValidEmail(email);
  const passwordValid = password.length > 0;
  const canSubmit =
    emailValid && passwordValid && !submitting && !googleLoading;

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    setError(null);
    try {
      await signInWithEmail(email, password);
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
        <h1 className="text-3xl font-display text-cream">Welcome back</h1>
        <p className="text-muted text-sm mt-2">
          Log in to pick up where you left off with your budget slices.
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
          placeholder="Enter your password"
          autoComplete="current-password"
          labelExtra={
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="text-xs text-gold hover:underline"
            >
              Forgot Password
            </a>
          }
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

        {error && (
          <p className="text-sm text-needs bg-card rounded-2xl px-4 py-3">{error}</p>
        )}

        <Button type="submit" disabled={!canSubmit} className="w-full">
          {submitting ? "Logging in..." : "Log in"}
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
        {googleLoading ? "Signing in..." : "Log in with Gmail"}
      </Button>
    </main>
  );
}
