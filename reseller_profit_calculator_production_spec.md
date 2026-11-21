# Reseller Profit & Marketplace Fee Calculator

## Production-ready product requirements, UX, calculation specification and launch checklist

**Product type:** Standalone, browser-only consumer / seller utility\
**Primary market:** United States\
**Hosting:** Vercel static deployment\
**Backend / database:** None\
**Monetization:** Google AdSense after policy and traffic eligibility
checks\
**Design direction:** Premium green marketplace aesthetic inspired by
eBay's green brand family, with glassmorphism\
**MVP target:** 1--3 days for a functional first release; full
production hardening and fee verification are separate launch gates.

> **Important production rule:** Marketplace fees, payment-processing
> charges, shipping programs, category rates, seller status discounts
> and promotional fees change. Never treat the example percentages in
> this document as permanent constants. Before launch, verify every rule
> against the marketplace's current official US seller-fee
> documentation, record the source URL and verification date, and make
> fee rules data-driven. This product provides estimates, not guaranteed
> settlement statements, tax advice or legal advice.

------------------------------------------------------------------------

# 1. Product vision

Build a fast, mobile-first tool that helps US resellers answer two
questions:

1.  **How much money will I keep if I sell this item on each
    marketplace?**
2.  **Where should I list it to maximize my estimated net profit?**

The core differentiator is a **side-by-side marketplace comparison**:
the user enters item cost, sale price and shipping assumptions once,
then sees estimated fees, net proceeds, profit and margin for supported
marketplaces.

The tool should be useful for thrift resellers, clothing sellers,
sneaker and electronics flippers, vintage sellers, handmade sellers and
casual marketplace sellers.

## Product promise

"Know your estimated profit before you list."

Do not promise exact payout amounts. Clearly disclose that estimates
depend on category, seller plan, location, shipping program, taxes,
promotions, refunds and marketplace policy changes.

## Non-goals for the first release

-   User accounts, authentication or profiles
-   Server, API routes, database or cloud storage
-   Marketplace account integrations or OAuth
-   Live fee retrieval or scraping
-   Receipt scanning / OCR
-   Inventory management or cross-listing
-   Automatic listing creation
-   Tax filing or income-tax estimation
-   Guaranteed payout or legal / accounting advice
-   Payment processing or paid subscriptions

------------------------------------------------------------------------

# 2. Target users and jobs to be done

  -----------------------------------------------------------------------
  User                                Main job
  ----------------------------------- -----------------------------------
  Thrift / clothing reseller          Check whether an item bought
                                      cheaply is worth listing

  eBay seller                         Estimate fees and net payout before
                                      publishing a listing

  Poshmark seller                     Understand the impact of the
                                      platform's fee structure and
                                      shipping discount

  Mercari seller                      Estimate seller proceeds and
                                      shipping deductions

  Etsy seller                         Include listing, transaction,
                                      payment processing and advertising
                                      fees

  Depop seller                        Compare standard selling with
                                      optional boosted listing costs

  Whatnot seller                      Estimate commission and
                                      payment-processing deductions

  Casual seller                       Compare platforms without learning
                                      every fee schedule
  -----------------------------------------------------------------------

Primary user flow:

1.  Open the homepage.
2.  Enter item cost, expected selling price and shipping details.
3.  Select the marketplaces to compare.
4.  Review estimated fee breakdown and net profit.
5.  Adjust optional costs / fee settings.
6.  Identify the best estimated result.
7.  Copy, print or share the comparison.

------------------------------------------------------------------------

# 3. Information architecture and routes

Use a single shared calculation engine and dedicated, useful landing
pages. Do not create thin pages that merely repeat the same calculator
with a different title.

