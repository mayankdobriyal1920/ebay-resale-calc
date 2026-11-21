import { MarketplaceResult, MoneyInput, FeeLine } from "./types";
import { formatUsd } from "./money";

export interface BuildResultArgs {
  marketplaceId: string;
  marketplaceName: string;
  feeLines: FeeLine[];
  modeledRevenueCents: number;
  itemCostCents: number;
  sellerShippingCostCents: number;
  packagingCostCents: number;
  otherCostCents: number;
  sourceUrl: string;
  lastVerifiedDate: string;
  assumptions: string[];
  isComplete?: boolean;
  incompleteReason?: string;
}

export function buildResult(args: BuildResultArgs): MarketplaceResult {
  const totalFeesCents = args.feeLines
    .filter((f) => f.included)
    .reduce((sum, f) => sum + f.amountCents, 0);

  const netProceedsCents = args.modeledRevenueCents - totalFeesCents;
  const netProfitCents =
    netProceedsCents -
    args.itemCostCents -
    args.sellerShippingCostCents -
    args.packagingCostCents -
    args.otherCostCents;

  const profitMarginPercent =
    args.modeledRevenueCents === 0
      ? null
      : (netProfitCents / args.modeledRevenueCents) * 100;

  const roiPercent =
    args.itemCostCents === 0 ? null : (netProfitCents / args.itemCostCents) * 100;

  return {
    marketplaceId: args.marketplaceId,
    marketplaceName: args.marketplaceName,
    feeLines: args.feeLines,
    totalFeesCents,
    modeledRevenueCents: args.modeledRevenueCents,
    netProceedsCents,
    netProfitCents,
    profitMarginPercent,
    roiPercent,
    isComplete: args.isComplete ?? true,
    incompleteReason: args.incompleteReason,
    assumptions: args.assumptions,
    sourceUrl: args.sourceUrl,
    lastVerifiedDate: args.lastVerifiedDate,
  };
}

export { formatUsd };