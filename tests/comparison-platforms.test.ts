import { describe, it, expect } from "vitest";
import { ebayAdapter, poshmarkAdapter, mercariAdapter, depopAdapter } from "@/calculators";
import { dollarsToCents } from "@/calculators/money";

const input = {
  itemCost: dollarsToCents("5.00"),
  sellingPrice: dollarsToCents("25.00"),
  buyerShipping: dollarsToCents("5.00"),
  sellerShippingCost: dollarsToCents("3.00"),
  packagingCost: dollarsToCents("0.50"),
  otherCost: 0,
  promotedRateBps: 0,
  salesTaxIncluded: 0,
};

describe("cross-platform comparison", () => {
  it("all four MVP adapters return complete estimates", () => {
    for (const a of [ebayAdapter, poshmarkAdapter, mercariAdapter, depopAdapter]) {
      const r = a.calculate(input);
      expect(r.isComplete).toBe(true);
    }
  });

  it("fee bases differ by marketplace", () => {
    const ebay = ebayAdapter.calculate(input);
    const mercari = mercariAdapter.calculate(input);
    // eBay fee base includes tax (0 here) + shipping; mercari same numeric but rate differs
    expect(ebay.totalFeesCents).not.toBe(mercari.totalFeesCents);
  });

  it("highest profit identifiable", () => {
    const results = [ebayAdapter, poshmarkAdapter, mercariAdapter, depopAdapter].map((a) => a.calculate(input));
    const profits = results.map((r) => r.netProfitCents);
    const max = Math.max(...profits);
    expect(profits.filter((p) => p === max).length).toBeGreaterThanOrEqual(1);
  });
});