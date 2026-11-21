import { FEE_SOURCES } from "@/data/feeSources";

export default function FeeSourcesPage() {
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-bold text-green-800">Fee sources</h1>
      <p className="text-muted">
        Official US seller-fee documentation used as the source of truth.
      </p>
      <ul className="space-y-2">
        {FEE_SOURCES.map((s) => (
          <li key={s.marketplaceId} className="glass-card p-3">
            <p className="font-semibold">{s.marketplaceName}</p>
            <a href={s.url} className="text-green-700 underline" target="_blank" rel="noreferrer">
              {s.url}
            </a>
            <p className="text-xs text-muted">Country: {s.country} · Last verified: {s.lastVerifiedDate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}