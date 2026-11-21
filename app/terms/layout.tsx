import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Terms",
  description: "Terms, limitations and disclaimers.",
  alternates: { canonical: "/terms" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }