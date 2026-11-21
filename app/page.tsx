"use client";

import { useState } from "react";
import CalculatorInputs from "@/components/CalculatorInputs";
import MarketplaceSelector from "@/components/MarketplaceSelector";
import ComparisonResults from "@/components/ComparisonResults";
import FeeBreakdown from "@/components/FeeBreakdown";
import Disclaimer from "@/components/Disclaimer";
import { MoneyInput, MarketplaceResult } from "@/calculators/types";
import { MARKETPLACE_ADAPTERS } from "@/data/marketplaceRules";

export default function Home() {
  const [input, setInput] = useState<MoneyInput | null>(null);
  const [selected, setSelected] = useState<string[]>([
    "ebay",
    "poshmark",
    "mercari",
    "depop",
  ]);

  const results: MarketplaceResult[] = input
    ? selected
        .map((id) => MARKETPLACE_ADAPTERS.find((a) => a.id === id))
        .filter(Boolean)
        .map((a) => a!.calculate(input))
    : [];

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-3xl font-bold text-green-800">
          Reseller Profit & Marketplace Fee Calculator
        </h1>
        <p className="text-muted">
          Enter your item details once and compare estimated profit across
          marketplaces.
        </p>
      </header>
      <Disclaimer />
      <CalculatorInputs onChange={setInput} />
      <MarketplaceSelector selected={selected} onChange={setSelected} />
      {input && <ComparisonResults results={results} />}
      {input && (
        <div className="space-y-2">
          {results.map((r) => (
            <FeeBreakdown key={r.marketplaceId} result={r} />
          ))}
        </div>
      )}
    </div>
  );
}