// Depop US seller fee adapter.
// Verified from Depop's published fee structure (user-provided, 2026-11-21):
//   - No Depop selling fee for US sellers
//   - US payment processing (Depop Payments/Stripe): 3.3% + $0.45 on item price + shipping + tax
//   - Boosted listings (US, new listings from 2026-03-23): 12% on item price (+ shipping if no Depop label)
// Source: Depop Help Center "Seller fees and charges".
//
// Modeled:
//   - Payment processing 3.3% + $0.45
//   - Optional boosted listing 12%
// Not modeled (disclosed): international/customs taxes, Depop shipping label distinction for boost base.

import { MarketplaceAdapter, MoneyInput, FeeLine } from "./types";
import { buildResult } from "./shared";
import { applyRateBps } from "./money";

const SOURCE_URL = "https://help.depop.com/hc/en-gb/sections/22399498636561-Fees-and-taxes";
const PROCESSING_RATE_BPS = 330; // 3.3%
const PROCESSING_FIXED_CENTS = 45;
const BOOST_RATE_BPS = 1200; // 12%

export const depopAdapter: MarketplaceAdapter = {
  id: "depop",
  name: "Depop",
  feeScheduleVersion: "US-2026-11",
  effectiveDate: "2026-03-23",
  lastVerifiedDate: "2026-11-21",
  sourceUrl: SOURCE_URL,
  supportedAssumptions: [
    "US sellers",
    "Depop Payments (Stripe)",
    "Single item, single order",
    "Boosted listing opt-in via user-entered rate? (fixed 12% when enabled)",
  ],
  unsupportedConditions: [
    "Sellers outside US/UK/AUS (10% selling fee + PayPal)",
    "Boost base shipping exclusion when using a Depop shipping label",
    "International customs/VAT (buyer/import side)",
    "PayPal processing fees for non-US sellers",
  ],
  calculate(input: MoneyInput) {
    const qty = input.quantity > 0 ? input.quantity : 1;
    const saleTotalCents = input.sellingPrice * qty;
    const itemCostTotalCents = input.itemCost * qty;
    const packagingTotalCents = input.packagingCost * qty;
    const otherTotalCents = input.otherCost * qty;
    const feeBaseCents = saleTotalCents + input.buyerShipping + input.salesTaxIncluded;

    const processingCents = applyRateBps(feeBaseCents, PROCESSING_RATE_BPS) + PROCESSING_FIXED_CENTS;

    const boostEnabled = input.promotedRateBps > 0;
    const boostRateBps = boostEnabled ? BOOST_RATE_BPS : 0;
    const boostBaseCents = saleTotalCents + input.buyerShipping; // excludes tax
    const boostCents = boostEnabled ? applyRateBps(boostBaseCents, boostRateBps) : 0;

    const feeLines: FeeLine[] = [
      {
        name: "Depop selling fee",
        rateLabel: "$0.00 (none for US sellers)",
        baseCents: 0,
        amountCents: 0,
        included: false,
        note: "No Depop selling fee for US/UK/AUS sellers.",
      },
      {
        name: "Payment processing fee",
        rateLabel: "3.3% + $0.45",
        baseCents: feeBaseCents,
        amountCents: processingCents,
        included: true,
        note: `Depop Payments (Stripe). On item price + shipping + tax. Quantity ${qty}.`,
      },
    ];

    if (boostCents > 0) {
      feeLines.push({
        name: "Boosted listing fee",
        rateLabel: "12%",
        baseCents: boostBaseCents,
        amountCents: boostCents,
        included: true,
        note: "Opt-in. On item price (+ shipping if no Depop label).",
      });
    }

    return buildResult({
      marketplaceId: "depop",
      marketplaceName: "Depop",
      feeLines,
      modeledRevenueCents: feeBaseCents,
      itemCostCents: itemCostTotalCents,
      sellerShippingCostCents: input.sellerShippingCost,
      packagingCostCents: packagingTotalCents,
      otherCostCents: otherTotalCents,
      sourceUrl: SOURCE_URL,
      lastVerifiedDate: "2026-11-21",
      assumptions: [
        "US seller using Depop Payments.",
        "No Depop selling fee for US sellers.",
        "Processing fee base includes item price + buyer-paid shipping + tax.",
        "Boost fee base includes item price + buyer-paid shipping (excludes tax).",
        `Quantity ${qty}.`,
      ],
      isComplete: true,
    });
  },
};