## Recommended initial routes

  ------------------------------------------------------------------------------
  Route                          Purpose                 Release
  ------------------------------ ----------------------- -----------------------
  `/`                            Cross-platform          MVP
                                 comparison and main     
                                 tool                    

  `/ebay-fee-calculator`         eBay-specific fee       MVP
                                 estimator               

  `/poshmark-fee-calculator`     Poshmark-specific fee   MVP
                                 estimator               

  `/mercari-fee-calculator`      Mercari-specific fee    MVP
                                 estimator               

  `/depop-fee-calculator`        Depop-specific fee      MVP
                                 estimator               

  `/etsy-fee-calculator`         Etsy-specific fee       Phase 2
                                 estimator               

  `/whatnot-fee-calculator`      Whatnot-specific fee    Phase 2
                                 estimator               

  `/reverse-profit-calculator`   Find a price needed to  Phase 2
                                 reach a target profit   

  `/about`                       Product purpose and     Launch
                                 limitations             

  `/how-we-calculate`            Formula methodology and Launch
                                 assumptions             

  `/fee-sources`                 Official source links   Launch
                                 and last-verified dates 

  `/privacy-policy`              Privacy and advertising Launch
                                 disclosures             

  `/terms`                       Terms, limitations and  Launch
                                 disclaimers             

  `/contact`                     Contact method /        Launch
                                 feedback route          
  ------------------------------------------------------------------------------

Use canonical URLs, descriptive titles, breadcrumbs and a consistent
navigation system.

## Page-specific content requirement

Each calculator landing page must have genuinely platform-specific
information:

-   What fees are included
-   Which fees are excluded
-   Fee calculation basis
-   Inputs that affect that marketplace
-   A worked example
-   Official fee-source links
-   Last verified date
-   Common questions that are actually useful

Avoid generating 500--800 words of filler just to reach a word count.
Accuracy and usefulness matter more than a target word count.

------------------------------------------------------------------------

# 4. MVP feature scope

## 4.1 Core inputs

Required inputs:

  Field                                   Type       Validation
  --------------------------------------- ---------- ------------
  Item purchase cost                      Currency   \>= 0
  Expected selling price                  Currency   \> 0
  Buyer-paid shipping                     Currency   \>= 0
  Seller's actual shipping / label cost   Currency   \>= 0

Optional inputs:

  -----------------------------------------------------------------------
  Field                   Type                    Default
  ----------------------- ----------------------- -----------------------
  Packaging cost          Currency                \$0

  Other per-order cost    Currency                \$0

  Estimated sales tax     Currency or rate, based \$0 / not included
                          on fee rule             

  Promoted / boosted      Percentage              0%
  listing rate                                    

  Marketplace-specific    Select / toggle         Platform default
  options                                         

  Marketplace selection   Multi-select            All supported MVP
                                                  platforms
  -----------------------------------------------------------------------

### Input behavior

-   Currency is USD for the US launch.
-   Show `$` prefix and two-decimal formatting.
-   Accept decimals and keyboard input.
-   Reject negative values, NaN and infinity.
-   Do not silently convert invalid input to zero.
-   Show inline validation.
-   Recalculate immediately when valid input changes.
-   Keep the input labels explicit: buyer-paid shipping is not the same
    as the seller's shipping cost.
-   Explain whether a field is included in the fee base for each
    marketplace.

## 4.2 Results

For every selected marketplace, show:

-   Estimated sale amount / order amount
-   Marketplace fee
-   Payment-processing fee, if applicable
-   Listing fee, if applicable
-   Promotion / boost fee, if enabled
-   Shipping-label deduction, if applicable
-   Other included fees
-   Estimated net proceeds before item cost
-   Item purchase cost
-   Packaging and other costs
-   Actual shipping cost
-   **Estimated net profit**
-   **Profit margin**
-   **Return on investment (ROI)**

Use clear definitions:

-   **Net proceeds:** money remaining after modeled marketplace
    deductions, before the seller's item acquisition and operating
    costs.
-   **Net profit:** net proceeds less item cost, seller-paid shipping,
    packaging and other entered costs.
-   **Profit margin:** net profit divided by the selling revenue basis
    selected for the product. State the denominator in the UI.
-   **ROI:** net profit divided by item purchase cost. If item cost is
    zero, show "N/A".

Never label revenue or proceeds as profit.

## 4.3 Comparison table

Desktop:

  Marketplace     Fees   Net proceeds   Net profit   Margin 
  ------------- ------ -------------- ------------ -------- ----------------
  eBay             \$X            \$X          \$X       X% View breakdown
  Poshmark         \$X            \$X          \$X       X% View breakdown
  Mercari          \$X            \$X          \$X       X% View breakdown
  Depop            \$X            \$X          \$X       X% View breakdown

Mobile:

