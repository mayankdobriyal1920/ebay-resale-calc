export default function AboutPage() {
  return (
    <div className="glass-card px-6 py-8 sm:px-8">
      <h1 className="text-3xl font-extrabold tracking-tight text-green-900">About</h1>
      <div className="mt-4 max-w-2xl space-y-4 leading-relaxed text-muted">
        <p>
          Reseller Profit Calculator helps US resellers estimate profit before listing. Enter
          your item cost, selling price and shipping once, then compare estimated fees, net
          proceeds, profit, margin and ROI across marketplaces side by side.
        </p>
        <p>
          It runs entirely in your browser: no accounts, no backend, no database, and your
          inputs are never transmitted. Fee rules are data-driven per marketplace and verified
          against official US seller documentation.
        </p>
        <p>
          Independent tool. Not affiliated with or endorsed by any marketplace.
        </p>
        <p>
          Contact us at{" "}
          <a href="mailto:hello@flipfee.online" className="text-green-700 underline">
            hello@flipfee.online
          </a>
        </p>
      </div>
    </div>
  );
}