"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { WelcomeStep } from "./components/WelcomeStep";
import { CadenceStep } from "./components/CadenceStep";
import { IncomeDateStep } from "./components/IncomeDateStep";
import { RatioStep } from "./components/RatioStep";
import { SignUpStep } from "./components/SignUpStep";
import { fetchAPI } from "@/lib/api";
import { mockRatios } from "@/lib/mockData";
import { saveUserPrefs } from "@/lib/userPrefs";
import type { PayCadence, RatioCategory, IncomeDates } from "@/types";

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [cadence, setCadence] = useState<PayCadence>("biweekly");
  const [incomeDates, setIncomeDates] = useState<IncomeDates>({});
  const [ratios, setRatios] = useState<RatioCategory>(mockRatios);
  const router = useRouter();

  function handleCadence(c: PayCadence) {
    setCadence(c);
    setStep(2);
  }

  function handleIncomeDates(dates: IncomeDates) {
    setIncomeDates(dates);
    setStep(3);
  }

  function handleRatiosComplete(nextRatios: RatioCategory) {
    setRatios(nextRatios);
    setStep(4);
  }

  async function handleSignUpComplete() {
    saveUserPrefs({ cadence, incomeDates, ratios });
    try {
      await fetchAPI<RatioCategory[]>("/ratios", {
        method: "PUT",
        body: JSON.stringify({ cadence, incomeDates, ratios }),
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
  if (step === 2) return <IncomeDateStep cadence={cadence} onNext={handleIncomeDates} />;
  if (step === 3) return <RatioStep onComplete={handleRatiosComplete} />;
  return <SignUpStep onComplete={handleSignUpComplete} />;
}