-   Render marketplace result cards, not a cramped horizontal table.
-   Put net profit and marketplace name first.
-   Keep detailed fee breakdown in an expandable section.
-   Do not hide critical caveats behind hover-only controls.

Highlight the highest estimated net profit with a green "Highest
estimated profit" indicator. If results are tied after currency
rounding, show a tie rather than arbitrarily selecting one.

## 4.4 Fee breakdown

Expandable per-marketplace detail:

-   Fee name
-   Fee rate or fixed amount
-   Fee base (exactly what amount the rate applies to)
-   Formula / arithmetic
-   Estimated amount
-   Included / excluded status
-   Source link and last-verified date

Users must be able to understand why marketplace results differ.

## 4.5 Reverse target-profit calculator (Phase 2)

Inputs:

-   Desired net profit
-   Item cost
-   Shipping cost
-   Packaging / other cost
-   Marketplace
-   Optional promotion rate
-   Buyer-paid shipping assumption

Output:

-   Required minimum selling price
-   Estimated fees at that price
-   Estimated net proceeds
-   Estimated profit
-   A clear note if no valid solution exists under the selected fee
    assumptions

Because percentage fees can apply to different bases and some fees are
fixed, solve the actual fee equation numerically or analytically per
marketplace. Do not simply divide the desired profit by (1 - fee rate)
if the fee base is more complex.

------------------------------------------------------------------------

# 5. Marketplace fee engine: rules and safety requirements

## Critical architecture

Do not hardcode marketplace fee rates in React components.

Use a platform adapter per marketplace. Each adapter must define:

-   Fee schedule version
-   Effective date
-   Last verified date
-   Official source URL(s)
-   Supported seller / category assumptions
-   Fee base for each charge
-   Fixed fees
-   Percentage fees
-   Minimum / maximum caps where applicable
-   Shipping treatment
-   Tax treatment
-   Optional fees
-   Unsupported conditions
-   Calculation function
-   Unit tests

## Fee rules must be verified before launch

The following are **research starting points, not production-approved
constants**. Re-check all values and fee bases against the official US
seller documentation on the day of release.

### eBay

Potential variables to model:

-   Product category
-   Store subscription / seller plan
-   Final value fee percentage and tier thresholds
-   Per-order fixed fee and order-value threshold
-   Fee base, including applicable shipping and sales tax treatment
-   Promoted Listings standard / advanced charges, if supported
-   Seller status discounts, only if documented and applicable
-   International or other optional charges, excluded from the US MVP
    unless specifically modeled

Do not apply one universal percentage to all eBay categories.

### Poshmark

Potential variables:

-   Sale price threshold
-   Fixed fee for lower-value orders
-   Percentage fee for higher-value orders
-   Seller-funded shipping discount
-   Any other seller charges documented in the current US policy

The threshold boundary must be tested exactly, including values
immediately below, equal to and above the threshold.

### Mercari

Potential variables:

-   Current seller fee rate and fee base
-   Shipping method and who pays
-   Seller-paid label deductions
-   Optional services / adjustments if relevant

Do not incorrectly deduct buyer-paid platform charges from seller
proceeds. Confirm the current US fee structure and distinguish seller
fees from buyer fees.

### Depop

Potential variables:

-   US selling fee status for the relevant seller cohort / listing
    conditions
-   Payment-processing percentage and fixed amount
-   Optional boosted listing fee
-   Shipping treatment
-   Applicable tax / processing fee base

Do not assume an optional boosting fee is mandatory.

### Etsy (Phase 2)

Potential variables:

-   Listing fee and renewal behavior
-   Transaction fee
-   Payment-processing fee and fee base
-   Offsite Ads rate and eligibility / cap rules
-   Currency conversion, regulatory operating fees and other charges
    (excluded unless modeled)
-   Shipping and tax treatment

A simple listing-level calculator should state whether it models one
listing and one sale or multiple quantities / renewals.

### Whatnot (Phase 2)

Potential variables:

-   Category-specific commission
-   Seller tier / sales-volume conditions if applicable
-   Payment-processing fee and fee base
-   Shipping and tax treatment
-   Other seller charges

Do not present one flat commission as universal if the official policy
defines exceptions.

## Source-of-truth process

For every marketplace:

