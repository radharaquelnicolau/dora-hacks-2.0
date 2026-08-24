"use client";

import { useState } from "react";
import { WelcomeStep } from "./components/WelcomeStep";
import { CadenceStep } from "./components/CadenceStep";
import { RatioStep } from "./components/RatioStep";

export default function OnboardingPage() {
  const [step, setStep] = useState(0);

  if (step === 0) return <WelcomeStep onNext={() => setStep(1)} />;
  if (step === 1) return <CadenceStep onNext={() => setStep(2)} />;
  return <RatioStep onComplete={() => setStep(0)} />;
}
