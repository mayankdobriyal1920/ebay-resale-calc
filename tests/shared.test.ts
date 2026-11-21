import { describe, it, expect } from "vitest";
import { buildResult } from "@/calculators/shared";

describe("buildResult", () => {
  it("computes net proceeds, profit, margin, ROI", () => {
    const r = buildResult({
      marketplaceId: "t",
      marketplaceName: "T",
      feeLines: [{ name: "fee", rateLabel: "10%", baseCents: 1000, amountCents: 100, included: true }],
      modeledRevenueCents: 1000,
      itemCostCents: 200,
      sellerShippingCostCents: 50,
      packagingCostCents: 10,
      otherCostCents: 0,
      sourceUrl: "x",
      lastVerifiedDate: "y",
      assumptions: [],
    });
    expect(r.totalFeesCents).toBe(100);
    expect(r.netProceedsCents).toBe(900);
    expect(r.netProfitCents).toBe(640);
    expect(r.profitMarginPercent).toBeCloseTo(64);
    expect(r.roiPercent).toBeCloseTo(320);
  });
  it("ROI N/A when item cost 0", () => {
    const r = buildResult({
      marketplaceId: "t",
      marketplaceName: "T",
      feeLines: [],
      modeledRevenueCents: 1000,
      itemCostCents: 0,
      sellerShippingCostCents: 0,
      packagingCostCents: 0,
      otherCostCents: 0,
      sourceUrl: "x",
      lastVerifiedDate: "y",
      assumptions: [],
    });
    expect(r.roiPercent).toBeNull();
  });
});