"use client";

import React, { useState, useEffect } from "react";
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

  useEffect(() => {
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
  }, [itemCost, sellingPrice, buyerShipping, sellerShipping, packaging, other, promoted, onChange]);

  return (
    <section className="glass-card p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-green-800">Item details</h2>
        <span className="text-xs text-muted">USD</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <CurrencyInput label="Item purchase cost" value={itemCost} onChange={setItemCost} hint="What you paid for the item." />
        <CurrencyInput label="Expected selling price" value={sellingPrice} onChange={setSellingPrice} required hint="Listed sale price." />
        <CurrencyInput label="Buyer-paid shipping" value={buyerShipping} onChange={setBuyerShipping} hint="Shipping the buyer pays." />
        <CurrencyInput label="Your shipping / label cost" value={sellerShipping} onChange={setSellerShipping} hint="Your actual label cost." />
        <CurrencyInput label="Packaging cost" value={packaging} onChange={setPackaging} />
        <CurrencyInput label="Other per-order cost" value={other} onChange={setOther} />
      </div>
      <div className="mt-4">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-text">Promoted / boosted listing rate (%)</span>
          <input
            type="text"
            inputMode="decimal"
            value={promoted}
            onChange={(e) => setPromoted(e.target.value)}
            className="input-field"
            placeholder="0"
          />
          <span className="mt-1 block text-xs text-muted">Optional platform promotion rate.</span>
        </label>
      </div>
    </section>
  );
}