"use client";

import { useState } from "react";
import CalculatorInputs from "@/components/CalculatorInputs";
import ComparisonResults from "@/components/ComparisonResults";
import FeeBreakdown from "@/components/FeeBreakdown";
import Disclaimer from "@/components/Disclaimer";
import { MoneyInput, MarketplaceResult } from "@/calculators/types";
import { depopAdapter } from "@/calculators/depop";
import Breadcrumb from "@/components/Breadcrumb";

export default function DepopFeeCalculatorPage() {
  const [input, setInput] = useState<MoneyInput | null>(null);
  const results: MarketplaceResult[] = input ? [depopAdapter.calculate(input)] : [];
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Depop fee calculator" }]} />
      <section className="glass-card px-6 py-8 sm:px-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
          Depop
        </span>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-green-900 sm:text-4xl">
          Depop fee calculator
        </h1>
        <p className="mt-3 max-w-2xl text-base text-muted">
          Estimate Depop selling fees, net proceeds and profit.
        </p>
      </section>
      <Disclaimer />
      <CalculatorInputs onChange={setInput} />
      {input && <ComparisonResults results={results} />}
      {input && results.map((r) => <FeeBreakdown key={r.marketplaceId} result={r} />)}

      <section className="glass-card px-6 py-8 sm:px-8">
        <h2 className="text-xl font-bold text-green-900">About Depop fees</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Depop's US selling fee status depends on seller cohort and listing conditions, plus
          payment processing. Optional boosted listing fees are not mandatory. Exact rates are
          pending verification.
        </p>
      </section>
    </div>
  );
}