// Whatnot seller fee adapter — Phase 2.
// NOTE: Fee rules NOT verified against official Whatnot documentation.
// Commission varies by category; do not ship without verification.
//
// Source: https://help.whatnot.com/  (verify exact article URL)

import { MarketplaceAdapter, MoneyInput, FeeLine } from "./types";
import { buildResult } from "./shared";
import { applyRateBps } from "./money";

const SOURCE_URL = "https://help.whatnot.com/";

// Placeholder commission rate — VERIFY against official docs.
const COMMISSION_RATE_BPS = 800; // 8.0%

export const whatnotAdapter: MarketplaceAdapter = {
  id: "whatnot",
  name: "Whatnot",
  feeScheduleVersion: "US-PHASE2-UNVERIFIED",
  effectiveDate: "TBD",
  lastVerifiedDate: "TBD",
  sourceUrl: SOURCE_URL,
  supportedAssumptions: ["Phase 2", "US sellers", "Single item, single sale"],
  unsupportedConditions: [
    "Category-specific commission rates",
    "Seller tier / sales-volume conditions",
    "Payment-processing fee base",
    "Shipping and tax treatment",
  ],
  calculate(input: MoneyInput) {
    const qty = input.quantity > 0 ? input.quantity : 1;
    const saleTotalCents = input.sellingPrice * qty;
    const itemCostTotalCents = input.itemCost * qty;
    const packagingTotalCents = input.packagingCost * qty;
    const otherTotalCents = input.otherCost * qty;
    const feeBaseCents = saleTotalCents + input.buyerShipping;
    const commissionCents = applyRateBps(feeBaseCents, COMMISSION_RATE_BPS);

    const feeLines: FeeLine[] = [
      {
        name: "Commission",
        rateLabel: "8% (verify)",
        baseCents: feeBaseCents,
        amountCents: commissionCents,
        included: true,
        note: `Category-specific. Quantity ${qty}. Verification pending.`,
      },
    ];

    return buildResult({
      marketplaceId: "whatnot",
      marketplaceName: "Whatnot",
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
        "Single item, single sale.",
        "Fee rules not verified against official Whatnot documentation.",
        `Quantity ${qty}.`,
      ],
      isComplete: false,
      incompleteReason:
        "Whatnot is a Phase 2 marketplace. Fee rules not verified against official documentation.",
    });
  },
};