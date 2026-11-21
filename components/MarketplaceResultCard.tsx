import { MarketplaceResult } from "@/calculators/types";
import { formatCurrency } from "@/lib/formatCurrency";

export default function MarketplaceResultCard({ result }: { result: MarketplaceResult }) {
  return (
    <div className="rounded-lg border border-border bg-surface-strong p-3">
      <p className="font-semibold">{result.marketplaceName}</p>
      <p className="tabular-nums">{formatCurrency(result.netProfitCents)}</p>
    </div>
  );
}