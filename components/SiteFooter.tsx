import Link from "next/link";
import Image from "next/image";

const LINKS = [
  { href: "/about", label: "About" },
  { href: "/methodology", label: "Methodology" },
  { href: "/fee-sources", label: "Fee sources" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/contact", label: "Contact" },
];

export default function SiteFooter() {
  return (
    <footer className="mx-auto mt-12 max-w-6xl px-3 pb-8 sm:px-6">
      <div className="glass-card px-5 py-8 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-md">
            <div className="flex items-center gap-2.5">
              <Image src="/logo.png" alt="" width={28} height={28} className="rounded-md" />
              <span className="font-bold text-green-800">ResellerProfit</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Estimates only. Marketplace fees change. Not affiliated with eBay, Poshmark,
              Mercari, Depop, Etsy or Whatnot. Not financial, tax or legal advice.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="text-sm text-muted transition-colors hover:text-green-700">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-6 border-t border-border pt-4 text-xs text-muted">
          © {new Date().getFullYear()} Reseller Profit Calculator. All rights reserved.
          <br />
          Contact: <a href="mailto:hello@flipfee.online" className="text-green-700 underline">hello@flipfee.online</a>
        </div>
      </div>
    </footer>
  );
}