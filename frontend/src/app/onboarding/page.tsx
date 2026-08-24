"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { WelcomeStep } from "./components/WelcomeStep";
import { CadenceStep } from "./components/CadenceStep";
import { RatioStep } from "./components/RatioStep";
import type { PayCadence, RatioCategory } from "@/types";

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [cadence, setCadence] = useState<PayCadence>("biweekly");
  const router = useRouter();

  function handleCadence(c: PayCadence) {
    setCadence(c);
    setStep(2);
  }

  function handleComplete(_ratios: RatioCategory) {
    // TODO: persist cadence + ratios to backend via PUT /ratios
    router.push("/home");
  }

  if (step === 0) return <WelcomeStep onNext={() => setStep(1)} />;
  if (step === 1) return <CadenceStep onNext={handleCadence} />;
  return <RatioStep onComplete={handleComplete} />;
}
