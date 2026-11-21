import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mx-4 mb-4 mt-10 rounded-card border border-border bg-surface-strong p-4 text-sm text-muted">
      <p>
        Results are estimates. Marketplace policies change. Not affiliated with
        eBay, Poshmark, Mercari, Depop, Etsy or Whatnot.
      </p>
      <nav className="mt-2 flex flex-wrap gap-3">
        <Link href="/about" className="hover:text-green-700">About</Link>
        <Link href="/how-we-calculate" className="hover:text-green-700">How we calculate</Link>
        <Link href="/fee-sources" className="hover:text-green-700">Fee sources</Link>
        <Link href="/privacy-policy" className="hover:text-green-700">Privacy</Link>
        <Link href="/terms" className="hover:text-green-700">Terms</Link>
        <Link href="/contact" className="hover:text-green-700">Contact</Link>
      </nav>
    </footer>
  );
}