import type { CategoryKey } from "@/types";
import { CAT_COLOR, CAT_LABEL } from "@/styles/tokens";

interface PillProps {
  category: CategoryKey;
}

export default function Pill({ category }: PillProps) {
  const color = CAT_COLOR[category];

  return (
    <span
      className="text-xs font-semibold px-2 py-1 rounded-full"
      style={{ background: `${color}33`, color }}
    >
      {CAT_LABEL[category]}
    </span>
  );
}
