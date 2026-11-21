import { FEE_SOURCES } from "@/data/feeSources";

export default function FeeSourcesPage() {
  return (
    <div className="space-y-4">
      <div className="glass-card px-6 py-8 sm:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-green-900">Fee sources</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Official US seller-fee documentation used as the source of truth.
        </p>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2">
        {FEE_SOURCES.map((s) => (
          <li key={s.marketplaceId} className="glass-card p-5">
            <p className="font-semibold text-green-800">{s.marketplaceName}</p>
            <a href={s.url} className="mt-1 block break-all text-sm text-green-700 underline" target="_blank" rel="noreferrer">
              {s.url}
            </a>
            <p className="mt-2 text-xs text-muted">Country: {s.country} · Last verified: {s.lastVerifiedDate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}