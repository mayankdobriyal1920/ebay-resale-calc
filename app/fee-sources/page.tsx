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
            {s.notes && <p className="mt-1 text-xs text-muted">{s.notes}</p>}
          </li>
        ))}
      </ul>

      <div className="glass-card overflow-x-auto p-5">
        <h2 className="text-lg font-semibold text-green-800">Fee verification log</h2>
        <table className="mt-3 w-full min-w-[640px] text-xs">
          <thead>
            <tr className="border-b border-border text-left text-muted">
              <th className="py-2 pr-3">Marketplace</th>
              <th className="py-2 pr-3">Status</th>
              <th className="py-2 pr-3">Last verified</th>
              <th className="py-2">Notes</th>
            </tr>
          </thead>
          <tbody>
            {FEE_SOURCES.map((s) => (
              <tr key={s.marketplaceId} className="border-b border-border/60">
                <td className="py-2 pr-3 font-medium">{s.marketplaceName}</td>
                <td className="py-2 pr-3">{s.lastVerifiedDate === "TBD" ? "Pending" : "Verified"}</td>
                <td className="py-2 pr-3">{s.lastVerifiedDate}</td>
                <td className="py-2">{s.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}