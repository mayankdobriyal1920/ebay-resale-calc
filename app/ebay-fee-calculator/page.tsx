"use client";

import { useState } from "react";
import CalculatorInputs from "@/components/CalculatorInputs";
import ComparisonResults from "@/components/ComparisonResults";
import FeeBreakdown from "@/components/FeeBreakdown";
import Disclaimer from "@/components/Disclaimer";
import { MoneyInput, MarketplaceResult } from "@/calculators/types";
import { ebayAdapter } from "@/calculators/ebay";
import Breadcrumb from "@/components/Breadcrumb";

export default function EbayFeeCalculatorPage() {
  const [input, setInput] = useState<MoneyInput | null>(null);
  const results: MarketplaceResult[] = input ? [ebayAdapter.calculate(input)] : [];
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "eBay fee calculator" }]} />
      <section className="glass-card px-6 py-8 sm:px-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
          eBay
        </span>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-green-900 sm:text-4xl">
          eBay fee calculator
        </h1>
        <p className="mt-3 max-w-2xl text-base text-muted">
          Estimate eBay selling fees, net proceeds and profit before you publish a listing.
        </p>
      </section>
      <Disclaimer />
      <CalculatorInputs onChange={setInput} />
      {input && <ComparisonResults results={results} />}
      {input && results.map((r) => <FeeBreakdown key={r.marketplaceId} result={r} />)}

      <section className="glass-card px-6 py-8 sm:px-8">
        <h2 className="text-xl font-bold text-green-900">How eBay fees work (US, most categories)</h2>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted">
          <p>
            eBay charges an insertion fee when you create a listing and a final value fee when
            your item sells. For most categories, the final value fee is 13.6% of the total
            amount of the sale up to $7,500, plus 2.35% on the portion over $7,500, plus a
            per-order fee ($0.30 if the order total is $10.00 or less, otherwise $0.40).
          </p>
          <p>
            The fee base (total amount of the sale) includes the item price, any handling
            charges, buyer-paid shipping, and sales tax. Store subscribers, category-specific
            rates, promoted listings, international fees, dispute fees and performance
            surcharges are not modeled here.
          </p>
          <h3 className="font-semibold text-text">Worked example</h3>
          <p>
            Sell an item for $25.00 with $5.00 buyer-paid shipping, no tax: fee base $30.00.
            Final value fee 13.6% = $4.08. Per-order fee $0.40. Total fees $4.48. If you paid
            $5.00 for the item and $3.00 to ship it, net profit ≈ $12.52.
          </p>
          <h3 className="font-semibold text-text">Frequently asked questions</h3>
          <details className="group">
            <summary className="cursor-pointer font-medium text-text">Are insertion fees included?</summary>
            <p className="mt-1">Assumed free (within the 250 zero-insertion-fee listings per month). $0.35 per listing after that is excluded.</p>
          </details>
          <details className="group">
            <summary className="cursor-pointer font-medium text-text">Does the per-order fee apply per item?</summary>
            <p className="mt-1">Per order: any number of items bought by the same buyer at checkout with the same shipping method.</p>
          </details>
          <p className="text-xs">
            Source: eBay Selling fees (US). Last verified 2026-11-21. Official policy takes precedence.
          </p>
        </div>
      </section>
    </div>
  );
}