export interface FeeSource {
  marketplaceId: string;
  marketplaceName: string;
  url: string;
  country: string;
  lastVerifiedDate: string; // ISO date or "TBD"
  verificationStatus: "Verified" | "Partially verified" | "Unverified" | "Not implemented";
  notes: string;
  exclusions: string[];
  assumptions: string[];
}

export const FEE_SOURCES: FeeSource[] = [
  {
    marketplaceId: "ebay",
    marketplaceName: "eBay",
    url: "https://www.ebay.com/help/selling/fees-credits-invoices/fees-credits-invoices?id=4822",
    country: "US",
    lastVerifiedDate: "2026-11-21",
    verificationStatus: "Verified",
    notes: "Most categories, non-Store. Final value fee 13.6% up to $7,500 + 2.35% over; per-order fee $0.30/$0.40. Fee base includes item price + buyer-paid shipping + sales tax.",
    exclusions: [
      "Store subscription rates",
      "Category-specific rates (books, jewelry, watches, collectibles, etc.)",
      "Below Standard / Very High service-metric surcharges",
      "Insertion fee after free allowance ($0.35)",
      "International fee, dispute fee, currency conversion",
      "Optional listing upgrades",
    ],
    assumptions: [
      "US non-Store seller, most categories.",
      "Within 250 zero-insertion-fee listings/month.",
      "Meeting performance expectations (no surcharges).",
    ],
  },
  {
    marketplaceId: "poshmark",
    marketplaceName: "Poshmark",
    url: "https://support.poshmark.com/s/article/297755057?language=en_US",
    country: "US",
    lastVerifiedDate: "2026-11-21",
    verificationStatus: "Verified",
    notes: "Flat $2.95 commission for sales under $15; 20% commission for sales of $15 or more. Buyer-paid shipping goes to Poshmark for the prepaid label and is not part of sale proceeds.",
    exclusions: [
      "Seller-funded shipping discounts",
      "Texas state-specific seller charges",
      "Payment processing (included in commission)",
      "Taxes on fees",
    ],
    assumptions: [
      "US seller.",
      "Commission on sale price only; buyer-paid shipping goes to Poshmark for the label.",
      "Threshold inclusive at $15.00.",
    ],
  },
  {
    marketplaceId: "mercari",
    marketplaceName: "Mercari",
    url: "https://www.mercari.com/us/help_center/article/169/",
    country: "US",
    lastVerifiedDate: "2026-11-21",
    verificationStatus: "Verified",
    notes: "10% selling fee on item price + buyer-paid shipping (listings created/updated on/after 2025-01-06). Buyer Protection fee (3.6%) is buyer-paid, not deducted from seller proceeds. No separate payment processing fee for new/updated listings.",
    exclusions: [
      "Buyer Protection fee (buyer-paid)",
      "Cancellation fee (5% of item price, max $25)",
      "Mercari Authenticate fees",
      "Instant Pay fee ($3)",
      "Failed direct deposit fee ($2)",
      "Legacy listings (pre 2025-01-06)",
    ],
    assumptions: [
      "US seller.",
      "Listing created/updated on/after 2025-01-06.",
      "Fee base includes item price + buyer-paid shipping.",
      "Buyer Protection fee is buyer-paid and excluded from seller fees.",
    ],
  },
  {
    marketplaceId: "depop",
    marketplaceName: "Depop",
    url: "https://depophelp.zendesk.com/hc/en-gb/articles/360001791127-Seller-fees-and-charges",
    country: "US",
    lastVerifiedDate: "2026-11-21",
    verificationStatus: "Verified",
    notes: "No Depop selling fee for US sellers. US payment processing (Depop Payments/Stripe): 3.3% + $0.45 on item price + shipping + tax. Boosted listings (new listings from 2026-03-23): 12% opt-in.",
    exclusions: [
      "Sellers outside US/UK/AUS (10% selling fee + PayPal)",
      "Boost base shipping exclusion when using a Depop shipping label",
      "International customs/VAT (buyer/import side)",
      "PayPal processing fees for non-US sellers",
    ],
    assumptions: [
      "US seller using Depop Payments.",
      "No Depop selling fee for US sellers.",
      "Processing fee base includes item price + buyer-paid shipping + tax.",
      "Boost fee base includes item price + buyer-paid shipping (excludes tax).",
    ],
  },
  {
    marketplaceId: "etsy",
    marketplaceName: "Etsy",
    url: "https://www.etsy.com/legal/fees/",
    country: "US",
    lastVerifiedDate: "TBD",
    verificationStatus: "Unverified",
    notes: "Phase 2. Typical US: listing $0.20, transaction 6.5%, processing 3%+$0.25, Offsite Ads 12-15% (sales-volume dependent). NOT verified against official documentation.",
    exclusions: [
      "Listing fee ($0.20) per listing / renewal cadence — unverified",
      "Offsite Ads rate (12-15%) based on sales volume — unverified",
      "Currency conversion / regulatory operating fees — unverified",
      "Multiple quantities / renewals — unverified",
    ],
    assumptions: [
      "Phase 2 marketplace.",
      "Single listing, single sale.",
      "Fee rules not verified against official Etsy documentation.",
    ],
  },
  {
    marketplaceId: "whatnot",
    marketplaceName: "Whatnot",
    url: "https://help.whatnot.com/hc/en-us/articles/4847069165965-Whatnot-seller-fees",
    country: "US",
    lastVerifiedDate: "TBD",
    verificationStatus: "Unverified",
    notes: "Phase 2. Commission varies by category and seller tier. Commission changes effective September 21, 2026. NOT verified against official documentation.",
    exclusions: [
      "Category-specific commission rates — unverified",
      "Seller tier / sales-volume conditions — unverified",
      "Payment-processing fee base — unverified",
      "Shipping and tax treatment — unverified",
    ],
    assumptions: [
      "Phase 2 marketplace.",
      "Single item, single sale.",
      "Fee rules not verified against official Whatnot documentation.",
    ],
  },
];