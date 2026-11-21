import { MarketplaceAdapter, MoneyInput, FeeLine } from "./types";
import { buildResult } from "./shared";

const SOURCE_URL = "https://depophelp.zendesk.com/";

export const depopAdapter: MarketplaceAdapter = {
  id: "depop",
  name: "Depop",
  feeScheduleVersion: "UNVERIFIED",
  effectiveDate: "TBD",
  lastVerifiedDate: "TBD",
  sourceUrl: SOURCE_URL,
  supportedAssumptions: ["US sellers", "Single item, single quantity"],
  unsupportedConditions: [
    "US selling fee status by seller cohort",
    "Payment-processing percentage and fixed amount",
    "Optional boosted listing fee",
    "Shipping treatment",
  ],
  calculate(input: MoneyInput) {
    const feeLines: FeeLine[] = [];
    return buildResult({
      marketplaceId: "depop",
      marketplaceName: "Depop",
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
        "Depop fee rules (selling fee status, processing fee, boost fee) are not yet verified.",
    });
  },
};