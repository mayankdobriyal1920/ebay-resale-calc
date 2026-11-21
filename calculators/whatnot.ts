import { MarketplaceAdapter, MoneyInput, FeeLine } from "./types";
import { buildResult } from "./shared";

const SOURCE_URL = "https://help.whatnot.com/";

export const whatnotAdapter: MarketplaceAdapter = {
  id: "whatnot",
  name: "Whatnot",
  feeScheduleVersion: "UNVERIFIED (Phase 2)",
  effectiveDate: "TBD",
  lastVerifiedDate: "TBD",
  sourceUrl: SOURCE_URL,
  supportedAssumptions: ["Phase 2 - not in MVP"],
  unsupportedConditions: ["All Whatnot fee rules (Phase 2)"],
  calculate(input: MoneyInput) {
    const feeLines: FeeLine[] = [];
    return buildResult({
      marketplaceId: "whatnot",
      marketplaceName: "Whatnot",
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
      incompleteReason: "Whatnot is a Phase 2 marketplace and is not yet implemented.",
    });
  },
};