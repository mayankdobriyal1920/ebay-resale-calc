import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Methodology",
  description: "Calculation methodology and assumptions behind the fee estimates.",
  alternates: { canonical: "/methodology" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }