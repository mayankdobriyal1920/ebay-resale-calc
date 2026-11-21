"use client";

import { useState } from "react";
import CalculatorInputs from "@/components/CalculatorInputs";
import ComparisonResults from "@/components/ComparisonResults";
import FeeBreakdown from "@/components/FeeBreakdown";
import Disclaimer from "@/components/Disclaimer";
import { MoneyInput, MarketplaceResult } from "@/calculators/types";
import { poshmarkAdapter } from "@/calculators/poshmark";
import Breadcrumb from "@/components/Breadcrumb";

export default function PoshmarkFeeCalculatorPage() {
  const [input, setInput] = useState<MoneyInput | null>(null);
  const results: MarketplaceResult[] = input ? [poshmarkAdapter.calculate(input)] : [];
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Poshmark fee calculator" }]} />
      <section className="glass-card px-6 py-8 sm:px-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
          Poshmark
        </span>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-green-900 sm:text-4xl">
          Poshmark fee calculator
        </h1>
        <p className="mt-3 max-w-2xl text-base text-muted">
          Estimate Poshmark selling fees, net proceeds and profit.
        </p>
      </section>
      <Disclaimer />
      <CalculatorInputs onChange={setInput} />
      {input && <ComparisonResults results={results} />}
      {input && results.map((r) => <FeeBreakdown key={r.marketplaceId} result={r} />)}

      <section className="glass-card px-6 py-8 sm:px-8">
        <h2 className="text-xl font-bold text-green-900">About Poshmark fees</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Poshmark uses a sale-price threshold: a flat fee for lower-value orders and a
          percentage fee for higher-value orders, plus an optional seller-funded shipping
          discount. Exact rates and the threshold are pending verification against the
          official Poshmark policy; this page shows an incomplete estimate until verified.
        </p>
      </section>
    </div>
  );
}