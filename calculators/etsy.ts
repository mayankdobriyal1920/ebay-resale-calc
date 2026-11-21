import { MarketplaceAdapter, MoneyInput, FeeLine } from "./types";
import { buildResult } from "./shared";

const SOURCE_URL = "https://www.etsy.com/legal/fees/";

export const etsyAdapter: MarketplaceAdapter = {
  id: "etsy",
  name: "Etsy",
  feeScheduleVersion: "UNVERIFIED (Phase 2)",
  effectiveDate: "TBD",
  lastVerifiedDate: "TBD",
  sourceUrl: SOURCE_URL,
  supportedAssumptions: ["Phase 2 - not in MVP"],
  unsupportedConditions: ["All Etsy fee rules (Phase 2)"],
  calculate(input: MoneyInput) {
    const feeLines: FeeLine[] = [];
    return buildResult({
      marketplaceId: "etsy",
      marketplaceName: "Etsy",
      feeLines,
      modeledRevenueCents: input.sellingPrice,
      itemCostCents: input.itemCost,
      sellerShippingCostCents: input.sellerShippingCost,
      packagingCostCents: input.packagingCost,
      otherCostCents: input.otherCost,
      sourceUrl: SOURCE_URL,
      lastVerifiedDate: "TBD",
      assumptions: ["Phase 2 marketplace - not yet implemented."],
      isComplete: false,
      incompleteReason: "Etsy is a Phase 2 marketplace and is not yet implemented.",
    });
  },
};