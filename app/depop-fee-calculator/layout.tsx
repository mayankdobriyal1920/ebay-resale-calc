import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Depop Fee Calculator",
  description: "Estimate Depop selling fees, net proceeds and profit.",
  alternates: { canonical: "/depop-fee-calculator" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }