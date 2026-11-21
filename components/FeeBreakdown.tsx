import { MarketplaceResult } from "@/calculators/types";
import { formatCurrency } from "@/lib/formatCurrency";

export default function FeeBreakdown({ result }: { result: MarketplaceResult }) {
  return (
    <details className="glass-card group p-5">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
        <span className="font-semibold text-green-800">{result.marketplaceName} fee breakdown</span>
        <span className="text-xs text-muted transition group-open:rotate-180">▾</span>
      </summary>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[320px] text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted">
              <th className="py-2 pr-3">Fee</th>
              <th className="py-2 pr-3 text-right">Base</th>
              <th className="py-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {result.feeLines.map((f, i) => (
              <tr key={i} className="border-b border-border/60">
                <td className="py-2 pr-3">
                  <div className="font-medium">{f.name}</div>
                  <div className="text-xs text-muted">{f.rateLabel}{f.note ? ` · ${f.note}` : ""}</div>
                </td>
                <td className="py-2 pr-3 text-right tabular-nums">{formatCurrency(f.baseCents)}</td>
                <td className="py-2 text-right tabular-nums font-medium">{formatCurrency(f.amountCents)}</td>
              </tr>
            ))}
            {result.feeLines.length === 0 && (
              <tr>
                <td colSpan={3} className="py-3 text-center text-muted">No fees modeled yet.</td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr className="font-semibold">
              <td className="py-2 pr-3">Total fees</td>
              <td />
              <td className="py-2 text-right tabular-nums">{formatCurrency(result.totalFeesCents)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
        <span>Source: <a href={result.sourceUrl} target="_blank" rel="noreferrer" className="text-green-700 underline">{result.sourceUrl}</a></span>
        <span>Last verified: {result.lastVerifiedDate}</span>
      </div>
    </details>
  );
}