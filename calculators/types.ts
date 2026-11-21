// Shared types for the marketplace fee engine.
// Money is stored as integer cents. Never use floating point for currency.

export type Cents = number; // integer cents

export interface MoneyInput {
  itemCost: Cents;
  sellingPrice: Cents;
  quantity: number; // items sold (default 1)
  buyerShipping: Cents;
  sellerShippingCost: Cents;
  packagingCost: Cents;
  otherCost: Cents;
  promotedRateBps: number; // basis points (e.g. 500 = 5.00%)
  salesTaxIncluded: Cents; // tax amount included in fee base, if applicable
}

export interface FeeLine {
  name: string;
  rateLabel: string; // e.g. "13.25%" or "$0.30"
  baseCents: Cents; // fee base amount
  amountCents: Cents;
  included: boolean;
  note?: string;
  sourceUrl?: string;
}

export interface MarketplaceResult {
  marketplaceId: string;
  marketplaceName: string;
  feeLines: FeeLine[];
  totalFeesCents: Cents;
  modeledRevenueCents: Cents; // revenue basis before fees
  netProceedsCents: Cents; // after fees, before item/operating costs
  netProfitCents: Cents;
  profitMarginPercent: number | null; // null if denominator is 0
  roiPercent: number | null; // null if item cost is 0
  isComplete: boolean; // false if an important fee cannot be modeled
  incompleteReason?: string;
  assumptions: string[];
  sourceUrl: string;
  lastVerifiedDate: string;
}

export interface MarketplaceAdapter {
  id: string;
  name: string;
  feeScheduleVersion: string;
  effectiveDate: string; // ISO date or "TBD"
  lastVerifiedDate: string; // ISO date or "TBD"
  sourceUrl: string;
  supportedAssumptions: string[];
  unsupportedConditions: string[];
  calculate(input: MoneyInput): MarketplaceResult;
}