"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ScanLine, Target, Sparkles } from "lucide-react";

const TABS = [
  { href: "/home", label: "Home", Icon: Home },
  { href: "/scan", label: "Scan", Icon: ScanLine },
  { href: "/goals", label: "Goals", Icon: Target },
  { href: "/wrap", label: "Wrap", Icon: Sparkles },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-card-alt flex justify-around items-center h-16 px-2 z-50">
      {TABS.map(({ href, label, Icon }) => {
        const active = pathname === href || pathname.endsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center gap-1 flex-1 py-2 transition-colors ${
              active ? "text-gold" : "text-muted"
            }`}
          >
            <Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
            <span className="text-xs font-semibold">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
