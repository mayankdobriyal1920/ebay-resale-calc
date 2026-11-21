"use client";

import { useState } from "react";
import CalculatorInputs from "@/components/CalculatorInputs";
import ComparisonResults from "@/components/ComparisonResults";
import FeeBreakdown from "@/components/FeeBreakdown";
import Disclaimer from "@/components/Disclaimer";
import { MoneyInput, MarketplaceResult } from "@/calculators/types";
import { mercariAdapter } from "@/calculators/mercari";

export default function MercariFeeCalculatorPage() {
  const [input, setInput] = useState<MoneyInput | null>(null);
  const results: MarketplaceResult[] = input ? [mercariAdapter.calculate(input)] : [];
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-green-800">Mercari Fee Calculator</h1>
      <p className="text-muted">Estimate Mercari selling fees and net profit.</p>
      <Disclaimer />
      <CalculatorInputs onChange={setInput} />
      {input && <ComparisonResults results={results} />}
      {input && results.map((r) => <FeeBreakdown key={r.marketplaceId} result={r} />)}
    </div>
  );
}