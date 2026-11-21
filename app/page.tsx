"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import CalculatorInputs from "@/components/CalculatorInputs";
import MarketplaceSelector from "@/components/MarketplaceSelector";
import ComparisonResults from "@/components/ComparisonResults";
import FeeBreakdown from "@/components/FeeBreakdown";
import Disclaimer from "@/components/Disclaimer";
import Breadcrumb from "@/components/Breadcrumb";
import { MoneyInput, MarketplaceResult } from "@/calculators/types";
import { MARKETPLACE_ADAPTERS } from "@/data/marketplaceRules";
import { decodeStateFromQuery, encodeStateToQuery } from "@/lib/shareState";

const FAQ = dynamic(() => import("@/components/FAQ"), { ssr: false });

export default function Home() {
  const [input, setInput] = useState<MoneyInput | null>(null);
  const [initial, setInitial] = useState<MoneyInput | null>(null);
  const [selected, setSelected] = useState<string[]>(["ebay", "poshmark", "mercari", "depop"]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const decoded = decodeStateFromQuery(window.location.search);
    if (decoded) {
      setInitial(decoded);
      setInput(decoded);
    }
  }, []);

  const results: MarketplaceResult[] = input
    ? selected
        .map((id) => MARKETPLACE_ADAPTERS.find((a) => a.id === id))
        .filter(Boolean)
        .map((a) => a!.calculate(input))
    : [];

  function share() {
    if (!input || typeof window === "undefined") return;
    const url = `${window.location.origin}${window.location.pathname}?${encodeStateToQuery(input)}`;
    navigator.clipboard?.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Home" }]} />
      <section className="glass-card relative overflow-hidden px-6 py-8 sm:px-10 sm:py-12">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-green-400/30 blur-3xl" />
        <div className="absolute -bottom-12 -left-12 h-44 w-44 rounded-full bg-green-600/20 blur-3xl" />
        <div className="relative max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
            🌿 Free · No signup · Browser-only
          </span>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-green-900 sm:text-5xl">
            Know your estimated profit <span className="text-green-600">before you list.</span>
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            Enter your item cost, selling price and shipping once. Compare estimated fees,
            net proceeds and profit across eBay, Poshmark, Mercari and Depop — side by side.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-muted">
            <span className="rounded-full bg-white/70 px-3 py-1.5">✓ Integer-cents math</span>
            <span className="rounded-full bg-white/70 px-3 py-1.5">✓ No data sent</span>
            <span className="rounded-full bg-white/70 px-3 py-1.5">✓ Mobile-first</span>
          </div>
        </div>
      </section>

      <Disclaimer />
      <CalculatorInputs onChange={setInput} initial={initial} />
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => window.print()}
          disabled={!input}
          className="rounded-lg border border-border bg-white/70 px-4 py-2 text-sm font-medium text-muted transition hover:bg-green-100/60 hover:text-green-800 disabled:opacity-50"
        >
          Print
        </button>
        <button
          type="button"
          onClick={share}
          disabled={!input}
          className="rounded-lg border border-border bg-white/70 px-4 py-2 text-sm font-medium text-muted transition hover:bg-green-100/60 hover:text-green-800 disabled:opacity-50"
        >
          {copied ? "Link copied" : "Share comparison"}
        </button>
      </div>
      <MarketplaceSelector selected={selected} onChange={setSelected} />
      {input && <ComparisonResults results={results} />}
      {input && (
        <div className="space-y-3">
          {results.map((r) => (
            <FeeBreakdown key={r.marketplaceId} result={r} />
          ))}
        </div>
      )}
      <FAQ />

      <section className="glass-card px-6 py-8 sm:px-8">
        <h2 className="text-2xl font-bold text-green-900">How it works</h2>
        <ol className="mt-4 max-w-3xl space-y-3 text-muted leading-relaxed">
          <li>
            <span className="font-semibold text-green-800">Enter your item details.</span>
            Provide the item purchase cost, expected selling price, buyer-paid shipping, and
            your shipping/label cost.
          </li>
          <li>
            <span className="font-semibold text-green-800">Pick marketplaces.</span>
            Select eBay, Poshmark, Mercari, and/or Depop to compare side by side.
          </li>
          <li>
            <span className="font-semibold text-green-800">Review estimated profit.</span>
            See each marketplace’s fees, net proceeds, net profit, margin, and ROI — with a
            fee breakdown you can expand.
          </li>
          <li>
            <span className="font-semibold text-green-800">List where you keep more.</span>
            Choose the marketplace with the highest estimated net profit for your item.
          </li>
        </ol>
      </section>

      <section className="glass-card px-6 py-8 sm:px-8">
        <h2 className="text-2xl font-bold text-green-900">What fees are included</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 text-muted leading-relaxed">
          <div>
            <h3 className="font-semibold text-green-800 mb-2">eBay</h3>
            <p className="text-sm">
              Final value fee (13.6% up to $7,500 + 2.35% over) plus a per-order fee
              ($0.30 / $0.40). Fee base includes item price, buyer-paid shipping, and sales tax.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-green-800 mb-2">Poshmark</h3>
            <p className="text-sm">
              Flat $2.95 commission for sales under $15; 20% commission for sales of $15 or
              more. Buyer-paid shipping goes to Poshmark for the label.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-green-800 mb-2">Mercari</h3>
            <p className="text-sm">
              10% selling fee on item price plus buyer-paid shipping (listings created/updated
              on or after 2025-01-06). Buyer Protection fee (3.6%) is paid by the buyer.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-green-800 mb-2">Depop</h3>
            <p className="text-sm">
              No Depop selling fee for US sellers. Payment processing 3.3% + $0.45 on item
              price + shipping + tax. Optional boosted listings at 12%.
            </p>
          </div>
        </div>
      </section>

      <section className="glass-card px-6 py-8 sm:px-8">
        <h2 className="text-2xl font-bold text-green-900">Important notes</h2>
        <ul className="mt-4 space-y-2 text-muted leading-relaxed list-disc pl-5">
          <li>Results are estimates, not guaranteed payouts. Actual fees vary by category, seller plan, location, shipping method, taxes, and promotions.</li>
          <li>Marketplace policies change. Official marketplace policies always take precedence.</li>
          <li>This tool is independent and is not affiliated with or endorsed by eBay, Poshmark, Mercari, Depop, Etsy, or Whatnot.</li>
          <li>No financial, tax, legal, or accounting advice is provided. Verify fees in your seller account before making business decisions.</li>
          <li>Your inputs stay in your browser. No user-entered financial values are transmitted.</li>
        </ul>
      </section>
    </div>
  );
}