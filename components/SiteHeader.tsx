import Link from "next/link";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/ebay-fee-calculator", label: "eBay" },
  { href: "/poshmark-fee-calculator", label: "Poshmark" },
  { href: "/mercari-fee-calculator", label: "Mercari" },
  { href: "/depop-fee-calculator", label: "Depop" },
  { href: "/fee-sources", label: "Fee sources" },
  { href: "/about", label: "About" },
];

export default function SiteHeader() {
  return (
    <header className="glass-card sticky top-0 z-30 mx-4 mt-4 px-4 py-3">
      <nav className="flex flex-wrap items-center gap-3 text-sm">
        <Link href="/" className="font-semibold text-green-800">
          Reseller Profit Calc
        </Link>
        <ul className="flex flex-wrap gap-3">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="text-muted hover:text-green-700">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}