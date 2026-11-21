// eBay US seller fee adapter (non-Store, most categories).
// Verified against official eBay US selling fees page on 2026-11-21.
// Source: https://www.ebay.com/help/selling/fees-credits-invoices/selling-fees?id=4822
//
// Modeled:
//  - Final value fee: 13.6% of total sale up to $7,500 + 2.35% over $7,500 (per item)
//  - Per-order fee: $0.30 if order total <= $10.00 else $0.40
//  - Fee base (total amount of sale): item price + buyer-paid shipping + sales tax
//  - Optional promoted listings standard charge (user-entered rate)
// Not modeled (disclosed as excluded): insertion fee (assumes within 250 free/mo),
// store subscriptions, category-specific rates, below-standard/very-high
// performance fees, international fees, dispute fee, currency conversion.

import { MarketplaceAdapter, MoneyInput, FeeLine } from "./types";
import { buildResult } from "./shared";
import { applyRateBps } from "./money";

const SOURCE_URL = "https://www.ebay.com/help/selling/fees-credits-invoices/selling-fees?id=4822";
const THRESHOLD_CENTS = 750000; // $7,500
const LOW_RATE_BPS = 1360; // 13.6%
const HIGH_RATE_BPS = 235; // 2.35%
const PER_ORDER_LOW_CENTS = 30;
const PER_ORDER_HIGH_CENTS = 40;
const PER_ORDER_BOUNDARY_CENTS = 1000; // $10.00

export const ebayAdapter: MarketplaceAdapter = {
  id: "ebay",
  name: "eBay",
  feeScheduleVersion: "US-2026-11 (most categories, non-Store)",
  effectiveDate: "2026-11-21",
  lastVerifiedDate: "2026-11-21",
  sourceUrl: SOURCE_URL,
  supportedAssumptions: [
    "US sellers, non-Store, most categories",
    "Single item, single order",
    "Within 250 zero-insertion-fee listings/month",
    "Meeting performance expectations",
  ],
  unsupportedConditions: [
    "Store subscription rates",
    "Category-specific rates (books, jewelry, watches, collectibles, etc.)",
    "Below Standard / Very High service-metric surcharges",
    "Insertion fee after free allowance ($0.35)",
    "International fee, dispute fee, currency conversion",
    "Optional listing upgrades",
  ],
  calculate(input: MoneyInput) {
    const feeBaseCents = input.sellingPrice + input.buyerShipping + input.salesTaxIncluded;

    // Tiered final value fee.
    let fvfCents = 0;
    if (feeBaseCents <= THRESHOLD_CENTS) {
      fvfCents = applyRateBps(feeBaseCents, LOW_RATE_BPS);
    } else {
      fvfCents =
        applyRateBps(THRESHOLD_CENTS, LOW_RATE_BPS) +
        applyRateBps(feeBaseCents - THRESHOLD_CENTS, HIGH_RATE_BPS);
    }

    const perOrderFeeCents =
      feeBaseCents <= PER_ORDER_BOUNDARY_CENTS ? PER_ORDER_LOW_CENTS : PER_ORDER_HIGH_CENTS;

    const promotedFeeCents =
      input.promotedRateBps > 0 ? applyRateBps(feeBaseCents, input.promotedRateBps) : 0;

    const feeLines: FeeLine[] = [
      {
        name: "Final value fee",
        rateLabel: feeBaseCents <= THRESHOLD_CENTS ? "13.6%" : "13.6% up to $7,500 + 2.35% over",
        baseCents: feeBaseCents,
        amountCents: fvfCents,
        included: true,
        note: "Most categories, non-Store, per item",
      },
      {
        name: "Per-order fee",
        rateLabel: feeBaseCents <= PER_ORDER_BOUNDARY_CENTS ? "$0.30" : "$0.40",
        baseCents: feeBaseCents,
        amountCents: perOrderFeeCents,
        included: true,
        note: "Based on order total threshold of $10.00",
      },
    ];

    if (promotedFeeCents > 0) {
      feeLines.push({
        name: "Promoted Listings (standard)",
        rateLabel: `${(input.promotedRateBps / 100).toFixed(2)}%`,
        baseCents: feeBaseCents,
        amountCents: promotedFeeCents,
        included: true,
        note: "Optional, user-entered rate",
      });
    }

    feeLines.push({
      name: "Insertion fee",
      rateLabel: "$0.00 (assumed free allowance)",
      baseCents: 0,
      amountCents: 0,
      included: false,
      note: "Assumes within 250 zero-insertion-fee listings/month. $0.35 per listing after allowance (excluded).",
    });

    return buildResult({
      marketplaceId: "ebay",
      marketplaceName: "eBay",
      feeLines,
      modeledRevenueCents: feeBaseCents,
      itemCostCents: input.itemCost,
      sellerShippingCostCents: input.sellerShippingCost,
      packagingCostCents: input.packagingCost,
      otherCostCents: input.otherCost,
      sourceUrl: SOURCE_URL,
      lastVerifiedDate: "2026-11-21",
      assumptions: [
        "US non-Store seller, most categories.",
        "Single item / single order.",
        "Fee base includes item price + buyer-paid shipping + sales tax.",
        "Within free insertion-fee allowance.",
        "Meeting performance expectations (no surcharges).",
      ],
      isComplete: true,
    });
  },
};