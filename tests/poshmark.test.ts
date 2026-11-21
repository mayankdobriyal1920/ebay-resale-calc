import { describe, it, expect } from "vitest";
import { poshmarkAdapter } from "@/calculators/poshmark";
import { dollarsToCents } from "@/calculators/money";

function input(price: string) {
  return {
    itemCost: dollarsToCents("5.00"),
    sellingPrice: dollarsToCents(price),
    buyerShipping: 0,
    sellerShippingCost: 0,
    packagingCost: 0,
    otherCost: 0,
    promotedRateBps: 0,
    salesTaxIncluded: 0,
  };
}

describe("Poshmark adapter", () => {
  it("flat $2.95 under $15", () => {
    const r = poshmarkAdapter.calculate(input("14.99"));
    expect(r.totalFeesCents).toBe(295);
  });
  it("exactly $15 uses 20%", () => {
    const r = poshmarkAdapter.calculate(input("15.00"));
    expect(r.totalFeesCents).toBe(Math.round(1500 * 0.2));
  });
  it("20% at/above threshold", () => {
    const r = poshmarkAdapter.calculate(input("25.00"));
    expect(r.totalFeesCents).toBe(Math.round(2500 * 0.2));
  });
  it("one cent below threshold uses flat fee", () => {
    const r = poshmarkAdapter.calculate(input("14.99"));
    expect(r.feeLines[0].rateLabel).toBe("$2.95 flat");
  });
  it("ROI N/A when item cost 0", () => {
    const r = poshmarkAdapter.calculate({ ...input("20.00"), itemCost: 0 });
    expect(r.roiPercent).toBeNull();
  });
});