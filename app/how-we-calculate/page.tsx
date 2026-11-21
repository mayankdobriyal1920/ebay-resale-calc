export default function HowWeCalculatePage() {
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-bold text-green-800">How we calculate</h1>
      <p className="text-muted">
        All money is stored as integer cents. Each marketplace adapter defines
        its own fee base, rates, fixed fees and thresholds. Results are
        estimates.
      </p>
    </div>
  );
}