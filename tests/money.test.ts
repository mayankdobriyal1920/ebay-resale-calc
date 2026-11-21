import { describe, it, expect } from "vitest";
import {
  dollarsToCents,
  centsToDollars,
  formatUsd,
  applyRateBps,
  applyRatePercent,
} from "@/calculators/money";

describe("money helpers", () => {
  it("parses dollars to cents", () => {
    expect(dollarsToCents("25.00")).toBe(2500);
    expect(dollarsToCents("0.01")).toBe(1);
    expect(dollarsToCents(10)).toBe(1000);
  });
  it("formats cents to dollars", () => {
    expect(centsToDollars(2500)).toBe("25.00");
    expect(centsToDollars(-5)).toBe("-0.05");
  });
  it("formats USD", () => {
    expect(formatUsd(123456)).toBe("$1,234.56");
  });
  it("applies rate in bps", () => {
    expect(applyRateBps(10000, 1325)).toBe(1325); // 13.25% of 100.00
  });
  it("applies rate in percent", () => {
    expect(applyRatePercent(10000, 13.25)).toBe(1325);
  });
  it("rejects invalid input", () => {
    expect(() => dollarsToCents("abc")).toThrow();
    expect(() => dollarsToCents("1.234")).toThrow();
  });
});