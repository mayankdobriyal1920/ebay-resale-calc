import { FEE_SOURCES } from "@/data/feeSources";

function statusColor(status: string): string {
  switch (status) {
    case "Verified":
      return "text-green-700";
    case "Partially verified":
      return "text-amber-700";
    case "Unverified":
      return "text-amber-700";
    case "Not implemented":
      return "text-muted";
    default:
      return "text-muted";
  }
}

export default function FeeSourcesPage() {
  return (
    <div className="space-y-4">
      <div className="glass-card px-6 py-8 sm:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-green-900">Fee sources</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Official US seller-fee documentation used as the source of truth. A source is marked
          “Verified” only after its relevant fee terms have been reviewed against the official
          marketplace documentation.
        </p>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2">
        {FEE_SOURCES.map((s) => (
          <li key={s.marketplaceId} className="glass-card p-5">
            <div className="flex items-start gap-2 mb-1">
              <p className="font-semibold text-green-800">{s.marketplaceName}</p>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full border ${statusColor(s.verificationStatus)}`}
                style={{ borderColor: "currentColor" }}
                title={s.verificationStatus}
              >
                {s.verificationStatus}
              </span>
            </div>
            <p className="text-xs text-muted mb-2">Country: {s.country}</p>
            <a
              href={s.url}
              className="block break-all text-sm text-green-700 underline"
              target="_blank"
              rel="noreferrer"
            >
              {s.url}
            </a>
            <p className="mt-2 text-xs text-muted">
              Last verified: {s.lastVerifiedDate}
            </p>
            <p className="mt-1 text-xs text-muted">{s.notes}</p>
            {s.exclusions.length > 0 && (
              <div className="mt-2">
                <p className="text-[10px] uppercase tracking-wider text-muted mb-1">Exclusions</p>
                <ul className="text-xs text-muted space-y-0.5 list-disc pl-3">
                  {s.exclusions.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              </div>
            )}
            {s.assumptions.length > 0 && (
              <div className="mt-2">
                <p className="text-[10px] uppercase tracking-wider text-muted mb-1">Assumptions</p>
                <ul className="text-xs text-muted space-y-0.5 list-disc pl-3">
                  {s.assumptions.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>

      <div className="glass-card overflow-x-auto p-5">
        <h2 className="text-lg font-semibold text-green-800">Fee verification log</h2>
        <table className="mt-3 w-full min-w-[640px] text-xs">
          <thead>
            <tr className="border-b border-border text-left text-muted">
              <th className="py-2 pr-3">Marketplace</th>
              <th className="py-2 pr-3">Country</th>
              <th className="py-2 pr-3">Status</th>
              <th className="py-2 pr-3">Last verified</th>
              <th className="py-2">Official source</th>
            </tr>
          </thead>
          <tbody>
            {FEE_SOURCES.map((s) => (
              <tr key={s.marketplaceId} className="border-b border-border/60">
                <td className="py-2 pr-3 font-medium">{s.marketplaceName}</td>
                <td className="py-2 pr-3">{s.country}</td>
                <td className="py-2 pr-3">{s.verificationStatus}</td>
                <td className="py-2 pr-3">{s.lastVerifiedDate}</td>
                <td className="py-2">
                  <a
                    href={s.url}
                    className="text-green-700 underline text-xs break-all"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View source
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}