import { MarketplaceResult } from "@/calculators/types";
import { formatCurrency } from "@/lib/formatCurrency";

export default function FeeBreakdown({ result }: { result: MarketplaceResult }) {
  return (
    <details className="glass-card p-3">
      <summary className="cursor-pointer font-medium text-green-800">
        {result.marketplaceName} fee breakdown
      </summary>
      <table className="mt-2 w-full text-sm">
        <thead>
          <tr className="text-muted">
            <th className="text-left">Fee</th>
            <th className="text-right">Base</th>
            <th className="text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {result.feeLines.map((f, i) => (
            <tr key={i}>
              <td>{f.name}</td>
              <td className="text-right tabular-nums">{formatCurrency(f.baseCents)}</td>
              <td className="text-right tabular-nums">{formatCurrency(f.amountCents)}</td>
            </tr>
          ))}
          {result.feeLines.length === 0 && (
            <tr>
              <td colSpan={3} className="text-muted">No fees modeled.</td>
            </tr>
          )}
        </tbody>
      </table>
      <p className="mt-2 text-xs text-muted">Source: {result.sourceUrl}</p>
      <p className="text-xs text-muted">Last verified: {result.lastVerifiedDate}</p>
    </details>
  );
}