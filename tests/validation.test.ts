import { describe, it, expect } from "vitest";
import { parseNonNegativeCents, parsePositiveCents, parseBps } from "@/lib/validation";

describe("validation", () => {
  it("parses non-negative cents", () => {
    expect(parseNonNegativeCents("0")).toBe(0);
    expect(parseNonNegativeCents("25.50")).toBe(2550);
  });
  it("rejects negative/NaN/infinity", () => {
    expect(parseNonNegativeCents("-1")).toBeNull();
    expect(parseNonNegativeCents("abc")).toBeNull();
    expect(parseNonNegativeCents("Infinity")).toBeNull();
  });
  it("positive requires > 0", () => {
    expect(parsePositiveCents("0")).toBeNull();
    expect(parsePositiveCents("1")).toBe(100);
  });
  it("bps parse", () => {
    expect(parseBps("")).toBe(0);
    expect(parseBps("5")).toBe(500);
    expect(parseBps("-1")).toBeNull();
    expect(parseBps("101")).toBeNull();
  });
});