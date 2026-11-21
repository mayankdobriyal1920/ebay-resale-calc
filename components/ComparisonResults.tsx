"use client";

import { MarketplaceResult } from "@/calculators/types";
import { formatCurrency, formatPercent } from "@/lib/formatCurrency";

export interface ComparisonResultsProps {
  results: MarketplaceResult[];
}

export default function ComparisonResults({ results }: ComparisonResultsProps) {
  if (results.length === 0) {
    return (
      <div className="glass-card p-6 text-center text-muted">
        Select at least one marketplace to compare.
      </div>
    );
  }

  const maxProfit = Math.max(...results.map((r) => r.netProfitCents));
  const winners = results.filter((r) => r.netProfitCents === maxProfit);

  const summary = results.map((r) => `${r.marketplaceName}: ${formatCurrency(r.netProfitCents)} profit`).join("; ");

  return (
    <section className="space-y-4" aria-live="polite" aria-atomic="true">
      <span className="sr-only">{summary}</span>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-green-800">Results</h2>
        <span className="text-xs text-muted">Estimated values</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((r) => {
          const isWinner = winners.length === 1 && r.netProfitCents === maxProfit;
          const isTie = winners.length > 1 && r.netProfitCents === maxProfit;
          return (
            <article
              key={r.marketplaceId}
              className={`relative overflow-hidden rounded-2xl border bg-white/80 p-5 shadow-sm backdrop-blur transition ${
                isWinner
                  ? "border-green-500/60 ring-2 ring-green-500/30"
                  : "border-border"
              }`}
            >
              {isWinner && (
                <span className="absolute right-3 top-3 rounded-full bg-gradient-to-r from-green-600 to-green-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow">
                  Best
                </span>
              )}
              {isTie && (
                <span className="absolute right-3 top-3 rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-green-800">
                  Tie
                </span>
              )}
              <h3 className="text-base font-semibold text-green-800">{r.marketplaceName}</h3>
              <div className="mt-3">
                <p className="text-xs uppercase tracking-wide text-muted">Net profit</p>
                <p className="mt-0.5 text-3xl font-bold tabular-nums text-text">
                  {formatCurrency(r.netProfitCents)}
                </p>
              </div>
              <dl className="mt-4 space-y-1.5 text-sm">
                <Row label="Total fees" value={formatCurrency(r.totalFeesCents)} />
                <Row label="Net proceeds" value={formatCurrency(r.netProceedsCents)} />
                <Row label="Margin" value={formatPercent(r.profitMarginPercent)} />
                <Row label="ROI" value={formatPercent(r.roiPercent)} />
              </dl>
              {!r.isComplete && r.incompleteReason && (
                <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-warning">
                  {r.incompleteReason}
                </p>
              )}
            </article>
          );
        })}
      </div>
      <p className="text-xs text-muted">
        Margin = net profit ÷ order total (item price + buyer-paid shipping + modeled tax). ROI = net profit ÷ item cost.
      </p>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-muted">{label}</dt>
      <dd className="font-medium tabular-nums">{value}</dd>
    </div>
  );
}