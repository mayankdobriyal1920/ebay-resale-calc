# Production Readiness Task List

Reseller Profit & Marketplace Fee Calculator (`ebay-resale-calc`).
Priority legend: **P0** = blocks launch, **P1** = required for quality launch, **P2** = polish / Phase 2.

Legend: `[ ]` not done, `[x]` done.

## A. Fee engine verification (P0)

- [x] P0 Verify eBay US seller-fee rules against official source; record exact policy URL + effective date + verification date
- [x] P0 Implement eBay adapter: category rates, final value fee, per-order fixed fee + order-value threshold, fee base (shipping/tax treatment)
- [x] P0 Add unit tests for eBay: zero order, min order, 1 cent below/at/above threshold, tiered, promotion on/off, buyer/seller shipping, tax included/excluded, negative profit, high-value, rounding edge
- [ ] P0 Verify Poshmark US fee rules; record source URL + verification date
- [ ] P0 Implement Poshmark adapter: sale-price threshold boundary (below/equal/above), fixed fee for lower-value, percentage fee for higher-value, seller-funded shipping discount
- [ ] P0 Add unit tests for Poshmark threshold boundary
- [ ] P0 Verify Mercari US fee rules; record source URL + verification date
- [ ] P0 Implement Mercari adapter: seller fee rate + fee base, shipping method/who pays, seller-paid label deductions; distinguish seller vs buyer fees
- [ ] P0 Add unit tests for Mercari
- [ ] P0 Verify Depop US fee rules (seller cohort / listing conditions); record source URL + verification date
- [ ] P0 Implement Depop adapter: selling fee status, payment-processing % + fixed, optional boost fee (not mandatory), shipping treatment
- [ ] P0 Add unit tests for Depop
- [x] P0 Add fee schedule version, effective date, last-verified date, source URL to each adapter
- [x] P0 Add "Incomplete estimate" handling when an important fee cannot be modeled
- [ ] P0 Remove "UNVERIFIED" state only after verification is complete

## B. Calculation model & money (P0)

- [x] P0 Money stored as integer cents (`calculators/money.ts`)
- [x] P0 Basic definitions: P, BS, T, C, LS, PK, O, F_i (`calculators/types.ts`)
- [x] P0 Net proceeds / net profit / margin / ROI formulas (`calculators/shared.ts`)
- [x] P0 ROI returns N/A when item cost is zero
- [x] P0 Profit margin denominator explicitly stated in UI
- [x] P0 Rounding convention documented and tested (one-cent edge cases)
- [x] P0 No floating-point arithmetic in final currency calculations (audit)
- [x] P0 Validation: reject negative, NaN, infinity; no silent conversion to zero; inline errors
- [x] P0 Recalculate immediately on valid input change
- [x] P0 Handle zero item cost, zero shipping, buyer/seller shipping, free shipping, negative/zero profit, promotion on/off, tax included/excluded, caps/mins

## C. Core UI (P0/P1)

- [x] P0 Currency input: `$` prefix, two-decimal formatting, decimals + keyboard
- [x] P0 Input labels explicit (buyer-paid vs seller shipping cost)
- [x] P0 Explain whether a field is included in fee base per marketplace
- [x] P0 Marketplace multi-select chips
- [x] P0 Comparison results cards/table with fees, net proceeds, net profit, margin
- [x] P0 Highlight highest estimated profit; tie handling
- [x] P0 Expandable fee breakdown: fee name, rate/fixed, base, formula, amount, included/excluded, source + verified date
- [x] P0 Mobile: stacked cards, no cramped table, 44px targets, no horizontal overflow at 320px
- [x] P0 Disclaimer component visible
- [x] P1 Reset action
- [x] P1 Local storage for last-used inputs/selection (optional, must work if disabled)
- [x] P1 Shareable URL encoding (Phase 2) (query params)
- [ ] P1 Copy / print / share comparison

## D. Marketplace pages & content (P1)

- [ ] P1 Each calculator page: fees included/excluded, fee bases, inputs, worked example, official source links, last-verified date, useful FAQs
- [ ] P1 No thin/duplicate pages; genuine platform-specific content
- [x] P1 Breadcrumbs + consistent navigation

## E. SEO (P1)

