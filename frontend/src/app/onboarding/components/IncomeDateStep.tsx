"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import { MonthView } from "./MonthView";
import { WeeklyView } from "./WeeklyView";
import type { PayCadence, IncomeDates, DayOfWeek } from "@/types";

interface IncomeDateStepProps {
  cadence: PayCadence;
  onNext: (incomeDates: IncomeDates) => void;
}

export function IncomeDateStep({ cadence, onNext }: IncomeDateStepProps) {
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState<DayOfWeek | null>(null);

  // Skip this step for irregular income
  useEffect(() => {
    if (cadence === "irregular") {
      onNext({});
    }
  }, [cadence, onNext]);

  function handleNext() {
    const incomeDates: IncomeDates = {};
    
    if (cadence === "monthly" && selectedDays.length === 1) {
      incomeDates.monthly = selectedDays[0];
    } else if (cadence === "biweekly" && selectedDays.length === 2) {
      incomeDates.biweekly = selectedDays;
    } else if (cadence === "weekly" && selectedDayOfWeek) {
      incomeDates.weekly = selectedDayOfWeek;
    }
    
    onNext(incomeDates);
  }

  const isComplete = 
    (cadence === "monthly" && selectedDays.length === 1) ||
    (cadence === "biweekly" && selectedDays.length === 2) ||
    (cadence === "weekly" && selectedDayOfWeek !== null);

  if (cadence === "irregular") {
    return null; // Will auto-advance via useEffect
  }

  return (
    <main className="flex flex-col min-h-screen px-6 pt-16 pb-10 gap-8">
      <div>
        <h1 className="text-3xl font-display text-cream">When do you get paid?</h1>
        <p className="text-muted text-sm mt-2">Select the dates you receive your income.</p>
      </div>

      <div className="flex-1">
        {(cadence === "monthly" || cadence === "biweekly") ? (
          <MonthView 
            cadence={cadence} 
            selectedDates={selectedDays} 
            onDatesChange={setSelectedDays} 
          />
        ) : cadence === "weekly" ? (
          <WeeklyView 
            selectedDay={selectedDayOfWeek} 
            onDayChange={setSelectedDayOfWeek} 
          />
        ) : null}
      </div>

      <Button 
        onClick={handleNext} 
        className="w-full mt-auto"
        disabled={!isComplete}
      >
        Continue
      </Button>
    </main>
  );
}
