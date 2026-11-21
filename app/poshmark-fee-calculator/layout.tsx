import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Poshmark Fee Calculator",
  description: "Estimate Poshmark selling fees, net proceeds and profit.",
  alternates: { canonical: "/poshmark-fee-calculator" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }