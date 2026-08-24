"use client";

import { useRef, useState } from "react";
import { Upload, CheckCircle, RotateCcw } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { CAT_COLOR, CAT_LABEL } from "@/styles/tokens";
import type { CategoryKey, Transaction } from "@/types";

type ScanState = "idle" | "processing" | "confirm";

const MOCK_PARSED: Omit<Transaction, "id" | "date">[] = [
  { merchant: "Trader Joe's", amount: 43.21, category: "needs" },
  { merchant: "Boba Tea Shop", amount: 7.5, category: "wants" },
];

const CATEGORY_KEYS: CategoryKey[] = ["needs", "wants", "savings", "debt"];

export default function ScanPage() {
  const [state, setState] = useState<ScanState>("idle");
  const [items, setItems] = useState(
    MOCK_PARSED.map((i, idx) => ({ ...i, id: String(idx) }))
  );
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    if (!file) return;
    setState("processing");
    setTimeout(() => setState("confirm"), 1800);
  }

  function handleCategoryChange(id: string, cat: CategoryKey) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, category: cat } : i)));
  }

  function handleConfirm() {
    // TODO: POST confirmed transactions to backend
    setState("idle");
  }

  if (state === "idle") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 gap-6 text-center">
        <div className="w-20 h-20 rounded-full bg-card-alt flex items-center justify-center">
          <Upload size={32} className="text-gold" />
        </div>
        <div>
          <h1 className="text-2xl font-display text-cream">Scan a receipt</h1>
          <p className="text-muted text-sm mt-1">
            Upload a photo and we'll pull out the items automatically.
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
        <Button onClick={() => inputRef.current?.click()} className="w-full max-w-xs">
          Choose photo
        </Button>
        <button
          className="text-muted text-sm underline"
          onClick={() => setState("processing")}
        >
          Use demo receipt
        </button>
      </div>
    );
  }

  if (state === "processing") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 gap-4 text-center">
        <div className="w-16 h-16 rounded-full border-4 border-gold border-t-transparent animate-spin" />
        <h2 className="text-cream font-display text-xl">Reading your receipt…</h2>
        <p className="text-muted text-sm">Hang tight, this only takes a second.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col px-4 pt-8 pb-28 gap-5">
      <div className="flex items-center gap-3">
        <CheckCircle size={22} className="text-gold" />
        <h1 className="text-2xl font-display text-cream">Review items</h1>
      </div>
      <p className="text-muted text-sm -mt-3">
        Check the category for each item, then confirm.
      </p>

      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <Card key={item.id} className="flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <p className="text-cream font-semibold">{item.merchant}</p>
              <p className="text-cream font-bold">${item.amount.toFixed(2)}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORY_KEYS.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(item.id, cat)}
                  className="text-xs font-semibold px-3 py-1 rounded-full transition"
                  style={{
                    background: `${CAT_COLOR[cat]}${item.category === cat ? "33" : "15"}`,
                    color: CAT_COLOR[cat],
                    opacity: item.category === cat ? 1 : 0.5,
                  }}
                >
                  {CAT_LABEL[cat]}
                </button>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <div className="flex gap-3 mt-2">
        <Button
          variant="ghost"
          onClick={() => setState("idle")}
          className="flex-1 flex items-center justify-center gap-2"
        >
          <RotateCcw size={16} /> Rescan
        </Button>
        <Button onClick={handleConfirm} className="flex-1">
          Confirm all
        </Button>
      </div>
    </div>
  );
}
