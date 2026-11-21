export default function TermsPage() {
  return (
    <div className="glass-card px-6 py-8 sm:px-8">
      <h1 className="text-3xl font-extrabold tracking-tight text-green-900">Terms</h1>
      <div className="mt-4 max-w-2xl space-y-4 leading-relaxed text-muted">
        <p>
          Results are estimates only. Marketplace fees, policies and rates change and may vary
          by category, seller plan, order conditions, location, shipping method, taxes and
          promotions. Official marketplace policies always take precedence.
        </p>
        <p>
          This tool is provided "as is" without warranties. We are not affiliated with, endorsed
          by, or sponsored by eBay, Poshmark, Mercari, Depop, Etsy or Whatnot. Marketplace names
          are used descriptively to identify compatibility.
        </p>
        <p>
          No financial, tax, legal or accounting advice is provided. Verify fees in your
          marketplace seller account before making business decisions.
        </p>
        <p>
          By using this site you agree not to misuse it and to comply with applicable laws.
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