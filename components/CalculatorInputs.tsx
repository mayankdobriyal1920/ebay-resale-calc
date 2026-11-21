"use client";

import React, { useState } from "react";
import CurrencyInput from "./CurrencyInput";
import { parseNonNegativeCents, parsePositiveCents, parseBps } from "@/lib/validation";
import { MoneyInput } from "@/calculators/types";

export interface CalculatorInputsProps {
  onChange: (input: MoneyInput | null) => void;
}

export default function CalculatorInputs({ onChange }: CalculatorInputsProps) {
  const [itemCost, setItemCost] = useState("0");
  const [sellingPrice, setSellingPrice] = useState("25.00");
  const [buyerShipping, setBuyerShipping] = useState("0");
  const [sellerShipping, setSellerShipping] = useState("0");
  const [packaging, setPackaging] = useState("0");
  const [other, setOther] = useState("0");
  const [promoted, setPromoted] = useState("0");

  function emit() {
    const itemCostCents = parseNonNegativeCents(itemCost);
    const sellingPriceCents = parsePositiveCents(sellingPrice);
    const buyerShippingCents = parseNonNegativeCents(buyerShipping);
    const sellerShippingCents = parseNonNegativeCents(sellerShipping);
    const packagingCents = parseNonNegativeCents(packaging);
    const otherCents = parseNonNegativeCents(other);
    const promotedBps = parseBps(promoted);

    if (
      itemCostCents === null ||
      sellingPriceCents === null ||
      buyerShippingCents === null ||
      sellerShippingCents === null ||
      packagingCents === null ||
      otherCents === null ||
      promotedBps === null
    ) {
      onChange(null);
      return;
    }

    onChange({
      itemCost: itemCostCents,
      sellingPrice: sellingPriceCents,
      buyerShipping: buyerShippingCents,
      sellerShippingCost: sellerShippingCents,
      packagingCost: packagingCents,
      otherCost: otherCents,
      promotedRateBps: promotedBps,
      salesTaxIncluded: 0,
    });
  }

  // emit on every render-ish via effect-less manual: call emit in onChange handlers instead
  // We'll use a buttonless approach: recompute when fields change.
  React.useEffect(() => {
    emit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemCost, sellingPrice, buyerShipping, sellerShipping, packaging, other, promoted]);

  return (
    <section className="glass-card p-4">
      <h2 className="mb-3 text-lg font-semibold text-green-800">Inputs</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <CurrencyInput label="Item purchase cost" value={itemCost} onChange={setItemCost} />
        <CurrencyInput label="Expected selling price" value={sellingPrice} onChange={setSellingPrice} required />
        <CurrencyInput label="Buyer-paid shipping" value={buyerShipping} onChange={setBuyerShipping} hint="Shipping the buyer pays." />
        <CurrencyInput label="Your shipping / label cost" value={sellerShipping} onChange={setSellerShipping} hint="Your actual label cost." />
        <CurrencyInput label="Packaging cost" value={packaging} onChange={setPackaging} />
        <CurrencyInput label="Other per-order cost" value={other} onChange={setOther} />
      </div>
      <label className="mt-3 block">
        <span className="mb-1 block text-sm font-medium text-text">Promoted / boosted listing rate (%)</span>
        <input
          type="text"
          inputMode="decimal"
          value={promoted}
          onChange={(e) => setPromoted(e.target.value)}
          className="w-full rounded-lg border border-border bg-surface-strong px-3 py-2"
        />
      </label>
    </section>
  );
}