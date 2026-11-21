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
    </div>
  );
}