// eBay fee adapter.
// STATUS: Fee rules NOT verified. Returns an incomplete estimate until
// official US seller-fee documentation is verified and recorded.
// See reseller_profit_calculator_production_spec.md section 5.

import { MarketplaceAdapter, MoneyInput, FeeLine } from "./types";
import { buildResult } from "./shared";

const SOURCE_URL = "https://www.ebay.com/help/selling/fees-credits-invoices/selling-fees?id=4822";

export const ebayAdapter: MarketplaceAdapter = {
  id: "ebay",
  name: "eBay",
  feeScheduleVersion: "UNVERIFIED",
  effectiveDate: "TBD",
  lastVerifiedDate: "TBD",
  sourceUrl: SOURCE_URL,
  supportedAssumptions: [
    "US sellers",
    "Single item, single quantity",
  ],
  unsupportedConditions: [
    "Category-specific final value fee rates",
    "Store subscription discounts",
    "Promoted Listings",
    "International fees",
    "Sales tax treatment in fee base",
  ],
  calculate(input: MoneyInput) {
    const feeLines: FeeLine[] = [];
    return buildResult({
      marketplaceId: "ebay",
      marketplaceName: "eBay",
      feeLines,
      modeledRevenueCents: input.sellingPrice + input.buyerShipping,
      itemCostCents: input.itemCost,
      sellerShippingCostCents: input.sellerShippingCost,
      packagingCostCents: input.packagingCost,
      otherCostCents: input.otherCost,
      sourceUrl: SOURCE_URL,
      lastVerifiedDate: "TBD",
      assumptions: [
        "Fee rules not yet verified against official sources.",
        "No fees modeled; result is incomplete.",
      ],
      isComplete: false,
      incompleteReason:
        "eBay fee rules (category rates, final value fee, per-order fixed fee, fee base) are not yet verified. Complete the fee verification log before enabling this estimate.",
    });
  },
};