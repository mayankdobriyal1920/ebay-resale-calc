import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Whatnot Fee Calculator",
  description: "Whatnot fee calculator (Phase 2).",
  alternates: { canonical: "/whatnot-fee-calculator" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }