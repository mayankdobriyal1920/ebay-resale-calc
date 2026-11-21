import Link from "next/link";
import Image from "next/image";

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
    <header className="sticky top-0 z-30 px-3 pt-3 sm:px-6 sm:pt-4">
      <nav className="glass-card mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="Reseller Profit Calc logo" width={34} height={34} className="rounded-lg" />
          <span className="text-base font-bold tracking-tight text-green-800 sm:text-lg">
            Reseller<span className="text-green-600">Profit</span>
          </span>
        </Link>
        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-green-100/60 hover:text-green-800"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <details className="md:hidden">
          <summary className="cursor-pointer list-none rounded-lg bg-surface-strong px-3 py-2 text-sm font-medium text-green-800">
            Menu
          </summary>
          <ul className="absolute right-3 top-16 z-40 w-48 space-y-1 rounded-xl border border-border bg-white/95 p-2 shadow-xl backdrop-blur">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="block rounded-lg px-3 py-2 text-sm text-muted hover:bg-green-100/60 hover:text-green-800">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </details>
      </nav>
    </header>
  );
}