"use client";

import type { DayOfWeek } from "@/types";

interface WeeklyViewProps {
  selectedDay: DayOfWeek | null;
  onDayChange: (day: DayOfWeek) => void;
}

const DAYS: { value: DayOfWeek; label: string; short: string }[] = [
  { value: "monday", label: "Monday", short: "Mon" },
  { value: "tuesday", label: "Tuesday", short: "Tue" },
  { value: "wednesday", label: "Wednesday", short: "Wed" },
  { value: "thursday", label: "Thursday", short: "Thu" },
  { value: "friday", label: "Friday", short: "Fri" },
  { value: "saturday", label: "Saturday", short: "Sat" },
  { value: "sunday", label: "Sunday", short: "Sun" },
];

export function WeeklyView({ selectedDay, onDayChange }: WeeklyViewProps) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-muted text-sm">
        Select the day of the week you receive your income
      </p>
      
      <div className="grid grid-cols-7 gap-2">
        {DAYS.map((day) => {
          const isSelected = selectedDay === day.value;
          return (
            <button
              key={day.value}
              onClick={() => onDayChange(day.value)}
              className={`
                aspect-square rounded-xl flex flex-col items-center justify-center gap-1 transition
                ${isSelected 
                  ? "bg-gold text-crust" 
                  : "bg-card text-cream hover:bg-card-alt"
                }
              `}
            >
              <span className="text-xs font-medium">{day.short}</span>
              <span className="text-lg font-display font-bold">{day.short.charAt(0)}</span>
            </button>
          );
        })}
      </div>
      
      {selectedDay && (
        <p className="text-sm text-cream text-center">
          Selected: {DAYS.find((d) => d.value === selectedDay)?.label}
        </p>
      )}
    </div>
  );
}
