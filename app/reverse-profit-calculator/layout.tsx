import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Reverse Profit Calculator",
  description: "Find the selling price needed to reach a target profit (Phase 2).",
  alternates: { canonical: "/reverse-profit-calculator" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }