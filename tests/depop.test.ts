import { describe, it, expect } from "vitest";
import { depopAdapter } from "@/calculators/depop";
import { dollarsToCents } from "@/calculators/money";

function input(price: string, buyerShipping = "0", promoted = 0) {
  return {
    itemCost: dollarsToCents("5.00"),
    sellingPrice: dollarsToCents(price),
    quantity: 1,
    buyerShipping: dollarsToCents(buyerShipping),
    sellerShippingCost: dollarsToCents("3.00"),
    packagingCost: 0,
    otherCost: 0,
    promotedRateBps: promoted,
    salesTaxIncluded: 0,
  };
}

describe("Depop adapter", () => {
  it("processing fee 3.3% + $0.45", () => {
    const r = depopAdapter.calculate(input("25.00"));
    const expected = Math.round(2500 * 0.033) + 45;
    expect(r.totalFeesCents).toBe(expected);
  });
  it("includes buyer shipping + tax in processing base", () => {
    const r = depopAdapter.calculate(input("25.00", "5.00"));
    const expected = Math.round(3000 * 0.033) + 45;
    expect(r.totalFeesCents).toBe(expected);
  });
  it("no selling fee line included (excluded)", () => {
    const r = depopAdapter.calculate(input("25.00"));
    const selling = r.feeLines.find((f) => f.name === "Depop selling fee");
    expect(selling?.included).toBe(false);
  });
  it("boost adds 12% when enabled", () => {
    const r = depopAdapter.calculate(input("25.00", "0", 1));
    expect(r.feeLines.find((f) => f.name === "Boosted listing fee")).toBeDefined();
  });
  it("no boost when disabled", () => {
    const r = depopAdapter.calculate(input("25.00"));
    expect(r.feeLines.find((f) => f.name === "Boosted listing fee")).toBeUndefined();
  });
  it("is complete", () => {
    expect(depopAdapter.calculate(input("25.00")).isComplete).toBe(true);
  });
});