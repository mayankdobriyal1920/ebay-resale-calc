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
          Etsy (Phase 2 — unverified)
        </span>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-green-900 sm:text-4xl">
          Etsy fee calculator
        </h1>
        <p className="mt-3 max-w-2xl text-base text-muted">
          Estimate Etsy selling fees, net proceeds and profit. Phase 2 — fee rules not yet
          verified against official Etsy documentation. Results shown are illustrative only.
        </p>
      </section>
      <Disclaimer />
      <CalculatorInputs onChange={setInput} />
      {input && <ComparisonResults results={results} />}
      {input && results.map((r) => <FeeBreakdown key={r.marketplaceId} result={r} />)}

      <section className="glass-card px-6 py-8 sm:px-8">
        <h2 className="text-xl font-bold text-green-900">How Etsy fees work (US, illustrative)</h2>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted">
          <p>
            Etsy charges a $0.20 listing fee per listing (renews every 4 months), a 6.5%
            transaction fee on the sale price plus shipping, and payment processing of 3% +
            $0.25. Offsite Ads fees (12–15%) may apply depending on your sales volume.
          </p>
          <h3 className="font-semibold text-text">Worked example (illustrative)</h3>
          <p>
            Sell an item for $25.00 with $5.00 buyer-paid shipping: fee base $30.00.
            Transaction fee 6.5% = $1.95. Payment processing 3% + $0.25 = $1.15.
            Listing fee $0.20. Total fees ≈ $3.30 (before listing fee amortization).
          </p>
          <h3 className="font-semibold text-text">Frequently asked questions</h3>
          <details className="group">
            <summary className="cursor-pointer font-medium text-text">Is the listing fee per item?</summary>
            <p className="mt-1">The $0.20 listing fee is charged per listing, not per sale. It renews every 4 months.</p>
          </details>
          <details className="group">
            <summary className="cursor-pointer font-medium text-text">Are Offsite Ads included?</summary>
            <p className="mt-1">No. Offsite Ads (12–15%) depend on your sales volume and are excluded until verified.</p>
          </details>
          <p className="text-xs">
            Source: Etsy fees page. Last verified: TBD (Phase 2 — not yet verified against official documentation).
          </p>
        </div>
      </section>
    </div>
  );
}