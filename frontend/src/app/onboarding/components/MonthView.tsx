"use client";

import { useState } from "react";
import type { PayCadence } from "@/types";

interface MonthViewProps {
  cadence: PayCadence;
  selectedDates: number[];
  onDatesChange: (dates: number[]) => void;
}

export function MonthView({ cadence, selectedDates, onDatesChange }: MonthViewProps) {
  const maxSelections = cadence === "monthly" ? 1 : 2;
  
  function toggleDay(day: number) {
    if (selectedDates.includes(day)) {
      onDatesChange(selectedDates.filter((d) => d !== day));
    } else if (selectedDates.length < maxSelections) {
      onDatesChange([...selectedDates, day].sort((a, b) => a - b));
    }
  }

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-muted text-sm">
        {cadence === "monthly" 
          ? "Select the day of the month you receive your income" 
          : "Select the two days of the month you receive your income"}
      </p>
      
      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => {
          const isSelected = selectedDates.includes(day);
          return (
            <button
              key={day}
              onClick={() => toggleDay(day)}
              disabled={!isSelected && selectedDates.length >= maxSelections}
              className={`
                aspect-square rounded-xl flex items-center justify-center text-sm font-medium transition
                ${isSelected 
                  ? "bg-gold text-crust" 
                  : "bg-card text-cream hover:bg-card-alt disabled:opacity-30 disabled:hover:bg-card"
                }
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
      
      {selectedDates.length > 0 && (
        <p className="text-sm text-cream text-center">
          Selected: {selectedDates.map((d) => `${getOrdinal(d)}`).join(", ")}
        </p>
      )}
    </div>
  );
}

function getOrdinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
