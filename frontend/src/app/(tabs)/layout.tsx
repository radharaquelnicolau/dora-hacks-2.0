"use client";

import { memo, useState } from "react";
import { Menu } from "lucide-react";
import { BottomNav } from "@/components/layout/BottomNav";
import { SideDrawer } from "@/components/layout/SideDrawer";

// Memoised so it never re-renders when the drawer's internal state changes
const PageContent = memo(function PageContent({ children }: { children: React.ReactNode }) {
  return <main className="flex-1">{children}</main>;
});

export default function TabsLayout({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center px-4 h-14 shrink-0">
        <button
          onClick={() => setDrawerOpen(true)}
          className="p-2 -ml-2 text-muted hover:text-cream transition"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
        <span className="ml-2 font-display text-xl text-cream">Pie</span>
      </header>

      <SideDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <PageContent>{children}</PageContent>

      <BottomNav />
    </div>
  );
}
