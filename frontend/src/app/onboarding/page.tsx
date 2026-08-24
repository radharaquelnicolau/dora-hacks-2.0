"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { WelcomeStep } from "./components/WelcomeStep";
import { CadenceStep } from "./components/CadenceStep";
import { RatioStep } from "./components/RatioStep";
import { SignUpStep } from "./components/SignUpStep";
import { fetchAPI } from "@/lib/api";
import { mockRatios } from "@/lib/mockData";
import type { PayCadence, RatioCategory } from "@/types";

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [cadence, setCadence] = useState<PayCadence>("biweekly");
  const [ratios, setRatios] = useState<RatioCategory>(mockRatios);
  const router = useRouter();

  function handleCadence(c: PayCadence) {
    setCadence(c);
    setStep(2);
  }

  function handleRatiosComplete(nextRatios: RatioCategory) {
    setRatios(nextRatios);
    setStep(3);
  }

  async function handleSignUpComplete() {
    try {
      await fetchAPI<RatioCategory[]>("/ratios", {
        method: "PUT",
        body: JSON.stringify({ cadence, ratios }),
      });
    } catch {
      // Fall back silently when backend is unavailable
    }
    router.push("/home");
  }

  if (step === 0) {
    return (
      <WelcomeStep
        onNext={() => setStep(1)}
        onLogin={() => router.push("/login")}
      />
    );
  }
  if (step === 1) return <CadenceStep onNext={handleCadence} />;
  if (step === 2) return <RatioStep onComplete={handleRatiosComplete} />;
  return <SignUpStep onComplete={handleSignUpComplete} />;
}