1.  Find the official US seller-fee page.
2.  Confirm the page applies to US sellers.
3.  Read all fee-base definitions, thresholds and exceptions.
4.  Record the source URL, effective date (if published) and
    verification date.
5.  Implement only rules that can be modeled accurately.
6.  Add a note for unmodeled charges.
7.  Add unit tests for every threshold and fee formula.
8.  Recheck fees before every release that changes fee logic.

Never scrape marketplace websites or rely on third-party calculators as
the authoritative source.

## Unsupported / uncertain fee treatment

If a fee depends on a condition the calculator does not know:

-   Ask the user for the condition, or
-   Clearly exclude it and disclose the exclusion.

Do not invent a default that makes the estimate look more precise than
it is.

Use labels such as:

-   "Estimated --- category-specific rate not selected"
-   "Not included in this estimate"
-   "Requires seller-plan selection"
-   "Fee may vary by order conditions"

If an important fee cannot be modeled reliably, do not show a definitive
total for that marketplace. Show "Incomplete estimate" and explain why.

------------------------------------------------------------------------

# 6. Calculation model

All monetary arithmetic must use integer cents or a decimal-safe money
library. Do not use floating-point arithmetic for final currency
calculations.

## Basic definitions

Let:

-   `P` = item selling price
-   `BS` = buyer-paid shipping
-   `T` = sales tax included in a fee base, if applicable
-   `C` = item purchase cost
-   `LS` = seller's actual shipping / label cost
-   `PK` = packaging cost
-   `O` = other seller cost
-   `F_i` = each applicable platform fee

A platform adapter calculates the fee base for each fee independently:

`fee_i = fixed_fee_i + rate_i × fee_base_i`

This is illustrative. Actual adapters may require tiers, caps, minimums,
multiple fee components or order-specific rules.

Then:

`total_platform_fees = sum(all applicable fee_i)`

`net_proceeds = modeled_seller_revenue - total_platform_fees - seller_paid_platform_deductions`

`net_profit = net_proceeds - C - LS - PK - O`

The revenue basis must be explicitly defined per marketplace. Avoid
double-counting buyer-paid shipping or shipping labels.

## Rounding

-   Store money as integer cents.
-   Apply rounding at the same stage and method as the marketplace
    policy where documented.
-   If the official rounding behavior is unknown, disclose the
    calculator's rounding convention.
-   Display currency with two decimal places.
-   Do not round intermediate percentages to whole dollars.
-   Unit-test one-cent edge cases.

## Margin and ROI

`profit_margin = net_profit / stated_revenue_denominator × 100`

`ROI = net_profit / item_cost × 100`

If denominator is zero, show N/A. Clearly label the chosen revenue
denominator; do not mix sales price and order total without explanation.

## Important modeling cases

-   Zero item cost
-   Zero shipping
-   Buyer-paid shipping
-   Seller-paid shipping
-   Free shipping
-   Negative profit
-   Zero profit
-   Refund / cancellation (out of MVP unless explicitly modeled)
-   Promotion fee enabled / disabled
-   Threshold boundary values
-   High-value orders crossing tier thresholds
-   Tax included in fee base
-   Marketplace-specific fee minimums / caps
-   Multiple item quantities (future enhancement)

------------------------------------------------------------------------

# 7. Design system: green glassmorphism

## Visual direction

Premium, modern, trustworthy seller-finance tool. Use a green-led
palette inspired by the broad visual family of eBay's green branding,
but do not copy eBay's logo, exact brand assets or imply affiliation.

### Color tokens

  Token                Suggested value            Usage
  -------------------- -------------------------- ------------------------
  `--green-950`        `#063B2B`                  Deep background / text
  `--green-800`        `#075E45`                  Primary dark green
  `--green-700`        `#087F5B`                  Primary brand
  `--green-600`        `#0A9B68`                  Primary actions
  `--green-400`        `#4ADE9B`                  Accent
  `--green-100`        `#DDF8EA`                  Soft surfaces
  `--surface`          `rgba(255,255,255,0.72)`   Glass cards
  `--surface-strong`   `rgba(255,255,255,0.88)`   Forms / tables
  `--text`             `#10251D`                  Main text
  `--muted`            `#64756D`                  Secondary text
  `--border`           `rgba(8,95,67,0.14)`       Glass border
  `--danger`           `#C0392B`                  Loss / validation
  `--warning`          `#A16207`                  Caveats

