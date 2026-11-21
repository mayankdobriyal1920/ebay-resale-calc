import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Mercari Fee Calculator",
  description: "Estimate Mercari selling fees, net proceeds and profit.",
  alternates: { canonical: "/mercari-fee-calculator" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }