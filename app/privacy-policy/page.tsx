export default function PrivacyPolicyPage() {
  return (
    <div className="glass-card px-6 py-8 sm:px-8">
      <h1 className="text-3xl font-extrabold tracking-tight text-green-900">Privacy policy</h1>
      <div className="mt-4 max-w-2xl space-y-4 leading-relaxed text-muted">
        <p>
          This calculator runs entirely in your browser. Item costs, sale prices, shipping
          details and other inputs are not transmitted to any server and are not stored by us.
        </p>
        <p>
          Optional local storage may be used in your browser to remember your last-used inputs
          and selected marketplaces. You can clear this with the Reset button or your browser
          settings. We do not store sensitive personal data.
        </p>
        <p>
          If analytics or tag-management scripts (such as Google Tag Manager / Google AdSense) are enabled, they may
          collect technical data (device, browser, approximate location, page views, ad
          interactions) as described by those providers. Ad scripts load only after you accept
          cookies. We do not send your entered financial values to analytics or ads.
        </p>
        <p>
          We do not sell personal data. Contact us with privacy questions via the Contact page.
        </p>
      </div>
    </div>
  );
}