"use client";

import { useState } from "react";
import CalculatorInputs from "@/components/CalculatorInputs";
import ComparisonResults from "@/components/ComparisonResults";
import FeeBreakdown from "@/components/FeeBreakdown";
import Disclaimer from "@/components/Disclaimer";
import { MoneyInput, MarketplaceResult } from "@/calculators/types";
import { mercariAdapter } from "@/calculators/mercari";
import Breadcrumb from "@/components/Breadcrumb";

export default function MercariFeeCalculatorPage() {
  const [input, setInput] = useState<MoneyInput | null>(null);
  const results: MarketplaceResult[] = input ? [mercariAdapter.calculate(input)] : [];
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Mercari fee calculator" }]} />
      <section className="glass-card px-6 py-8 sm:px-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
          Mercari
        </span>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-green-900 sm:text-4xl">
          Mercari fee calculator
        </h1>
        <p className="mt-3 max-w-2xl text-base text-muted">
          Estimate Mercari selling fees, net proceeds and profit.
        </p>
      </section>
      <Disclaimer />
      <CalculatorInputs onChange={setInput} />
      {input && <ComparisonResults results={results} />}
      {input && results.map((r) => <FeeBreakdown key={r.marketplaceId} result={r} />)}

      <section className="glass-card px-6 py-8 sm:px-8">
        <h2 className="text-xl font-bold text-green-900">How Mercari fees work (US)</h2>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted">
          <p>
            Mercari charges a 10% selling fee on the item price plus buyer-paid shipping
            (for listings created/updated on or after 2025-01-06). The Buyer Protection
            fee (3.6%) is paid by the buyer and is not deducted from your proceeds. There
            is no separate payment processing fee for new/updated listings.
          </p>
          <h3 className="font-semibold text-text">Worked example</h3>
          <p>
            Sell an item for $25.00 with $5.00 buyer-paid shipping: fee base $30.00.
            Selling fee 10% = $3.00. Net proceeds $27.00. If you paid $5.00 for the item
            and $3.00 to ship, estimated profit ≈ $19.00.
          </p>
          <h3 className="font-semibold text-text">Frequently asked questions</h3>
          <details className="group">
            <summary className="cursor-pointer font-medium text-text">Are buyer-paid fees deducted from me?</summary>
            <p className="mt-1">No. The Buyer Protection fee (3.6%) is charged to the buyer and excluded from your proceeds.</p>
          </details>
          <details className="group">
            <summary className="cursor-pointer font-medium text-text">What about cancellation or authenticate fees?</summary>
            <p className="mt-1">Not modeled here. Cancellation (5%, max $25) and Authenticate fees are excluded.</p>
          </details>
          <p className="text-xs">Source: Mercari Help Center "Fees on Mercari". Last verified 2026-11-21.</p>
        </div>
      </section>
    </div>
  );
}