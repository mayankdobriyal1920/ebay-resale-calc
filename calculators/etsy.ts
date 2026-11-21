// Etsy US seller fee adapter — Phase 2.
// NOTE: Fee rules NOT verified against official Etsy documentation. Do not ship
// without recording source URL + verification date in data/feeSources.ts.
// Typical US structure (verify): listing fee $0.20, transaction fee 6.5%,
// payment processing 3% + $0.25, Offsite Ads 12-15% (sales-volume dependent).
//
// Source: https://www.etsy.com/legal/fees/  (verify exact article URL)

import { MarketplaceAdapter, MoneyInput, FeeLine } from "./types";
import { buildResult } from "./shared";
import { applyRateBps } from "./money";

const SOURCE_URL = "https://www.etsy.com/legal/fees/";
const LISTING_FEE_CENTS = 20; // $0.20 per listing
const TRANSACTION_RATE_BPS = 650; // 6.5%
const PROCESSING_RATE_BPS = 300; // 3.0%
const PROCESSING_FIXED_CENTS = 25; // $0.25

export const etsyAdapter: MarketplaceAdapter = {
  id: "etsy",
  name: "Etsy",
  feeScheduleVersion: "US-PHASE2-UNVERIFIED",
  effectiveDate: "TBD",
  lastVerifiedDate: "TBD",
  sourceUrl: SOURCE_URL,
  supportedAssumptions: ["Phase 2", "US sellers", "Single listing, single sale"],
  unsupportedConditions: [
    "Listing fee ($0.20) per listing / renewal cadence",
    "Offsite Ads rate (12-15%) based on sales volume",
    "Currency conversion / regulatory operating fees",
    "Multiple quantities / renewals",
  ],
  calculate(input: MoneyInput) {
    const qty = input.quantity > 0 ? input.quantity : 1;
    const saleTotalCents = input.sellingPrice * qty;
    const itemCostTotalCents = input.itemCost * qty;
    const packagingTotalCents = input.packagingCost * qty;
    const otherTotalCents = input.otherCost * qty;
    const feeBaseCents = saleTotalCents + input.buyerShipping;
    const transactionCents = applyRateBps(feeBaseCents, TRANSACTION_RATE_BPS);
    const processingCents =
      applyRateBps(feeBaseCents, PROCESSING_RATE_BPS) + PROCESSING_FIXED_CENTS;

    const feeLines: FeeLine[] = [
      {
        name: "Listing fee",
        rateLabel: "$0.20",
        baseCents: 0,
        amountCents: LISTING_FEE_CENTS,
        included: true,
        note: `Per listing (4 months). Quantity ${qty}. Verification pending.`,
      },
      {
        name: "Transaction fee",
        rateLabel: "6.5%",
        baseCents: feeBaseCents,
        amountCents: transactionCents,
        included: true,
        note: "Item price + buyer-paid shipping. Verification pending.",
      },
      {
        name: "Payment processing",
        rateLabel: "3% + $0.25",
        baseCents: feeBaseCents,
        amountCents: processingCents,
        included: true,
        note: "US sellers. Verification pending.",
      },
      {
        name: "Offsite Ads",
        rateLabel: "12-15%",
        baseCents: feeBaseCents,
        amountCents: 0,
        included: false,
        note: "Sales-volume dependent; excluded until verified.",
      },
    ];

    return buildResult({
      marketplaceId: "etsy",
      marketplaceName: "Etsy",
      feeLines,
      modeledRevenueCents: feeBaseCents,
      itemCostCents: itemCostTotalCents,
      sellerShippingCostCents: input.sellerShippingCost,
      packagingCostCents: packagingTotalCents,
      otherCostCents: otherTotalCents,
      sourceUrl: SOURCE_URL,
      lastVerifiedDate: "TBD",
      assumptions: [
        "Phase 2 marketplace.",
        "Single listing, single sale.",
        "Fee rules not verified against official Etsy documentation.",
        `Quantity ${qty}.`,
      ],
      isComplete: false,
      incompleteReason:
        "Etsy is a Phase 2 marketplace. Fee rules not verified against official documentation.",
    });
  },
};