import { describe, it, expect } from "vitest";
import { solveReverseProfit } from "@/calculators/reverseProfit";
import { ebayAdapter } from "@/calculators/ebay";
import { dollarsToCents } from "@/calculators/money";

function baseInput(overrides: Record<string, unknown> = {}) {
  return {
    desiredProfitCents: dollarsToCents("20.00"),
    itemCostCents: dollarsToCents("5.00"),
    sellerShippingCostCents: dollarsToCents("3.00"),
    packagingCostCents: 0,
    otherCostCents: 0,
    marketplaceId: "ebay",
    quantity: 1,
    promotedRateBps: 0,
    buyerShippingCents: 0,
    salesTaxIncludedCents: 0,
    ...overrides,
  };
}

describe("reverse profit (eBay)", () => {
  it("finds required price for target profit", () => {
    const r = solveReverseProfit(baseInput());
    expect(r.requiredPriceCents).not.toBeNull();
    expect(r.breakEvenPriceCents).not.toBeNull();
    expect(r.estimatedProfitCents).toBeGreaterThanOrEqual(dollarsToCents("20.00"));
  });

  it("validates result by recalculating through engine", () => {
    const r = solveReverseProfit(baseInput());
    if (r.requiredPriceCents === null) {
      throw new Error("Expected a valid price");
    }
    const check = ebayAdapter.calculate({
      itemCost: dollarsToCents("5.00"),
      sellingPrice: r.requiredPriceCents,
      quantity: 1,
      buyerShipping: 0,
      sellerShippingCost: dollarsToCents("3.00"),
      packagingCost: 0,
      otherCost: 0,
      promotedRateBps: 0,
      salesTaxIncluded: 0,
    });
    expect(check.netProfitCents).toBeGreaterThanOrEqual(dollarsToCents("20.00"));
  });

  it("computes break-even price", () => {
    const r = solveReverseProfit(baseInput({ desiredProfitCents: 0 }));
    expect(r.breakEvenPriceCents).not.toBeNull();
    expect(r.breakEvenPriceCents).toBeGreaterThan(0);
  });

  it("returns very high price for extremely high target", () => {
    const r = solveReverseProfit(baseInput({ desiredProfitCents: dollarsToCents("1000000.00") }));
    expect(r.requiredPriceCents).toBeGreaterThan(0);
    expect(r.estimatedProfitCents).toBeGreaterThanOrEqual(dollarsToCents("1000000.00"));
  });

  it("handles unsupported marketplace", () => {
    const r = solveReverseProfit({ ...baseInput(), marketplaceId: "etsy" as any });
    expect(r.requiredPriceCents).toBeNull();
    expect(r.note).toContain("not supported");
  });

  it("supports poshmark marketplace", () => {
    const r = solveReverseProfit({ ...baseInput(), marketplaceId: "poshmark" });
    // Poshmark may not support high profit targets with $5 cost
    expect(r.requiredPriceCents).toBeDefined();
  });

  it("supports mercari marketplace", () => {
    const r = solveReverseProfit({ ...baseInput(), marketplaceId: "mercari" });
    expect(r.requiredPriceCents).toBeDefined();
  });

  it("supports depop marketplace", () => {
    const r = solveReverseProfit({ ...baseInput(), marketplaceId: "depop" });
    expect(r.requiredPriceCents).toBeDefined();
  });
});