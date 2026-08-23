"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import type { ReactNode } from "react";
import type { CategoryKey } from "@/types";
import { CAT_COLOR } from "@/styles/tokens";

interface DonutProps {
  /** Category key -> value (percentage or dollar amount, either works) */
  ratios: Record<CategoryKey, number>;
  size?: number;
  thickness?: number;
  /** Content rendered in the hollow center, e.g. a total or a label */
  centerContent?: ReactNode;
}

export default function Donut({ ratios, size = 180, thickness = 24, centerContent }: DonutProps) {
  const data = (Object.keys(ratios) as CategoryKey[]).map((key) => ({
    name: key,
    value: ratios[key],
  }));

  return (
    <div style={{ width: size, height: size, position: "relative" }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={size / 2 - thickness}
            outerRadius={size / 2}
            paddingAngle={3}
            cornerRadius={8}
            stroke="none"
          >
            {data.map((d) => (
              <Cell key={d.name} fill={CAT_COLOR[d.name]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {centerContent && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {centerContent}
        </div>
      )}
    </div>
  );
}
