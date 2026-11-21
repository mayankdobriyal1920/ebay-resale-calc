import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ComparisonResults from "@/components/ComparisonResults";
import { ebayAdapter } from "@/calculators/ebay";
import { dollarsToCents } from "@/calculators/money";

describe("ComparisonResults", () => {
  it("renders marketplace result and highlights best", () => {
    const input = {
      itemCost: dollarsToCents("5.00"),
      sellingPrice: dollarsToCents("25.00"),
      quantity: 1,
      buyerShipping: 0,
      sellerShippingCost: dollarsToCents("3.00"),
      packagingCost: 0,
      otherCost: 0,
      promotedRateBps: 0,
      salesTaxIncluded: 0,
    };
    const r = ebayAdapter.calculate(input);
    render(<ComparisonResults results={[r]} />);
    expect(screen.getByText("eBay")).toBeTruthy();
    expect(screen.getByText("Best")).toBeTruthy();
  });
});