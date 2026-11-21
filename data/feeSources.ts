export interface FeeSource {
  marketplaceId: string;
  marketplaceName: string;
  url: string;
  country: string;
  lastVerifiedDate: string; // ISO date or "TBD"
  notes: string;
}

export const FEE_SOURCES: FeeSource[] = [
  {
    marketplaceId: "ebay",
    marketplaceName: "eBay",
    url: "https://www.ebay.com/help/selling/fees-credits-invoices/selling-fees?id=4822",
    country: "US",
    lastVerifiedDate: "2026-11-21",
    notes: "Verified: most categories, non-Store. 13.6% up to $7,500 + 2.35% over; per-order $0.30/$0.40.",
  },
  {
    marketplaceId: "poshmark",
    marketplaceName: "Poshmark",
    url: "https://support.poshmark.com/",
    country: "US",
    lastVerifiedDate: "2026-11-21",
    notes: "Verified: under $15 flat $2.95; $15+ 20% commission. Exact article URL to be recorded.",
  },
  {
    marketplaceId: "mercari",
    marketplaceName: "Mercari",
    url: "https://www.mercari.com/us/help_center/",
    country: "US",
    lastVerifiedDate: "2026-11-21",
    notes: "Verified: 10% selling fee on item price + buyer-paid shipping (post 2025-01-06). Buyer protection 3.6% buyer-paid.",
  },
  {
    marketplaceId: "depop",
    marketplaceName: "Depop",
    url: "https://help.depop.com/hc/en-gb/sections/22399498636561-Fees-and-taxes",
    country: "US",
    lastVerifiedDate: "2026-11-21",
    notes: "Verified: no selling fee for US sellers; processing 3.3% + $0.45; boost 12% opt-in.",
  },
  {
    marketplaceId: "etsy",
    marketplaceName: "Etsy",
    url: "https://www.etsy.com/legal/fees/",
    country: "US",
    lastVerifiedDate: "TBD",
    notes: "Phase 2.",
  },
  {
    marketplaceId: "whatnot",
    marketplaceName: "Whatnot",
    url: "https://help.whatnot.com/",
    country: "US",
    lastVerifiedDate: "TBD",
    notes: "Phase 2.",
  },
];