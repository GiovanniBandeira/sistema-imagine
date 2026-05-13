// src/types/pricing.ts
/**
 * Types related to pricing calculations.
 */
export interface PricingParams {
  quantity: number;
  materialCost: number;
  markupPercent?: number; // optional markup percentage
  taxPercent?: number; // optional tax percentage
}

export interface PricingResult {
  total: number;
  formatted: string;
}