### Background

-   Very light mint / off-white base.
-   Soft green radial gradients in corners.
-   Avoid excessive saturated green behind body text.
-   Provide a solid fallback when backdrop filters are unsupported.

### Glass surfaces

Suggested CSS:

``` css
.glass-card {
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.78);
  box-shadow:
    0 12px 36px rgba(5, 70, 45, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-radius: 20px;
}
```

Use glassmorphism for cards and navigation, not for every small element.
Ensure text contrast remains accessible.

### Typography

-   Use a clean sans-serif such as Inter, Geist or system UI.
-   Strong hierarchy: clear page title, concise subtitle, prominent
    input labels.
-   Use tabular numerals for monetary values.
-   Avoid tiny text for fee caveats.

### Components

-   Top navigation with logo mark, Tools dropdown / links, About and Fee
    Sources.
-   Hero with headline and short explanation.
-   Main input panel.
-   Marketplace selection chips / checkboxes.
-   Comparison result cards / table.
-   Highest-profit highlight.
-   Expandable fee breakdown.
-   Assumptions and fee-source disclosure.
-   How-it-works section.
-   FAQ.
-   Footer with policies and sources.

### Motion

-   Short, subtle transitions only.
-   Respect `prefers-reduced-motion`.
-   No parallax, animated counters that impair readability, or
    distracting moving gradients.
-   Results update immediately without jumpy layout shifts.

### Responsive behavior

-   Mobile-first.
-   Inputs one column on narrow screens.
-   Two columns on tablet where space allows.
-   Comparison table becomes stacked cards on mobile.
-   Minimum 44px interactive target size.
-   No horizontal overflow at 320px viewport width.

### Accessibility

-   WCAG 2.2 AA target.
-   Keyboard-accessible inputs, buttons, menus and disclosures.
-   Visible focus states.
-   Proper labels and semantic headings.
-   Do not communicate profit/loss by color alone.
-   Screen-reader announcement for updated results without announcing
    every keystroke excessively.
-   Sufficient contrast over translucent surfaces.
-   Accessible error messages and field descriptions.

------------------------------------------------------------------------

# 8. Technical architecture: no backend

## Recommended stack

-   Next.js App Router or Vite + React
-   TypeScript
-   Tailwind CSS or CSS Modules
-   Client-side calculation modules
-   Static generation / static export where feasible
-   Vercel hosting
-   No database
-   No server-side API routes
-   No user authentication
-   No third-party calculation API

For the strictest no-backend deployment, prefer a static site build. If
using Next.js, configure static export and avoid server-only features.

## Suggested project structure

``` text
src/
  app/
    page.tsx
    ebay-fee-calculator/
      page.tsx
    poshmark-fee-calculator/
      page.tsx
    mercari-fee-calculator/
      page.tsx
    depop-fee-calculator/
      page.tsx
    about/
      page.tsx
    how-we-calculate/
      page.tsx
    fee-sources/
      page.tsx
    privacy-policy/
      page.tsx
    terms/
      page.tsx
    contact/
      page.tsx

  components/
    SiteHeader.tsx
    SiteFooter.tsx
    CalculatorInputs.tsx
    MarketplaceSelector.tsx
    ComparisonResults.tsx
    MarketplaceResultCard.tsx
    FeeBreakdown.tsx
    CurrencyInput.tsx
    Disclaimer.tsx
    FAQ.tsx

  calculators/
    types.ts
    money.ts
    shared.ts
    ebay.ts
    poshmark.ts
    mercari.ts
    depop.ts
    etsy.ts
    whatnot.ts
    reverseProfit.ts

  data/
    marketplaceRules.ts
    feeSources.ts
    faq.ts

  lib/
    formatCurrency.ts
    validation.ts
    shareState.ts
    analytics.ts

  styles/
    globals.css

  tests/
    money.test.ts
    ebay.test.ts
    poshmark.test.ts
    mercari.test.ts
    depop.test.ts
    comparison.test.ts
```

## Browser storage

Optional local storage may be used for:

-   Last-used input values
-   Selected marketplaces
-   Display preferences

Requirements:

