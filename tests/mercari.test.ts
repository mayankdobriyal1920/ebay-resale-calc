import { describe, it, expect } from "vitest";
import { mercariAdapter } from "@/calculators/mercari";
import { dollarsToCents } from "@/calculators/money";

function input(price: string, buyerShipping = "0") {
  return {
    itemCost: dollarsToCents("5.00"),
    sellingPrice: dollarsToCents(price),
    quantity: 1,
    buyerShipping: dollarsToCents(buyerShipping),
    sellerShippingCost: dollarsToCents("3.00"),
    packagingCost: 0,
    otherCost: 0,
    promotedRateBps: 0,
    salesTaxIncluded: 0,
  };
}

describe("Mercari adapter", () => {
  it("10% on item price", () => {
    const r = mercariAdapter.calculate(input("25.00"));
    expect(r.totalFeesCents).toBe(Math.round(2500 * 0.1));
  });
  it("includes buyer shipping in fee base", () => {
    const r = mercariAdapter.calculate(input("25.00", "5.00"));
    expect(r.totalFeesCents).toBe(Math.round(3000 * 0.1));
  });
  it("buyer protection fee excluded (buyer-paid)", () => {
    const r = mercariAdapter.calculate(input("25.00"));
    const bp = r.feeLines.find((f) => f.name === "Buyer Protection fee");
    expect(bp?.included).toBe(false);
  });
  it("zero item cost ROI N/A", () => {
    const r = mercariAdapter.calculate({ ...input("25.00"), itemCost: 0 });
    expect(r.roiPercent).toBeNull();
  });
  it("is complete", () => {
    expect(mercariAdapter.calculate(input("25.00")).isComplete).toBe(true);
  });
});