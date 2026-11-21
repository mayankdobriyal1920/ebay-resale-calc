"use client";

import { MarketplaceResult } from "@/calculators/types";
import { formatCurrency, formatPercent } from "@/lib/formatCurrency";

export interface ComparisonResultsProps {
  results: MarketplaceResult[];
}

export default function ComparisonResults({ results }: ComparisonResultsProps) {
  if (results.length === 0) {
    return <p className="text-muted">Select at least one marketplace.</p>;
  }

  // highest profit (tie handling: show tie if equal after rounding to cents)
  const maxProfit = Math.max(...results.map((r) => r.netProfitCents));
  const winners = results.filter((r) => r.netProfitCents === maxProfit);

  return (
    <section className="glass-card p-4">
      <h2 className="mb-3 text-lg font-semibold text-green-800">Comparison</h2>
      <div className="space-y-3">
        {results.map((r) => {
          const isWinner = winners.length === 1 && r.netProfitCents === maxProfit;
          const isTie = winners.length > 1 && r.netProfitCents === maxProfit;
          return (
            <article key={r.marketplaceId} className="rounded-lg border border-border bg-surface-strong p-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-text">{r.marketplaceName}</span>
                {isWinner && (
                  <span className="text-xs font-medium text-green-700">Highest estimated profit</span>
                )}
                {isTie && <span className="text-xs font-medium text-green-700">Tie</span>}
              </div>
              <dl className="mt-2 grid grid-cols-2 gap-1 text-sm">
                <dt className="text-muted">Total fees</dt>
                <dd className="text-right tabular-nums">{formatCurrency(r.totalFeesCents)}</dd>
                <dt className="text-muted">Net proceeds</dt>
                <dd className="text-right tabular-nums">{formatCurrency(r.netProceedsCents)}</dd>
                <dt className="text-muted">Net profit</dt>
                <dd className="text-right tabular-nums font-semibold">{formatCurrency(r.netProfitCents)}</dd>
                <dt className="text-muted">Margin</dt>
                <dd className="text-right tabular-nums">{formatPercent(r.profitMarginPercent)}</dd>
                <dt className="text-muted">ROI</dt>
                <dd className="text-right tabular-nums">{formatPercent(r.roiPercent)}</dd>
              </dl>
              {!r.isComplete && r.incompleteReason && (
                <p className="mt-2 text-xs text-warning">{r.incompleteReason}</p>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}