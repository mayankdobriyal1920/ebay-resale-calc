export default function MethodologyPage() {
  return (
    <div className="glass-card px-6 py-8 sm:px-8">
      <h1 className="text-3xl font-extrabold tracking-tight text-green-900">Fee calculation methodology</h1>
      <div className="mt-4 max-w-4xl space-y-8 leading-relaxed text-muted">
        <section>
          <h2 className="text-xl font-bold text-green-900">How calculations work</h2>
          <ul className="list-disc space-y-3 pl-5 mt-2">
            <li>
              <span className="font-semibold text-green-800">Item cost:</span> What you paid to acquire the item. Subtracted from net proceeds to determine profit.
            </li>
            <li>
              <span className="font-semibold text-green-800">Selling price:</span> The amount the buyer pays for the item. This is the starting point for fee calculations.
            </li>
            <li>
              <span className="font-semibold text-green-800">Shipping paid by buyer:</span> Shipping amount collected from the buyer. Some marketplaces include this in the fee base; others do not.
            </li>
            <li>
              <span className="font-semibold text-green-800">Shipping paid by seller:</span> Your actual label/shipping cost. Subtracted from net proceeds.
            </li>
            <li>
              <span className="font-semibold text-green-800">Marketplace fees:</span> Percentage and fixed fees charged by the marketplace (final value fee, selling fee, commission, etc.).
            </li>
            <li>
              <span className="font-semibold text-green-800">Payment processing fees:</span> Fees for processing the buyer's payment. On some marketplaces these are included in the commission; on others they are separate.
            </li>
            <li>
              <span className="font-semibold text-green-800">Optional promotion/boosting fees:</span> Fees for promoted or boosted listings, applied only when enabled.
            </li>
            <li>
              <span className="font-semibold text-green-800">Estimated net proceeds:</span> Modeled revenue minus total platform fees, before your item and operating costs.
            </li>
            <li>
              <span className="font-semibold text-green-800">Estimated profit:</span> Net proceeds minus item cost, seller shipping, packaging, and other costs.
            </li>
            <li>
              <span className="font-semibold text-green-800">Profit margin:</span> Net profit ÷ order total (item price + buyer-paid shipping + modeled sales tax) × 100.
            </li>
            <li>
              <span className="font-semibold text-green-800">Return on investment (ROI):</span> Net profit ÷ item purchase cost × 100. Shows N/A when item cost is 0.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-green-900">Marketplace-specific explanations</h2>

          <div className="mt-4 space-y-6">
            <div className="glass-card p-5 rounded-2xl">
              <h3 className="text-lg font-bold text-green-900 mb-3">eBay (US, most categories, non-Store)</h3>
              <table className="w-full text-sm text-left border-collapse mb-3">
                <thead>
                  <tr className="border-b border-border text-muted">
                    <th className="py-2 pr-3">Item</th>
                    <th className="py-2 pr-3">Detail</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Fee percentage</td>
                    <td className="py-2 pr-3">13.6% on fee base up to $7,500; 2.35% on portion over $7,500 (per item)</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Fixed fee</td>
                    <td className="py-2 pr-3">$0.30 per order if order total ≤ $10.00; $0.40 per order if over $10.00</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Fee calculation base</td>
                    <td className="py-2 pr-3">Item price + buyer-paid shipping + sales tax</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Shipping included?</td>
                    <td className="py-2 pr-3">Yes — buyer-paid shipping is included in the fee base</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Sales tax included?</td>
                    <td className="py-2 pr-3">Yes — sales tax is included in the fee base (optional input)</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Optional charges</td>
                    <td className="py-2 pr-3">Promoted Listings (user-entered rate %)</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Excluded charges</td>
                    <td className="py-2 pr-3">Insertion fee (assumes within 250 free/month), Store subscriptions, category-specific rates, performance surcharges, international fees, dispute fees, currency conversion</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Official source</td>
                    <td className="py-2 pr-3"><a href="https://www.ebay.com/help/selling/fees-credits-invoices/fees-credits-invoices?id=4822" className="text-green-700 underline text-xs" target="_blank" rel="noreferrer">eBay selling fees</a></td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Last verified</td>
                    <td className="py-2 pr-3">2026-11-21</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="glass-card p-5 rounded-2xl">
              <h3 className="text-lg font-bold text-green-900 mb-3">Poshmark (US)</h3>
              <table className="w-full text-sm text-left border-collapse mb-3">
                <thead>
                  <tr className="border-b border-border text-muted">
                    <th className="py-2 pr-3">Item</th>
                    <th className="py-2 pr-3">Detail</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Fee percentage</td>
                    <td className="py-2 pr-3">20% commission on sales of $15.00 or more</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Fixed fee</td>
                    <td className="py-2 pr-3">$2.95 flat commission for sales under $15.00</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Fee calculation base</td>
                    <td className="py-2 pr-3">Sale price only</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Shipping included?</td>
                    <td className="py-2 pr-3">No — buyer-paid shipping goes to Poshmark for the prepaid label and is not part of sale proceeds</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Sales tax included?</td>
                    <td className="py-2 pr-3">No — not included in the commission calculation</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Optional charges</td>
                    <td className="py-2 pr-3">Seller-funded shipping discounts (not modeled)</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Excluded charges</td>
                    <td className="py-2 pr-3">Seller-funded shipping discounts, Texas state-specific charges, payment processing (included in commission), taxes on fees</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Official source</td>
                    <td className="py-2 pr-3"><a href="https://support.poshmark.com/s/article/297755057?language=en_US" className="text-green-700 underline text-xs" target="_blank" rel="noreferrer">Poshmark fee policy</a></td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Last verified</td>
                    <td className="py-2 pr-3">2026-11-21</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="glass-card p-5 rounded-2xl">
              <h3 className="text-lg font-bold text-green-900 mb-3">Mercari (US, listings created/updated on/after 2025-01-06)</h3>
              <table className="w-full text-sm text-left border-collapse mb-3">
                <thead>
                  <tr className="border-b border-border text-muted">
                    <th className="py-2 pr-3">Item</th>
                    <th className="py-2 pr-3">Detail</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Fee percentage</td>
                    <td className="py-2 pr-3">10% selling fee</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Fixed fee</td>
                    <td className="py-2 pr-3">None</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Fee calculation base</td>
                    <td className="py-2 pr-3">Item price + buyer-paid shipping</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Shipping included?</td>
                    <td className="py-2 pr-3">Yes — buyer-paid shipping is included in the fee base</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Sales tax included?</td>
                    <td className="py-2 pr-3">No — not included in the fee base</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Optional charges</td>
                    <td className="py-2 pr-3">Mercari Authenticate fees, Instant Pay fee ($3), cancellation fee (5%, max $25)</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Excluded charges</td>
                    <td className="py-2 pr-3">Buyer Protection fee (3.6% — buyer-paid, not deducted from seller), payment processing (none for new/updated listings), seller-paid label costs</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Official source</td>
                    <td className="py-2 pr-3"><a href="https://www.mercari.com/us/help_center/article/169/" className="text-green-700 underline text-xs" target="_blank" rel="noreferrer">Mercari seller fees</a></td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Last verified</td>
                    <td className="py-2 pr-3">2026-11-21</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="glass-card p-5 rounded-2xl">
              <h3 className="text-lg font-bold text-green-900 mb-3">Depop (US, Depop Payments)</h3>
              <table className="w-full text-sm text-left border-collapse mb-3">
                <thead>
                  <tr className="border-b border-border text-muted">
                    <th className="py-2 pr-3">Item</th>
                    <th className="py-2 pr-3">Detail</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Fee percentage</td>
                    <td className="py-2 pr-3">0% selling fee for US sellers; 3.3% payment processing; 12% boosted listing fee (opt-in)</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Fixed fee</td>
                    <td className="py-2 pr-3">$0.45 payment processing fixed fee</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Fee calculation base</td>
                    <td className="py-2 pr-3">Item price + buyer-paid shipping + sales tax (processing); item price + buyer-paid shipping (boost, excludes tax)</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Shipping included?</td>
                    <td className="py-2 pr-3">Yes — buyer-paid shipping included in processing fee base</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Sales tax included?</td>
                    <td className="py-2 pr-3">Yes — included in processing fee base (optional input)</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Optional charges</td>
                    <td className="py-2 pr-3">Boosted listings at 12% (opt-in, only when user enables promotion rate)</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Excluded charges</td>
                    <td className="py-2 pr-3">Sellers outside US/UK/AUS (10% selling fee + PayPal), international customs/VAT, PayPal fees for non-US sellers</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Official source</td>
                    <td className="py-2 pr-3"><a href="https://depophelp.zendesk.com/hc/en-gb/articles/360001791127-Seller-fees-and-charges" className="text-green-700 underline text-xs" target="_blank" rel="noreferrer">Depop seller fees and charges</a></td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Last verified</td>
                    <td className="py-2 pr-3">2026-11-21</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="glass-card p-5 rounded-2xl border-amber-200/60">
              <h3 className="text-lg font-bold text-green-900 mb-3">Etsy (Phase 2 — unverified)</h3>
              <p className="text-sm text-amber-800 mb-3">
                Etsy is a Phase 2 marketplace. Fee rules have <strong>not</strong> been verified against official Etsy documentation. The figures below are illustrative only and should not be relied upon.
              </p>
              <table className="w-full text-sm text-left border-collapse mb-3">
                <thead>
                  <tr className="border-b border-border text-muted">
                    <th className="py-2 pr-3">Item</th>
                    <th className="py-2 pr-3">Detail (illustrative only)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Fee percentage</td>
                    <td className="py-2 pr-3">6.5% transaction fee; 3% + $0.25 payment processing</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Fixed fee</td>
                    <td className="py-2 pr-3">$0.20 listing fee per listing (4 months); $0.25 processing fixed fee</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Fee calculation base</td>
                    <td className="py-2 pr-3">Item price + buyer-paid shipping</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Shipping included?</td>
                    <td className="py-2 pr-3">Yes — buyer-paid shipping included in fee base (illustrative)</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Sales tax included?</td>
                    <td className="py-2 pr-3">Not included (illustrative)</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Optional charges</td>
                    <td className="py-2 pr-3">Offsite Ads (12–15%, sales-volume dependent)</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Excluded charges</td>
                    <td className="py-2 pr-3">Currency conversion, regulatory operating fees, multiple quantities/renewals</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Official source</td>
                    <td className="py-2 pr-3"><a href="https://www.etsy.com/legal/fees/" className="text-green-700 underline text-xs" target="_blank" rel="noreferrer">Etsy fees</a></td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Last verified</td>
                    <td className="py-2 pr-3">TBD — unverified</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="glass-card p-5 rounded-2xl border-amber-200/60">
              <h3 className="text-lg font-bold text-green-900 mb-3">Whatnot (Phase 2 — unverified)</h3>
              <p className="text-sm text-amber-800 mb-3">
                Whatnot is a Phase 2 marketplace. Fee rules have <strong>not</strong> been verified against official Whatnot documentation. Commission varies by category and seller tier. The figures below are illustrative only.
              </p>
              <table className="w-full text-sm text-left border-collapse mb-3">
                <thead>
                  <tr className="border-b border-border text-muted">
                    <th className="py-2 pr-3">Item</th>
                    <th className="py-2 pr-3">Detail (illustrative only)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Fee percentage</td>
                    <td className="py-2 pr-3">Commission varies by category and seller tier (8% illustrative only)</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Fixed fee</td>
                    <td className="py-2 pr-3">Not specified (unverified)</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Fee calculation base</td>
                    <td className="py-2 pr-3">Item price + buyer-paid shipping (illustrative)</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Shipping included?</td>
                    <td className="py-2 pr-3">Unknown (unverified)</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Sales tax included?</td>
                    <td className="py-2 pr-3">Unknown (unverified)</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Optional charges</td>
                    <td className="py-2 pr-3">Unknown (unverified)</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Excluded charges</td>
                    <td className="py-2 pr-3">Category-specific rates, seller-tier conditions, payment-processing fee base</td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Official source</td>
                    <td className="py-2 pr-3"><a href="https://help.whatnot.com/hc/en-us/articles/4847069165965-Whatnot-seller-fees" className="text-green-700 underline text-xs" target="_blank" rel="noreferrer">Whatnot seller fees</a></td>
                  </tr>
                  <tr className="border-b border-border/60">
                    <td className="py-2 pr-3 font-medium">Last verified</td>
                    <td className="py-2 pr-3">TBD — unverified</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-green-900">Accuracy disclaimer</h2>
          <ul className="list-disc space-y-2 pl-5 mt-2">
            <li>Results are estimates, not guaranteed payouts.</li>
            <li>Actual fees may vary by seller account, category, listing date, location, shipping method, promotions, and marketplace policy changes.</li>
            <li>Marketplace policies can change at any time. Official marketplace policies always take precedence.</li>
            <li>Category-specific rates, Store subscriptions, and seller-tier variations are not modeled unless stated.</li>
            <li>Buyer-paid charges (e.g. Mercari Buyer Protection) are never deducted from seller proceeds.</li>
            <li>This tool is independent and is not affiliated with or endorsed by eBay, Poshmark, Mercari, Depop, Etsy, or Whatnot.</li>
            <li>No financial, tax, legal, or accounting advice is provided. Verify fees in your marketplace seller account before making business decisions.</li>
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