import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Fee sources",
  description: "Official marketplace fee sources and last-verified dates.",
  alternates: { canonical: "/fee-sources" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }