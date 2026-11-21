import { ebayAdapter } from "./ebay";
import { MarketplaceAdapter } from "./types";

export interface ReverseProfitInput {
  desiredProfitCents: number;
  itemCostCents: number;
  sellerShippingCostCents: number;
  packagingCostCents: number;
  otherCostCents: number;
  marketplaceId: string;
  quantity?: number;
  promotedRateBps: number;
  buyerShippingCents: number;
  salesTaxIncludedCents?: number;
}

export interface ReverseProfitResult {
  requiredPriceCents: number | null;
  estimatedFeesCents: number | null;
  estimatedNetProceedsCents: number | null;
  estimatedProfitCents: number | null;
  note: string;
}

const ADAPTERS: Record<string, MarketplaceAdapter> = {
  ebay: ebayAdapter,
};

export function solveReverseProfit(input: ReverseProfitInput): ReverseProfitResult {
  const adapter = ADAPTERS[input.marketplaceId];
  if (!adapter) {
    return {
      requiredPriceCents: null,
      estimatedFeesCents: null,
      estimatedNetProceedsCents: null,
      estimatedProfitCents: null,
      note: `Reverse profit not supported for ${input.marketplaceId} yet.`,
    };
  }

  const tax = input.salesTaxIncludedCents ?? 0;

  function profitAt(priceCents: number): number {
    const r = adapter.calculate({
      itemCost: input.itemCostCents,
      sellingPrice: priceCents,
      quantity: input.quantity ?? 1,
      buyerShipping: input.buyerShippingCents,
      sellerShippingCost: input.sellerShippingCostCents,
      packagingCost: input.packagingCostCents,
      otherCost: input.otherCostCents,
      promotedRateBps: input.promotedRateBps,
      salesTaxIncluded: tax,
    });
    return r.netProfitCents;
  }

  // Binary search: profit increases with price (monotonic for our fee models).
  let lo = 0;
  let hi = Math.max(100, input.desiredProfitCents + input.itemCostCents + input.sellerShippingCostCents + input.packagingCostCents + input.otherCostCents + 100000);
  // Expand hi until profit exceeds target.
  let guard = 0;
  while (profitAt(hi) < input.desiredProfitCents && guard < 60) {
    hi *= 2;
    guard++;
  }
  if (profitAt(hi) < input.desiredProfitCents) {
    return {
      requiredPriceCents: null,
      estimatedFeesCents: null,
      estimatedNetProceedsCents: null,
      estimatedProfitCents: null,
      note: "No valid price found under the selected fee assumptions (target too high).",
    };
  }

  // Binary search for smallest price with profit >= target (cent precision).
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (profitAt(mid) >= input.desiredProfitCents) {
      hi = mid;
    } else {
      lo = mid + 1;
    }
  }

  const final = adapter.calculate({
    itemCost: input.itemCostCents,
    sellingPrice: lo,
    quantity: input.quantity ?? 1,
    buyerShipping: input.buyerShippingCents,
    sellerShippingCost: input.sellerShippingCostCents,
    packagingCost: input.packagingCostCents,
    otherCost: input.otherCostCents,
    promotedRateBps: input.promotedRateBps,
    salesTaxIncluded: tax,
  });

  return {
    requiredPriceCents: lo,
    estimatedFeesCents: final.totalFeesCents,
    estimatedNetProceedsCents: final.netProceedsCents,
    estimatedProfitCents: final.netProfitCents,
    note: "Estimated minimum selling price to reach the desired profit (eBay, most categories).",
  };
}

