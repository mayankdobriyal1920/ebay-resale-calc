import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "eBay Fee Calculator",
  description: "Estimate eBay selling fees, net proceeds and profit before you list.",
  alternates: { canonical: "/ebay-fee-calculator" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}