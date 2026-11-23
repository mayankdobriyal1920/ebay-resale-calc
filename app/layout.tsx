import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CookieConsent from "@/components/CookieConsent";
import AdSense from "@/components/AdSense";
import GoogleTagManager from "@/components/GoogleTagManager";
import StructuredData from "@/components/StructuredData";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://flipfee.online"),
  title: {
    default: "Reseller Profit & Marketplace Fee Calculator",
    template: "%s | Reseller Profit Calc",
  },
  description:
    "Estimate your profit before you list. Compare fees across eBay, Poshmark, Mercari and Depop.",
  alternates: { canonical: "/" },
  icons: [
    { rel: "icon", url: "/favicon.ico", sizes: "48x48 96x96 32x32 16x16", type: "image/x-icon" },
    { rel: "icon", url: "/logo.png", sizes: "256x256", type: "image/png" },
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  ],
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  openGraph: {
    type: "website",
    siteName: "Reseller Profit Calc",
    images: [
      {
        url: "/logo.png",
        width: 256,
        height: 256,
        alt: "Reseller Profit Calc logo",
      },
    ],
  },
  twitter: { card: "summary_large_image", images: ["/logo.png"] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen font-sans" style={{ fontFamily: "var(--font-inter), Inter, system-ui, sans-serif" }}>
        <a href="#main" className="skip-link">Skip to content</a>
        <SiteHeader />
        <main id="main" className="mx-auto max-w-6xl px-3 py-6 sm:px-6">{children}</main>
        <SiteFooter />
        <StructuredData />
        <CookieConsent />
        <AdSense />
        <GoogleTagManager />
      </body>
    </html>
  );
}