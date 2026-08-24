"use client";

import { useWrap } from "@/hooks/useWrap";

export default function WrapPage() {
  const { data: cards, loading } = useWrap();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="w-10 h-10 rounded-full border-4 border-gold border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col px-4 pt-8 pb-28 gap-4">
      <h1 className="text-3xl font-display text-cream">Your cycle wrap</h1>
      <p className="text-muted text-sm -mt-2">Here's how your money moved this cycle.</p>

      <div className="flex flex-col gap-4 mt-2">
        {cards.map((card, i) => (
          <div
            key={i}
            className="rounded-2xl p-6 flex flex-col gap-2"
            style={{ background: card.bg }}
          >
            <p
              className="text-sm font-semibold uppercase tracking-wide"
              style={{ color: card.dark ? "#241812" : "#b9a08c" }}
            >
              {card.title}
            </p>
            <p
              className="text-4xl font-display leading-none"
              style={{ color: card.dark ? "#241812" : "#fcefdd" }}
            >
              {card.big}
            </p>
            <p
              className="text-sm"
              style={{ color: card.dark ? "#33241b" : "#b9a08c" }}
            >
              {card.sub}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
