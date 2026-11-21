import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Reseller Profit & Marketplace Fee Calculator",
  description:
    "Estimate your profit before you list. Compare fees across eBay, Poshmark, Mercari and Depop.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <SiteHeader />
        <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}