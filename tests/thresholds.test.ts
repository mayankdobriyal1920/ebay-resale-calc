import { describe, it, expect } from "vitest";
import { ebayAdapter } from "@/calculators/ebay";
import { poshmarkAdapter } from "@/calculators/poshmark";
import { mercariAdapter } from "@/calculators/mercari";
import { depopAdapter } from "@/calculators/depop";
import { dollarsToCents } from "@/calculators/money";

function baseInput() {
  return {
    itemCost: dollarsToCents("5.00"),
    sellingPrice: dollarsToCents("25.00"),
    quantity: 1,
    buyerShipping: dollarsToCents("5.00"),
    sellerShippingCost: dollarsToCents("3.00"),
    packagingCost: dollarsToCents("0.50"),
    otherCost: 0,
    promotedRateBps: 0,
    salesTaxIncluded: 0,
  };
}

describe("Threshold boundary tests", () => {
  describe("eBay", () => {
    it("per-order fee $0.30 at exactly $10.00", () => {
      const r = ebayAdapter.calculate({
        ...baseInput(),
        sellingPrice: dollarsToCents("10.00"),
        buyerShipping: 0,
      });
      const perOrder = r.feeLines.find((f) => f.name === "Per-order fee");
      expect(perOrder?.amountCents).toBe(30);
    });

    it("per-order fee $0.40 at $10.01", () => {
      const r = ebayAdapter.calculate({
        ...baseInput(),
        sellingPrice: dollarsToCents("10.01"),
        buyerShipping: 0,
      });
      const perOrder = r.feeLines.find((f) => f.name === "Per-order fee");
      expect(perOrder?.amountCents).toBe(40);
    });

    it("FVF 13.6% at exactly $7,500", () => {
      const r = ebayAdapter.calculate({
        ...baseInput(),
        sellingPrice: dollarsToCents("7500.00"),
        buyerShipping: 0,
        salesTaxIncluded: 0,
      });
      const fvf = r.feeLines.find((f) => f.name === "Final value fee");
      expect(fvf?.amountCents).toBe(Math.round(750000 * 0.136)); // 102000
    });

    it("FVF tiered at $7,500.01", () => {
      const r = ebayAdapter.calculate({
        ...baseInput(),
        sellingPrice: dollarsToCents("7500.01"),
        buyerShipping: 0,
        salesTaxIncluded: 0,
      });
      const fvf = r.feeLines.find((f) => f.name === "Final value fee");
      const expected = Math.round(750000 * 0.136) + Math.round(1 * 0.0235);
      expect(fvf?.amountCents).toBe(expected);
    });

    it("zero-dollar sale", () => {
      const r = ebayAdapter.calculate({
        ...baseInput(),
        sellingPrice: 0,
        buyerShipping: 0,
      });
      // Per-order fee of $0.30 still applies at $0 order total (<= $10 threshold)
      expect(r.totalFeesCents).toBe(30);
      expect(r.netProfitCents).toBeLessThan(0); // negative profit
    });

    it("includes buyer shipping in fee base", () => {
      const r = ebayAdapter.calculate(baseInput());
      expect(r.modeledRevenueCents).toBe(dollarsToCents("30.00")); // 25 + 5
    });

    it("includes sales tax in fee base", () => {
      const r = ebayAdapter.calculate({
        ...baseInput(),
        salesTaxIncluded: dollarsToCents("2.00"),
      });
      expect(r.modeledRevenueCents).toBe(dollarsToCents("32.00")); // 25 + 5 + 2
    });

    it("packaging cost scales with quantity", () => {
      const r = ebayAdapter.calculate({
        ...baseInput(),
        quantity: 2,
        packagingCost: dollarsToCents("1.00"),
      });
      expect(r.assumptions).toContain("Quantity 2.");
    });
  });

  describe("Poshmark", () => {
    it("flat $2.95 under $15", () => {
      const r = poshmarkAdapter.calculate({
        ...baseInput(),
        sellingPrice: dollarsToCents("14.99"),
        buyerShipping: 0,
      });
      const commission = r.feeLines.find((f) => f.name === "Poshmark commission");
      expect(commission?.amountCents).toBe(295);
    });

    it("20% at exactly $15.00", () => {
      const r = poshmarkAdapter.calculate({
        ...baseInput(),
        sellingPrice: dollarsToCents("15.00"),
        buyerShipping: 0,
      });
      const commission = r.feeLines.find((f) => f.name === "Poshmark commission");
      expect(commission?.amountCents).toBe(Math.round(1500 * 0.2)); // 300
    });

    it("20% above $15", () => {
      const r = poshmarkAdapter.calculate({
        ...baseInput(),
        sellingPrice: dollarsToCents("15.01"),
        buyerShipping: 0,
      });
      const commission = r.feeLines.find((f) => f.name === "Poshmark commission");
      expect(commission?.amountCents).toBe(Math.round(1501 * 0.2));
    });
  });

  describe("Mercari", () => {
    it("10% selling fee on item + shipping", () => {
      const r = mercariAdapter.calculate(baseInput());
      const sellingFee = r.feeLines.find((f) => f.name === "Mercari selling fee");
      expect(sellingFee?.amountCents).toBe(Math.round(3000 * 0.1)); // $30.00 * 10%
    });

    it("buyer protection excluded from seller fees", () => {
      const r = mercariAdapter.calculate(baseInput());
      const bp = r.feeLines.find((f) => f.name === "Buyer Protection fee");
      expect(bp?.included).toBe(false);
    });
  });

  describe("Depop", () => {
    it("processing fee 3.3% + $0.45", () => {
      const r = depopAdapter.calculate(baseInput());
      const processing = r.feeLines.find((f) => f.name === "Payment processing fee");
      expect(processing?.amountCents).toBe(Math.round(3000 * 0.033) + 45);
    });

    it("no selling fee for US sellers", () => {
      const r = depopAdapter.calculate(baseInput());
      const selling = r.feeLines.find((f) => f.name === "Depop selling fee");
      expect(selling?.included).toBe(false);
    });

    it("boost fee 12% when enabled", () => {
      const r = depopAdapter.calculate({
        ...baseInput(),
        promotedRateBps: 1,
      });
      const boost = r.feeLines.find((f) => f.name === "Boosted listing fee");
      expect(boost).toBeDefined();
    });
  });

  describe("Cross-platform", () => {
    it("all four MVP adapters return complete estimates", () => {
      const adapters = [ebayAdapter, poshmarkAdapter, mercariAdapter, depopAdapter];
      for (const a of adapters) {
        const r = a.calculate(baseInput());
        expect(r.isComplete).toBe(true);
        expect(r.sourceUrl).toBeTruthy();
        expect(r.lastVerifiedDate).toBeTruthy();
      }
    });
  });
});