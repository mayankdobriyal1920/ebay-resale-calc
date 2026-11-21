import { describe, it, expect } from "vitest";
import { ebayAdapter } from "@/calculators/ebay";
import { dollarsToCents } from "@/calculators/money";

function input(overrides: Partial<Parameters<typeof ebayAdapter.calculate>[0]> = {}) {
  return {
    itemCost: dollarsToCents("5.00"),
    sellingPrice: dollarsToCents("25.00"),
    buyerShipping: 0,
    sellerShippingCost: dollarsToCents("3.00"),
    packagingCost: 0,
    otherCost: 0,
    promotedRateBps: 0,
    salesTaxIncluded: 0,
    ...overrides,
  };
}

describe("eBay adapter", () => {
  it("computes final value fee 13.6% + per-order fee", () => {
    const r = ebayAdapter.calculate(input());
    // fee base 25.00 -> 13.6% = 3.40; per-order 0.40 (over $10)
    expect(r.totalFeesCents).toBe(340 + 40);
  });

  it("per-order fee is $0.30 when order total <= $10", () => {
    const r = ebayAdapter.calculate(input({ sellingPrice: dollarsToCents("9.00") }));
    expect(r.feeLines.find((f) => f.name === "Per-order fee")?.amountCents).toBe(30);
  });

  it("per-order fee is $0.40 when order total > $10", () => {
    const r = ebayAdapter.calculate(input({ sellingPrice: dollarsToCents("10.01") }));
    expect(r.feeLines.find((f) => f.name === "Per-order fee")?.amountCents).toBe(40);
  });

  it("applies tiered rate over $7,500", () => {
    const r = ebayAdapter.calculate(input({ sellingPrice: dollarsToCents("8000.00") }));
    // 13.6% of 7500 = 1020.00; 2.35% of 500 = 11.75; per-order 0.40
    expect(r.totalFeesCents).toBe(102000 + 1175 + 40);
  });

  it("includes buyer shipping in fee base", () => {
    const r = ebayAdapter.calculate(input({ buyerShipping: dollarsToCents("5.00") }));
    const base = dollarsToCents("30.00");
    expect(r.modeledRevenueCents).toBe(base);
  });

  it("includes sales tax in fee base", () => {
    const r = ebayAdapter.calculate(input({ salesTaxIncluded: dollarsToCents("2.00") }));
    expect(r.modeledRevenueCents).toBe(dollarsToCents("27.00"));
  });

  it("applies promoted rate when provided", () => {
    const r = ebayAdapter.calculate(input({ promotedRateBps: 500 })); // 5%
    const promo = r.feeLines.find((f) => f.name === "Promoted Listings (standard)");
    expect(promo).toBeDefined();
    expect(promo!.amountCents).toBe(Math.round(2500 * 0.05));
  });

  it("handles zero item cost (ROI N/A)", () => {
    const r = ebayAdapter.calculate(input({ itemCost: 0 }));
    expect(r.roiPercent).toBeNull();
  });

  it("is complete", () => {
    const r = ebayAdapter.calculate(input());
    expect(r.isComplete).toBe(true);
  });
});