"use client";

import { useState } from "react";
import CalculatorInputs from "@/components/CalculatorInputs";
import ComparisonResults from "@/components/ComparisonResults";
import FeeBreakdown from "@/components/FeeBreakdown";
import Disclaimer from "@/components/Disclaimer";
import { MoneyInput, MarketplaceResult } from "@/calculators/types";
import { whatnotAdapter } from "@/calculators/whatnot";
import Breadcrumb from "@/components/Breadcrumb";

export default function WhatnotFeeCalculatorPage() {
  const [input, setInput] = useState<MoneyInput | null>(null);
  const results: MarketplaceResult[] = input ? [whatnotAdapter.calculate(input)] : [];
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Whatnot fee calculator" }]} />
      <section className="glass-card px-6 py-8 sm:px-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
          Whatnot (Phase 2 — unverified)
        </span>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-green-900 sm:text-4xl">
          Whatnot fee calculator
        </h1>
        <p className="mt-3 max-w-2xl text-base text-muted">
          Estimate Whatnot selling fees, net proceeds and profit. Phase 2 — fee rules not yet
          verified against official Whatnot documentation. Results shown are illustrative only.
        </p>
      </section>
      <Disclaimer />
      <CalculatorInputs onChange={setInput} />
      {input && <ComparisonResults results={results} />}
      {input && results.map((r) => <FeeBreakdown key={r.marketplaceId} result={r} />)}

      <section className="glass-card px-6 py-8 sm:px-8">
        <h2 className="text-xl font-bold text-green-900">How Whatnot fees work (US, illustrative)</h2>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted">
          <p>
            Whatnot charges a commission that varies by category. Commission rates, payment
            processing, and seller tier conditions differ. Boosted listings may carry
            additional costs.
          </p>
          <h3 className="font-semibold text-text">Worked example (illustrative)</h3>
          <p>
            Sell an item for $25.00 with $5.00 buyer-paid shipping. If commission is 8%:
            $30.00 × 8% = $2.40. Net proceeds ≈ $27.60 (before processing and shipping costs).
          </p>
          <h3 className="font-semibold text-text">Frequently asked questions</h3>
          <details className="group">
            <summary className="cursor-pointer font-medium text-text">Is commission the same for all categories?</summary>
            <p className="mt-1">No. Whatnot commission varies by category and seller tier. This estimate is illustrative only.</p>
          </details>
          <details className="group">
            <summary className="cursor-pointer font-medium text-text">Are boosted listings mandatory?</summary>
            <p className="mt-1">No. Boosting is optional. This calculator does not model boost fees until verified.</p>
          </details>
          <p className="text-xs">
            Source: Whatnot help center. Last verified: TBD (Phase 2 — not yet verified against official documentation).
          </p>
        </div>
      </section>
    </div>
  );
}