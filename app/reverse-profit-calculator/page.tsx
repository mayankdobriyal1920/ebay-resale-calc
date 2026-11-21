"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import { solveReverseProfit } from "@/calculators/reverseProfit";
import { dollarsToCents, formatUsd } from "@/calculators/money";
import { formatCurrency } from "@/lib/formatCurrency";

export default function ReverseProfitCalculatorPage() {
  const [desired, setDesired] = useState("20.00");
  const [itemCost, setItemCost] = useState("5.00");
  const [sellerShipping, setSellerShipping] = useState("3.00");
  const [packaging, setPackaging] = useState("0");
  const [other, setOther] = useState("0");
  const [buyerShipping, setBuyerShipping] = useState("0");
  const [quantity, setQuantity] = useState("1");
  const [promoted, setPromoted] = useState("0");

  const result = solveReverseProfit({
    desiredProfitCents: dollarsToCents(desired || "0"),
    itemCostCents: dollarsToCents(itemCost || "0"),
    sellerShippingCostCents: dollarsToCents(sellerShipping || "0"),
    packagingCostCents: dollarsToCents(packaging || "0"),
    otherCostCents: dollarsToCents(other || "0"),
    marketplaceId: "ebay",
    quantity: Number.parseInt(quantity || "1", 10) || 1,
    promotedRateBps: Math.round(Number(promoted || "0") * 100),
    buyerShippingCents: dollarsToCents(buyerShipping || "0"),
    salesTaxIncludedCents: 0,
  });

  const field = (label: string, value: string, setter: (v: string) => void) => (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-text">{label}</span>
      <div className="flex items-center rounded-xl border border-border bg-white/80 px-3 shadow-sm">
        <span className="text-muted">$</span>
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => setter(e.target.value)}
          className="w-full bg-transparent px-2 py-2.5 outline-none"
        />
      </div>
    </label>
  );

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Reverse profit calculator" }]} />
      <section className="glass-card px-6 py-8 sm:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-green-900">Reverse profit calculator</h1>
        <p className="mt-3 max-w-2xl text-base text-muted">
          Find the minimum selling price needed to reach a target profit (eBay, most categories).
          Phase 2 — solves the actual fee equation per marketplace.
        </p>
      </section>
      <DisclaimerPlaceholder />
      <section className="glass-card p-5 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {field("Desired net profit", desired, setDesired)}
          {field("Item purchase cost", itemCost, setItemCost)}
          {field("Your shipping / label cost", sellerShipping, setSellerShipping)}
          {field("Packaging cost", packaging, setPackaging)}
          {field("Other per-order cost", other, setOther)}
          {field("Buyer-paid shipping", buyerShipping, setBuyerShipping)}
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-text">Quantity</span>
            <input
              type="text"
              inputMode="numeric"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="input-field"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-text">Promoted rate (%)</span>
            <input
              type="text"
              inputMode="decimal"
              value={promoted}
              onChange={(e) => setPromoted(e.target.value)}
              className="input-field"
            />
          </label>
        </div>
      </section>

      <section className="glass-card p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-green-800">Result</h2>
        {result.requiredPriceCents === null ? (
          <p className="mt-3 text-warning">{result.note}</p>
        ) : (
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-muted">Required selling price</dt><dd className="font-bold tabular-nums">{formatCurrency(result.requiredPriceCents)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">Estimated fees</dt><dd className="tabular-nums">{formatCurrency(result.estimatedFeesCents!)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">Estimated net proceeds</dt><dd className="tabular-nums">{formatCurrency(result.estimatedNetProceedsCents!)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted">Estimated profit</dt><dd className="font-semibold tabular-nums">{formatCurrency(result.estimatedProfitCents!)}</dd></div>
          </dl>
        )}
        <p className="mt-3 text-xs text-muted">{result.note}</p>
      </section>
    </div>
  );
}

function DisclaimerPlaceholder() {
  return (
    <aside className="glass-card flex items-start gap-3 border-amber-200/60 bg-amber-50/60 p-4 text-sm text-amber-900">
      <span aria-hidden className="text-lg">⚠️</span>
      <p>
        <strong>Estimates only.</strong> Marketplace fees change. Results depend on category,
        seller plan, location, shipping method, taxes and promotions. Official marketplace
        policies take precedence. Not financial, tax or legal advice.
      </p>
    </aside>
  );
}

void dollarsToCents; void formatUsd;