-   Do not store sensitive personal data.
-   Provide a "Reset" action.
-   Explain that saved preferences stay in the user's browser.
-   Do not rely on local storage for core functionality.
-   The tool must work if storage is unavailable or disabled.

## Shareable URLs

Optional Phase 2 feature:

-   Encode only non-sensitive input values in query parameters.
-   Never include personal or account information.
-   Validate and clamp all imported values.
-   Provide a clear "Reset values" action.
-   Do not put user-entered data into analytics events.

------------------------------------------------------------------------

# 9. SEO implementation

## Technical SEO

-   Unique title and meta description per route.
-   One descriptive H1 per page.
-   Canonical URL.
-   XML sitemap.
-   `robots.txt`.
-   Open Graph metadata.
-   Descriptive internal links.
-   Breadcrumb navigation.
-   Correct 404 page.
-   Fast loading and stable layout.
-   No duplicate or near-duplicate pages.
-   No keyword stuffing.
-   No fake reviews or ratings.
-   No fabricated testimonials.
-   No unsupported claims about exact savings.

## Content template for each marketplace page

1.  Short introduction explaining the exact seller problem.
2.  Calculator immediately visible near the top.
3.  Explanation of fees included.
4.  Explanation of fee bases.
5.  Worked example with assumptions.
6.  Breakdown of excluded fees.
7.  Link to official fee documentation.
8.  Last-verified date.
9.  FAQs that answer real user questions.
10. Links to relevant comparison tools.

## Keyword strategy

Research exact US keyword volume, trend, SERP layout and competition
before writing page titles.

Initial keyword themes:

-   reseller profit calculator
-   marketplace fee calculator
-   eBay fee calculator
-   eBay selling fees calculator
-   Poshmark fee calculator
-   Mercari seller fee calculator
-   Depop fee calculator
-   Etsy seller profit calculator
-   Whatnot seller fee calculator
-   selling price calculator
-   how much profit will I make selling
-   marketplace comparison calculator

Do not assume each phrase has significant volume. Validate each cluster
with current keyword data and manually inspect the live US search
results.

## Search intent differentiation

The homepage targets comparison intent. Individual pages target
platform-specific fee intent. The reverse calculator targets
target-price intent.

Do not create multiple URLs for the same intent merely by changing the
year or word order.

------------------------------------------------------------------------

# 10. AdSense and monetization readiness

## Before applying

-   Fully working calculators.
-   Useful, original platform-specific content.
-   Clear site navigation.
-   About, Contact, Privacy Policy and Terms pages.
-   No copied fee tables or competitor content.
-   No misleading earnings claims.
-   No broken routes or placeholder text.
-   No excessive ads.
-   Clear disclosure of estimates and limitations.
-   Comply with Google Publisher Policies and consent requirements
    applicable to the audience.

Approval is not guaranteed. A new site should not assume that simply
adding legal pages ensures AdSense approval.

## Ad placement principles

-   Never place ads so they resemble calculator controls.
-   Do not place ads immediately adjacent to buttons in a way that
    encourages accidental clicks.
-   Keep the primary calculator usable without scrolling through ads.
-   Avoid sticky mobile ads that obscure inputs or results.
-   Monitor Core Web Vitals after ads are enabled.
-   Do not encourage users to click ads.

## Monetization expectations

Do not forecast revenue from advertiser CPC alone. Track actual page
RPM, session RPM, viewability, geography and pageviews per session after
the site has meaningful traffic.

------------------------------------------------------------------------

# 11. Privacy, legal and trust requirements

The calculator should work without collecting or transmitting user
inputs.

Required disclosures:

-   Results are estimates.
-   Marketplace policies can change.
-   Actual fees may vary by category, seller plan, order, location,
    shipping method, taxes and promotions.
-   The tool is independent and is not affiliated with or endorsed by
    eBay, Poshmark, Mercari, Etsy, Depop or Whatnot.
-   Official marketplace policies take precedence.
-   No financial, tax, legal or accounting advice is provided.
-   Users should verify fees in their marketplace seller account before
    making business decisions.

Brand protection:

-   Do not use marketplace logos without permission.
-   Marketplace names may be used descriptively to identify
    compatibility.
