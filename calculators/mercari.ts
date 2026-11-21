import { MarketplaceAdapter, MoneyInput, FeeLine } from "./types";
import { buildResult } from "./shared";

const SOURCE_URL = "https://www.mercari.com/us/help_center/";

export const mercariAdapter: MarketplaceAdapter = {
  id: "mercari",
  name: "Mercari",
  feeScheduleVersion: "UNVERIFIED",
  effectiveDate: "TBD",
  lastVerifiedDate: "TBD",
  sourceUrl: SOURCE_URL,
  supportedAssumptions: ["US sellers", "Single item, single quantity"],
  unsupportedConditions: [
    "Current seller fee rate and fee base",
    "Shipping method / who pays",
    "Seller-paid label deductions",
  ],
  calculate(input: MoneyInput) {
    const feeLines: FeeLine[] = [];
    return buildResult({
      marketplaceId: "mercari",
      marketplaceName: "Mercari",
      feeLines,
      modeledRevenueCents: input.sellingPrice,
      itemCostCents: input.itemCost,
      sellerShippingCostCents: input.sellerShippingCost,
      packagingCostCents: input.packagingCost,
      otherCostCents: input.otherCost,
      sourceUrl: SOURCE_URL,
      lastVerifiedDate: "TBD",
      assumptions: ["Fee rules not yet verified against official sources."],
      isComplete: false,
      incompleteReason:
        "Mercari fee rules (seller fee rate, fee base, shipping treatment) are not yet verified.",
    });
  },
};