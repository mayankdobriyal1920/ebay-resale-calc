export default function PrivacyPolicyPage() {
  return (
    <div className="glass-card px-6 py-8 sm:px-8">
      <h1 className="text-3xl font-extrabold tracking-tight text-green-900">Privacy policy</h1>
      <div className="mt-4 max-w-2xl space-y-6 leading-relaxed text-muted">
        <section>
          <h2 className="text-xl font-bold text-green-900">Browser-side processing</h2>
          <p>
            This calculator runs entirely in your browser. Item costs, sale prices, shipping
            details and other inputs are not transmitted to any server and are not stored by us.
            All calculations are performed locally using JavaScript.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-green-900">Local storage</h2>
          <p>
            Optional local storage may be used in your browser to remember your last-used inputs
            and selected marketplaces. You can clear this with the Reset button or your browser
            settings. We do not store sensitive personal data. The tool works if storage is
            unavailable or disabled.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-green-900">Analytics and advertising</h2>
          <p>
            Google Tag Manager and Google AdSense may load after you accept cookies via the
            consent banner. These services may collect technical data (device, browser,
            approximate location, page views, ad interactions) as described by their respective
            privacy policies. We do not send your entered financial values — item costs, sale
            prices, profit amounts — to analytics or advertising services.
          </p>
          <p>
            We do not sell personal data. We do not track you across other websites.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-green-900">Third-party links</h2>
          <p>
            This site links to official marketplace fee documentation (eBay, Poshmark, Mercari,
            Depop, Etsy, Whatnot). Those marketplaces have their own privacy policies and terms
            of service. We are not responsible for their privacy practices.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-green-900">Contact</h2>
          <p>
            Questions about this privacy policy can be sent via the Contact page.
          </p>
        </section>
      </div>
    </div>
  );
}