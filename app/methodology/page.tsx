export default function MethodologyPage() {
  return (
    <div className="glass-card px-6 py-8 sm:px-8">
      <h1 className="text-3xl font-extrabold tracking-tight text-green-900">Fee calculation methodology</h1>
      <div className="mt-4 max-w-3xl space-y-6 leading-relaxed text-muted">
        <section>
          <h2 className="text-xl font-bold text-green-900">Money precision</h2>
          <p>
            All monetary values are stored as integer cents to avoid floating-point drift.
            Rates are applied using basis points (1 bps = 0.01%) and rounded half-up to the
            nearest cent at each fee-line stage. Cumulative rounding errors are avoided by
            rounding only after each individual fee calculation, not on intermediate values.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-green-900">Core formulas</h2>
          <ul className="list-disc space-y-2 pl-5 mt-2">
            <li>
              <span className="font-semibold text-green-800">Fee base:</span> The amount a
              percentage fee applies to. Each marketplace defines its own fee base — for
              example, eBay includes item price + buyer-paid shipping + sales tax, while
              Poshmark uses sale price only.
            </li>
            <li>
              <span className="font-semibold text-green-800">Platform fees:</span>
              sum of all applicable per-marketplace fees (final value fee, selling fee,
              payment processing, commission, boost fees, etc.).
            </li>
            <li>
              <span className="font-semibold text-green-800">Net proceeds:</span>
              modeled revenue − total platform fees (before item/operating costs).
            </li>
            <li>
              <span className="font-semibold text-green-800">Net profit:</span>
              net proceeds − item cost − seller shipping − packaging − other costs.
            </li>
            <li>
              <span className="font-semibold text-green-800">Profit margin:</span>
              net profit ÷ order total (item price + buyer-paid shipping + modeled tax) × 100.
            </li>
            <li>
              <span className="font-semibold text-green-800">ROI:</span>
              net profit ÷ item purchase cost × 100. Shows N/A when item cost is 0.
            </li>
            <li>
              <span className="font-semibold text-green-800">Break-even price:</span>
              minimum selling price where net profit = 0.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-green-900">Marketplace fee bases</h2>
          <table className="mt-3 w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b border-border text-muted">
                <th className="py-2 pr-3">Marketplace</th>
                <th className="py-2 pr-3">Fee base</th>
                <th className="py-2">Primary fees</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/60">
                <td className="py-2 pr-3 font-medium">eBay</td>
                <td className="py-2 pr-3">Item price + buyer-paid shipping + sales tax</td>
                <td className="py-2">Final value fee (tiered), per-order fee</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="py-2 pr-3 font-medium">Poshmark</td>
                <td className="py-2 pr-3">Sale price only</td>
                <td className="py-2">Commission (flat $2.95 or 20%)</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="py-2 pr-3 font-medium">Mercari</td>
                <td className="py-2 pr-3">Item price + buyer-paid shipping</td>
                <td className="py-2">Selling fee (10%)</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="py-2 pr-3 font-medium">Depop</td>
                <td className="py-2 pr-3">Item price + buyer-paid shipping + tax</td>
                <td className="py-2">Payment processing (3.3% + $0.45), optional boost (12%)</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section>
          <h2 className="text-xl font-bold text-green-900">Assumptions and limitations</h2>
          <ul className="list-disc space-y-2 pl-5 mt-2">
            <li>Results are estimates, not guaranteed payouts.</li>
            <li>Marketplace fees, policies and rates change without notice.</li>
            <li>Official marketplace policies always take precedence.</li>
            <li>Category-specific rates, Store subscriptions, and seller-tier variations are not modeled unless stated.</li>
            <li>Buyer-paid charges (e.g. Mercari Buyer Protection) are never deducted from seller proceeds.</li>
            <li>This tool is independent and is not affiliated with or endorsed by any marketplace.</li>
            <li>No financial, tax, legal or accounting advice is provided.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-green-900">Official policy references</h2>
          <ul className="list-disc space-y-2 pl-5 mt-2">
            <li>
              <a href="https://www.ebay.com/help/selling/fees-credits-invoices/fees-credits-invoices?id=4822" className="text-green-700 underline" target="_blank" rel="noreferrer">eBay selling fees (US)</a>
            </li>
            <li>
              <a href="https://support.poshmark.com/s/article/297755057?language=en_US" className="text-green-700 underline" target="_blank" rel="noreferrer">Poshmark fee policy (US)</a>
            </li>
            <li>
              <a href="https://www.mercari.com/us/help_center/article/169/" className="text-green-700 underline" target="_blank" rel="noreferrer">Mercari seller fees (US)</a>
            </li>
            <li>
              <a href="https://depophelp.zendesk.com/hc/en-gb/articles/360001791127-Seller-fees-and-charges" className="text-green-700 underline" target="_blank" rel="noreferrer">Depop seller fees and charges</a>
            </li>
            <li>
              <a href="https://www.etsy.com/legal/fees/" className="text-green-700 underline" target="_blank" rel="noreferrer">Etsy fees (Phase 2 — unverified)</a>
            </li>
            <li>
              <a href="https://help.whatnot.com/hc/en-us/articles/4847069165965-Whatnot-seller-fees" className="text-green-700 underline" target="_blank" rel="noreferrer">Whatnot seller fees (Phase 2 — unverified)</a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}