import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Etsy Fee Calculator",
  description: "Etsy fee calculator (Phase 2).",
  alternates: { canonical: "/etsy-fee-calculator" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }