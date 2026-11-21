import { MoneyInput } from "@/calculators/types";

function getParam(params: URLSearchParams, key: string): string | null {
  return params.get(key);
}

export function encodeStateToQuery(input: MoneyInput): string {
  const p = new URLSearchParams();
  p.set("ic", String(input.itemCost));
  p.set("sp", String(input.sellingPrice));
  p.set("qt", String(input.quantity));
  p.set("bs", String(input.buyerShipping));
  p.set("ss", String(input.sellerShippingCost));
  p.set("pk", String(input.packagingCost));
  p.set("oc", String(input.otherCost));
  p.set("pr", String(input.promotedRateBps));
  return p.toString();
}

export function decodeStateFromQuery(search: string): MoneyInput | null {
  const p = new URLSearchParams(search);
  const ic = getParam(p, "ic");
  if (ic === null) return null;
  const num = (v: string | null, fallback = 0) => (v === null ? fallback : Number(v));
  const itemCost = num(ic);
  const sellingPrice = num(getParam(p, "sp"));
  if (!Number.isFinite(sellingPrice) || sellingPrice <= 0) return null;
  const qt = num(getParam(p, "qt"), 1);
  const quantity = Number.isFinite(qt) && qt >= 1 ? Math.round(qt) : 1;
  return {
    itemCost: Number.isFinite(itemCost) && itemCost >= 0 ? itemCost : 0,
    sellingPrice,
    quantity,
    buyerShipping: Math.max(0, num(getParam(p, "bs"))),
    sellerShippingCost: Math.max(0, num(getParam(p, "ss"))),
    packagingCost: Math.max(0, num(getParam(p, "pk"))),
    otherCost: Math.max(0, num(getParam(p, "oc"))),
    promotedRateBps: Math.max(0, num(getParam(p, "pr"))),
    salesTaxIncluded: 0,
  };
}