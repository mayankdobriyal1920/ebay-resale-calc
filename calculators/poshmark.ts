// Poshmark US seller fee adapter.
// Verified from Poshmark's published fee structure (user-provided, 2026-11-21):
//   - Sales under $15: flat $2.95 commission
//   - Sales of $15 or more: 20% commission (seller keeps 80%)
// Source: Poshmark Fee Policy (https://support.poshmark.com/). Exact article URL to be recorded.
//
// Modeled:
//   - Commission on sale price with $15 threshold
// Not modeled (disclosed as excluded): seller-funded shipping discount,
//   payment processing (included in commission), taxes on fees.

import { MarketplaceAdapter, MoneyInput, FeeLine } from "./types";
import { buildResult } from "./shared";
import { applyRateBps } from "./money";

const SOURCE_URL = "https://support.poshmark.com/";
const THRESHOLD_CENTS = 1500; // $15.00 (verify inclusivity)
const FLAT_FEE_CENTS = 295; // $2.95
const HIGH_RATE_BPS = 2000; // 20.00%

export const poshmarkAdapter: MarketplaceAdapter = {
  id: "poshmark",
  name: "Poshmark",
  feeScheduleVersion: "US-2026-11",
  effectiveDate: "2026-11-21",
  lastVerifiedDate: "2026-11-21",
  sourceUrl: SOURCE_URL,
  supportedAssumptions: [
    "US sellers",
    "Single item, single order",
    "Sale price as fee base",
  ],
  unsupportedConditions: [
    "Seller-funded shipping discount",
    "Exact threshold inclusivity (assumed inclusive at $15)",
    "Payment processing (included in commission)",
  ],
  calculate(input: MoneyInput) {
    const saleCents = input.sellingPrice;
    const isHigh = saleCents >= THRESHOLD_CENTS;
    const commissionCents = isHigh
      ? applyRateBps(saleCents, HIGH_RATE_BPS)
      : FLAT_FEE_CENTS;

    const feeLines: FeeLine[] = [
      {
        name: "Poshmark commission",
        rateLabel: isHigh ? "20%" : "$2.95 flat",
        baseCents: saleCents,
        amountCents: commissionCents,
        included: true,
        note: isHigh ? "Sales of $15 or more" : "Sales under $15",
      },
      {
        name: "Seller-funded shipping discount",
        rateLabel: "Excluded",
        baseCents: 0,
        amountCents: 0,
        included: false,
        note: "Not modeled. If you offer a shipping discount, subtract it manually.",
      },
    ];

    return buildResult({
      marketplaceId: "poshmark",
      marketplaceName: "Poshmark",
      feeLines,
      modeledRevenueCents: saleCents,
      itemCostCents: input.itemCost,
      sellerShippingCostCents: input.sellerShippingCost,
      packagingCostCents: input.packagingCost,
      otherCostCents: input.otherCost,
      sourceUrl: SOURCE_URL,
      lastVerifiedDate: "2026-11-21",
      assumptions: [
        "US seller.",
        "Commission on sale price only; buyer-paid shipping goes to Poshmark for the label.",
        "Threshold inclusive at $15.00.",
      ],
      isComplete: true,
    });
  },
};