- [x] P1 Unique title + meta description per route
- [x] P1 One H1 per page
- [x] P1 Canonical URLs
- [x] P1 XML sitemap (verify URLs match production domain)
- [x] P1 robots.txt
- [x] P1 Open Graph metadata
- [x] P1 Descriptive internal links
- [x] P1 404 page
- [x] P1 Fast loading, stable layout (CLS)
- [x] P1 Replace `example.com` placeholder in sitemap/robots with real domain (flipfee.online)

## F. Accessibility (P1)

- [x] P1 WCAG 2.2 AA target
- [x] P1 Keyboard navigation for inputs/buttons/menus/disclosures
- [x] P1 Visible focus states
- [x] P1 Proper labels + semantic headings
- [x] P1 Don't convey profit/loss by color alone
- [x] P1 Screen-reader announcements for results (not every keystroke) (aria-live)
- [x] P1 Sufficient contrast over translucent surfaces
- [x] P1 Accessible error messages + field descriptions
- [x] P1 Reduced-motion support (already in CSS; verify)

## G. Design system (P1)

- [x] P1 Green glassmorphism tokens + glass-card CSS
- [x] P1 Solid fallback when backdrop-filter unsupported
- [x] P1 Tabular numerals for money
- [x] P1 No tiny caveat text
- [x] P1 Inter/Geist font loading optimized (next/font)

## H. Privacy, legal, trust (P0/P1)

- [x] P0 Privacy policy page (real content)
- [x] P0 Terms page (real content)
- [x] P0 About page (real content)
- [x] P0 Contact page (real method)
- [x] P0 How-we-calculate page (real methodology)
- [x] P0 Fee-sources page (real URLs + verified dates)
- [x] P0 Independence disclaimer (not affiliated)
- [x] P0 Brand protection: no marketplace logos, distinct branding
- [x] P1 Consent controls for advertising (if AdSense enabled) (cookie banner)
- [x] P1 Analytics without recording entered values (stub; no values sent)

## I. AdSense readiness (P2)

- [ ] P2 Fully working calculators
- [ ] P2 Useful original platform-specific content (partial)
- [x] P2 Clear navigation
- [x] P2 No broken routes
- [x] P2 ads.txt present
- [x] P2 AdSense client configured (env)
- [ ] P2 No excessive ads; ads not resembling controls
- [ ] P2 Monitor Core Web Vitals after ads enabled

## J. Quality assurance (P0/P1)

- [x] P0 Functional tests: component smoke + unit tests (inputs/validation/money/engine)
- [ ] P0 Financial calculation tests per marketplace (list in spec 13) (eBay done)
- [ ] P1 Cross-platform comparison tests with clear assumptions
- [ ] P1 Browser/device tests: Chrome/Safari/Firefox desktop, iOS Safari, Android Chrome; 320/375/768/1024/wide; keyboard-only; screen reader; reduced-motion; backdrop-filter fallback
- [x] P1 Performance: small client JS, no heavy chart libs, lazy-load (FAQ), optimize fonts/images, prevent layout shift (partial)

## K. Deployment (P0)

- [x] P0 Configure custom domain + HTTPS (flipfee.online, Vercel)
- [x] P0 Verify every route loads directly (not only via nav)
- [x] P0 Verify 404 behavior
- [ ] P0 Add Search Console property + submit sitemap
- [x] P0 Test canonical URLs
- [ ] P0 Test mobile layout on production domain (manual)
- [x] P0 Confirm no server endpoints / DB dependencies
- [x] P0 Verify privacy + advertising scripts (AdSense gated behind consent + env)
- [x] P0 Record fee-rule verification dates
- [x] P0 Keep rollback-ready deployment
- [x] P0 Replace placeholder domain in sitemap/robots (flipfee.online)

## L. Phase 2 (P2)

- [ ] P2 Etsy adapter + page
- [ ] P2 Whatnot adapter + page
- [ ] P2 Reverse target-profit calculator (numeric solver per marketplace)
- [ ] P2 Shareable URLs (query params, validated/clamped)
- [x] P2 Local storage preferences
- [ ] P2 Multiple quantities

## M. Repository hygiene

- [x] M Git repo initialized + pushed to origin
- [x] M Add LICENSE
- [x] M Add CONTRIBUTING / dev docs
- [x] M CI: typecheck + tests + build on PR