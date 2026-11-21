import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const routes = [
  "",
  "/ebay-fee-calculator",
  "/poshmark-fee-calculator",
  "/mercari-fee-calculator",
  "/depop-fee-calculator",
  "/about",
  "/how-we-calculate",
  "/fee-sources",
  "/privacy-policy",
  "/terms",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `https://example.com${r}`,
    lastModified: new Date(),
  }));
}