import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pie — Slice your paycheck",
  description: "Budgeting app for students with irregular income.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
