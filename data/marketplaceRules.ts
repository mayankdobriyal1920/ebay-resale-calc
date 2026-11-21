import {
  ebayAdapter,
  poshmarkAdapter,
  mercariAdapter,
  depopAdapter,
  etsyAdapter,
  whatnotAdapter,
} from "../calculators";

// Registry of marketplace adapters. Fee rules are data-driven via adapters.
export const MARKETPLACE_ADAPTERS = [
  ebayAdapter,
  poshmarkAdapter,
  mercariAdapter,
  depopAdapter,
  etsyAdapter,
  whatnotAdapter,
];

export const MVP_MARKETPLACE_IDS = ["ebay", "poshmark", "mercari", "depop"];