-   Do not imitate eBay's exact logo or imply official partnership.
-   Use original branding and a distinct product name.

Privacy:

-   Do not transmit item cost, sale price or other calculator inputs.
-   If analytics is used, avoid recording entered values.
-   Disclose analytics, cookies and advertising technologies in the
    privacy policy.
-   Provide required consent controls for applicable jurisdictions and
    advertising products.
-   Do not claim "no data collected" if analytics or advertising scripts
    collect data.

------------------------------------------------------------------------

# 12. Analytics and measurement

Use privacy-conscious analytics only after documenting what is
collected.

Suggested events:

  Event                    Parameters
  ------------------------ ---------------------------------
  `calculator_used`        tool name only
  `marketplace_selected`   marketplace name
  `comparison_viewed`      number of marketplaces selected
  `fee_breakdown_opened`   marketplace name
  `share_clicked`          route only
  `reset_clicked`          route only

Never send item costs, sale prices, profit amounts or other entered
values to analytics.

Track:

-   Organic landing sessions
-   Search queries and impressions in Search Console
-   Calculator interaction rate
-   Results viewed
-   Returning visitors
-   Mobile vs desktop usage
-   Core Web Vitals
-   Ad RPM after monetization begins

------------------------------------------------------------------------

# 13. Quality assurance and test plan

## Functional tests

-   Every required input works.
-   Every optional input works.
-   Every marketplace can be selected / deselected.
-   Comparison updates when inputs change.
-   Highest-profit result is identified correctly.
-   Ties are handled.
-   Negative profit is displayed correctly.
-   Zero item cost does not cause division by zero.
-   Invalid values show helpful errors.
-   Reset returns all fields to documented defaults.
-   Mobile results remain readable.
-   Fee breakdown matches the calculation engine.

## Financial calculation tests

For each marketplace:

-   Zero-value order
-   Minimum supported order
-   One cent below fee threshold
-   Exactly at fee threshold
-   One cent above fee threshold
-   Percentage fee
-   Fixed fee
-   Tiered fee
-   Promotion off / on
-   Buyer-paid shipping
-   Seller-paid shipping
-   Sales tax included / excluded
-   Negative profit
-   High-value order
-   Currency rounding edge case

## Cross-platform tests

Use identical order assumptions only where the platforms use comparable
fee bases. If they do not, show each platform's assumptions clearly
rather than forcing identical fee treatment.

## Browser / device tests

-   Chrome desktop
-   Safari desktop
-   Firefox desktop
-   iOS Safari
-   Android Chrome
-   320px, 375px, 768px, 1024px and wide desktop layouts
-   Keyboard-only navigation
-   Screen reader spot checks
-   Reduced-motion setting
-   Backdrop-filter unsupported fallback

## Performance

-   Keep client JavaScript small.
-   Avoid loading large charting libraries for simple results.
-   Lazy-load non-critical content where useful.
-   Optimize fonts and images.
-   Prevent layout shift.
-   Target strong Lighthouse performance, accessibility and SEO scores,
    but do not treat a score as proof of quality.

------------------------------------------------------------------------

# 14. Deployment checklist for Vercel

1.  Create the project repository.
2.  Configure the static build.
3.  Add the custom domain.
4.  Configure HTTPS.
5.  Add a production build check.
6.  Verify every route loads directly, not only through homepage
    navigation.
7.  Verify 404 behavior.
8.  Add sitemap and robots file.
9.  Add Search Console property.
10. Submit sitemap.
11. Test canonical URLs.
12. Test mobile layout on production domain.
13. Confirm no server endpoints or database dependencies are required.
14. Verify privacy and advertising scripts.
15. Record fee-rule verification dates.
16. Keep a rollback-ready deployment.

------------------------------------------------------------------------

# 15. Release plan

## Day 1 --- Core product

-   Set up app and green glassmorphism design system.
-   Build navigation, homepage and input form.
-   Build money / currency utility using integer cents.
-   Implement fee-engine interface.
-   Implement and unit-test the first verified marketplace rules.
-   Build comparison result cards and fee breakdown.

## Day 2 --- Marketplace pages

-   Implement remaining MVP marketplace adapters.
-   Build platform-specific pages.
-   Add official fee-source references and last-verified dates.
-   Add validation, reset and responsive behavior.
-   Write methodology and disclaimer content.

