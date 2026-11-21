"use client";

import { useState } from "react";
import CalculatorInputs from "@/components/CalculatorInputs";
import ComparisonResults from "@/components/ComparisonResults";
import FeeBreakdown from "@/components/FeeBreakdown";
import Disclaimer from "@/components/Disclaimer";
import { MoneyInput, MarketplaceResult } from "@/calculators/types";
import { etsyAdapter } from "@/calculators/etsy";
import Breadcrumb from "@/components/Breadcrumb";

export default function EtsyFeeCalculatorPage() {
  const [input, setInput] = useState<MoneyInput | null>(null);
  const results: MarketplaceResult[] = input ? [etsyAdapter.calculate(input)] : [];
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Etsy fee calculator" }]} />
      <section className="glass-card px-6 py-8 sm:px-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
          Etsy (Phase 2)
        </span>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-green-900 sm:text-4xl">
          Etsy fee calculator
        </h1>
        <p className="mt-3 max-w-2xl text-base text-muted">
          Estimate Etsy selling fees, net proceeds and profit. Phase 2 — fee rules not yet
          verified against official documentation.
        </p>
      </section>
      <Disclaimer />
      <CalculatorInputs onChange={setInput} />
      {input && <ComparisonResults results={results} />}
      {input && results.map((r) => <FeeBreakdown key={r.marketplaceId} result={r} />)}
    </div>
  );
}