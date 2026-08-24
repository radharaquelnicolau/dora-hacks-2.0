"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = ["home", "scan", "goals", "wrap"] as const;

export function BottomNav() {
  const pathname = usePathname();
  return <nav>{tabs.map((tab) => <Link key={tab} aria-current={pathname.endsWith(`/${tab}`) ? "page" : undefined} href={`/${tab}`}>{tab}</Link>)}</nav>;
}