## Day 3 --- Production hardening

-   Run financial boundary tests.
-   Test all routes and mobile layouts.
-   Add SEO metadata, sitemap and robots file.
-   Add About, Contact, Privacy and Terms.
-   Check accessibility and performance.
-   Deploy to Vercel.
-   Verify fee rules against official sources again.

**Important:** This schedule is for an MVP. If official fee rules are
ambiguous or cannot be verified, reduce the supported marketplace count
rather than shipping incorrect estimates.

------------------------------------------------------------------------

# 16. Launch acceptance criteria

The site is ready for public release only when:

-   [ ] All supported fee rules are verified against official US
    marketplace sources.
-   [ ] Each rule has a source URL and last-verified date.
-   [ ] Fee bases are modeled correctly.
-   [ ] Fixed fees and thresholds are tested.
-   [ ] Shipping and tax assumptions are explicit.
-   [ ] No marketplace is shown as a definitive result when important
    fees are unknown.
-   [ ] Money calculations use decimal-safe arithmetic / integer cents.
-   [ ] Cross-platform comparisons explain differences in assumptions.
-   [ ] The interface works on mobile.
-   [ ] Keyboard navigation and visible focus work.
-   [ ] Legal and privacy pages are present.
-   [ ] No unsupported affiliation is implied.
-   [ ] No user-entered financial values are sent to analytics.
-   [ ] All routes work directly in production.
-   [ ] Sitemap, robots and canonical URLs are correct.
-   [ ] No placeholder copy, fake data or broken links remain.
-   [ ] The tool works without accounts, backend or database.
-   [ ] Production fee verification is recorded.

------------------------------------------------------------------------

# 17. Recommended MVP scope

For the first release, prioritize:

1.  Homepage cross-platform comparison.
2.  eBay calculator.
3.  Poshmark calculator.
4.  Mercari calculator.
5.  Depop calculator.
6.  Fee breakdown and methodology.
7.  About, Contact, Privacy, Terms and Fee Sources pages.

Add Etsy, Whatnot and reverse target-profit mode only after the first
fee adapters are accurate and tested.

The most important launch principle is:

**A smaller calculator that models four marketplaces correctly is more
trustworthy and valuable than a calculator that claims to support seven
marketplaces but gets the fee bases wrong.**

------------------------------------------------------------------------

# 18. Official fee-source register

Use official US seller documentation as the source of truth. Confirm the
exact current page, applicable country, fee schedule and effective date
before launch.

  ------------------------------------------------------------------------------------------------------------------
  Marketplace                         Official source to verify
  ----------------------------------- ------------------------------------------------------------------------------
  eBay                                https://www.ebay.com/help/selling/fees-credits-invoices/selling-fees?id=4822

  Poshmark                            https://support.poshmark.com/

  Mercari                             https://www.mercari.com/us/help_center/

  Etsy                                https://www.etsy.com/legal/fees/

  Depop                               https://depophelp.zendesk.com/

  Whatnot                             https://help.whatnot.com/
  ------------------------------------------------------------------------------------------------------------------

Record the exact policy article URL rather than only a general
help-center homepage whenever possible.

## Fee verification log template

  --------------------------------------------------------------------------------
  Marketplace   Exact      Country    Effective   Verified   Verified   Test suite
                policy URL            date        date       by         
  ------------- ---------- ---------- ----------- ---------- ---------- ----------
  eBay          To         US         To verify   To verify  To         Pending
                complete                                     complete   

  Poshmark      To         US         To verify   To verify  To         Pending
                complete                                     complete   

  Mercari       To         US         To verify   To verify  To         Pending
                complete                                     complete   

  Depop         To         US         To verify   To verify  To         Pending
                complete                                     complete   

  Etsy          To         US         To verify   To verify  To         Pending
                complete                                     complete   

  Whatnot       To         US         To verify   To verify  To         Pending
                complete                                     complete   
  --------------------------------------------------------------------------------

------------------------------------------------------------------------

**Document status:** Production-oriented build specification. This is
not a claim that current marketplace fee rules have already been
independently certified or that the resulting website is automatically
compliant with every legal, tax, privacy or advertising requirement.
Complete the source verification log and acceptance checklist before
launch.
