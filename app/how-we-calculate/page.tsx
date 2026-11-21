export default function HowWeCalculatePage() {
  return (
    <div className="glass-card px-6 py-8 sm:px-8">
      <h1 className="text-3xl font-extrabold tracking-tight text-green-900">How we calculate</h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-muted">
        All money is stored as integer cents to avoid floating-point drift. Each marketplace
        adapter defines its own fee base, rates, fixed fees and thresholds. Results are
        estimates; official marketplace policies take precedence.
      </p>
    </div>
  );
}