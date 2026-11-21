export default function HowWeCalculatePage() {
  return (
    <div className="glass-card px-6 py-8 sm:px-8">
      <h1 className="text-3xl font-extrabold tracking-tight text-green-900">How we calculate</h1>
      <div className="mt-4 max-w-2xl space-y-4 leading-relaxed text-muted">
        <p>
          All monetary values are stored as integer cents to avoid floating-point drift. Each
          marketplace uses its own adapter that defines the fee base, rates, fixed fees and
          thresholds.
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Net proceeds = modeled revenue − total platform fees (before item/operating costs).</li>
          <li>Net profit = net proceeds − item cost − seller shipping − packaging − other costs.</li>
          <li>Margin = net profit ÷ order total (item price + buyer-paid shipping + modeled tax).</li>
          <li>ROI = net profit ÷ item cost (N/A when item cost is 0).</li>
        </ul>
        <p>
          Rounding uses standard half-up to the nearest cent at the fee-line stage, matching
          marketplace policy where documented; otherwise the convention is disclosed per
          marketplace.
        </p>
      </div>
    </div>
  );
}