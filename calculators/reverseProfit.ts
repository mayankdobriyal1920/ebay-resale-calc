// Phase 2: reverse target-profit calculator.
// Finds the minimum selling price to reach a desired net profit.
// Not implemented in MVP.

export interface ReverseProfitInput {
  desiredProfitCents: number;
  itemCostCents: number;
  sellerShippingCostCents: number;
  packagingCostCents: number;
  otherCostCents: number;
  marketplaceId: string;
  promotedRateBps: number;
  buyerShippingCents: number;
}

export interface ReverseProfitResult {
  requiredPriceCents: number | null;
  estimatedFeesCents: number | null;
  estimatedNetProceedsCents: number | null;
  estimatedProfitCents: number | null;
  note: string;
}

export function solveReverseProfit(_input: ReverseProfitInput): ReverseProfitResult {
  return {
    requiredPriceCents: null,
    estimatedFeesCents: null,
    estimatedNetProceedsCents: null,
    estimatedProfitCents: null,
    note: "Reverse profit calculator is a Phase 2 feature and is not yet implemented.",
  };
}