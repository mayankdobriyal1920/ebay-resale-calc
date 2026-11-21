import { MarketplaceAdapter, MoneyInput, FeeLine } from "./types";
import { buildResult } from "./shared";

const SOURCE_URL = "https://support.poshmark.com/";

export const poshmarkAdapter: MarketplaceAdapter = {
  id: "poshmark",
  name: "Poshmark",
  feeScheduleVersion: "UNVERIFIED",
  effectiveDate: "TBD",
  lastVerifiedDate: "TBD",
  sourceUrl: SOURCE_URL,
  supportedAssumptions: ["US sellers", "Single item, single quantity"],
  unsupportedConditions: [
    "Sale-price threshold boundary",
    "Fixed fee for lower-value orders",
    "Seller-funded shipping discount",
  ],
  calculate(input: MoneyInput) {
    const feeLines: FeeLine[] = [];
    return buildResult({
      marketplaceId: "poshmark",
      marketplaceName: "Poshmark",
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
        "Poshmark fee rules (threshold, fixed/percentage fee, shipping discount) are not yet verified.",
    });
  },
};