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
        <h2 className="text-xl font-bold text-green-900">How Poshmark fees work (US)</h2>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted">
          <p>
            Poshmark charges a commission based on the sale price: a flat $2.95 for sales
            under $15, and 20% for sales of $15 or more. Buyer-paid shipping goes to
            Poshmark for the prepaid label and is not part of your sale proceeds.
          </p>
          <h3 className="font-semibold text-text">Worked example</h3>
          <p>
            Sell an item for $25.00. Commission 20% = $5.00. Net proceeds $20.00. If you
            paid $5.00 for the item, estimated profit ≈ $15.00 (before packaging/other costs).
          </p>
          <p>
            Sell an item for $10.00. Flat commission $2.95. Net proceeds $7.05.
          </p>
          <h3 className="font-semibold text-text">Frequently asked questions</h3>
          <details className="group">
            <summary className="cursor-pointer font-medium text-text">Is shipping included in the fee base?</summary>
            <p className="mt-1">No. Poshmark's commission applies to the sale price; buyer-paid shipping pays for the label.</p>
          </details>
          <details className="group">
            <summary className="cursor-pointer font-medium text-text">What about seller-funded shipping discounts?</summary>
            <p className="mt-1">Not modeled here. If you offer a shipping discount, subtract it from proceeds manually.</p>
          </details>
          <p className="text-xs">Source: Poshmark Fee Policy. Last verified 2026-11-21.</p>
        </div>
      </section>
    </div>
  );
}