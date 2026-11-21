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
        <h2 className="text-xl font-bold text-green-900">How Depop fees work (US)</h2>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted">
          <p>
            US sellers pay no Depop selling fee. A payment processing fee of 3.3% + $0.45
            applies to the item price + shipping + tax (Depop Payments via Stripe). Boosted
            listings are opt-in at 12% of the item price (+ shipping if you don't use a
            Depop shipping label).
          </p>
          <h3 className="font-semibold text-text">Worked example</h3>
          <p>
            Sell an item for $25.00 with $5.00 buyer-paid shipping: processing base $30.00.
            Processing fee 3.3% + $0.45 ≈ $1.44. Net proceeds ≈ $28.56 (no selling fee).
          </p>
          <h3 className="font-semibold text-text">Frequently asked questions</h3>
          <details className="group">
            <summary className="cursor-pointer font-medium text-text">Is there a selling fee?</summary>
            <p className="mt-1">No Depop selling fee for US/UK/AUS sellers. Only payment processing applies.</p>
          </details>
          <details className="group">
            <summary className="cursor-pointer font-medium text-text">How does boosting work?</summary>
            <p className="mt-1">Opt-in boosted listings charge 12% on the item price (+ shipping if not using a Depop label).</p>
          </details>
          <p className="text-xs">Source: Depop Help Center "Seller fees and charges". Last verified 2026-11-21.</p>
        </div>
      </section>
    </div>
  );
}