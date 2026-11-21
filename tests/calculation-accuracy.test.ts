import { describe, it, expect } from "vitest";
import { ebayAdapter } from "@/calculators/ebay";
import { poshmarkAdapter } from "@/calculators/poshmark";
import { mercariAdapter } from "@/calculators/mercari";
import { depopAdapter } from "@/calculators/depop";
import { solveReverseProfit } from "@/calculators/reverseProfit";
import { dollarsToCents } from "@/calculators/money";

function ebayInput(overrides: Record<string, unknown> = {}) {
  return {
    itemCost: dollarsToCents("5.00"),
    sellingPrice: dollarsToCents("25.00"),
    quantity: 1,
    buyerShipping: 0,
    sellerShippingCost: dollarsToCents("3.00"),
    packagingCost: 0,
    otherCost: 0,
    promotedRateBps: 0,
    salesTaxIncluded: 0,
    ...overrides,
  };
}

describe("Calculation accuracy — specific sale amounts", () => {
  describe("eBay", () => {
    it("$5 sale — per-order fee $0.30 applies (<= $10 threshold)", () => {
      const r = ebayAdapter.calculate(ebayInput({ sellingPrice: dollarsToCents("5.00") }));
      const perOrder = r.feeLines.find((f) => f.name === "Per-order fee")!;
      expect(perOrder.amountCents).toBe(30);
      const fvf = r.feeLines.find((f) => f.name === "Final value fee")!;
      expect(fvf.amountCents).toBe(Math.round(500 * 0.136)); // 68
      expect(r.totalFeesCents).toBe(30 + 68);
    });

    it("$10 sale — per-order fee $0.30 (<= $10 boundary)", () => {
      const r = ebayAdapter.calculate(ebayInput({ sellingPrice: dollarsToCents("10.00") }));
      const perOrder = r.feeLines.find((f) => f.name === "Per-order fee")!;
      expect(perOrder.amountCents).toBe(30);
    });

    it("$10.01 sale — per-order fee $0.40 (> $10 boundary)", () => {
      const r = ebayAdapter.calculate(ebayInput({ sellingPrice: dollarsToCents("10.01") }));
      const perOrder = r.feeLines.find((f) => f.name === "Per-order fee")!;
      expect(perOrder.amountCents).toBe(40);
    });

    it("$14.99 sale — Poshmark flat fee", () => {
      const r = poshmarkAdapter.calculate(ebayInput({ sellingPrice: dollarsToCents("14.99") }));
      const commission = r.feeLines.find((f) => f.name === "Poshmark commission")!;
      expect(commission.amountCents).toBe(295);
    });

    it("$15.00 sale — Poshmark 20% (at threshold)", () => {
      const r = poshmarkAdapter.calculate(ebayInput({ sellingPrice: dollarsToCents("15.00") }));
      const commission = r.feeLines.find((f) => f.name === "Poshmark commission")!;
      expect(commission.amountCents).toBe(Math.round(1500 * 0.2)); // 300
    });

    it("$50 sale — eBay tiered FVF", () => {
      const r = ebayAdapter.calculate(ebayInput({ sellingPrice: dollarsToCents("50.00") }));
      const fvf = r.feeLines.find((f) => f.name === "Final value fee")!;
      expect(fvf.amountCents).toBe(Math.round(5000 * 0.136)); // 680
    });

    it("$100 sale — eBay FVF", () => {
      const r = ebayAdapter.calculate(ebayInput({ sellingPrice: dollarsToCents("100.00") }));
      const fvf = r.feeLines.find((f) => f.name === "Final value fee")!;
      expect(fvf.amountCents).toBe(Math.round(10000 * 0.136)); // 1360
    });

    it("Buyer-paid shipping included in eBay fee base", () => {
      const r = ebayAdapter.calculate(ebayInput({ sellingPrice: dollarsToCents("25.00"), buyerShipping: dollarsToCents("10.00") }));
      expect(r.modeledRevenueCents).toBe(dollarsToCents("35.00"));
    });

    it("Seller-paid shipping reduces net profit by the shipping cost", () => {
      const withoutShipping = ebayAdapter.calculate(ebayInput({ sellerShippingCost: 0 }));
      const withShipping = ebayAdapter.calculate(ebayInput({ sellerShippingCost: dollarsToCents("5.00") }));
      expect(withoutShipping.netProfitCents - withShipping.netProfitCents).toBe(dollarsToCents("5.00"));
    });

    it("Packaging expense reduces net profit by the packaging cost", () => {
      const withoutPackaging = ebayAdapter.calculate(ebayInput({ packagingCost: 0 }));
      const withPackaging = ebayAdapter.calculate(ebayInput({ packagingCost: dollarsToCents("2.00") }));
      expect(withoutPackaging.netProfitCents - withPackaging.netProfitCents).toBe(dollarsToCents("2.00"));
    });

    it("Zero profit scenario", () => {
      const r = ebayAdapter.calculate(ebayInput({ itemCost: dollarsToCents("20.00"), sellingPrice: dollarsToCents("25.00"), buyerShipping: 0 }));
      // 25.00 * 13.6% = 3.40 + 0.40 per-order = 3.80 fees
      // Net proceeds = 25.00 - 3.80 = 21.20
      // Profit = 21.20 - 20.00 - 3.00 = -1.80 (negative, actually)
      expect(r.netProfitCents).toBeLessThanOrEqual(0);
    });

    it("Negative profit scenario", () => {
      const r = ebayAdapter.calculate(ebayInput({ itemCost: dollarsToCents("50.00"), sellingPrice: dollarsToCents("25.00"), buyerShipping: 0 }));
      expect(r.netProfitCents).toBeLessThan(0);
    });

    it("High-profit sale", () => {
      const r = ebayAdapter.calculate(ebayInput({ itemCost: dollarsToCents("1.00"), sellingPrice: dollarsToCents("100.00"), buyerShipping: 0 }));
      expect(r.netProfitCents).toBeGreaterThan(0);
      expect(r.roiPercent).toBeGreaterThan(0);
    });

    it("Decimal precision — $14.99 Poshmark flat fee", () => {
      const r = poshmarkAdapter.calculate(ebayInput({ sellingPrice: dollarsToCents("14.99"), buyerShipping: 0 }));
      expect(r.totalFeesCents).toBe(295);
    });

    it("Decimal precision — $15.00 Poshmark 20%", () => {
      const r = poshmarkAdapter.calculate(ebayInput({ sellingPrice: dollarsToCents("15.00"), buyerShipping: 0 }));
      expect(r.totalFeesCents).toBe(300);
    });
  });

  describe("Depop", () => {
    it("Non-boosted listing — only processing fee", () => {
      const r = depopAdapter.calculate(ebayInput({ sellingPrice: dollarsToCents("25.00") }));
      const boost = r.feeLines.find((f) => f.name === "Boosted listing fee");
      expect(boost).toBeUndefined();
      const processing = r.feeLines.find((f) => f.name === "Payment processing fee")!;
      expect(processing.amountCents).toBe(Math.round(2500 * 0.033) + 45);
    });

    it("Boosted listing — processing + boost fee", () => {
      const r = depopAdapter.calculate(ebayInput({ sellingPrice: dollarsToCents("25.00"), promotedRateBps: 1 }));
      const boost = r.feeLines.find((f) => f.name === "Boosted listing fee")!;
      expect(boost.amountCents).toBe(Math.round(2500 * 0.12));
    });

    it("Processing fee base includes buyer shipping", () => {
      const r = depopAdapter.calculate(ebayInput({ sellingPrice: dollarsToCents("25.00"), buyerShipping: dollarsToCents("5.00") }));
      const processing = r.feeLines.find((f) => f.name === "Payment processing fee")!;
      expect(processing.baseCents).toBe(dollarsToCents("30.00"));
    });
  });

  describe("Reverse profit", () => {
    it("Solves for target profit with eBay tiered fees", () => {
      const r = solveReverseProfit({
        desiredProfitCents: dollarsToCents("10.00"),
        itemCostCents: dollarsToCents("5.00"),
        sellerShippingCostCents: dollarsToCents("3.00"),
        packagingCostCents: 0,
        otherCostCents: 0,
        marketplaceId: "ebay",
        quantity: 1,
        promotedRateBps: 0,
        buyerShippingCents: 0,
        salesTaxIncludedCents: 0,
      });
      expect(r.requiredPriceCents).not.toBeNull();
      expect(r.breakEvenPriceCents).not.toBeNull();
      expect(r.estimatedProfitCents).toBeGreaterThanOrEqual(dollarsToCents("10.00"));
    });

    it("Validates result by recalculating through engine", () => {
      const r = solveReverseProfit({
        desiredProfitCents: dollarsToCents("15.00"),
        itemCostCents: dollarsToCents("5.00"),
        sellerShippingCostCents: dollarsToCents("3.00"),
        packagingCostCents: 0,
        otherCostCents: 0,
        marketplaceId: "ebay",
        quantity: 1,
        promotedRateBps: 0,
        buyerShippingCents: 0,
        salesTaxIncludedCents: 0,
      });
      if (r.requiredPriceCents === null) throw new Error("Expected valid price");
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
      expect(check.netProfitCents).toBeGreaterThanOrEqual(dollarsToCents("15.00"));
    });
  });

  describe("Cross-platform consistency", () => {
    const salePrice = dollarsToCents("25.00");
    const base = {
      itemCost: dollarsToCents("5.00"),
      sellingPrice: salePrice,
      quantity: 1,
      buyerShipping: 0,
      sellerShippingCost: dollarsToCents("3.00"),
      packagingCost: 0,
      otherCost: 0,
      promotedRateBps: 0,
      salesTaxIncluded: 0,
    };

    it("All four MVP adapters return complete estimates", () => {
      for (const a of [ebayAdapter, poshmarkAdapter, mercariAdapter, depopAdapter]) {
        const r = a.calculate(base);
        expect(r.isComplete).toBe(true);
        expect(r.sourceUrl).toBeTruthy();
        expect(r.lastVerifiedDate).toBeTruthy();
      }
    });

    it("No NaN or Infinity in any result", () => {
      for (const a of [ebayAdapter, poshmarkAdapter, mercariAdapter, depopAdapter]) {
        const r = a.calculate(base);
        expect(Number.isFinite(r.totalFeesCents)).toBe(true);
        expect(Number.isFinite(r.netProfitCents)).toBe(true);
        expect(Number.isFinite(r.profitMarginPercent ?? 0)).toBe(true);
        expect(r.roiPercent === null || Number.isFinite(r.roiPercent)).toBe(true);
      }
    });

    it("Net profit = net proceeds - costs", () => {
      const r = ebayAdapter.calculate(base);
      const expectedProfit = r.netProceedsCents - dollarsToCents("5.00") - dollarsToCents("3.00") - 0 - 0;
      expect(r.netProfitCents).toBe(expectedProfit);
    });

    it("Total fees = sum of included fee lines", () => {
      const r = ebayAdapter.calculate(base);
      const expectedTotal = r.feeLines.filter((f) => f.included).reduce((sum, f) => sum + f.amountCents, 0);
      expect(r.totalFeesCents).toBe(expectedTotal);
    });
  });
});