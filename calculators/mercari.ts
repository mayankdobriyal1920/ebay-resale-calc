// Mercari US seller fee adapter.
// Verified from Mercari's published fee structure (user-provided, 2026-11-21):
//   - 10% selling fee on item price + buyer-paid shipping (listings created/updated on/after 2025-01-06)
//   - Buyer Protection fee 3.6% is BUYER-paid (not deducted from seller)
//   - No separate payment processing fee for new/updated listings
// Source: Mercari Help Center "Fees on Mercari" (https://www.mercari.com/us/help_center/).
//
// Modeled:
//   - 10% selling fee on item price + buyer-paid shipping
// Not modeled (disclosed as excluded): buyer protection fee (buyer-paid), cancellation fee,
//   authenticate fees, shipping label costs (seller's actual label), instant pay fee,
//   failed direct deposit fee.

import { MarketplaceAdapter, MoneyInput, FeeLine } from "./types";
import { buildResult } from "./shared";
import { applyRateBps } from "./money";

const SOURCE_URL = "https://www.mercari.com/us/help_center/";
const SELLING_RATE_BPS = 1000; // 10.00%

export const mercariAdapter: MarketplaceAdapter = {
  id: "mercari",
  name: "Mercari",
  feeScheduleVersion: "US-2026-11 (post 2025-01-06 listings)",
  effectiveDate: "2025-01-06",
  lastVerifiedDate: "2026-11-21",
  sourceUrl: SOURCE_URL,
  supportedAssumptions: [
    "US sellers",
    "Listings created/updated on/after 2025-01-06",
    "Single item, single order",
  ],
  unsupportedConditions: [
    "Legacy listings (pre 2025-01-06) with different fee structure",
    "Cancellation fee (5% of item price, max $25)",
    "Mercari Authenticate fees",
    "Instant Pay fee ($3)",
    "Failed direct deposit fee ($2)",
    "Seller-paid label/shipping costs (use your actual label cost input)",
  ],
  calculate(input: MoneyInput) {
    const qty = input.quantity > 0 ? input.quantity : 1;
    const saleTotalCents = input.sellingPrice * qty;
    const itemCostTotalCents = input.itemCost * qty;
    const packagingTotalCents = input.packagingCost * qty;
    const otherTotalCents = input.otherCost * qty;
    const feeBaseCents = saleTotalCents + input.buyerShipping;
    const sellingFeeCents = applyRateBps(feeBaseCents, SELLING_RATE_BPS);

    const feeLines: FeeLine[] = [
      {
        name: "Mercari selling fee",
        rateLabel: "10%",
        baseCents: feeBaseCents,
        amountCents: sellingFeeCents,
        included: true,
        note: `Item price + buyer-paid shipping. Quantity ${qty}.`,
      },
      {
        name: "Buyer Protection fee",
        rateLabel: "3.6%",
        baseCents: feeBaseCents,
        amountCents: 0,
        included: false,
        note: "Buyer-paid; not deducted from seller proceeds.",
      },
      {
        name: "Payment processing fee",
        rateLabel: "$0.00",
        baseCents: 0,
        amountCents: 0,
        included: false,
        note: "No separate fee for listings created/updated on/after 2025-01-06.",
      },
    ];

    return buildResult({
      marketplaceId: "mercari",
      marketplaceName: "Mercari",
      feeLines,
      modeledRevenueCents: feeBaseCents,
      itemCostCents: itemCostTotalCents,
      sellerShippingCostCents: input.sellerShippingCost,
      packagingCostCents: packagingTotalCents,
      otherCostCents: otherTotalCents,
      sourceUrl: SOURCE_URL,
      lastVerifiedDate: "2026-11-21",
      assumptions: [
        "US seller.",
        "Listing created/updated on/after 2025-01-06.",
        "Fee base includes item price + buyer-paid shipping.",
        "Buyer Protection fee is buyer-paid and excluded from seller fees.",
        `Quantity ${qty}.`,
      ],
      isComplete: true,
    });
  },
};